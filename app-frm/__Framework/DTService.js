'use strict';
angular.module('app.frmUtils').factory('DTService', [
    'BackEndService',
    function (BackEndService) {
        var service = {};

        service.GenerateDTInstance = function (modelName, defaultSortField, defaultSortDirection, filterObject, defaultSearchKeyword, pageLength = 10, afterRequestData = null, searchKeyword = '') {
            var dt = {};
            dt.loading = false;
            dt.dataModel = modelName;
            dt.pageLength = pageLength;
            dt.currentPage = 1;
            dt.totalPages = 0;
            dt.totalRows = 0;
            dt.pages = [];
            dt.data = [];
            dt.searchKeyword = searchKeyword;
            dt.activeSortField = defaultSortField;
            dt.activeSortDirection = defaultSortDirection;
            dt.columns = [];
            dt.filters = filterObject;

            dt.loadData = async function () {
                var request = {
                    modelName: dt.dataModel,
                    maximumResult: dt.pageLength,
                    fieldNames: ['*'],

                    sortList: [dt.activeSortField + ' ' + dt.activeSortDirection],
                    pageNumber: dt.currentPage,
                };

                dt.applyFilters(request);

                dt.loading = true;

                // reset
                dt.data = [];
                //dt.totalRows = 0;
                //dt.totalPages = 0;

                let response = await BackEndService.RequestDataList(request);
                dt.loading = false;

                if (response.success) {
                    // request data success
                    dt.data = response.data.Data;
                    dt.totalRows = response.data.TotalRows;
                    if (dt.totalRows < dt.pageLength) dt.totalPages = 1;
                    else dt.totalPages = Math.ceil(dt.totalRows / dt.pageLength);
                } else {
                    // request data failed
                    // show Error: sudah dihandle oleh SmartAdmin - function notifyError() menggunakan $.bigBox()
                }

                if (afterRequestData) {
                    afterRequestData();
                }

                BackEndService.Log_Activity();
            };

            dt.sort = async function ($event, fieldName) {
                // reset class
                $('.asc').attr('class', '');
                $('.desc').attr('class', '');
                if (fieldName == dt.activeSortField) {
                    if (dt.activeSortDirection == 'asc') dt.activeSortDirection = 'desc';
                    else dt.activeSortDirection = 'asc';
                } else {
                    dt.activeSortField = fieldName;
                    dt.activeSortDirection == 'asc';
                }

                $event.currentTarget.className = dt.activeSortDirection;
                await dt.loadData();
            };

            dt.nextPage = async function () {
                if (dt.currentPage === dt.totalPages) return;

                dt.currentPage++;
                await dt.loadData();
            };
            dt.previousPage = async function () {
                if (dt.currentPage === 1) return;

                dt.currentPage--;
                await dt.loadData();
            };
            dt.setPage = async function (pageNumber) {
                if (dt.currentPage === pageNumber) return;

                dt.currentPage = pageNumber;
                await dt.loadData();
            };

            dt.getCriteriaList = function (request) {
                var criteriaList = [];

                if (dt.searchKeyword != '') {
                    var searchCriteria = {
                        PropertyName: defaultSearchKeyword,
                        Operator: 'like',
                        Value: '%' + dt.searchKeyword + '%',
                    };
                    criteriaList.push(searchCriteria);
                }
                Object.entries(dt.filters).map((filterItem) => {
                    if (filterItem[1].Value !== '' && filterItem[1].Value !== null) criteriaList.push(filterItem[1]);
                });

                request['criteriaList'] = criteriaList;
            };

            dt.applyFilters = function (request) {
                if (defaultSearchKeyword.includes(',')) {
                    dt.getSQLCriteria(request);
                } else {
                    dt.getCriteriaList(request);
                }
            };

            dt.getSQLCriteria = function (request, skipIfBlank = true) {
                if (dt.searchKeyword == '' && skipIfBlank) {
                    dt.getCriteriaList(request);
                    return;
                }

                let fields = defaultSearchKeyword.replaceAll(' ', '').split(',');

                let sql = '';
                let sql1 = '';
                let sql2 = '';
                let separator = '';
                let operator = 'like';
                let value = '';

                fields.forEach((field) => {
                    value = '%' + dt.searchKeyword + '%';
                    sql1 += `${separator} ${field} ${operator} '${value}'`;

                    separator = ' or ';
                });

                if (sql1 != '') {
                    sql1 = `( ${sql1} )`;
                }

                let field = '';
                separator = '';

                Object.entries(dt.filters).map((filterItem) => {
                    if (filterItem[1].Value !== '' && filterItem[1].Value !== null) {
                        field = filterItem[1].PropertyName;
                        operator = filterItem[1].Operator;

                        if (operator == 'in') {
                            value = filterItem[1].Value;
                        } else {
                            value = `'${filterItem[1].Value}'`;
                        }

                        sql2 += `${separator} ${field} ${operator} ${value}`;

                        separator = ' and ';
                    }
                });

                sql = sql1;

                separator = '';
                if (sql != '') {
                    separator = ' and ';
                }

                if (sql2) {
                    sql += separator + sql2;
                }

                if (sql != '') {
                    request['SQLCriteria'] = sql;
                }
            };

            return dt;
        };

        service.ModalGenerateDTInstance = function (modelName, defaultSortField, defaultSortDirection, filterObject, defaultSearchKeyword, pageLength = 5) {
            var dt = {};
            dt.loading = false;
            dt.dataModel = modelName;
            dt.pageLength = pageLength;
            dt.currentPage = 1;
            dt.totalPages = 0;
            dt.totalRows = 0;
            dt.pages = [];
            dt.data = [];
            dt.searchKeyword = '';
            dt.activeSortField = defaultSortField;
            dt.activeSortDirection = defaultSortDirection;
            dt.columns = [];
            dt.filters = filterObject;

            dt.loadData = async function () {
                var request = {
                    modelName: dt.dataModel,
                    maximumResult: dt.pageLength,
                    fieldNames: ['*'],
                    criteriaList: dt.getCriteriaList(),
                    sortList: [dt.activeSortField + ' ' + dt.activeSortDirection],
                    pageNumber: dt.currentPage,
                };

                dt.loading = true;

                let response = await BackEndService.RequestDataList(request);
                dt.loading = false;

                if (response.success) {
                    // request data success
                    dt.data = [];
                    dt.data = response.data.data;
                    dt.totalRows = response.data.totalRows;
                    if (dt.totalRows < dt.pageLength) dt.totalPages = 1;
                    else dt.totalPages = Math.ceil(dt.totalRows / dt.pageLength);
                } else {
                    // request data failed
                    // show Error: sudah dihandle oleh SmartAdmin - function notifyError() menggunakan $.bigBox()
                }
            };

            dt.sort = function ($event, fieldName) {
                // reset class
                $('.asc').attr('class', '');
                $('.desc').attr('class', '');
                if (fieldName == dt.activeSortField) {
                    if (dt.activeSortDirection == 'asc') dt.activeSortDirection = 'desc';
                    else dt.activeSortDirection = 'asc';
                } else {
                    dt.activeSortField = fieldName;
                    dt.activeSortDirection == 'asc';
                }

                $event.currentTarget.className = dt.activeSortDirection;
                dt.loadData();
            };

            dt.nextPage = function () {
                if (dt.currentPage === dt.totalPages) return;

                dt.currentPage++;
                dt.loadData();
            };
            dt.previousPage = function () {
                if (dt.currentPage === 1) return;

                dt.currentPage--;
                dt.loadData();
            };
            dt.setPage = function (pageNumber) {
                if (dt.currentPage === pageNumber) return;

                dt.currentPage = pageNumber;
                dt.loadData();
            };

            dt.getCriteriaList = function () {
                var criteriaList = [];

                if (dt.searchKeyword != '') {
                    var searchCriteria = {
                        PropertyName: defaultSearchKeyword,
                        Operator: 'like',
                        Value: '%' + dt.searchKeyword + '%',
                    };
                    criteriaList.push(searchCriteria);
                }
                Object.entries(dt.filters).map((filterItem) => {
                    if (filterItem[1].Value !== '' && filterItem[1].Value !== null) criteriaList.push(filterItem[1]);
                });

                return criteriaList;
            };

            return dt;
        };

        return service;
    },
]);
