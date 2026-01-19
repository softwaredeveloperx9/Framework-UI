"use strict";

angular.module('app.erpUtils').factory('PurchasePrices_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XPurchasePrice', 'InsertStamp', 'desc', filterObject, 'ItemNumber, Name, Category, Brand, Profile', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XPurchasePrice',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['ItemNumber'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XPurchasePrice',
                fieldNames: ['ItemNumber'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['ItemNumber'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XPurchasePrice',
                criteriaList: [{ PropertyName: 'ItemNumber', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Dropdown_Brand = async function () {
            let request = {
                modelName: 'XBrand',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Name'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_Category = async function () {
            let request = {
                modelName: 'XCategory',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Name'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_Currency = async function () {
            let request = {
                modelName: 'XCurrency',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Name'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Save = async function (data) {
            let request = {
                actionController: 'PurchasePriceController',
                actionName: 'SavePrices',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);