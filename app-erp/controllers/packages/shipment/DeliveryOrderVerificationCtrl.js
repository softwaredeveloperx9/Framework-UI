angular.module('app.erp').controller('DeliveryOrderVerificationCtrl', function ($rootScope, $scope, Utility_ERP, DeliveryOrderVerification_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        DeliveredDate_date: { PropertyName: 'DeliveredDate', Operator: '=', Value: '' },
        PickerCarrierNr: { PropertyName: 'PickerCarrierNr', Operator: '=', Value: '' },
        PickedBy: { PropertyName: 'PickedBy', Operator: '=', Value: '' },
        Attachment: { PropertyName: 'Attachment', Operator: '=', Value: null },
        PostponedDate_date: { PropertyName: 'PostponedDate', Operator: '=', Value: '' },
    };

    $scope.selectedDeliveredDate = '';
    $scope.selectedPickedBy = '';
    $scope.selectedPostponedDate = '';

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = DeliveryOrderVerification_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item Code', 'ItemCode', 'ItemCode', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Qty', 'Qty', 'Qty', 'Number', true],
            ['Uom', 'Uom', 'Uom', 'Text', true],
            ['Qty', 'Qty2', 'Qty2', 'Number', true],
            ['Uom', 'Uom2', 'Uom2', 'Text', true],
            ['Qty', 'Qty3', 'Qty3', 'Number', true],
            ['Uom', 'Uom3', 'Uom3', 'Text', true],
            ['Action', 'Action', 'Action', 'Text', true],
            ['Notes', 'Notes', 'Notes', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        $scope.filters.DeliveredDate_date.Value = $rootScope.Date_to_DB($scope.selectedDeliveredDate);
        $scope.filters.PostponedDate_date.Value = $rootScope.Date_to_DB($scope.selectedPostponedDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedPickedBy'] = $scope.selectedPickedBy;

        $rootScope.SaveFilterState('DeliveryOrderVerification', $scope);

        delete $scope.filters['selectedPickedBy'];
    };

    $scope.getData_Employee = async function (val) {
        return await $rootScope.getData_Employee(val, $scope);
    };

    ;

    async function Override_some_Filters() {
        if ($scope.LoadFilterState_) {
            $scope.selectedPickedBy = $scope.filters['selectedPickedBy'];
            delete $scope.filters['selectedPickedBy'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('DeliveryOrderVerification', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.verifyDO = async function () {
        // Implementation for Verify D/O
    };

    $scope.initialize_Page();
});