angular.module('app.erp').controller('UserFormCtrl', function ($rootScope, $scope, $state, Utility_ERP, UserForm_Service) {

    // Initialize variables
    $scope.Is_Writeable = true;
    $scope.Is_Create = true;
    $scope.form = { submitted: false };
    $scope.allData_toJson = false;

    // Initialize model
    $scope.model = {
        Employee: '',
        FullName: '',
        EmailAddress: '',
        Password: '',
        ConfirmPassword: '',
        AssignRole: ''
    };

    // Data for dropdowns
    $scope.data_Roles = [
        { Code: 'ADMIN', Name: 'Admin' },
        { Code: 'SUPERVISOR', Name: 'Supervisor' },
        { Code: 'MANAGER', Name: 'Manager' },
        { Code: 'APPROVER', Name: 'Approver' }
    ];

    // Initialize function
    $scope.init = function () {
        var params = $state.params;

        if (params && params.id) {
            $scope.Is_Create = false;
            $scope.loadData(params.id);
        }
    };

    // Load existing data
    $scope.loadData = function (id) {
        $('#idLoading').show();

        UserForm_Service.getById(id).then(function (response) {
            if (response.data.success) {
                $scope.model = response.data.data;
            } else {
                Utility_ERP.showAlert('Error', response.data.message, 'error');
            }
            $('#idLoading').hide();
        }, function (error) {
            Utility_ERP.showAlert('Error', 'Failed to load data', 'error');
            $('#idLoading').hide();
        });
    };

    // Save data
    $scope.saveData = function () {
        $scope.form.submitted = true;

        // Validation
        if (!$scope.model.Employee || !$scope.model.FullName || !$scope.model.EmailAddress ||
            !$scope.model.Password || !$scope.model.ConfirmPassword || !$scope.model.AssignRole) {
            Utility_ERP.showAlert('Validation Error', 'Please fill all required fields', 'warning');
            return;
        }

        // Check password match
        if ($scope.model.Password !== $scope.model.ConfirmPassword) {
            Utility_ERP.showAlert('Validation Error', 'Passwords do not match', 'warning');
            return;
        }

        // Check password length
        if ($scope.model.Password.length < 8) {
            Utility_ERP.showAlert('Validation Error', 'Password must be at least 8 characters', 'warning');
            return;
        }

        $('#idLoading').show();

        var savePromise = $scope.Is_Create ?
            UserForm_Service.create($scope.model) :
            UserForm_Service.update($scope.model);

        savePromise.then(function (response) {
            if (response.data.success) {
                Utility_ERP.showAlert('Success', 'User saved successfully', 'success');
                $scope.sdr_GoBack();
            } else {
                Utility_ERP.showAlert('Error', response.data.message, 'error');
            }
            $('#idLoading').hide();
        }, function (error) {
            Utility_ERP.showAlert('Error', 'Failed to save user', 'error');
            $('#idLoading').hide();
        });
    };

    // Toggle debug scope
    $scope.Toggle_debugScope = function () {
        $scope.allData_toJson = !$scope.allData_toJson;
        if ($scope.allData_toJson) {
            $scope.allData_toJson2 = {
                model: $scope.model,
                data_Roles: $scope.data_Roles
            };
        }
    };

    // Initialize on load
    $scope.init();
});