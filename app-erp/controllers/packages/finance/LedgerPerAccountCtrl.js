angular.module('app.erp').controller('LedgerPerAccountCtrl', function ($rootScope, $scope, Utility_ERP, LedgerPerAccount_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        StartYear: { PropertyName: 'StartYear', Operator: 'in', Value: '' },
        StartPeriod: { PropertyName: 'StartPeriod', Operator: 'in', Value: '' },
        EndYear: { PropertyName: 'EndYear', Operator: 'in', Value: '' },
        EndPeriod: { PropertyName: 'EndPeriod', Operator: 'in', Value: '' },
        Company: { PropertyName: 'CompanyCode', Operator: 'in', Value: '' },
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Division: { PropertyName: 'DivisionCode', Operator: 'in', Value: '' },
        Department: { PropertyName: 'DepartmentCode', Operator: 'in', Value: '' },
        Asset: { PropertyName: 'Asset', Operator: '=', Value: null },
        Liability: { PropertyName: 'Liability', Operator: '=', Value: null },
        Capital: { PropertyName: 'Capital', Operator: '=', Value: null },
        Expense: { PropertyName: 'Expense', Operator: '=', Value: null },
        Income: { PropertyName: 'Income', Operator: '=', Value: null },
        TotalDebet: { PropertyName: 'TotalDebet', Operator: '=', Value: null },
        TotalCredit: { PropertyName: 'TotalCredit', Operator: '=', Value: null },
        BeginningBalance: { PropertyName: 'BeginningBalance', Operator: '=', Value: null },
        EndingBalance: { PropertyName: 'EndingBalance', Operator: '=', Value: null },
    };

    $scope.selectedStartYear = '';
    $scope.selectedStartPeriod = '';
    $scope.selectedEndYear = '';
    $scope.selectedEndPeriod = '';
    $scope.selectedCompany = '';
    $scope.selectedBranch = '';
    $scope.selectedDivision = '';
    $scope.selectedDepartment = '';

    $scope.data_StartYear = [];
    $scope.data_StartPeriod = [];
    $scope.data_EndYear = [];
    $scope.data_EndPeriod = [];
    $scope.data_Company = [];
    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Division = [];
    $scope.data_Department = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = LedgerPerAccount_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Type', 'Type', 'Type', 'Text', true],
            ['Currency', 'Currency', 'Currency', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedStartYear) {
            $scope.filters.StartYear.Operator = 'in';
            $scope.filters.StartYear.Value = Utility_ERP.Value_OperatorIN_($scope.data_StartYear, 'Code');
        } else {
            $scope.filters.StartYear.Operator = '=';
            $scope.filters.StartYear.Value = $scope.selectedStartYear;
        }

        if (!$scope.selectedStartPeriod) {
            $scope.filters.StartPeriod.Operator = 'in';
            $scope.filters.StartPeriod.Value = Utility_ERP.Value_OperatorIN_($scope.data_StartPeriod, 'Code');
        } else {
            $scope.filters.StartPeriod.Operator = '=';
            $scope.filters.StartPeriod.Value = $scope.selectedStartPeriod;
        }

        if (!$scope.selectedEndYear) {
            $scope.filters.EndYear.Operator = 'in';
            $scope.filters.EndYear.Value = Utility_ERP.Value_OperatorIN_($scope.data_EndYear, 'Code');
        } else {
            $scope.filters.EndYear.Operator = '=';
            $scope.filters.EndYear.Value = $scope.selectedEndYear;
        }

        if (!$scope.selectedEndPeriod) {
            $scope.filters.EndPeriod.Operator = 'in';
            $scope.filters.EndPeriod.Value = Utility_ERP.Value_OperatorIN_($scope.data_EndPeriod, 'Code');
        } else {
            $scope.filters.EndPeriod.Operator = '=';
            $scope.filters.EndPeriod.Value = $scope.selectedEndPeriod;
        }

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

        if (!$scope.selectedDivision) {
            $scope.filters.Division.Operator = 'in';
            $scope.filters.Division.Value = Utility_ERP.Value_OperatorIN_($scope.data_Division, 'Code');
        } else {
            $scope.filters.Division.Operator = '=';
            $scope.filters.Division.Value = $scope.selectedDivision;
        }

        if (!$scope.selectedDepartment) {
            $scope.filters.Department.Operator = 'in';
            $scope.filters.Department.Value = Utility_ERP.Value_OperatorIN_($scope.data_Department, 'Code');
        } else {
            $scope.filters.Department.Operator = '=';
            $scope.filters.Department.Value = $scope.selectedDepartment;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('LedgerPerAccount', $scope);
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_StartYear = async function () {
        $scope.data_StartYear = await LedgerPerAccount_Service.Dropdown_Year();
    };

    $scope.getData_StartPeriod = async function () {
        $scope.data_StartPeriod = await LedgerPerAccount_Service.Dropdown_Period();
    };

    $scope.getData_EndYear = async function () {
        $scope.data_EndYear = await LedgerPerAccount_Service.Dropdown_Year();
    };

    $scope.getData_EndPeriod = async function () {
        $scope.data_EndPeriod = await LedgerPerAccount_Service.Dropdown_Period();
    };

    $scope.getData_Company = async function () {
        $scope.data_Company = await LedgerPerAccount_Service.Dropdown_Company();
    };

    $scope.getData_Division = async function () {
        $scope.data_Division = await LedgerPerAccount_Service.Dropdown_Division();
    };

    $scope.getData_Department = async function () {
        $scope.data_Department = await LedgerPerAccount_Service.Dropdown_Department();
    };

    ;

    async function Override_some_Filters() {
        let startYear = $scope.filters.StartYear.Value;
        if (startYear && typeof startYear === 'string' && startYear.indexOf('(') >= 0) startYear = '';
        $scope.selectedStartYear = startYear;

        let startPeriod = $scope.filters.StartPeriod.Value;
        if (startPeriod && typeof startPeriod === 'string' && startPeriod.indexOf('(') >= 0) startPeriod = '';
        $scope.selectedStartPeriod = startPeriod;

        let endYear = $scope.filters.EndYear.Value;
        if (endYear && typeof endYear === 'string' && endYear.indexOf('(') >= 0) endYear = '';
        $scope.selectedEndYear = endYear;

        let endPeriod = $scope.filters.EndPeriod.Value;
        if (endPeriod && typeof endPeriod === 'string' && endPeriod.indexOf('(') >= 0) endPeriod = '';
        $scope.selectedEndPeriod = endPeriod;

        let company = $scope.filters.Company.Value;
        if (company && typeof company === 'string' && company.indexOf('(') >= 0) company = '';
        $scope.selectedCompany = company;

        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let division = $scope.filters.Division.Value;
        if (division && typeof division === 'string' && division.indexOf('(') >= 0) division = '';
        $scope.selectedDivision = division;

        let department = $scope.filters.Department.Value;
        if (department && typeof department === 'string' && department.indexOf('(') >= 0) department = '';
        $scope.selectedDepartment = department;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_StartYear(),
            $scope.getData_StartPeriod(),
            $scope.getData_EndYear(),
            $scope.getData_EndPeriod(),
            $scope.getData_Company(),
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Division(),
            $scope.getData_Department()
        ]);

        $rootScope.LoadFilterState('LedgerPerAccount', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.exportList = async function () {
        // Implementasi export to excel
    };

    $scope.closeForm = async function () {
        // Implementasi untuk menutup form
        window.history.back();
    };

    $scope.initialize_Page();
});