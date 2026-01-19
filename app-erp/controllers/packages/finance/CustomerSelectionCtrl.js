angular.module('app.erp').controller('CustomerSelectionCtrl', function ($rootScope, $scope, Utility_ERP, CustomerSelection_Service, BusinessRelation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Category: { PropertyName: 'Category', Operator: 'in', Value: '' },
        BusinessLine: { PropertyName: 'BusinessLine', Operator: 'in', Value: '' },
        Group: { PropertyName: 'Group', Operator: 'in', Value: '' },
        Title: { PropertyName: 'Title', Operator: 'in', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
    };

    $scope.selectedCategory = '';
    $scope.selectedBusinessLine = '';
    $scope.selectedGroup = '';
    $scope.selectedTitle = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_Category = [];
    $scope.data_BusinessLine = [];
    $scope.data_Group = [];
    $scope.data_Title = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = CustomerSelection_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Code', 'Code', 'Code', 'Text', true],
            ['Name', 'Name', 'Name', 'Text', true],
            ['Category', 'Category', 'Category', 'Text', true],
            ['Title', 'Title', 'Title', 'Text', true],
            ['Group', 'Group', 'Group', 'Text', true],
            ['Business Line', 'BusinessLine', 'BusinessLine', 'Text', true],
            ['Status', 'Status', 'Status', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        if (!$scope.selectedCategory) {
            $scope.filters.Category.Operator = 'in';
            $scope.filters.Category.Value = Utility_ERP.Value_OperatorIN_($scope.data_Category, 'Code');
        } else {
            $scope.filters.Category.Operator = '=';
            $scope.filters.Category.Value = $scope.selectedCategory;
        }

        if (!$scope.selectedBusinessLine) {
            $scope.filters.BusinessLine.Operator = 'in';
            $scope.filters.BusinessLine.Value = Utility_ERP.Value_OperatorIN_($scope.data_BusinessLine, 'Code');
        } else {
            $scope.filters.BusinessLine.Operator = '=';
            $scope.filters.BusinessLine.Value = $scope.selectedBusinessLine;
        }

        if (!$scope.selectedGroup) {
            $scope.filters.Group.Operator = 'in';
            $scope.filters.Group.Value = Utility_ERP.Value_OperatorIN_($scope.data_Group, 'Code');
        } else {
            $scope.filters.Group.Operator = '=';
            $scope.filters.Group.Value = $scope.selectedGroup;
        }

        if (!$scope.selectedTitle) {
            $scope.filters.Title.Operator = 'in';
            $scope.filters.Title.Value = Utility_ERP.Value_OperatorIN_($scope.data_Title, 'Code');
        } else {
            $scope.filters.Title.Operator = '=';
            $scope.filters.Title.Value = $scope.selectedTitle;
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

        $rootScope.SaveFilterState('CustomerSelection', $scope);

        delete $scope.filters['selectedShowAll'];
    };

    $scope.getData_Category = async function () {
        $scope.data_Category = await BusinessRelation_Service.Dropdown_Category();
    };

    $scope.getData_BusinessLine = async function () {
        $scope.data_BusinessLine = await BusinessRelation_Service.Dropdown_BusinessLine();
    };

    $scope.getData_Group = async function () {
        $scope.data_Group = await BusinessRelation_Service.Dropdown_Group();
    };

    $scope.getData_Title = async function () {
        $scope.data_Title = await BusinessRelation_Service.Dropdown_Title();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('Customer');

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
        let category = $scope.filters.Category.Value;
        if (category && typeof category === 'string' && category.indexOf('(') >= 0) category = '';
        $scope.selectedCategory = category;

        let businessLine = $scope.filters.BusinessLine.Value;
        if (businessLine && typeof businessLine === 'string' && businessLine.indexOf('(') >= 0) businessLine = '';
        $scope.selectedBusinessLine = businessLine;

        let group = $scope.filters.Group.Value;
        if (group && typeof group === 'string' && group.indexOf('(') >= 0) group = '';
        $scope.selectedGroup = group;

        let title = $scope.filters.Title.Value;
        if (title && typeof title === 'string' && title.indexOf('(') >= 0) title = '';
        $scope.selectedTitle = title;

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
            $scope.getData_Category(),
            $scope.getData_BusinessLine(),
            $scope.getData_Group(),
            $scope.getData_Title(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('CustomerSelection', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.addSelectedItems = async function () {
        // Implementasi untuk menambahkan item yang dipilih
        let selectedRows = $scope.dt.data.filter(function (row) {
            return row.rowSelected === true;
        });

        if (selectedRows.length === 0) {
            $rootScope.ShowNotification('warning', 'Please select at least one customer');
            return;
        }

        // Logic untuk menambahkan customer yang dipilih
        console.log('Selected customers:', selectedRows);
    };

    $scope.initialize_Page();
});