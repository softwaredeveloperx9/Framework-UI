angular.module('app.erp').controller('DeliveredClosedDoSelectionCtrl', function ($rootScope, $scope, Utility_ERP, DeliveredClosedDoSelection_Service) {
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
        $scope.dt = DeliveredClosedDoSelection_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Shipment #', 'ShipmentNo', 'ShipmentNo', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Warehouse', 'Warehouse', 'Warehouse', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Source Type', 'SourceType', 'SourceType', 'Text', true],
            ['Source Nr.', 'SourceNr', 'SourceNr', 'Text', true],
            ['Consignee', 'Consignee', 'Consignee', 'Text', true],
            ['Delivered Date', 'DeliveredDate', 'DeliveredDate', 'Date', true],
            ['Status', 'Status', 'Status', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('DeliveredClosedDoSelection', $scope);
    };

    ;

    async function Override_some_Filters() {
        // No additional filters to override for this page
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('DeliveredClosedDoSelection', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.addSelection = async function () {
        // Implementation for Add action
    };

    $scope.initialize_Page();
});