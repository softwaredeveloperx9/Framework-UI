angular.module('app.frm').controller('OrganizationCtrl', function ($rootScope, $scope, Utility_ERP, Organization_Service) {
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
        $scope.dt = Organization_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Name', 'Name', 'Name', 'Text', true],
            ['Domain Name', 'DomainName', 'DomainName', 'Text', true],
            ['Insert Stamp', 'InsertStamp', 'InsertStamp', 'Date', true],
            ['Inserted By', 'InsertedBy', 'InsertedBy', 'Text', true],
            ['Update Stamp', 'UpdateStamp', 'UpdateStamp', 'Date', true],
            ['Updated By', 'UpdatedBy', 'UpdatedBy', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('Organization', $scope);
    };



    async function Override_some_Filters() { }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('Organization', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});
