angular.module('app.frm').controller('ScopeCtrl', function ($rootScope, $scope, Utility_Frm, Scope_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.activeOptions = [
        { Value: null, Text: 'All' },
        { Value: 'Active', Text: 'Yes' },
        { Value: 'InActive', Text: 'No' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Active: { PropertyName: 'Status', Operator: '=', Value: null },
    };

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = Scope_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Application ', 'Application', 'Application', 'Text', true],
            ['Name', 'Name', 'Name', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
            ['Code', 'Id', 'Id', 'Text', true],
        ];

        Utility_Frm.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_Frm.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_Frm.Still_Processing($scope, false);

        $rootScope.SaveFilterState('Scope', $scope);
    };



    async function Override_some_Filters() { }

    $scope.initialize_Page = async function () {
        Utility_Frm.Still_Processing($scope, true);

        $rootScope.LoadFilterState('Scope', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});
