angular.module('app.erp').controller('CashTransactionsCtrl', function ($rootScope, $scope, Utility_ERP, CashTransactions_Service) {
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
        Type: { PropertyName: 'TransactionType', Operator: '=', Value: '' },
        DateFrom: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo: { PropertyName: 'Date', Operator: '<=', Value: '' },
    };

    // Filter data
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';

    // Dropdown data
    $scope.data_CashAccounts = [];
    $scope.data_TransactionTypes = [];

    // Create DataTable
    $scope.CreateTable = function () {
        $scope.dt = CashTransactions_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Payment#', 'Payment', 'Payment', 'Text', true],
            ['Type', 'Type', 'Type', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['B/R', 'BR', 'BR', 'Text', true],
            ['In', 'In', 'In', 'Currency', true],
            ['Out', 'Out', 'Out', 'Currency', true],
            ['R', 'R', 'R', 'Boolean', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    // Show data function
    $scope.showData = async function () {
        $scope.filters.DateFrom.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('CashTransactions', $scope);
    };

    // Get Cash Accounts dropdown data
    $scope.getData_CashAccounts = async function () {
        $scope.data_CashAccounts = await CashTransactions_Service.Dropdown_CashAccounts();
    };

    // Get Transaction Types dropdown data
    $scope.getData_TransactionTypes = async function () {
        $scope.data_TransactionTypes = await CashTransactions_Service.Dropdown_TransactionTypes();
    };

    // Toolbar action functions
    $scope.newExpense = async function () {
        // TODO: Implement new expense functionality
        console.log('New Expense clicked');
    };

    $scope.newReceipt = async function () {
        // TODO: Implement new receipt functionality
        console.log('New Receipt clicked');
    };

    $scope.removeTransaction = async function () {
        // TODO: Implement remove transaction functionality
        console.log('Remove Transaction clicked');
    };

    $scope.printForm = async function () {
        // TODO: Implement print functionality
        console.log('Print clicked');
    };

    $scope.exportToExcel = async function () {
        // TODO: Implement export to excel functionality
        console.log('Export To Excel clicked');
    };

    $scope.downloadSchema = async function () {
        // TODO: Implement download schema functionality
        console.log('Download Schema clicked');
    };

    $scope.uploadSchema = async function () {
        // TODO: Implement upload schema functionality
        console.log('Upload Schema clicked');
    };

    $scope.editTransaction = function (row) {
        // TODO: Implement edit transaction functionality
        console.log('Edit Transaction:', row.Payment);
    };

    // Toggle debug scope
    ;

    // Initialize page
    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_CashAccounts(),
            $scope.getData_TransactionTypes()
        ]);

        $rootScope.LoadFilterState('CashTransactions', $scope);

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        await $scope.showData();

        Utility_ERP.Still_Processing($scope, false);
    };

    $scope.initialize_Page();
});
