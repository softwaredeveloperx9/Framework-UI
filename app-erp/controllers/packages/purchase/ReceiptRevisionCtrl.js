angular.module('app.erp').controller('ReceiptRevisionCtrl', function ($rootScope, $scope, Utility_ERP, ReceiptRevision_Service) {
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
        $scope.dt = ReceiptRevision_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item Code', 'ItemCode', 'ItemCode', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Verified Qty', 'VerifiedQty', 'VerifiedQty', 'Number', true],
            ['Revised Qty', 'RevisedQty', 'RevisedQty', 'Number', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('ReceiptRevision', $scope);
    };

    ;

    async function Override_some_Filters() {
        // No special filter overrides needed for this simple page
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('ReceiptRevision', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.verifyRevision = async function () {
        // Implementation for Verify Revision
    };

    $scope.initialize_Page();
});