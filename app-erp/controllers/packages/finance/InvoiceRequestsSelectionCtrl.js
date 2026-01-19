angular.module('app.erp').controller('InvoiceRequestsSelectionCtrl', function ($rootScope, $scope, Utility_ERP, InvoiceRequestsSelection_Service, BusinessRelation_Service) {
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
        BR: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
        ReasonType: { PropertyName: 'ReasonType', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedBR = '';
    $scope.selectedReasonType = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_ReasonType = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = InvoiceRequestsSelection_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Doc Type', 'DocType', 'DocType', 'Text', true],
            ['Doc Nr.', 'DocNr', 'DocNr', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['PO Nr.', 'PONr', 'PONr', 'Text', true],
            ['Contract Nr.', 'ContractNr', 'ContractNr', 'Text', true],
            ['Doc Reference Nr.', 'DocReferenceNr', 'DocReferenceNr', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Requested By', 'RequestedBy', 'RequestedBy', 'Text', true],
            ['Notes', 'Notes', 'Notes', 'Text', true],
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

        if (!$scope.selectedReasonType) {
            $scope.filters.ReasonType.Operator = 'in';
            $scope.filters.ReasonType.Value = Utility_ERP.Value_OperatorIN_($scope.data_ReasonType, 'Code');
        } else {
            $scope.filters.ReasonType.Operator = '=';
            $scope.filters.ReasonType.Value = $scope.selectedReasonType;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedBR'] = $scope.selectedBR;

        $rootScope.SaveFilterState('InvoiceRequestsSelection', $scope);

        delete $scope.filters['selectedBR'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_ReasonType = async function () {
        $scope.data_ReasonType = await InvoiceRequestsSelection_Service.Dropdown_ReasonType();
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.customerSelected = async function (flag = true) {
        if (flag) {
            $scope.showData();
        }
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let reasonType = $scope.filters.ReasonType.Value;
        if (reasonType && typeof reasonType === 'string' && reasonType.indexOf('(') >= 0) reasonType = '';
        $scope.selectedReasonType = reasonType;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedBR = $scope.filters['selectedBR'];
            delete $scope.filters['selectedBR'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_ReasonType()
        ]);

        $rootScope.LoadFilterState('InvoiceRequestsSelection', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.addSelectedItems = async function () {
        // Implementasi untuk menambahkan item yang dipilih
        let selectedRows = $scope.dt.data.filter(function (row) {
            return row.rowSelected === true;
        });

        if (selectedRows.length === 0) {
            $rootScope.ShowNotification('warning', 'Please select at least one invoice request');
            return;
        }

        // Logic untuk menambahkan invoice request yang dipilih
        console.log('Selected invoice requests:', selectedRows);
    };

    $scope.closeForm = async function () {
        // Implementasi untuk menutup form
        window.history.back();
    };

    $scope.initialize_Page();
});