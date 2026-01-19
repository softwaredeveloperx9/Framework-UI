angular.module('app.erp').controller('BudgetPlansCtrl', function ($rootScope, $scope, Utility_ERP, BudgetPlans_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'Branch', Operator: 'in', Value: '' },
        Type: { PropertyName: 'Type', Operator: '=', Value: null },
        Year: { PropertyName: 'Year', Operator: '=', Value: null }
    };

    $scope.selectedBranch = '';

    $scope.data_EmployeeLocationAccess = [];

    // Dropdown options for Type
    $scope.typeOptions = [
        { Value: null, Text: 'All' },
        { Value: 'OPEX', Text: 'OPEX' },
        { Value: 'CAPEX', Text: 'CAPEX' }
    ];

    // Dropdown options for Year
    $scope.yearOptions = [
        { Value: null, Text: 'All' }
    ];

    // Generate year options (current year and 5 years back/forward)
    (function generateYearOptions() {
        const currentYear = new Date().getFullYear();
        for (let i = -5; i <= 5; i++) {
            const year = currentYear + i;
            $scope.yearOptions.push({ Value: year, Text: year.toString() });
        }
    })();

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = BudgetPlans_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Budget ID', 'BudgetID', 'BudgetID', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Type', 'Type', 'Type', 'Text', true],
            ['Year', 'Year', 'Year', 'Number', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true]
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

        $rootScope.SaveFilterState('BudgetPlans', $scope);
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
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

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, '')
        ]);

        $rootScope.LoadFilterState('BudgetPlans', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});