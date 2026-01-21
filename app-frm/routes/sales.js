'use strict';

angular.module('app.frm').config(function ($stateProvider) {
    $stateProvider
        .state('app.frm.sales', {
            url: '/frm/sales',
            data: {
                title: 'Sales',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/_WebPage.html',
                },
            },
        })

        .state('app.frm.salesSalesOrders', {
            url: '/frm/sales/SalesOrders',
            data: {
                title: 'Sales Orders',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesOrders.html',
                },
            },
        })

        ;
});
