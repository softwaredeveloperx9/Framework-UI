"use strict";

angular.module('app.erpUtils').factory('AddressList_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XSmAddress', 'AddressTypeName, BusinessName', 'asc', filterObject, 'BusinessName, Address, Phone', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XSmAddress',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['BusinessName asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XSmAddress',
                fieldNames: ['Id', 'BusinessName'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['BusinessName asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_AddressType = async function () {
            let request = {
                modelName: 'XSmAddressType',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (id) {
            let request = {
                modelName: 'XSmAddress',
                criteriaList: [{ PropertyName: 'Id', Operator: '=', Value: id }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'BusinessRelationAddressController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Delete = async function (id) {
            let request = {
                actionController: 'BusinessRelationAddressController',
                actionName: 'Delete',
                actionParam: { Id: id },
            };

            return await BackEndService.RequestAction(request);
        };

        service.DownloadSchema = async function () {
            let request = {
                actionController: 'BusinessRelationAddressController',
                actionName: 'DownloadSchema',
                actionParam: {},
            };

            return await BackEndService.RequestAction(request);
        };

        service.Upload = async function (fileData) {
            let request = {
                actionController: 'BusinessRelationAddressController',
                actionName: 'Upload',
                actionParam: { FileData: fileData },
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);