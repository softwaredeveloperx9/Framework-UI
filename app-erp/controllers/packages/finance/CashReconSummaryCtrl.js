angular.module('app.erp').controller('CashReconSummaryCtrl', function ($rootScope, $scope, Utility_ERP, CashReconSummary_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.yearOptions = [
        { Value: null, Text: 'All' },
        { Value: 2024, Text: '2024' },
        { Value: 2025, Text: '2025' },
        { Value: 2026, Text: '2026' },
        { Value: 2027, Text: '2027' },
    ];
    $scope.periodOptions = [
        { Value: null, Text: 'All' },
        { Value: 1, Text: 'January' },
        { Value: 2, Text: 'February' },
        { Value: 3, Text: 'March' },
        { Value: 4, Text: 'April' },
        { Value: 5, Text: 'May' },
        { Value: 6, Text: 'June' },
        { Value: 7, Text: 'July' },
        { Value: 8, Text: 'August' },
        { Value: 9, Text: 'September' },
        { Value: 10, Text: 'October' },
        { Value: 11, Text: 'November' },
        { Value: 12, Text: 'December' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        CashAccount: { PropertyName: 'CashAccountCode', Operator: 'in', Value: '' },
        Year: { PropertyName: 'Year', Operator: '=', Value: null },
        Period: { PropertyName: 'Period', Operator: '=', Value: null },
    };

    $scope.selectedCashAccount = '';

    $scope.data_CashAccount = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = CashReconSummary_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Cash Account', 'CashAccount', 'CashAccount', 'Text', true],
            ['Year', 'Year', 'Year', 'Number', true],
            ['Period', 'Period', 'Period', 'Number', true],
            ['Beginning Balance', 'BeginningBalance', 'BeginningBalance', 'Currency', true],
            ['Recorded Ending Balance', 'RecordedEndingBalance', 'RecordedEndingBalance', 'Currency', true],
            ['Cash\'s Ending Balance', 'CashsEndingBalance', 'CashsEndingBalance', 'Currency', true],
            ['Discrepancy', 'Discrepancy', 'Discrepancy', 'Currency', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedCashAccount) {
            $scope.filters.CashAccount.Operator = 'in';
            $scope.filters.CashAccount.Value = Utility_ERP.Value_OperatorIN_($scope.data_CashAccount, 'Code');
        } else {
            $scope.filters.CashAccount.Operator = '=';
            $scope.filters.CashAccount.Value = $scope.selectedCashAccount;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('CashReconSummary', $scope);
    };

    $scope.getData_CashAccount = async function () {
        $scope.data_CashAccount = await CashReconSummary_Service.Dropdown_CashAccount();
    };

    ;

    async function Override_some_Filters() {
        let cashAccount = $scope.filters.CashAccount.Value;
        if (cashAccount && typeof cashAccount === 'string' && cashAccount.indexOf('(') >= 0) cashAccount = '';
        $scope.selectedCashAccount = cashAccount;
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_CashAccount()
        ]);

        $rootScope.LoadFilterState('CashReconSummary', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});