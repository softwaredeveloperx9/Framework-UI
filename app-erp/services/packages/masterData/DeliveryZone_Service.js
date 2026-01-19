"use strict";

angular.module('app.erpUtils').factory('DeliveryZone_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XDeliveryZone', 'Code asc, Name', 'asc', filterObject, 'Code, Name', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XDeliveryZone',
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
                modelName: 'XDeliveryZone',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Status', Operator: '=', Value: 'true' }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown2 = async function (val) {
            var request = {
                modelName: 'XDeliveryZone',
                fieldNames: ['Code', 'Name'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Status = 1) and ((Code like '%${val}%') or (Name like '%${val}%'))`,
                sortList: ['Code asc'],
            };

            var httpPromise = BackEndService.GetDataListHttpPromise(request);

            return httpPromise.then(
                async function (response) {
                    return response.data.Data;
                },
                async function (response) { }
            );
        };

        service.Dropdown3 = async function () {
            let request = {
                modelName: 'XDeliveryZone',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Status', Operator: '=', Value: 'true' }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList_X(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XDeliveryZone',
                criteriaList: [{ PropertyName: 'Code', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'DeliveryZoneController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Activate = async function (data) {
            let request = {
                actionController: 'DeliveryZoneController',
                actionName: 'Activate',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.DeActivate = async function (data) {
            let request = {
                actionController: 'DeliveryZoneController',
                actionName: 'DeActivate',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);