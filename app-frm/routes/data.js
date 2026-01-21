'use strict';

angular.module('app.frm').config(function ($stateProvider) {
    $stateProvider
        .state('app.frm.data', {
            url: '/frm/data',
            data: {
                title: 'Data',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/data.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/_WebPage.html',
                },
            },
        })

        .state('app.frm.dataOrganization', {
            url: '/frm/data/Organization',
            data: {
                title: 'Organization',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/data.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Organization.html',
                },
            },
        })

        .state('app.frm.dataApplication', {
            url: '/frm/data/Application',
            data: {
                title: 'Application',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/data.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Organization.html',
                },
            },
        })

        .state('app.frm.dataWorkspace', {
            url: '/frm/data/Workspace',
            data: {
                title: 'Workspace',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/data.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Organization.html',
                },
            },
        })

        .state('app.frm.dataScope', {
            url: '/frm/data/Scope',
            data: {
                title: 'Scope',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/data.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Organization.html',
                },
            },
        })

        .state('app.frm.dataUser', {
            url: '/frm/data/User',
            data: {
                title: 'User',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/data.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Organization.html',
                },
            },
        })

        .state('app.frm.dataSession', {
            url: '/frm/data/Session',
            data: {
                title: 'Session',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/data.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Organization.html',
                },
            },
        })

        .state('app.frm.dataSessionDetail', {
            url: '/frm/data/SessionDetail',
            data: {
                title: 'Session Detail',
            },
            views: {
                'frmMenu@app': {
                    templateUrl: 'app-frm/_menu/data.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Organization.html',
                },
            },
        })

        ;
});