"use strict";

angular.module('app.erpUtils').factory('InvoiceReceiptItemList_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XInvoiceReceiptItem', 'Date', 'desc', filterObject, 'DocNr, Date, Amount, DueDate, PONr, Comments', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XInvoiceReceiptItem',
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
                modelName: 'XInvoiceReceiptItem',
                fieldNames: ['DocNr'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['DocNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (docNr) {
            let request = {
                modelName: 'XInvoiceReceiptItem',
                criteriaList: [{ PropertyName: 'DocNr', Operator: '=', Value: docNr }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'InvoiceReceiptItemController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);