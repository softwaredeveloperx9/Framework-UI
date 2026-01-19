angular.module('app.erp').controller('FinancialPeriodsCtrl', function ($rootScope, $scope, Utility_ERP, FinancialPeriods_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.yearOptions = [];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Year: { PropertyName: 'Year', Operator: '=', Value: null },
    };

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = FinancialPeriods_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('FinancialPeriods', $scope);
    };

    $scope.generateYearOptions = function () {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 5;
        const endYear = currentYear + 5;

        $scope.yearOptions = [{ Value: null, Text: 'All' }];

        for (let year = endYear; year >= startYear; year--) {
            $scope.yearOptions.push({ Value: year, Text: year.toString() });
        }
    };

    ;

    async function Override_some_Filters() {
        // No additional filter overrides needed for this page
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $scope.generateYearOptions();

        $rootScope.LoadFilterState('FinancialPeriods', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.newYear = async function () {
        // TODO: Implement new year functionality
    };

    $scope.initialize_Page();
});