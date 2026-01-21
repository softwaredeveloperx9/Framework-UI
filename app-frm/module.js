'use strict';

angular.module('app.frmUtils', ['angular-jwt']);
angular.module('app.frm', ['ui.router', 'ui.bootstrap', 'angular-jwt', 'app.frmUtils']);

angular.module('app.frm').config(function ($stateProvider) {
    $stateProvider
        .state('app.frm', {
            abstract: true,
            data: {
                title: 'Framework',
            },
        })
        .state('app.frm.utama', {
            url: '/frm',
            data: {
                title: 'Halaman Utama',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/utama.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/utama.html',
                },
            },
        });
});