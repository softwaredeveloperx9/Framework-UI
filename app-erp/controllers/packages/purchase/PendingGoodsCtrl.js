angular.module('app.erp').controller('PendingGoodsCtrl', function ($rootScope, $scope, Utility_ERP, PendingGoods_Service, BusinessRelation_Service) {
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Warehouse: { PropertyName: 'WarehouseCode', Operator: 'in', Value: '' },
        Supplier: { PropertyName: 'SupplierID', Operator: '=', Value: '' },
        OrderTo: { PropertyName: 'OrderToAddressNumber', Operator: '=', Value: null },
        Brand: { PropertyName: 'BrandCode', Operator: 'in', Value: '' },
        ItemCode: { PropertyName: 'ItemCode', Operator: '=', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedSupplier = '';
    $scope.selectedBrand = '';
    $scope.selectedItemCode = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_OrderToAddressNames = [];
    $scope.data_Brand = [];

    $scope.CreateTable = function () {
        $scope.dt = PendingGoods_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Branch', 'BranchName', 'BranchName', 'Text', true],
            ['Warehouse', 'WarehouseName', 'WarehouseName', 'Text', true],
            ['Supplier', 'SupplierName', 'SupplierName', 'Text', true],
            ['PO Nr.', 'PONr', 'PONr', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Open Qty', 'OpenQty', 'OpenQty', 'Number', true],
            ['Uom', 'Uom', 'Uom', 'Text', true],
            ['On Demand', 'OnDemand', 'OnDemand', 'Boolean', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedBranch) {
            $scope.filters.Branch.Operator = 'in';
            $scope.filters.Branch.Value = Utility_ERP.Value_OperatorIN_($scope.data_EmployeeLocationAccess, 'Code');
        } else {
            $scope.filters.Branch.Operator = '=';
            $scope.filters.Branch.Value = $scope.selectedBranch;
        }

        if (!$scope.selectedWarehouse) {
            $scope.filters.Warehouse.Operator = 'in';
            $scope.filters.Warehouse.Value = Utility_ERP.Value_OperatorIN_($scope.data_Warehouse_perBranch, 'Code');
        } else {
            $scope.filters.Warehouse.Operator = '=';
            $scope.filters.Warehouse.Value = $scope.selectedWarehouse;
        }

        if (!$scope.selectedBrand) {
            $scope.filters.Brand.Operator = 'in';
            $scope.filters.Brand.Value = Utility_ERP.Value_OperatorIN_($scope.data_Brand, 'Code');
        } else {
            $scope.filters.Brand.Operator = '=';
            $scope.filters.Brand.Value = $scope.selectedBrand;
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedSupplier'] = $scope.selectedSupplier;
        $scope.filters['selectedItemCode'] = $scope.selectedItemCode;

        $rootScope.SaveFilterState('PendingGoods', $scope);

        delete $scope.filters['selectedSupplier'];
        delete $scope.filters['selectedItemCode'];
    };

    $scope.Branch_Changed = async function () {
        $scope.selectedWarehouse = '';
        $scope.Reorganize_Warehouse();
        await $scope.showData();
    };

    $scope.Reorganize_Warehouse = function () {
        var data = [];

        if (!$scope.selectedBranch) {
            data = $scope.data_EmployeeWarehouseAccess;
        } else {
            data = $scope.data_EmployeeWarehouseAccess.filter(function (e) {
                return e.LocationCode == $scope.selectedBranch;
            });
        }

        $scope.data_Warehouse_perBranch = [...new Map(data.map((item) => [item['Code'], item])).values()].sort((x, y) => x.Code.localeCompare(y.Code));
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.getData_Item = async function (val) {
        return await $rootScope.getData_Item(val, $scope);
    };

    $scope.supplierSelected = async function (flag = true) {
        $scope.data_OrderToAddressNames = [];
        $scope.filters.OrderTo.Value = null;

        if ($rootScope.Not_ValidString($scope.filters.Supplier.Value)) {
            if (flag) {
                $scope.showData();
            }
            return;
        }

        $scope.data_OrderToAddressNames = await BusinessRelation_Service.GetBusinessRelationOrderToAddressNames($scope.filters.Supplier.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await PendingGoods_Service.Dropdown_Brand();
    };

    

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let warehouse = $scope.filters.Warehouse.Value;
        if (warehouse && typeof warehouse === 'string' && warehouse.indexOf('(') >= 0) warehouse = '';
        $scope.selectedWarehouse = warehouse;

        let brand = $scope.filters.Brand.Value;
        if (brand && typeof brand === 'string' && brand.indexOf('(') >= 0) brand = '';
        $scope.selectedBrand = brand;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedSupplier = $scope.filters['selectedSupplier'];
            delete $scope.filters['selectedSupplier'];

            let orderTo = $scope.filters.OrderTo.Value;
            await $scope.supplierSelected(false);
            $scope.filters.OrderTo.Value = orderTo;

            $scope.selectedItemCode = $scope.filters['selectedItemCode'];
            delete $scope.filters['selectedItemCode'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_Brand()
        ]);

        $rootScope.LoadFilterState('PendingGoods', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.exportList = async function () { }

    $scope.initialize_Page();
});
