angular.module('app.erp').controller('OwnershipListCtrl', function ($rootScope, $scope, Utility_ERP, Ownership_Service) {
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
        IdName: { PropertyName: 'OwnershipID', Operator: 'contains', Value: '' },
        Status: { PropertyName: 'Status', Operator: '=', Value: null },
    };

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = Ownership_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Ownership ID', 'OwnershipID', 'OwnershipID', 'Text', true],
            ['Ownership Name', 'OwnershipName', 'OwnershipName', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Status', 'Status', 'Status', 'Status', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.SaveFilterState('OwnershipList', $scope);

        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);
    };

    async function Override_some_Filters() { }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('OwnershipList', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});