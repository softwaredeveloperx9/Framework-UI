"use strict";

angular.module('app.erpUtils').factory('OutstandingOrdersPur_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XOutstandingPurchaseOrder', 'InsertStamp', 'desc', filterObject, 'PONumber, Branch, Warehouse', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XOutstandingPurchaseOrder',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['PONumber desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XOutstandingPurchaseOrder',
                fieldNames: ['PONumber'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['PONumber desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XOutstandingPurchaseOrder',
                criteriaList: [{ PropertyName: 'PONumber', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        return service;
    },
]);