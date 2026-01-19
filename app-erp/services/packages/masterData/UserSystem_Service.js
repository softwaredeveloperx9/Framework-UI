"use strict";

angular.module('app.erpUtils').factory('UserList_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XSystemUser', 'LastLogin desc', 'desc', filterObject, 'UserName, LinkedEmployee, Role', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XSystemUser',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['UserName asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XSystemUser',
                fieldNames: ['UserName', 'LinkedEmployee'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'UserStatus', Operator: '=', Value: 'true' }],
                sortList: ['UserName asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown2 = async function (val) {
            var request = {
                modelName: 'XSystemUser',
                fieldNames: ['UserName', 'LinkedEmployee'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(UserStatus = 1) and ((UserName like '%${val}%') or (LinkedEmployee like '%${val}%'))`,
                sortList: ['UserName asc'],
            };

            var httpPromise = BackEndService.GetDataListHttpPromise(request);

            return httpPromise.then(
                async function (response) {
                    return response.data.Data;
                },
                async function (response) { }
            );
        };

        service.DataSingle = async function (username) {
            let request = {
                modelName: 'XSystemUser',
                criteriaList: [{ PropertyName: 'UserName', Operator: '=', Value: username }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'SystemUserController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Activate = async function (data) {
            let request = {
                actionController: 'SystemUserController',
                actionName: 'Activate',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.DeActivate = async function (data) {
            let request = {
                actionController: 'SystemUserController',
                actionName: 'DeActivate',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.ResetPassword = async function (data) {
            let request = {
                actionController: 'SystemUserController',
                actionName: 'ResetPassword',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);