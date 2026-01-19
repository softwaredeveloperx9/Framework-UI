angular.module('app.erp').controller('OutgoingOrdersCtrl', function ($rootScope, $scope, Utility_ERP, OutgoingOrders_Service) {
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
        RequestFrom: { PropertyName: 'RequestFromCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        DeliverTo: { PropertyName: 'DeliverToCode', Operator: 'in', Value: '' },
        RequiredDateFrom_date: { PropertyName: 'RequiredDate', Operator: '>=', Value: '' },
        RequiredDateTo_date: { PropertyName: 'RequiredDate', Operator: '<=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedRequestFrom = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedDeliverTo = '';
    $scope.selectedRequiredDateFrom = '';
    $scope.selectedRequiredDateTo = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_RequestFrom = [];
    $scope.data_DeliverTo = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = OutgoingOrders_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Request Nr.', 'RequestNr', 'RequestNr', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Request To', 'RequestTo', 'RequestTo', 'Text', true],
            ['Deliver To', 'DeliverTo', 'DeliverTo', 'Text', true],
            ['Open Qty', 'OpenQty', 'OpenQty', 'Number', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Number', true],
            ['Required Date', 'RequiredDate', 'RequiredDate', 'Date', true],
            ['Issued By', 'IssuedBy', 'IssuedBy', 'Text', true],
            ['Direct', 'Direct', 'Direct', 'Boolean', true],
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

        if (!$scope.selectedRequestFrom) {
            $scope.filters.RequestFrom.Operator = 'in';
            $scope.filters.RequestFrom.Value = Utility_ERP.Value_OperatorIN_($scope.data_RequestFrom, 'Code');
        } else {
            $scope.filters.RequestFrom.Operator = '=';
            $scope.filters.RequestFrom.Value = $scope.selectedRequestFrom;
        }

        if (!$scope.selectedDeliverTo) {
            $scope.filters.DeliverTo.Operator = 'in';
            $scope.filters.DeliverTo.Value = Utility_ERP.Value_OperatorIN_($scope.data_DeliverTo, 'Code');
        } else {
            $scope.filters.DeliverTo.Operator = '=';
            $scope.filters.DeliverTo.Value = $scope.selectedDeliverTo;
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

        $scope.filters.RequiredDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedRequiredDateFrom);
        $scope.filters.RequiredDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedRequiredDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('OutgoingOrders', $scope);

        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        // reset
        await $scope.showData();
    };

    $scope.getData_RequestFrom = async function () {
        // Implement service call to get RequestFrom dropdown data
        // $scope.data_RequestFrom = await OutgoingOrders_Service.Dropdown_RequestFrom();
    };

    $scope.getData_DeliverTo = async function () {
        // Implement service call to get DeliverTo dropdown data
        // $scope.data_DeliverTo = await OutgoingOrders_Service.Dropdown_DeliverTo();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('OutgoingOrder');

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
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let requestFrom = $scope.filters.RequestFrom.Value;
        if (requestFrom && typeof requestFrom === 'string' && requestFrom.indexOf('(') >= 0) requestFrom = '';
        $scope.selectedRequestFrom = requestFrom;

        let deliverTo = $scope.filters.DeliverTo.Value;
        if (deliverTo && typeof deliverTo === 'string' && deliverTo.indexOf('(') >= 0) deliverTo = '';
        $scope.selectedDeliverTo = deliverTo;

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
            $scope.getData_RequestFrom(),
            $scope.getData_DeliverTo(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('OutgoingOrders', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.printForm = async function () {
        // Implement print functionality
    };

    $scope.deliveryClick = async function () {
        // Implement delivery functionality
    };

    $scope.voidClick = async function () {
        // Implement void functionality
    };

    $scope.initialize_Page();
});