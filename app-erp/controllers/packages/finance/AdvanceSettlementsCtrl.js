angular.module('app.erp').controller('AdvanceSettlementsCtrl', function ($rootScope, $scope, Utility_ERP, AdvanceSettlements_Service) {
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
        ReasonType: { PropertyName: 'ReasonTypeCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedReasonType = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_ReasonType = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = AdvanceSettlements_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Settlement #', 'SettlementNo', 'SettlementNo', 'Text', true],
            ['Request #', 'RequestNo', 'RequestNo', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Reason Type', 'ReasonType', 'ReasonType', 'Text', true],
            ['Requested By', 'RequestedBy', 'RequestedBy', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Number', true],
            ['Settlement Amount', 'SettlementAmount', 'SettlementAmount', 'Number', true],
            ['Short/Over', 'ShortOver', 'ShortOver', 'Number', true],
            ['Status', 'Status', 'Status', 'Text', true],
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

        if (!$scope.selectedReasonType) {
            $scope.filters.ReasonType.Operator = 'in';
            $scope.filters.ReasonType.Value = Utility_ERP.Value_OperatorIN_($scope.data_ReasonType, 'Code');
        } else {
            $scope.filters.ReasonType.Operator = '=';
            $scope.filters.ReasonType.Value = $scope.selectedReasonType;
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

        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('AdvanceSettlements', $scope);

        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_ReasonType = async function () {
        $scope.data_ReasonType = await AdvanceSettlements_Service.Dropdown_ReasonType();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('AdvanceSettlement');

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

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let reasonType = $scope.filters.ReasonType.Value;
        if (reasonType && typeof reasonType === 'string' && reasonType.indexOf('(') >= 0) reasonType = '';
        $scope.selectedReasonType = reasonType;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_ReasonType(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('AdvanceSettlements', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.verifySettlement = async function () {
        // Implement verify settlement functionality
    };

    $scope.printForm = async function () {
        // Implement print functionality
    };

    $scope.voidSettlement = async function () {
        // Implement void settlement functionality
    };

    $scope.initialize_Page();
});