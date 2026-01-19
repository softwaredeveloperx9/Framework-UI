angular.module('app.erp').controller('CloseRequestMonitoringCtrl', function ($rootScope, $scope, Utility_ERP, CloseRequestMonitoring_Service) {
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
        $scope.dt = CloseRequestMonitoring_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['SO Number', 'SONumber', 'SONumber', 'Text', true],
            ['SR Number', 'SRNumber', 'SRNumber', 'Text', true],
            ['Pickup List Number', 'PickupListNumber', 'PickupListNumber', 'Text', true],
            ['Manifest Number', 'ManifestNumber', 'ManifestNumber', 'Text', true],
            ['DO Number', 'DONumber', 'DONumber', 'Text', true],
            ['Invoice Number', 'InvoiceNumber', 'InvoiceNumber', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('CloseRequestMonitoring', $scope);
    };

    

    async function Override_some_Filters() {
        // No additional filters to override for this page
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('CloseRequestMonitoring', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.downloadSchemaClick = async function () { }

    $scope.uploadClick = async function () { }

    $scope.initialize_Page();
});