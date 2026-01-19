angular.module('app.erp').controller('SubAccountFormCtrl', function ($rootScope, $scope, Utility_ERP, SubAccount_Service, Personels_Service) {
    $scope.getData_Personels = async function (val) {
        return await Personels_Service.Dropdown(val, 'SO');
    };
});

