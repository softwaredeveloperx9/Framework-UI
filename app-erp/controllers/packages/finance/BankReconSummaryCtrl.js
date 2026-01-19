angular.module('app.erp').controller('BankReconSummaryCtrl', function ($rootScope, $scope, Utility_ERP, BankReconSummary_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.yearOptions = [];
    $scope.periodOptions = [
        { Value: 1, Text: '1' },
        { Value: 2, Text: '2' },
        { Value: 3, Text: '3' },
        { Value: 4, Text: '4' },
        { Value: 5, Text: '5' },
        { Value: 6, Text: '6' },
        { Value: 7, Text: '7' },
        { Value: 8, Text: '8' },
        { Value: 9, Text: '9' },
        { Value: 10, Text: '10' },
        { Value: 11, Text: '11' },
        { Value: 12, Text: '12' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        BankAccount: { PropertyName: 'BankAccountCode', Operator: 'in', Value: '' },
        Year: { PropertyName: 'Year', Operator: '=', Value: null },
        Period: { PropertyName: 'Period', Operator: '=', Value: null },
    };

    $scope.selectedBankAccount = '';

    $scope.data_BankAccount = [];

    // Generate year options (current year ± 5 years)
    $scope.generateYearOptions = function () {
        const currentYear = new Date().getFullYear();
        $scope.yearOptions = [];
        for (let i = currentYear - 5; i <= currentYear + 5; i++) {
            $scope.yearOptions.push({ Value: i, Text: i.toString() });
        }
    };

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = BankReconSummary_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Cash Account', 'CashAccount', 'CashAccount', 'Text', true],
            ['Year', 'Year', 'Year', 'Number', true],
            ['Period', 'Period', 'Period', 'Number', true],
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

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('BankReconSummary', $scope);
    };

    $scope.getData_BankAccount = async function () {
        $scope.data_BankAccount = await BankReconSummary_Service.Dropdown_BankAccount();
    };

    ;

    async function Override_some_Filters() {
        let bankAccount = $scope.filters.BankAccount.Value;
        if (bankAccount && typeof bankAccount === 'string' && bankAccount.indexOf('(') >= 0) bankAccount = '';
        $scope.selectedBankAccount = bankAccount;
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $scope.generateYearOptions();

        await Promise.allSettled([
            $scope.getData_BankAccount()
        ]);

        $rootScope.LoadFilterState('BankReconSummary', $scope);

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