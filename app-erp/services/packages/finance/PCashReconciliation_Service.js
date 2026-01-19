'use strict';

angular.module('app.erpUtils').factory('PCashReconciliation_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('PCashReconciliation', 'RecordedDate', 'desc', filterObject, 'PaymentNr, Payee, ChequeNr, Notes', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'PCashReconciliation',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['RecordedDate desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_CashAccounts = async function () {
            let request = {
                modelName: 'CashAccount',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_Years = async function () {
            // Generate years from current year - 5 to current year + 1
            let currentYear = new Date().getFullYear();
            let years = [];
            for (let i = currentYear - 5; i <= currentYear + 1; i++) {
                years.push(i);
            }
            return years;
        };

        service.Dropdown_Periods = async function (year) {
            let request = {
                modelName: 'AccountingPeriod',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    { PropertyName: 'Year', Operator: '=', Value: year }
                ],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.GetBalances = async function (cashAccountCode, year, period) {
            let request = {
                actionController: 'PCashReconciliationController',
                actionName: 'GetBalances',
                actionParam: {
                    CashAccountCode: cashAccountCode,
                    Year: year,
                    Period: period
                },
            };

            let response = await BackEndService.RequestAction(request);

            return response.data;
        };

        service.UpdateReconcileStatus = async function (paymentNr, reconciled) {
            let request = {
                actionController: 'PCashReconciliationController',
                actionName: 'UpdateReconcileStatus',
                actionParam: {
                    PaymentNr: paymentNr,
                    Reconciled: reconciled
                },
            };

            return await BackEndService.RequestAction(request);
        };

        service.DataSingle = async function (paymentNr) {
            let request = {
                modelName: 'PCashReconciliation',
                criteriaList: [{ PropertyName: 'PaymentNr', Operator: '=', Value: paymentNr }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        return service;
    },
]);
