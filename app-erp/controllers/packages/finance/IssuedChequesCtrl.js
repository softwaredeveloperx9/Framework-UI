angular.module('app.erp').controller('IssuedChequesCtrl', function ($rootScope, $scope, Utility_ERP, IssuedCheques_Service) {
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
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        CashAccount: { PropertyName: 'CashAccountCode', Operator: 'in', Value: '' },
        DueDateFrom_date: { PropertyName: 'DueDate', Operator: '>=', Value: '' },
        DueDateTo_date: { PropertyName: 'DueDate', Operator: '<=', Value: '' },
        IssuedBy: { PropertyName: 'IssuedBy', Operator: '=', Value: '' },
        Type: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedCashAccount = '';
    $scope.selectedDueDateFrom = '';
    $scope.selectedDueDateTo = '';
    $scope.selectedIssuedBy = '';
    $scope.selectedType = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_CashAccount = [];
    $scope.data_Type = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = IssuedCheques_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Payments', 'Payments', 'Payments', 'Text', true],
            ['Cheque#', 'Cheque', 'Cheque', 'Text', true],
            ['Type', 'Type', 'Type', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Cash Account', 'CashAccount', 'CashAccount', 'Text', true],
            ['Issued By', 'IssuedBy', 'IssuedBy', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Number', true],
            ['Received Date', 'ReceivedDate', 'ReceivedDate', 'Date', true],
            ['Due Date', 'DueDate', 'DueDate', 'Date', true],
            ['Cleared Date', 'ClearedDate', 'ClearedDate', 'Date', true],
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

        if (!$scope.selectedCashAccount) {
            $scope.filters.CashAccount.Operator = 'in';
            $scope.filters.CashAccount.Value = Utility_ERP.Value_OperatorIN_($scope.data_CashAccount, 'Code');
        } else {
            $scope.filters.CashAccount.Operator = '=';
            $scope.filters.CashAccount.Value = $scope.selectedCashAccount;
        }

        if (!$scope.selectedType) {
            $scope.filters.Type.Operator = 'in';
            $scope.filters.Type.Value = Utility_ERP.Value_OperatorIN_($scope.data_Type, 'Code');
        } else {
            $scope.filters.Type.Operator = '=';
            $scope.filters.Type.Value = $scope.selectedType;
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

        $scope.filters.DueDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDueDateFrom);
        $scope.filters.DueDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDueDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedIssuedBy'] = $scope.selectedIssuedBy;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('IssuedCheques', $scope);

        delete $scope.filters['selectedIssuedBy'];
        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Employee = async function (val) {
        return await $rootScope.getData_Employee(val, $scope);
    };

    $scope.getData_CashAccount = async function () {
        $scope.data_CashAccount = await IssuedCheques_Service.Dropdown_CashAccount();
    };

    $scope.getData_Type = async function () {
        $scope.data_Type = await IssuedCheques_Service.Dropdown_Type();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('IssuedCheque');

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

        let cashAccount = $scope.filters.CashAccount.Value;
        if (cashAccount && typeof cashAccount === 'string' && cashAccount.indexOf('(') >= 0) cashAccount = '';
        $scope.selectedCashAccount = cashAccount;

        let type = $scope.filters.Type.Value;
        if (type && typeof type === 'string' && type.indexOf('(') >= 0) type = '';
        $scope.selectedType = type;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedIssuedBy = $scope.filters['selectedIssuedBy'];
            delete $scope.filters['selectedIssuedBy'];

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_CashAccount(),
            $scope.getData_Type(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('IssuedCheques', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.chequeSentClick = async function () {
        // Implementation for cheque sent
    };

    $scope.returnForRevisionClick = async function () {
        // Implementation for return for revision
    };

    $scope.clearChequeClick = async function () {
        // Implementation for clear cheque
    };

    $scope.voidClick = async function () {
        // Implementation for void
    };

    $scope.initialize_Page();
});