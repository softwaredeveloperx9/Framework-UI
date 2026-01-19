'use strict';

angular.module('app.erpUtils').factory('PickerPersonnels_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XPickerPersonnel', 'InsertStamp', 'desc', filterObject, 'PersonnelName', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function (warehouseCode) {
            let request = {
                modelName: 'XPickerPersonnel',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    { PropertyName: 'WarehouseCode', Operator: '=', Value: warehouseCode }
                ],
                sortList: ['PersonnelName asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_Warehouse = async function () {
            let request = {
                modelName: 'Warehouse',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Save = async function (data) {
            let request = {
                actionController: 'PickerPersonnelController',
                actionName: 'SavePersonnels',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);
