angular.module('app.erp').controller('TaxListCtrl', function ($rootScope, $scope, Utility_ERP, TaxList_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 10;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];
    $scope.statusOptions = [
        { Value: null, Text: 'All' },
        { Value: true, Text: 'Active' },
        { Value: false, Text: 'Inactive' },
    ];
    $scope.taxTypeOptions = [
        { Value: null, Text: 'All' },
        { Value: 'VAT', Text: 'VAT' },
        { Value: 'PPH', Text: 'PPH' },
        { Value: 'PPN', Text: 'PPN' },
    ];
    $scope.taxCategoryOptions = [
        { Value: null, Text: 'All' },
        { Value: 'Sales', Text: 'Sales' },
        { Value: 'Purchase', Text: 'Purchase' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        TaxType: { PropertyName: 'TaxType', Operator: '=', Value: null },
        TaxCategory: { PropertyName: 'TaxCategory', Operator: '=', Value: null },
        Status: { PropertyName: 'Status', Operator: '=', Value: null },
    };

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = TaxList_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Tax Code', 'TaxCode', 'TaxCode', 'Text', true],
            ['Tax Name', 'TaxName', 'TaxName', 'Text', true],
            ['Tax Type', 'TaxType', 'TaxType', 'Text', true],
            ['Tax Category', 'TaxCategory', 'TaxCategory', 'Text', true],
            ['Tax Rate (%)', 'TaxRate', 'TaxRate', 'Number', true],
            ['Status', 'Status', 'Status', 'Status', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.SaveFilterState('TaxList', $scope);

        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);
    };

    async function Override_some_Filters() { }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('TaxList', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});