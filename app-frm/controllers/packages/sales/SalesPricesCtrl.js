angular.module('app.erp').controller('SalesPricesCtrl', function ($rootScope, $scope, Utility_ERP, SalesPrices_Service, Inventory_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'BranchCode', Operator: 'in', Value: '' },
        Brand: { PropertyName: 'BrandCode', Operator: '=', Value: '' },
        PriceGroup: { PropertyName: 'PriceGroupCode', Operator: '=', Value: '' },
        Category: { PropertyName: 'CategoryCode', Operator: '=', Value: null },
        Currency: { PropertyName: 'CurrencyCode', Operator: '=', Value: '' },
        EffectiveDate_date: { PropertyName: 'ValidFrom', Operator: '<=', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedPriceGroup = '';
    $scope.selectedCurrency = '';
    $scope.selectedBrand = '';
    $scope.selectedCategory = '';
    $scope.selectedEffectiveDate = $rootScope.Date_to_UI(new Date());

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_PriceGroup = [];
    $scope.data_Currency = [];
    $scope.data_Brand = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = SalesPrices_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Branch', 'BranchName', 'BranchName', 'TextX', true],
            ['Item #', 'ItemCode', 'ItemCode', 'Text', true],
            ['Category', 'CategoryName', 'CategoryName', 'Text', true],
            ['Brand', 'BrandName', 'BrandName', 'Text', true],
            ['Type', 'TypeName', 'TypeName', 'Text', true],
            ['Name', 'ItemName', 'ItemName', 'Text', true],
            ['Uom', 'UomName', 'UomName', 'Text', true],
            ['Price', 'Amount', 'Amount', 'Currency', true],
            ['Valid From', 'ValidFrom', 'ValidFrom', 'Date', true],
            ['New Price', 'NewPrice', 'Amount', 'TextInput', true],
            ['Inc. Tax', 'TaxIncluded', 'TaxIncluded', 'Boolean', true],
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

        if (!$scope.selectedPriceGroup) {
            $scope.filters.PriceGroup.Operator = 'in';
            $scope.filters.PriceGroup.Value = Utility_ERP.Value_OperatorIN_($scope.data_PriceGroup, 'Code');
        } else {
            $scope.filters.PriceGroup.Operator = '=';
            $scope.filters.PriceGroup.Value = $scope.selectedPriceGroup;
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

        $scope.filters.EffectiveDate_date.Value = $rootScope.Date_to_DB($scope.selectedEffectiveDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCategory'] = $scope.selectedCategory;

        $rootScope.SaveFilterState('SalesPrices', $scope);

        delete $scope.filters['selectedCategory'];
    };

    $scope.getData_PriceGroup = async function () {
        $scope.data_PriceGroup = await SalesPrices_Service.Dropdown_PriceGroup();
    };

    $scope.getData_Currency = async function () {
        $scope.data_Currency = await SalesPrices_Service.Dropdown_Currency();
    };

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await SalesPrices_Service.Dropdown_Brand();
    };

    $scope.getData_Category = function (val) {
        return Inventory_Service.Dropdown_Category2(val);
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let priceGroup = $scope.filters.PriceGroup.Value;
        if (priceGroup && typeof priceGroup === 'string' && priceGroup.indexOf('(') >= 0) priceGroup = '';
        $scope.selectedPriceGroup = priceGroup;

        let currency = $scope.filters.Currency.Value;
        if (currency && typeof currency === 'string' && currency.indexOf('(') >= 0) currency = '';
        $scope.selectedCurrency = currency;

        let brand = $scope.filters.Brand.Value;
        if (brand && typeof brand === 'string' && brand.indexOf('(') >= 0) brand = '';
        $scope.selectedBrand = brand;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedCategory = $scope.filters['selectedCategory'];
            delete $scope.filters['selectedCategory'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_PriceGroup(),
            $scope.getData_Currency(),
            $scope.getData_Brand()
        ]);

        $rootScope.LoadFilterState('SalesPrices', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.saveData = async function () {
        // Implementation for save
    };

    $scope.downloadSchema = async function () {
        // Implementation for download schema
    };

    $scope.uploadData = async function () {
        // Implementation for upload
    };

    $scope.exportList = async function () {
        // Implementation for export
    };

    $scope.initialize_Page();
});