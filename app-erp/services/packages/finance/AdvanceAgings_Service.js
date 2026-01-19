"use strict";

angular.module('app.erpUtils').factory('AdvanceAgings_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XAdvanceAging', 'Personnel', 'asc', filterObject, 'Personnel', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XAdvanceAging',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Personnel asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XAdvanceAging',
                fieldNames: ['Personnel'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Personnel asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (personnel) {
            let request = {
                modelName: 'XAdvanceAging',
                criteriaList: [{ PropertyName: 'Personnel', Operator: '=', Value: personnel }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        return service;
    },
]);