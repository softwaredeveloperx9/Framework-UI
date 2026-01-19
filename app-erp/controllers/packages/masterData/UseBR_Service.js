'use strict';

angular.module('app.erpUtils').factory('UseBR_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        service.Table = function (filterObject, pageLength = 5, afterRequestData = null) {
            let modelName = 'XSmBusinessRelation';
            let defaultSortField = 'Name';
            let defaultSortDirection = 'asc';
            let defaultSearchKeyword = 'Code, Name';

            return DTService.GenerateDTInstance(modelName, defaultSortField, defaultSortDirection, filterObject, defaultSearchKeyword, pageLength, afterRequestData);
        };

        service.List = async function () {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Dropdown = async function () {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['Code', 'Description', 'ShortName'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: 'true' }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.DataSingle = async function (code) {
            let request = {
                modelName: 'XSmBusinessRelationR',
                criteriaList: [{ PropertyName: 'Code', Operator: '=', Value: code }],
            };

            let response = await BackEndService.RequestDataSingle(request);

            return response.data;
        };

        service.Save = async function (data) {
            let request = {
                actionController: 'CustomerController',
                actionName: 'Save',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        service.getData_AddressItem = async function (code) {
            let request = {
                modelName: 'XSmAddress',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'BusinessRelationCode', Operator: '=', Value: code }],
                sortList: ['AddressTypeCode asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_ContactItem = async function () {
            let ContactMapping = [
                {
                    TypeCode: 'BLG',
                    Name: 'Jowo Wirawan',
                    Gender: 'M',
                    Position: 'Direktur',
                    PhoneNumber: '021-8990 2828',
                    FaxNumber: '021-8990 9999',
                    EmailAddress: 'harmonijayasejahtera@gmail.com',
                    Number: 1,

                    XCode: '',
                    ExistingItem: false,
                    Deleted: false,
                    recordNumber: 0,
                    processRecord: false,
                    selectedData: '',
                    XContactCode: '',
                },
            ];

            let response = {
                data: {
                    Data: ContactMapping,
                },
            };

            return response.data.Data;
        };

        service.getData_Gender = async function () {
            var request = {
                modelName: 'XGender',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = {
                data: {
                    Data: [
                        {
                            Code: 'M',
                            Name: 'Male',
                        },
                        {
                            Code: 'F',
                            Name: 'Female',
                        },
                    ],
                },
            };

            // TODO
            // successCallBack(response);

            //let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_BankItem = async function (code) {
            let BankMapping = [
                {
                    BRCode: 'H/0052',
                    BankAccountNumber: '0001',
                    InfoLine1: 'HARMONI JAYA SEJAHTERA',
                    InfoLine2: 'BRI',
                    XCode: '',
                    ExistingItem: false,
                    Deleted: false,
                    recordNumber: 0,
                    processRecord: false,
                    selectedData: '',
                    XBankCode: '',
                },
            ];

            try {
                let filteredData = BankMapping.filter((item) => item.BRCode === code);

                if (filteredData.length === 0) {
                    throw new Error('Data not found for the given code: ' + code);
                }

                let response = {
                    data: {
                        Data: filteredData,
                    },
                };

                return response.data.Data;
            } catch (error) { }
        };

        service.getData_TaxZone = async function (code) {
            var request = {
                modelName: 'XTaxZone',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = {
                data: {
                    Data: [
                        {
                            Code: '01',
                            Description: 'Non Ppn',
                        },
                        {
                            Code: '02',
                            Description: 'Ppn',
                        },
                    ],
                },
            };

            // TODO
            // successCallBack(response);

            //let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_WarehouseItem = async function (code) {
            let WarehouseMapping = [
                {
                    BRCode: 'H/0052',
                    WarehouseCode: 'JTGL',
                    WarehouseName: 'J Tegal',
                    XCode: '',
                    ExistingItem: false,
                    Deleted: false,
                    recordNumber: 0,
                    processRecord: false,
                    selectedData: '',
                    XWarehouseCode: '',
                },
                {
                    BRCode: 'H/0052',
                    WarehouseCode: 'PBGR',
                    WarehouseName: 'P Bogor',
                    XCode: '',
                    ExistingItem: false,
                    Deleted: false,
                    recordNumber: 0,
                    processRecord: false,
                    selectedData: '',
                    XWarehouseCode: '',
                },
                {
                    BRCode: 'H/0052',
                    WarehouseCode: 'DS',
                    WarehouseName: 'DS (Obsolete)',
                    XCode: '',
                    ExistingItem: false,
                    Deleted: false,
                    recordNumber: 0,
                    processRecord: false,
                    selectedData: '',
                    XWarehouseCode: '',
                },
            ];

            try {
                let filteredData = WarehouseMapping.filter((item) => item.BRCode === code);

                if (filteredData.length === 0) {
                    throw new Error('Data not found for the given code: ' + code);
                }

                let response = {
                    data: {
                        Data: filteredData,
                    },
                };

                return response.data.Data;
            } catch (error) { }
        };

        service.getData_CustomerType = async function () {
            var request = {
                modelName: 'XCustomerType',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = {
                data: {
                    Data: [
                        {
                            Code: '01',
                            Name: 'Toko',
                        },
                        {
                            Code: 'CM',
                            Name: 'Construction Management',
                        },
                        {
                            Code: 'CS',
                            Name: 'Consultant',
                        },
                        {
                            Code: 'DS',
                            Name: 'Distributor',
                        },
                        {
                            Code: 'DV',
                            Name: 'Developer',
                        },
                        {
                            Code: 'MC',
                            Name: 'Main Contractor',
                        },
                    ],
                },
            };

            // TODO
            // successCallBack(response);

            //let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_BusinessLine = async function () {
            var request = {
                modelName: 'XBusinessLine',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = {
                data: {
                    Data: [
                        {
                            Code: 'HR',
                            Description: 'High Rise Building',
                        },
                        {
                            Code: 'IF',
                            Description: 'Infrastructure',
                        },
                        {
                            Code: 'IN',
                            Description: 'Industrial',
                        },
                        {
                            Code: 'MN',
                            Description: 'Mining',
                        },
                        {
                            Code: 'OG',
                            Description: 'Oil and Gas',
                        },
                        {
                            Code: 'PN',
                            Description: 'Plantation',
                        },
                        {
                            Code: 'RS',
                            Description: 'Residential',
                        },
                    ],
                },
            };

            // TODO
            // successCallBack(response);

            //let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_BusinessRelationGroup = async function () {
            var request = {
                modelName: 'XBusinessRelationGroup',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = {
                data: {
                    Data: [
                        {
                            Code: 'Group 1',
                            Description: 'keterangan Group 1',
                        },
                    ],
                },
            };

            // TODO
            // successCallBack(response);

            //let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_BusinessRelationTitle = async function () {
            var request = {
                modelName: 'XBusinessRelationTitle',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = {
                data: {
                    Data: [
                        {
                            Code: '01',
                            Description: 'PD',
                        },
                        {
                            Code: '02',
                            Description: 'TB',
                        },
                        {
                            Code: '03',
                            Description: 'Toko',
                        },
                        {
                            Code: '04',
                            Description: 'UD',
                        },
                        {
                            Code: '05',
                            Description: 'PT',
                        },
                        {
                            Code: '06',
                            Description: 'PB',
                        },
                        {
                            Code: '07',
                            Description: 'CV',
                        },
                    ],
                },
            };

            // TODO
            // successCallBack(response);

            //let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_CorporateSize = async function () {
            var request = {
                modelName: 'XCorporateSize',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [],
                sortList: ['Code asc'],
            };

            let response = {
                data: {
                    Data: [
                        {
                            Code: 'small',
                            Description: 'Small',
                        },
                        {
                            Code: 'medium',
                            Description: 'Medium',
                        },
                        {
                            Code: 'enterprise',
                            Description: 'Enterprise',
                        },
                    ],
                },
            };

            // TODO
            // successCallBack(response);

            //let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.List_Privacy = async function (code) {
            let request = {
                modelName: 'XSmBusinessRelationLocationR',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'BRCode', Operator: '=', Value: code }],
                sortList: ['Name asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        return service;
    },
]);
