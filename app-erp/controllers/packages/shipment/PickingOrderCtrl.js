angular.module('app.erp').controller('PickingOrderCtrl', function ($rootScope, $scope, Utility_ERP, PickingOrder_Service) {
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
        Site: { PropertyName: 'SiteCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        DeliverVia: { PropertyName: 'DeliverViaCode', Operator: 'in', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedSite = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedDeliverVia = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Site = [];
    $scope.data_DeliverVia = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PickingOrder_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Order#', 'Order', 'Order', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Warehouse', 'Warehouse', 'Warehouse', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Routed', 'Routed', 'Routed', 'Boolean', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Number', true],
            ['Qty Picked', 'QtyPicked', 'QtyPicked', 'Number', true],
            ['Deliver Via', 'DeliverVia', 'DeliverVia', 'Text', true],
            ['S/R Nr.', 'SRNr', 'SRNr', 'Text', true],
            ['Assigned To', 'AssignedTo', 'AssignedTo', 'Text', true],
            ['Verified Date', 'VerifiedDate', 'VerifiedDate', 'Date', true],
            ['Verified By', 'VerifiedBy', 'VerifiedBy', 'Text', true],
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

        if (!$scope.selectedSite) {
            $scope.filters.Site.Operator = 'in';
            $scope.filters.Site.Value = Utility_ERP.Value_OperatorIN_($scope.data_Site, 'Code');
        } else {
            $scope.filters.Site.Operator = '=';
            $scope.filters.Site.Value = $scope.selectedSite;
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        if (!$scope.selectedDeliverVia) {
            $scope.filters.DeliverVia.Operator = 'in';
            $scope.filters.DeliverVia.Value = Utility_ERP.Value_OperatorIN_($scope.data_DeliverVia, 'Code');
        } else {
            $scope.filters.DeliverVia.Operator = '=';
            $scope.filters.DeliverVia.Value = $scope.selectedDeliverVia;
        }

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

        $rootScope.SaveFilterState('PickingOrder', $scope);

        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Site = async function () {
        $scope.data_Site = await PickingOrder_Service.Dropdown_Site();
    };

    $scope.getData_DeliverVia = async function () {
        $scope.data_DeliverVia = await PickingOrder_Service.Dropdown_DeliverVia();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('PickingOrder');

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

        let site = $scope.filters.Site.Value;
        if (site && typeof site === 'string' && site.indexOf('(') >= 0) site = '';
        $scope.selectedSite = site;

        let deliverVia = $scope.filters.DeliverVia.Value;
        if (deliverVia && typeof deliverVia === 'string' && deliverVia.indexOf('(') >= 0) deliverVia = '';
        $scope.selectedDeliverVia = deliverVia;

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
            $scope.getData_Site(),
            $scope.getData_DeliverVia(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('PickingOrder', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.verifyOrder = async function () { };

    $scope.toRoute = async function () { };

    $scope.printForm = async function () { };

    $scope.initialize_Page();
});