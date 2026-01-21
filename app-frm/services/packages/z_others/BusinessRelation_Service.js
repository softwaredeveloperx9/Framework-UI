'use strict';

angular.module('app.frmUtils').factory('BusinessRelation_Service', [
    'BackEndService',
    function (BackEndService) {
        var service = {};

        service.getData_BusinessRelation = async function (code, fieldNames = ['*']) {
            let request = {
                modelName: 'XSmBusinessRelationR',
                criteriaList: [{ PropertyName: 'Code', Operator: '=', Value: code }],
                fieldNames: fieldNames,
            };

            return BackEndService.RequestDataSingle(request);
        };

        service.Customer_Dropdown = async function (val, locationCode = '', locationOperator = '=') {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['Code', 'Name', 'StatusId', 'StatusName'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Active = 1) and (IsCustomer = 1) and ((Code like '%${val}%') or (Name like '%${val}%'))`,
                sortList: ['Code asc'],
            };

            if (locationCode != '' && locationCode != `('')`) {
                // "Bungkus" nilai locationCode dengan Tanda Petik
                if (!locationCode.startsWith('(')) locationCode = `'${locationCode}'`;

                // tambahkan ke criteria
                request.SQLCriteria += ` and LocationCode ${locationOperator} ${locationCode}`;
            }

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Personel_Dropdown = async function (val, locationCode = '', locationOperator = '=') {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['Code', 'Name', 'StatusId', 'StatusName'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Active = 1) and (IsPersonnel = 1) and ((Code like '%${val}%') or (Name like '%${val}%'))`,
                sortList: ['Code asc'],
            };

            if (locationCode != '' && locationCode != `('')`) {
                // "Bungkus" nilai locationCode dengan Tanda Petik
                if (!locationCode.startsWith('(')) locationCode = `'${locationCode}'`;

                // tambahkan ke criteria
                request.SQLCriteria += ` and LocationCode ${locationOperator} ${locationCode}`;
            }

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_Customer = async function (val, locationCode = '', locationOperator = '=') {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['Code', 'Name', 'StatusId', 'StatusName'],
                maximumResult: 20,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'Active',
                        Operator: '=',
                        Value: true,
                    },
                    {
                        PropertyName: 'IsCustomer',
                        Operator: '=',
                        Value: true,
                    },
                    {
                        PropertyName: 'Name',
                        Operator: 'like',
                        Value: '%' + val + '%',
                    },
                ],
                sortList: ['Name asc'],
            };

            if (locationCode != '' && locationCode != `('')`) {
                request.criteriaList.push({
                    PropertyName: 'LocationCode',
                    Operator: locationOperator,
                    Value: locationCode,
                });
            }

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.Supplier_Dropdown = async function (val, locationCode = '', locationOperator = '=') {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['Code', 'Name', 'StatusId', 'StatusName'],
                maximumResult: 20,
                pageNumber: 1,
                SQLCriteria: `(Active = 1) and (IsSupplier = 1) and ((Code like '%${val}%') or (Name like '%${val}%'))`,
                sortList: ['Code asc'],
            };

            if (locationCode != '' && locationCode != `('')`) {
                // "Bungkus" nilai locationCode dengan Tanda Petik
                if (!locationCode.startsWith('(')) locationCode = `'${locationCode}'`;

                // tambahkan ke criteria
                request.SQLCriteria += ` and LocationCode ${locationOperator} ${locationCode}`;
            }

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_Supplier = async function (val, locationCode = '', locationOperator = '=') {
            let request = {
                modelName: 'XSmBusinessRelation',
                fieldNames: ['Code', 'Name', 'StatusId', 'StatusName'],
                maximumResult: 20,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'Active',
                        Operator: '=',
                        Value: true,
                    },
                    {
                        PropertyName: 'IsSupplier',
                        Operator: '=',
                        Value: true,
                    },

                    {
                        PropertyName: 'Name',
                        Operator: 'like',
                        Value: '%' + val + '%',
                    },
                ],
                sortList: ['Name asc'],
            };

            if (locationCode != '' && locationCode != `('')`) {
                request.criteriaList.push({
                    PropertyName: 'LocationCode',
                    Operator: locationOperator,
                    Value: locationCode,
                });
            }

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.GetBusinessRelationBillingAddressNames = async function (brCode) {
            let request = {
                modelName: 'XSmAddress',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'BusinessRelationCode',
                        Operator: '=',
                        Value: brCode,
                    },
                ],
                sortList: ['Number asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.getData_ContactPerson = async function (brCode) {
            let request = {
                modelName: 'XSmContactPerson',
                fieldNames: ['Number', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'BusinessRelationCode',
                        Operator: '=',
                        Value: brCode,
                    },
                    // {
                    //     PropertyName: 'Active',
                    //     Operator: '=',
                    //     Value: true,
                    // },
                ],
                sortList: ['Number asc, Name asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        service.PriceGroupList = async function (brCode) {
            let request = {
                modelName: 'XSmBusinessRelationPriceGroupR',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'BusinessRelationCode',
                        Operator: '=',
                        Value: brCode,
                    },
                ],
                sortList: ['Number asc, ItemCode asc, ItemDescription asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        return service;
    },
]);
