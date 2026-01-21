angular.module('app.erp').controller('InterbranchOrdersCtrl', function ($rootScope, $scope, Utility_ERP, InterbranchOrders_Service, BusinessRelation_Service) {
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
        Customer: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
        Billto: { PropertyName: 'BillingAddressNumber', Operator: '=', Value: null },
        Type: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
        Date_date: { PropertyName: 'Date', Operator: '=', Value: '' },
        CreatedBy: { PropertyName: 'IssuedBy', Operator: '=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
        Dropship: { PropertyName: 'Dropship', Operator: '=', Value: null },
        Full: { PropertyName: 'ReservationFull', Operator: '=', Value: null },
        OpenOnly: { PropertyName: 'TotalOpenQty', Operator: '>', Value: null },
        UnPrinted: { PropertyName: 'PrintCount', Operator: '<=', Value: null },
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedCustomer = '';
    $scope.selectedType = '';
    $scope.selectedDate = '';
    $scope.selectedCreatedBy = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;
    $scope.selectedOpenOnly = false;
    $scope.selectedUnPrinted = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_BillingAddressNames = [];
    $scope.data_Type = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = InterbranchOrders_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['SO #', 'Code', 'Code', 'Text', true],
            ['PO#', 'PONumber', 'PONumber', 'Text', true],
            ['Type', 'TypeName', 'TypeName', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'BranchName', 'BranchName', 'Text', true],
            ['Warehouse', 'WarehouseName', 'WarehouseName', 'Text', true],
            ['Customer', 'CustomerName', 'CustomerName', 'Text', true],
            ['Open', 'TotalOpenQty', 'TotalOpenQty', 'Number', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Number', true],
            ['SO Value', 'TotalAmount', 'TotalAmount', 'Currency', true],
            ['R', 'ReserveStock', 'ReserveStock', 'Boolean', true],
            ['Created By', 'IssuedByName', 'IssuedByName', 'Text', true],
            ['Status', 'StatusName', 'StatusName', 'Text', true],
            ['Printed', 'PrintCount', 'PrintCount', 'Number', true],
            ['F', 'ReservationFull', 'ReservationFull', 'Boolean', true],
            ['D', 'Dropship', 'Dropship', 'Boolean', true],
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

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        $scope.filters.Date_date.Value = $rootScope.Date_to_DB($scope.selectedDate);

        $scope.filters.OpenOnly.Value = null;
        if ($scope.selectedOpenOnly) {
            $scope.filters.OpenOnly.Value = 0;
        }

        $scope.filters.UnPrinted.Value = null;
        if ($scope.selectedUnPrinted) {
            $scope.filters.UnPrinted.Value = 0;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;
        $scope.filters['selectedCreatedBy'] = $scope.selectedCreatedBy;
        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;
        $scope.filters['selectedOpenOnly'] = $scope.selectedOpenOnly;
        $scope.filters['selectedUnPrinted'] = $scope.selectedUnPrinted;

        $rootScope.SaveFilterState('InterbranchOrders', $scope);

        delete $scope.filters['selectedCustomer'];
        delete $scope.filters['selectedCreatedBy'];
        delete $scope.filters['selectedShowAll'];
        delete $scope.filters['selectedOpenOnly'];
        delete $scope.filters['selectedUnPrinted'];
    };

    $scope.Branch_Changed = async function () {
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

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.customerSelected = async function (flag = true) {
        // reset
        $scope.data_BillingAddressNames = [];
        $scope.filters.Billto.Value = null;

        if ($rootScope.Not_ValidString($scope.filters.Customer.Value)) {
            if (flag) {
                $scope.showData();
            }

            return;
        }

        $scope.data_BillingAddressNames = await BusinessRelation_Service.GetBusinessRelationBillingAddressNames($scope.filters.Customer.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_User = async function (val) {
        return await $rootScope.getData_User(val, $scope);
    };

    $scope.getData_Type = async function () {
        $scope.data_Type = await Utility_ERP.getData_InterbranchOrderType();
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

        let type = $scope.filters.Type.Value;
        if (type && typeof type === 'string' && type.indexOf('(') >= 0) type = '';
        $scope.selectedType = type;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedCustomer = $scope.filters['selectedCustomer'];
            delete $scope.filters['selectedCustomer'];

            let billTo = $scope.filters.Billto.Value;
            await $scope.customerSelected(false);
            $scope.filters.Billto.Value = billTo;

            $scope.selectedCreatedBy = $scope.filters['selectedCreatedBy'];
            delete $scope.filters['selectedCreatedBy'];

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];

            $scope.selectedOpenOnly = $scope.filters['selectedOpenOnly'];
            delete $scope.filters['selectedOpenOnly'];

            $scope.selectedUnPrinted = $scope.filters['selectedUnPrinted'];
            delete $scope.filters['selectedUnPrinted'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_Type(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('InterbranchOrders', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.shipmentClick = async function () { }

    $scope.closeForm = async function () { }

    $scope.requestReservation = async function () { }

    $scope.releaseReservation = async function () { }

    $scope.printForm = async function () { }

    $scope.initialize_Page();
});