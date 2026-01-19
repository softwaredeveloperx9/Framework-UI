angular.module('app.erp').controller('ItemCostsCtrl', function ($rootScope, $scope, Utility_ERP, ItemCosts_Service, Inventory_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        CostGroup: { PropertyName: 'CostGroupCode', Operator: 'in', Value: '' },
        Currency: { PropertyName: 'CurrencyCode', Operator: 'in', Value: '' },
        Brand: { PropertyName: 'BrandCode', Operator: 'in', Value: '' },
        Category: { PropertyName: 'CategoryCode', Operator: 'in', Value: '' },
        EffectiveDateFrom_date: { PropertyName: 'EffectiveDate', Operator: '>=', Value: '' },
        EffectiveDateTo_date: { PropertyName: 'EffectiveDate', Operator: '<=', Value: '' },
    };

    $scope.selectedCostGroup = '';
    $scope.selectedCurrency = '';
    $scope.selectedBrand = '';
    $scope.selectedCategory = '';
    $scope.selectedEffectiveDateFrom = '';
    $scope.selectedEffectiveDateTo = '';

    $scope.data_CostGroup = [];
    $scope.data_Currency = [];
    $scope.data_Brand = [];
    $scope.data_Category = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = ItemCosts_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item #', 'ItemNumber', 'ItemNumber', 'Text', true],
            ['Category', 'Category', 'Category', 'Text', true],
            ['Brand', 'Brand', 'Brand', 'Text', true],
            ['Type', 'Type', 'Type', 'Text', true],
            ['Name', 'Name', 'Name', 'Text', true],
            ['Uom', 'Uom', 'Uom', 'Text', true],
            ['Current Cost', 'CurrentCost', 'CurrentCost', 'Currency', true],
            ['Valid From', 'ValidFrom', 'ValidFrom', 'Date', true],
            ['New Cost', 'NewCost', 'NewCost', 'Currency', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedCostGroup) {
            $scope.filters.CostGroup.Operator = 'in';
            $scope.filters.CostGroup.Value = Utility_ERP.Value_OperatorIN_($scope.data_CostGroup, 'Code');
        } else {
            $scope.filters.CostGroup.Operator = '=';
            $scope.filters.CostGroup.Value = $scope.selectedCostGroup;
        }

        if (!$scope.selectedCurrency) {
            $scope.filters.Currency.Operator = 'in';
            $scope.filters.Currency.Value = Utility_ERP.Value_OperatorIN_($scope.data_Currency, 'Code');
        } else {
            $scope.filters.Currency.Operator = '=';
            $scope.filters.Currency.Value = $scope.selectedCurrency;
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

        $scope.filters.EffectiveDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedEffectiveDateFrom);
        $scope.filters.EffectiveDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedEffectiveDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('ItemCosts', $scope);
    };

    $scope.getData_CostGroup = async function () {
        $scope.data_CostGroup = await Inventory_Service.Dropdown_CostGroup();
    };

    $scope.getData_Currency = async function () {
        $scope.data_Currency = await Inventory_Service.Dropdown_Currency();
    };

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await Inventory_Service.Dropdown_Brand();
    };

    $scope.getData_Category = async function () {
        $scope.data_Category = await Inventory_Service.Dropdown_Category();
    };

    ;

    async function Override_some_Filters() {
        let costGroup = $scope.filters.CostGroup.Value;
        if (costGroup && typeof costGroup === 'string' && costGroup.indexOf('(') >= 0) costGroup = '';
        $scope.selectedCostGroup = costGroup;

        let currency = $scope.filters.Currency.Value;
        if (currency && typeof currency === 'string' && currency.indexOf('(') >= 0) currency = '';
        $scope.selectedCurrency = currency;

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
            $scope.getData_CostGroup(),
            $scope.getData_Currency(),
            $scope.getData_Brand(),
            $scope.getData_Category()
        ]);

        $rootScope.LoadFilterState('ItemCosts', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.recalculate = async function () {
        // TODO: Implement recalculate functionality
    };

    $scope.printMovements = async function () {
        // TODO: Implement print movements functionality
    };

    $scope.downloadSchema = async function () {
        // TODO: Implement download schema functionality
    };

    $scope.uploadFile = async function () {
        // TODO: Implement upload functionality
    };

    $scope.initialize_Page();
});