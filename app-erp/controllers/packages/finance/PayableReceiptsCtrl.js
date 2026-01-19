angular.module('app.erp').controller('PayableReceiptsCtrl', function ($rootScope, $scope, Utility_ERP, PayableReceipts_Service, BusinessRelation_Service) {
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
        Vendor: { PropertyName: 'VendorID', Operator: '=', Value: '' },
        BilledBy: { PropertyName: 'BilledByCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        UnPrinted: { PropertyName: 'PrintCount', Operator: '<=', Value: null },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedCurrency = '';
    $scope.selectedVendor = '';
    $scope.selectedBilledBy = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedUnPrinted = false;
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Currency = [];
    $scope.data_BilledBy = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PayableReceipts_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Receipt Nr.', 'ReceiptNr', 'ReceiptNr', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Vendor', 'Vendor', 'Vendor', 'Text', true],
            ['Submitted By', 'SubmittedBy', 'SubmittedBy', 'Text', true],
            ['Issued By', 'IssuedBy', 'IssuedBy', 'Text', true],
            ['Doc Qty', 'DocQty', 'DocQty', 'Number', true],
            ['Currency', 'Currency', 'Currency', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Currency', true],
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

        if (!$scope.selectedBilledBy) {
            $scope.filters.BilledBy.Operator = 'in';
            $scope.filters.BilledBy.Value = Utility_ERP.Value_OperatorIN_($scope.data_BilledBy, 'Code');
        } else {
            $scope.filters.BilledBy.Operator = '=';
            $scope.filters.BilledBy.Value = $scope.selectedBilledBy;
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

        $scope.filters.UnPrinted.Value = null;
        if ($scope.selectedUnPrinted) {
            $scope.filters.UnPrinted.Value = 0;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedVendor'] = $scope.selectedVendor;
        $scope.filters['selectedUnPrinted'] = $scope.selectedUnPrinted;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('PayableReceipts', $scope);

        delete $scope.filters['selectedVendor'];
        delete $scope.filters['selectedUnPrinted'];
        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Vendor = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.vendorSelected = async function (flag = true) {
        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_Currency = async function () {
        $scope.data_Currency = await Finance_Service.Dropdown_Currency();
    };

    $scope.getData_BilledBy = async function () {
        $scope.data_BilledBy = await Finance_Service.Dropdown_BilledBy();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('PayableReceipt');

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

        let billedBy = $scope.filters.BilledBy.Value;
        if (billedBy && typeof billedBy === 'string' && billedBy.indexOf('(') >= 0) billedBy = '';
        $scope.selectedBilledBy = billedBy;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedVendor = $scope.filters['selectedVendor'];
            delete $scope.filters['selectedVendor'];

            $scope.selectedUnPrinted = $scope.filters['selectedUnPrinted'];
            delete $scope.filters['selectedUnPrinted'];

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
            $scope.getData_BilledBy(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('PayableReceipts', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.printForm = async function () { }

    $scope.voidForm = async function () { }

    $scope.initialize_Page();
});