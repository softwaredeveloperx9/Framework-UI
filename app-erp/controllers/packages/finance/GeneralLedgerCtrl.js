angular.module('app.erp').controller('GeneralLedgerCtrl', function ($rootScope, $scope, Utility_ERP, GeneralLedger_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    // Generate year options (current year ± 5 years)
    const currentYear = new Date().getFullYear();
    $scope.yearOptions = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        $scope.yearOptions.push({ Value: i, Text: i.toString() });
    }

    // Period options (1-12)
    $scope.periodOptions = [];
    for (let i = 1; i <= 12; i++) {
        $scope.periodOptions.push({ Value: i, Text: i.toString() });
    }

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        StartYear: { PropertyName: 'StartYear', Operator: '=', Value: null },
        StartPeriod: { PropertyName: 'StartPeriod', Operator: '=', Value: null },
        EndYear: { PropertyName: 'EndYear', Operator: '=', Value: null },
        EndPeriod: { PropertyName: 'EndPeriod', Operator: '=', Value: null },
        Company: { PropertyName: 'CompanyCode', Operator: 'in', Value: '' },
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Account: { PropertyName: 'AccountCode', Operator: 'in', Value: '' },
        SubAccount: { PropertyName: 'SubAccountCode', Operator: 'in', Value: '' },
        TotalDebet: { PropertyName: 'TotalDebet', Operator: '=', Value: '' },
        TotalCredit: { PropertyName: 'TotalCredit', Operator: '=', Value: '' },
        BeginningBalance: { PropertyName: 'BeginningBalance', Operator: '=', Value: '' },
        EndingBalance: { PropertyName: 'EndingBalance', Operator: '=', Value: '' },
    };

    $scope.selectedCompany = '';
    $scope.selectedBranch = '';
    $scope.selectedAccount = '';
    $scope.selectedSubAccount = '';

    $scope.data_Company = [];
    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Account = [];
    $scope.data_SubAccount = [];
    $scope.data_SubAccount_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = GeneralLedger_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Date', 'Date', 'Date', 'Date', true],
            ['Module', 'Module', 'Module', 'Text', true],
            ['Journal Nr.', 'JournalNr', 'JournalNr', 'Text', true],
            ['Company', 'Company', 'Company', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Division', 'Division', 'Division', 'Text', true],
            ['Department', 'Department', 'Department', 'Text', true],
            ['Sub Account', 'SubAccount', 'SubAccount', 'Text', true],
            ['B/R', 'BR', 'BR', 'Text', true],
            ['Reff Nr.', 'ReffNr', 'ReffNr', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Debet', 'Debet', 'Debet', 'Currency', true],
            ['Credit', 'Credit', 'Credit', 'Currency', true],
            ['Balance', 'Balance', 'Balance', 'Currency', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
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

        if (!$scope.selectedAccount) {
            $scope.filters.Account.Operator = 'in';
            $scope.filters.Account.Value = Utility_ERP.Value_OperatorIN_($scope.data_Account, 'Code');
        } else {
            $scope.filters.Account.Operator = '=';
            $scope.filters.Account.Value = $scope.selectedAccount;
        }

        if (!$scope.selectedSubAccount) {
            $scope.filters.SubAccount.Operator = 'in';
            $scope.filters.SubAccount.Value = Utility_ERP.Value_OperatorIN_($scope.data_SubAccount, 'Code');
        } else {
            $scope.filters.SubAccount.Operator = '=';
            $scope.filters.SubAccount.Value = $scope.selectedSubAccount;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('GeneralLedger', $scope);
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.Account_Changed = async function () {
        // reset SubAccount when Account changes
        $scope.selectedSubAccount = '';

        $scope.Reorganize_SubAccount();

        await $scope.showData();
    };

    $scope.Reorganize_SubAccount = function () {
        var data = [];

        if (!$scope.selectedAccount) {
            // tanpa Filter Account
            data = $scope.data_SubAccount_All;
        } else {
            // filter berdasarkan Account
            data = $scope.data_SubAccount_All.filter(function (e) {
                return e.AccountCode == $scope.selectedAccount;
            });
        }

        $scope.data_SubAccount = [...new Map(data.map((item) => [item['Code'], item])).values()].sort((x, y) => x.Code.localeCompare(y.Code));
    };

    $scope.getData_Company = async function () {
        $scope.data_Company = await GeneralLedger_Service.Dropdown_Company();
    };

    $scope.getData_Account = async function () {
        $scope.data_Account = await GeneralLedger_Service.Dropdown_Account();
    };

    $scope.getData_SubAccount = async function () {
        $scope.data_SubAccount_All = await GeneralLedger_Service.Dropdown_SubAccount();
    };

    ;

    async function Override_some_Filters() {
        let company = $scope.filters.Company.Value;
        if (company && typeof company === 'string' && company.indexOf('(') >= 0) company = '';
        $scope.selectedCompany = company;

        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let account = $scope.filters.Account.Value;
        if (account && typeof account === 'string' && account.indexOf('(') >= 0) account = '';
        $scope.selectedAccount = account;

        let subAccount = $scope.filters.SubAccount.Value;
        if (subAccount && typeof subAccount === 'string' && subAccount.indexOf('(') >= 0) subAccount = '';
        $scope.selectedSubAccount = subAccount;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Company(),
            $scope.getData_Account(),
            $scope.getData_SubAccount()
        ]);

        $rootScope.LoadFilterState('GeneralLedger', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_SubAccount();

        $scope.showData();
    };

    $scope.exportToExcel = async function () { };

    $scope.exportPerSubAccount = async function () { };

    $scope.initialize_Page();
});