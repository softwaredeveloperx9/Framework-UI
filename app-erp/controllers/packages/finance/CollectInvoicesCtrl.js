angular.module('app.erp').controller('CollectInvoicesCtrl', function ($rootScope, $scope, Utility_ERP, CollectInvoices_Service, BusinessRelation_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        Branch: { PropertyName: 'BranchCode', Operator: 'in', Value: '' },
        Customer: { PropertyName: 'CustomerCode', Operator: '=', Value: '' },
        DueDateAge: { PropertyName: 'DueDateAgeCode', Operator: 'in', Value: '' },
        UnRequestedToCollect: { PropertyName: 'RequestedToCollect', Operator: '=', Value: null },
    };

    $scope.selectedBranch = '';
    $scope.selectedCustomer = '';
    $scope.selectedDueDateAge = '';
    $scope.selectedUnRequestedToCollect = false;

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_BillingAddressNames = [];
    $scope.data_DueDateAge = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = CollectInvoices_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Doc Nr.', 'DocNr', 'DocNr', 'Text', true],
            ['Total Amount', 'TotalAmount', 'TotalAmount', 'Number', true],
            ['Amount Due', 'AmountDue', 'AmountDue', 'Number', true],
            ['Due Date', 'DueDate', 'DueDate', 'Date', true],
            ['Reff Nr.', 'ReffNr', 'ReffNr', 'Text', true],
            ['Last Status', 'LastStatus', 'LastStatus', 'Text', true],
            ['Last Collect', 'LastCollect', 'LastCollect', 'Text', true],
            ['Last Notes', 'LastNotes', 'LastNotes', 'Text', true],
            ['Next Collect', 'NextCollect', 'NextCollect', 'Date', true],
            ['Assigned To', 'AssignedTo', 'AssignedTo', 'Text', true],
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

        if (!$scope.selectedDueDateAge) {
            $scope.filters.DueDateAge.Operator = 'in';
            $scope.filters.DueDateAge.Value = Utility_ERP.Value_OperatorIN_($scope.data_DueDateAge, 'Code');
        } else {
            $scope.filters.DueDateAge.Operator = '=';
            $scope.filters.DueDateAge.Value = $scope.selectedDueDateAge;
        }

        $scope.filters.UnRequestedToCollect.Value = null;
        if ($scope.selectedUnRequestedToCollect) {
            $scope.filters.UnRequestedToCollect.Value = false;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;
        $scope.filters['selectedUnRequestedToCollect'] = $scope.selectedUnRequestedToCollect;

        $rootScope.SaveFilterState('CollectInvoices', $scope);

        delete $scope.filters['selectedCustomer'];
        delete $scope.filters['selectedUnRequestedToCollect'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.customerSelected = async function (flag = true) {
        // reset
        $scope.data_BillingAddressNames = [];

        if ($rootScope.Not_ValidString($scope.filters.Customer.Value)) {
            if (flag) {
                $scope.showData();
            }

            return;
        }

        $scope.data_BillingAddressNames = await BusinessRelation_Service.GetBusinessRelationBillingAddressNames($scope.filters.Customer.Value);

        if (flag) {
            $scope.showData();
        }
    };

    $scope.getData_DueDateAge = async function () {
        $scope.data_DueDateAge = await CollectInvoices_Service.Dropdown_DueDateAge();
    };

    ;

    async function Override_some_Filters() {
        let branch = $scope.filters.Branch.Value;
        if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let dueDateAge = $scope.filters.DueDateAge.Value;
        if (dueDateAge && typeof dueDateAge === 'string' && dueDateAge.indexOf('(') >= 0) dueDateAge = '';
        $scope.selectedDueDateAge = dueDateAge;

        if ($scope.LoadFilterState_) {
            $scope.selectedBranch = branch;

            $scope.selectedCustomer = $scope.filters['selectedCustomer'];
            delete $scope.filters['selectedCustomer'];

            await $scope.customerSelected(false);

            $scope.selectedUnRequestedToCollect = $scope.filters['selectedUnRequestedToCollect'];
            delete $scope.filters['selectedUnRequestedToCollect'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_DueDateAge()
        ]);

        $rootScope.LoadFilterState('CollectInvoices', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.addToCollectRequest = async function () {
        // implement add to collect request logic
    };

    $scope.addToTask = async function () {
        // implement add to task logic
    };

    $scope.initialize_Page();
});