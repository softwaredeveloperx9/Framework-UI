'use strict';

angular.module('app.frmUtils').factory('FRM_Signature', [
    '$location',
    function ($location) {
        var data = {};

        data.Signature = '2026.01.23_01.20 Framework - PAS';
        //data.Signature = '2026.01.22_06.55 Framework - TI';
        //data.Signature = '2026.01.22_06.57 Framework - TIP';
        //data.Signature = '2026.01.22_06.59 Framework - JLD';

        return data;
    },
]);
