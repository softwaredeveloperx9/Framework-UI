angular.module('app.erp').controller('DeliveryZoneCtrl', function ($rootScope, $scope, Utility_ERP, DeliveryZone_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.statusOptions = [
        { Value: null, Text: 'All' },
        { Value: true, Text: 'Active' },
        { Value: false, Text: 'Inactive' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Status: { PropertyName: 'Status', Operator: '=', Value: null },
    };

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = DeliveryZone_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Delivery Zone Code', 'Code', 'Code', 'Text', true],
            ['Delivery Zone Name', 'Name', 'Name', 'Text', true],
            ['Status', 'Status', 'Status', 'Status', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.SaveFilterState('DeliveryZone', $scope);

        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);
    };

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('DeliveryZone', $scope);

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});