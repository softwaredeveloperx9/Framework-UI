angular.module('app.erp').controller('CountVerificationCtrl', function ($rootScope, $scope, Utility_ERP, CountVerification_Service) {
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
        $scope.dt = CountVerification_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Sheet #', 'SheetNo', 'SheetNo', 'Text', true],
            ['Sheet Name', 'SheetName', 'SheetName', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Counter', 'Counter', 'Counter', 'Text', true],
            ['Noter', 'Noter', 'Noter', 'Text', true],
            ['Diff %', 'DiffPct', 'DiffPct', 'Number', true],
            ['Status', 'Status', 'Status', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('CountVerification', $scope);
    };

    ;

    async function Override_some_Filters() {
        // No additional filters to override for this page
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('CountVerification', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.applySheet = async function () {
        // Implementation for Apply Sheet action
    };

    $scope.initialize_Page();
});