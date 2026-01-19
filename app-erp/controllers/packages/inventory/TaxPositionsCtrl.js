angular.module('app.erp').controller('TaxPositionsCtrl', function ($rootScope, $scope, Utility_ERP, TaxPositions_Service, Inventory_Service) {
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
        Category: { PropertyName: 'CategoryCode', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedWarehouse = '';
    $scope.selectedBrand = '';
    $scope.selectedProfile = '';
    $scope.selectedCategory = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Warehouse_perBranch = [];
    $scope.data_Brand = [];
    $scope.data_Profile = [];
    $scope.data_Category = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = TaxPositions_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item Code', 'ItemCode', 'ItemCode', 'Text', true],
            ['Item Name', 'ItemName', 'ItemName', 'Text', true],
            ['Brand', 'Brand', 'Brand', 'Text', true],
            ['Category', 'Category', 'Category', 'Text', true],
            ['PR', 'PR', 'PR', 'Number', true],
            ['PO', 'PO', 'PO', 'Number', true],
            ['Reserved', 'Reserved', 'Reserved', 'Number', true],
            ['Demand', 'Demand', 'Demand', 'Number', true],
            ['Physical', 'Physical', 'Physical', 'Number', true],
            ['Available', 'Available', 'Available', 'Number', true],
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

        $rootScope.SaveFilterState('TaxPositions', $scope);
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

        $rootScope.LoadFilterState('TaxPositions', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.Reorganize_Warehouse();

        $scope.showData();
    };

    $scope.exportToCsv = async function () {
        // Implementation for export to csv functionality
    }

    $scope.downloadSchema = async function () {
        // Implementation for download schema functionality
    }

    $scope.uploadData = async function () {
        // Implementation for upload functionality
    }

    $scope.initialize_Page();
});