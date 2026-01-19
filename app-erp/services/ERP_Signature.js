'use strict';

angular.module('app.erpUtils').factory('ERP_Signature', [
    '$location',
    function ($location) {
        var data = {};

        data.Signature = '2026.01.13_22.52';

        return data;
    },
]);
