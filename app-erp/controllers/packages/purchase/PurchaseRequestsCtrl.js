angular.module('app.erp').controller('PurchaseRequestsCtrl', function ($rootScope, $scope, Utility_ERP, PurchaseRequests_Service, BusinessRelation_Service) {
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        RequestedBy: { PropertyName: 'RequestedBy', Operator: '=', Value: '' },
        Type: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
        ReasonNr: { PropertyName: 'ReasonNr', Operator: 'contains', Value: '' },
        Consignee: { PropertyName: 'ConsigneeID', Operator: '=', Value: '' },
        ShipTo: { PropertyName: 'ShipToAddressNumber', Operator: '=', Value: null },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedRequestedBy = '';
    $scope.selectedType = '';
    $scope.selectedReasonNr = '';
    $scope.selectedConsignee = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_PurchaseRequestType = [];
    $scope.data_ShipToAddressNames = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    $scope.CreateTable = function () {
        $scope.dt = PurchaseRequests_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['PR #', 'PRNumber', 'PRNumber', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'BranchName', 'BranchName', 'Text', true],
            ['Type', 'TypeName', 'TypeName', 'Text', true],
            ['Reason Nr.', 'ReasonNr', 'ReasonNr', 'Text', true],
            ['Open Qty', 'OpenQty', 'OpenQty', 'Number', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Number', true],
            ['Consignee', 'ConsigneeName', 'ConsigneeName', 'Text', true],
            ['Ship To', 'ShipToName', 'ShipToName', 'Text', true],
            ['Required At', 'RequiredAt', 'RequiredAt', 'Date', true],
            ['Requester', 'RequesterName', 'RequesterName', 'Text', true],
            ['Status', 'StatusName', 'StatusName', 'Text', true],
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

        if (!$scope.selectedType) {
            $scope.filters.Type.Operator = 'in';
            $scope.filters.Type.Value = Utility_ERP.Value_OperatorIN_($scope.data_PurchaseRequestType, 'Code');
        } else {
            $scope.filters.Type.Operator = '=';
            $scope.filters.Type.Value = $scope.selectedType;
        }

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        $scope.filters.ReasonNr.Value = $scope.selectedReasonNr;
        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedRequestedBy'] = $scope.selectedRequestedBy;
        $scope.filters['selectedConsignee'] = $scope.selectedConsignee;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('PurchaseRequests', $scope);

        delete $scope.filters['selectedRequestedBy'];
        delete $scope.filters['selectedConsignee'];
        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_User = async function (val) {
        return await $rootScope.getData_User(val, $scope);
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.consigneeSelected = async function (flag = true) {
        $scope.data_ShipToAddressNames = [];
        $scope.filters.ShipTo.Value = null;

        if ($rootScope.Not_ValidString($scope.filters.Consignee.Value)) {
            if (flag) {
                $scope.showData();
            }
            return;
        }

        $scope.data_ShipToAddressNames = await BusinessRelation_Service.GetBusinessRelationShippingAddressNames($scope.filters.Consignee.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_PurchaseRequestType = async function () {
        $scope.data_PurchaseRequestType = await PurchaseRequests_Service.Dropdown_PurchaseRequestType();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('PurchaseRequest');

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

    

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let type = $scope.filters.Type.Value;
        if (type && typeof type === 'string' && type.indexOf('(') >= 0) type = '';
        $scope.selectedType = type;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedRequestedBy = $scope.filters['selectedRequestedBy'];
            delete $scope.filters['selectedRequestedBy'];

            $scope.selectedConsignee = $scope.filters['selectedConsignee'];
            delete $scope.filters['selectedConsignee'];

            let shipTo = $scope.filters.ShipTo.Value;
            await $scope.consigneeSelected(false);
            $scope.filters.ShipTo.Value = shipTo;

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_PurchaseRequestType(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('PurchaseRequests', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.printForm = async function () { }

    $scope.closeClick = async function () { }

    $scope.voidClick = async function () { }

    $scope.initialize_Page();
});
