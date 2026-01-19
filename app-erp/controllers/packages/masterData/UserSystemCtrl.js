angular.module('app.erp').controller('UserListCtrl', function ($rootScope, $scope, Utility_ERP, UserList_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 10;
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
        Employee: { PropertyName: 'LinkedEmployee', Operator: 'contains', Value: '' },
        Status: { PropertyName: 'UserStatus', Operator: '=', Value: null },
    };

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = UserList_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['User Name', 'UserName', 'UserName', 'Text', true],
            ['Linked Employee', 'LinkedEmployee', 'LinkedEmployee', 'Text', true],
            ['Role', 'Role', 'Role', 'Text', true],
            ['Last Login', 'LastLogin', 'LastLogin', 'DateTime', true],
            ['User Status', 'UserStatus', 'UserStatus', 'UserStatus', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.SaveFilterState('UserList', $scope);

        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);
    };

    async function Override_some_Filters() { }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('UserList', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});