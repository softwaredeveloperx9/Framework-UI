"use strict";

angular.module('app.erpUtils').factory('Ownership_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('Ownership', 'OwnershipID asc', 'asc', filterObject, 'OwnershipID, OwnershipName, Description', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'Ownership',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['OwnershipID asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'Ownership',
                fieldNames: ['OwnershipID', 'OwnershipName'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Status', Operator: '=', Value: 'Active' }],
                sortList: ['OwnershipID asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown2 = async function (val) {
            var request = {
                modelName: 'Ownership',
                fieldNames: ['OwnershipID', 'OwnershipName'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Status = 'Active') and ((OwnershipID like '%${val}%') or (OwnershipName like '%${val}%'))`,
                sortList: ['OwnershipID asc'],
            };

            var httpPromise = BackEndService.GetDataListHttpPromise(request);

            return httpPromise.then(
                async function (response) {
                    return response.data.Data;
                },
                async function (response) { }
            );
        };

        service.DataSingle = async function (ownershipID) {
            let request = {
                modelName: 'Ownership',
                criteriaList: [{ PropertyName: 'OwnershipID', Operator: '=', Value: ownershipID }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'OwnershipController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Activate = async function (data) {
            let request = {
                actionController: 'OwnershipController',
                actionName: 'Activate',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.DeActivate = async function (data) {
            let request = {
                actionController: 'OwnershipController',
                actionName: 'DeActivate',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Delete = async function (data) {
            let request = {
                actionController: 'OwnershipController',
                actionName: 'Delete',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);