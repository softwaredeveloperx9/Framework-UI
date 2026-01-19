angular.module('app.erp').controller('CustomerCategoriesCtrl', function ($rootScope, $scope, Utility_ERP, CustomerCategories_Service) {
    // Data table configuration
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

    // Filter configuration
    $scope.filters = {
        Active: { PropertyName: 'Active', Operator: '=', Value: null },
    };

    // Create DataTable
    $scope.CreateTable = function () {
        $scope.dt = CustomerCategories_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    // Show data function
    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('CustomerCategories', $scope);
    };

    // Toolbar action functions
    $scope.newCategory = async function () {
        // TODO: Implement new customer category functionality
        console.log('New Customer Category clicked');
    };

    $scope.editCategory = function (row) {
        // TODO: Implement edit customer category functionality
        console.log('Edit Customer Category:', row.Code);
    };

    // Toggle debug scope
    ;

    // Initialize page
    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('CustomerCategories', $scope);

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        await $scope.showData();

        Utility_ERP.Still_Processing($scope, false);
    };

    $scope.initialize_Page();
});
