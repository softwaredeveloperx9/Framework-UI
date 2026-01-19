angular.module('app.erp').controller('TaxReplenishmentCtrl', function ($rootScope, $scope, Utility_ERP, TaxReplenishment_Service, Inventory_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Warehouse: { PropertyName: 'WarehouseCode', Operator: 'in', Value: '' },
        Brand: { PropertyName: 'Brand', Operator: 'in', Value: '' },
        Profile: { PropertyName: 'Profile', Operator: 'in', Value: '' },
        Category: { PropertyName: 'CategoryCode', Operator: 'in', Value: '' },
    };

    $scope.selectedWarehouse = '';
    $scope.selectedBrand = '';
    $scope.selectedProfile = '';
    $scope.selectedCategory = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Brand = [];
    $scope.data_Brand_All = [];
    $scope.data_Profile = [];
    $scope.data_Profile_All = [];
    $scope.data_Category = [];
    $scope.data_Category_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = TaxReplenishment_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item Code', 'ItemCode', 'ItemCode', 'Text', true],
            ['Item Name', 'ItemName', 'ItemName', 'Text', true],
            ['Brand', 'Brand', 'Brand', 'Text', true],
            ['Category', 'Category', 'Category', 'Text', true],
            ['Uom', 'Uom', 'Uom', 'Text', true],
            ['Lead Time', 'LeadTime', 'LeadTime', 'Number', true],
            ['Reserved', 'Reserved', 'Reserved', 'Number', true],
            ['Demand', 'Demand', 'Demand', 'Number', true],
            ['Physical', 'Physical', 'Physical', 'Number', true],
            ['Available', 'Available', 'Available', 'Number', true],
            ['Reorder Point', 'ReorderPoint', 'ReorderPoint', 'Number', true],
            ['EOQ', 'EOQ', 'EOQ', 'Number', true],
            ['On PR', 'OnPR', 'OnPR', 'Number', true],
            ['On PO', 'OnPO', 'OnPO', 'Number', true],
            ['On Rec.', 'OnRec', 'OnRec', 'Number', true],
            ['Rec. Order', 'RecOrder', 'RecOrder', 'Number', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedWarehouse) {
            $scope.filters.Warehouse.Operator = 'in';
            $scope.filters.Warehouse.Value = Utility_ERP.Value_OperatorIN_($scope.data_EmployeeWarehouseAccess, 'Code');
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

        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('TaxReplenishment', $scope);

        delete $scope.filters['selectedShowAll'];
    };

    $scope.getData_Brand = async function () {
        $scope.data_Brand_All = await Inventory_Service.Dropdown_Brand();

        // prettier-ignore
        $scope.data_Brand = ($scope.selectedShowAll ? $scope.data_Brand_All : $scope.data_Brand_All.filter(function (e) { return e.IsArchive == false; }));
    };

    $scope.getData_Profile = async function () {
        $scope.data_Profile_All = await Inventory_Service.Dropdown_Profile();

        // prettier-ignore
        $scope.data_Profile = ($scope.selectedShowAll ? $scope.data_Profile_All : $scope.data_Profile_All.filter(function (e) { return e.IsArchive == false; }));
    };

    $scope.getData_Category = async function () {
        $scope.data_Category_All = await Inventory_Service.Dropdown_Category();

        // prettier-ignore
        $scope.data_Category = ($scope.selectedShowAll ? $scope.data_Category_All : $scope.data_Category_All.filter(function (e) { return e.IsArchive == false; }));
    };

    $scope.selectedShowAll_Change = async function (flag = true, flag2 = true) {
        // prettier-ignore
        $scope.data_Brand = ($scope.selectedShowAll ? $scope.data_Brand_All : $scope.data_Brand_All.filter(function (e) { return e.IsArchive == false; }));

        // prettier-ignore
        $scope.data_Profile = ($scope.selectedShowAll ? $scope.data_Profile_All : $scope.data_Profile_All.filter(function (e) { return e.IsArchive == false; }));

        // prettier-ignore
        $scope.data_Category = ($scope.selectedShowAll ? $scope.data_Category_All : $scope.data_Category_All.filter(function (e) { return e.IsArchive == false; }));

        // just to make UX consistent
        if (flag2) {
            $scope.selectedBrand = '';
            $scope.selectedProfile = '';
            $scope.selectedCategory = '';
        }

        if (flag) {
            await $scope.showData();
        }
    };

    

    async function Override_some_Filters() {
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
            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_Brand(),
            $scope.getData_Profile(),
            $scope.getData_Category()
        ]);

        $rootScope.LoadFilterState('TaxReplenishment', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.createPO = async function () {
        // Implementation for create P/O functionality
    }

    $scope.initialize_Page();
});