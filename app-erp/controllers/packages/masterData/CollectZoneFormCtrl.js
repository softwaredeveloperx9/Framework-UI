angular.module('app.erp').controller('CollectZoneFormCtrl', function ($rootScope, $scope, Utility_ERP, CollectZone_Service, Personels_Service) {
    $scope.getData_Personels = async function (val) {
        return await Personels_Service.Dropdown(val, 'SO');
    };
});

