angular.module('app.erp').controller('ManifestsCtrl', function ($rootScope, $scope, Utility_ERP, Manifests_Service) {
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
        CarrierType: { PropertyName: 'CarrierTypeCode', Operator: 'in', Value: '' },
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        Site: { PropertyName: 'SiteCode', Operator: 'in', Value: '' },
        Carrier: { PropertyName: 'CarrierCode', Operator: 'in', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedCarrierType = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedSite = '';
    $scope.selectedCarrier = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_CarrierType = [];
    $scope.data_Site = [];
    $scope.data_Carrier = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = Manifests_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Manifest #', 'Manifest', 'Manifest', 'Text', true],
            ['Branch', 'Branch', 'Branch', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Driver', 'Driver', 'Driver', 'Text', true],
            ['Helper', 'Helper', 'Helper', 'Text', true],
            ['Carrier Type', 'CarrierType', 'CarrierType', 'Text', true],
            ['Carrier Nr.', 'CarrierNr', 'CarrierNr', 'Text', true],
            ['Total Qty', 'TotalQty', 'TotalQty', 'Number', true],
            ['Issued By', 'IssuedBy', 'IssuedBy', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
            ['Via', 'Via', 'Via', 'Text', true],
            ['Action', 'Action', 'Action', 'Text', true],
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

        if (!$scope.selectedCarrierType) {
            $scope.filters.CarrierType.Operator = 'in';
            $scope.filters.CarrierType.Value = Utility_ERP.Value_OperatorIN_($scope.data_CarrierType, 'Code');
        } else {
            $scope.filters.CarrierType.Operator = '=';
            $scope.filters.CarrierType.Value = $scope.selectedCarrierType;
        }

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        if (!$scope.selectedSite) {
            $scope.filters.Site.Operator = 'in';
            $scope.filters.Site.Value = Utility_ERP.Value_OperatorIN_($scope.data_Site, 'Code');
        } else {
            $scope.filters.Site.Operator = '=';
            $scope.filters.Site.Value = $scope.selectedSite;
        }

        if (!$scope.selectedCarrier) {
            $scope.filters.Carrier.Operator = 'in';
            $scope.filters.Carrier.Value = Utility_ERP.Value_OperatorIN_($scope.data_Carrier, 'Code');
        } else {
            $scope.filters.Carrier.Operator = '=';
            $scope.filters.Carrier.Value = $scope.selectedCarrier;
        }

        if ($rootScope.ValidString($scope.selectedStatus)) {
            $scope.filters.Status.Operator = '=';
            $scope.filters.Status.Value = $scope.selectedStatus;
        } else {
            $scope.filters.Status.Operator = 'in';
            $scope.filters.Status.Value = Utility_ERP.Value_OperatorIN($scope.data_Status, 'StatusId', '');
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedShowAll'] = $scope.selectedShowAll;

        $rootScope.SaveFilterState('Manifests', $scope);

        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_CarrierType = async function () {
        $scope.data_CarrierType = await Manifests_Service.Dropdown_CarrierType();
    };

    $scope.getData_Site = async function () {
        $scope.data_Site = await Manifests_Service.Dropdown_Site();
    };

    $scope.getData_Carrier = async function () {
        $scope.data_Carrier = await Manifests_Service.Dropdown_Carrier();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('Manifest');

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

        let carrierType = $scope.filters.CarrierType.Value;
        if (carrierType && typeof carrierType === 'string' && carrierType.indexOf('(') >= 0) carrierType = '';
        $scope.selectedCarrierType = carrierType;

        let site = $scope.filters.Site.Value;
        if (site && typeof site === 'string' && site.indexOf('(') >= 0) site = '';
        $scope.selectedSite = site;

        let carrier = $scope.filters.Carrier.Value;
        if (carrier && typeof carrier === 'string' && carrier.indexOf('(') >= 0) carrier = '';
        $scope.selectedCarrier = carrier;

        let status = $scope.filters.Status.Value;
        if (status && typeof status === 'string' && status.indexOf('(') >= 0) status = '';
        $scope.selectedStatus = status;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedShowAll = $scope.filters['selectedShowAll'];
            $scope.selectedShowAll_Change(false, false);

            delete $scope.filters['selectedShowAll'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_CarrierType(),
            $scope.getData_Site(),
            $scope.getData_Carrier(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('Manifests', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.loadVerification = async function () { };

    $scope.packing = async function () { };

    $scope.publishDO = async function () { };

    $scope.onDelivery = async function () { };

    $scope.revisePersonnel = async function () { };

    $scope.printForm = async function () { };

    $scope.exportToAndaru = async function () { };

    $scope.voidManifest = async function () { };

    $scope.initialize_Page();
});