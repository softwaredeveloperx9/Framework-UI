angular.module('app.erp').controller('PickedCollectRequestCtrl', function ($rootScope, $scope, Utility_ERP, PickedCollectRequest_Service) {
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
        DocType: { PropertyName: 'DocType', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedDocType = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_DocType = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PickedCollectRequest_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Doc. Nr', 'DocNr', 'DocNr', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Type', 'Type', 'Type', 'Text', true],
            ['Address', 'Address', 'Address', 'Text', true],
            ['Area', 'Area', 'Area', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Currency', true],
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

        if (!$scope.selectedDocType) {
            $scope.filters.DocType.Operator = 'in';
            $scope.filters.DocType.Value = Utility_ERP.Value_OperatorIN_($scope.data_DocType, 'Code');
        } else {
            $scope.filters.DocType.Operator = '=';
            $scope.filters.DocType.Value = $scope.selectedDocType;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('PickedCollectRequest', $scope);
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_DocType = async function () {
        $scope.data_DocType = await PickedCollectRequest_Service.Dropdown_DocType();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let docType = $scope.filters.DocType.Value;
        if (docType && typeof docType === 'string' && docType.indexOf('(') >= 0) docType = '';
        $scope.selectedDocType = docType;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_DocType()
        ]);

        $rootScope.LoadFilterState('PickedCollectRequest', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.unPick = async function () {
        // Implementation for Un Pick
    };

    $scope.newCollectOrder = async function () {
        // Implementation for New Collect Order
    };

    $scope.addToCollectOrder = async function () {
        // Implementation for Add to Collect Order
    };

    $scope.initialize_Page();
});