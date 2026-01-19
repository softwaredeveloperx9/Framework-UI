angular.module('app.erp').controller('AdvanceRequestsCtrl', function ($rootScope, $scope, Utility_ERP, AdvanceRequests_Service) {
    // Data table configuration
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // Filter configuration
    $scope.filters = {
        Branch: { PropertyName: 'BranchCode', Operator: 'in', Value: '' },
        RequiredDateFrom: { PropertyName: 'RequiredDate', Operator: '>=', Value: '' },
        RequiredDateTo: { PropertyName: 'RequiredDate', Operator: '<=', Value: '' },
        ReasonType: { PropertyName: 'ReasonTypeCode', Operator: '=', Value: '' },
        SettlementDateFrom: { PropertyName: 'SettlementDate', Operator: '>=', Value: '' },
        SettlementDateTo: { PropertyName: 'SettlementDate', Operator: '<=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    // Filter data
    $scope.selectedBranch = '';
    $scope.selectedRequiredDateFrom = '';
    $scope.selectedRequiredDateTo = '';
    $scope.selectedSettlementDateFrom = '';
    $scope.selectedSettlementDateTo = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    // Dropdown data
    $scope.data_EmployeeLocationAccess = [];
    $scope.data_ReasonTypes = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // Create DataTable
    $scope.CreateTable = function () {
        $scope.dt = AdvanceRequests_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Request #', 'Request', 'Request', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Reason Type', 'ReasonType', 'ReasonType', 'Text', true],
            ['Paid To', 'PaidTo', 'PaidTo', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Currency', true],
            ['Required Date', 'RequiredDate', 'RequiredDate', 'Date', true],
            ['Settlement Date', 'SettlementDate', 'SettlementDate', 'Date', true],
            ['Status', 'Status', 'Status', 'Text', true],
            ['Payment Nr.', 'PaymentNr', 'PaymentNr', 'Text', true],
            ['Settlement Nr.', 'SettlementNr', 'SettlementNr', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    // Show data function
    $scope.showData = async function () {
        if (!$scope.selectedBranch) {
            $scope.filters.Branch.Operator = 'in';
            $scope.filters.Branch.Value = Utility_ERP.Value_OperatorIN_($scope.data_EmployeeLocationAccess, 'Code');
        } else {
            $scope.filters.Branch.Operator = '=';
            $scope.filters.Branch.Value = $scope.selectedBranch;
        }

        $scope.filters.RequiredDateFrom.Value = $rootScope.Date_to_DB($scope.selectedRequiredDateFrom);
        $scope.filters.RequiredDateTo.Value = $rootScope.Date_to_DB($scope.selectedRequiredDateTo);

        $scope.filters.SettlementDateFrom.Value = $rootScope.Date_to_DB($scope.selectedSettlementDateFrom);
        $scope.filters.SettlementDateTo.Value = $rootScope.Date_to_DB($scope.selectedSettlementDateTo);

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

        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;
        $rootScope.SaveFilterState('AdvanceRequests', $scope);
        delete $scope.filters['selectedShowAll'];
    };

    // Get Reason Types dropdown data
    $scope.getData_ReasonTypes = async function () {
        $scope.data_ReasonTypes = await AdvanceRequests_Service.Dropdown_ReasonTypes();
    };

    // Get Status dropdown data
    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('AdvanceRequest');

        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        $rootScope.SetDefaultDropdownList($scope.data_Status, 'StatusId', $scope, 'selectedStatus');
    };

    $scope.selectedShowAll_Change = async function (flag = true, flag2 = true) {
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        if (flag2) $scope.selectedStatus = '';

        if (flag) {
            await $scope.showData();
        }
    };

    // Toolbar action functions
    $scope.newRequest = async function () {
        // TODO: Implement new advance request functionality
        console.log('New Advance Request clicked');
    };

    $scope.voidRequest = async function () {
        // TODO: Implement void request functionality
        console.log('Void Request clicked');
    };

    $scope.printForm = async function () {
        // TODO: Implement print functionality
        console.log('Print clicked');
    };

    $scope.exportToExcel = async function () {
        // TODO: Implement export to excel functionality
        console.log('Export To Excel clicked');
    };

    $scope.downloadSchema = async function () {
        // TODO: Implement download schema functionality
        console.log('Download Schema clicked');
    };

    $scope.uploadSchema = async function () {
        // TODO: Implement upload schema functionality
        console.log('Upload Schema clicked');
    };

    $scope.editRequest = function (row) {
        // TODO: Implement edit advance request functionality
        console.log('Edit Advance Request:', row.Request);
    };

    // Toggle debug scope
    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];
        }
    }

    // Initialize page
    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_ReasonTypes(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('AdvanceRequests', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        await $scope.showData();

        Utility_ERP.Still_Processing($scope, false);
    };

    $scope.initialize_Page();
});
