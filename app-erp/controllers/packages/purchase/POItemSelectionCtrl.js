angular.module('app.erp').controller('POItemSelectionCtrl', function ($rootScope, $scope, Utility_ERP, POItemSelection_Service, BusinessRelation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.viewByOptions = [
        { Value: null, Text: 'All' },
        { Value: 'item', Text: 'Item' },
        { Value: 'supplier', Text: 'Supplier' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Warehouse: { PropertyName: 'WarehouseCode', Operator: 'in', Value: '' },
        Supplier: { PropertyName: 'SupplierID', Operator: '=', Value: '' },
        OrderTo: { PropertyName: 'OrderToAddressNumber', Operator: '=', Value: null },
        Brand: { PropertyName: 'BrandCode', Operator: 'in', Value: '' },
        ItemCode: { PropertyName: 'ItemCode', Operator: '=', Value: '' },
        ViewBy: { PropertyName: 'ViewBy', Operator: '=', Value: null },
        PONr: { PropertyName: 'PONr', Operator: '=', Value: '' },
        Dropship: { PropertyName: 'Dropship', Operator: '=', Value: null },
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedSupplier = '';
    $scope.selectedBrand = '';
    $scope.selectedItemCode = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_OrderToAddressNames = [];
    $scope.data_Brand = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = POItemSelection_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Warehouse', 'Warehouse', 'Warehouse', 'Text', true],
            ['Supplier', 'Supplier', 'Supplier', 'Text', true],
            ['PO Nr.', 'PONr', 'PONr', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Open Qty', 'OpenQty', 'OpenQty', 'Number', true],
            ['Uom', 'Uom', 'Uom', 'Text', true],
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

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedSupplier'] = $scope.selectedSupplier;
        $scope.filters['selectedItemCode'] = $scope.selectedItemCode;

        $rootScope.SaveFilterState('POItemSelection', $scope);

        delete $scope.filters['selectedSupplier'];
        delete $scope.filters['selectedItemCode'];
    };

    $scope.Branch_Changed = async function () {
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

    $scope.supplierSelected = async function (flag = true) {
        // reset
        $scope.data_OrderToAddressNames = [];
        $scope.filters.OrderTo.Value = null;

        if ($rootScope.Not_ValidString($scope.filters.Supplier.Value)) {
            if (flag) {
                $scope.showData();
            }

            return;
        }

        $scope.data_OrderToAddressNames = await BusinessRelation_Service.GetBusinessRelationBillingAddressNames($scope.filters.Supplier.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await POItemSelection_Service.Dropdown_Brand();
    };

    $scope.getData_InventoryItem = async function (val) {
        return await $rootScope.getData_InventoryItem(val, $scope);
    };

    ;

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

        $rootScope.LoadFilterState('POItemSelection', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.addClick = async function () {
        // Implementation for Add
    };

    $scope.initialize_Page();
});