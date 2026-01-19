'use strict';

angular.module('app.erpUtils', ['angular-jwt']);
angular.module('app.erp', ['ui.router', 'ui.bootstrap', 'angular-jwt', 'app.erpUtils']);

angular.module('app.erp').config(function ($stateProvider) {
    $stateProvider
        .state('app.erp', {
            abstract: true,
            data: {
                title: 'ERP',
            },
        })
        .state('app.erp.utama', {
            url: '/erp',
            data: {
                title: 'Halaman Utama',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/utama.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/utama.html',
                },
            },
        });
});