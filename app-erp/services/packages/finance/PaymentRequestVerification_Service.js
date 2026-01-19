"use strict";

angular.module('app.erpUtils').factory('PaymentRequestVerification_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XPaymentRequest', 'Request', 'asc', filterObject, 'Request, ReasonType, Description, Amount, RequiredDate, PayFrom, PaymentMethod, Notes', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XPaymentRequest',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Request asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XPaymentRequest',
                fieldNames: ['Request'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Request asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (request) {
            let requestObj = {
                modelName: 'XPaymentRequest',
                criteriaList: [{ PropertyName: 'Request', Operator: '=', Value: request }],
            };

            return await BackEndService.RequestDataSingle(requestObj);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'PaymentRequestController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.VerifyAdvanceRequest = async function (data) {
            let request = {
                actionController: 'PaymentRequestController',
                actionName: 'VerifyAdvanceRequest',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);