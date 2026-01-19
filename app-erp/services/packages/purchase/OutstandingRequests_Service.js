'use strict';

angular.module('app.erpUtils').factory('OutstandingRequests_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XOutstandingRequest', 'InsertStamp', 'desc', filterObject, 'PRNumber, ReffNumber', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XOutstandingRequest',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['PRNumber desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        return service;
    },
]);
