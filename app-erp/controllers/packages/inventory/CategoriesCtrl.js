angular.module('app.erp').controller('CategoriesCtrl', function ($rootScope, $scope, BackEndService, Utility_ERP, Categories_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 10000;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10000];
    $scope.activeOptions = [
        { Value: null, Text: 'All' },
        { Value: true, Text: 'Yes' },
        { Value: false, Text: 'No' },
    ];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Active: { PropertyName: 'Active', Operator: '=', Value: null },
        Parent: { PropertyName: 'ParentCode', Operator: '=', Value: null },
    };

    $scope.selectedParent = '';

    // some Functions
    var loadData_Custom = async function () {
        var request = {
            modelName: $scope.dt.dataModel,
            maximumResult: ($scope.dt.pageLength <= 100) ? $scope.dt.pageLength : 100,
            fieldNames: ['*'],

            sortList: [$scope.dt.activeSortField + ' ' + $scope.dt.activeSortDirection],
            pageNumber: $scope.dt.currentPage,
        };

        $scope.dt.applyFilters(request);

        $scope.dt.loading = true;

        // reset
        $scope.dt.data = [];
        //dt.totalRows = 0;
        //dt.totalPages = 0;

        let response = await BackEndService.RequestDataList_X(request);
        $scope.dt.loading = false;

        if (response.success) {
            // request data success
            $scope.dt.data = response.data.Data;
            $scope.dt.totalRows = response.data.TotalRows;
            if ($scope.dt.totalRows < $scope.dt.pageLength) $scope.dt.totalPages = 1;
            else $scope.dt.totalPages = Math.ceil($scope.dt.totalRows / $scope.dt.pageLength);

            var kolom_id = 'Code';
            var kolom_parent_id = 'ParentCode';
            var kolom_code = 'Code';
            var kolom_desc = 'Description';

            $scope.dt.treeData = Utility_ERP.sdr_BuildFlatTreeData($scope, kolom_id, kolom_parent_id, kolom_code, kolom_desc);
        } else {
            // request data failed
            // show Error: sudah dihandle oleh SmartAdmin - function notifyError() menggunakan $.bigBox()
        }

        BackEndService.Log_Activity();
    };


    $scope.CreateTable = function () {
        $scope.dt = Categories_Service.Table($scope);

        $scope.dt.loadData = loadData_Custom;

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            //['Description', 'Description', 'Description', 'Text', true],
            // ['Parent', 'ParentCode', 'ParentCode', 'ParentName', true],
            // ['Level Type', 'LevelType', 'LevelType', 'Text', true],
            // ['Item Type', 'ItemType', 'ItemType', 'Number', true],
            ['', 'Active', 'Active', 'Boolean', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $scope.filters['selectedParent'] = $scope.selectedParent;

        $rootScope.SaveFilterState('Category', $scope);

        delete $scope.filters['selectedParent'];

        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);
    };



    $scope.getData_Parent = function (val) {
        return Categories_Service.Dropdown_Category2(val);
    };

    async function Override_some_Filters() {
        if ($scope.LoadFilterState_) {
            $scope.selectedParent = $scope.filters['selectedParent'];
            delete $scope.filters['selectedParent'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        $rootScope.LoadFilterState('Category', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});
