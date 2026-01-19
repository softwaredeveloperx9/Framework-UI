"use strict";

angular.module('app.erpUtils').factory('PickupOrders_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XPickupOrder', 'InsertStamp', 'desc', filterObject, 'Order, DocNumber', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XPickupOrder',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Order desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XPickupOrder',
                fieldNames: ['Order'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Order desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_DocType = async function () {
            let request = {
                modelName: 'DocumentType',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_PickFrom = async function () {
            let request = {
                modelName: 'PickupLocation',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_ShipTo = async function () {
            let request = {
                modelName: 'ShipmentDestination',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XPickupOrder',
                criteriaList: [{ PropertyName: 'Order', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'PickupOrderController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);