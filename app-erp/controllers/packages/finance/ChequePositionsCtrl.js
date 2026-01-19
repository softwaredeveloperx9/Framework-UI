angular.module('app.erp').controller('ChequePositionsCtrl', function ($rootScope, $scope, Utility_ERP, ChequePositions_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';

    $scope.data_EmployeeLocationAccess = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = ChequePositions_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Customer', 'Customer', 'Customer', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Sales', 'Sales', 'Sales', 'Text', true],
            ['Already Due', 'AlreadyDue', 'AlreadyDue', 'Currency', true],
            ['Due Next Week', 'DueNextWeek', 'DueNextWeek', 'Currency', true],
            ['2 Weeks from Now', 'TwoWeeksfromNow', 'TwoWeeksfromNow', 'Currency', true],
            ['4 Weeks and Later', 'FourWeeksandLater', 'FourWeeksandLater', 'Currency', true],
            ['Total', 'Total', 'Total', 'Currency', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedBranch) {
            $scope.filters.Branch.Operator = 'in';
            $scope.filters.Branch.Value = Utility_ERP.Value_OperatorIN_($scope.data_EmployeeLocationAccess, 'Code');
        } else {
            $scope.filters.Branch.Operator = '=';
            $scope.filters.Branch.Value = $scope.selectedBranch;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('ChequePositions', $scope);
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, '')
        ]);

        $rootScope.LoadFilterState('ChequePositions', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});