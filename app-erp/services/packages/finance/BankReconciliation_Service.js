"use strict";

angular.module('app.erpUtils').factory('BankReconciliation_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XBankReconciliation', 'RecordedDate', 'desc', filterObject, 'PaymentNr, Payee, ChequeNr, Notes', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XBankReconciliation',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['RecordedDate desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XBankReconciliation',
                fieldNames: ['PaymentNr'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['PaymentNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (paymentNr) {
            let request = {
                modelName: 'XBankReconciliation',
                criteriaList: [{ PropertyName: 'PaymentNr', Operator: '=', Value: paymentNr }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.GetBeginningBalance = async function (bankAccountCode, year, period) {
            let request = {
                actionController: 'BankReconciliationController',
                actionName: 'GetBeginningBalance',
                actionParam: {
                    BankAccountCode: bankAccountCode,
                    Year: year,
                    Period: period
                },
            };

            let response = await BackEndService.RequestAction(request);

            return response.data;
        };

        service.UpdateReconciliationStatus = async function (data) {
            let request = {
                actionController: 'BankReconciliationController',
                actionName: 'UpdateReconciliationStatus',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'BankReconciliationController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);