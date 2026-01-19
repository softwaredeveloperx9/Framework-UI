angular.module('app.erp').controller('DropshipPositionsCtrl', function ($rootScope, $scope, Utility_ERP, DropshipPositions_Service, Inventory_Service) {
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
        Brand: { PropertyName: 'Brand', Operator: 'in', Value: '' },
        Profile: { PropertyName: 'Profile', Operator: 'in', Value: '' },
        Location: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Category: { PropertyName: 'CategoryCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        HideEmptyStock: { PropertyName: 'Outstanding', Operator: '>', Value: null },
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedBrand = '';
    $scope.selectedProfile = '';
    $scope.selectedLocation = '';
    $scope.selectedCategory = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedHideEmptyStock = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_Brand = [];
    $scope.data_Profile = [];
    $scope.data_Location = [];
    $scope.data_Category = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = DropshipPositions_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item Code', 'ItemCode', 'ItemCode', 'Text', true],
            ['Item Name', 'ItemName', 'ItemName', 'Text', true],
            ['Brand', 'Brand', 'Brand', 'Text', true],
            ['Uom', 'Uom', 'Uom', 'Text', true],
            ['On P/R', 'OnPR', 'OnPR', 'Number', true],
            ['Outstanding', 'Outstanding', 'Outstanding', 'Number', true],
            ['Drafted', 'Drafted', 'Drafted', 'Number', true],
            ['Submitted', 'Submitted', 'Submitted', 'Number', true],
            ['Delivery', 'Delivery', 'Delivery', 'Number', true],
            ['Received', 'Received', 'Received', 'Number', true],
            ['Delivered', 'Delivered', 'Delivered', 'Number', true],
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

        if (!$scope.selectedProfile) {
            $scope.filters.Profile.Operator = 'in';
            $scope.filters.Profile.Value = Utility_ERP.Value_OperatorIN_($scope.data_Profile, 'Code');
        } else {
            $scope.filters.Profile.Operator = '=';
            $scope.filters.Profile.Value = $scope.selectedProfile;
        }

        if (!$scope.selectedLocation) {
            $scope.filters.Location.Operator = 'in';
            $scope.filters.Location.Value = Utility_ERP.Value_OperatorIN_($scope.data_Location, 'Code');
        } else {
            $scope.filters.Location.Operator = '=';
            $scope.filters.Location.Value = $scope.selectedLocation;
        }

        if (!$scope.selectedCategory) {
            $scope.filters.Category.Operator = 'in';
            $scope.filters.Category.Value = Utility_ERP.Value_OperatorIN_($scope.data_Category, 'Code');
        } else {
            $scope.filters.Category.Operator = '=';
            $scope.filters.Category.Value = $scope.selectedCategory;
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        $scope.filters.HideEmptyStock.Value = null;
        if ($scope.selectedHideEmptyStock) {
            $scope.filters.HideEmptyStock.Value = 0;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedHideEmptyStock'] = $scope.selectedHideEmptyStock;

        $rootScope.SaveFilterState('DropshipPositions', $scope);

        delete $scope.filters['selectedHideEmptyStock'];
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

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await Inventory_Service.Dropdown_Brand();
    };

    $scope.getData_Profile = async function () {
        $scope.data_Profile = await Inventory_Service.Dropdown_Profile();
    };

    $scope.getData_Location = async function () {
        $scope.data_Location = await Inventory_Service.Dropdown_Location();
    };

    $scope.getData_Category = async function () {
        $scope.data_Category = await Inventory_Service.Dropdown_Category();
    };

    

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let warehouse = $scope.filters.Warehouse.Value;
        if (warehouse && typeof warehouse === 'string' && warehouse.indexOf('(') >= 0) warehouse = '';
        $scope.selectedWarehouse = warehouse;

        let brand = $scope.filters.Brand.Value;
        if (brand && typeof brand === 'string' && brand.indexOf('(') >= 0) brand = '';
        $scope.selectedBrand = brand;

        let profile = $scope.filters.Profile.Value;
        if (profile && typeof profile === 'string' && profile.indexOf('(') >= 0) profile = '';
        $scope.selectedProfile = profile;

        let location = $scope.filters.Location.Value;
        if (location && typeof location === 'string' && location.indexOf('(') >= 0) location = '';
        $scope.selectedLocation = location;

        let category = $scope.filters.Category.Value;
        if (category && typeof category === 'string' && category.indexOf('(') >= 0) category = '';
        $scope.selectedCategory = category;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedHideEmptyStock = $scope.filters['selectedHideEmptyStock'];
            delete $scope.filters['selectedHideEmptyStock'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_Brand(),
            $scope.getData_Profile(),
            $scope.getData_Location(),
            $scope.getData_Category()
        ]);

        $rootScope.LoadFilterState('DropshipPositions', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.printList = async function () {
        // Implementation for print list functionality
    }

    $scope.initialize_Page();
});