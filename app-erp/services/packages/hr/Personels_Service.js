'use strict';

angular.module('app.erpUtils').factory('Personels_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (filterObject, pageLength = 5, afterRequestData = null) {
            let modelName = 'XERPFormPersonnel';
            let defaultSortField = 'Name';
            let defaultSortDirection = 'desc';
            let defaultSearchKeyword = 'Name';

            return DTService.GenerateDTInstance(modelName, defaultSortField, defaultSortDirection, filterObject, defaultSearchKeyword, pageLength, afterRequestData);
        };

        service.List = async function () {
            let request = {
                modelName: 'XERPFormPersonnel',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Name asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function (val, module, branchCode = 'PKS', sortedBy = 'Name') {
            let request = {
                modelName: 'XERPFormPersonnel',
                fieldNames: ['PersonelCode', 'Name'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Module = '${module}') and (BranchCode = '${branchCode}') and ((PersonelCode like '%${val}%') or (Name like '%${val}%'))`,
                sortList: [sortedBy + ' asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XERPFormPersonnel',
                criteriaList: [{ PropertyName: 'PersonelCode', Operator: '=', Value: code }],
            };

            let response = await BackEndService.RequestDataSingle(request);

            return response.data;
        };

        service.Save = async function (data) {
            let request = {
                actionController: 'ERPFormPersonnelController',
                actionName: 'Save',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);
