angular.module('app.erp').controller('JobPositionFormCtrl', function ($rootScope, $scope, Utility_ERP, Position_Service, Personels_Service) {
    $scope.getData_Personels = async function (val) {
        return await Personels_Service.Dropdown(val, 'SO');
    };
});

