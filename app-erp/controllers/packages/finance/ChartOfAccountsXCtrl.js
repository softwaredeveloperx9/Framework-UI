angular.module('app.erp').controller('ChartOfAccountsXCtrl', function ($rootScope, $scope, Utility_ERP, BackEndService, ChartOfAccounts_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 1000;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [1000];
    $scope.activeOptions = [
        { Value: null, Text: 'All' },
        { Value: true, Text: 'Yes' },
        { Value: false, Text: 'No' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        AccountType: { PropertyName: 'AccountTypeCode', Operator: 'in', Value: '' },
        Level: { PropertyName: 'Level', Operator: '=', Value: '' },
    };

    $scope.selectedAccountType = '';

    $scope.data_AccountType = [];

    // some Functions
    var loadData_Custom = async function () {
        var request = {
            modelName: $scope.dt.dataModel,
            maximumResult: ($scope.dt.pageLength <= 100) ? $scope.dt.pageLength : 100,
            fieldNames: ['*'],

            sortList: [$scope.dt.activeSortField + ' ' + $scope.dt.activeSortDirection],
            pageNumber: $scope.dt.currentPage,
        };

        $scope.dt.applyFilters(request);

        $scope.dt.loading = true;

        // reset
        $scope.dt.data = [];
        //dt.totalRows = 0;
        //dt.totalPages = 0;

        let response = await BackEndService.RequestDataList_X(request);
        $scope.dt.loading = false;

        if (response.success) {
            // request data success
            $scope.dt.data = response.data.Data;
            $scope.dt.totalRows = response.data.TotalRows;
            if ($scope.dt.totalRows < $scope.dt.pageLength) $scope.dt.totalPages = 1;
            else $scope.dt.totalPages = Math.ceil($scope.dt.totalRows / $scope.dt.pageLength);
        } else {
            // request data failed
            // show Error: sudah dihandle oleh SmartAdmin - function notifyError() menggunakan $.bigBox()
        }

        BackEndService.Log_Activity();
    };

    $scope.CreateTable = function () {
        $scope.dt = ChartOfAccounts_Service.Table($scope);

        $scope.dt.loadData = loadData_Custom;

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'AccountCode', 'AccountCode', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Account Type', 'AccountTypeName', 'AccountTypeName', 'Text', true],
            ['Parent Account', 'ParentName', 'ParentName', 'Text', true],
            ['Level', 'Level', 'Level', 'Number', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        // if (!$scope.selectedAccountType) {
        //     $scope.filters.AccountType.Operator = 'in';
        //     $scope.filters.AccountType.Value = Utility_ERP.Value_OperatorIN_($scope.data_AccountType, 'Code');
        // } else {
        //     $scope.filters.AccountType.Operator = '=';
        //     $scope.filters.AccountType.Value = $scope.selectedAccountType;
        // }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('ChartOfAccountsX', $scope);
    };

    $scope.getData_AccountType = async function () {
        $scope.data_AccountType = await ChartOfAccounts_Service.Dropdown_AccountType();
    };

    async function Override_some_Filters() {
        let accountType = $scope.filters.AccountType.Value;
        if (accountType && typeof accountType === 'string' && accountType.indexOf('(') >= 0) accountType = '';
        $scope.selectedAccountType = accountType;

        if ($scope.LoadFilterState_) {
            // No additional filter state to restore
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_AccountType()
        ]);

        $rootScope.LoadFilterState('ChartOfAccountsX', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.downloadSchema = async function () { }

    $scope.uploadAccounts = async function () { }

    $scope.exportList = async function () { }

    $scope.initialize_Page();
});