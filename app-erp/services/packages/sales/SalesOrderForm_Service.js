'use strict';

angular.module('app.erpUtils').factory('SalesOrderForm_Service', [
    'SalesOrders_Service',
    function (SalesOrders_Service) {
        var service = angular.extend({}, SalesOrders_Service);

        // var originalSave = service.saveOrder;
        // service.saveOrder = function () {
        //     // do something before
        //     originalSave.call(this);
        //     // do something after
        // };

        return service;
    },
]);
