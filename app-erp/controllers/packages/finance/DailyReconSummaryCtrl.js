angular.module('app.erp').controller('DailyReconSummaryCtrl', function ($rootScope, $scope, Utility_ERP, DailyReconSummary_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        BankAccount: { PropertyName: 'BankAccountCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
    };

    $scope.selectedBankAccount = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';

    $scope.data_BankAccount = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = DailyReconSummary_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Cash Account', 'CashAccount', 'CashAccount', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Beginning Balance', 'BeginningBalance', 'BeginningBalance', 'Currency', true],
            ['Recorded Ending Balance', 'RecordedEndingBalance', 'RecordedEndingBalance', 'Currency', true],
            ['Bank\'s Ending Balance', 'BanksEndingBalance', 'BanksEndingBalance', 'Currency', true],
            ['Discrepancy', 'Discrepancy', 'Discrepancy', 'Currency', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedBankAccount) {
            $scope.filters.BankAccount.Operator = 'in';
            $scope.filters.BankAccount.Value = Utility_ERP.Value_OperatorIN_($scope.data_BankAccount, 'Code');
        } else {
            $scope.filters.BankAccount.Operator = '=';
            $scope.filters.BankAccount.Value = $scope.selectedBankAccount;
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('DailyReconSummary', $scope);
    };

    $scope.getData_BankAccount = async function () {
        $scope.data_BankAccount = await DailyReconSummary_Service.Dropdown_BankAccount();
    };

    ;

    async function Override_some_Filters() {
        let bankAccount = $scope.filters.BankAccount.Value;
        if (bankAccount && typeof bankAccount === 'string' && bankAccount.indexOf('(') >= 0) bankAccount = '';
        $scope.selectedBankAccount = bankAccount;
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_BankAccount()
        ]);

        $rootScope.LoadFilterState('DailyReconSummary', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.exportList = async function () {
        // Implementation for export to excel
    };

    $scope.initialize_Page();
});