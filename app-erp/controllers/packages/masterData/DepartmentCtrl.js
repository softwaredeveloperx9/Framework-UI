angular.module('app.erp').controller('DepartmentCtrl', function ($rootScope, $scope, Utility_ERP, Department_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.activeOptions = [
        { Value: null, Text: 'All' },
        { Value: true, Text: 'Active' },
        { Value: false, Text: 'Inactive' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Active: { PropertyName: 'Status', Operator: '=', Value: null },
    };

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = Department_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Department Code', 'Code', 'Code', 'Text', true],
            ['Department Name', 'Name', 'Name', 'Text', true],
            ['Sub Account', 'SubAccount', 'SubAccount', 'Text', true],
            ['Status', 'Status', 'Status', 'Status', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.SaveFilterState('Department', $scope);

        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);
    };

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('Department', $scope);

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});