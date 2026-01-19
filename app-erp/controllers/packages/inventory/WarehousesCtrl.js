angular.module('app.erp').controller('WarehousesCtrl', function ($rootScope, $scope, Utility_ERP, Warehouses_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'BranchCode', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = Warehouses_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Branch', 'BranchName', 'BranchName', 'Text', true],
            ['Business Name', 'BusinessName', 'BusinessName', 'Text', true],
            ['Address', 'AddressLine', 'AddressLine', 'Text', true],
            ['D/S', 'IsDropshipWarehouse', 'IsDropshipWarehouse', 'Boolean', true],
            ['', 'Active', 'Active', 'Boolean', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);

        if (!$scope.selectedBranch) {
            $scope.filters.Branch.Operator = 'in';
            $scope.filters.Branch.Value = Utility_ERP.Value_OperatorIN_($scope.data_EmployeeLocationAccess, 'Code');
        } else {
            $scope.filters.Branch.Operator = '=';
            $scope.filters.Branch.Value = $scope.selectedBranch;
        }

        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('Warehouse', $scope);
    };

    $scope.Branch_Changed = function () {
        $scope.showData();
    };

    

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('Warehouse', $scope);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, '')
        ]);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});
