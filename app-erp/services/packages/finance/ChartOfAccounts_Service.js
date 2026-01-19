"use strict";

angular.module('app.erpUtils').factory('ChartOfAccounts_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XFinGLAccount', 'AccountLevel, Description', 'asc', filterObject, 'Code, Description, AccountType, ParentAccount', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XFinGLAccount',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XFinGLAccount',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XFinGLAccount',
                criteriaList: [{ PropertyName: 'Code', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Dropdown_AccountType = async function () {
            // let request = {
            //     modelName: 'XAccountType',
            //     fieldNames: ['Code', 'Name'],
            //     maximumResult: 100,
            //     pageNumber: 1,
            //     criteriaList: [],
            //     sortList: ['Name'],
            // };

            // let response = await BackEndService.RequestDataList(request);

            // return response.data.Data;
            return [];
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'ChartOfAccountController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);