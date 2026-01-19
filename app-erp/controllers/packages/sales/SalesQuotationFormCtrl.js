angular.module('app.erp').controller('SalesQuotationFormCtrl', function ($rootScope, $scope, $stateParams, $state, Utility_ERP, SalesQuotationForm_Service) {
    
    // Initialize Variables
    $scope.model = {};
    $scope.details = {
        MainItems: [],
        AlternateItems: []
    };
    $scope.summary = {
        GrandTotal: 0
    };
    $scope.datePicker = {};
    $scope.Is_Create = true;
    $scope.Is_Writeable = true;
    $scope.form = { submitted: false };
    
    // Data Sources
    $scope.data_Customer = [];
    $scope.data_Branch = [];
    $scope.data_BillTo = [];
    $scope.data_Salesman = [];
    $scope.data_Company = [];
    $scope.data_Marketing = [];
    $scope.data_Currency = [];
    $scope.data_VAT = [];
    $scope.data_InventoryItem = [];

    // Initialize Form
    $scope.initForm = function() {
        var quotationId = $stateParams.id;
        
        if (quotationId && quotationId !== 'new') {
            $scope.Is_Create = false;
            $scope.loadData(quotationId);
        } else {
            $scope.Is_Create = true;
            $scope.initNewForm();
        }
        
        $scope.loadMasterData();
    };

    // Initialize New Form
    $scope.initNewForm = function() {
        $scope.model = {
            Date: new Date(),
            ExpiredDate: new Date(),
            CurrencyCode: 'IDR'
        };
    };

    // Load Master Data
    $scope.loadMasterData = function() {
        SalesQuotationForm_Service.getMasterData().then(function(response) {
            $scope.data_Customer = response.data.Customers || [];
            $scope.data_Branch = response.data.Branches || [];
            $scope.data_Salesman = response.data.Salesmen || [];
            $scope.data_Company = response.data.Companies || [];
            $scope.data_Marketing = response.data.Marketing || [];
            $scope.data_Currency = response.data.Currencies || [];
            $scope.data_VAT = response.data.VAT || [];
        });
    };

    // Load Existing Data
    $scope.loadData = function(quotationId) {
        $('#idLoading').show();
        SalesQuotationForm_Service.getQuotationById(quotationId).then(function(response) {
            $scope.model = response.data.Header || {};
            $scope.details.MainItems = response.data.MainItems || [];
            $scope.details.AlternateItems = response.data.AlternateItems || [];
            
            // Convert dates
            if ($scope.model.Date) {
                $scope.model.Date = new Date($scope.model.Date);
            }
            if ($scope.model.ExpiredDate) {
                $scope.model.ExpiredDate = new Date($scope.model.ExpiredDate);
            }
            
            $scope.calculateSummary();
            $('#idLoading').hide();
        }, function(error) {
            $('#idLoading').hide();
            Utility_ERP.showError('Error loading data');
        });
    };

    // Customer Typeahead
    $scope.getData_Customer = function(searchText) {
        return SalesQuotationForm_Service.searchCustomer(searchText).then(function(response) {
            return response.data;
        });
    };

    // Customer Selected
    $scope.CustomerSelected = function() {
        if ($scope.model.selectedCustomer) {
            $scope.model.CustomerId = $scope.model.selectedCustomer.Id;
            $scope.model.CustomerCode = $scope.model.selectedCustomer.Code;
            $scope.model.CustomerName = $scope.model.selectedCustomer.Name;
            
            // Load customer bill to addresses
            SalesQuotationForm_Service.getCustomerAddresses($scope.model.CustomerId).then(function(response) {
                $scope.data_BillTo = response.data;
            });
        }
    };

    // Item Typeahead
    $scope.getData_InventoryItem = function(searchText) {
        return SalesQuotationForm_Service.searchInventoryItem(searchText).then(function(response) {
            return response.data;
        });
    };

    // Item Selected
    $scope.ItemSelected = function(row) {
        if (row.selectedItem) {
            row.ItemCode = row.selectedItem.Code;
            row.Description = row.selectedItem.ShortName;
            row.BaseUomCode = row.selectedItem.BaseUOMCode;
            row.UomCode = row.selectedItem.BaseUOMCode;
            
            // Load item UOM profile
            SalesQuotationForm_Service.getItemUomProfile(row.ItemCode).then(function(response) {
                row.UomList = response.data;
            });
            
            // Load item stock
            SalesQuotationForm_Service.getItemStock(row.ItemCode).then(function(response) {
                row.StockQty = response.data.AvailableQty || 0;
            });
            
            // Load item price
            if ($scope.model.CustomerId) {
                SalesQuotationForm_Service.getItemPrice(row.ItemCode, $scope.model.CustomerId).then(function(response) {
                    row.UnitAmount = response.data.Price || 0;
                    $scope.CalculateRow(row);
                });
            }
        }
    };

    // Clear Item
    $scope.ClearItem = function(row) {
        row.selectedItem = null;
        row.ItemCode = '';
        row.Description = '';
        row.UomCode = '';
        row.UomList = [];
        row.StockQty = 0;
        row.UnitAmount = 0;
        $scope.CalculateRow(row);
    };

    // Add Main Item
    $scope.AddMainItem = function() {
        var newRow = {
            recordNumber: $scope.details.MainItems.length + 1,
            Deleted: 0,
            ItemCode: '',
            Description: '',
            HasQty: true,
            IsOpen: false,
            IsClose: false,
            Qty: 1,
            UomCode: '',
            TotalQty: 0,
            TotalUomCode: '',
            UnitAmount: 0,
            TotalAmount: 0,
            DiscountPercent: 0,
            SubTotal: 0,
            VATCode: '',
            VATPercent: 0,
            Total: 0,
            StockQty: 0,
            IsConfirmed: false,
            UomList: []
        };
        
        $scope.details.MainItems.push(newRow);
    };

    // Remove Main Item
    $scope.RemoveMainItem = function(recordNumber) {
        var item = $scope.details.MainItems.find(function(x) { return x.recordNumber === recordNumber; });
        if (item) {
            item.Deleted = 1;
            $scope.calculateSummary();
        }
    };

    // Calculate Row
    $scope.CalculateRow = function(row) {
        row.TotalAmount = (row.Qty || 0) * (row.UnitAmount || 0);
        row.SubTotal = row.TotalAmount - (row.TotalAmount * (row.DiscountPercent || 0) / 100);
        
        // Get VAT Percent
        if (row.VATCode) {
            var vat = $scope.data_VAT.find(function(x) { return x.Code === row.VATCode; });
            row.VATPercent = vat ? vat.Percent : 0;
        }
        
        row.Total = row.SubTotal + (row.SubTotal * (row.VATPercent || 0) / 100);
        
        $scope.calculateSummary();
    };

    // Calculate Summary
    $scope.calculateSummary = function() {
        $scope.summary.GrandTotal = 0;
        
        $scope.details.MainItems.forEach(function(item) {
            if (item.Deleted === 0) {
                $scope.summary.GrandTotal += (item.Total || 0);
            }
        });
    };

    // Browse Items
    $scope.BrowseItems = function() {
        // Open item selection modal
        Utility_ERP.showInfo('Browse Items feature - to be implemented');
    };

    // Show Stock
    $scope.ShowStock = function() {
        // Show stock information
        Utility_ERP.showInfo('Show Stock feature - to be implemented');
    };

    // Show Alternate Items
    $scope.ShowAlternateItems = function() {
        // Show alternate quotation items
        Utility_ERP.showInfo('Alternate Quotations feature - to be implemented');
    };

    // Remove Alternate Item
    $scope.RemoveAlternateItem = function(recordNumber) {
        var item = $scope.details.AlternateItems.find(function(x) { return x.recordNumber === recordNumber; });
        if (item) {
            item.Deleted = 1;
        }
    };

    // Save Data
    $scope.saveData = function() {
        $scope.form.submitted = true;
        
        // Validate form
        if (!$scope.model.CustomerId) {
            Utility_ERP.showError('Customer is required');
            return;
        }
        if (!$scope.model.Date) {
            Utility_ERP.showError('Date is required');
            return;
        }
        if (!$scope.model.ExpiredDate) {
            Utility_ERP.showError('Expired Date is required');
            return;
        }
        
        // Validate items
        var validItems = $scope.details.MainItems.filter(function(x) { return x.Deleted === 0; });
        if (validItems.length === 0) {
            Utility_ERP.showError('Please add at least one item');
            return;
        }
        
        $('#idLoading').show();
        
        var dataToSave = {
            Header: $scope.model,
            MainItems: $scope.details.MainItems,
            AlternateItems: $scope.details.AlternateItems
        };
        
        var savePromise = $scope.Is_Create 
            ? SalesQuotationForm_Service.createQuotation(dataToSave)
            : SalesQuotationForm_Service.updateQuotation($scope.model.Id, dataToSave);
        
        savePromise.then(function(response) {
            $('#idLoading').hide();
            Utility_ERP.showSuccess('Data saved successfully');
            
            if ($scope.Is_Create) {
                $state.go('app.erp.salesQuotationForm', { id: response.data.Id });
            }
        }, function(error) {
            $('#idLoading').hide();
            Utility_ERP.showError('Error saving data: ' + (error.data ? error.data.Message : 'Unknown error'));
        });
    };

    // Toggle Debug Scope
    $scope.Toggle_debugScope = function() {
        $scope.allData_toJson = !$scope.allData_toJson;
        if ($scope.allData_toJson) {
            $scope.allData_toJson2 = {
                model: $scope.model,
                details: $scope.details,
                summary: $scope.summary
            };
        }
    };

    // Initialize form on load
    $scope.initForm();
});