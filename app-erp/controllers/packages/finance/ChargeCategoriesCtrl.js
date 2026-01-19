angular.module('app.erp').controller('ChargeCategoriesCtrl', function ($rootScope, $scope, Utility_ERP, ChargeCategories_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        ParentCategory: { PropertyName: 'ParentCode', Operator: 'in', Value: '' },
    };

    $scope.selectedParentCategory = '';

    $scope.data_ParentCategory = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = ChargeCategories_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Description', 'Description', 'Description', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedParentCategory) {
            $scope.filters.ParentCategory.Operator = 'in';
            $scope.filters.ParentCategory.Value = Utility_ERP.Value_OperatorIN_($scope.data_ParentCategory, 'Code');
        } else {
            $scope.filters.ParentCategory.Operator = '=';
            $scope.filters.ParentCategory.Value = $scope.selectedParentCategory;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $rootScope.SaveFilterState('ChargeCategories', $scope);
    };

    $scope.getData_ParentCategory = async function () {
        $scope.data_ParentCategory = await ChargeCategories_Service.Dropdown_ParentCategory();
    };

    ;

    async function Override_some_Filters() {
        let parentCategory = $scope.filters.ParentCategory.Value;
        if (parentCategory && typeof parentCategory === 'string' && parentCategory.indexOf('(') >= 0) parentCategory = '';
        $scope.selectedParentCategory = parentCategory;

        if ($scope.LoadFilterState_) {
            // No additional filter state to restore
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $scope.getData_ParentCategory()
        ]);

        $rootScope.LoadFilterState('ChargeCategories', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.downloadSchema = async function () {
        // Implement download schema functionality
    };

    $scope.uploadData = async function () {
        // Implement upload data functionality
    };

    $scope.initialize_Page();
});