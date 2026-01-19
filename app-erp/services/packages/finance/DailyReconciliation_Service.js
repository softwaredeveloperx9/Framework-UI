'use strict';

angular.module('app.erpUtils').factory('DailyReconciliation_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('DailyReconciliation', 'RecordedDate', 'desc', filterObject, 'PaymentNr, Payee, ChequeNr, Notes', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'DailyReconciliation',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['RecordedDate desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_BankAccounts = async function () {
            let request = {
                modelName: 'BankAccount',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.GetBalances = async function (bankAccountCode, clearDate) {
            let request = {
                actionController: 'DailyReconciliationController',
                actionName: 'GetBalances',
                actionParam: {
                    BankAccountCode: bankAccountCode,
                    ClearDate: clearDate
                },
            };

            let response = await BackEndService.RequestAction(request);

            return response.data;
        };

        service.DataSingle = async function (paymentNr) {
            let request = {
                modelName: 'DailyReconciliation',
                criteriaList: [{ PropertyName: 'PaymentNr', Operator: '=', Value: paymentNr }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        return service;
    },
]);
