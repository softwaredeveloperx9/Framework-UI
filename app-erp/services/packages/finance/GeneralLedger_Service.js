"use strict";

angular.module('app.erpUtils').factory('GeneralLedger_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XGeneralLedger', 'InsertStamp', 'desc', filterObject, 'JournalNr, Description, ReffNr', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XGeneralLedger',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Date desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XGeneralLedger',
                fieldNames: ['JournalNr'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['JournalNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_Company = async function () {
            let request = {
                modelName: 'XCompany',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_Account = async function () {
            let request = {
                modelName: 'XAccount',
                fieldNames: ['Code', 'Name'],
                maximumResult: 1000,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_SubAccount = async function () {
            let request = {
                modelName: 'XSubAccount',
                fieldNames: ['Code', 'Name', 'AccountCode'],
                maximumResult: 1000,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (journalNr) {
            let request = {
                modelName: 'XGeneralLedger',
                criteriaList: [{ PropertyName: 'JournalNr', Operator: '=', Value: journalNr }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'GeneralLedgerController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);