"use strict";

angular.module('app.erpUtils').factory('ReopenOrders_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XReopenOrder', 'InsertStamp', 'desc', filterObject, 'CloseNr, Reason, SO, PO, Branch, Warehouse, Customer, IssuedBy, Status', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XReopenOrder',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['CloseNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XReopenOrder',
                fieldNames: ['CloseNr'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['CloseNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_Reason = async function () {
            let request = {
                modelName: 'XReopenReason',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (closeNr) {
            let request = {
                modelName: 'XReopenOrder',
                criteriaList: [{ PropertyName: 'CloseNr', Operator: '=', Value: closeNr }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'ReopenOrderController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);