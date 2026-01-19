"use strict";

angular.module('app.erpUtils').factory('IsolationVerification_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XIsolationVerification', 'ItemCode', 'asc', filterObject, 'ItemCode, Description', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XIsolationVerification',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['ItemCode asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XIsolationVerification',
                fieldNames: ['ItemCode'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['ItemCode asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (itemCode) {
            let request = {
                modelName: 'XIsolationVerification',
                criteriaList: [{ PropertyName: 'ItemCode', Operator: '=', Value: itemCode }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'IsolationVerificationController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);