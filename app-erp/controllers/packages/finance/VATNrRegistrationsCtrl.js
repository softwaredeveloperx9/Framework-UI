angular.module('app.erp').controller('VATNrRegistrationsCtrl', function ($rootScope, $scope, Utility_ERP, VATNrRegistrations_Service) {
    // Dummy data, just for "Table: paging and searching"
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

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Year: { PropertyName: 'Year', Operator: '=', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedYear = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Years = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = VATNrRegistrations_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Registration Nr.', 'RegistrationNr', 'RegistrationNr', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Range Start', 'RangeStart', 'RangeStart', 'Number', true],
            ['Range End', 'RangeEnd', 'RangeEnd', 'Number', true],
            ['Total Active', 'TotalActive', 'TotalActive', 'Number', true],
            ['Total Used', 'TotalUsed', 'TotalUsed', 'Number', true],
            ['Total Disposed', 'TotalDisposed', 'TotalDisposed', 'Number', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Number', true],
            ['Issued By', 'IssuedBy', 'IssuedBy', 'Text', true],
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

        $scope.filters.Year.Value = $scope.selectedYear;

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('VATNrRegistrations', $scope);
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Years = function () {
        // Generate years from current year - 5 to current year + 2
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 5;
        const endYear = currentYear + 2;

        $scope.data_Years = [];
        for (let year = endYear; year >= startYear; year--) {
            $scope.data_Years.push(year);
        }
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
            $rootScope.EmployeeLocationAccess($scope, ''),
        ]);

        $scope.getData_Years();

        $rootScope.LoadFilterState('VATNrRegistrations', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.disposeRegistration = async function () {
        // TODO: Implement dispose functionality
        const selectedRows = $scope.dt.data.filter(row => row.rowSelected);

        if (selectedRows.length === 0) {
            alert('Please select at least one registration to dispose');
            return;
        }

        // Add dispose logic here
        console.log('Dispose registrations:', selectedRows);
    }

    $scope.initialize_Page();
});