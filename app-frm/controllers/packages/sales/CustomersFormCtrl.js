angular.module('app.erp').controller('CustomersFormCtrl', function ($rootScope, $scope, $state, Utility_ERP, Customers_Service) {
    $scope.goBack = function (stateName) {
        var currentState = $state.current.name;

        var listState = currentState.replace('Form', '');

        if ($state.get(listState)) {
            $state.go(listState);
        } else {
            $state.go(stateName);
        }
    };
});