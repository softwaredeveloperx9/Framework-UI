angular.module('app.erp').controller('PickerPersonnelsCtrl', function ($rootScope, $scope, Utility_ERP, PickerPersonnels_Service) {
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Warehouse: { PropertyName: 'WarehouseCode', Operator: '=', Value: '' },
    };

    $scope.selectedWarehouse = '';

    $scope.data_Warehouse = [];

    $scope.CreateTable = function () {
        $scope.dt = PickerPersonnels_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Personnel', 'PersonnelName', 'PersonnelName', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedWarehouse) {
            $scope.dt.data = [];
            $scope.dt.totalRows = 0;
            return;
        }

        $scope.filters.Warehouse.Value = $scope.selectedWarehouse;

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('PickerPersonnels', $scope);
    };

    $scope.getData_Warehouse = async function () {
        $scope.data_Warehouse = await PickerPersonnels_Service.Dropdown_Warehouse();
    };

    

    async function Override_some_Filters() {
        let warehouse = $scope.filters.Warehouse.Value;

        if ($scope.LoadFilterState_) {
            $scope.selectedWarehouse = warehouse;
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_Warehouse()
        ]);

        $rootScope.LoadFilterState('PickerPersonnels', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        if ($scope.selectedWarehouse) {
            $scope.showData();
        } else {
            Utility_ERP.Still_Processing($scope, false);
        }
    };

    $scope.saveData = async function () {
        if (!$scope.selectedWarehouse) {
            $rootScope.showMessage('Please select a warehouse first', 'warning');
            return;
        }

        // Save logic will be implemented here
        $rootScope.showMessage('Save functionality to be implemented', 'info');
    };

    $scope.initialize_Page();
});
