angular.module('app.erp').controller('CollectRequestsCtrl', function ($rootScope, $scope, Utility_ERP, CollectRequests_Service, BusinessRelation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.orderByOptions = [
        { Value: 'CollectDate', Text: 'Collect Date' },
        { Value: 'DueDate', Text: 'Due Date' },
        { Value: 'Amount', Text: 'Amount' },
        { Value: 'Customer', Text: 'Customer' },
        { Value: 'Area', Text: 'Area' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'Branch', Operator: 'in', Value: '' },
        Customer: { PropertyName: 'CustomerCode', Operator: '=', Value: '' },
        OrderBy: { PropertyName: 'OrderBy', Operator: '=', Value: '' },
        CollectType: { PropertyName: 'CollectTypeCode', Operator: 'in', Value: '' },
        Age: { PropertyName: 'AgeCode', Operator: 'in', Value: '' },
        CollectDate_date: { PropertyName: 'CollectDate', Operator: '=', Value: '' },
        ShowInFollowUp: { PropertyName: 'InFollowUpList', Operator: '=', Value: null },
    };

    $scope.selectedBranch = '';
    $scope.selectedCustomer = '';
    $scope.selectedCollectType = '';
    $scope.selectedAge = '';
    $scope.selectedCollectDate = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_CollectType = [];
    $scope.data_Age = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = CollectRequests_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Doc Nr.', 'DocNr', 'DocNr', 'Text', true],
            ['Cheque Nr.', 'ChequeNr', 'ChequeNr', 'Text', true],
            ['Cheque Date', 'ChequeDate', 'ChequeDate', 'Date', true],
            ['Collect Date', 'CollectDate', 'CollectDate', 'Date', true],
            ['Due Date', 'DueDate', 'DueDate', 'Date', true],
            ['Collect Type', 'CollectType', 'CollectType', 'Text', true],
            ['Address', 'Address', 'Address', 'Text', true],
            ['Area', 'Area', 'Area', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Currency', true],
            ['Notes', 'Notes', 'Notes', 'Text', true],
            ['Age', 'Age', 'Age', 'Number', true],
            ['Rev', 'Rev', 'Rev', 'Boolean', true],
            ['F', 'F', 'F', 'Boolean', true],
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

        if (!$scope.selectedAge) {
            $scope.filters.Age.Operator = 'in';
            $scope.filters.Age.Value = Utility_ERP.Value_OperatorIN_($scope.data_Age, 'Code');
        } else {
            $scope.filters.Age.Operator = '=';
            $scope.filters.Age.Value = $scope.selectedAge;
        }

        $scope.filters.CollectDate_date.Value = $rootScope.Date_to_DB($scope.selectedCollectDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;

        $rootScope.SaveFilterState('CollectRequests', $scope);

        delete $scope.filters['selectedCustomer'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.customerSelected = async function (flag = true) {
        if ($rootScope.Not_ValidString($scope.filters.Customer.Value)) {
            if (flag) {
                $scope.showData();
            }
            return;
        }

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_CollectType = async function () {
        $scope.data_CollectType = await CollectRequests_Service.Dropdown_CollectType();
    };

    $scope.getData_Age = async function () {
        $scope.data_Age = await CollectRequests_Service.Dropdown_Age();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let collectType = $scope.filters.CollectType.Value;
        if (collectType && typeof collectType === 'string' && collectType.indexOf('(') >= 0) collectType = '';
        $scope.selectedCollectType = collectType;

        let age = $scope.filters.Age.Value;
        if (age && typeof age === 'string' && age.indexOf('(') >= 0) age = '';
        $scope.selectedAge = age;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedCustomer = $scope.filters['selectedCustomer'];
            delete $scope.filters['selectedCustomer'];

            await $scope.customerSelected(false);
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_CollectType(),
            $scope.getData_Age()
        ]);

        $rootScope.LoadFilterState('CollectRequests', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.refreshCollectDate = async function () {
        // Implementation for refresh collect date
    };

    $scope.pickClick = async function () {
        // Implementation for pick action
    };

    $scope.viewPicked = async function () {
        // Implementation for view picked
    };

    $scope.reviseCollectDate = async function () {
        // Implementation for revise collect date
    };

    $scope.addToFollowUpList = async function () {
        // Implementation for add to follow up list
    };

    $scope.initialize_Page();
});