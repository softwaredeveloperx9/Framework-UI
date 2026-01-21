'use strict';

angular.module('app.frmUtils').factory('FRM_Signature', [
    '$location',
    function ($location) {
        var data = {};

        data.Signature = '2026.01.22_06.48 Framework - PAS';
        //data.Signature = '2026.01.22_03.24 Framework - TI';
        //data.Signature = '2026.01.22_03.27 Framework - TIP';
        //data.Signature = '2026.01.22_03.30 Framework - JLD';

        return data;
    },
]);
