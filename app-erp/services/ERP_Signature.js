'use strict';

angular.module('app.erpUtils').factory('ERP_Signature', [
    '$location',
    function ($location) {
        var data = {};

        data.Signature = '2026.01.21_17.57 UI - PAS';
        //data.Signature = '2026.01.20_10.03 UI - TI';
        //data.Signature = '2026.01.20_10.04 UI - TIP';
        //data.Signature = '2026.01.20_10.05 UI - JLD';

        return data;
    },
]);
