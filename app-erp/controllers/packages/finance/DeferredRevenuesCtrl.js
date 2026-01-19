angular.module('app.erp').controller('DeferredRevenuesCtrl', function ($rootScope, $scope, Utility_ERP, DeferredRevenues_Service, BusinessRelation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Year: { PropertyName: 'Year', Operator: 'in', Value: '' },
        Period: { PropertyName: 'Period', Operator: 'in', Value: '' },
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        ReasonType: { PropertyName: 'ReasonType', Operator: 'in', Value: '' },
        TotalAmount: { PropertyName: 'TotalAmount', Operator: '=', Value: null },
        Customer: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
    };

    $scope.selectedYear = '';
    $scope.selectedPeriod = '';
    $scope.selectedBranch = '';
    $scope.selectedReasonType = '';
    $scope.selectedCustomer = '';

    $scope.data_Year = [];
    $scope.data_Period = [];
    $scope.data_EmployeeLocationAccess = [];
    $scope.data_ReasonType = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = DeferredRevenues_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Invoice Nr.', 'InvoiceNr', 'InvoiceNr', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Reason', 'Reason', 'Reason', 'Text', true],
            ['PO#', 'PONo', 'PONo', 'Text', true],
            ['Customer', 'Customer', 'Customer', 'Text', true],
            ['Deferred Amount', 'DeferredAmount', 'DeferredAmount', 'Number', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedYear) {
            $scope.filters.Year.Operator = 'in';
            $scope.filters.Year.Value = Utility_ERP.Value_OperatorIN_($scope.data_Year, 'Code');
        } else {
            $scope.filters.Year.Operator = '=';
            $scope.filters.Year.Value = $scope.selectedYear;
        }

        if (!$scope.selectedPeriod) {
            $scope.filters.Period.Operator = 'in';
            $scope.filters.Period.Value = Utility_ERP.Value_OperatorIN_($scope.data_Period, 'Code');
        } else {
            $scope.filters.Period.Operator = '=';
            $scope.filters.Period.Value = $scope.selectedPeriod;
        }

        if (!$scope.selectedBranch) {
            $scope.filters.Branch.Operator = 'in';
            $scope.filters.Branch.Value = Utility_ERP.Value_OperatorIN_($scope.data_EmployeeLocationAccess, 'Code');
        } else {
            $scope.filters.Branch.Operator = '=';
            $scope.filters.Branch.Value = $scope.selectedBranch;
        }

        if (!$scope.selectedReasonType) {
            $scope.filters.ReasonType.Operator = 'in';
            $scope.filters.ReasonType.Value = Utility_ERP.Value_OperatorIN_($scope.data_ReasonType, 'Code');
        } else {
            $scope.filters.ReasonType.Operator = '=';
            $scope.filters.ReasonType.Value = $scope.selectedReasonType;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;

        $rootScope.SaveFilterState('DeferredRevenues', $scope);

        delete $scope.filters['selectedCustomer'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Year = async function () {
        $scope.data_Year = await DeferredRevenues_Service.Dropdown_Year();
    };

    $scope.getData_Period = async function () {
        $scope.data_Period = await DeferredRevenues_Service.Dropdown_Period();
    };

    $scope.getData_ReasonType = async function () {
        $scope.data_ReasonType = await DeferredRevenues_Service.Dropdown_ReasonType();
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.customerSelected = async function (flag = true) {
        if (flag) {
            $scope.showData();
        }
    };

    ;

    async function Override_some_Filters() {
        let year = $scope.filters.Year.Value;
        if (year && typeof year === 'string' && year.indexOf('(') >= 0) year = '';
        $scope.selectedYear = year;

        let period = $scope.filters.Period.Value;
        if (period && typeof period === 'string' && period.indexOf('(') >= 0) period = '';
        $scope.selectedPeriod = period;

        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let reasonType = $scope.filters.ReasonType.Value;
        if (reasonType && typeof reasonType === 'string' && reasonType.indexOf('(') >= 0) reasonType = '';
        $scope.selectedReasonType = reasonType;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedCustomer = $scope.filters['selectedCustomer'];
            delete $scope.filters['selectedCustomer'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_Year(),
            $scope.getData_Period(),
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_ReasonType()
        ]);

        $rootScope.LoadFilterState('DeferredRevenues', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.exportList = async function () {
        // Implementasi export to excel
    };

    $scope.initialize_Page();
});