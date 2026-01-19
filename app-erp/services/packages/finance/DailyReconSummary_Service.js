"use strict";

angular.module('app.erpUtils').factory('DailyReconSummary_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XDailyReconSummary', 'Date', 'desc', filterObject, 'CashAccount', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XDailyReconSummary',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Date desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XDailyReconSummary',
                fieldNames: ['CashAccount', 'Date'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Date desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_BankAccount = async function () {
            let request = {
                modelName: 'XBankAccount',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (cashAccount, date) {
            let request = {
                modelName: 'XDailyReconSummary',
                criteriaList: [
                    { PropertyName: 'CashAccount', Operator: '=', Value: cashAccount },
                    { PropertyName: 'Date', Operator: '=', Value: date }
                ],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        return service;
    },
]);