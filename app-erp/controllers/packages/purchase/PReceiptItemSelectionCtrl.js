angular.module('app.erp').controller('PReceiptItemSelectionCtrl', function ($rootScope, $scope, Utility_ERP, PReceiptItemSelection_Service) {
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
        Supplier: { PropertyName: 'SupplierID', Operator: '=', Value: '' },
        ReturnTo: { PropertyName: 'ReturnToCode', Operator: 'in', Value: '' },
        Consignee: { PropertyName: 'ConsigneeID', Operator: '=', Value: '' },
        PickupFrom: { PropertyName: 'PickupFromCode', Operator: 'in', Value: '' },
        ReceiptNr: { PropertyName: 'ReceiptNr', Operator: 'like', Value: '' }
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedSupplier = '';
    $scope.selectedReturnTo = '';
    $scope.selectedConsignee = '';
    $scope.selectedPickupFrom = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_ReturnTo = [];
    $scope.data_PickupFrom = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PReceiptItemSelection_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Warehouse', 'Warehouse', 'Warehouse', 'Text', true],
            ['Supplier', 'Supplier', 'Supplier', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Qty', 'Qty', 'Qty', 'Number', true],
            ['Uom', 'Uom', 'Uom', 'Text', true]
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

        if (!$scope.selectedReturnTo) {
            $scope.filters.ReturnTo.Operator = 'in';
            $scope.filters.ReturnTo.Value = Utility_ERP.Value_OperatorIN_($scope.data_ReturnTo, 'Code');
        } else {
            $scope.filters.ReturnTo.Operator = '=';
            $scope.filters.ReturnTo.Value = $scope.selectedReturnTo;
        }

        if (!$scope.selectedPickupFrom) {
            $scope.filters.PickupFrom.Operator = 'in';
            $scope.filters.PickupFrom.Value = Utility_ERP.Value_OperatorIN_($scope.data_PickupFrom, 'Code');
        } else {
            $scope.filters.PickupFrom.Operator = '=';
            $scope.filters.PickupFrom.Value = $scope.selectedPickupFrom;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedSupplier'] = $scope.selectedSupplier;
        $scope.filters['selectedConsignee'] = $scope.selectedConsignee;

        $rootScope.SaveFilterState('PReceiptItemSelection', $scope);

        delete $scope.filters['selectedSupplier'];
        delete $scope.filters['selectedConsignee'];
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

    $scope.getData_ReturnTo = async function () {
        $scope.data_ReturnTo = await PReceiptItemSelection_Service.Dropdown_ReturnTo();
    };

    $scope.getData_PickupFrom = async function () {
        $scope.data_PickupFrom = await PReceiptItemSelection_Service.Dropdown_PickupFrom();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let warehouse = $scope.filters.Warehouse.Value;
        if (warehouse && typeof warehouse === 'string' && warehouse.indexOf('(') >= 0) warehouse = '';
        $scope.selectedWarehouse = warehouse;

        let returnTo = $scope.filters.ReturnTo.Value;
        if (returnTo && typeof returnTo === 'string' && returnTo.indexOf('(') >= 0) returnTo = '';
        $scope.selectedReturnTo = returnTo;

        let pickupFrom = $scope.filters.PickupFrom.Value;
        if (pickupFrom && typeof pickupFrom === 'string' && pickupFrom.indexOf('(') >= 0) pickupFrom = '';
        $scope.selectedPickupFrom = pickupFrom;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedSupplier = $scope.filters['selectedSupplier'];
            delete $scope.filters['selectedSupplier'];

            $scope.selectedConsignee = $scope.filters['selectedConsignee'];
            delete $scope.filters['selectedConsignee'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_ReturnTo(),
            $scope.getData_PickupFrom()
        ]);

        $rootScope.LoadFilterState('PReceiptItemSelection', $scope);

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