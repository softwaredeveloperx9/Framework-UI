"use strict";

angular.module('app.erpUtils').factory('DeliveredClosedDoSelection_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XDeliveredClosedDoSelection', 'ShipmentNo', 'desc', filterObject, 'ShipmentNo, Branch, Warehouse', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XDeliveredClosedDoSelection',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['ShipmentNo desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XDeliveredClosedDoSelection',
                fieldNames: ['ShipmentNo'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['ShipmentNo desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (shipmentNo) {
            let request = {
                modelName: 'XDeliveredClosedDoSelection',
                criteriaList: [{ PropertyName: 'ShipmentNo', Operator: '=', Value: shipmentNo }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'DeliveredClosedDoSelectionController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);