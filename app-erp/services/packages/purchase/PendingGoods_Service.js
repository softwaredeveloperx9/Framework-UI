'use strict';

angular.module('app.erpUtils').factory('PendingGoods_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XPendingGoods', 'InsertStamp', 'desc', filterObject, 'PONr', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XPendingGoods',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['PONr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown_Brand = async function () {
            let request = {
                modelName: 'Brand',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        return service;
    },
]);
