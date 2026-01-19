angular.module('app.erp').controller('PCashReconciliationCtrl', function ($rootScope, $scope, Utility_ERP, PCashReconciliation_Service) {
    // Data table configuration
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // Filter configuration
    $scope.filters = {
        CashAccount: { PropertyName: 'CashAccountCode', Operator: '=', Value: '' },
        ClearDateFrom: { PropertyName: 'ClearDate', Operator: '>=', Value: '' },
        ClearDateTo: { PropertyName: 'ClearDate', Operator: '<=', Value: '' },
        Year: { PropertyName: 'Year', Operator: '=', Value: '' },
        Period: { PropertyName: 'Period', Operator: '=', Value: '' },
        ShowUnreconciledOnly: { PropertyName: 'Reconciled', Operator: '=', Value: null },
    };

    // Filter data
    $scope.selectedClearDateFrom = '';
    $scope.selectedClearDateTo = '';

    // Balance fields
    $scope.reconciledInOut = 0;
    $scope.unReconciledInOut = 0;
    $scope.beginningBalance = 0;
    $scope.recordedEndingBalance = 0;
    $scope.cashEndingBalance = 0;
    $scope.discrepancyBalance = 0;

    // Dropdown data
    $scope.data_CashAccounts = [];
    $scope.data_Years = [];
    $scope.data_Periods = [];

    // Create DataTable
    $scope.CreateTable = function () {
        $scope.dt = PCashReconciliation_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['R', 'R', 'R', 'Boolean', true],
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
        $scope.filters.ClearDateFrom.Value = $rootScope.Date_to_DB($scope.selectedClearDateFrom);
        $scope.filters.ClearDateTo.Value = $rootScope.Date_to_DB($scope.selectedClearDateTo);

        if ($scope.filters.ShowUnreconciledOnly.Value === true) {
            $scope.filters.ShowUnreconciledOnly.Value = false;
        } else {
            $scope.filters.ShowUnreconciledOnly.Value = null;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        await $scope.calculateBalances();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('PCashReconciliation', $scope);
    };

    // Calculate balances
    $scope.calculateBalances = async function () {
        if (!$scope.filters.CashAccount.Value || !$scope.filters.Year.Value || !$scope.filters.Period.Value) {
            return;
        }

        let balances = await PCashReconciliation_Service.GetBalances(
            $scope.filters.CashAccount.Value,
            $scope.filters.Year.Value,
            $scope.filters.Period.Value
        );

        if (balances) {
            $scope.reconciledInOut = balances.ReconciledInOut || 0;
            $scope.unReconciledInOut = balances.UnReconciledInOut || 0;
            $scope.beginningBalance = balances.BeginningBalance || 0;
            $scope.recordedEndingBalance = balances.RecordedEndingBalance || 0;
            $scope.cashEndingBalance = balances.CashEndingBalance || 0;
            $scope.discrepancyBalance = ($scope.cashEndingBalance - $scope.recordedEndingBalance) || 0;
        }
    };

    // Row reconcile changed
    $scope.rowReconcileChanged = async function (row) {
        // TODO: Implement save reconcile status
        await PCashReconciliation_Service.UpdateReconcileStatus(row.PaymentNr, row.R);
        await $scope.calculateBalances();
    };

    // Cash account changed
    $scope.cashAccountChanged = async function () {
        await $scope.loadPeriods();
        await $scope.showData();
    };

    // Year changed
    $scope.yearChanged = async function () {
        await $scope.loadPeriods();
        await $scope.showData();
    };

    // Get Cash Accounts dropdown data
    $scope.getData_CashAccounts = async function () {
        $scope.data_CashAccounts = await PCashReconciliation_Service.Dropdown_CashAccounts();
    };

    // Get Years dropdown data
    $scope.getData_Years = async function () {
        $scope.data_Years = await PCashReconciliation_Service.Dropdown_Years();
    };

    // Load Periods based on selected year
    $scope.loadPeriods = async function () {
        if ($scope.filters.Year.Value) {
            $scope.data_Periods = await PCashReconciliation_Service.Dropdown_Periods($scope.filters.Year.Value);
        } else {
            $scope.data_Periods = [];
        }
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

    // Toggle debug scope
    ;

    // Initialize page
    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_CashAccounts(),
            $scope.getData_Years()
        ]);

        $rootScope.LoadFilterState('PCashReconciliation', $scope);

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        if ($scope.filters.CashAccount.Value && $scope.filters.Year.Value) {
            await $scope.loadPeriods();
            await $scope.showData();
        }

        Utility_ERP.Still_Processing($scope, false);
    };

    $scope.initialize_Page();
});
