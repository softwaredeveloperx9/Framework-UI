angular.module('app.erp').controller('SalesReturnsCtrl', function ($rootScope, $scope, Utility_ERP, SalesReturns_Service) {
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
        Customer: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
        Reason: { PropertyName: 'ReasonCode', Operator: 'in', Value: '' },
        Date_date: { PropertyName: 'Date', Operator: '=', Value: '' },
        PickFrom: { PropertyName: 'PickFrom', Operator: 'in', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedCustomer = '';
    $scope.selectedReason = '';
    $scope.selectedDate = '';
    $scope.selectedPickFrom = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_Reason = [];
    $scope.data_PickFrom = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = SalesReturns_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['SR #', 'Code', 'Code', 'Text', true],
            ['Reason', 'ReasonName', 'ReasonName', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'BranchName', 'BranchName', 'Text', true],
            ['Warehouse', 'WarehouseName', 'WarehouseName', 'Text', true],
            ['Customer', 'CustomerName', 'CustomerName', 'Text', true],
            ['Pick From', 'PickFrom', 'PickFrom', 'Text', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Number', true],
            ['Pick Up', 'PickUp', 'PickUp', 'Boolean', true],
            ['Pickup Nr.', 'PickupNumber', 'PickupNumber', 'Text', true],
            ['Issued By', 'IssuedByName', 'IssuedByName', 'Text', true],
            ['Status', 'StatusName', 'StatusName', 'Text', true],
            ['Substitute', 'Substitute', 'Substitute', 'Boolean', true],
            ['P. Return', 'PurchaseReturn', 'PurchaseReturn', 'Boolean', true],
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

        if (!$scope.selectedReason) {
            $scope.filters.Reason.Operator = 'in';
            $scope.filters.Reason.Value = Utility_ERP.Value_OperatorIN_($scope.data_Reason, 'Code');
        } else {
            $scope.filters.Reason.Operator = '=';
            $scope.filters.Reason.Value = $scope.selectedReason;
        }

        if (!$scope.selectedPickFrom) {
            $scope.filters.PickFrom.Operator = 'in';
            $scope.filters.PickFrom.Value = Utility_ERP.Value_OperatorIN_($scope.data_PickFrom, 'Code');
        } else {
            $scope.filters.PickFrom.Operator = '=';
            $scope.filters.PickFrom.Value = $scope.selectedPickFrom;
        }

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        $scope.filters.Date_date.Value = $rootScope.Date_to_DB($scope.selectedDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('SalesReturns', $scope);

        delete $scope.filters['selectedCustomer'];
        delete $scope.filters['selectedShowAll'];
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

    $scope.getData_Reason = async function () {
        $scope.data_Reason = await Utility_ERP.getData_SalesReturnReason();
    };

    $scope.getData_PickFrom = async function () {
        $scope.data_PickFrom = await Utility_ERP.getData_SalesReturnPickFrom();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('SalesReturn');

        // prettier-ignore
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        $rootScope.SetDefaultDropdownList($scope.data_Status, 'StatusId', $scope, 'selectedStatus');
    };

    $scope.selectedShowAll_Change = async function (flag = true, flag2 = true) {
        // prettier-ignore
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        // just to make UX consistent
        if (flag2) $scope.selectedStatus = '';

        if (flag) {
            await $scope.showData();
        }
    };

    

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let warehouse = $scope.filters.Warehouse.Value;
        if (warehouse && typeof warehouse === 'string' && warehouse.indexOf('(') >= 0) warehouse = '';
        $scope.selectedWarehouse = warehouse;

        let reason = $scope.filters.Reason.Value;
        if (reason && typeof reason === 'string' && reason.indexOf('(') >= 0) reason = '';
        $scope.selectedReason = reason;

        let pickFrom = $scope.filters.PickFrom.Value;
        if (pickFrom && typeof pickFrom === 'string' && pickFrom.indexOf('(') >= 0) pickFrom = '';
        $scope.selectedPickFrom = pickFrom;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedCustomer = $scope.filters['selectedCustomer'];
            delete $scope.filters['selectedCustomer'];

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_Reason(),
            $scope.getData_PickFrom(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('SalesReturns', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.pickupForm = async function () { }

    $scope.refundForm = async function () { }

    $scope.voidForm = async function () { }

    $scope.removeForm = async function () { }

    $scope.initialize_Page();
});