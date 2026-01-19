angular.module('app.erp').controller('ReceivedItemListCtrl', function ($rootScope, $scope, Utility_ERP, ReceivedItemList_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        SourceType: { PropertyName: 'SourceType', Operator: 'in', Value: '' },
    };

    $scope.selectedSourceType = '';

    $scope.data_SourceType = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = ReceivedItemList_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Receipt #', 'Receipt', 'Receipt', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Warehouse', 'Warehouse', 'Warehouse', 'Text', true],
            ['Supplier', 'Supplier', 'Supplier', 'Text', true],
            ['Consignee', 'Consignee', 'Consignee', 'Text', true],
            ['Source Type', 'SourceType', 'SourceType', 'Text', true],
            ['DO#', 'DO', 'DO', 'Text', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Numeric', true],
            ['Notes', 'Notes', 'Notes', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedSourceType) {
            $scope.filters.SourceType.Operator = 'in';
            $scope.filters.SourceType.Value = Utility_ERP.Value_OperatorIN_($scope.data_SourceType, 'Code');
        } else {
            $scope.filters.SourceType.Operator = '=';
            $scope.filters.SourceType.Value = $scope.selectedSourceType;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('ReceivedItemList', $scope);
    };

    $scope.getData_SourceType = async function () {
        $scope.data_SourceType = await ReceivedItemList_Service.Dropdown_SourceType();
    };

    ;

    async function Override_some_Filters() {
        let sourceType = $scope.filters.SourceType.Value;
        if (sourceType && typeof sourceType === 'string' && sourceType.indexOf('(') >= 0) sourceType = '';
        $scope.selectedSourceType = sourceType;
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_SourceType()
        ]);

        $rootScope.LoadFilterState('ReceivedItemList', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.addSelectedReceipts = async function () {
        // Add selected receipts implementation
    };

    $scope.closeForm = function () {
        // Close form implementation
        window.history.back();
    };

    $scope.viewReceipt = function (row) {
        // View receipt implementation
    };

    $scope.initialize_Page();
});