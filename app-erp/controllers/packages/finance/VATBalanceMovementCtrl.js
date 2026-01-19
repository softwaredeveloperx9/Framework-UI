angular.module('app.erp').controller('VATBalanceMovementCtrl', function ($rootScope, $scope, Utility_ERP, VATBalanceMovement_Service, Inventory_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        ItemCode: { PropertyName: 'ItemCode', Operator: '=', Value: '' },
    };

    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedItemCode = '';

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = VATBalanceMovement_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Date', 'Date', 'Date', 'Date', true],
            ['Item Code', 'ItemCode', 'ItemCode', 'Text', true],
            ['Item Name', 'ItemName', 'ItemName', 'Text', true],
            ['VAT Nr.', 'VATNr', 'VATNr', 'Text', true],
            ['B/R Issuer', 'BRIssuer', 'BRIssuer', 'Text', true],
            ['B/R Subject', 'BRSubject', 'BRSubject', 'Text', true],
            ['In', 'In', 'In', 'Currency', true],
            ['Out', 'Out', 'Out', 'Currency', true],
            ['Balance', 'Balance', 'Balance', 'Currency', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedItemCode'] = $scope.selectedItemCode;

        $rootScope.SaveFilterState('VATBalanceMovement', $scope);

        delete $scope.filters['selectedItemCode'];
    };

    $scope.getData_InventoryItem = function (val) {
        return Inventory_Service.Dropdown_InventoryItem(val);
    };

    ;

    async function Override_some_Filters() {
        if ($scope.LoadFilterState_) {
            $scope.selectedItemCode = $scope.filters['selectedItemCode'];
            delete $scope.filters['selectedItemCode'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('VATBalanceMovement', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.printForm = async function () {
        // Print implementation
    };

    $scope.initialize_Page();
});