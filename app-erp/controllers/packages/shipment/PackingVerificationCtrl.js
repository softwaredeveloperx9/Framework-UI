angular.module('app.erp').controller('PackingVerificationCtrl', function ($rootScope, $scope, Utility_ERP, PackingVerification_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Manifest: { PropertyName: 'ManifestCode', Operator: 'in', Value: '' },
        CarrierType: { PropertyName: 'CarrierType', Operator: '=', Value: '' },
        Driver: { PropertyName: 'Driver', Operator: '=', Value: '' },
        TagNumber: { PropertyName: 'TagNumberCode', Operator: 'in', Value: '' },
        Packer: { PropertyName: 'Packer', Operator: '=', Value: '' },
        CarrierNumber: { PropertyName: 'CarrierNumber', Operator: '=', Value: '' },
        Helper: { PropertyName: 'Helper', Operator: '=', Value: '' },
        Checker: { PropertyName: 'Checker', Operator: '=', Value: '' },
        PickupAtWarehouse: { PropertyName: 'PickupAtWarehouse', Operator: '=', Value: '' },
    };

    $scope.selectedManifest = '';
    $scope.selectedTagNumber = '';
    $scope.selectedPacker = '';
    $scope.selectedChecker = '';

    $scope.data_Manifest = [];
    $scope.data_TagNumber = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = PackingVerification_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Item Code', 'ItemCode', 'ItemCode', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Qty', 'Qty', 'Qty', 'Number', true],
            ['Uom', 'Uom', 'Uom', 'Text', true],
            ['Pck', 'Pck', 'Pck', 'Number', true],
            ['Qty', 'Qty2', 'Qty2', 'Number', true],
            ['Uom', 'Uom2', 'Uom2', 'Text', true],
            ['Pck', 'Pck2', 'Pck2', 'Number', true],
            ['Qty', 'Qty3', 'Qty3', 'Number', true],
            ['Uom', 'Uom3', 'Uom3', 'Text', true],
            ['Pck', 'Pck3', 'Pck3', 'Number', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedManifest) {
            $scope.filters.Manifest.Operator = 'in';
            $scope.filters.Manifest.Value = Utility_ERP.Value_OperatorIN_($scope.data_Manifest, 'Code');
        } else {
            $scope.filters.Manifest.Operator = '=';
            $scope.filters.Manifest.Value = $scope.selectedManifest;
        }

        if (!$scope.selectedTagNumber) {
            $scope.filters.TagNumber.Operator = 'in';
            $scope.filters.TagNumber.Value = Utility_ERP.Value_OperatorIN_($scope.data_TagNumber, 'Code');
        } else {
            $scope.filters.TagNumber.Operator = '=';
            $scope.filters.TagNumber.Value = $scope.selectedTagNumber;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedPacker'] = $scope.selectedPacker;
        $scope.filters['selectedChecker'] = $scope.selectedChecker;

        $rootScope.SaveFilterState('PackingVerification', $scope);

        delete $scope.filters['selectedPacker'];
        delete $scope.filters['selectedChecker'];
    };

    $scope.getData_Employee = async function (val) {
        return await $rootScope.getData_Employee(val, $scope);
    };

    $scope.getData_Manifest = async function () {
        $scope.data_Manifest = await PackingVerification_Service.Dropdown_Manifest();
    };

    $scope.getData_TagNumber = async function () {
        $scope.data_TagNumber = await PackingVerification_Service.Dropdown_TagNumber();
    };

    ;

    async function Override_some_Filters() {
        let manifest = $scope.filters.Manifest.Value;
        if (manifest && typeof manifest === 'string' && manifest.indexOf('(') >= 0) manifest = '';
        $scope.selectedManifest = manifest;

        let tagNumber = $scope.filters.TagNumber.Value;
        if (tagNumber && typeof tagNumber === 'string' && tagNumber.indexOf('(') >= 0) tagNumber = '';
        $scope.selectedTagNumber = tagNumber;

        if ($scope.LoadFilterState_) {
            $scope.selectedPacker = $scope.filters['selectedPacker'];
            delete $scope.filters['selectedPacker'];

            $scope.selectedChecker = $scope.filters['selectedChecker'];
            delete $scope.filters['selectedChecker'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_Manifest(),
            $scope.getData_TagNumber()
        ]);

        $rootScope.LoadFilterState('PackingVerification', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.packClick = async function () {
        // Implementation for Pack
    };

    $scope.printForm = async function () {
        // Implementation for Print
    };

    $scope.initialize_Page();
});