'use strict';

angular.module('app.frmUtils').factory('Employee_Service', [
    'BackEndService',
    function (BackEndService) {
        var service = {};

        service.LocationAccess = async function () {
            let request = {
                applicationId: '',
                actionController: 'EmployeeController',
                actionName: 'GetEmployeeLocationAccess',
                actionParam: {},
            };

            let response = await BackEndService.RequestAction(request);
            return response.data.Value;
        };

        service.WarehouseByLocation = async function () {
            let request = {
                applicationId: '',
                actionController: 'EmployeeController',
                actionName: 'GetSalesWarehouseListByLocation',
                actionParam: {},
            };

            let response = await BackEndService.RequestAction(request);
            return response.data.Value;
        };

        service.User_Dropdown = async function (val) {
            let request = {
                modelName: 'XSmUsers',
                fieldNames: ['Code', 'Name'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Active = 1) and ((Code like '%${val}%') or (Name like '%${val}%'))`,
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        return service;
    },
]);
