"use strict";

angular.module('app.erpUtils').factory('Customers_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XSmBusinessRelation', 'Code', 'asc', filterObject, 'Code, Name, Category', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_BusinessLine = async function () {
            let request = {
                modelName: 'XBRLine',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_Title = async function () {
            let request = {
                modelName: 'XBRTitle',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_Category = async function () {
            let request = {
                modelName: 'XBRClass',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_Group = async function () {
            let request = {
                modelName: 'XBRGroup',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XSmBusinessRelation',
                criteriaList: [{ PropertyName: 'Code', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'BusinessRelationController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Void = async function (codes) {
            let request = {
                actionController: 'BusinessRelationController',
                actionName: 'Void',
                actionParam: { Codes: codes },
            };

            return await BackEndService.RequestAction(request);
        };

        service.Delete = async function (codes) {
            let request = {
                actionController: 'BusinessRelationController',
                actionName: 'Delete',
                actionParam: { Codes: codes },
            };

            return await BackEndService.RequestAction(request);
        };

        service.DownloadSchema = async function () {
            let request = {
                actionController: 'BusinessRelationController',
                actionName: 'DownloadSchema',
                actionParam: {},
            };

            return await BackEndService.RequestAction(request);
        };

        service.Upload = async function (fileData) {
            let request = {
                actionController: 'BusinessRelationController',
                actionName: 'Upload',
                actionParam: { FileData: fileData },
            };

            return await BackEndService.RequestAction(request);
        };

        service.ExportToExcel = async function (filters) {
            let request = {
                actionController: 'BusinessRelationController',
                actionName: 'ExportToExcel',
                actionParam: { Filters: filters },
            };

            return await BackEndService.RequestAction(request);
        };

        service.SynchToCircle = async function () {
            let request = {
                actionController: 'BusinessRelationController',
                actionName: 'SynchToCircle',
                actionParam: {},
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);