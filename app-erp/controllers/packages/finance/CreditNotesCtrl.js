angular.module('app.erp').controller('CreditNotesCtrl', function ($rootScope, $scope, Utility_ERP, CreditNotes_Service, BusinessRelation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: '=', Value: '' },
        Currency: { PropertyName: 'CurrencyCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        DueDateFrom_date: { PropertyName: 'DueDate', Operator: '>=', Value: '' },
        DueDateTo_date: { PropertyName: 'DueDate', Operator: '<=', Value: '' },
        Vendor: { PropertyName: 'VendorID', Operator: '=', Value: '' },
        ReasonType: { PropertyName: 'ReasonTypeCode', Operator: 'in', Value: '' },
        Age: { PropertyName: 'Age', Operator: 'in', Value: '' },
        UnPrinted: { PropertyName: 'PrintCount', Operator: '<=', Value: null },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedCurrency = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedDueDateFrom = '';
    $scope.selectedDueDateTo = '';
    $scope.selectedVendor = '';
    $scope.selectedReasonType = '';
    $scope.selectedAge = '';
    $scope.selectedUnPrinted = false;
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Currency = [];
    $scope.data_ReasonType = [];
    $scope.data_Age = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = CreditNotes_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Invoice #', 'Invoice', 'Invoice', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Reason', 'Reason', 'Reason', 'Text', true],
            ['PO#', 'PO', 'PO', 'Text', true],
            ['Vendor', 'Vendor', 'Vendor', 'Text', true],
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
        if (!$scope.selectedCurrency) {
            $scope.filters.Currency.Operator = 'in';
            $scope.filters.Currency.Value = Utility_ERP.Value_OperatorIN_($scope.data_Currency, 'Code');
        } else {
            $scope.filters.Currency.Operator = '=';
            $scope.filters.Currency.Value = $scope.selectedCurrency;
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        $scope.filters.DueDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDueDateFrom);
        $scope.filters.DueDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDueDateTo);

        if (!$scope.selectedReasonType) {
            $scope.filters.ReasonType.Operator = 'in';
            $scope.filters.ReasonType.Value = Utility_ERP.Value_OperatorIN_($scope.data_ReasonType, 'Code');
        } else {
            $scope.filters.ReasonType.Operator = '=';
            $scope.filters.ReasonType.Value = $scope.selectedReasonType;
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

        $rootScope.SaveFilterState('CreditNotes', $scope);

        delete $scope.filters['selectedVendor'];
        delete $scope.filters['selectedShowAll'];
        delete $scope.filters['selectedUnPrinted'];
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
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

    $scope.getData_Currency = async function () {
        $scope.data_Currency = await Finance_Service.Dropdown_Currency();
    };

    $scope.getData_ReasonType = async function () {
        $scope.data_ReasonType = await Finance_Service.Dropdown_ReasonType();
    };

    $scope.getData_Age = async function () {
        $scope.data_Age = await Finance_Service.Dropdown_Age();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('CreditNote');

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
        let currency = $scope.filters.Currency.Value;
        if (currency && typeof currency === 'string' && currency.indexOf('(') >= 0) currency = '';
        $scope.selectedCurrency = currency;

        let reasonType = $scope.filters.ReasonType.Value;
        if (reasonType && typeof reasonType === 'string' && reasonType.indexOf('(') >= 0) reasonType = '';
        $scope.selectedReasonType = reasonType;

        let age = $scope.filters.Age.Value;
        if (age && typeof age === 'string' && age.indexOf('(') >= 0) age = '';
        $scope.selectedAge = age;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
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
            $scope.getData_Currency(),
            $scope.getData_ReasonType(),
            $scope.getData_Age(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('CreditNotes', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.printForm = async function () { };

    $scope.exportList = async function () { };

    $scope.refundClick = async function () { };

    $scope.voidClick = async function () { };

    $scope.dpClick = async function () { };

    $scope.convertToARDP = async function () { };

    $scope.initialize_Page();
});