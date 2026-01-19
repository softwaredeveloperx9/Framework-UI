angular.module('app.erp').controller('VendorPaymentsCtrl', function ($rootScope, $scope, Utility_ERP, VendorPayments_Service, BusinessRelation_Service) {
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
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        CashAccount: { PropertyName: 'CashAccountCode', Operator: 'in', Value: '' },
        ClearDateFrom_date: { PropertyName: 'ClearDate', Operator: '>=', Value: '' },
        ClearDateTo_date: { PropertyName: 'ClearDate', Operator: '<=', Value: '' },
        PaymentMethod: { PropertyName: 'PaymentMethodCode', Operator: 'in', Value: '' },
        Vendor: { PropertyName: 'VendorID', Operator: '=', Value: '' },
        Age: { PropertyName: 'Age', Operator: 'in', Value: '' },
        UnPrinted: { PropertyName: 'PrintCount', Operator: '<=', Value: null },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedCashAccount = '';
    $scope.selectedClearDateFrom = '';
    $scope.selectedClearDateTo = '';
    $scope.selectedPaymentMethod = '';
    $scope.selectedVendor = '';
    $scope.selectedAge = '';
    $scope.selectedUnPrinted = false;
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_CashAccount = [];
    $scope.data_PaymentMethod = [];
    $scope.data_Age = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = VendorPayments_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Payment#', 'PaymentNumber', 'PaymentNumber', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Cash Account', 'CashAccount', 'CashAccount', 'Text', true],
            ['Method', 'Method', 'Method', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Cheque Nr', 'ChequeNr', 'ChequeNr', 'Text', true],
            ['Clear Date', 'ClearDate', 'ClearDate', 'Date', true],
            ['Vendor', 'Vendor', 'Vendor', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Currency', true],
            ['Status', 'Status', 'Status', 'Text', true],
            ['Age', 'Age', 'Age', 'Number', true],
            ['P', 'P', 'P', 'Boolean', true],
            ['R', 'R', 'R', 'Boolean', true],
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

        if (!$scope.selectedCashAccount) {
            $scope.filters.CashAccount.Operator = 'in';
            $scope.filters.CashAccount.Value = Utility_ERP.Value_OperatorIN_($scope.data_CashAccount, 'Code');
        } else {
            $scope.filters.CashAccount.Operator = '=';
            $scope.filters.CashAccount.Value = $scope.selectedCashAccount;
        }

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

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        $scope.filters.ClearDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedClearDateFrom);
        $scope.filters.ClearDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedClearDateTo);

        $scope.filters.UnPrinted.Value = null;
        if ($scope.selectedUnPrinted) {
            $scope.filters.UnPrinted.Value = 0;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedVendor'] = $scope.selectedVendor;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;
        $scope.filters['selectedUnPrinted'] = $scope.selectedUnPrinted;

        $rootScope.SaveFilterState('VendorPayments', $scope);

        delete $scope.filters['selectedVendor'];
        delete $scope.filters['selectedShowAll'];
        delete $scope.filters['selectedUnPrinted'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Vendor = async function (val) {
        return await $rootScope.getData_Vendor(val, $scope);
    };

    $scope.vendorSelected = async function (flag = true) {
        if ($rootScope.Not_ValidString($scope.filters.Vendor.Value)) {
            if (flag) {
                $scope.showData();
            }
            return;
        }

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_CashAccount = async function () {
        $scope.data_CashAccount = await Finance_Service.Dropdown_CashAccount();
    };

    $scope.getData_PaymentMethod = async function () {
        $scope.data_PaymentMethod = await Finance_Service.Dropdown_PaymentMethod();
    };

    $scope.getData_Age = async function () {
        $scope.data_Age = await Finance_Service.Dropdown_Age();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('VendorPayment');

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

            $scope.selectedVendor = $scope.filters['selectedVendor'];
            delete $scope.filters['selectedVendor'];

            await $scope.vendorSelected(false);

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];

            $scope.selectedUnPrinted = $scope.filters['selectedUnPrinted'];
            delete $scope.filters['selectedUnPrinted'];
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

        $rootScope.LoadFilterState('VendorPayments', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.printForm = async function () { }

    $scope.exportList = async function () { }

    $scope.voidPayment = async function () { }

    $scope.deletePayment = async function () { }

    $scope.downloadSchema = async function () { }

    $scope.uploadData = async function () { }

    $scope.initialize_Page();
});