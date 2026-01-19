angular.module('app.erp').controller('VATReconciliationCtrl', function ($rootScope, $scope, Utility_ERP, VATReconciliation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Year: { PropertyName: 'Year', Operator: '=', Value: null },
        Period: { PropertyName: 'Period', Operator: '=', Value: null },
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
    };

    $scope.selectedYear = null;
    $scope.selectedPeriod = null;
    $scope.selectedBranch = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';

    $scope.data_Year = [];
    $scope.data_Period = [];
    $scope.data_EmployeeLocationAccess = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = VATReconciliation_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Invoice Nr.', 'InvoiceNr', 'InvoiceNr', 'Text', true],
            ['Type', 'Type', 'Type', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Posted Date', 'PostedDate', 'PostedDate', 'Date', true],
            ['B/R', 'BR', 'BR', 'Text', true],
            ['B/R Tax ID', 'BRTaxID', 'BRTaxID', 'Text', true],
            ['Subject Amount', 'SubjectAmount', 'SubjectAmount', 'Currency', true],
            ['VAT Amount In', 'VATAmountIn', 'VATAmountIn', 'Currency', true],
            ['VAT Amount Out', 'VATAmountOut', 'VATAmountOut', 'Currency', true],
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

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('VATReconciliation', $scope);
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Year = async function () {
        // Generate years dropdown (current year and previous years)
        const currentYear = new Date().getFullYear();
        $scope.data_Year = [];
        for (let i = 0; i < 10; i++) {
            $scope.data_Year.push({ Value: currentYear - i, Text: (currentYear - i).toString() });
        }
    };

    $scope.getData_Period = async function () {
        // Generate periods dropdown (1-12 for months)
        $scope.data_Period = [];
        for (let i = 1; i <= 12; i++) {
            $scope.data_Period.push({ Value: i, Text: i.toString() });
        }
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Year(),
            $scope.getData_Period()
        ]);

        $rootScope.LoadFilterState('VATReconciliation', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.exportESPTVATOut = async function () {
        // Export e-SPT VAT Out functionality
    };

    $scope.exportESPTVATIn = async function () {
        // Export e-SPT VAT In functionality
    };

    $scope.initialize_Page();
});