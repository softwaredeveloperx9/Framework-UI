angular.module('app.erp').controller('GLJournalsCtrl', function ($rootScope, $scope, Utility_ERP, GLJournals_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.moduleOptions = [
        { Value: null, Text: 'All' },
        { Value: 'AP', Text: 'AP' },
        { Value: 'AR', Text: 'AR' },
        { Value: 'GL', Text: 'GL' },
        { Value: 'INV', Text: 'INV' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Module: { PropertyName: 'Module', Operator: '=', Value: null },
        ProjectNr: { PropertyName: 'ProjectCode', Operator: 'in', Value: '' },
        Currency: { PropertyName: 'CurrencyCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedProjectNr = '';
    $scope.selectedCurrency = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_ProjectNr = [];
    $scope.data_Currency = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = GLJournals_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Journal #', 'JournalNr', 'JournalNr', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Subject', 'Subject', 'Subject', 'Text', true],
            ['Mod', 'Mod', 'Mod', 'Text', true],
            ['Doc Nr.', 'DocNr', 'DocNr', 'Text', true],
            ['Project', 'Project', 'Project', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Currency', true],
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

        if (!$scope.selectedProjectNr) {
            $scope.filters.ProjectNr.Operator = 'in';
            $scope.filters.ProjectNr.Value = Utility_ERP.Value_OperatorIN_($scope.data_ProjectNr, 'Code');
        } else {
            $scope.filters.ProjectNr.Operator = '=';
            $scope.filters.ProjectNr.Value = $scope.selectedProjectNr;
        }

        if (!$scope.selectedCurrency) {
            $scope.filters.Currency.Operator = 'in';
            $scope.filters.Currency.Value = Utility_ERP.Value_OperatorIN_($scope.data_Currency, 'Code');
        } else {
            $scope.filters.Currency.Operator = '=';
            $scope.filters.Currency.Value = $scope.selectedCurrency;
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('GLJournals', $scope);
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_ProjectNr = async function () {
        $scope.data_ProjectNr = await GLJournals_Service.Dropdown_ProjectNr();
    };

    $scope.getData_Currency = async function () {
        $scope.data_Currency = await GLJournals_Service.Dropdown_Currency();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let projectNr = $scope.filters.ProjectNr.Value;
        if (projectNr && typeof projectNr === 'string' && projectNr.indexOf('(') >= 0) projectNr = '';
        $scope.selectedProjectNr = projectNr;

        let currency = $scope.filters.Currency.Value;
        if (currency && typeof currency === 'string' && currency.indexOf('(') >= 0) currency = '';
        $scope.selectedCurrency = currency;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_ProjectNr(),
            $scope.getData_Currency()
        ]);

        $rootScope.LoadFilterState('GLJournals', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.voidJournal = async function () { };

    $scope.deleteJournal = async function () { };

    $scope.downloadSchema = async function () { };

    $scope.uploadJournal = async function () { };

    $scope.printForm = async function () { };

    $scope.exportList = async function () { };

    $scope.initialize_Page();
});