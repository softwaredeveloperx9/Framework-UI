angular.module('app.erp').controller('DebitNotesCtrl', function ($rootScope, $scope, Utility_ERP, DebitNotes_Service, BusinessRelation_Service) {
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
        Currency: { PropertyName: 'CurrencyCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        DueDateFrom_date: { PropertyName: 'DueDate', Operator: '>=', Value: '' },
        DueDateTo_date: { PropertyName: 'DueDate', Operator: '<=', Value: '' },
        Customer: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
        ReasonType: { PropertyName: 'ReasonTypeCode', Operator: 'in', Value: '' },
        DueIn: { PropertyName: 'DueIn', Operator: 'in', Value: '' },
        Age: { PropertyName: 'Age', Operator: 'in', Value: '' },
        UnPrinted: { PropertyName: 'PrintCount', Operator: '<=', Value: null },
        RequireVATNr: { PropertyName: 'RequireVATNumber', Operator: '=', Value: null },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedCurrency = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedDueDateFrom = '';
    $scope.selectedDueDateTo = '';
    $scope.selectedCustomer = '';
    $scope.selectedReasonType = '';
    $scope.selectedDueIn = '';
    $scope.selectedAge = '';
    $scope.selectedUnPrinted = false;
    $scope.selectedRequireVATNr = false;
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Currency = [];
    $scope.data_ReasonType = [];
    $scope.data_DueIn = [];
    $scope.data_Age = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = DebitNotes_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Debit Note #', 'DebitNoteNr', 'DebitNoteNr', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Reason', 'Reason', 'Reason', 'Text', true],
            ['PO#', 'PONr', 'PONr', 'Text', true],
            ['Customer', 'Customer', 'Customer', 'Text', true],
            ['Amount Due', 'AmountDue', 'AmountDue', 'Currency', true],
            ['Amount Paid', 'AmountPaid', 'AmountPaid', 'Currency', true],
            ['Due Date', 'DueDate', 'DueDate', 'Date', true],
            ['Age', 'Age', 'Age', 'Number', true],
            ['Status', 'Status', 'Status', 'Text', true],
            ['Printed', 'Printed', 'Printed', 'Number', true],
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

        if (!$scope.selectedDueIn) {
            $scope.filters.DueIn.Operator = 'in';
            $scope.filters.DueIn.Value = Utility_ERP.Value_OperatorIN_($scope.data_DueIn, 'Code');
        } else {
            $scope.filters.DueIn.Operator = '=';
            $scope.filters.DueIn.Value = $scope.selectedDueIn;
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

        $scope.filters.DueDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDueDateFrom);
        $scope.filters.DueDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDueDateTo);

        $scope.filters.UnPrinted.Value = null;
        if ($scope.selectedUnPrinted) {
            $scope.filters.UnPrinted.Value = 0;
        }

        $scope.filters.RequireVATNr.Value = null;
        if ($scope.selectedRequireVATNr) {
            $scope.filters.RequireVATNr.Value = true;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;
        $scope.filters['selectedUnPrinted'] = $scope.selectedUnPrinted;
        $scope.filters['selectedRequireVATNr'] = $scope.selectedRequireVATNr;

        $rootScope.SaveFilterState('DebitNotes', $scope);

        delete $scope.filters['selectedCustomer'];
        delete $scope.filters['selectedShowAll'];
        delete $scope.filters['selectedUnPrinted'];
        delete $scope.filters['selectedRequireVATNr'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.customerSelected = async function (flag = true) {
        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_Currency = async function () {
        $scope.data_Currency = await Finance_Service.Dropdown_Currency();
    };

    $scope.getData_ReasonType = async function () {
        $scope.data_ReasonType = await Finance_Service.Dropdown_DebitNoteReasonType();
    };

    $scope.getData_DueIn = async function () {
        $scope.data_DueIn = await Finance_Service.Dropdown_DueIn();
    };

    $scope.getData_Age = async function () {
        $scope.data_Age = await Finance_Service.Dropdown_Age();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('DebitNote');

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

        let currency = $scope.filters.Currency.Value;
        if (currency && typeof currency === 'string' && currency.indexOf('(') >= 0) currency = '';
        $scope.selectedCurrency = currency;

        let reasonType = $scope.filters.ReasonType.Value;
        if (reasonType && typeof reasonType === 'string' && reasonType.indexOf('(') >= 0) reasonType = '';
        $scope.selectedReasonType = reasonType;

        let dueIn = $scope.filters.DueIn.Value;
        if (dueIn && typeof dueIn === 'string' && dueIn.indexOf('(') >= 0) dueIn = '';
        $scope.selectedDueIn = dueIn;

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

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);
            delete $scope.filters['selectedShowAll'];

            $scope.selectedUnPrinted = $scope.filters['selectedUnPrinted'];
            delete $scope.filters['selectedUnPrinted'];

            $scope.selectedRequireVATNr = $scope.filters['selectedRequireVATNr'];
            delete $scope.filters['selectedRequireVATNr'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Currency(),
            $scope.getData_ReasonType(),
            $scope.getData_DueIn(),
            $scope.getData_Age(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('DebitNotes', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.printForm = async function () { }

    $scope.exportList = async function () { }

    $scope.initialize_Page();
});