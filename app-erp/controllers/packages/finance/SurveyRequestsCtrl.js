angular.module('app.erp').controller('SurveyRequestsCtrl', function ($rootScope, $scope, Utility_ERP, SurveyRequests_Service) {
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
        Category: { PropertyName: 'CategoryCode', Operator: 'in', Value: '' },
        BusinessLine: { PropertyName: 'BusinessLineCode', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedCategory = '';
    $scope.selectedBusinessLine = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Category = [];
    $scope.data_BusinessLine = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = SurveyRequests_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Name', 'Name', 'Name', 'Text', true],
            ['Category', 'Category', 'Category', 'Text', true],
            ['Business Line', 'BusinessLine', 'BusinessLine', 'Text', true],
            ['Requested By', 'RequestedBy', 'RequestedBy', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
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

        if (!$scope.selectedCategory) {
            $scope.filters.Category.Operator = 'in';
            $scope.filters.Category.Value = Utility_ERP.Value_OperatorIN_($scope.data_Category, 'Code');
        } else {
            $scope.filters.Category.Operator = '=';
            $scope.filters.Category.Value = $scope.selectedCategory;
        }

        if (!$scope.selectedBusinessLine) {
            $scope.filters.BusinessLine.Operator = 'in';
            $scope.filters.BusinessLine.Value = Utility_ERP.Value_OperatorIN_($scope.data_BusinessLine, 'Code');
        } else {
            $scope.filters.BusinessLine.Operator = '=';
            $scope.filters.BusinessLine.Value = $scope.selectedBusinessLine;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('SurveyRequests', $scope);
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Category = async function () {
        $scope.data_Category = await SurveyRequests_Service.Dropdown_Category();
    };

    $scope.getData_BusinessLine = async function () {
        $scope.data_BusinessLine = await SurveyRequests_Service.Dropdown_BusinessLine();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let category = $scope.filters.Category.Value;
        if (category && typeof category === 'string' && category.indexOf('(') >= 0) category = '';
        $scope.selectedCategory = category;

        let businessLine = $scope.filters.BusinessLine.Value;
        if (businessLine && typeof businessLine === 'string' && businessLine.indexOf('(') >= 0) businessLine = '';
        $scope.selectedBusinessLine = businessLine;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Category(),
            $scope.getData_BusinessLine()
        ]);

        $rootScope.LoadFilterState('SurveyRequests', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});