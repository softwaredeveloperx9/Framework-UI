angular.module('app.erp').controller('RoleListCtrl', function ($rootScope, $scope, Utility_ERP, RoleList_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 10;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.statusOptions = [
        { Value: null, Text: 'All' },
        { Value: 'Active', Text: 'Active' },
        { Value: 'Inactive', Text: 'Inactive' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        RoleName: { PropertyName: 'RoleName', Operator: 'contains', Value: '' },
        Status: { PropertyName: 'Status', Operator: '=', Value: null },
    };

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = RoleList_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Role Name', 'RoleName', 'RoleName', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Menu Access', 'MenuAccess', 'MenuAccess', 'Text', true],
            ['Function', 'Function', 'Function', 'Text', true],
            ['Status', 'Status', 'Status', 'Status', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.SaveFilterState('RoleList', $scope);

        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);
    };

    async function Override_some_Filters() { }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('RoleList', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});