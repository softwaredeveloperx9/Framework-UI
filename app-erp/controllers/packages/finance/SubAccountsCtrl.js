angular.module('app.erp').controller('SubAccountsCtrl', function ($rootScope, $scope, Utility_ERP, SubAccounts_Service) {
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        AccountType: { PropertyName: 'AccountTypeCode', Operator: 'in', Value: '' },
    };

    $scope.selectedAccountType = '';

    $scope.data_AccountType = [];

    $scope.CreateTable = function () {
        $scope.dt = SubAccounts_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Type', 'TypeName', 'TypeName', 'Text', true],
            ['Code', 'Code', 'Code', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedAccountType) {
            $scope.filters.AccountType.Operator = 'in';
            $scope.filters.AccountType.Value = Utility_ERP.Value_OperatorIN_($scope.data_AccountType, 'Code');
        } else {
            $scope.filters.AccountType.Operator = '=';
            $scope.filters.AccountType.Value = $scope.selectedAccountType;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('SubAccounts', $scope);
    };

    $scope.getData_AccountType = async function () {
        $scope.data_AccountType = await SubAccounts_Service.Dropdown_AccountType();
    };

    

    async function Override_some_Filters() {
        let accountType = $scope.filters.AccountType.Value;
        if (accountType && typeof accountType === 'string' && accountType.indexOf('(') >= 0) accountType = '';
        $scope.selectedAccountType = accountType;

        if ($scope.LoadFilterState_) {
            $scope.selectedAccountType = accountType;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_AccountType()
        ]);

        $rootScope.LoadFilterState('SubAccounts', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.downloadSchema = async function () { }

    $scope.uploadClick = async function () { }

    $scope.exportList = async function () { }

    $scope.initialize_Page();
});
