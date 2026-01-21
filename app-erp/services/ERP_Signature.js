'use strict';

angular.module('app.erpUtils').factory('ERP_Signature', [
    '$location',
    function ($location) {
        var data = {};

        //data.Signature = '2026.01.21_19.22 Framework - PAS';
        data.Signature = '2026.01.21_19.26 Framework - TI';
        //data.Signature = '2026.01.21_17.04 Framework - TIP';
        //data.Signature = '2026.01.21_17.05 Framework - JLD';

        return data;
    },
]);
