'use strict';

angular.module('app.frmUtils').factory('FRM_Signature', [
    '$location',
    function ($location) {
        var data = {};

        data.Signature = '2026.01.22_03.14 Framework - PAS';
        //data.Signature = '2026.01.21_19.26 Framework - TI';
        //data.Signature = '2026.01.21_19.27 Framework - TIP';
        //data.Signature = '2026.01.21_19.28 Framework - JLD';

        return data;
    },
]);
