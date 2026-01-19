angular.module('app.erp').controller('OrderVerificationCtrl', function ($rootScope, $scope, Utility_ERP, OrderVerification_Service) {
    // Main Table
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Additional Tasks Table
    $scope.dtAdditional = {};
    $scope.dtAdditional.pageLength = 20;
    $scope.dtAdditional.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.activeOptions = [
        { Value: null, Text: 'All' },
        { Value: true, Text: 'Yes' },
        { Value: false, Text: 'No' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Active: { PropertyName: 'Active', Operator: '=', Value: null },
    };

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = OrderVerification_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Collect Type', 'CollectType', 'CollectType', 'Text', true],
            ['Document Nr.', 'DocumentNr', 'DocumentNr', 'Text', true],
            ['Cheque Nr.', 'ChequeNr', 'ChequeNr', 'Text', true],
            ['Cheque/Due Date', 'ChequeDueDate', 'ChequeDueDate', 'Date', true],
            ['Amount', 'Amount', 'Amount', 'Numeric', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.CreateAdditionalTable = function () {
        $scope.dtAdditional = OrderVerification_Service.TableAdditional($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Description', 'Description', 'Description', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dtAdditional, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('OrderVerification', $scope);
    };

    $scope.showAdditionalData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dtAdditional.loadData();
        Utility_ERP.Still_Processing($scope, false);
    };

    ;

    async function Override_some_Filters() {
        // No override needed for simple dropdown filter
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('OrderVerification', $scope);

        await Override_some_Filters();

        $scope.CreateTable();
        $scope.CreateAdditionalTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
        $scope.showAdditionalData();
    };

    // Toolbar Actions
    $scope.verifyDocument = async function () {
        // Implementasi verify document
        let selectedRows = $scope.dt.data.filter(function (row) {
            return row.rowSelected === true;
        });

        if (selectedRows.length === 0) {
            $rootScope.ShowNotification('warning', 'Please select at least one document to verify');
            return;
        }

        console.log('Verifying documents:', selectedRows);
    };

    $scope.failCollect = async function () {
        // Implementasi fail collect
        let selectedRows = $scope.dt.data.filter(function (row) {
            return row.rowSelected === true;
        });

        if (selectedRows.length === 0) {
            $rootScope.ShowNotification('warning', 'Please select at least one order to fail');
            return;
        }

        console.log('Fail collect orders:', selectedRows);
    };

    $scope.closeCollectOrder = async function () {
        // Implementasi close collect order
        let selectedRows = $scope.dt.data.filter(function (row) {
            return row.rowSelected === true;
        });

        if (selectedRows.length === 0) {
            $rootScope.ShowNotification('warning', 'Please select at least one order to close');
            return;
        }

        console.log('Close collect orders:', selectedRows);
    };

    $scope.closeForm = async function () {
        // Implementasi untuk menutup form
        window.history.back();
    };

    $scope.verifyAdditionalTasks = async function () {
        // Implementasi verify additional tasks
        let selectedRows = $scope.dtAdditional.data.filter(function (row) {
            return row.rowSelected === true;
        });

        if (selectedRows.length === 0) {
            $rootScope.ShowNotification('warning', 'Please select at least one task to verify');
            return;
        }

        console.log('Verifying additional tasks:', selectedRows);
    };

    // Additional table checkbox handlers
    $scope.selectAllRowsAdditional = false;

    $scope.selectAllRowsAdditional_Change = function () {
        $scope.dtAdditional.data.forEach(function (row) {
            row.rowSelected = $scope.selectAllRowsAdditional;
        });
    };

    $scope.ProcessRowAdditional = function (index) {
        // Update selectAllRowsAdditional based on individual row selections
        let allSelected = $scope.dtAdditional.data.every(function (row) {
            return row.rowSelected === true;
        });
        $scope.selectAllRowsAdditional = allSelected;
    };

    $scope.initialize_Page();
});