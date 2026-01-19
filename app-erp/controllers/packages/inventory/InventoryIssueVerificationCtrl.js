angular.module('app.erp').controller('InventoryIssueVerificationCtrl', function ($rootScope, $scope, Utility_ERP, InventoryIssueVerification_Service, BusinessRelation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        ReceivedDate_date: { PropertyName: 'ReceivedDate', Operator: '=', Value: '' },
        Receiver: { PropertyName: 'ReceiverID', Operator: '=', Value: '' },
    };

    $scope.selectedReceivedDate = $rootScope.Date_to_UI(new Date());
    $scope.selectedReceiver = '';

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = InventoryIssueVerification_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item Code', 'ItemCode', 'ItemCode', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Qty', 'Qty', 'Qty', 'Number', true],
            ['Uom', 'Uom', 'Uom', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        $scope.filters.ReceivedDate_date.Value = $rootScope.Date_to_DB($scope.selectedReceivedDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedReceiver'] = $scope.selectedReceiver;

        $rootScope.SaveFilterState('InventoryIssueVerification', $scope);

        delete $scope.filters['selectedReceiver'];
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.receiverSelected = async function (flag = true) {
        if (flag) {
            $scope.showData();
        }
    };

    ;

    async function Override_some_Filters() {
        if ($scope.LoadFilterState_) {
            $scope.selectedReceiver = $scope.filters['selectedReceiver'];
            delete $scope.filters['selectedReceiver'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('InventoryIssueVerification', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.verifyClick = async function () {
        // Implement verify logic here
    };

    $scope.initialize_Page();
});