"use strict";

angular.module('app.erpUtils').factory('TransferRequests_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XTransferRequest', 'RequestNr', 'desc', filterObject, 'RequestNr, Branch, FromWH, DestWH', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XTransferRequest',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['RequestNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XTransferRequest',
                fieldNames: ['RequestNr'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['RequestNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XTransferRequest',
                criteriaList: [{ PropertyName: 'RequestNr', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        return service;
    },
]);