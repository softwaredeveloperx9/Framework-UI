"use strict";

angular.module('app.erpUtils').factory('ReceivableAgings_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XReceivableAging', 'Customer', 'asc', filterObject, 'Customer', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XReceivableAging',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Customer asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XReceivableAging',
                fieldNames: ['Customer'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Customer asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (customer) {
            let request = {
                modelName: 'XReceivableAging',
                criteriaList: [{ PropertyName: 'Customer', Operator: '=', Value: customer }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        return service;
    },
]);