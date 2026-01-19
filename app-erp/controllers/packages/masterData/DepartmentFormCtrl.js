angular.module('app.erp').controller('DepartmentFormCtrl', function ($rootScope, $scope, Utility_ERP, Department_Service, Personels_Service) {
    $scope.getData_Personels = async function (val) {
        return await Personels_Service.Dropdown(val, 'SO');
    };
});

