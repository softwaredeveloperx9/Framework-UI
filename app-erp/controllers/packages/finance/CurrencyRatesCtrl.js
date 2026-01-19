angular.module('app.erp').controller('CurrencyRatesCtrl', function ($rootScope, $scope, Utility_ERP, CurrencyRates_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.periodOptions = [
        { Value: null, Text: 'All' },
        { Value: 'Daily', Text: 'Daily' },
        { Value: 'Weekly', Text: 'Weekly' },
        { Value: 'Monthly', Text: 'Monthly' },
        { Value: 'Yearly', Text: 'Yearly' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        RateType: { PropertyName: 'RateTypeCode', Operator: 'in', Value: '' },
        Period: { PropertyName: 'Period', Operator: '=', Value: null },
        BaseCurrency: { PropertyName: 'BaseCurrencyCode', Operator: 'in', Value: '' },
        ComparerCurrency: { PropertyName: 'ComparerCurrencyCode', Operator: 'in', Value: '' },
    };

    $scope.selectedRateType = '';
    $scope.selectedBaseCurrency = '';
    $scope.selectedComparerCurrency = '';

    $scope.data_RateType = [];
    $scope.data_Currency = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = CurrencyRates_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Date', 'Date', 'Date', 'Date', true],
            ['To Currency#', 'ToCurrency', 'ToCurrency', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Rate', 'Rate', 'Rate', 'Number', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedRateType) {
            $scope.filters.RateType.Operator = 'in';
            $scope.filters.RateType.Value = Utility_ERP.Value_OperatorIN_($scope.data_RateType, 'Code');
        } else {
            $scope.filters.RateType.Operator = '=';
            $scope.filters.RateType.Value = $scope.selectedRateType;
        }

        if (!$scope.selectedBaseCurrency) {
            $scope.filters.BaseCurrency.Operator = 'in';
            $scope.filters.BaseCurrency.Value = Utility_ERP.Value_OperatorIN_($scope.data_Currency, 'Code');
        } else {
            $scope.filters.BaseCurrency.Operator = '=';
            $scope.filters.BaseCurrency.Value = $scope.selectedBaseCurrency;
        }

        if (!$scope.selectedComparerCurrency) {
            $scope.filters.ComparerCurrency.Operator = 'in';
            $scope.filters.ComparerCurrency.Value = Utility_ERP.Value_OperatorIN_($scope.data_Currency, 'Code');
        } else {
            $scope.filters.ComparerCurrency.Operator = '=';
            $scope.filters.ComparerCurrency.Value = $scope.selectedComparerCurrency;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('CurrencyRates', $scope);
    };

    $scope.getData_RateType = async function () {
        $scope.data_RateType = await CurrencyRates_Service.Dropdown_RateType();
    };

    $scope.getData_Currency = async function () {
        $scope.data_Currency = await CurrencyRates_Service.Dropdown_Currency();
    };

    ;

    async function Override_some_Filters() {
        let rateType = $scope.filters.RateType.Value;
        if (rateType && typeof rateType === 'string' && rateType.indexOf('(') >= 0) rateType = '';
        $scope.selectedRateType = rateType;

        let baseCurrency = $scope.filters.BaseCurrency.Value;
        if (baseCurrency && typeof baseCurrency === 'string' && baseCurrency.indexOf('(') >= 0) baseCurrency = '';
        $scope.selectedBaseCurrency = baseCurrency;

        let comparerCurrency = $scope.filters.ComparerCurrency.Value;
        if (comparerCurrency && typeof comparerCurrency === 'string' && comparerCurrency.indexOf('(') >= 0) comparerCurrency = '';
        $scope.selectedComparerCurrency = comparerCurrency;
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_RateType(),
            $scope.getData_Currency()
        ]);

        $rootScope.LoadFilterState('CurrencyRates', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.saveData = async function () {
        // TODO: Implement save functionality
    };

    $scope.exportToExcel = async function () {
        // TODO: Implement export to excel functionality
    };

    $scope.initialize_Page();
});