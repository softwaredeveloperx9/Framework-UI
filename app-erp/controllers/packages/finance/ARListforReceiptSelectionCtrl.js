angular.module('app.erp').controller('ARListForReceiptSelectionCtrl', function ($rootScope, $scope, Utility_ERP, ARListForReceiptSelection_Service, BusinessRelation_Service) {
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
        Currency: { PropertyName: 'CurrencyCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        DueDateFrom_date: { PropertyName: 'DueDate', Operator: '>=', Value: '' },
        DueDateTo_date: { PropertyName: 'DueDate', Operator: '<=', Value: '' },
        BR: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
        ReasonType: { PropertyName: 'ReasonTypeCode', Operator: 'in', Value: '' },
        CollectDay: { PropertyName: 'CollectDay', Operator: 'in', Value: '' },
        CollectArea: { PropertyName: 'CollectAreaCode', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedCurrency = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedDueDateFrom = '';
    $scope.selectedDueDateTo = '';
    $scope.selectedBR = '';
    $scope.selectedReasonType = '';
    $scope.selectedCollectDay = '';
    $scope.selectedCollectArea = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Currency = [];
    $scope.data_ReasonType = [];
    $scope.data_CollectDay = [];
    $scope.data_CollectArea = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = ARListForReceiptSelection_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Invoice #', 'InvoiceNo', 'InvoiceNo', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Reason', 'Reason', 'Reason', 'Text', true],
            ['PO#', 'PONo', 'PONo', 'Text', true],
            ['Amount Due', 'AmountDue', 'AmountDue', 'Number', true],
            ['Due Date', 'DueDate', 'DueDate', 'Date', true],
            ['Receipt Nr.', 'ReceiptNr', 'ReceiptNr', 'Text', true],
            ['Collect Day', 'CollectDay', 'CollectDay', 'Text', true],
            ['Collect Address', 'CollectAddress', 'CollectAddress', 'Text', true],
            ['Collect Area', 'CollectArea', 'CollectArea', 'Text', true],
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

        if (!$scope.selectedCurrency) {
            $scope.filters.Currency.Operator = 'in';
            $scope.filters.Currency.Value = Utility_ERP.Value_OperatorIN_($scope.data_Currency, 'Code');
        } else {
            $scope.filters.Currency.Operator = '=';
            $scope.filters.Currency.Value = $scope.selectedCurrency;
        }

        if (!$scope.selectedReasonType) {
            $scope.filters.ReasonType.Operator = 'in';
            $scope.filters.ReasonType.Value = Utility_ERP.Value_OperatorIN_($scope.data_ReasonType, 'Code');
        } else {
            $scope.filters.ReasonType.Operator = '=';
            $scope.filters.ReasonType.Value = $scope.selectedReasonType;
        }

        if (!$scope.selectedCollectDay) {
            $scope.filters.CollectDay.Operator = 'in';
            $scope.filters.CollectDay.Value = Utility_ERP.Value_OperatorIN_($scope.data_CollectDay, 'Code');
        } else {
            $scope.filters.CollectDay.Operator = '=';
            $scope.filters.CollectDay.Value = $scope.selectedCollectDay;
        }

        if (!$scope.selectedCollectArea) {
            $scope.filters.CollectArea.Operator = 'in';
            $scope.filters.CollectArea.Value = Utility_ERP.Value_OperatorIN_($scope.data_CollectArea, 'Code');
        } else {
            $scope.filters.CollectArea.Operator = '=';
            $scope.filters.CollectArea.Value = $scope.selectedCollectArea;
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        $scope.filters.DueDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDueDateFrom);
        $scope.filters.DueDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDueDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedBR'] = $scope.selectedBR;

        $rootScope.SaveFilterState('ARListForReceiptSelection', $scope);

        delete $scope.filters['selectedBR'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.customerSelected = async function (flag = true) {
        if ($rootScope.Not_ValidString($scope.filters.BR.Value)) {
            if (flag) {
                $scope.showData();
            }
            return;
        }

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_Currency = async function () {
        //$scope.data_Currency = await Currency_Service.Dropdown();
    };

    $scope.getData_ReasonType = async function () {
        // Implement service call to get reason types
        $scope.data_ReasonType = await ARListForReceiptSelection_Service.Dropdown_ReasonType();
    };

    $scope.getData_CollectDay = async function () {
        // Implement service call to get collect days
        $scope.data_CollectDay = await ARListForReceiptSelection_Service.Dropdown_CollectDay();
    };

    $scope.getData_CollectArea = async function () {
        // Implement service call to get collect areas
        $scope.data_CollectArea = await ARListForReceiptSelection_Service.Dropdown_CollectArea();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let currency = $scope.filters.Currency.Value;
        if (currency && typeof currency === 'string' && currency.indexOf('(') >= 0) currency = '';
        $scope.selectedCurrency = currency;

        let reasonType = $scope.filters.ReasonType.Value;
        if (reasonType && typeof reasonType === 'string' && reasonType.indexOf('(') >= 0) reasonType = '';
        $scope.selectedReasonType = reasonType;

        let collectDay = $scope.filters.CollectDay.Value;
        if (collectDay && typeof collectDay === 'string' && collectDay.indexOf('(') >= 0) collectDay = '';
        $scope.selectedCollectDay = collectDay;

        let collectArea = $scope.filters.CollectArea.Value;
        if (collectArea && typeof collectArea === 'string' && collectArea.indexOf('(') >= 0) collectArea = '';
        $scope.selectedCollectArea = collectArea;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedBR = $scope.filters['selectedBR'];
            delete $scope.filters['selectedBR'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Currency(),
            $scope.getData_ReasonType(),
            $scope.getData_CollectDay(),
            $scope.getData_CollectArea()
        ]);

        $rootScope.LoadFilterState('ARListForReceiptSelection', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.addReceipt = async function () {
        // Implement add receipt functionality
    };

    $scope.initialize_Page();
});