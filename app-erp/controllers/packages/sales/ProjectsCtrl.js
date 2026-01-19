angular.module('app.erp').controller('ProjectsCtrl', function ($rootScope, $scope, Utility_ERP, Projects_Service) {
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
        ProjectType: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedProjectType = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedShowAll = false;
    $scope.selectedStatus = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_ProjectType = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = Projects_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Project Nr.', 'ProjectNr', 'ProjectNr', 'Text', true],
            ['Type', 'Type', 'Type', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Project Name', 'ProjectName', 'ProjectName', 'Text', true],
            ['Owner', 'Owner', 'Owner', 'Text', true],
            ['Construction Management', 'ConstructionManagement', 'ConstructionManagement', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
            ['Target Revenue', 'TargetRevenue', 'TargetRevenue', 'Currency', true],
            ['Actual Revenue', 'ActualRevenue', 'ActualRevenue', 'Currency', true],
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

        if (!$scope.selectedProjectType) {
            $scope.filters.ProjectType.Operator = 'in';
            $scope.filters.ProjectType.Value = Utility_ERP.Value_OperatorIN_($scope.data_ProjectType, 'Code');
        } else {
            $scope.filters.ProjectType.Operator = '=';
            $scope.filters.ProjectType.Value = $scope.selectedProjectType;
        }

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('Projects', $scope);

        delete $scope.filters['selectedShowAll'];
    };

    $scope.getData_ProjectType = async function () {
        $scope.data_ProjectType = await Projects_Service.Dropdown_ProjectType();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('Project');

        // prettier-ignore
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        $rootScope.SetDefaultDropdownList($scope.data_Status, 'StatusId', $scope, 'selectedStatus');
    };

    $scope.selectedShowAll_Change = async function (flag = true, flag2 = true) {
        // prettier-ignore
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        // just to make UX consistent
        if (flag2) $scope.selectedStatus = '';

        if (flag) {
            await $scope.showData();
        }
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let projectType = $scope.filters.ProjectType.Value;
        if (projectType && typeof projectType === 'string' && projectType.indexOf('(') >= 0) projectType = '';
        $scope.selectedProjectType = projectType;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_ProjectType(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('Projects', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.downloadSchema = async function () { };

    $scope.upload = async function () { };

    $scope.initialize_Page();
});