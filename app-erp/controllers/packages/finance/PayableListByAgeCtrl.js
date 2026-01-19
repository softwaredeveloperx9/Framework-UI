angular.module('app.erp').controller('PayableListByAgeCtrl', function ($rootScope, $scope, Utility_ERP, PayableListByAge_Service, BusinessRelation_Service) {
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
        ReasonType: { PropertyName: 'ReasonTypeCode', Operator: 'in', Value: '' },
        Currency: { PropertyName: 'CurrencyCode', Operator: 'in', Value: '' },
        HoldReason: { PropertyName: 'HoldReasonCode', Operator: 'in', Value: '' },
        BR: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedReasonType = '';
    $scope.selectedCurrency = '';
    $scope.selectedHoldReason = '';
    $scope.selectedBR = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_ReasonType = [];
    $scope.data_Currency = [];
    $scope.data_HoldReason = [];
    $scope.data_BillingAddressNames = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PayableListByAge_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Invoice #', 'Invoice', 'Invoice', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Reason', 'Reason', 'Reason', 'Text', true],
            ['Amount Due', 'AmountDue', 'AmountDue', 'Number', true],
            ['Due Date', 'DueDate', 'DueDate', 'Date', true],
            ['Age', 'Age', 'Age', 'Number', true],
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

        if (!$scope.selectedReasonType) {
            $scope.filters.ReasonType.Operator = 'in';
            $scope.filters.ReasonType.Value = Utility_ERP.Value_OperatorIN_($scope.data_ReasonType, 'Code');
        } else {
            $scope.filters.ReasonType.Operator = '=';
            $scope.filters.ReasonType.Value = $scope.selectedReasonType;
        }

        if (!$scope.selectedCurrency) {
            $scope.filters.Currency.Operator = 'in';
            $scope.filters.Currency.Value = Utility_ERP.Value_OperatorIN_($scope.data_Currency, 'Code');
        } else {
            $scope.filters.Currency.Operator = '=';
            $scope.filters.Currency.Value = $scope.selectedCurrency;
        }

        if (!$scope.selectedHoldReason) {
            $scope.filters.HoldReason.Operator = 'in';
            $scope.filters.HoldReason.Value = Utility_ERP.Value_OperatorIN_($scope.data_HoldReason, 'Code');
        } else {
            $scope.filters.HoldReason.Operator = '=';
            $scope.filters.HoldReason.Value = $scope.selectedHoldReason;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedBR'] = $scope.selectedBR;

        $rootScope.SaveFilterState('PayableListByAge', $scope);

        delete $scope.filters['selectedBR'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.customerSelected = async function (flag = true) {
        // reset
        $scope.data_BillingAddressNames = [];

        if ($rootScope.Not_ValidString($scope.filters.BR.Value)) {
            if (flag) {
                $scope.showData();
            }

            return;
        }

        $scope.data_BillingAddressNames = await BusinessRelation_Service.GetBusinessRelationBillingAddressNames($scope.filters.BR.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_ReasonType = async function () {
        $scope.data_ReasonType = await PayableListByAge_Service.Dropdown_ReasonType();
    };

    $scope.getData_Currency = async function () {
        $scope.data_Currency = await PayableListByAge_Service.Dropdown_Currency();
    };

    $scope.getData_HoldReason = async function () {
        $scope.data_HoldReason = await PayableListByAge_Service.Dropdown_HoldReason();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let reasonType = $scope.filters.ReasonType.Value;
        if (reasonType && typeof reasonType === 'string' && reasonType.indexOf('(') >= 0) reasonType = '';
        $scope.selectedReasonType = reasonType;

        let currency = $scope.filters.Currency.Value;
        if (currency && typeof currency === 'string' && currency.indexOf('(') >= 0) currency = '';
        $scope.selectedCurrency = currency;

        let holdReason = $scope.filters.HoldReason.Value;
        if (holdReason && typeof holdReason === 'string' && holdReason.indexOf('(') >= 0) holdReason = '';
        $scope.selectedHoldReason = holdReason;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedBR = $scope.filters['selectedBR'];
            delete $scope.filters['selectedBR'];

            await $scope.customerSelected(false);
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_ReasonType(),
            $scope.getData_Currency(),
            $scope.getData_HoldReason()
        ]);

        $rootScope.LoadFilterState('PayableListByAge', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.closeClick = async function () {
        // Implementation for close (Esc)
    };

    $scope.initialize_Page();
});