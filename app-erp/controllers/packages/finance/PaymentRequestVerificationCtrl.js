angular.module('app.erp').controller('PaymentRequestVerificationCtrl', function ($rootScope, $scope, Utility_ERP, PaymentRequestVerification_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        PaymentDate_date: { PropertyName: 'PaymentDate', Operator: '=', Value: '' },
    };

    $scope.selectedPaymentDate = '';

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PaymentRequestVerification_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Request #', 'Request', 'Request', 'Text', true],
            ['Reason Type', 'ReasonType', 'ReasonType', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Amount', 'Amount', 'Amount', 'Numeric', true],
            ['Required Date', 'RequiredDate', 'RequiredDate', 'Date', true],
            ['Pay From', 'PayFrom', 'PayFrom', 'Text', true],
            ['Payment Method', 'PaymentMethod', 'PaymentMethod', 'Text', true],
            ['Notes', 'Notes', 'Notes', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        $scope.filters.PaymentDate_date.Value = $rootScope.Date_to_DB($scope.selectedPaymentDate);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('PaymentRequestVerification', $scope);
    };

    ;

    async function Override_some_Filters() {
        // No override needed for simple date filter
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('PaymentRequestVerification', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.verifyAdvanceRequest = async function () {
        // Implementasi verify advance request
        let selectedRows = $scope.dt.data.filter(function (row) {
            return row.rowSelected === true;
        });

        if (selectedRows.length === 0) {
            $rootScope.ShowNotification('warning', 'Please select at least one payment request to verify');
            return;
        }

        // Logic untuk verify advance request
        console.log('Verifying advance requests:', selectedRows);
    };

    $scope.closeForm = async function () {
        // Implementasi untuk menutup form
        window.history.back();
    };

    $scope.initialize_Page();
});