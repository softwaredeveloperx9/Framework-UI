angular.module('app.erp').controller('StockPositionsCtrl', function ($rootScope, $scope, Utility_ERP, StockPositions_Service, Inventory_Service) {
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
        ShowAvailableOnly: { PropertyName: 'Available', Operator: '>', Value: null },
        Brand: { PropertyName: 'Brand', Operator: 'in', Value: '' },
        Profile: { PropertyName: 'Profile', Operator: 'in', Value: '' },
        ShowDemandOnly: { PropertyName: 'Demand', Operator: '>', Value: null },
        Category: { PropertyName: 'CategoryCode', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedShowAvailableOnly = false;
    $scope.selectedBrand = '';
    $scope.selectedProfile = '';
    $scope.selectedShowDemandOnly = false;
    $scope.selectedCategory = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_Brand = [];
    $scope.data_Profile = [];
    $scope.data_Category = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = StockPositions_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item Code', 'ItemCode', 'ItemCode', 'Text', true],
            ['Item Name', 'ItemName', 'ItemName', 'Text', true],
            ['Brand', 'Brand', 'Brand', 'Text', true],
            ['TR', 'TR', 'TR', 'Number', true],
            ['PO', 'PO', 'PO', 'Number', true],
            ['Reserved', 'Reserved', 'Reserved', 'Number', true],
            ['Demand', 'Demand', 'Demand', 'Number', true],
            ['Shipment', 'Shipment', 'Shipment', 'Number', true],
            ['Picking', 'Picking', 'Picking', 'Number', true],
            ['Routing', 'Routing', 'Routing', 'Number', true],
            ['Manifest', 'Manifest', 'Manifest', 'Number', true],
            ['Delivery', 'Delivery', 'Delivery', 'Number', true],
            ['Isolation', 'Isolation', 'Isolation', 'Number', true],
            ['Physical', 'Physical', 'Physical', 'Number', true],
            ['Available', 'Available', 'Available', 'Number', true],
            ['VAT', 'VAT', 'VAT', 'Number', true],
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

        $scope.filters.ShowAvailableOnly.Value = null;
        if ($scope.selectedShowAvailableOnly) {
            $scope.filters.ShowAvailableOnly.Value = 0;
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

        $scope.filters.ShowDemandOnly.Value = null;
        if ($scope.selectedShowDemandOnly) {
            $scope.filters.ShowDemandOnly.Value = 0;
        }

        if (!$scope.selectedCategory) {
            $scope.filters.Category.Operator = 'in';
            $scope.filters.Category.Value = Utility_ERP.Value_OperatorIN_($scope.data_Category, 'Code');
        } else {
            $scope.filters.Category.Operator = '=';
            $scope.filters.Category.Value = $scope.selectedCategory;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedShowAvailableOnly'] = $scope.selectedShowAvailableOnly;
        $scope.filters['selectedShowDemandOnly'] = $scope.selectedShowDemandOnly;

        $rootScope.SaveFilterState('StockPositions', $scope);

        delete $scope.filters['selectedShowAvailableOnly'];
        delete $scope.filters['selectedShowDemandOnly'];
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

        let category = $scope.filters.Category.Value;
        if (category && typeof category === 'string' && category.indexOf('(') >= 0) category = '';
        $scope.selectedCategory = category;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedShowAvailableOnly = $scope.filters['selectedShowAvailableOnly'];
            delete $scope.filters['selectedShowAvailableOnly'];

            $scope.selectedShowDemandOnly = $scope.filters['selectedShowDemandOnly'];
            delete $scope.filters['selectedShowDemandOnly'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_Brand(),
            $scope.getData_Profile(),
            $scope.getData_Category()
        ]);

        $rootScope.LoadFilterState('StockPositions', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.exportList = async function () { }

    $scope.downloadSchema = async function () { }

    $scope.uploadData = async function () { }

    $scope.initialize_Page();
});