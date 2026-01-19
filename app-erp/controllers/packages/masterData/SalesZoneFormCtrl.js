angular.module('app.erp').controller('SalesZoneFormCtrl', function ($rootScope, $scope, Utility_ERP, SalesZone_Service, Personels_Service) {
    $scope.getData_Personels = async function (val) {
        return await Personels_Service.Dropdown(val, 'SO');
    };
});

