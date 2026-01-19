angular.module('app.erp').controller('IBSchemasCtrl', function ($rootScope, $scope, Utility_ERP, IBSchemas_Service) {
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
        $scope.dt = IBSchemas_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Short Name', 'ShortName', 'ShortName', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Active', 'Active', 'Active', 'Boolean', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    // Show data function
    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('IBSchemas', $scope);
    };

    // Toolbar action functions
    $scope.newSchema = async function () {
        // TODO: Implement new schema functionality
        console.log('New Schema clicked');
    };

    $scope.downloadSchema = async function () {
        // TODO: Implement download schema functionality
        console.log('Download Schema clicked');
    };

    $scope.uploadSchema = async function () {
        // TODO: Implement upload schema functionality
        console.log('Upload Schema clicked');
    };

    $scope.editSchema = function (row) {
        // TODO: Implement edit schema functionality
        console.log('Edit Schema:', row.Code);
    };

    // Toggle debug scope
    ;

    // Initialize page
    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('IBSchemas', $scope);

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        await $scope.showData();

        Utility_ERP.Still_Processing($scope, false);
    };

    $scope.initialize_Page();
});
