angular.module('app.erp').controller('DOReconciliationCtrl', function ($rootScope, $scope, Utility_ERP, DOReconciliation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Warehouse: { PropertyName: 'WarehouseCode', Operator: 'in', Value: '' },
        DeliveredDO: { PropertyName: 'DeliveredDO', Operator: 'contains', Value: '' },
        ReconciledDO: { PropertyName: 'ReconciledDO', Operator: 'contains', Value: '' },
        VerifiedDate_date: { PropertyName: 'VerifiedDate', Operator: '=', Value: '' },
        PhysicalOnHand: { PropertyName: 'PhysicalOnHand', Operator: 'contains', Value: '' },
        Discrepancy: { PropertyName: 'Discrepancy', Operator: 'contains', Value: '' },
        UnreconciledDO: { PropertyName: 'UnreconciledDO', Operator: 'contains', Value: '' },
        ShowUnreconciledOnly: { PropertyName: 'IsReconciled', Operator: '=', Value: null },
    };

    $scope.selectedWarehouse = '';
    $scope.selectedVerifiedDate = '';
    $scope.selectedShowUnreconciledOnly = false;

    $scope.data_EmployeeWarehouseAccess = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = DOReconciliation_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Shipment#', 'Shipment', 'Shipment', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Warehouse', 'Warehouse', 'Warehouse', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Reason Type', 'ReasonType', 'ReasonType', 'Text', true],
            ['Reason Nr.', 'ReasonNr', 'ReasonNr', 'Text', true],
            ['Consignee', 'Consignee', 'Consignee', 'Text', true],
            ['Manifest Nr.', 'ManifestNr', 'ManifestNr', 'Text', true],
            ['Receiver', 'Receiver', 'Receiver', 'Text', true],
            ['Verified Date', 'VerifiedDate', 'VerifiedDate', 'Date', true],
            ['Verified By', 'VerifiedBy', 'VerifiedBy', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
            ['Attachment', 'Attachment', 'Attachment', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedWarehouse) {
            $scope.filters.Warehouse.Operator = 'in';
            $scope.filters.Warehouse.Value = Utility_ERP.Value_OperatorIN_($scope.data_EmployeeWarehouseAccess, 'Code');
        } else {
            $scope.filters.Warehouse.Operator = '=';
            $scope.filters.Warehouse.Value = $scope.selectedWarehouse;
        }

        $scope.filters.VerifiedDate_date.Value = $rootScope.Date_to_DB($scope.selectedVerifiedDate);

        $scope.filters.ShowUnreconciledOnly.Value = null;
        if ($scope.selectedShowUnreconciledOnly) {
            $scope.filters.ShowUnreconciledOnly.Value = false;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedShowUnreconciledOnly'] = $scope.selectedShowUnreconciledOnly;

        $rootScope.SaveFilterState('DOReconciliation', $scope);

        delete $scope.filters['selectedShowUnreconciledOnly'];
    };

    

    async function Override_some_Filters() {
        let warehouse = $scope.filters.Warehouse.Value;
        if (warehouse && typeof warehouse === 'string' && warehouse.indexOf('(') >= 0) warehouse = '';
        $scope.selectedWarehouse = warehouse;

        if ($scope.LoadFilterState_) {
            $scope.selectedShowUnreconciledOnly = $scope.filters['selectedShowUnreconciledOnly'];
            delete $scope.filters['selectedShowUnreconciledOnly'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeWarehouseAccess($scope, '')
        ]);

        $rootScope.LoadFilterState('DOReconciliation', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.reconcile = async function () { }

    $scope.unReconcile = async function () { }

    $scope.initialize_Page();
});