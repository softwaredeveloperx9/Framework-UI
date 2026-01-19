angular.module('app.erp').controller('DownPaymentsCtrl', function ($rootScope, $scope, Utility_ERP, DownPayments_Service, BusinessRelation_Service) {
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
        Customer: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
        Currency: { PropertyName: 'CurrencyCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        ReasonType: { PropertyName: 'ReasonTypeCode', Operator: 'in', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedCustomer = '';
    $scope.selectedCurrency = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedReasonType = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_BillingAddressNames = [];
    $scope.data_Currency = [];
    $scope.data_ReasonType = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = DownPayments_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Deposit #', 'DepositNo', 'DepositNo', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Reason', 'Reason', 'Reason', 'Text', true],
            ['PO#', 'PONo', 'PONo', 'Text', true],
            ['Customer', 'Customer', 'Customer', 'Text', true],
            ['Deposit Balance', 'DepositBalance', 'DepositBalance', 'Number', true],
            ['Status', 'Status', 'Status', 'Text', true],
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

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('DownPayments', $scope);

        delete $scope.filters['selectedCustomer'];
        delete $scope.filters['selectedShowAll'];
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

    $scope.getData_Currency = async function () {
        $scope.data_Currency = await DownPayments_Service.Dropdown_Currency();
    };

    $scope.getData_ReasonType = async function () {
        $scope.data_ReasonType = await DownPayments_Service.Dropdown_ReasonType();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('DownPayment');

        // prettier-ignore
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        $rootScope.SetDefaultDropdownList($scope.data_Status, 'StatusId', $scope, 'selectedStatus');
    };

    $scope.selectedShowAll_Change = async function (flag = true, flag2 = true) {
        // prettier-ignore
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        // just to make UX consistent
        if (flag2) $scope.selectedStatus = '';

        if (flag) {
            await $scope.showData();
        }
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

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedCustomer = $scope.filters['selectedCustomer'];
            delete $scope.filters['selectedCustomer'];

            await $scope.customerSelected(false);

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Currency(),
            $scope.getData_ReasonType(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('DownPayments', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.printForm = async function () {
        // Implementation for print
    };

    $scope.refundClick = async function () {
        // Implementation for refund
    };

    $scope.disposeClick = async function () {
        // Implementation for dispose
    };

    $scope.voidClick = async function () {
        // Implementation for void
    };

    $scope.deleteClick = async function () {
        // Implementation for delete
    };

    $scope.initialize_Page();
});