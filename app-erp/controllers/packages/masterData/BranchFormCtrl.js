angular.module('app.erp').controller('BranchFormCtrl', function ($rootScope, $scope, Utility_ERP, Branch_Service, Personels_Service) {
    $scope.getData_Personels = async function (val) {
        return await Personels_Service.Dropdown(val, 'SO');
    };
});

