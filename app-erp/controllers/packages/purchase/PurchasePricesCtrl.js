angular.module('app.erp').controller('PurchasePricesCtrl', function ($rootScope, $scope, Utility_ERP, PurchasePrices_Service, BusinessRelation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.activeOptions = [
        { Value: null, Text: 'All' },
        { Value: true, Text: 'Yes' },
        { Value: false, Text: 'No' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Brand: { PropertyName: 'BrandCode', Operator: 'in', Value: '' },
        Supplier: { PropertyName: 'SupplierID', Operator: '=', Value: '' },
        Category: { PropertyName: 'CategoryCode', Operator: 'in', Value: '' },
        Currency: { PropertyName: 'CurrencyCode', Operator: 'in', Value: '' },
        EffectiveDate_date: { PropertyName: 'EffectiveDate', Operator: '=', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedBrand = '';
    $scope.selectedSupplier = '';
    $scope.selectedCategory = '';
    $scope.selectedCurrency = '';
    $scope.selectedEffectiveDate = $rootScope.Date_to_UI(new Date());

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Brand = [];
    $scope.data_Category = [];
    $scope.data_Currency = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PurchasePrices_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item #', 'ItemNumber', 'ItemNumber', 'Text', true],
            ['Category', 'Category', 'Category', 'Text', true],
            ['Brand', 'Brand', 'Brand', 'Text', true],
            ['Profile', 'Profile', 'Profile', 'Text', true],
            ['Name', 'Name', 'Name', 'Text', true],
            ['Purchase Uom', 'PurchaseUom', 'PurchaseUom', 'Text', true],
            ['Current Price', 'CurrentPrice', 'CurrentPrice', 'Currency', true],
            ['Valid From', 'ValidFrom', 'ValidFrom', 'Date', true],
            ['New Price', 'NewPrice', 'NewPrice', 'Currency', true],
            ['Inc Tax', 'IncTax', 'IncTax', 'Boolean', true],
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

        if (!$scope.selectedCurrency) {
            $scope.filters.Currency.Operator = 'in';
            $scope.filters.Currency.Value = Utility_ERP.Value_OperatorIN_($scope.data_Currency, 'Code');
        } else {
            $scope.filters.Currency.Operator = '=';
            $scope.filters.Currency.Value = $scope.selectedCurrency;
        }

        $scope.filters.EffectiveDate_date.Value = $rootScope.Date_to_DB($scope.selectedEffectiveDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedSupplier'] = $scope.selectedSupplier;

        $rootScope.SaveFilterState('PurchasePrices', $scope);

        delete $scope.filters['selectedSupplier'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Supplier = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.supplierSelected = async function (flag = true) {
        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await PurchasePrices_Service.Dropdown_Brand();
    };

    $scope.getData_Category = async function () {
        $scope.data_Category = await PurchasePrices_Service.Dropdown_Category();
    };

    $scope.getData_Currency = async function () {
        $scope.data_Currency = await PurchasePrices_Service.Dropdown_Currency();
    };

    

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let brand = $scope.filters.Brand.Value;
        if (brand && typeof brand === 'string' && brand.indexOf('(') >= 0) brand = '';
        $scope.selectedBrand = brand;

        let category = $scope.filters.Category.Value;
        if (category && typeof category === 'string' && category.indexOf('(') >= 0) category = '';
        $scope.selectedCategory = category;

        let currency = $scope.filters.Currency.Value;
        if (currency && typeof currency === 'string' && currency.indexOf('(') >= 0) currency = '';
        $scope.selectedCurrency = currency;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedSupplier = $scope.filters['selectedSupplier'];
            delete $scope.filters['selectedSupplier'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Brand(),
            $scope.getData_Category(),
            $scope.getData_Currency()
        ]);

        $rootScope.LoadFilterState('PurchasePrices', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.savePrices = async function () { }

    $scope.downloadSchema = async function () { }

    $scope.uploadPrices = async function () { }

    $scope.initialize_Page();
});