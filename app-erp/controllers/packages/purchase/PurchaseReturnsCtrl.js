angular.module('app.erp').controller('PurchaseReturnsCtrl', function ($rootScope, $scope, Utility_ERP, PurchaseReturns_Service, BusinessRelation_Service) {
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Warehouse: { PropertyName: 'WarehouseCode', Operator: 'in', Value: '' },
        ReturnTo: { PropertyName: 'ReturnToID', Operator: '=', Value: '' },
        ReturnAddress: { PropertyName: 'ReturnAddressNumber', Operator: '=', Value: null },
        PickFrom: { PropertyName: 'PickFromID', Operator: '=', Value: '' },
        PickAddress: { PropertyName: 'PickAddressNumber', Operator: '=', Value: null },
        Reason: { PropertyName: 'ReasonCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedReturnTo = '';
    $scope.selectedPickFrom = '';
    $scope.selectedReason = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_ReturnAddressNames = [];
    $scope.data_PickAddressNames = [];
    $scope.data_PurchaseReturnReason = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    $scope.CreateTable = function () {
        $scope.dt = PurchaseReturns_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['PR #', 'PRNumber', 'PRNumber', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'BranchName', 'BranchName', 'Text', true],
            ['Warehouse', 'WarehouseName', 'WarehouseName', 'Text', true],
            ['Reason', 'ReasonName', 'ReasonName', 'Text', true],
            ['Return To', 'ReturnToName', 'ReturnToName', 'Text', true],
            ['Pick From', 'PickFromName', 'PickFromName', 'Text', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Number', true],
            ['Status', 'StatusName', 'StatusName', 'Text', true],
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
            $scope.filters.Reason.Value = Utility_ERP.Value_OperatorIN_($scope.data_PurchaseReturnReason, 'Code');
        } else {
            $scope.filters.Reason.Operator = '=';
            $scope.filters.Reason.Value = $scope.selectedReason;
        }

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedReturnTo'] = $scope.selectedReturnTo;
        $scope.filters['selectedPickFrom'] = $scope.selectedPickFrom;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('PurchaseReturns', $scope);

        delete $scope.filters['selectedReturnTo'];
        delete $scope.filters['selectedPickFrom'];
        delete $scope.filters['selectedShowAll'];
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

    $scope.returnToSelected = async function (flag = true) {
        $scope.data_ReturnAddressNames = [];
        $scope.filters.ReturnAddress.Value = null;

        if ($rootScope.Not_ValidString($scope.filters.ReturnTo.Value)) {
            if (flag) {
                $scope.showData();
            }
            return;
        }

        $scope.data_ReturnAddressNames = await BusinessRelation_Service.GetBusinessRelationReturnAddressNames($scope.filters.ReturnTo.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.pickFromSelected = async function (flag = true) {
        $scope.data_PickAddressNames = [];
        $scope.filters.PickAddress.Value = null;

        if ($rootScope.Not_ValidString($scope.filters.PickFrom.Value)) {
            if (flag) {
                $scope.showData();
            }
            return;
        }

        $scope.data_PickAddressNames = await BusinessRelation_Service.GetBusinessRelationPickAddressNames($scope.filters.PickFrom.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_PurchaseReturnReason = async function () {
        $scope.data_PurchaseReturnReason = await PurchaseReturns_Service.Dropdown_PurchaseReturnReason();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('PurchaseReturn');

        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        $rootScope.SetDefaultDropdownList($scope.data_Status, 'StatusId', $scope, 'selectedStatus');
    };

    $scope.selectedShowAll_Change = async function (flag = true, flag2 = true) {
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

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

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedReturnTo = $scope.filters['selectedReturnTo'];
            delete $scope.filters['selectedReturnTo'];

            let returnAddress = $scope.filters.ReturnAddress.Value;
            await $scope.returnToSelected(false);
            $scope.filters.ReturnAddress.Value = returnAddress;

            $scope.selectedPickFrom = $scope.filters['selectedPickFrom'];
            delete $scope.filters['selectedPickFrom'];

            let pickAddress = $scope.filters.PickAddress.Value;
            await $scope.pickFromSelected(false);
            $scope.filters.PickAddress.Value = pickAddress;

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
            $scope.getData_PurchaseReturnReason(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('PurchaseReturns', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.verifyClick = async function () { }

    $scope.refundClick = async function () { }

    $scope.deliveryClick = async function () { }

    $scope.pickupClick = async function () { }

    $scope.voidClick = async function () { }

    $scope.initialize_Page();
});
