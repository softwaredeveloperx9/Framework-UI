'use strict';

angular.module('app.erpUtils').factory('ERP_Signature', [
    '$location',
    function ($location) {
        var data = {};

        data.Signature = '2026.01.21_18.35 Framework - PAS';
        //data.Signature = '2026.01.21_18.29 Framework - TI';
        //data.Signature = '2026.01.21_17.04 Framework - TIP';
        //data.Signature = '2026.01.21_17.05 Framework - JLD';

        return data;
    },
]);
