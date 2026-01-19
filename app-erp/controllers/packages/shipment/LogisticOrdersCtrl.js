angular.module('app.erp').controller('LogisticOrdersCtrl', function ($rootScope, $scope, Utility_ERP, LogisticOrders_Service, Shipment_Service) {
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
        Warehouse: { PropertyName: 'WarehouseCode', Operator: 'in', Value: '' },
        CarrierType: { PropertyName: 'CarrierType', Operator: 'in', Value: '' },
        Carrier: { PropertyName: 'CarrierCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedCarrierType = '';
    $scope.selectedCarrier = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_CarrierType = [];
    $scope.data_Carrier = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = LogisticOrders_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Manifest#', 'Manifest', 'Manifest', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Warehouse', 'Warehouse', 'Warehouse', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Carrier Type', 'CarrierType', 'CarrierType', 'Text', true],
            ['Carrier', 'Carrier', 'Carrier', 'Text', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Number', true],
            ['Issued By', 'IssuedBy', 'IssuedBy', 'Text', true],
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

        if (!$scope.selectedWarehouse) {
            $scope.filters.Warehouse.Operator = 'in';
            $scope.filters.Warehouse.Value = Utility_ERP.Value_OperatorIN_($scope.data_Warehouse_perBranch, 'Code');
        } else {
            $scope.filters.Warehouse.Operator = '=';
            $scope.filters.Warehouse.Value = $scope.selectedWarehouse;
        }

        if (!$scope.selectedCarrierType) {
            $scope.filters.CarrierType.Operator = 'in';
            $scope.filters.CarrierType.Value = Utility_ERP.Value_OperatorIN_($scope.data_CarrierType, 'Code');
        } else {
            $scope.filters.CarrierType.Operator = '=';
            $scope.filters.CarrierType.Value = $scope.selectedCarrierType;
        }

        if (!$scope.selectedCarrier) {
            $scope.filters.Carrier.Operator = 'in';
            $scope.filters.Carrier.Value = Utility_ERP.Value_OperatorIN_($scope.data_Carrier, 'Code');
        } else {
            $scope.filters.Carrier.Operator = '=';
            $scope.filters.Carrier.Value = $scope.selectedCarrier;
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

        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('LogisticOrders', $scope);

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

    $scope.getData_CarrierType = async function () {
        $scope.data_CarrierType = await Shipment_Service.Dropdown_CarrierType();
    };

    $scope.getData_Carrier = async function () {
        $scope.data_Carrier = await Shipment_Service.Dropdown_Carrier();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('LogisticOrder');

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

        let warehouse = $scope.filters.Warehouse.Value;
        if (warehouse && typeof warehouse === 'string' && warehouse.indexOf('(') >= 0) warehouse = '';
        $scope.selectedWarehouse = warehouse;

        let carrierType = $scope.filters.CarrierType.Value;
        if (carrierType && typeof carrierType === 'string' && carrierType.indexOf('(') >= 0) carrierType = '';
        $scope.selectedCarrierType = carrierType;

        let carrier = $scope.filters.Carrier.Value;
        if (carrier && typeof carrier === 'string' && carrier.indexOf('(') >= 0) carrier = '';
        $scope.selectedCarrier = carrier;

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
            $scope.getData_CarrierType(),
            $scope.getData_Carrier(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('LogisticOrders', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.printForm = async function () { }

    $scope.loadVerification = async function () { }

    $scope.publishDO = async function () { }

    $scope.onDelivery = async function () { }

    $scope.voidClick = async function () { }

    $scope.initialize_Page();
});