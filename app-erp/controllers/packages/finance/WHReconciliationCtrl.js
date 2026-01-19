angular.module('app.erp').controller('WHReconciliationCtrl', function ($rootScope, $scope, Utility_ERP, WHReconciliation_Service) {
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
        WHTax: { PropertyName: 'WHTaxCode', Operator: 'in', Value: '' },
        Type: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
    };

    $scope.selectedYear = null;
    $scope.selectedPeriod = null;
    $scope.selectedBranch = '';
    $scope.selectedWHTax = '';
    $scope.selectedType = '';

    $scope.data_Year = [];
    $scope.data_Period = [];
    $scope.data_EmployeeLocationAccess = [];
    $scope.data_WHTax = [];
    $scope.data_Type = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = WHReconciliation_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Year', 'Year', 'Year', 'Number', true],
            ['Period', 'Period', 'Period', 'Number', true],
            ['B/R Tax ID', 'BRTaxID', 'BRTaxID', 'Text', true],
            ['B/R', 'BR', 'BR', 'Text', true],
            ['Tax Nr.', 'TaxNr', 'TaxNr', 'Text', true],
            ['Tax Date', 'TaxDate', 'TaxDate', 'Date', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Gross Amount', 'GrossAmount', 'GrossAmount', 'Currency', true],
            ['Rate', 'Rate', 'Rate', 'Number', true],
            ['W/H Amount', 'WHAmount', 'WHAmount', 'Currency', true],
            ['Doc Nr.', 'DocNr', 'DocNr', 'Text', true],
            ['Type', 'Type', 'Type', 'Text', true],
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

        if (!$scope.selectedWHTax) {
            $scope.filters.WHTax.Operator = 'in';
            $scope.filters.WHTax.Value = Utility_ERP.Value_OperatorIN_($scope.data_WHTax, 'Code');
        } else {
            $scope.filters.WHTax.Operator = '=';
            $scope.filters.WHTax.Value = $scope.selectedWHTax;
        }

        if (!$scope.selectedType) {
            $scope.filters.Type.Operator = 'in';
            $scope.filters.Type.Value = Utility_ERP.Value_OperatorIN_($scope.data_Type, 'Code');
        } else {
            $scope.filters.Type.Operator = '=';
            $scope.filters.Type.Value = $scope.selectedType;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('WHReconciliation', $scope);
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

    $scope.getData_WHTax = async function () {
        $scope.data_WHTax = await WHReconciliation_Service.Dropdown_WHTax();
    };

    $scope.getData_Type = async function () {
        $scope.data_Type = await WHReconciliation_Service.Dropdown_WHReconciliationType();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let whtax = $scope.filters.WHTax.Value;
        if (whtax && typeof whtax === 'string' && whtax.indexOf('(') >= 0) whtax = '';
        $scope.selectedWHTax = whtax;

        let type = $scope.filters.Type.Value;
        if (type && typeof type === 'string' && type.indexOf('(') >= 0) type = '';
        $scope.selectedType = type;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Year(),
            $scope.getData_Period(),
            $scope.getData_WHTax(),
            $scope.getData_Type()
        ]);

        $rootScope.LoadFilterState('WHReconciliation', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.exportToExcel = async function () {
        // Export to Excel functionality
    };

    $scope.assignTaxNumber = async function () {
        // Assign Tax Number functionality
    };

    $scope.initialize_Page();
});