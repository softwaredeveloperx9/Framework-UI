angular.module('app.erp').controller('CategoriesMDCtrl', function ($rootScope, $scope, Utility_ERP, Categories_Service) {
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
        Parent: { PropertyName: 'ParentCode', Operator: '=', Value: null },
    };

    $scope.selectedParent = '';

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = Categories_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
            ['Parent', 'ParentCode', 'ParentCode', 'ParentName', true],
            ['Level Type', 'LevelType', 'LevelType', 'Text', true],
            ['Item Type', 'ItemType', 'ItemType', 'Number', true],
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
