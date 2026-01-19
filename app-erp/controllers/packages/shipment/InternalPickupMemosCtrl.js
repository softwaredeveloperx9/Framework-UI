angular.module('app.erp').controller('InternalPickupMemosCtrl', function ($rootScope, $scope, Utility_ERP, InternalPickupMemos_Service) {
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
        DocType: { PropertyName: 'DocTypeCode', Operator: 'in', Value: '' },
        Supplier: { PropertyName: 'SupplierID', Operator: '=', Value: '' },
        PickFrom: { PropertyName: 'PickFromCode', Operator: 'in', Value: '' },
        Consignee: { PropertyName: 'ConsigneeID', Operator: '=', Value: '' },
        ShipTo: { PropertyName: 'ShipToCode', Operator: 'in', Value: '' },
        Shipper: { PropertyName: 'ShipperID', Operator: '=', Value: '' },
        ShipperAddress: { PropertyName: 'ShipperAddressCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' }
    };

    $scope.selectedBranch = '';
    $scope.selectedDocType = '';
    $scope.selectedSupplier = '';
    $scope.selectedPickFrom = '';
    $scope.selectedConsignee = '';
    $scope.selectedShipTo = '';
    $scope.selectedShipper = '';
    $scope.selectedShipperAddress = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_DocType = [];
    $scope.data_PickFrom = [];
    $scope.data_ShipTo = [];
    $scope.data_ShipperAddress = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = InternalPickupMemos_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Order #', 'Order', 'Order', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Supplier', 'Supplier', 'Supplier', 'Text', true],
            ['Consignee', 'Consignee', 'Consignee', 'Text', true],
            ['Shipper', 'Shipper', 'Shipper', 'Text', true],
            ['Doc. Type', 'DocType', 'DocType', 'Text', true],
            ['Doc Number', 'DocNumber', 'DocNumber', 'Text', true],
            ['Promised Date', 'PromisedDate', 'PromisedDate', 'Date', true],
            ['Issued By', 'IssuedBy', 'IssuedBy', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true]
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

        if (!$scope.selectedDocType) {
            $scope.filters.DocType.Operator = 'in';
            $scope.filters.DocType.Value = Utility_ERP.Value_OperatorIN_($scope.data_DocType, 'Code');
        } else {
            $scope.filters.DocType.Operator = '=';
            $scope.filters.DocType.Value = $scope.selectedDocType;
        }

        if (!$scope.selectedPickFrom) {
            $scope.filters.PickFrom.Operator = 'in';
            $scope.filters.PickFrom.Value = Utility_ERP.Value_OperatorIN_($scope.data_PickFrom, 'Code');
        } else {
            $scope.filters.PickFrom.Operator = '=';
            $scope.filters.PickFrom.Value = $scope.selectedPickFrom;
        }

        if (!$scope.selectedShipTo) {
            $scope.filters.ShipTo.Operator = 'in';
            $scope.filters.ShipTo.Value = Utility_ERP.Value_OperatorIN_($scope.data_ShipTo, 'Code');
        } else {
            $scope.filters.ShipTo.Operator = '=';
            $scope.filters.ShipTo.Value = $scope.selectedShipTo;
        }

        if (!$scope.selectedShipperAddress) {
            $scope.filters.ShipperAddress.Operator = 'in';
            $scope.filters.ShipperAddress.Value = Utility_ERP.Value_OperatorIN_($scope.data_ShipperAddress, 'Code');
        } else {
            $scope.filters.ShipperAddress.Operator = '=';
            $scope.filters.ShipperAddress.Value = $scope.selectedShipperAddress;
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

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedSupplier'] = $scope.selectedSupplier;
        $scope.filters['selectedConsignee'] = $scope.selectedConsignee;
        $scope.filters['selectedShipper'] = $scope.selectedShipper;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('InternalPickupMemos', $scope);

        delete $scope.filters['selectedSupplier'];
        delete $scope.filters['selectedConsignee'];
        delete $scope.filters['selectedShipper'];
        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        // --  untuk Page ini, setiap kali Branch berubah --> tidak ada perubahan khusus
        await $scope.showData();
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.getData_DocType = async function () {
        $scope.data_DocType = await InternalPickupMemos_Service.Dropdown_DocType();
    };

    $scope.getData_PickFrom = async function () {
        $scope.data_PickFrom = await InternalPickupMemos_Service.Dropdown_PickFrom();
    };

    $scope.getData_ShipTo = async function () {
        $scope.data_ShipTo = await InternalPickupMemos_Service.Dropdown_ShipTo();
    };

    $scope.getData_ShipperAddress = async function () {
        $scope.data_ShipperAddress = await InternalPickupMemos_Service.Dropdown_ShipperAddress();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('InternalPickupMemo');

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

        let docType = $scope.filters.DocType.Value;
        if (docType && typeof docType === 'string' && docType.indexOf('(') >= 0) docType = '';
        $scope.selectedDocType = docType;

        let pickFrom = $scope.filters.PickFrom.Value;
        if (pickFrom && typeof pickFrom === 'string' && pickFrom.indexOf('(') >= 0) pickFrom = '';
        $scope.selectedPickFrom = pickFrom;

        let shipTo = $scope.filters.ShipTo.Value;
        if (shipTo && typeof shipTo === 'string' && shipTo.indexOf('(') >= 0) shipTo = '';
        $scope.selectedShipTo = shipTo;

        let shipperAddress = $scope.filters.ShipperAddress.Value;
        if (shipperAddress && typeof shipperAddress === 'string' && shipperAddress.indexOf('(') >= 0) shipperAddress = '';
        $scope.selectedShipperAddress = shipperAddress;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedSupplier = $scope.filters['selectedSupplier'];
            delete $scope.filters['selectedSupplier'];

            $scope.selectedConsignee = $scope.filters['selectedConsignee'];
            delete $scope.filters['selectedConsignee'];

            $scope.selectedShipper = $scope.filters['selectedShipper'];
            delete $scope.filters['selectedShipper'];

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_DocType(),
            $scope.getData_PickFrom(),
            $scope.getData_ShipTo(),
            $scope.getData_ShipperAddress(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('InternalPickupMemos', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.printForm = async function () {
        // TODO: Implement print functionality
    };

    $scope.toRoute = async function () {
        // TODO: Implement to route functionality
    };

    $scope.verify = async function () {
        // TODO: Implement verify functionality
    };

    $scope.voidDocument = async function () {
        // TODO: Implement void functionality
    };

    $scope.initialize_Page();
});