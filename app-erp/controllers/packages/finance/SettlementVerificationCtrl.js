angular.module('app.erp').controller('SettlementVerificationCtrl', function ($rootScope, $scope, Utility_ERP, SettlementVerification_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        VerifiedDate_date: { PropertyName: 'VerifiedDate', Operator: '=', Value: '' },
    };

    $scope.selectedVerifiedDate = $rootScope.Date_to_UI(new Date());

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = SettlementVerification_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Settlement #', 'SettlementNo', 'SettlementNo', 'Text', true],
            ['Request #', 'RequestNo', 'RequestNo', 'Text', true],
            ['Reason Type', 'ReasonType', 'ReasonType', 'Text', true],
            ['Requested By', 'RequestedBy', 'RequestedBy', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Requested Amount', 'RequestedAmount', 'RequestedAmount', 'Currency', true],
            ['Settlement Amount', 'SettlementAmount', 'SettlementAmount', 'Currency', true],
            ['Over/Short', 'OverShort', 'OverShort', 'Currency', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Pay From', 'PayFrom', 'PayFrom', 'Text', true],
            ['Payment Method', 'PaymentMethod', 'PaymentMethod', 'Text', true],
            ['Notes', 'Notes', 'Notes', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        $scope.filters.VerifiedDate_date.Value = $rootScope.Date_to_DB($scope.selectedVerifiedDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('SettlementVerification', $scope);
    };

    ;

    async function Override_some_Filters() {
        // No additional filter overrides needed for this simple case
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('SettlementVerification', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.verifyPaymentRequest = async function () {
        // Implementation for Verify Payment Request
    };

    $scope.initialize_Page();
});