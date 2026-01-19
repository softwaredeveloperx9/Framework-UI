angular.module('app.erp').controller('DailyReconciliationCtrl', function ($rootScope, $scope, Utility_ERP, DailyReconciliation_Service) {
    // Data table configuration
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // Filter configuration
    $scope.filters = {
        BankAccount: { PropertyName: 'BankAccountCode', Operator: '=', Value: '' },
        ClearDate: { PropertyName: 'ClearDate', Operator: '=', Value: '' },
        ShowUnreconciledOnly: { PropertyName: 'Reconciled', Operator: '=', Value: null },
    };

    // Filter data
    $scope.selectedClearDate = '';

    // Balance fields
    $scope.beginningBalance = 0;
    $scope.banksEndingBalance = 0;
    $scope.recordedEndingBalance = 0;
    $scope.discrepancyBalance = 0;
    $scope.reconciledInOut = 0;
    $scope.unReconciledInOut = 0;

    // Dropdown data
    $scope.data_BankAccounts = [];

    // Create DataTable
    $scope.CreateTable = function () {
        $scope.dt = DailyReconciliation_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Clear Date', 'ClearDate', 'ClearDate', 'Date', true],
            ['Recorded Date', 'RecordedDate', 'RecordedDate', 'Date', true],
            ['Payment Nr.', 'PaymentNr', 'PaymentNr', 'Text', true],
            ['Payee', 'Payee', 'Payee', 'Text', true],
            ['Cheque Nr.', 'ChequeNr', 'ChequeNr', 'Text', true],
            ['Cheque Date', 'ChequeDate', 'ChequeDate', 'Date', true],
            ['Notes', 'Notes', 'Notes', 'Text', true],
            ['Amount In', 'AmountIn', 'AmountIn', 'Currency', true],
            ['Amount Out', 'AmountOut', 'AmountOut', 'Currency', true],
            ['W', 'W', 'W', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    // Show data function
    $scope.showData = async function () {
        $scope.filters.ClearDate.Value = $rootScope.Date_to_DB($scope.selectedClearDate);

        if ($scope.filters.ShowUnreconciledOnly.Value === true) {
            $scope.filters.ShowUnreconciledOnly.Value = false;
        } else {
            $scope.filters.ShowUnreconciledOnly.Value = null;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        await $scope.calculateBalances();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('DailyReconciliation', $scope);
    };

    // Calculate balances
    $scope.calculateBalances = async function () {
        if (!$scope.filters.BankAccount.Value || !$scope.selectedClearDate) {
            return;
        }

        let balances = await DailyReconciliation_Service.GetBalances(
            $scope.filters.BankAccount.Value,
            $rootScope.Date_to_DB($scope.selectedClearDate)
        );

        if (balances) {
            $scope.beginningBalance = balances.BeginningBalance || 0;
            $scope.recordedEndingBalance = balances.RecordedEndingBalance || 0;
            $scope.reconciledInOut = balances.ReconciledInOut || 0;
            $scope.unReconciledInOut = balances.UnReconciledInOut || 0;

            $scope.calculateDiscrepancy();
        }
    };

    // Calculate discrepancy
    $scope.calculateDiscrepancy = function () {
        let banksBalance = parseFloat($scope.banksEndingBalance) || 0;
        let recordedBalance = parseFloat($scope.recordedEndingBalance) || 0;
        $scope.discrepancyBalance = banksBalance - recordedBalance;
    };

    // Bank account changed
    $scope.bankAccountChanged = async function () {
        await $scope.showData();
    };

    // Get Bank Accounts dropdown data
    $scope.getData_BankAccounts = async function () {
        $scope.data_BankAccounts = await DailyReconciliation_Service.Dropdown_BankAccounts();
    };

    // Toolbar action functions
    $scope.receiveDeposit = async function () {
        // TODO: Implement receive deposit functionality
        console.log('Receive Deposit clicked');
    };

    $scope.payDeposit = async function () {
        // TODO: Implement pay deposit functionality
        console.log('Pay Deposit clicked');
    };

    $scope.customerReceipt = async function () {
        // TODO: Implement customer receipt functionality
        console.log('Customer Receipt clicked');
    };

    $scope.vendorPayment = async function () {
        // TODO: Implement vendor payment functionality
        console.log('Vendor Payment clicked');
    };

    $scope.expense = async function () {
        // TODO: Implement expense functionality
        console.log('Expense clicked');
    };

    $scope.receipt = async function () {
        // TODO: Implement receipt functionality
        console.log('Receipt clicked');
    };

    $scope.adjustClearing = async function () {
        // TODO: Implement adjust clearing functionality
        console.log('Adjust Clearing clicked');
    };

    $scope.editTransaction = function (row) {
        // TODO: Implement edit transaction functionality
        console.log('Edit Transaction:', row.PaymentNr);
    };

    // Toggle debug scope
    ;

    // Initialize page
    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await $scope.getData_BankAccounts();

        $rootScope.LoadFilterState('DailyReconciliation', $scope);

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        if ($scope.filters.BankAccount.Value && $scope.selectedClearDate) {
            await $scope.showData();
        }

        Utility_ERP.Still_Processing($scope, false);
    };

    $scope.initialize_Page();
});
