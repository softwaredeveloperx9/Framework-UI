angular.module('app.erp').controller('CustomerGradeFormCtrl', function ($rootScope, $scope, $state, Utility_ERP, CustomerGradeForm_Service) {
    
    // Initialize variables
    $scope.Is_Writeable = true;
    $scope.Is_Create = true;
    $scope.form = { submitted: false };
    $scope.allData_toJson = false;
    
    // Initialize model
    $scope.model = {
        Code: '',
        Name: '',
        Description: '',
        Active: true
    };

    // Initialize function
    $scope.init = function() {
        var params = $state.params;
        
        if (params && params.id) {
            $scope.Is_Create = false;
            $scope.loadData(params.id);
        }
    };

    // Load existing data
    $scope.loadData = function(id) {
        $('#idLoading').show();
        
        CustomerGradeForm_Service.getById(id).then(function(response) {
            if (response.data.success) {
                $scope.model = response.data.data;
            } else {
                Utility_ERP.showAlert('Error', response.data.message, 'error');
            }
            $('#idLoading').hide();
        }, function(error) {
            Utility_ERP.showAlert('Error', 'Failed to load data', 'error');
            $('#idLoading').hide();
        });
    };

    // Save data
    $scope.saveData = function() {
        $scope.form.submitted = true;

        // Validation
        if (!$scope.model.Name || $scope.model.Name.trim() === '') {
            Utility_ERP.showAlert('Validation Error', 'Name is required', 'warning');
            return;
        }

        if ($scope.Is_Create && (!$scope.model.Code || $scope.model.Code.trim() === '')) {
            Utility_ERP.showAlert('Validation Error', 'Code is required', 'warning');
            return;
        }

        $('#idLoading').show();

        var savePromise = $scope.Is_Create ? 
            CustomerGradeForm_Service.create($scope.model) : 
            CustomerGradeForm_Service.update($scope.model);

        savePromise.then(function(response) {
            if (response.data.success) {
                Utility_ERP.showAlert('Success', 'Customer Grade saved successfully', 'success');
                $scope.sdr_GoBack();
            } else {
                Utility_ERP.showAlert('Error', response.data.message, 'error');
            }
            $('#idLoading').hide();
        }, function(error) {
            Utility_ERP.showAlert('Error', 'Failed to save Customer Grade', 'error');
            $('#idLoading').hide();
        });
    };

    // Cancel form
    $scope.cancelForm = function() {
        $scope.sdr_GoBack();
    };

    // Go back
    $scope.sdr_GoBack = function() {
        $state.go('app.erp.masterdata.customergradelist');
    };

    // Toggle debug scope
    $scope.Toggle_debugScope = function() {
        $scope.allData_toJson = !$scope.allData_toJson;
        if ($scope.allData_toJson) {
            $scope.allData_toJson2 = {
                model: $scope.model,
                Is_Create: $scope.Is_Create,
                Is_Writeable: $scope.Is_Writeable
            };
        }
    };

    // Initialize on load
    $scope.init();
});