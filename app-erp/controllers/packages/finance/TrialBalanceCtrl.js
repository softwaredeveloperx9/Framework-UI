angular.module('app.erp').controller('TrialBalanceCtrl', function ($rootScope, $scope, Utility_ERP, TrialBalance_Service) {
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
        Year: { PropertyName: 'Year', Operator: '=', Value: null },
        Period: { PropertyName: 'Period', Operator: '=', Value: null }
    };

    $scope.selectedBranch = '';

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
        $scope.dt = TrialBalance_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Account', 'Account', 'Account', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Opening (Debet)', 'OpeningDebet', 'OpeningDebet', 'Currency', true],
            ['Opening (Credit)', 'OpeningCredit', 'OpeningCredit', 'Currency', true],
            ['Change (Debet)', 'ChangeDebet', 'ChangeDebet', 'Currency', true],
            ['Change (Credit)', 'ChangeCredit', 'ChangeCredit', 'Currency', true],
            ['Ending (Debet)', 'EndingDebet', 'EndingDebet', 'Currency', true],
            ['Ending (Credit)', 'EndingCredit', 'EndingCredit', 'Currency', true]
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

        $rootScope.SaveFilterState('TrialBalance', $scope);
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

        $rootScope.LoadFilterState('TrialBalance', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    // Toolbar functions
    $scope.reProcessGL = async function () {
        // TODO: Implement Re-Process GL logic
        console.log('Re-Process GL clicked');
    };

    $scope.closePeriod = async function () {
        // TODO: Implement Close Period logic
        console.log('Close Period clicked');
    };

    $scope.downloadSchema = async function () {
        // TODO: Implement Download Schema logic
        console.log('Download Schema clicked');
    };

    $scope.uploadData = async function () {
        // TODO: Implement Upload logic
        console.log('Upload clicked');
    };

    $scope.exportToExcel = async function () {
        // TODO: Implement Export to Excel logic
        console.log('Export to Excel clicked');
    };

    $scope.initialize_Page();
});