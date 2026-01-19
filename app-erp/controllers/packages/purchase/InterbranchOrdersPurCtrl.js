angular.module('app.erp').controller('InterbranchOrdersPurCtrl', function ($rootScope, $scope, Utility_ERP, InterbranchOrdersPur_Service, BusinessRelation_Service) {
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
        Warehouse: { PropertyName: 'WarehouseCode', Operator: 'in', Value: '' },
        Supplier: { PropertyName: 'SupplierID', Operator: '=', Value: '' },
        OrderTo: { PropertyName: 'OrderToLocationCode', Operator: 'in', Value: '' },
        Consignee: { PropertyName: 'ConsigneeID', Operator: '=', Value: '' },
        ShipTo: { PropertyName: 'ShippingAddressNumber', Operator: '=', Value: null },
        Date: { PropertyName: 'Date', Operator: '=', Value: null },
        Dropship: { PropertyName: 'Dropship', Operator: 'in', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedSupplier = '';
    $scope.selectedOrderTo = '';
    $scope.selectedConsignee = '';
    $scope.selectedDropship = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_SupplierShippingAddressNames = [];
    $scope.data_ConsigneeShippingAddressNames = [];
    $scope.data_OrderTo = [];
    $scope.data_Dropship = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = InterbranchOrdersPur_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['PO #', 'PONumber', 'PONumber', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Warehouse', 'Warehouse', 'Warehouse', 'Text', true],
            ['Supplier', 'Supplier', 'Supplier', 'Text', true],
            ['Open Qty', 'OpenQty', 'OpenQty', 'Number', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Number', true],
            ['PO Value', 'POValue', 'POValue', 'Currency', true],
            ['Consignee', 'Consignee', 'Consignee', 'Text', true],
            ['Ship To', 'ShipTo', 'ShipTo', 'Text', true],
            ['Required At', 'RequiredAt', 'RequiredAt', 'Date', true],
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

        if (!$scope.selectedWarehouse) {
            $scope.filters.Warehouse.Operator = 'in';
            $scope.filters.Warehouse.Value = Utility_ERP.Value_OperatorIN_($scope.data_Warehouse_perBranch, 'Code');
        } else {
            $scope.filters.Warehouse.Operator = '=';
            $scope.filters.Warehouse.Value = $scope.selectedWarehouse;
        }

        if (!$scope.selectedOrderTo) {
            $scope.filters.OrderTo.Operator = 'in';
            $scope.filters.OrderTo.Value = Utility_ERP.Value_OperatorIN_($scope.data_OrderTo, 'Code');
        } else {
            $scope.filters.OrderTo.Operator = '=';
            $scope.filters.OrderTo.Value = $scope.selectedOrderTo;
        }

        if (!$scope.selectedDropship) {
            $scope.filters.Dropship.Operator = 'in';
            $scope.filters.Dropship.Value = Utility_ERP.Value_OperatorIN_($scope.data_Dropship, 'Code');
        } else {
            $scope.filters.Dropship.Operator = '=';
            $scope.filters.Dropship.Value = $scope.selectedDropship;
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

        $scope.filters['selectedSupplier'] = $scope.selectedSupplier;
        $scope.filters['selectedConsignee'] = $scope.selectedConsignee;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('InterbranchOrdersPur', $scope);

        delete $scope.filters['selectedSupplier'];
        delete $scope.filters['selectedConsignee'];
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

    $scope.getData_Supplier = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.supplierSelected = async function (flag = true) {
        // reset
        $scope.data_SupplierShippingAddressNames = [];
        $scope.filters.OrderTo.Value = null;

        if ($rootScope.Not_ValidString($scope.filters.Supplier.Value)) {
            if (flag) {
                $scope.showData();
            }

            return;
        }

        $scope.data_SupplierShippingAddressNames = await BusinessRelation_Service.GetBusinessRelationShippingAddressNames($scope.filters.Supplier.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_Consignee = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.consigneeSelected = async function (flag = true) {
        // reset
        $scope.data_ConsigneeShippingAddressNames = [];
        $scope.filters.ShipTo.Value = null;

        if ($rootScope.Not_ValidString($scope.filters.Consignee.Value)) {
            if (flag) {
                $scope.showData();
            }

            return;
        }

        $scope.data_ConsigneeShippingAddressNames = await BusinessRelation_Service.GetBusinessRelationShippingAddressNames($scope.filters.Consignee.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_OrderTo = async function () {
        $scope.data_OrderTo = await Location_Service.Dropdown_Location();
    };

    $scope.getData_Dropship = async function () {
        $scope.data_Dropship = [
            { Code: true, Name: 'Yes' },
            { Code: false, Name: 'No' }
        ];
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('InterbranchOrder');

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

        let orderTo = $scope.filters.OrderTo.Value;
        if (orderTo && typeof orderTo === 'string' && orderTo.indexOf('(') >= 0) orderTo = '';
        $scope.selectedOrderTo = orderTo;

        let dropship = $scope.filters.Dropship.Value;
        if (dropship && typeof dropship === 'string' && dropship.indexOf('(') >= 0) dropship = '';
        $scope.selectedDropship = dropship;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedSupplier = $scope.filters['selectedSupplier'];
            delete $scope.filters['selectedSupplier'];

            let orderToValue = $scope.filters.OrderTo.Value;
            await $scope.supplierSelected(false);
            $scope.filters.OrderTo.Value = orderToValue;

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
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_OrderTo(),
            $scope.getData_Dropship(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('InterbranchOrdersPur', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.printForm = async function () { }

    $scope.exportList = async function () { }

    $scope.closeOrder = async function () { }

    $scope.deliveryOrder = async function () { }

    $scope.pickupOrder = async function () { }

    $scope.voidOrder = async function () { }

    $scope.initialize_Page();
});