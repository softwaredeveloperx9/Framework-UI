angular.module('app.erp').controller('SalesOrderTypeCtrl', function ($rootScope, $scope, Utility_ERP, SalesOrderType_Service) {
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
        $scope.dt = SalesOrderType_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Description', 'Name', 'Name', 'Text', true],
            ['Active', 'Active', 'Active', 'Boolean', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('Sales_Order_Type', $scope);
    };

    ;

    async function Override_some_Filters() {
        // No special overrides needed for this simple filter
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('Sales_Order_Type', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.activateClick = async function () {
        let selectedRows = $scope.dt.data.filter(function (e) {
            return e.rowSelected == true;
        });

        if (selectedRows.length == 0) {
            $rootScope.Alert_NoRowSelected();
            return;
        }

        let codes = selectedRows.map(function (e) {
            return e.Code;
        });

        let confirm = await $rootScope.Confirm_('Activate selected items?');
        if (!confirm) return;

        Utility_ERP.Still_Processing($scope, true);

        let result = await SalesOrderType_Service.Activate(codes);

        Utility_ERP.Still_Processing($scope, false);

        if (result.Success) {
            $rootScope.Alert_Success('Data activated successfully');
            await $scope.showData();
        } else {
            $rootScope.Alert_Error(result.Message);
        }
    };

    $scope.deactivateClick = async function () {
        let selectedRows = $scope.dt.data.filter(function (e) {
            return e.rowSelected == true;
        });

        if (selectedRows.length == 0) {
            $rootScope.Alert_NoRowSelected();
            return;
        }

        let codes = selectedRows.map(function (e) {
            return e.Code;
        });

        let confirm = await $rootScope.Confirm_('Deactivate selected items?');
        if (!confirm) return;

        Utility_ERP.Still_Processing($scope, true);

        let result = await SalesOrderType_Service.Deactivate(codes);

        Utility_ERP.Still_Processing($scope, false);

        if (result.Success) {
            $rootScope.Alert_Success('Data deactivated successfully');
            await $scope.showData();
        } else {
            $rootScope.Alert_Error(result.Message);
        }
    };

    $scope.exportList = async function () {
        Utility_ERP.Still_Processing($scope, true);

        let result = await SalesOrderType_Service.ExportToExcel($scope.filters);

        Utility_ERP.Still_Processing($scope, false);

        if (result.Success) {
            $rootScope.DownloadFile(result.Data, 'SalesOrderType.xlsx');
        } else {
            $rootScope.Alert_Error(result.Message);
        }
    };

    $scope.importData = async function () {
        $rootScope.ShowImportDialog('SalesOrderType', async function () {
            await $scope.showData();
        });
    };

    $scope.initialize_Page();
});