"use strict";

angular.module('app.erpUtils').factory('ClearingRecon_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XClearingRecon', 'CollectDate', 'desc', filterObject, 'DocNr, Customer, ReffNr', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XClearingRecon',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['CollectDate desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XClearingRecon',
                fieldNames: ['DocNr'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['DocNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_CollectType = async function () {
            let request = {
                modelName: 'XCollectType',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (docNr) {
            let request = {
                modelName: 'XClearingRecon',
                criteriaList: [{ PropertyName: 'DocNr', Operator: '=', Value: docNr }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'ClearingReconController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Verify = async function (docNr) {
            let request = {
                actionController: 'ClearingReconController',
                actionName: 'Verify',
                actionParam: { DocNr: docNr },
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);