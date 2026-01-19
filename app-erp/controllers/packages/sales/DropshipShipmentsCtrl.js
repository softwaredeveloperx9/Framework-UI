angular.module('app.erp').controller('DropshipShipmentsCtrl', function ($rootScope, $scope, Utility_ERP, DropshipShipments_Service) {
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
        Date_date: { PropertyName: 'Date', Operator: '=', Value: '' },
        Type: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
        Warehouse: { PropertyName: 'WarehouseCode', Operator: 'in', Value: '' },
        PromisedDate_date: { PropertyName: 'PromisedDate', Operator: '=', Value: '' },
        DeliverVia: { PropertyName: 'DeliverViaCode', Operator: 'in', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedDate = $rootScope.Date_to_UI(new Date());
    $scope.selectedType = '';
    $scope.selectedWarehouse = '';
    $scope.selectedPromisedDate = '';
    $scope.selectedDeliverVia = '';
    $scope.selectedShowAll = false;
    $scope.selectedStatus = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_Type = [];
    $scope.data_DeliverVia = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = DropshipShipments_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Request#', 'Request', 'Request', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Type', 'Type', 'Type', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Warehouse', 'Warehouse', 'Warehouse', 'Text', true],
            ['Consignee', 'Consignee', 'Consignee', 'Text', true],
            ['Document Nr.', 'DocumentNr', 'DocumentNr', 'Text', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Number', true],
            ['Deliver Via', 'DeliverVia', 'DeliverVia', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
            ['Reason', 'Reason', 'Reason', 'Text', true],
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

        if (!$scope.selectedWarehouse) {
            $scope.filters.Warehouse.Operator = 'in';
            $scope.filters.Warehouse.Value = Utility_ERP.Value_OperatorIN_($scope.data_Warehouse_perBranch, 'Code');
        } else {
            $scope.filters.Warehouse.Operator = '=';
            $scope.filters.Warehouse.Value = $scope.selectedWarehouse;
        }

        if (!$scope.selectedType) {
            $scope.filters.Type.Operator = 'in';
            $scope.filters.Type.Value = Utility_ERP.Value_OperatorIN_($scope.data_Type, 'Code');
        } else {
            $scope.filters.Type.Operator = '=';
            $scope.filters.Type.Value = $scope.selectedType;
        }

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

        $scope.filters.Date_date.Value = $rootScope.Date_to_DB($scope.selectedDate);
        $scope.filters.PromisedDate_date.Value = $rootScope.Date_to_DB($scope.selectedPromisedDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('DropshipShipments', $scope);

        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        // --  untuk Page ini, setiap kali Branch berubah --> maka Warehouse ke posisi "All"
        // reset
        $scope.selectedWarehouse = '';

        $scope.Reorganize_Warehouse();

        await $scope.showData();
    };

    $scope.Reorganize_Warehouse = function () {
        var data = [];

        if (!$scope.selectedBranch) {
            // tanpa Filter Branch
            data = $scope.data_EmployeeWarehouseAccess;
        } else {
            // filter berdasarkan Branch
            data = $scope.data_EmployeeWarehouseAccess.filter(function (e) {
                return e.LocationCode == $scope.selectedBranch;
            });
        }

        $scope.data_Warehouse_perBranch = [...new Map(data.map((item) => [item['Code'], item])).values()].sort((x, y) => x.Code.localeCompare(y.Code));
    };

    $scope.getData_Type = async function () {
        $scope.data_Type = await DropshipShipments_Service.Dropdown_Type();
    };

    $scope.getData_DeliverVia = async function () {
        $scope.data_DeliverVia = await DropshipShipments_Service.Dropdown_DeliverVia();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('DropshipShipment');

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

        let warehouse = $scope.filters.Warehouse.Value;
        if (warehouse && typeof warehouse === 'string' && warehouse.indexOf('(') >= 0) warehouse = '';
        $scope.selectedWarehouse = warehouse;

        let type = $scope.filters.Type.Value;
        if (type && typeof type === 'string' && type.indexOf('(') >= 0) type = '';
        $scope.selectedType = type;

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
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_Type(),
            $scope.getData_DeliverVia(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('DropshipShipments', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.createPickingOrder = async function () { };

    $scope.holdShipment = async function () { };

    $scope.releaseHold = async function () { };

    $scope.voidShipment = async function () { };

    $scope.printForm = async function () { };

    $scope.initialize_Page();
});