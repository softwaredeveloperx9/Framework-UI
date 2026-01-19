"use strict";

angular.module('app.erpUtils').factory('VATBalanceMovement_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XVATBalanceMovement', 'Date', 'desc', filterObject, 'ItemCode, ItemName, VATNr, BRIssuer, BRSubject', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XVATBalanceMovement',
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
                modelName: 'XVATBalanceMovement',
                fieldNames: ['ItemCode', 'ItemName'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['ItemCode asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (itemCode, date) {
            let request = {
                modelName: 'XVATBalanceMovement',
                criteriaList: [
                    { PropertyName: 'ItemCode', Operator: '=', Value: itemCode },
                    { PropertyName: 'Date', Operator: '=', Value: date }
                ],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'VATBalanceMovementController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);