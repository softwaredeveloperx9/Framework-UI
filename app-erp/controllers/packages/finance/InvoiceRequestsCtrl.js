angular.module('app.erp').controller('InvoiceRequestsCtrl', function ($rootScope, $scope, Utility_ERP, InvoiceRequests_Service, BusinessRelation_Service) {
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
        BR: { PropertyName: 'BusinessRelationID', Operator: '=', Value: '' },
        ReasonType: { PropertyName: 'ReasonTypeCode', Operator: 'in', Value: '' },
        RequestDateFrom_date: { PropertyName: 'RequestDate', Operator: '>=', Value: '' },
        RequestDateTo_date: { PropertyName: 'RequestDate', Operator: '<=', Value: '' },
        Age: { PropertyName: 'Age', Operator: 'in', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedBR = '';
    $scope.selectedReasonType = '';
    $scope.selectedRequestDateFrom = '';
    $scope.selectedRequestDateTo = '';
    $scope.selectedAge = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_ReasonType = [];
    $scope.data_Age = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = InvoiceRequests_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Doc Type', 'DocType', 'DocType', 'Text', true],
            ['Doc Nr.', 'DocNr', 'DocNr', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['PO Nr.', 'PONr', 'PONr', 'Text', true],
            ['Contract Nr.', 'ContractNr', 'ContractNr', 'Text', true],
            ['Doc Reference Nr.', 'DocReferenceNr', 'DocReferenceNr', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Currency', true],
            ['Requested By', 'RequestedBy', 'RequestedBy', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
            ['Invoice Nr.', 'InvoiceNr', 'InvoiceNr', 'Text', true],
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

        $scope.filters.RequestDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedRequestDateFrom);
        $scope.filters.RequestDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedRequestDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedBR'] = $scope.selectedBR;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('InvoiceRequests', $scope);

        delete $scope.filters['selectedBR'];
        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.brSelected = async function (flag = true) {
        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_ReasonType = async function () {
        $scope.data_ReasonType = await Finance_Service.Dropdown_InvoiceRequestReasonType();
    };

    $scope.getData_Age = async function () {
        $scope.data_Age = await Finance_Service.Dropdown_Age();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('InvoiceRequest');

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
            $scope.selectedBranch = branch;

            $scope.selectedBR = $scope.filters['selectedBR'];
            delete $scope.filters['selectedBR'];

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);
            delete $scope.filters['selectedShowAll'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_ReasonType(),
            $scope.getData_Age(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('InvoiceRequests', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.createInvoice = async function () { }

    $scope.exportList = async function () { }

    $scope.initialize_Page();
});