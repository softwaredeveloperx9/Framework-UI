"use strict";

angular.module('app.erpUtils').factory('SalesOrderType_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XSalesOrderType', 'Code', 'asc', filterObject, 'Code, Description', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XSalesOrderType',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XSalesOrderType',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XSalesOrderType',
                criteriaList: [{ PropertyName: 'Code', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'XSalesOrderTypeController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Activate = async function (codes) {
            let request = {
                actionController: 'XSalesOrderTypeController',
                actionName: 'Activate',
                actionParam: { Codes: codes },
            };

            return await BackEndService.RequestAction(request);
        };

        service.Deactivate = async function (codes) {
            let request = {
                actionController: 'XSalesOrderTypeController',
                actionName: 'Deactivate',
                actionParam: { Codes: codes },
            };

            return await BackEndService.RequestAction(request);
        };

        service.ExportToExcel = async function (filters) {
            let request = {
                actionController: 'XSalesOrderTypeController',
                actionName: 'ExportToExcel',
                actionParam: { Filters: filters },
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);