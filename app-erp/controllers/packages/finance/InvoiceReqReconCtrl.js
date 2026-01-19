angular.module('app.erp').controller('InvoiceReqReconCtrl', function ($rootScope, $scope, Utility_ERP, InvoiceReqRecon_Service) {
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
        RequestDate_date: { PropertyName: 'RequestDate', Operator: '=', Value: '' },
        RequestedInvoice: { PropertyName: 'RequestedInvoice', Operator: '=', Value: null },
        PhysicalOnHand: { PropertyName: 'PhysicalOnHand', Operator: 'contains', Value: '' },
        OnHold: { PropertyName: 'OnHold', Operator: '=', Value: null },
        Discrepancy: { PropertyName: 'Discrepancy', Operator: '=', Value: null },
        ProcessedRequest: { PropertyName: 'ProcessedRequest', Operator: '=', Value: null },
        PendingRequest: { PropertyName: 'PendingRequest', Operator: '=', Value: null },
        ShowUnreconOnly: { PropertyName: 'Reconciled', Operator: '=', Value: null },
    };

    $scope.selectedBranch = '';
    $scope.selectedRequestDate = '';
    $scope.selectedShowUnreconOnly = false;

    $scope.data_EmployeeLocationAccess = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = InvoiceReqRecon_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Doc Type', 'DocType', 'DocType', 'Text', true],
            ['Doc Nr.', 'DocNr', 'DocNr', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['PO Nr.', 'PONr', 'PONr', 'Text', true],
            ['Contract Nr.', 'ContractNr', 'ContractNr', 'Text', true],
            ['Doc Reference Nr.', 'DocReferenceNr', 'DocReferenceNr', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Number', true],
            ['Requested', 'Requested', 'Requested', 'Text', true],
            ['Requested By', 'RequestedBy', 'RequestedBy', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
            ['Invoice Nr.', 'InvoiceNr', 'InvoiceNr', 'Text', true],
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

        $scope.filters.RequestDate_date.Value = $rootScope.Date_to_DB($scope.selectedRequestDate);

        $scope.filters.ShowUnreconOnly.Value = null;
        if ($scope.selectedShowUnreconOnly) {
            $scope.filters.ShowUnreconOnly.Value = false;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedShowUnreconOnly'] = $scope.selectedShowUnreconOnly;

        $rootScope.SaveFilterState('InvoiceReqRecon', $scope);

        delete $scope.filters['selectedShowUnreconOnly'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedShowUnreconOnly = $scope.filters['selectedShowUnreconOnly'];
            delete $scope.filters['selectedShowUnreconOnly'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, '')
        ]);

        $rootScope.LoadFilterState('InvoiceReqRecon', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.createInvoiceClick = async function () {
        // Implementation for create invoice
    };

    $scope.initialize_Page();
});