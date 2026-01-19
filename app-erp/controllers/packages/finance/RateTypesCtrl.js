angular.module('app.erp').controller('RateTypesCtrl', function ($rootScope, $scope, Utility_ERP, RateTypes_Service) {
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
        $scope.dt = RateTypes_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('RateTypes', $scope);
    };

    ;

    async function Override_some_Filters() {
        // No additional filter overrides needed for this page
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('RateTypes', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.downloadSchema = async function () {
        // TODO: Implement download schema functionality
    };

    $scope.uploadFile = async function () {
        // TODO: Implement upload functionality
    };

    $scope.exportToExcel = async function () {
        // TODO: Implement export to excel functionality
    };

    $scope.initialize_Page();
});