"use strict";

angular.module('app.erpUtils').factory('BankReconSummary_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XBankReconSummary', 'Year', 'desc', filterObject, 'CashAccount', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XBankReconSummary',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Year desc', 'Period desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XBankReconSummary',
                fieldNames: ['CashAccount', 'Year', 'Period'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Year desc', 'Period desc'],
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

        service.DataSingle = async function (cashAccount, year, period) {
            let request = {
                modelName: 'XBankReconSummary',
                criteriaList: [
                    { PropertyName: 'CashAccount', Operator: '=', Value: cashAccount },
                    { PropertyName: 'Year', Operator: '=', Value: year },
                    { PropertyName: 'Period', Operator: '=', Value: period }
                ],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        return service;
    },
]);