angular.module('app.erp').controller('TaxZonesCtrl', function ($rootScope, $scope, Utility_ERP, TaxZones_Service) {
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

    $scope.selectedActive = null;

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = TaxZones_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        $scope.filters.Active.Value = $scope.selectedActive;

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('TaxZones', $scope);
    };

    

    async function Override_some_Filters() {
        if ($scope.LoadFilterState_) {
            $scope.selectedActive = $scope.filters.Active.Value;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('TaxZones', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});