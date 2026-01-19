angular.module('app.erp').controller('VATBalancesCtrl', function ($rootScope, $scope, Utility_ERP, VATBalances_Service) {
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
        Profile: { PropertyName: 'ProfileCode', Operator: 'in', Value: '' },
        Brand: { PropertyName: 'BrandCode', Operator: 'in', Value: '' },
        Category: { PropertyName: 'CategoryCode', Operator: 'in', Value: '' },
        Year: { PropertyName: 'Year', Operator: 'in', Value: '' },
        Period: { PropertyName: 'Period', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedProfile = '';
    $scope.selectedBrand = '';
    $scope.selectedCategory = '';
    $scope.selectedYear = '';
    $scope.selectedPeriod = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Profile = [];
    $scope.data_Brand = [];
    $scope.data_Category = [];
    $scope.data_Year = [];
    $scope.data_Period = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = VATBalances_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item Code', 'ItemCode', 'ItemCode', 'Text', true],
            ['Item Name', 'ItemName', 'ItemName', 'Text', true],
            ['Brand', 'Brand', 'Brand', 'Text', true],
            ['Category', 'Category', 'Category', 'Text', true],
            ['Uom', 'Uom', 'Uom', 'Text', true],
            ['Opening Stock', 'OpeningStock', 'OpeningStock', 'Quantity', true],
            ['Opening Value', 'OpeningValue', 'OpeningValue', 'Currency', true],
            ['Stock In', 'StockIn', 'StockIn', 'Quantity', true],
            ['Value In', 'ValueIn', 'ValueIn', 'Currency', true],
            ['Stock Out', 'StockOut', 'StockOut', 'Quantity', true],
            ['Value Out', 'ValueOut', 'ValueOut', 'Currency', true],
            ['Ending Stock', 'EndingStock', 'EndingStock', 'Quantity', true],
            ['Ending Value', 'EndingValue', 'EndingValue', 'Currency', true],
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

        if (!$scope.selectedYear) {
            $scope.filters.Year.Operator = 'in';
            $scope.filters.Year.Value = Utility_ERP.Value_OperatorIN_($scope.data_Year, 'Code');
        } else {
            $scope.filters.Year.Operator = '=';
            $scope.filters.Year.Value = $scope.selectedYear;
        }

        if (!$scope.selectedPeriod) {
            $scope.filters.Period.Operator = 'in';
            $scope.filters.Period.Value = Utility_ERP.Value_OperatorIN_($scope.data_Period, 'Code');
        } else {
            $scope.filters.Period.Operator = '=';
            $scope.filters.Period.Value = $scope.selectedPeriod;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('VATBalances', $scope);
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Profile = async function () {
        $scope.data_Profile = await VATBalances_Service.Dropdown_Profile();
    };

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await VATBalances_Service.Dropdown_Brand();
    };

    $scope.getData_Category = async function () {
        $scope.data_Category = await VATBalances_Service.Dropdown_Category();
    };

    $scope.getData_Year = async function () {
        $scope.data_Year = await VATBalances_Service.Dropdown_Year();
    };

    $scope.getData_Period = async function () {
        $scope.data_Period = await VATBalances_Service.Dropdown_Period();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let profile = $scope.filters.Profile.Value;
        if (profile && typeof profile === 'string' && profile.indexOf('(') >= 0) profile = '';
        $scope.selectedProfile = profile;

        let brand = $scope.filters.Brand.Value;
        if (brand && typeof brand === 'string' && brand.indexOf('(') >= 0) brand = '';
        $scope.selectedBrand = brand;

        let category = $scope.filters.Category.Value;
        if (category && typeof category === 'string' && category.indexOf('(') >= 0) category = '';
        $scope.selectedCategory = category;

        let year = $scope.filters.Year.Value;
        if (year && typeof year === 'string' && year.indexOf('(') >= 0) year = '';
        $scope.selectedYear = year;

        let period = $scope.filters.Period.Value;
        if (period && typeof period === 'string' && period.indexOf('(') >= 0) period = '';
        $scope.selectedPeriod = period;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Profile(),
            $scope.getData_Brand(),
            $scope.getData_Category(),
            $scope.getData_Year(),
            $scope.getData_Period()
        ]);

        $rootScope.LoadFilterState('VATBalances', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.rePostCOGS = async function () {
        // Implementation for Re - Post COGS
    };

    $scope.initialize_Page();
});