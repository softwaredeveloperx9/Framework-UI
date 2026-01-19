angular.module('app.erp').controller('OnIssueClearingsCtrl', function ($rootScope, $scope, Utility_ERP, OnIssueClearings_Service, BusinessRelation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.collectTypeOptions = [
        { Value: null, Text: 'All' },
        { Value: 'Cash', Text: 'Cash' },
        { Value: 'Cheque', Text: 'Cheque' },
        { Value: 'Transfer', Text: 'Transfer' },
    ];
    $scope.ageOptions = [
        { Value: null, Text: 'All' },
        { Value: '0-30', Text: '0-30 days' },
        { Value: '31-60', Text: '31-60 days' },
        { Value: '61-90', Text: '61-90 days' },
        { Value: '90+', Text: '90+ days' },
    ];
    $scope.orderByOptions = [
        { Value: null, Text: 'All' },
        { Value: 'DocNr', Text: 'Doc Nr.' },
        { Value: 'ChequeDate', Text: 'Cheque Date' },
        { Value: 'RequestDate', Text: 'Request Date' },
        { Value: 'Amount', Text: 'Amount' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        CollectType: { PropertyName: 'CollectType', Operator: '=', Value: null },
        Customer: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
        Age: { PropertyName: 'Age', Operator: '=', Value: null },
        OrderBy: { PropertyName: 'OrderBy', Operator: '=', Value: null },
        RequestDate_date: { PropertyName: 'RequestDate', Operator: '=', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedCustomer = '';
    $scope.selectedRequestDate = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_BillingAddressNames = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = OnIssueClearings_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Doc Nr.', 'DocNr', 'DocNr', 'Text', true],
            ['Cheque Nr.', 'ChequeNr', 'ChequeNr', 'Text', true],
            ['Cheque Date', 'ChequeDate', 'ChequeDate', 'Date', true],
            ['Request Date', 'RequestDate', 'RequestDate', 'Date', true],
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

        $scope.filters.RequestDate_date.Value = $rootScope.Date_to_DB($scope.selectedRequestDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;

        $rootScope.SaveFilterState('OnIssueClearings', $scope);

        delete $scope.filters['selectedCustomer'];
    };

    $scope.Branch_Changed = async function () {
        // reset
        $scope.selectedCustomer = '';

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

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

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
            $rootScope.EmployeeLocationAccess($scope, '')
        ]);

        $rootScope.LoadFilterState('OnIssueClearings', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.pickRequest = async function () {
        // Pick implementation
    };

    $scope.viewPicked = async function () {
        // View Picked implementation
    };

    $scope.adjustCollectDate = async function () {
        // Adjust Collect Date implementation
    };

    $scope.initialize_Page();
});