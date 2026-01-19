'use strict';

angular
    .module('app.layout', ['ui.router'])

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('app', {
            abstract: true,
            views: {
                root: {
                    templateUrl: 'app/layout/layout.tpl.html',
                },
            },
        });

        var ERP_CurrentUser = false;
        let appPath = '';

        // load from LocalStorage
        try {
            let pathSegments = window.location.pathname.split('/');
            appPath = pathSegments[1]; // Gets 'newdev', 'new', 'xpdev', or 'xp'

            if (!appPath) appPath = 'localmachine';

            appPath += '_';

            let x = localStorage.getItem(appPath);
            let ERP = JSON.parse(x) || {};

            if (ERP.currentUser) ERP_CurrentUser = true;
        } catch (e) { }

        if (ERP_CurrentUser) {
            $urlRouterProvider.otherwise('/erp/sales/SalesOrders');
        } else {
            localStorage.setItem(appPath + 'logout', 'true');

            $urlRouterProvider.otherwise('/login');
        }
    });
