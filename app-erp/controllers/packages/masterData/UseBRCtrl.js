angular.module('app.erp').controller('UseBRCtrl', function ($rootScope, $scope, Utility_ERP, UseBR_Service, BackEndService) {
    // Dummy data, just for "Paging"
    $scope.dt = {};
    $scope.dt.pageLength = 20;

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    // filter
    $scope.filters = {
        IsPersonnel: { PropertyName: 'IsPersonnel', Operator: '=', Value: true },
    };

    $scope.selectedBranch = '';
    $scope.selectedStatus = '';
    $scope.showAllStatus = false;

    // References of data
    $scope.data_EmployeeLocationAccess = [];
    $scope.data_DocumentStatus_All = [];
    $scope.data_DocumentStatus = [];
    $scope.data_CustomerType = [];
    $scope.data_BusinessLine = [];
    $scope.data_BusinessRelationGroup = [];
    $scope.data_BusinessRelationTitle = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = UseBR_Service.Table($scope.filters, $scope.dt.pageLength, $scope.afterRequestData);

        // format: Title, DbField, SortField, Format
        let columns = [
            ['Code', 'Code', 'Code', 'Text'],
            ['Name', 'Name', 'Name', 'Text'],
            ['Status', 'StatusName', 'StatusName', 'Text'],
        ];

        Utility_ERP.ProcessColumns($scope.dt, columns);
    };

    $scope.showData = async function () {
        await $scope.dt.loadData();
    };

    $scope.initialize_Page = async function () {
        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        // prettier-ignore
        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope)
            , $scope.getData_DocumentStatus()
            , $scope.getData_CustomerType()
            , $scope.getData_BusinessLine()
            , $scope.getData_BusinessRelationGroup()
            , $scope.getData_BusinessRelationTitle()
        ]);

        $scope.showData();
    };

    $scope.afterRequestData = function () {
        $scope.dt.data.forEach(function (row) {
            row['rowSelected'] = false;
        });
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_DocumentStatus = async function () {
        $scope.data_DocumentStatus_All = await Utility_ERP.getData_DocumentStatus('BusinessRelation');

        // prettier-ignore
        $scope.data_DocumentStatus = ($scope.showAllStatus ? $scope.data_DocumentStatus_All : $scope.data_DocumentStatus_All.filter(function (e) { return e.IsArchive == false; }));

        // Default untuk DropdownList
        if ($scope.data_DocumentStatus.length > 0) {
            $scope.selectedStatus = $scope.data_DocumentStatus[0].StatusId;
        }
    };

    $scope.selectedStatus_Change = async function () {
        // prettier-ignore
        $scope.data_DocumentStatus = ($scope.showAllStatus ? $scope.data_DocumentStatus_All : $scope.data_DocumentStatus_All.filter(function (e) { return e.IsArchive == false; }));

        // just to make UX consistent
        if ($scope.showAllStatus) $scope.selectedStatus = '';

        await $scope.showData();
    };

    $scope.getData_CustomerType = async function () {
        $scope.data_CustomerType = await UseBR_Service.getData_CustomerType();
    };

    $scope.getData_BusinessLine = async function () {
        $scope.data_BusinessLine = await UseBR_Service.getData_BusinessLine();
    };

    $scope.getData_BusinessRelationGroup = async function () {
        $scope.data_BusinessRelationGroup = await UseBR_Service.getData_BusinessRelationGroup();
    };

    $scope.getData_BusinessRelationTitle = async function () {
        $scope.data_BusinessRelationTitle = await UseBR_Service.getData_BusinessRelationTitle();
    };

    $scope.voidDocument = function () { };

    $scope.Block = async function () {
        await $scope.ProcessBlock_UnBlock('Blocked');
    };

    $scope.UnBlock = async function () {
        await $scope.ProcessBlock_UnBlock('UnBlocked');
    };

    $scope.ProcessBlock_UnBlock = async function (action) {
        let selectedData = [];

        for (let i = 0; i < $scope.dt.data.length; i++) {
            if ($scope.dt.data[i]['rowSelected']) {
                selectedData.push($scope.dt.data[i]['Code']);
            }
        }

        if (selectedData.length <= 0) {
            $.bigBox({
                title: 'Pesan Error',
                content: 'No data is selected!',
                color: '#C46A69',
                icon: 'fa fa-warning shake animated',
                number: '',
                timeout: 2000,
            });

            return;
        }

        var request = {
            actionController: 'CustomerController',
            actionName: action,
            actionParam: selectedData,
        };

        await BackEndService.RequestAction(request);

        $scope.selectAllRows = false;
        $scope.showData();

        $.bigBox(
            {
                title: 'Informasi',
                content: 'Data berhasil disimpan',
                color: '#739E73',
                timeout: $rootScope.Timeout_Save(),
                icon: 'fa fa-check',
                number: '',
            },
            function () { }
        );
    };

    $scope.initialize_Page();
});
