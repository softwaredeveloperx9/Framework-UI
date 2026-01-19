"use strict";

angular.module('app.erpUtils').factory('CollectRequestSelection_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XCollectRequestSelection', 'InsertStamp', 'desc', filterObject, 'DocNr, Type, Address, ReffNr, Notes', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XCollectRequestSelection',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['DocNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XCollectRequestSelection',
                fieldNames: ['DocNr'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['DocNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_DocType = async function () {
            let request = {
                modelName: 'DocType',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (docNr) {
            let request = {
                modelName: 'XCollectRequestSelection',
                criteriaList: [{ PropertyName: 'DocNr', Operator: '=', Value: docNr }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'CollectRequestSelectionController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);