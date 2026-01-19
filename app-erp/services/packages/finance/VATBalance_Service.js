"use strict";

angular.module('app.erpUtils').factory('VATBalance_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XVATBalance', 'InsertStamp', 'desc', filterObject, 'ItemCode, ItemName, Brand, Category', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XVATBalance',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['ItemCode desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XVATBalance',
                fieldNames: ['ItemCode'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['ItemCode desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XVATBalance',
                criteriaList: [{ PropertyName: 'ItemCode', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'VATBalanceController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);