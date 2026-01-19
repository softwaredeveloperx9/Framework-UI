angular.module('app.erp').controller('SalesPromoCtrl', function ($rootScope, $scope, Utility_ERP, SalesPromo_Service, Inventory_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Brand: { PropertyName: 'BrandCode', Operator: 'in', Value: '' },
        Type: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'ValidFrom', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'ValidThru', Operator: '<=', Value: '' },
        Status: { PropertyName: 'StatusCode', Operator: 'in', Value: '' },
    };

    $scope.selectedBrand = '';
    $scope.selectedType = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedStatus = '';

    $scope.data_Brand = [];
    $scope.data_Type = [];
    $scope.data_Status = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = SalesPromo_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Brand', 'Brand', 'Brand', 'Text', true],
            ['Type', 'Type', 'Type', 'Text', true],
            ['Name', 'Name', 'Name', 'Text', true],
            ['Valid Form', 'ValidForm', 'ValidForm', 'Date', true],
            ['Valid Thru', 'ValidThru', 'ValidThru', 'Date', true],
            ['Status', 'Status', 'Status', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedBrand) {
            $scope.filters.Brand.Operator = 'in';
            $scope.filters.Brand.Value = Utility_ERP.Value_OperatorIN_($scope.data_Brand, 'Code');
        } else {
            $scope.filters.Brand.Operator = '=';
            $scope.filters.Brand.Value = $scope.selectedBrand;
        }

        if (!$scope.selectedType) {
            $scope.filters.Type.Operator = 'in';
            $scope.filters.Type.Value = Utility_ERP.Value_OperatorIN_($scope.data_Type, 'Code');
        } else {
            $scope.filters.Type.Operator = '=';
            $scope.filters.Type.Value = $scope.selectedType;
        }

        if (!$scope.selectedStatus) {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN_($scope.data_Status, 'Code');
        } else {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('SalesPromo', $scope);
    };

    $scope.getData_Brand = async function () {
        $scope.data_Brand = await Inventory_Service.Dropdown_Brand();
    };

    $scope.getData_Type = async function () {
        $scope.data_Type = await SalesPromo_Service.Dropdown_Type();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status = await SalesPromo_Service.Dropdown_Status();
    };

    ;

    async function Override_some_Filters() {
        let brand = $scope.filters.Brand.Value;
        if (brand && typeof brand === 'string' && brand.indexOf('(') >= 0) brand = '';
        $scope.selectedBrand = brand;

        let type = $scope.filters.Type.Value;
        if (type && typeof type === 'string' && type.indexOf('(') >= 0) type = '';
        $scope.selectedType = type;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_Brand(),
            $scope.getData_Type(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('SalesPromo', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.reconcile = async function () { };

    $scope.upload = async function () { };

    $scope.exportList = async function () { };

    $scope.initialize_Page();
});