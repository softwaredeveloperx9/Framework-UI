'use strict';

angular.module('app.erp').config(function ($stateProvider) {
    $stateProvider
        .state('app.erp.sales', {
            url: '/erp/sales',
            data: {
                title: 'Sales',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/_WebPage.html',
                },
            },
        })

        .state('app.erp.salesSalesOrders', {
            url: '/erp/sales/SalesOrders',
            data: {
                title: 'Sales Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesOrders.html',
                },
            },
        })

        ;
});
