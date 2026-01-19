"use strict";

angular.module('app.erpUtils').factory('ProofOfDeliveries_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XProofOfDelivery', 'InsertStamp', 'desc', filterObject, 'POD, ManifestNr, Consignee', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XProofOfDelivery',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['POD desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XProofOfDelivery',
                fieldNames: ['POD'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['POD desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (pod) {
            let request = {
                modelName: 'XProofOfDelivery',
                criteriaList: [{ PropertyName: 'POD', Operator: '=', Value: pod }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'ProofOfDeliveryController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);