angular.module('app.erp').controller('IsolationVerificationCtrl', function ($rootScope, $scope, Utility_ERP, IsolationVerification_Service) {
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
        $scope.dt = IsolationVerification_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item Code', 'ItemCode', 'ItemCode', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Qty', 'Qty1', 'Qty1', 'Number', true],
            ['Uom', 'Uom1', 'Uom1', 'Text', true],
            ['Qty', 'Qty2', 'Qty2', 'Number', true],
            ['Uom', 'Uom2', 'Uom2', 'Text', true],
            ['Qty', 'Qty3', 'Qty3', 'Number', true],
            ['Uom', 'Uom3', 'Uom3', 'Text', true],
            ['Actions', 'Actions', 'Actions', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('IsolationVerification', $scope);
    };

    ;

    async function Override_some_Filters() {
        // No additional filters to override for this page
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('IsolationVerification', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.verifyIsolation = async function () {
        // Implementation for Verify Isolation action
    };

    $scope.initialize_Page();
});