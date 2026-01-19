angular.module('app.erp').controller('CustomerReceiptsCtrl', function ($rootScope, $scope, Utility_ERP, CustomerReceipts_Service, BusinessRelation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.activeOptions = [
        { Value: null, Text: 'All' },
        { Value: true, Text: 'Yes' },
        { Value: false, Text: 'No' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        CashAccount: { PropertyName: 'CashAccountCode', Operator: 'in', Value: '' },
        ClearDateFrom_date: { PropertyName: 'ClearDate', Operator: '>=', Value: '' },
        ClearDateTo_date: { PropertyName: 'ClearDate', Operator: '<=', Value: '' },
        PaymentMethod: { PropertyName: 'PaymentMethodCode', Operator: 'in', Value: '' },
        Customer: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
        Age: { PropertyName: 'Age', Operator: 'in', Value: '' },
        UnPrinted: { PropertyName: 'PrintCount', Operator: '<=', Value: null },
        UnreconciledOnly: { PropertyName: 'Reconciled', Operator: '=', Value: null },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedCashAccount = '';
    $scope.selectedClearDateFrom = '';
    $scope.selectedClearDateTo = '';
    $scope.selectedPaymentMethod = '';
    $scope.selectedCustomer = '';
    $scope.selectedAge = '';
    $scope.selectedUnPrinted = false;
    $scope.selectedUnreconciledOnly = false;
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_CashAccount = [];
    $scope.data_PaymentMethod = [];
    $scope.data_BillingAddressNames = [];
    $scope.data_Age = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = CustomerReceipts_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Payment#', 'Code', 'Code', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'BranchName', 'BranchName', 'Text', true],
            ['Cash Account', 'CashAccountName', 'CashAccountName', 'Text', true],
            ['Method', 'PaymentMethodName', 'PaymentMethodName', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Cheque Nr', 'ChequeNumber', 'ChequeNumber', 'Text', true],
            ['Clear Date', 'ClearDate', 'ClearDate', 'Date', true],
            ['Customer', 'CustomerName', 'CustomerName', 'Text', true],
            ['Amount', 'TotalAmount', 'TotalAmount', 'Currency', true],
            ['Status', 'StatusName', 'StatusName', 'Text', true],
            ['Age', 'Age', 'Age', 'Number', true],
            ['Printed', 'PrintCount', 'PrintCount', 'Number', true],
            ['R', 'Reconciled', 'Reconciled', 'Boolean', true],
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

        if (!$scope.selectedCashAccount) {
            $scope.filters.CashAccount.Operator = 'in';
            $scope.filters.CashAccount.Value = Utility_ERP.Value_OperatorIN_($scope.data_CashAccount, 'Code');
        } else {
            $scope.filters.CashAccount.Operator = '=';
            $scope.filters.CashAccount.Value = $scope.selectedCashAccount;
        }

        $scope.filters.ClearDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedClearDateFrom);
        $scope.filters.ClearDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedClearDateTo);

        if (!$scope.selectedPaymentMethod) {
            $scope.filters.PaymentMethod.Operator = 'in';
            $scope.filters.PaymentMethod.Value = Utility_ERP.Value_OperatorIN_($scope.data_PaymentMethod, 'Code');
        } else {
            $scope.filters.PaymentMethod.Operator = '=';
            $scope.filters.PaymentMethod.Value = $scope.selectedPaymentMethod;
        }

        if (!$scope.selectedAge) {
            $scope.filters.Age.Operator = 'in';
            $scope.filters.Age.Value = Utility_ERP.Value_OperatorIN_($scope.data_Age, 'Code');
        } else {
            $scope.filters.Age.Operator = '=';
            $scope.filters.Age.Value = $scope.selectedAge;
        }

        $scope.filters.UnPrinted.Value = null;
        if ($scope.selectedUnPrinted) {
            $scope.filters.UnPrinted.Value = 0;
        }

        $scope.filters.UnreconciledOnly.Value = null;
        if ($scope.selectedUnreconciledOnly) {
            $scope.filters.UnreconciledOnly.Value = false;
        }

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;
        $scope.filters['selectedUnPrinted'] = $scope.selectedUnPrinted;
        $scope.filters['selectedUnreconciledOnly'] = $scope.selectedUnreconciledOnly;

        $rootScope.SaveFilterState('CustomerReceipts', $scope);

        delete $scope.filters['selectedCustomer'];
        delete $scope.filters['selectedShowAll'];
        delete $scope.filters['selectedUnPrinted'];
        delete $scope.filters['selectedUnreconciledOnly'];
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

    $scope.getData_CashAccount = async function () {
        $scope.data_CashAccount = await CustomerReceipts_Service.Dropdown_CashAccount();
    };

    $scope.getData_PaymentMethod = async function () {
        $scope.data_PaymentMethod = await CustomerReceipts_Service.Dropdown_PaymentMethod();
    };

    $scope.getData_Age = async function () {
        $scope.data_Age = await CustomerReceipts_Service.Dropdown_Age();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('CustomerReceipt');

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

    

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let cashAccount = $scope.filters.CashAccount.Value;
        if (cashAccount && typeof cashAccount === 'string' && cashAccount.indexOf('(') >= 0) cashAccount = '';
        $scope.selectedCashAccount = cashAccount;

        let paymentMethod = $scope.filters.PaymentMethod.Value;
        if (paymentMethod && typeof paymentMethod === 'string' && paymentMethod.indexOf('(') >= 0) paymentMethod = '';
        $scope.selectedPaymentMethod = paymentMethod;

        let age = $scope.filters.Age.Value;
        if (age && typeof age === 'string' && age.indexOf('(') >= 0) age = '';
        $scope.selectedAge = age;

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

            $scope.selectedUnPrinted = $scope.filters['selectedUnPrinted'];
            delete $scope.filters['selectedUnPrinted'];

            $scope.selectedUnreconciledOnly = $scope.filters['selectedUnreconciledOnly'];
            delete $scope.filters['selectedUnreconciledOnly'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_CashAccount(),
            $scope.getData_PaymentMethod(),
            $scope.getData_Age(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('CustomerReceipts', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.printForm = async function () { }

    $scope.exportList = async function () { }

    $scope.voidReceipt = async function () { }

    $scope.deleteReceipt = async function () { }

    $scope.downloadSchema = async function () { }

    $scope.uploadData = async function () { }

    $scope.initialize_Page();
});