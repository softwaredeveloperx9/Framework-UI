'use strict';

angular.module('app.auth').directive('loginInfo', function (User, $rootScope) {
    return {
        restrict: 'A',
        templateUrl: 'app/auth/directives/login-info.tpl.html',
        link: function (scope, element) {
            /*User.initialized.then(function(){
                scope.user = User
            });*/

            scope.user = {
                username: '',
                picture: 'styles/img/avatars/sunny.png',
                activity: 12,
            };
        },
    };
});
