angular.module('app.erp').controller('InvoiceReceiptItemListCtrl', function ($rootScope, $scope, Utility_ERP, InvoiceReceiptItemList_Service) {
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
        DateFrom_date: { PropertyName: 'Date', Operator: '>=', Value: '' },
        DateTo_date: { PropertyName: 'Date', Operator: '<=', Value: '' },
        BR: { PropertyName: 'EmployeeCode', Operator: '=', Value: '' },
        ReceiptNr: { PropertyName: 'ReceiptNr', Operator: '=', Value: null },
    };

    $scope.selectedBranch = '';
    $scope.selectedDateFrom = '';
    $scope.selectedDateTo = '';
    $scope.selectedBR = '';

    $scope.data_EmployeeLocationAccess = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = InvoiceReceiptItemList_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Doc Nr.', 'DocNr', 'DocNr', 'Text', true],
            ['Date', 'Date', 'Date', 'Date', true],
            ['Amount', 'Amount', 'Amount', 'Number', true],
            ['Due Date', 'DueDate', 'DueDate', 'Date', true],
            ['PO Nr.', 'PONr', 'PONr', 'Text', true],
            ['Comments', 'Comments', 'Comments', 'Text', true],
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

        $scope.filters.DateFrom_date.Value = $rootScope.Date_to_DB($scope.selectedDateFrom);
        $scope.filters.DateTo_date.Value = $rootScope.Date_to_DB($scope.selectedDateTo);

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedBR'] = $scope.selectedBR;

        $rootScope.SaveFilterState('InvoiceReceiptItemList', $scope);

        delete $scope.filters['selectedBR'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Employee = async function (val) {
        return await $rootScope.getData_Employee(val, $scope);
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedBR = $scope.filters['selectedBR'];
            delete $scope.filters['selectedBR'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, '')
        ]);

        $rootScope.LoadFilterState('InvoiceReceiptItemList', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.initialize_Page();
});