"use strict";

angular.module('app.erpUtils').factory('PeriodClosing_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XPeriodClosing', 'Year', 'desc', filterObject, 'Year, Period, Branch', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XPeriodClosing',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Year desc', 'Period desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XPeriodClosing',
                fieldNames: ['Year', 'Period'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Year desc', 'Period desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (year, period, branch) {
            let request = {
                modelName: 'XPeriodClosing',
                criteriaList: [
                    { PropertyName: 'Year', Operator: '=', Value: year },
                    { PropertyName: 'Period', Operator: '=', Value: period },
                    { PropertyName: 'Branch', Operator: '=', Value: branch }
                ],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'PeriodClosingController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);