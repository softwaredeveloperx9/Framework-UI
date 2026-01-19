angular.module('app.erp').controller('AssetsCtrl', function ($rootScope, $scope, Utility_ERP, Assets_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Type: { PropertyName: 'TypeCode', Operator: 'in', Value: '' },
        AcquisitionDateFrom_date: { PropertyName: 'AcquisitionDate', Operator: '>=', Value: '' },
        AcquisitionDateTo_date: { PropertyName: 'AcquisitionDate', Operator: '<=', Value: '' },
        DisposalDateFrom_date: { PropertyName: 'DisposalDate', Operator: '>=', Value: '' },
        DisposalDateTo_date: { PropertyName: 'DisposalDate', Operator: '<=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedType = '';
    $scope.selectedAcquisitionDateFrom = '';
    $scope.selectedAcquisitionDateTo = '';
    $scope.selectedDisposalDateFrom = '';
    $scope.selectedDisposalDateTo = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_Type = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = Assets_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Serial Number', 'SerialNumber', 'SerialNumber', 'Text', true],
            ['Type', 'Type', 'Type', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Name', 'Name', 'Name', 'Text', true],
            ['Acquisition Date', 'AcquisitionDate', 'AcquisitionDate', 'Date', true],
            ['Expected Disposal Date', 'ExpectedDisposalDate', 'ExpectedDisposalDate', 'Date', true],
            ['Salvage Value', 'SalvageValue', 'SalvageValue', 'Currency', true],
            ['Acq. Cost', 'AcqCost', 'AcqCost', 'Currency', true],
            ['Depreciated', 'Depreciated', 'Depreciated', 'Currency', true],
            ['Warrantied', 'Warrantied', 'Warrantied', 'Boolean', true],
            ['Warranty Exp. Date', 'WarrantyExpDate', 'WarrantyExpDate', 'Date', true],
            ['Status', 'Status', 'Status', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedBranch) {
            $scope.filters.Branch.Operator = 'in';
            $scope.filters.Branch.Value = Utility_ERP.Value_OperatorIN_($scope.data_EmployeeLocationAccess, 'Code');
        } else {
            $scope.filters.Branch.Operator = '=';
            $scope.filters.Branch.Value = $scope.selectedBranch;
        }

        if (!$scope.selectedType) {
            $scope.filters.Type.Operator = 'in';
            $scope.filters.Type.Value = Utility_ERP.Value_OperatorIN_($scope.data_Type, 'Code');
        } else {
            $scope.filters.Type.Operator = '=';
            $scope.filters.Type.Value = $scope.selectedType;
        }

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        $scope.filters.AcquisitionDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedAcquisitionDateFrom);
        $scope.filters.AcquisitionDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedAcquisitionDateTo);

        $scope.filters.DisposalDateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDisposalDateFrom);
        $scope.filters.DisposalDateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDisposalDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('Assets', $scope);

        delete $scope.filters['selectedShowAll'];
    };

    $scope.getData_Type = async function () {
        $scope.data_Type = await Assets_Service.Dropdown_Type();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('Asset');

        // prettier-ignore
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        $rootScope.SetDefaultDropdownList($scope.data_Status, 'StatusId', $scope, 'selectedStatus');
    };

    $scope.selectedShowAll_Change = async function (flag = true, flag2 = true) {
        // prettier-ignore
        $scope.data_Status = ($scope.selectedShowAll ? $scope.data_Status_All : $scope.data_Status_All.filter(function (e) { return e.IsArchive == false; }));

        // just to make UX consistent
        if (flag2) $scope.selectedStatus = '';

        if (flag) {
            await $scope.showData();
        }
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';
        $scope.selectedBranch = branch;

        let type = $scope.filters.Type.Value;
        if (type && typeof type === 'string' && type.indexOf('(') >= 0) type = '';
        $scope.selectedType = type;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_Type(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('Assets', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.disposeClick = async function () {
        // Implement dispose functionality
    };

    $scope.downloadSchemaClick = async function () {
        // Implement download schema functionality
    };

    $scope.uploadClick = async function () {
        // Implement upload functionality
    };

    $scope.initialize_Page();
});