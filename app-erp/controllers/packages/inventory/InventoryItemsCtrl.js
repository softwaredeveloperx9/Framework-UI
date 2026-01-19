angular.module('app.erp').controller('InventoryItemsCtrl', function ($rootScope, $scope, $stateParams, Utility_ERP, InventoryItems_Service, Inventory_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Profile: { PropertyName: 'ItemTypeCode', Operator: '=', Value: null },
        Category: { PropertyName: 'CategoryCode', Operator: '=', Value: null },
        Manufacture: { PropertyName: 'ManufacturerCode', Operator: '=', Value: null },
        Brand: { PropertyName: 'BrandCode', Operator: '=', Value: null },
        StockingType: { PropertyName: 'StockingTypeCode', Operator: '=', Value: null },
    };

    $scope.selectedCategory = '';

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = InventoryItems_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Name', 'ShortName', 'ShortName', 'Text', true],
            ['Profile', 'TypeName', 'TypeName', 'Text', true],
            ['Category', 'CategoryName', 'CategoryName', 'Text', true],
            ['Brand', 'BrandName', 'BrandName', 'Text', true],
            ['Manufacture', 'ManufactureName', 'ManufactureName', 'Text', true],
            ['Stocking Name', 'StockingTypeName', 'StockingTypeName', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $scope.filters['selectedCategory'] = $scope.selectedCategory;

        $rootScope.SaveFilterState('InventoryItem', $scope);

        delete $scope.filters['selectedCategory'];

        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);
    };

    

    // getData functions for Dropdown to Service filters
    $scope.getData_Profile = async function () {
        $scope.data_Profile = await Inventory_Service.Dropdown_Profile();

        // Special case
        $scope.data_Profile.unshift({ Code: '', Name: 'Select an Item' });

        // Default untuk DropdownList
        try {
            $scope.filters.Profile.Value = '';
        } catch (error) { }
    };

    $scope.getData_Manufacture = async function () {
        $scope.data_Manufacture = await Inventory_Service.Dropdown_Manufacturer();

        // Special case
        $scope.data_Manufacture.unshift({ Code: '', Description: 'Select an Item' });

        // Default untuk DropdownList
        try {
            $scope.filters.Manufacture.Value = '';
        } catch (error) { }
    };

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await Inventory_Service.Dropdown_Brand();

        // Special case
        $scope.data_Brand.unshift({ Code: '', Description: 'Select an Item' });

        // Default untuk DropdownList
        try {
            $scope.filters.Brand.Value = '';
        } catch (error) { }
    };

    $scope.getData_StockingType = async function () {
        $scope.data_StockingType = await Inventory_Service.Dropdown_StockingType();
    };

    // getData function for typeahead filter
    $scope.getData_Category = function (val) {
        return Inventory_Service.Dropdown_Category2(val);
    };

    async function Override_some_Filters() {
        let profile = $rootScope.Simple_Decode($rootScope.getParamValue($stateParams, 'profile'));
        if (profile) {
            $scope.filters.Profile.Value = profile;
        }

        let manufacture = $rootScope.Simple_Decode($rootScope.getParamValue($stateParams, 'manufacture'));
        if (manufacture) {
            $scope.filters.Manufacture.Value = manufacture;
        }

        let brand = $rootScope.Simple_Decode($rootScope.getParamValue($stateParams, 'brand'));
        if (brand) {
            $scope.filters.Brand.Value = brand;
        }

        let stockingType = $rootScope.Simple_Decode($rootScope.getParamValue($stateParams, 'stockingType'));
        if (stockingType) {
            $scope.filters.StockingType.Value = stockingType;
        }

        if ($scope.LoadFilterState_) {
            $scope.selectedCategory = $scope.filters['selectedCategory'];
            delete $scope.filters['selectedCategory'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('InventoryItem', $scope);

        await Promise.allSettled([
            $scope.getData_Profile(),
            $scope.getData_Manufacture(),
            $scope.getData_Brand(),
            $scope.getData_StockingType(),
        ]);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});
