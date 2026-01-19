angular.module('app.erp').controller('PickedOutstandingItemCtrl', function ($rootScope, $scope, Utility_ERP, PickedOutstandingItem_Service) {
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
        Active: { PropertyName: 'Active', Operator: '=', Value: null },
    };

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PickedOutstandingItem_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item', 'Item', 'Item', 'Text', true],
            ['SO #', 'SO', 'SO', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Customer', 'Customer', 'Customer', 'Text', true],
            ['Ship To', 'ShipTo', 'ShipTo', 'Text', true],
            ['Open', 'Open', 'Open', 'Number', true],
            ['Res', 'Res', 'Res', 'Number', true],
            ['Dem', 'Dem', 'Dem', 'Number', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('PickedOutstandingItem', $scope);
    };

    ;

    async function Override_some_Filters() {
        // No special filter overrides needed for this simple page
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('PickedOutstandingItem', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.unPickClick = async function () {
        // Implementation for Un Pick
    };

    $scope.createPurchaseOrder = async function () {
        // Implementation for Create Purchase Order
    };

    $scope.createItemTransfer = async function () {
        // Implementation for Create Item Transfer
    };

    $scope.initialize_Page();
});