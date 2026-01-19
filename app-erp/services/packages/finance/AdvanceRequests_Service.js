'use strict';

angular.module('app.erpUtils').factory('AdvanceRequests_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('AdvanceRequest', 'Date', 'desc', filterObject, 'Request, Branch, ReasonType, PaidTo, Description, PaymentNr, SettlementNr', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'AdvanceRequest',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Date desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_ReasonTypes = async function () {
            let request = {
                modelName: 'AdvanceRequestReasonType',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (requestNumber) {
            let request = {
                modelName: 'AdvanceRequest',
                criteriaList: [{ PropertyName: 'Request', Operator: '=', Value: requestNumber }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'AdvanceRequestController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Void = async function (requestNumber) {
            let request = {
                actionController: 'AdvanceRequestController',
                actionName: 'Void',
                actionParam: { Request: requestNumber },
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);
