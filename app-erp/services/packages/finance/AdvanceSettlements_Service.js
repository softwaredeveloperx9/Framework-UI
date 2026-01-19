"use strict";

angular.module('app.erpUtils').factory('AdvanceSettlements_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XAdvanceSettlement', 'Date', 'desc', filterObject, 'SettlementNo, RequestNo, Description', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XAdvanceSettlement',
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
                modelName: 'XAdvanceSettlement',
                fieldNames: ['SettlementNo'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['SettlementNo desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_ReasonType = async function () {
            let request = {
                modelName: 'XReasonType',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (settlementNo) {
            let request = {
                modelName: 'XAdvanceSettlement',
                criteriaList: [{ PropertyName: 'SettlementNo', Operator: '=', Value: settlementNo }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'AdvanceSettlementController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Verify = async function (settlementNo) {
            let request = {
                actionController: 'AdvanceSettlementController',
                actionName: 'Verify',
                actionParam: { SettlementNo: settlementNo },
            };

            return await BackEndService.RequestAction(request);
        };

        service.Void = async function (settlementNo) {
            let request = {
                actionController: 'AdvanceSettlementController',
                actionName: 'Void',
                actionParam: { SettlementNo: settlementNo },
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);