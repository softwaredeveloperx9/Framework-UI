"use strict";

angular.module('app.erpUtils').factory('TaxList_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XTax', 'TaxCode asc', 'asc', filterObject, 'TaxCode, TaxName, TaxType, TaxCategory', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XTax',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['TaxCode asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XTax',
                fieldNames: ['TaxCode', 'TaxName', 'TaxRate'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Status', Operator: '=', Value: 'true' }],
                sortList: ['TaxCode asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown2 = async function (val) {
            var request = {
                modelName: 'XTax',
                fieldNames: ['TaxCode', 'TaxName', 'TaxRate'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Status = 1) and ((TaxCode like '%${val}%') or (TaxName like '%${val}%'))`,
                sortList: ['TaxCode asc'],
            };

            var httpPromise = BackEndService.GetDataListHttpPromise(request);

            return httpPromise.then(
                async function (response) {
                    return response.data.Data;
                },
                async function (response) { }
            );
        };

        service.DataSingle = async function (taxCode) {
            let request = {
                modelName: 'XTax',
                criteriaList: [{ PropertyName: 'TaxCode', Operator: '=', Value: taxCode }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'TaxController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Activate = async function (data) {
            let request = {
                actionController: 'TaxController',
                actionName: 'Activate',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.DeActivate = async function (data) {
            let request = {
                actionController: 'TaxController',
                actionName: 'DeActivate',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Delete = async function (data) {
            let request = {
                actionController: 'TaxController',
                actionName: 'Delete',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);