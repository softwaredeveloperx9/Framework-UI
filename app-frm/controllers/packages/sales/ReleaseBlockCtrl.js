angular.module('app.erp').controller('ReleaseBlockCtrl', function ($rootScope, $scope, Utility_ERP, ReleaseBlock_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        IsCustomer: { PropertyName: 'IsCustomer', Operator: '=', Value: true },
        Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        BusinessLine: { PropertyName: 'BusinessLine', Operator: '=', Value: '' },
        Title: { PropertyName: 'Title', Operator: '=', Value: '' },
        Category: { PropertyName: 'ClassName', Operator: '=', Value: '' },
        Group: { PropertyName: 'BusinessGroup', Operator: '=', Value: '' },
        Status: { PropertyName: 'StatusId', Operator: 'in', Value: '' },
        IsSupplier: { PropertyName: 'IsSupplier', Operator: '=', Value: null },
        IsPersonnel: { PropertyName: 'IsPersonnel', Operator: '=', Value: null },
        IsFreightVendor: { PropertyName: 'IsFreightVendor', Operator: '=', Value: null },
        IsBranch: { PropertyName: 'IsBranch', Operator: '=', Value: null },
        IsBaseBranch: { PropertyName: 'IsBaseBranch', Operator: '=', Value: null },
    };

    $scope.selectedBranch = '';
    $scope.selectedBusinessLine = '';
    $scope.selectedTitle = '';
    $scope.selectedCategory = '';
    $scope.selectedGroup = '';
    $scope.selectedStatus = '';
    $scope.selectedShowAll = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_BusinessLine = [];
    $scope.data_Title = [];
    $scope.data_Category = [];
    $scope.data_Group = [];
    $scope.data_Status = [];
    $scope.data_Status_All = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = ReleaseBlock_Service.Table($scope);

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
        if (!$scope.selectedBranch) {
            $scope.filters.Branch.Operator = 'in';
            $scope.filters.Branch.Value = Utility_ERP.Value_OperatorIN_($scope.data_EmployeeLocationAccess, 'Code');
        } else {
            $scope.filters.Branch.Operator = '=';
            $scope.filters.Branch.Value = $scope.selectedBranch;
        }

        // if (!$scope.selectedBusinessLine) {
        //     $scope.filters.BusinessLine.Operator = 'in';
        //     $scope.filters.BusinessLine.Value = Utility_ERP.Value_OperatorIN_($scope.data_BusinessLine, 'Code');
        // } else {
        //     $scope.filters.BusinessLine.Operator = '=';
        //     $scope.filters.BusinessLine.Value = $scope.selectedBusinessLine;
        // }

        // if (!$scope.selectedTitle) {
        //     $scope.filters.Title.Operator = 'in';
        //     $scope.filters.Title.Value = Utility_ERP.Value_OperatorIN_($scope.data_Title, 'Code');
        // } else {
        //     $scope.filters.Title.Operator = '=';
        //     $scope.filters.Title.Value = $scope.selectedTitle;
        // }

        // if (!$scope.selectedCategory) {
        //     $scope.filters.Category.Operator = 'in';
        //     $scope.filters.Category.Value = Utility_ERP.Value_OperatorIN_($scope.data_Category, 'Code');
        // } else {
        //     $scope.filters.Category.Operator = '=';
        //     $scope.filters.Category.Value = $scope.selectedCategory;
        // }
        ////---

        // if (!$scope.selectedGroup) {
        //     $scope.filters.Group.Operator = 'in';
        //     $scope.filters.Group.Value = Utility_ERP.Value_OperatorIN_($scope.data_Group, 'Code');
        // } else {
        //     $scope.filters.Group.Operator = '=';
        //     $scope.filters.Group.Value = $scope.selectedGroup;
        // }

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

        $rootScope.SaveFilterState('Customers', $scope);

        delete $scope.filters['selectedShowAll'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_BusinessLine = async function () {
        $scope.data_BusinessLine = await ReleaseBlock_Service.Dropdown_BusinessLine();
    };

    $scope.getData_Title = async function () {
        $scope.data_Title = await ReleaseBlock_Service.Dropdown_Title();
    };

    $scope.getData_Category = async function () {
        $scope.data_Category = await ReleaseBlock_Service.Dropdown_Category();
    };

    $scope.getData_Group = async function () {
        $scope.data_Group = await ReleaseBlock_Service.Dropdown_Group();
    };

    $scope.getData_Status = async function () {
        $scope.data_Status_All = await Utility_ERP.getData_DocumentStatus('BusinessRelation');
        if ($scope.data_Status_All.length > 0) {
            $scope.data_Status_All = $scope.data_Status_All.filter(e => e.StatusId == 29);
        }

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

        let businessLine = $scope.filters.BusinessLine.Value;
        if (businessLine && typeof businessLine === 'string' && businessLine.indexOf('(') >= 0) businessLine = '';
        $scope.selectedBusinessLine = businessLine;

        let title = $scope.filters.Title.Value;
        if (title && typeof title === 'string' && title.indexOf('(') >= 0) title = '';
        $scope.selectedTitle = title;

        let category = $scope.filters.Category.Value;
        if (category && typeof category === 'string' && category.indexOf('(') >= 0) category = '';
        $scope.selectedCategory = category;

        let group = $scope.filters.Group.Value;
        if (group && typeof group === 'string' && group.indexOf('(') >= 0) group = '';
        $scope.selectedGroup = group;

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
            $scope.getData_BusinessLine(),
            $scope.getData_Title(),
            $scope.getData_Category(),
            $scope.getData_Group(),
            $scope.getData_Status()
        ]);

        $rootScope.LoadFilterState('Customers', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.voidClick = async function () {
        let selectedRows = $scope.dt.data.filter(function (e) {
            return e.rowSelected == true;
        });

        if (selectedRows.length == 0) {
            $rootScope.Alert_NoRowSelected();
            return;
        }

        let codes = selectedRows.map(function (e) {
            return e.Code;
        });

        let confirm = await $rootScope.Confirm_('Void selected customers?');
        if (!confirm) return;

        Utility_ERP.Still_Processing($scope, true);

        let result = await ReleaseBlock_Service.Void(codes);

        Utility_ERP.Still_Processing($scope, false);

        if (result.Success) {
            $rootScope.Alert_Success('Customers voided successfully');
            await $scope.showData();
        } else {
            $rootScope.Alert_Error(result.Message);
        }
    };

    $scope.deleteClick = async function () {
        let selectedRows = $scope.dt.data.filter(function (e) {
            return e.rowSelected == true;
        });

        if (selectedRows.length == 0) {
            $rootScope.Alert_NoRowSelected();
            return;
        }

        let codes = selectedRows.map(function (e) {
            return e.Code;
        });

        let confirm = await $rootScope.Confirm_('Delete selected customers?');
        if (!confirm) return;

        Utility_ERP.Still_Processing($scope, true);

        let result = await ReleaseBlock_Service.Delete(codes);

        Utility_ERP.Still_Processing($scope, false);

        if (result.Success) {
            $rootScope.Alert_Success('Customers deleted successfully');
            await $scope.showData();
        } else {
            $rootScope.Alert_Error(result.Message);
        }
    };

    $scope.downloadSchema = async function () {
        Utility_ERP.Still_Processing($scope, true);

        let result = await ReleaseBlock_Service.DownloadSchema();

        Utility_ERP.Still_Processing($scope, false);

        if (result.Success) {
            $rootScope.DownloadFile(result.Data, 'Customers_Schema.xlsx');
        } else {
            $rootScope.Alert_Error(result.Message);
        }
    };

    $scope.uploadData = async function () {
        $rootScope.ShowUploadDialog('Customers', async function () {
            await $scope.showData();
        });
    };

    $scope.exportList = async function () {
        Utility_ERP.Still_Processing($scope, true);

        let result = await ReleaseBlock_Service.ExportToExcel($scope.filters);

        Utility_ERP.Still_Processing($scope, false);

        if (result.Success) {
            $rootScope.DownloadFile(result.Data, 'Customers.xlsx');
        } else {
            $rootScope.Alert_Error(result.Message);
        }
    };

    $scope.synchToCircle = async function () {
        let confirm = await $rootScope.Confirm_('Synchronize customers to Circle?');
        if (!confirm) return;

        Utility_ERP.Still_Processing($scope, true);

        let result = await ReleaseBlock_Service.SynchToCircle();

        Utility_ERP.Still_Processing($scope, false);

        if (result.Success) {
            $rootScope.Alert_Success('Customers synchronized successfully');
        } else {
            $rootScope.Alert_Error(result.Message);
        }
    };

    $scope.initialize_Page();
});