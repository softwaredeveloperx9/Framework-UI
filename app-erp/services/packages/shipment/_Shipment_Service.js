'use strict';

angular.module('app.erpUtils').factory('Shipment_Service', [
    'BackEndService',
    /*'DLCarrier_Service',
    'DLCarrierType_Service',
    'DLPickerPersonnel_Service',
    'DLManifest_Service',
    'DTService',*/
    function (BackEndService/*, DLCarrier_Service, DLCarrierType_Service, DLPickerPersonnel_Service, DLManifest_Service, DTService*/) {
        var service = {};

        service.Dropdown_Carrier = async function () {
            //return await DLCarrier_Service.Dropdown();
        };

        service.Dropdown_Carrier2 = async function (typeCode) {
            //return await DLCarrier_Service.Carrier(typeCode);
        };

        service.Dropdown_CarrierType = async function () {
            //return await DLCarrierType_Service.Dropdown();
        };

        service.Dropdown_PickerPersonnel = async function () {
            //return await DLPickerPersonnel_Service.Dropdown();
        };

        service.Dropdown_PersonCarrier = async function (carrierCode) {
            //return await DLPickerPersonnel_Service.PersonCarrier(carrierCode);
        };

        service.Dropdown_Manifest = async function () {
            //return await DLManifest_Service.Dropdown();
        };

        service.Dropdown_Manifest2 = async function (filters) {
            //return await DLManifest_Service.Dropdown2(filters);
        };

        service.Dropdown_RouteTagNumber = async function (manifestCode) {
            return await DLManifest_Service.Dropdown_RouteTagNumber(manifestCode);
        };

        service.Dropdown_StockingType = async function () {
            let request = {
                modelName: 'XInvStockingType',
                fieldNames: ['Id', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Stockable', Operator: '=', Value: 'true' }],
                sortList: ['Id asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_ReferenceType = async function () {
            var request = {
                modelName: 'XShipmentReferenceType',
                fieldNames: ['Id', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'Active',
                        Operator: '=',
                        Value: true,
                    },
                ],
                sortList: ['Id asc'],
            };

            let response = {
                data: {
                    Data: [{ Id: 1, Name: 'SO D/R' }],
                },
            };

            // TODO

            //let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Table_PackingListDetail = function (filterObject, pageLength = 10, afterRequestData = null) {
            let modelName = 'XDLShipmentPackingListDetail';
            let defaultSortField = 'PackingCode asc, Number';
            let defaultSortDirection = 'desc';
            let defaultSearchKeyword = 'ItemCode';

            return DTService.GenerateDTInstance(modelName, defaultSortField, defaultSortDirection, filterObject, defaultSearchKeyword, pageLength, afterRequestData);
        };

        service.getData_DeliveryAction = async function () {
            var request = {
                modelName: 'XShipmentDeliveryAction',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'Active',
                        Operator: '=',
                        Value: true,
                    },
                ],
                sortList: ['OrderID asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_Type = async function () {
            var request = {
                modelName: 'XType',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'Active',
                        Operator: '=',
                        Value: true,
                    },
                ],
                sortList: ['Code asc'],
            };

            let response = {
                data: {
                    Data: [
                        { Code: '01', Name: 'Delivery' },
                        { Code: '02', Name: 'Pickup' },
                        { Code: '03', Name: 'Pick & Deliver' },
                    ],
                },
            };

            // TODO

            //let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_Source = async function () {
            var request = {
                modelName: 'XSource',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'Active',
                        Operator: '=',
                        Value: true,
                    },
                ],
                sortList: ['Code asc'],
            };

            let response = {
                data: {
                    Data: [
                        { Code: '4', Name: 'S/O' },
                        { Code: '8', Name: 'Pickup Order' },
                        { Code: '10', Name: 'Ret. D/O' },
                        { Code: '11', Name: 'Transfer' },
                    ],
                },
            };

            // TODO

            //let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_ShipmentStatus = async function () {
            var request = {
                modelName: 'XShipmentStatus',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'Active',
                        Operator: '=',
                        Value: true,
                    },
                ],
                sortList: ['Code asc'],
            };

            let response = {
                data: {
                    Data: [
                        { Code: '01', Name: 'Emergency' },
                        { Code: '02', Name: 'Normal' },
                    ],
                },
            };

            // TODO

            //let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.RequestInvoice = async function (data) {
            let request = {
                actionController: 'HandlerShipmentOrder',
                actionName: 'RequestInvoice',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);

            return response.data.Value.Data;
        };

        service.Dropdown_AddToManifest = async function () {
            let request = {
                modelName: 'XShipmentManifests',
                fieldNames: ['Code'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    { PropertyName: 'Active', Operator: '=', Value: true },
                    { PropertyName: 'StatusId', Operator: '=', Value: 1 },
                ],
                sortList: ['Code desc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.GetManifestInformation = async function (code) {
            let request = {
                modelName: 'XDLManifest',
                criteriaList: [{ PropertyName: 'Code', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };

        service.Dropdown_Role = async function () {
            var request = {
                modelName: 'XRole',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'Active',
                        Operator: '=',
                        Value: true,
                    },
                ],
                sortList: ['Code asc'],
            };

            let response = {
                data: {
                    Data: [
                        { Code: 'Helper', Description: 'Helper' },
                        { Code: 'Driver', Description: 'Driver' },
                    ],
                },
            };

            // TODO

            //let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        return service;
    },
]);
