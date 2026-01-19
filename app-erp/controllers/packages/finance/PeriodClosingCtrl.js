angular.module('app.erp').controller('PeriodClosingCtrl', function ($rootScope, $scope, Utility_ERP, PeriodClosing_Service, Company_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Year: { PropertyName: 'Year', Operator: '=', Value: null },
        Period: { PropertyName: 'Period', Operator: '=', Value: null },
        Company: { PropertyName: 'CompanyCode', Operator: 'in', Value: '' },
        Branch: { PropertyName: 'Branch', Operator: 'in', Value: '' }
    };

    $scope.selectedCompany = '';
    $scope.selectedBranch = '';

    $scope.data_Company = [];
    $scope.data_EmployeeLocationAccess = [];

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

    // Dropdown options for Period (1-12 for months)
    $scope.periodOptions = [
        { Value: null, Text: 'All' }
    ];

    // Generate period options (months 1-12)
    (function generatePeriodOptions() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];
        for (let i = 1; i <= 12; i++) {
            $scope.periodOptions.push({ Value: i, Text: i + ' - ' + monthNames[i - 1] });
        }
    })();

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PeriodClosing_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Year', 'Year', 'Year', 'Number', true],
            ['Period', 'Period', 'Period', 'Number', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Total Revenue', 'TotalRevenue', 'TotalRevenue', 'Currency', true],
            ['Total Expenses', 'TotalExpenses', 'TotalExpenses', 'Currency', true],
            ['Profit/Loss', 'ProfitLoss', 'ProfitLoss', 'Currency', true],
            ['Processed Date', 'ProcessedDate', 'ProcessedDate', 'Date', true],
            ['Processed By', 'ProcessedBy', 'ProcessedBy', 'Text', true]
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedCompany) {
            $scope.filters.Company.Operator = 'in';
            $scope.filters.Company.Value = Utility_ERP.Value_OperatorIN_($scope.data_Company, 'Code');
        } else {
            $scope.filters.Company.Operator = '=';
            $scope.filters.Company.Value = $scope.selectedCompany;
        }

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

        $rootScope.SaveFilterState('PeriodClosing', $scope);
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Company = async function () {
        $scope.data_Company = await Company_Service.Dropdown();
    };

    

    async function Override_some_Filters() {
        let company = $scope.filters.Company.Value;
        if (company && typeof company === 'string' && company.indexOf('(') >= 0) company = '';
        $scope.selectedCompany = company;

        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Company()
        ]);

        $rootScope.LoadFilterState('PeriodClosing', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    // Toolbar functions
    $scope.closePeriod = async function () {
        // TODO: Implement Close Period logic
        console.log('Close Period clicked');
    };

    $scope.initialize_Page();
});