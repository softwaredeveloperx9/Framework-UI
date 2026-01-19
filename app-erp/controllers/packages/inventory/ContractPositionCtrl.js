angular.module('app.erp').controller('ContractPositionCtrl', function ($rootScope, $scope, Utility_ERP, ContractPosition_Service, Inventory_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Contract: { PropertyName: 'ContractCode', Operator: 'in', Value: '' },
        Profile: { PropertyName: 'Profile', Operator: 'in', Value: '' },
        Brand: { PropertyName: 'Brand', Operator: 'in', Value: '' },
        Category: { PropertyName: 'CategoryCode', Operator: 'in', Value: '' },
    };

    $scope.selectedContract = '';
    $scope.selectedProfile = '';
    $scope.selectedBrand = '';
    $scope.selectedCategory = '';

    $scope.data_Contract = [];
    $scope.data_Profile = [];
    $scope.data_Brand = [];
    $scope.data_Category = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = ContractPosition_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item Code', 'ItemCode', 'ItemCode', 'Text', true],
            ['Item Name', 'ItemName', 'ItemName', 'Text', true],
            ['Brand', 'Brand', 'Brand', 'Text', true],
            ['Category', 'Category', 'Category', 'Text', true],
            ['Uom', 'Uom', 'Uom', 'Text', true],
            ['Ordered', 'Ordered', 'Ordered', 'Number', true],
            ['Open', 'Open', 'Open', 'Number', true],
            ['On P/R', 'OnPR', 'OnPR', 'Number', true],
            ['On P/O', 'OnPO', 'OnPO', 'Number', true],
            ['Reserved', 'Reserved', 'Reserved', 'Number', true],
            ['Demand', 'Demand', 'Demand', 'Number', true],
            ['Shipment', 'Shipment', 'Shipment', 'Number', true],
            ['Picking', 'Picking', 'Picking', 'Number', true],
            ['Routing', 'Routing', 'Routing', 'Number', true],
            ['Manifest', 'Manifest', 'Manifest', 'Number', true],
            ['Delivery', 'Delivery', 'Delivery', 'Number', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedContract) {
            $scope.filters.Contract.Operator = 'in';
            $scope.filters.Contract.Value = Utility_ERP.Value_OperatorIN_($scope.data_Contract, 'Code');
        } else {
            $scope.filters.Contract.Operator = '=';
            $scope.filters.Contract.Value = $scope.selectedContract;
        }

        if (!$scope.selectedProfile) {
            $scope.filters.Profile.Operator = 'in';
            $scope.filters.Profile.Value = Utility_ERP.Value_OperatorIN_($scope.data_Profile, 'Code');
        } else {
            $scope.filters.Profile.Operator = '=';
            $scope.filters.Profile.Value = $scope.selectedProfile;
        }

        if (!$scope.selectedBrand) {
            $scope.filters.Brand.Operator = 'in';
            $scope.filters.Brand.Value = Utility_ERP.Value_OperatorIN_($scope.data_Brand, 'Code');
        } else {
            $scope.filters.Brand.Operator = '=';
            $scope.filters.Brand.Value = $scope.selectedBrand;
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

        $rootScope.SaveFilterState('ContractPosition', $scope);
    };

    $scope.getData_Contract = async function () {
        $scope.data_Contract = await Inventory_Service.Dropdown_Contract();
    };

    $scope.getData_Profile = async function () {
        $scope.data_Profile = await Inventory_Service.Dropdown_Profile();
    };

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await Inventory_Service.Dropdown_Brand();
    };

    $scope.getData_Category = async function () {
        $scope.data_Category = await Inventory_Service.Dropdown_Category();
    };

    

    async function Override_some_Filters() {
        let contract = $scope.filters.Contract.Value;
        if (contract && typeof contract === 'string' && contract.indexOf('(') >= 0) contract = '';
        $scope.selectedContract = contract;

        let profile = $scope.filters.Profile.Value;
        if (profile && typeof profile === 'string' && profile.indexOf('(') >= 0) profile = '';
        $scope.selectedProfile = profile;

        let brand = $scope.filters.Brand.Value;
        if (brand && typeof brand === 'string' && brand.indexOf('(') >= 0) brand = '';
        $scope.selectedBrand = brand;

        let category = $scope.filters.Category.Value;
        if (category && typeof category === 'string' && category.indexOf('(') >= 0) category = '';
        $scope.selectedCategory = category;
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_Contract(),
            $scope.getData_Profile(),
            $scope.getData_Brand(),
            $scope.getData_Category()
        ]);

        $rootScope.LoadFilterState('ContractPosition', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});