angular.module('app.erp').controller('CollectReconciliationCtrl', function ($rootScope, $scope, Utility_ERP, CollectReconciliation_Service) {
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
        CollectType: { PropertyName: 'CollectTypeCode', Operator: 'in', Value: '' },
        CollectOrderNo: { PropertyName: 'CollectOrderNo', Operator: 'contains', Value: '' },
        CollectDateFrom_date: { PropertyName: 'CollectDate', Operator: '>=', Value: '' },
        CollectDateTo_date: { PropertyName: 'CollectDate', Operator: '<=', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedCollectType = '';
    $scope.selectedCollectDateFrom = '';
    $scope.selectedCollectDateTo = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_CollectType = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = CollectReconciliation_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Doc Nr.', 'DocNr', 'DocNr', 'Text', true],
            ['Type', 'Type', 'Type', 'Text', true],
            ['Customer', 'Customer', 'Customer', 'Text', true],
            ['Address', 'Address', 'Address', 'Text', true],
            ['Area', 'Area', 'Area', 'Text', true],
            ['Contact Person', 'ContactPerson', 'ContactPerson', 'Text', true],
            ['Contact Number', 'ContactNumber', 'ContactNumber', 'Text', true],
            ['Reff Nr.', 'ReffNr', 'ReffNr', 'Text', true],
            ['Age', 'Age', 'Age', 'Number', true],
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

        if (!$scope.selectedCollectType) {
            $scope.filters.CollectType.Operator = 'in';
            $scope.filters.CollectType.Value = Utility_ERP.Value_OperatorIN_($scope.data_CollectType, 'Code');
        } else {
            $scope.filters.CollectType.Operator = '=';
            $scope.filters.CollectType.Value = $scope.selectedCollectType;
        }

        $scope.filters.CollectDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedCollectDateFrom);
        $scope.filters.CollectDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedCollectDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('CollectReconciliation', $scope);
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_CollectType = async function () {
        $scope.data_CollectType = await CollectReconciliation_Service.Dropdown_CollectType();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let collectType = $scope.filters.CollectType.Value;
        if (collectType && typeof collectType === 'string' && collectType.indexOf('(') >= 0) collectType = '';
        $scope.selectedCollectType = collectType;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_CollectType()
        ]);

        $rootScope.LoadFilterState('CollectReconciliation', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.reconcileClick = async function () {
        // Implementation for reconcile action
    };

    $scope.initialize_Page();
});