angular.module('app.erp').controller('DisassemblyOrdersCtrl', function ($rootScope, $scope, Utility_ERP, DisassemblyOrders_Service) {
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
        $scope.dt = DisassemblyOrders_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Short Name', 'ShortName', 'ShortName', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Active', 'Active', 'Active', 'Boolean', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('DisassemblyOrders', $scope);
    };

    ;

    async function Override_some_Filters() {
        // No additional filter overrides needed for this page
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('DisassemblyOrders', $scope);

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

    $scope.initialize_Page();
});