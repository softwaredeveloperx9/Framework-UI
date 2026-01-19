angular.module('app.erp').controller('PaymentRequestsCtrl', function ($rootScope, $scope, Utility_ERP, PaymentRequests_Service) {
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
        VerifiedDateFrom_date: { PropertyName: 'VerifiedDate', Operator: '>=', Value: '' },
        VerifiedDateTo_date: { PropertyName: 'VerifiedDate', Operator: '<=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedVerifiedDateFrom = '';
    $scope.selectedVerifiedDateTo = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // Date picker flags
    $scope.dateFromOpen = false;
    $scope.dateToOpen = false;
    $scope.verifiedDateFromOpen = false;
    $scope.verifiedDateToOpen = false;

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PaymentRequests_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Plan Nr.', 'PlanNr', 'PlanNr', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Total Amount', 'TotalAmount', 'TotalAmount', 'Currency', true],
            ['Required Date', 'RequiredDate', 'RequiredDate', 'Date', true],
            ['Issued By', 'IssuedBy', 'IssuedBy', 'Text', true],
            ['Notes', 'Notes', 'Notes', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
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

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);
        $scope.filters.VerifiedDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedVerifiedDateFrom);
        $scope.filters.VerifiedDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedVerifiedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('PaymentRequests', $scope);

        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('PaymentRequest');

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

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('PaymentRequests', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.printForm = async function () {
        // TODO: Implement print functionality
    }

    $scope.initialize_Page();
});