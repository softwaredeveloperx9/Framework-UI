"use strict";

angular.module('app.erpUtils').factory('CustomerGrade_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('CustomerGrade', 'CustomerGradeCode asc', 'asc', filterObject, 'CustomerGradeCode, CustomerGradeName, Description', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'CustomerGrade',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['CustomerGradeCode asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'CustomerGrade',
                fieldNames: ['CustomerGradeCode', 'CustomerGradeName'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Status', Operator: '=', Value: 'Active' }],
                sortList: ['CustomerGradeCode asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown2 = async function (val) {
            var request = {
                modelName: 'CustomerGrade',
                fieldNames: ['CustomerGradeCode', 'CustomerGradeName'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Status = 'Active') and ((CustomerGradeCode like '%${val}%') or (CustomerGradeName like '%${val}%'))`,
                sortList: ['CustomerGradeCode asc'],
            };

            var httpPromise = BackEndService.GetDataListHttpPromise(request);

            return httpPromise.then(
                async function (response) {
                    return response.data.Data;
                },
                async function (response) { }
            );
        };

        service.DataSingle = async function (customerGradeCode) {
            let request = {
                modelName: 'CustomerGrade',
                criteriaList: [{ PropertyName: 'CustomerGradeCode', Operator: '=', Value: customerGradeCode }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'CustomerGradeController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Activate = async function (data) {
            let request = {
                actionController: 'CustomerGradeController',
                actionName: 'Activate',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.DeActivate = async function (data) {
            let request = {
                actionController: 'CustomerGradeController',
                actionName: 'DeActivate',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Delete = async function (data) {
            let request = {
                actionController: 'CustomerGradeController',
                actionName: 'Delete',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);