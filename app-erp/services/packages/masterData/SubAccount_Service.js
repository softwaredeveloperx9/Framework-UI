"use strict";

angular.module('app.erpUtils').factory('SubAccount_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XSubAccount', 'SubAccountCode asc, SubAccountName', 'asc', filterObject, 'SubAccountCode, SubAccountName, COACode, COAName', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XSubAccount',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['SubAccountCode asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XSubAccount',
                fieldNames: ['SubAccountCode', 'SubAccountName', 'COACode', 'COAName'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Status', Operator: '=', Value: 'true' }],
                sortList: ['SubAccountCode asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown2 = async function (val) {
            var request = {
                modelName: 'XSubAccount',
                fieldNames: ['SubAccountCode', 'SubAccountName', 'COACode', 'COAName'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Status = 1) and ((SubAccountCode like '%${val}%') or (SubAccountName like '%${val}%') or (COACode like '%${val}%') or (COAName like '%${val}%'))`,
                sortList: ['SubAccountCode asc'],
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
                modelName: 'XSubAccount',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Status', Operator: '=', Value: 'true' }],
                sortList: ['SubAccountCode asc'],
            };

            let response = await BackEndService.RequestDataList_X(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XSubAccount',
                criteriaList: [{ PropertyName: 'SubAccountCode', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'SubAccountController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Activate = async function (data) {
            let request = {
                actionController: 'SubAccountController',
                actionName: 'Activate',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.DeActivate = async function (data) {
            let request = {
                actionController: 'SubAccountController',
                actionName: 'DeActivate',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);