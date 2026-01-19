angular.module('app.erp').controller('FollowUpRequestsCtrl', function ($rootScope, $scope, Utility_ERP, FollowUpRequests_Service, BusinessRelation_Service) {
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
        Customer: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
        Age: { PropertyName: 'AgeCode', Operator: 'in', Value: '' },
        OrderBy: { PropertyName: 'OrderByCode', Operator: 'in', Value: '' },
        FollowUpDate_date: { PropertyName: 'FollowUpDate', Operator: '=', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedCollectType = '';
    $scope.selectedCustomer = '';
    $scope.selectedAge = '';
    $scope.selectedOrderBy = '';
    $scope.selectedFollowUpDate = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_CollectType = [];
    $scope.data_BillingAddressNames = [];
    $scope.data_Age = [];
    $scope.data_OrderBy = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = FollowUpRequests_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Doc Nr.', 'DocNr', 'DocNr', 'Text', true],
            ['Cheque Nr.', 'ChequeNr', 'ChequeNr', 'Text', true],
            ['Cheque Date', 'ChequeDate', 'ChequeDate', 'Date', true],
            ['Collect Date', 'CollectDate', 'CollectDate', 'Date', true],
            ['Due Date', 'DueDate', 'DueDate', 'Date', true],
            ['Collect Type', 'CollectType', 'CollectType', 'Text', true],
            ['Contact Person', 'ContactPerson', 'ContactPerson', 'Text', true],
            ['Contact Nr.', 'ContactNr', 'ContactNr', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Currency', true],
            ['Notes', 'Notes', 'Notes', 'Text', true],
            ['Age', 'Age', 'Age', 'Number', true],
            ['Rev', 'Rev', 'Rev', 'Text', true],
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

        if (!$scope.selectedOrderBy) {
            $scope.filters.OrderBy.Operator = 'in';
            $scope.filters.OrderBy.Value = Utility_ERP.Value_OperatorIN_($scope.data_OrderBy, 'Code');
        } else {
            $scope.filters.OrderBy.Operator = '=';
            $scope.filters.OrderBy.Value = $scope.selectedOrderBy;
        }

        $scope.filters.FollowUpDate_date.Value = $rootScope.Date_to_DB($scope.selectedFollowUpDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;

        $rootScope.SaveFilterState('FollowUpRequests', $scope);

        delete $scope.filters['selectedCustomer'];
    };

    $scope.Branch_Changed = async function () {
        // reset
        $scope.selectedCollectType = '';
        $scope.selectedCustomer = '';
        $scope.selectedAge = '';
        $scope.selectedOrderBy = '';

        await $scope.showData();
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.customerSelected = async function (flag = true) {
        // reset
        $scope.data_BillingAddressNames = [];

        if ($rootScope.Not_ValidString($scope.filters.Customer.Value)) {
            if (flag) {
                $scope.showData();
            }

            return;
        }

        $scope.data_BillingAddressNames = await BusinessRelation_Service.GetBusinessRelationBillingAddressNames($scope.filters.Customer.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_CollectType = async function () {
        $scope.data_CollectType = await FollowUpRequests_Service.Dropdown_CollectType();
    };

    $scope.getData_Age = async function () {
        $scope.data_Age = await FollowUpRequests_Service.Dropdown_Age();
    };

    $scope.getData_OrderBy = async function () {
        $scope.data_OrderBy = await FollowUpRequests_Service.Dropdown_OrderBy();
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

        let orderBy = $scope.filters.OrderBy.Value;
        if (orderBy && typeof orderBy === 'string' && orderBy.indexOf('(') >= 0) orderBy = '';
        $scope.selectedOrderBy = orderBy;

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
            $scope.getData_Age(),
            $scope.getData_OrderBy()
        ]);

        $rootScope.LoadFilterState('FollowUpRequests', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.updateFollowUpDate = async function () {
        // Update Follow Up Date implementation
    };

    $scope.releaseToCollectList = async function () {
        // Release to Collect List implementation
    };

    $scope.initialize_Page();
});