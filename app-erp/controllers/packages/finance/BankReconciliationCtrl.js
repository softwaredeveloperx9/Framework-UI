angular.module('app.erp').controller('BankReconciliationCtrl', function ($rootScope, $scope, Utility_ERP, BankReconciliation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.yearOptions = [];
    $scope.periodOptions = [
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
        { Value: 12, Text: 'December' }
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        BankAccount: { PropertyName: 'BankAccountCode', Operator: '=', Value: '' },
        BeginningBalance: { PropertyName: 'BeginningBalance', Operator: '=', Value: 0 },
        Year: { PropertyName: 'Year', Operator: '=', Value: null },
        ClearDateFrom_date: { PropertyName: 'ClearDate', Operator: '>=', Value: '' },
        ClearDateTo_date: { PropertyName: 'ClearDate', Operator: '<=', Value: '' },
        RecordedEndingBalance: { PropertyName: 'RecordedEndingBalance', Operator: '=', Value: 0 },
        Period: { PropertyName: 'Period', Operator: '=', Value: null },
        ReconciledInOut: { PropertyName: 'ReconciledInOut', Operator: '=', Value: 0 },
        BanksEndingBalance: { PropertyName: 'BanksEndingBalance', Operator: '=', Value: 0 },
        DiscrepancyBalance: { PropertyName: 'DiscrepancyBalance', Operator: '=', Value: 0 },
        UnReconciledInOut: { PropertyName: 'UnReconciledInOut', Operator: '=', Value: 0 },
        ShowUnreconciledOnly: { PropertyName: 'IsReconciled', Operator: '=', Value: null }
    };

    $scope.selectedBankAccount = '';
    $scope.selectedYear = null;
    $scope.selectedClearDateFrom = '';
    $scope.selectedClearDateTo = '';
    $scope.selectedPeriod = null;
    $scope.selectedShowUnreconciledOnly = false;

    $scope.data_BankAccount = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = BankReconciliation_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['R', 'IsReconciled', 'IsReconciled', 'Boolean', true],
            ['Clear Date', 'ClearDate', 'ClearDate', 'Date', true],
            ['Recorded Date', 'RecordedDate', 'RecordedDate', 'Date', true],
            ['Payment Nr.', 'PaymentNr', 'PaymentNr', 'Text', true],
            ['Payee', 'Payee', 'Payee', 'Text', true],
            ['Cheque Nr.', 'ChequeNr', 'ChequeNr', 'Text', true],
            ['Cheque Date', 'ChequeDate', 'ChequeDate', 'Date', true],
            ['Notes', 'Notes', 'Notes', 'Text', true],
            ['Amount In', 'AmountIn', 'AmountIn', 'Currency', true],
            ['Amount Out', 'AmountOut', 'AmountOut', 'Currency', true],
            ['W', 'W', 'W', 'Text', true]
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        $scope.filters.ClearDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedClearDateFrom);
        $scope.filters.ClearDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedClearDateTo);

        $scope.filters.ShowUnreconciledOnly.Value = null;
        if ($scope.selectedShowUnreconciledOnly) {
            $scope.filters.ShowUnreconciledOnly.Value = false;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedShowUnreconciledOnly'] = $scope.selectedShowUnreconciledOnly;

        $rootScope.SaveFilterState('BankReconciliation', $scope);

        delete $scope.filters['selectedShowUnreconciledOnly'];

        // Calculate balances after loading data
        $scope.Calculate_Summary();
    };

    $scope.BankAccount_Changed = async function () {
        // Reset other filters when bank account changes
        $scope.selectedYear = null;
        $scope.selectedPeriod = null;
        $scope.filters.BeginningBalance.Value = 0;
        $scope.filters.RecordedEndingBalance.Value = 0;
        $scope.filters.ReconciledInOut.Value = 0;
        $scope.filters.BanksEndingBalance.Value = 0;
        $scope.filters.DiscrepancyBalance.Value = 0;
        $scope.filters.UnReconciledInOut.Value = 0;

        if ($scope.selectedBankAccount) {
            // Load beginning balance for selected bank account
            await $scope.Load_BeginningBalance();
        }

        await $scope.showData();
    };

    $scope.Year_Changed = async function () {
        await $scope.showData();
    };

    $scope.Load_BeginningBalance = async function () {
        if (!$scope.selectedBankAccount || !$scope.selectedYear || !$scope.selectedPeriod) {
            return;
        }

        // Call service to get beginning balance
        let result = await BankReconciliation_Service.GetBeginningBalance(
            $scope.selectedBankAccount,
            $scope.selectedYear,
            $scope.selectedPeriod
        );

        if (result) {
            $scope.filters.BeginningBalance.Value = result.BeginningBalance || 0;
        }
    };

    $scope.Calculate_Balance = function () {
        // Calculate Discrepancy Balance
        let recordedBalance = parseFloat($scope.filters.RecordedEndingBalance.Value) || 0;
        let banksBalance = parseFloat($scope.filters.BanksEndingBalance.Value) || 0;
        let unreconciledInOut = parseFloat($scope.filters.UnReconciledInOut.Value) || 0;

        $scope.filters.DiscrepancyBalance.Value = banksBalance + unreconciledInOut - recordedBalance;
    };

    $scope.Calculate_Summary = function () {
        if (!$scope.dt.data || $scope.dt.data.length === 0) {
            return;
        }

        let reconciledIn = 0;
        let reconciledOut = 0;
        let unreconciledIn = 0;
        let unreconciledOut = 0;

        $scope.dt.data.forEach(function (row) {
            let amountIn = parseFloat(row.AmountIn) || 0;
            let amountOut = parseFloat(row.AmountOut) || 0;

            if (row.IsReconciled) {
                reconciledIn += amountIn;
                reconciledOut += amountOut;
            } else {
                unreconciledIn += amountIn;
                unreconciledOut += amountOut;
            }
        });

        $scope.filters.ReconciledInOut.Value = reconciledIn - reconciledOut;
        $scope.filters.UnReconciledInOut.Value = unreconciledIn - unreconciledOut;

        // Calculate Recorded Ending Balance
        let beginningBalance = parseFloat($scope.filters.BeginningBalance.Value) || 0;
        $scope.filters.RecordedEndingBalance.Value = beginningBalance + reconciledIn - reconciledOut + unreconciledIn - unreconciledOut;

        // Recalculate discrepancy
        $scope.Calculate_Balance();
    };

    $scope.Row_Reconciled_Changed = function (row) {
        // Recalculate summary when reconciliation status changes
        $scope.Calculate_Summary();

        // Optionally save the reconciliation status
        // BankReconciliation_Service.UpdateReconciliationStatus(row);
    };

    $scope.getData_BankAccount = async function () {
        $scope.data_BankAccount = await Finance_Service.Dropdown_BankAccount();
    };

    $scope.Generate_YearOptions = function () {
        let currentYear = new Date().getFullYear();
        $scope.yearOptions = [];

        for (let i = currentYear - 5; i <= currentYear + 1; i++) {
            $scope.yearOptions.push({ Value: i, Text: i.toString() });
        }

        // Set default to current year
        $scope.selectedYear = currentYear;
    };

    ;

    async function Override_some_Filters() {
        if ($scope.LoadFilterState_) {
            $scope.selectedShowUnreconciledOnly = $scope.filters['selectedShowUnreconciledOnly'];
            delete $scope.filters['selectedShowUnreconciledOnly'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $scope.Generate_YearOptions();

        await Promise.allSettled([
            $scope.getData_BankAccount()
        ]);

        $rootScope.LoadFilterState('BankReconciliation', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        // Don't call showData here, wait for user to select bank account
        Utility_ERP.Still_Processing($scope, false);
    };

    $scope.receiveDeposit = async function () {
        // Implement receive deposit functionality
    };

    $scope.payDeposit = async function () {
        // Implement pay deposit functionality
    };

    $scope.customerReceipt = async function () {
        // Implement customer receipt functionality
    };

    $scope.vendorPayment = async function () {
        // Implement vendor payment functionality
    };

    $scope.expense = async function () {
        // Implement expense functionality
    };

    $scope.receipt = async function () {
        // Implement receipt functionality
    };

    $scope.initialize_Page();
});