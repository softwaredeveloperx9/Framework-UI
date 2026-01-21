angular.module('app.erp').controller('AddressListCtrl', function ($rootScope, $scope, Utility_ERP, AddressList_Service) {
    // Dummy data, just for "Table: paging and searching"
    $scope.dt = {};
    $scope.dt.pageLength = 20;
    $scope.searchKeyword = '';

    // Data to View
    $scope.pagesOptions = [10, 20, 50, 100];

    $scope.still_processing = false;

    // filter
    $scope.filters = {
        //Branch: { PropertyName: 'LocationCode', Operator: 'in', Value: '' },
        Customer: { PropertyName: 'BusinessRelationCode', Operator: '=', Value: '' },
        AddressType: { PropertyName: 'AddressTypeCode', Operator: 'in', Value: '' },
    };

    $scope.selectedBranch = '';
    $scope.selectedCustomer = '';
    $scope.selectedAddressType = '';

    $scope.data_EmployeeLocationAccess = [];
    $scope.data_AddressType = [];

    // some Functions
    $scope.CreateTable = function () {
        $scope.dt = AddressList_Service.Table($scope);

        // format: Title, DbField, SortField, Format, Show
        let columns = [
            ['Type', 'AddressTypeName', 'AddressTypeName', 'Text', true],
            ['Business Name', 'BusinessName', 'BusinessName', 'Text', true],
            ['Address', 'AddressLine1', 'AddressLine1', 'Text', true],
            ['Region/Area', 'RegionName', 'RegionName', 'Text', true],
            ['Phone', 'Phone', 'Phone', 'Text', true],
            ['Fax', 'Fax', 'Fax', 'Text', true],
        ];

        Utility_ERP.ProcessColumnsY($scope.dt, columns);
    };

    $scope.showData = async function () {
        // if (!$scope.selectedBranch) {
        //     $scope.filters.Branch.Operator = 'in';
        //     $scope.filters.Branch.Value = Utility_ERP.Value_OperatorIN_($scope.data_EmployeeLocationAccess, 'Code');
        // } else {
        //     $scope.filters.Branch.Operator = '=';
        //     $scope.filters.Branch.Value = $scope.selectedBranch;
        // }

        if (!$scope.selectedAddressType) {
            $scope.filters.AddressType.Operator = 'in';
            $scope.filters.AddressType.Value = Utility_ERP.Value_OperatorIN_($scope.data_AddressType, 'Code');
        } else {
            $scope.filters.AddressType.Operator = '=';
            $scope.filters.AddressType.Value = $scope.selectedAddressType;
        }

        Utility_ERP.Still_Processing($scope, true);
        await $scope.dt.loadData();
        Utility_ERP.Still_Processing($scope, false);

        $scope.filters['selectedCustomer'] = $scope.selectedCustomer;

        $rootScope.SaveFilterState('AddressList', $scope);

        delete $scope.filters['selectedCustomer'];
    };

    $scope.Branch_Changed = async function () {
        await $scope.showData();
    };

    $scope.getData_Customer = async function (val) {
        return await $rootScope.getData_Customer(val, $scope);
    };

    $scope.getData_AddressType = async function () {
        $scope.data_AddressType = await AddressList_Service.Dropdown_AddressType();
    };

    ;

    async function Override_some_Filters() {
        //let branch = $scope.filters.Branch.Value;
        //if (branch && typeof branch === 'string' && branch.indexOf('(') >= 0) branch = '';

        let addressType = $scope.filters.AddressType.Value;
        if (addressType && typeof addressType === 'string' && addressType.indexOf('(') >= 0) addressType = '';
        $scope.selectedAddressType = addressType;

        if ($scope.LoadFilterState_) {
            //$scope.selectedBranch = branch;

            $scope.selectedCustomer = $scope.filters['selectedCustomer'];
            delete $scope.filters['selectedCustomer'];
        }
    }

    $scope.initialize_Page = async function () {
        Utility_ERP.Still_Processing($scope, true);

        await Promise.allSettled([
            $rootScope.EmployeeLocationAccess($scope, ''),
            $scope.getData_AddressType()
        ]);

        $rootScope.LoadFilterState('AddressList', $scope);

        await Override_some_Filters();

        $scope.CreateTable();

        $rootScope.Proces_CheckBox_Kiri($scope);

        $scope.showData();
    };

    $scope.downloadSchema = async function () {
        Utility_ERP.Still_Processing($scope, true);

        let result = await AddressList_Service.DownloadSchema();

        Utility_ERP.Still_Processing($scope, false);

        if (result.Success) {
            $rootScope.DownloadFile(result.Data, 'AddressList_Schema.xlsx');
        } else {
            $rootScope.Alert_Error(result.Message);
        }
    };

    $scope.uploadData = async function () {
        $rootScope.ShowUploadDialog('AddressList', async function () {
            await $scope.showData();
        });
    };

    $scope.editAddress = async function (row) {
        // Navigate to edit form or show edit modal
        $rootScope.Alert_Info('Edit functionality: ' + row.BusinessName);
    };

    $scope.deleteAddress = async function (row) {
        let confirm = await $rootScope.Confirm_('Delete this address?');
        if (!confirm) return;

        Utility_ERP.Still_Processing($scope, true);

        let result = await AddressList_Service.Delete(row.Id);

        Utility_ERP.Still_Processing($scope, false);

        if (result.Success) {
            $rootScope.Alert_Success('Address deleted successfully');
            await $scope.showData();
        } else {
            $rootScope.Alert_Error(result.Message);
        }
    };

    $scope.initialize_Page();
});