"use strict";

angular.module('app.erpUtils').factory('OrderVerification_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XOrderVerification', 'DocumentNr', 'asc', filterObject, 'CollectType, DocumentNr, ChequeNr, ChequeDueDate, Amount', pageLength, afterRequestData, searchKeyword);
        };

        service.TableAdditional = function (scope) {
            let filterObject = {};
            let pageLength = scope.dtAdditional.pageLength;
            let afterRequestData = scope.afterRequestDataAdditional;
            let searchKeyword = scope.dtAdditional.searchKeyword;

            return DTService.GenerateDTInstance('XOrderVerificationTask', 'Description', 'asc', filterObject, 'Description', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XOrderVerification',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['DocumentNr asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.ListAdditionalTasks = async function () {
            let request = {
                modelName: 'XOrderVerificationTask',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Description asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XOrderVerification',
                fieldNames: ['DocumentNr'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['DocumentNr asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (documentNr) {
            let request = {
                modelName: 'XOrderVerification',
                criteriaList: [{ PropertyName: 'DocumentNr', Operator: '=', Value: documentNr }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'OrderVerificationController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.VerifyDocument = async function (data) {
            let request = {
                actionController: 'OrderVerificationController',
                actionName: 'VerifyDocument',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.FailCollect = async function (data) {
            let request = {
                actionController: 'OrderVerificationController',
                actionName: 'FailCollect',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.CloseCollectOrder = async function (data) {
            let request = {
                actionController: 'OrderVerificationController',
                actionName: 'CloseCollectOrder',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.VerifyAdditionalTask = async function (data) {
            let request = {
                actionController: 'OrderVerificationController',
                actionName: 'VerifyAdditionalTask',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);