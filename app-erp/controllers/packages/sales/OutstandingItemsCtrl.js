angular.module('app.erp').controller('OutstandingItemsCtrl', function ($rootScope, $scope, Utility_ERP, OutstandingItems_Service, BusinessRelation_Service, Inventory_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.viewOptions = [
        { Value: null, Text: 'All' },
        { Value: 1, Text: 'View 1' },
        { Value: 2, Text: 'View 2' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Customer: { PropertyName: 'CustomerID', Operator: '=', Value: '' },
        Date_date: { PropertyName: 'Date', Operator: '=', Value: '' },
        View: { PropertyName: 'ViewType', Operator: '=', Value: null },
        Brand: { PropertyName: 'BrandCode', Operator: 'in', Value: '' },
        Reserved: { PropertyName: 'Reserved', Operator: '=', Value: null },
        Warehouse: { PropertyName: 'WarehouseCode', Operator: 'in', Value: '' },
        BillTo: { PropertyName: 'BillingAddressNumber', Operator: '=', Value: null },
        ExpiredDate_date: { PropertyName: 'ExpiredDate', Operator: '=', Value: '' },
        Age: { PropertyName: 'AgeCode', Operator: 'in', Value: '' },
        ItemCode: { PropertyName: 'ItemCode', Operator: '=', Value: '' },
        OnDemand: { PropertyName: 'OnDemand', Operator: '=', Value: null },
    };

    $scope.selectedBranch = '';
    $scope.selectedCustomer = '';
    $scope.selectedDate = $rootScope.Date_to_UI(new Date());
    $scope.selectedBrand = '';
    $scope.selectedWarehouse = '';
    $scope.selectedExpiredDate = '';
    $scope.selectedAge = '';
    $scope.selectedItemCode = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_BillingAddressNames = [];
    $scope.data_Brand = [];
    $scope.data_Age = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = OutstandingItems_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['SO #', 'SO', 'SO', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Warehouse', 'Warehouse', 'Warehouse', 'Text', true],
            ['Customer', 'Customer', 'Customer', 'Text', true],
            ['Ship To', 'ShipTo', 'ShipTo', 'Text', true],
            ['Open', 'Open', 'Open', 'Number', true],
            ['Res', 'Res', 'Res', 'Number', true],
            ['Dem', 'Dem', 'Dem', 'Number', true],
            ['PO', 'PO', 'PO', 'Text', true],
            ['TR', 'TR', 'TR', 'Text', true],
            ['Tangerang Peksi', 'TangerangPeksi', 'TangerangPeksi', 'Number', true],
            ['Trikaya', 'Trikaya', 'Trikaya', 'Number', true],
            ['Bogor Peksi', 'BogorPeksi', 'BogorPeksi', 'Number', true],
            ['Trikaya', 'Trikaya2', 'Trikaya2', 'Number', true],
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

        if (!$scope.selectedBrand) {
            $scope.filters.Brand.Operator = 'in';
            $scope.filters.Brand.Value = Utility_ERP.Value_OperatorIN_($scope.data_Brand, 'Code');
        } else {
            $scope.filters.Brand.Operator = '=';
            $scope.filters.Brand.Value = $scope.selectedBrand;
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
        $scope.filters['selectedItemCode'] = $scope.selectedItemCode;

        $rootScope.SaveFilterState('OutstandingItems', $scope);

        delete $scope.filters['selectedCustomer'];
        delete $scope.filters['selectedItemCode'];
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

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.customerSelected = async function (flag = true) {
        // reset
        $scope.data_BillingAddressNames = [];
        $scope.filters.BillTo.Value = null;

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

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await Inventory_Service.Dropdown_Brand();
    };

    $scope.getData_Age = async function () {
        $scope.data_Age = await OutstandingItems_Service.Dropdown_Age();
    };

    $scope.getData_InventoryItem = function (val) {
        return Inventory_Service.Dropdown_InventoryItem(val);
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let warehouse = $scope.filters.Warehouse.Value;
        if (warehouse && typeof warehouse === 'string' && warehouse.indexOf('(') >= 0) warehouse = '';
        $scope.selectedWarehouse = warehouse;

        let brand = $scope.filters.Brand.Value;
        if (brand && typeof brand === 'string' && brand.indexOf('(') >= 0) brand = '';
        $scope.selectedBrand = brand;

        let age = $scope.filters.Age.Value;
        if (age && typeof age === 'string' && age.indexOf('(') >= 0) age = '';
        $scope.selectedAge = age;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedCustomer = $scope.filters['selectedCustomer'];
            delete $scope.filters['selectedCustomer'];

            let billTo = $scope.filters.BillTo.Value;
            await $scope.customerSelected(false);
            $scope.filters.BillTo.Value = billTo;

            $scope.selectedItemCode = $scope.filters['selectedItemCode'];
            delete $scope.filters['selectedItemCode'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_Brand(),
            $scope.getData_Age()
        ]);

        $rootScope.LoadFilterState('OutstandingItems', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.swapReservation = async function () { };

    $scope.delivery = async function () { };

    $scope.reserve = async function () { };

    $scope.releaseReservation = async function () { };

    $scope.pick = async function () { };

    $scope.viewPicked = async function () { };

    $scope.exportList = async function () { };

    $scope.initialize_Page();
});