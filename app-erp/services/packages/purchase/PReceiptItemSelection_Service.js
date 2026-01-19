"use strict";

angular.module('app.erpUtils').factory('PReceiptItemSelection_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XPReceiptItemSelection', 'InsertStamp', 'desc', filterObject, 'Branch, Warehouse, Supplier, Description, ReceiptNr', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XPReceiptItemSelection',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Date desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XPReceiptItemSelection',
                fieldNames: ['ReceiptNr'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['ReceiptNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_ReturnTo = async function () {
            let request = {
                modelName: 'XReturnTo',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_PickupFrom = async function () {
            let request = {
                modelName: 'XPickupFrom',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (receiptNr) {
            let request = {
                modelName: 'XPReceiptItemSelection',
                criteriaList: [{ PropertyName: 'ReceiptNr', Operator: '=', Value: receiptNr }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'PReceiptItemSelectionController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);