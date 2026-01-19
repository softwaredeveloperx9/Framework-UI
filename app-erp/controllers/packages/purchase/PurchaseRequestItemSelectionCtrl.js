angular.module('app.erp').controller('PurchaseRequestItemSelectionCtrl', function ($rootScope, $scope, Utility_ERP, PurchaseRequestItemSelection_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Warehouse: { PropertyName: 'WarehouseCode', Operator: 'in', Value: '' },
        Type: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
        ReasonNr: { PropertyName: 'ReasonNr', Operator: 'like', Value: '' },
        Consignee: { PropertyName: 'ConsigneeID', Operator: '=', Value: '' },
        ShipTo: { PropertyName: 'ShipToCode', Operator: 'in', Value: '' },
        Supplier: { PropertyName: 'SupplierID', Operator: '=', Value: '' },
        OrderTo: { PropertyName: 'OrderToCode', Operator: 'in', Value: '' },
        Brand: { PropertyName: 'BrandCode', Operator: 'in', Value: '' },
        ItemCode: { PropertyName: 'ItemCode', Operator: '=', Value: '' }
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedType = '';
    $scope.selectedConsignee = '';
    $scope.selectedShipTo = '';
    $scope.selectedSupplier = '';
    $scope.selectedOrderTo = '';
    $scope.selectedBrand = '';
    $scope.selectedItemCode = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_Type = [];
    $scope.data_ShipTo = [];
    $scope.data_OrderTo = [];
    $scope.data_Brand = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PurchaseRequestItemSelection_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Warehouse', 'Warehouse', 'Warehouse', 'Text', true],
            ['Request Type', 'RequestType', 'RequestType', 'Text', true],
            ['Request Nr.', 'RequestNr', 'RequestNr', 'Text', true],
            ['Reason Nr.', 'ReasonNr', 'ReasonNr', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Open Qty', 'OpenQty', 'OpenQty', 'Number', true],
            ['Uom', 'Uom', 'Uom', 'Text', true],
            ['Consignee', 'Consignee', 'Consignee', 'Text', true],
            ['Ship To', 'ShipTo', 'ShipTo', 'Text', true],
            ['Supplier', 'Supplier', 'Supplier', 'Text', true]
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

        if (!$scope.selectedType) {
            $scope.filters.Type.Operator = 'in';
            $scope.filters.Type.Value = Utility_ERP.Value_OperatorIN_($scope.data_Type, 'Code');
        } else {
            $scope.filters.Type.Operator = '=';
            $scope.filters.Type.Value = $scope.selectedType;
        }

        if (!$scope.selectedShipTo) {
            $scope.filters.ShipTo.Operator = 'in';
            $scope.filters.ShipTo.Value = Utility_ERP.Value_OperatorIN_($scope.data_ShipTo, 'Code');
        } else {
            $scope.filters.ShipTo.Operator = '=';
            $scope.filters.ShipTo.Value = $scope.selectedShipTo;
        }

        if (!$scope.selectedOrderTo) {
            $scope.filters.OrderTo.Operator = 'in';
            $scope.filters.OrderTo.Value = Utility_ERP.Value_OperatorIN_($scope.data_OrderTo, 'Code');
        } else {
            $scope.filters.OrderTo.Operator = '=';
            $scope.filters.OrderTo.Value = $scope.selectedOrderTo;
        }

        if (!$scope.selectedBrand) {
            $scope.filters.Brand.Operator = 'in';
            $scope.filters.Brand.Value = Utility_ERP.Value_OperatorIN_($scope.data_Brand, 'Code');
        } else {
            $scope.filters.Brand.Operator = '=';
            $scope.filters.Brand.Value = $scope.selectedBrand;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedConsignee'] = $scope.selectedConsignee;
        $scope.filters['selectedSupplier'] = $scope.selectedSupplier;
        $scope.filters['selectedItemCode'] = $scope.selectedItemCode;

        $rootScope.SaveFilterState('PurchaseRequestItemSelection', $scope);

        delete $scope.filters['selectedConsignee'];
        delete $scope.filters['selectedSupplier'];
        delete $scope.filters['selectedItemCode'];
    };

    $scope.Branch_Changed = async function () {
        // --  untuk Page ini, setiap kali Branch berubah --> maka Warehouse ke posisi "All"
        // reset
        $scope.selectedWarehouse = '';

        $scope.Reorganize_Warehouse();

        await $scope.showData();
    };

    $scope.Reorganize_Warehouse = function () {
        var data = [];

        if (!$scope.selectedBranch) {
            // tanpa Filter Branch
            data = $scope.data_EmployeeWarehouseAccess;
        } else {
            // filter berdasarkan Branch
            data = $scope.data_EmployeeWarehouseAccess.filter(function (e) {
                return e.LocationCode == $scope.selectedBranch;
            });
        }

        $scope.data_Warehouse_perBranch = [...new Map(data.map((item) => [item['Code'], item])).values()].sort((x, y) => x.Code.localeCompare(y.Code));
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.getData_InventoryItem = function (val) {
        return Inventory_Service.Dropdown_InventoryItem2(val);
    };

    $scope.getData_Type = async function () {
        $scope.data_Type = await PurchaseRequestItemSelection_Service.Dropdown_Type();
    };

    $scope.getData_ShipTo = async function () {
        $scope.data_ShipTo = await PurchaseRequestItemSelection_Service.Dropdown_ShipTo();
    };

    $scope.getData_OrderTo = async function () {
        $scope.data_OrderTo = await PurchaseRequestItemSelection_Service.Dropdown_OrderTo();
    };

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await PurchaseRequestItemSelection_Service.Dropdown_Brand();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let warehouse = $scope.filters.Warehouse.Value;
        if (warehouse && typeof warehouse === 'string' && warehouse.indexOf('(') >= 0) warehouse = '';
        $scope.selectedWarehouse = warehouse;

        let type = $scope.filters.Type.Value;
        if (type && typeof type === 'string' && type.indexOf('(') >= 0) type = '';
        $scope.selectedType = type;

        let shipTo = $scope.filters.ShipTo.Value;
        if (shipTo && typeof shipTo === 'string' && shipTo.indexOf('(') >= 0) shipTo = '';
        $scope.selectedShipTo = shipTo;

        let orderTo = $scope.filters.OrderTo.Value;
        if (orderTo && typeof orderTo === 'string' && orderTo.indexOf('(') >= 0) orderTo = '';
        $scope.selectedOrderTo = orderTo;

        let brand = $scope.filters.Brand.Value;
        if (brand && typeof brand === 'string' && brand.indexOf('(') >= 0) brand = '';
        $scope.selectedBrand = brand;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedConsignee = $scope.filters['selectedConsignee'];
            delete $scope.filters['selectedConsignee'];

            $scope.selectedSupplier = $scope.filters['selectedSupplier'];
            delete $scope.filters['selectedSupplier'];

            $scope.selectedItemCode = $scope.filters['selectedItemCode'];
            delete $scope.filters['selectedItemCode'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_Type(),
            $scope.getData_ShipTo(),
            $scope.getData_OrderTo(),
            $scope.getData_Brand()
        ]);

        $rootScope.LoadFilterState('PurchaseRequestItemSelection', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.addItems = async function () {
        // TODO: Implement add items functionality
    };

    $scope.initialize_Page();
});