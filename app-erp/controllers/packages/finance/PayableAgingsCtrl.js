angular.module('app.erp').controller('PayableAgingsCtrl', function ($rootScope, $scope, Utility_ERP, PayableAgings_Service) {
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
        $scope.dt = PayableAgings_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Supplier', 'Supplier', 'Supplier', 'Text', true],
            ['Current', 'Current', 'Current', 'Currency', true],
            ['1 - 7 Days', 'Days1To7', 'Days1To7', 'Currency', true],
            ['8 - 14 Days', 'Days8To14', 'Days8To14', 'Currency', true],
            ['15 - 30 Days', 'Days15To30', 'Days15To30', 'Currency', true],
            ['31 - 45 Days', 'Days31To45', 'Days31To45', 'Currency', true],
            ['> 45 Days', 'DaysOver45', 'DaysOver45', 'Currency', true],
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

        $rootScope.SaveFilterState('PayableAgings', $scope);
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

        $rootScope.LoadFilterState('PayableAgings', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});