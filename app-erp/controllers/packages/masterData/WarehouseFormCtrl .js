angular.module('app.erp').controller('WarehouseFormCtrl', function ($rootScope, $scope, Utility_ERP, Warehouse_Service, Personels_Service) {
    $scope.getData_Personels = async function (val) {
        return await Personels_Service.Dropdown(val, 'SO');
    };
});

