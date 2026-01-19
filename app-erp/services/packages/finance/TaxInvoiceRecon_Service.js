"use strict";

angular.module('app.erpUtils').factory('TaxInvoiceRecon_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XTaxInvoice', 'InsertStamp', 'desc', filterObject, 'InvoiceNumber, PONumber, Customer', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XTaxInvoice',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['InvoiceNumber desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XTaxInvoice',
                fieldNames: ['InvoiceNumber'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['InvoiceNumber desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (invoiceNumber) {
            let request = {
                modelName: 'XTaxInvoice',
                criteriaList: [{ PropertyName: 'InvoiceNumber', Operator: '=', Value: invoiceNumber }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'TaxInvoiceController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);