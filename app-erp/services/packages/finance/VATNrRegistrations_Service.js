"use strict";

angular.module('app.erpUtils').factory('VATNrRegistrations_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (scope) {
            let filterObject = scope.filters;
            let pageLength = scope.dt.pageLength;
            let afterRequestData = scope.afterRequestData;
            let searchKeyword = scope.searchKeyword;

            return DTService.GenerateDTInstance('XVATNrRegistration', 'RegistrationNr', 'desc', filterObject, 'RegistrationNr, Branch, IssuedBy', pageLength, afterRequestData, searchKeyword);
        };

        service.List = async function () {
            let request = {
                modelName: 'XVATNrRegistration',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['RegistrationNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XVATNrRegistration',
                fieldNames: ['RegistrationNr', 'Branch'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['RegistrationNr desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (registrationNr) {
            let request = {
                modelName: 'XVATNrRegistration',
                criteriaList: [{ PropertyName: 'RegistrationNr', Operator: '=', Value: registrationNr }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Save = async function (data, Is_Create) {
            let request = {
                actionController: 'VATNrRegistrationController',
                actionName: Is_Create ? 'Create' : 'Update',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.Dispose = async function (registrationNr) {
            let request = {
                actionController: 'VATNrRegistrationController',
                actionName: 'Dispose',
                actionParam: { RegistrationNr: registrationNr },
            };

            return await BackEndService.RequestAction(request);
        };

        return service;
    },
]);