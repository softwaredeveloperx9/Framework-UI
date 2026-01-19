'use strict';

angular.module('app.erpUtils').factory('CashTransactions_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('CashTransaction', 'Date', 'desc', filterObject, 'Payment, Type, Description, BR', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'CashTransaction',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Date desc'],
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

        service.Dropdown_TransactionTypes = async function () {
            let request = {
                modelName: 'TransactionType',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (payment) {
            let request = {
                modelName: 'CashTransaction',
                criteriaList: [{ PropertyName: 'Payment', Operator: '=', Value: payment }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'CashTransactionController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Delete = async function (payment) {
            let request = {
                actionController: 'CashTransactionController',
                actionName: 'Delete',
                actionParam: { Payment: payment },
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);
