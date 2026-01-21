'use strict';

angular.module('app.frmUtils').factory('FRM_Signature', [
    '$location',
    function ($location) {
        var data = {};

        data.Signature = '2026.01.22_06.52 Framework - PAS';
        //data.Signature = '2026.01.22_06.51 Framework - TI';
        //data.Signature = '2026.01.22_03.27 Framework - TIP';
        //data.Signature = '2026.01.22_03.30 Framework - JLD';

        return data;
    },
]);
