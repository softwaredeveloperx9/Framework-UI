angular.module('app.erp').controller('PaymentMethodsCtrl', function ($rootScope, $scope, Utility_ERP, PaymentMethods_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

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
        $scope.dt = PaymentMethods_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Create Cheque', 'CreateCheque', 'CreateCheque', 'Boolean', true],
            ['Cheque Type Code', 'ChequeTypeCode', 'ChequeTypeCode', 'Text', true],
            ['OrderID', 'OrderID', 'OrderID', 'Number', true],
            ['Attachment Required', 'AttachmentRequired', 'AttachmentRequired', 'Boolean', true],
            ['DueDate Required', 'DueDateRequired', 'DueDateRequired', 'Boolean', true],
            ['Use Bank Account', 'UseBankAccount', 'UseBankAccount', 'Boolean', true],
            ['Active', 'Active', 'Active', 'Boolean', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('PaymentMethods', $scope);
    };

    ;

    async function Override_some_Filters() {
        // No override needed for simple dropdown filter
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('PaymentMethods', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});