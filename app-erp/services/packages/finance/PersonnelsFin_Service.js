"use strict";

angular.module('app.erpUtils').factory('PersonnelsFin_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XPersonnel', 'No', 'asc', filterObject, 'No, Personnel', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XPersonnel',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['No'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XPersonnel',
                fieldNames: ['No', 'Personnel'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['No'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (no) {
            let request = {
                modelName: 'XPersonnel',
                criteriaList: [{ PropertyName: 'No', Operator: '=', Value: no }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data) {
            let request = {
                actionController: 'PersonnelController',
                actionName: 'SavePersonnels',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);