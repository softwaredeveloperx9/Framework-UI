angular.module('app.erp').controller('PendingReceiptsCtrl', function ($rootScope, $scope, Utility_ERP, PendingReceipts_Service, BusinessRelation_Service) {
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
        CashAccount: { PropertyName: 'CashAccountCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        DueDateFrom_date: { PropertyName: 'DueDate', Operator: '>=', Value: '' },
        DueDateTo_date: { PropertyName: 'DueDate', Operator: '<=', Value: '' },
        PaymentMethod: { PropertyName: 'PaymentMethodCode', Operator: 'in', Value: '' },
        Customer: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
        Status: { PropertyName: 'StatusCode', Operator: 'in', Value: '' },
        Age: { PropertyName: 'AgeCode', Operator: 'in', Value: '' }
    };

    $scope.selectedBranch = '';
    $scope.selectedCashAccount = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedDueDateFrom = '';
    $scope.selectedDueDateTo = '';
    $scope.selectedPaymentMethod = '';
    $scope.selectedCustomer = '';
    $scope.selectedStatus = '';
    $scope.selectedAge = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_CashAccount = [];
    $scope.data_PaymentMethod = [];
    $scope.data_BillingAddressNames = [];
    $scope.data_Status = [];
    $scope.data_Age = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PendingReceipts_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Payment#', 'PaymentNr', 'PaymentNr', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Cash Account', 'CashAccount', 'CashAccount', 'Text', true],
            ['Method', 'Method', 'Method', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Cheque Nr', 'ChequeNr', 'ChequeNr', 'Text', true],
            ['Due Date', 'DueDate', 'DueDate', 'Date', true],
            ['Customer', 'Customer', 'Customer', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Currency', true],
            ['Status', 'Status', 'Status', 'Text', true],
            ['Age', 'Age', 'Age', 'Number', true]
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

        if (!$scope.selectedStatus) {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN_($scope.data_Status, 'Code');
        } else {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        }

        if (!$scope.selectedAge) {
            $scope.filters.Age.Operator = 'in';
            $scope.filters.Age.Value = Utility_ERP.Value_OperatorIN_($scope.data_Age, 'Code');
        } else {
            $scope.filters.Age.Operator = '=';
            $scope.filters.Age.Value = $scope.selectedAge;
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);
        $scope.filters.DueDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDueDateFrom);
        $scope.filters.DueDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDueDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;

        $rootScope.SaveFilterState('PendingReceipts', $scope);

        delete $scope.filters['selectedCustomer'];
    };

    $scope.Branch_Changed = async function () {
        // reset
        $scope.selectedCashAccount = '';

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
        // Implement service call for Cash Account dropdown
        $scope.data_CashAccount = await Finance_Service.Dropdown_CashAccount();
    };

    $scope.getData_PaymentMethod = async function () {
        // Implement service call for Payment Method dropdown
        $scope.data_PaymentMethod = await Finance_Service.Dropdown_PaymentMethod();
    };

    $scope.getData_Status = async function () {
        // Implement service call for Status dropdown
        $scope.data_Status = await Finance_Service.Dropdown_PendingReceiptsStatus();
    };

    $scope.getData_Age = async function () {
        // Implement service call for Age dropdown
        $scope.data_Age = await Finance_Service.Dropdown_Age();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let cashAccount = $scope.filters.CashAccount.Value;
        if (cashAccount && typeof cashAccount === 'string' && cashAccount.indexOf('(') >= 0) cashAccount = '';
        $scope.selectedCashAccount = cashAccount;

        let paymentMethod = $scope.filters.PaymentMethod.Value;
        if (paymentMethod && typeof paymentMethod === 'string' && paymentMethod.indexOf('(') >= 0) paymentMethod = '';
        $scope.selectedPaymentMethod = paymentMethod;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        let age = $scope.filters.Age.Value;
        if (age && typeof age === 'string' && age.indexOf('(') >= 0) age = '';
        $scope.selectedAge = age;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedCustomer = $scope.filters['selectedCustomer'];
            delete $scope.filters['selectedCustomer'];

            await $scope.customerSelected(false);
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_CashAccount(),
            $scope.getData_PaymentMethod(),
            $scope.getData_Status(),
            $scope.getData_Age()
        ]);

        $rootScope.LoadFilterState('PendingReceipts', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.updateStatus = async function () {
        // Implement update status functionality
    };

    $scope.printForm = async function () {
        // Implement print functionality
    };

    $scope.exportList = async function () {
        // Implement export to Excel functionality
    };

    $scope.initialize_Page();
});