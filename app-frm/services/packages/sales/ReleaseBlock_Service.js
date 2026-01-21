'use strict';

angular.module('app.erpUtils').factory('ReleaseBlock_Service', [
    'Customers_Service',
    function (Customers_Service) {
        var service = angular.extend({}, Customers_Service);

        return service;
    },
]);
