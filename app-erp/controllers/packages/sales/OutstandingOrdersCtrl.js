angular.module('app.erp').controller('OutstandingOrdersCtrl', function ($rootScope, $scope, Utility_ERP, OutstandingOrders_Service, BusinessRelation_Service) {
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
        ShipTo: { PropertyName: 'ShippingAddressNumber', Operator: 'in', Value: '' },
        TOP: { PropertyName: 'TOPCode', Operator: 'in', Value: '' },
        Type: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
        Date_date: { PropertyName: 'Date', Operator: '=', Value: '' },
        ExpiredDate_date: { PropertyName: 'ExpiredDate', Operator: '=', Value: '' },
        Age: { PropertyName: 'Age', Operator: 'in', Value: '' },
        View: { PropertyName: 'View', Operator: '=', Value: '' },
        ReservedOnly: { PropertyName: 'Reserved', Operator: '>', Value: null },
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedCustomer = '';
    $scope.selectedTOP = '';
    $scope.selectedDate = '';
    $scope.selectedShipTo = '';
    $scope.selectedType = '';
    $scope.selectedExpiredDate = '';
    $scope.selectedAge = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_ShipTo = [];
    $scope.data_TOP = [];
    $scope.data_Type = [];
    $scope.data_Age = [];
    $scope.data_View = [
        { Value: '', Text: 'All' },
        { Value: 'Summary', Text: 'Summary' },
        { Value: 'Detail', Text: 'Detail' },
    ];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = OutstandingOrders_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['SO #', 'Code', 'Code', 'Text', true],
            ['PO#', 'PONumber', 'PONumber', 'Text', true],
            ['Type', 'TypeName', 'TypeName', 'Text', true],
            ['Branch', 'BranchName', 'BranchName', 'Text', true],
            ['Warehouse', 'WarehouseName', 'WarehouseName', 'Text', true],
            ['TOP', 'TOPName', 'TOPName', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Ship To', 'ShipToName', 'ShipToName', 'Text', true],
            ['Open', 'TotalOpenQty', 'TotalOpenQty', 'Number', true],
            ['Reserved', 'TotalReservedQty', 'TotalReservedQty', 'Number', true],
            ['On Demand', 'TotalOnDemandQty', 'TotalOnDemandQty', 'Number', true],
            ['Req. Date', 'RequiredDate', 'RequiredDate', 'Date', true],
            ['Age', 'Age', 'Age', 'Number', true],
            ['Expired Date', 'ExpiredDate', 'ExpiredDate', 'Date', true],
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

        if (!$scope.selectedShipTo) {
            $scope.filters.ShipTo.Operator = 'in';
            $scope.filters.ShipTo.Value = Utility_ERP.Value_OperatorIN_($scope.data_ShipTo, 'Number');
        } else {
            $scope.filters.ShipTo.Operator = '=';
            $scope.filters.ShipTo.Value = $scope.selectedShipTo;
        }

        if (!$scope.selectedTOP) {
            $scope.filters.TOP.Operator = 'in';
            $scope.filters.TOP.Value = Utility_ERP.Value_OperatorIN_($scope.data_TOP, 'Code');
        } else {
            $scope.filters.TOP.Operator = '=';
            $scope.filters.TOP.Value = $scope.selectedTOP;
        }

        if (!$scope.selectedType) {
            $scope.filters.Type.Operator = 'in';
            $scope.filters.Type.Value = Utility_ERP.Value_OperatorIN_($scope.data_Type, 'Code');
        } else {
            $scope.filters.Type.Operator = '=';
            $scope.filters.Type.Value = $scope.selectedType;
        }

        if (!$scope.selectedAge) {
            $scope.filters.Age.Operator = 'in';
            $scope.filters.Age.Value = Utility_ERP.Value_OperatorIN_($scope.data_Age, 'Code');
        } else {
            $scope.filters.Age.Operator = '=';
            $scope.filters.Age.Value = $scope.selectedAge;
        }

        $scope.filters.Date_date.Value = $rootScope.Date_to_DB($scope.selectedDate);
        $scope.filters.ExpiredDate_date.Value = $rootScope.Date_to_DB($scope.selectedExpiredDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;

        $rootScope.SaveFilterState('OutstandingOrders', $scope);

        delete $scope.filters['selectedCustomer'];
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
        $scope.data_ShipTo = [];
        $scope.selectedShipTo = '';

        if ($rootScope.Not_ValidString($scope.filters.Customer.Value)) {
            if (flag) {
                $scope.showData();
            }

            return;
        }

        $scope.data_ShipTo = await BusinessRelation_Service.GetBusinessRelationShippingAddressNames($scope.filters.Customer.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_TOP = async function () {
        $scope.data_TOP = await Utility_ERP.getData_TermOfPayment();
    };

    $scope.getData_Type = async function () {
        $scope.data_Type = await Utility_ERP.getData_SalesOrderType();
    };

    $scope.getData_Age = async function () {
        $scope.data_Age = await Utility_ERP.getData_OutstandingAge();
    };

    

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let warehouse = $scope.filters.Warehouse.Value;
        if (warehouse && typeof warehouse === 'string' && warehouse.indexOf('(') >= 0) warehouse = '';
        $scope.selectedWarehouse = warehouse;

        let shipTo = $scope.filters.ShipTo.Value;
        if (shipTo && typeof shipTo === 'string' && shipTo.indexOf('(') >= 0) shipTo = '';
        $scope.selectedShipTo = shipTo;

        let top = $scope.filters.TOP.Value;
        if (top && typeof top === 'string' && top.indexOf('(') >= 0) top = '';
        $scope.selectedTOP = top;

        let type = $scope.filters.Type.Value;
        if (type && typeof type === 'string' && type.indexOf('(') >= 0) type = '';
        $scope.selectedType = type;

        let age = $scope.filters.Age.Value;
        if (age && typeof age === 'string' && age.indexOf('(') >= 0) age = '';
        $scope.selectedAge = age;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedCustomer = $scope.filters['selectedCustomer'];
            delete $scope.filters['selectedCustomer'];

            await $scope.customerSelected(false);
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_TOP(),
            $scope.getData_Type(),
            $scope.getData_Age()
        ]);

        $rootScope.LoadFilterState('OutstandingOrders', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.deliveryForm = async function () { }

    $scope.closeForm = async function () { }

    $scope.reserveForm = async function () { }

    $scope.releaseReservationForm = async function () { }

    $scope.refreshSOForm = async function () { }

    $scope.exportToExcel = async function () { }

    $scope.initialize_Page();
});