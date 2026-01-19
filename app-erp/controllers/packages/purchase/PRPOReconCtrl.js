angular.module('app.erp').controller('PRPOReconCtrl', function ($rootScope, $scope, Utility_ERP, PRPORecon_Service, BusinessRelation_Service) {
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
        Warehouse: { PropertyName: 'WarehouseCode', Operator: 'in', Value: '' },
        Type: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
        ReasonNr: { PropertyName: 'ReasonNumber', Operator: 'contains', Value: '' },
        HideHiddenPR: { PropertyName: 'HideHiddenPR', Operator: '=', Value: null },
        Consignee: { PropertyName: 'ConsigneeID', Operator: '=', Value: '' },
        Brand: { PropertyName: 'BrandCode', Operator: 'in', Value: '' },
        Supplier: { PropertyName: 'SupplierID', Operator: '=', Value: '' },
        PONr: { PropertyName: 'PONumber', Operator: 'contains', Value: '' },
        ShowNonPROnly: { PropertyName: 'ShowNonPROnly', Operator: '=', Value: null },
        PRequestNr: { PropertyName: 'PurchaseRequestNumber', Operator: 'contains', Value: '' },
    };

    $scope.selectedWarehouse = '';
    $scope.selectedType = '';
    $scope.selectedConsignee = '';
    $scope.selectedBrand = '';
    $scope.selectedSupplier = '';

    $scope.data_EmployeeWarehouseAccess = [];
    $scope.data_Type = [];
    $scope.data_Brand = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PRPORecon_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Warehouse', 'Warehouse', 'Warehouse', 'Text', true],
            ['Supplier', 'Supplier', 'Supplier', 'Text', true],
            ['PO Nr.', 'PONr', 'PONr', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Open Qty', 'OpenQty', 'OpenQty', 'Number', true],
            ['Uom', 'Uom', 'Uom', 'Text', true],
            ['On Demand', 'OnDemand', 'OnDemand', 'Boolean', true],
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

        if (!$scope.selectedType) {
            $scope.filters.Type.Operator = 'in';
            $scope.filters.Type.Value = Utility_ERP.Value_OperatorIN_($scope.data_Type, 'Code');
        } else {
            $scope.filters.Type.Operator = '=';
            $scope.filters.Type.Value = $scope.selectedType;
        }

        if (!$scope.selectedBrand) {
            $scope.filters.Brand.Operator = 'in';
            $scope.filters.Brand.Value = Utility_ERP.Value_OperatorIN_($scope.data_Brand, 'Code');
        } else {
            $scope.filters.Brand.Operator = '=';
            $scope.filters.Brand.Value = $scope.selectedBrand;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedConsignee'] = $scope.selectedConsignee;
        $scope.filters['selectedSupplier'] = $scope.selectedSupplier;

        $rootScope.SaveFilterState('PRPORecon', $scope);

        delete $scope.filters['selectedConsignee'];
        delete $scope.filters['selectedSupplier'];
    };

    $scope.getData_Consignee = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.consigneeSelected = async function (flag = true) {
        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_Supplier = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.supplierSelected = async function (flag = true) {
        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_Type = async function () {
        $scope.data_Type = await PRPORecon_Service.Dropdown_Type();
    };

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await PRPORecon_Service.Dropdown_Brand();
    };

    

    async function Override_some_Filters() {
        let warehouse = $scope.filters.Warehouse.Value;
        if (warehouse && typeof warehouse === 'string' && warehouse.indexOf('(') >= 0) warehouse = '';
        $scope.selectedWarehouse = warehouse;

        let type = $scope.filters.Type.Value;
        if (type && typeof type === 'string' && type.indexOf('(') >= 0) type = '';
        $scope.selectedType = type;

        let brand = $scope.filters.Brand.Value;
        if (brand && typeof brand === 'string' && brand.indexOf('(') >= 0) brand = '';
        $scope.selectedBrand = brand;

        if ($scope.LoadFilterState_) {
            $scope.selectedConsignee = $scope.filters['selectedConsignee'];
            delete $scope.filters['selectedConsignee'];

            $scope.selectedSupplier = $scope.filters['selectedSupplier'];
            delete $scope.filters['selectedSupplier'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeWarehouseAccess($scope, ''),
            $scope.getData_Type(),
            $scope.getData_Brand()
        ]);

        $rootScope.LoadFilterState('PRPORecon', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.linkPRPO = async function () { }

    $scope.hidePR = async function () { }

    $scope.reevaluatePR = async function () { }

    $scope.unlinkPRPO = async function () { }

    $scope.initialize_Page();
});