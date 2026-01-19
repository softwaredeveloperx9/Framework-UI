"use strict";

angular.module('app.erpUtils').factory('InventoryLease_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XInventoryLease', 'InsertStamp', 'desc', filterObject, 'DocNr, Branch, Warehouse, RequestedBy, Reason, IssuedBy', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XInventoryLease',
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
                modelName: 'XInventoryLease',
                fieldNames: ['DocNr'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['DocNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XInventoryLease',
                criteriaList: [{ PropertyName: 'DocNr', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'InventoryLeaseController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Dropdown_Reason = async function () {
            let request = {
                modelName: 'XLeaseReason',
                fieldNames: ['Code', 'Name'],
                maximumResult: 1000,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        return service;
    },
]);