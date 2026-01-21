'use strict';

angular.module('app.frmUtils').factory('Utility_ERP', [
    'OurStorage',
    'BackEndService',
    'Employee_Service',
    function (OurStorage, BackEndService, Employee_Service) {
        var utility = {};

        utility.getData_Currency = async function () {
            var request = {
                modelName: 'XSmCurrency',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_PaymentTerm = async function () {
            var request = {
                modelName: 'XSmPaymentTerm',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Description asc, OrderID asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_PaymentMethod = async function () {
            var request = {
                modelName: 'XSmPaymentMethod',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Name asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_AddressType = async function () {
            var request = {
                modelName: 'XSmAddressType',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['OrderID asc, Description asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_DeliveryMethod = async function () {
            var request = {
                modelName: 'XSmDeliveryMethod',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['OrderID asc, Name asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_DueDateTerm = async function () {
            var request = {
                modelName: 'XSmDueDateTerm',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_DocumentStatus = async function (documentType) {
            var request = {
                modelName: 'XSmDocumentStatus',
                fieldNames: ['StatusId', 'DisplayName', 'IsArchive', 'SortID', 'ShowInForm'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'DocumentType',
                        Operator: '=',
                        Value: documentType,
                    },
                    {
                        PropertyName: 'ShowInFilterList',
                        Operator: '=',
                        Value: true,
                    },
                ],
                sortList: ['SortID asc, DisplayName asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_DocumentStatus_Form = async function (documentType, showInForm) {
            var request = {
                modelName: 'XSmDocumentStatus',
                fieldNames: ['StatusId', 'DisplayName', 'IsArchive', 'SortID'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [
                    {
                        PropertyName: 'DocumentType',
                        Operator: '=',
                        Value: documentType,
                    },
                    {
                        PropertyName: 'ShowInForm',
                        Operator: '=',
                        Value: showInForm,
                    },
                ],
                sortList: ['SortID asc, DisplayName asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_Brand = async function () {
            var request = {
                modelName: 'XInvBrand',
                fieldNames: ['Code', 'Description'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Description asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_User = async function () {
            var request = {
                modelName: 'XSmUsers',
                fieldNames: ['Code', 'Name'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Name asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.Value_OperatorIN = function (arr, columnName = '', wrapElement = `'`) {
            // inisialisasi
            let result = ''; //`('')`'';

            try {
                // lakukan Concate terhadap Code: menggunakan pola tertentu

                let items = '';
                let separator = '';
                arr.forEach((element) => {
                    items += separator + wrapElement + `${element[columnName]}` + wrapElement;
                    separator = ',';
                });

                if (items) result = `(${items})`;
            } catch (error) { }

            return result;
        };

        utility.Value_OperatorIN_ = function (arr, columnName = '', wrapElement = `'`) {
            let result = utility.Value_OperatorIN(arr, columnName, wrapElement);

            if (!result) result = `('not valid value')`;

            return result;
        }

        utility.Value_OperatorIN_x = function (arr, columnName = '', wrapElement = `'`) {
            let result = utility.Value_OperatorIN(arr, columnName, wrapElement);

            if (!result) result = `(-12345)`;

            return result;
        }

        utility.Value_OperatorIN2 = function (arr, wrapElement = `'`) {
            // inisialisasi
            let result = ''; //`('')`'';

            try {
                // lakukan Concate terhadap Code: menggunakan pola tertentu

                let items = '';
                let separator = '';
                arr.forEach((element) => {
                    items += separator + wrapElement + `${element}` + wrapElement;
                    separator = ',';
                });

                if (items) result = `(${items})`;
            } catch (error) { }

            return result;
        };

        utility.ValidString = function (x) {
            // "Special Case"
            if (x === 0) return true;

            return x != '' && x !== undefined && x !== null && x !== 'undefined' && x !== 'null';
        };

        utility.Not_ValidString = function (x) {
            return !utility.ValidString(x);
        };

        utility.ProcessColumns = function (table, columns) {
            for (let i = 0; i < columns.length; i++) {
                table.columns.push({
                    Title: columns[i][0],
                    DbField: columns[i][1], //LabelField
                    SortField: columns[i][2], //LabelValue
                    Format: columns[i][3],
                });
            }
        };

        utility.ProcessColumnsX = function (table, columns) {
            table.columns = [];
            for (let i = 0; i < columns.length; i++) {
                table.columns.push({
                    Title: columns[i][0],
                    DbField: columns[i][1],
                    SortField: columns[i][2],
                    Format: columns[i][3],
                });
            }
        };

        utility.ProcessColumnsY = function (table, columns) {
            for (let i = 0; i < columns.length; i++) {
                table.columns.push({
                    Title: columns[i][0],
                    DbField: columns[i][1], //LabelField
                    SortField: columns[i][2], //LabelValue
                    Format: columns[i][3],
                    Show: columns[i][4],
                });
            }
        };

        utility.Dropdown_User = async function (val) {
            return await Employee_Service.User_Dropdown(val);
        };

        utility.Dropdown_Customer = async function (val, locationCode = '', locationOperator = '=') {
            return await BusinessRelation_Service.Customer_Dropdown(val, locationCode, locationOperator);
        };

        utility.Personel_Dropdown = async function (val, locationCode = '', locationOperator = '=') {
            return await BusinessRelation_Service.Personel_Dropdown(val, locationCode, locationOperator);
        };

        utility.Dropdown_Supplier = async function (val, locationCode = '', locationOperator = '=') {
            return await BusinessRelation_Service.Supplier_Dropdown(val, locationCode, locationOperator);
        };

        utility.Dropdown_PriceGroup = async function () {
            return await PriceGroups_Service.Dropdown();
        };

        utility.Dropdown_Customer2 = async function (val, parameter_scope) {
            let _selectedBranch = parameter_scope.selectedBranch;
            let _operator = '=';

            if (utility.Not_ValidString(_selectedBranch)) {
                _selectedBranch = utility.Value_OperatorIN(parameter_scope.data_EmployeeLocationAccess, 'Code');
                _operator = 'in';
            }

            return await utility.Dropdown_Customer(val, _selectedBranch, _operator);
        };

        utility.Dropdown_InventoryItem = async function (val) {
            return await Inventory_Service.Dropdown_InventoryItem(val);
        };

        utility.getData_Tax = async function () {
            var request = {
                modelName: 'XTXTax',
                fieldNames: ['Code', 'Description', 'CurrentTaxRatePercentage'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'TaxType', Operator: '=', Value: 'VAT' }],
                sortList: ['CurrentTaxRatePercentage asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.LocationAccess = async function () {
            return await Employee_Service.LocationAccess();
        };

        utility.WarehouseByLocation = async function () {
            return await Employee_Service.WarehouseByLocation();
        };

        utility.EmployeeSiteAccess = async function (parameter_scope) {
            try {
                parameter_scope.data_Site = [
                    { Code: 'Tangerang', Name: 'Tangerang' },
                    { Code: 'Bogor', Name: 'Bogor' },
                    { Code: 'Tegal', Name: 'Tegal' },
                    { Code: 'Curug', Name: 'Curug' },
                    { Code: 'Bandung', Name: 'Bandung' },
                ];

                parameter_scope.complete_Site = true;
            } catch (error) { }
        };

        utility.EmployeeLocationAccess = async function (parameter_rootScope, parameter_scope, selectedBranch = null) {
            let data = OurStorage.getItem(`_EmployeeLocationAccess`);

            let response = {};

            if (utility.ValidString(data)) {
                response = JSON.parse(data);
            } else {
                response = await Employee_Service.LocationAccess();

                OurStorage.setItem(`_EmployeeLocationAccess`, JSON.stringify(response));
            }

            try {
                parameter_scope.data_EmployeeLocationAccess = response.Data;

                if (parameter_rootScope.isNullish(selectedBranch)) {
                    let x = parameter_scope.data_EmployeeLocationAccess.filter((e) => {
                        return e.Code == response.DefaultBranch;
                    });
                    if (x.length > 0) {
                        parameter_scope.selectedBranch = response.DefaultBranch;
                    } else {
                        parameter_scope.selectedBranch = parameter_scope.data_EmployeeLocationAccess[0].Code;
                    }
                } else {
                    parameter_scope.selectedBranch = selectedBranch;
                }

                parameter_scope.model.LocationCode = parameter_scope.selectedBranch;
            } catch (error) { }
        };

        utility.EmployeeWarehouseAccess = async function (parameter_rootScope, parameter_scope, selectedWarehouse = null) {
            let data = OurStorage.getItem(`_WarehouseByLocation`);

            let response = {};

            if (utility.ValidString(data)) {
                response = JSON.parse(data);
            } else {
                response = await Employee_Service.WarehouseByLocation();

                OurStorage.setItem(`_WarehouseByLocation`, JSON.stringify(response));
            }

            try {
                parameter_scope.data_EmployeeWarehouseAccess = response.Data;

                let data = parameter_scope.data_EmployeeWarehouseAccess;

                parameter_scope.data_Warehouse_perBranch = [...new Map(data.map((item) => [item['Code'], item])).values()].sort((x, y) => x.Code.localeCompare(y.Code));

                if (selectedWarehouse == null) {
                    if (parameter_scope.data_Warehouse_perBranch.length > 0) {
                        parameter_scope.selectedWarehouse = parameter_scope.data_Warehouse_perBranch[0].Code;
                    }
                } else {
                    parameter_scope.selectedWarehouse = selectedWarehouse;
                }
            } catch (ex) { }
        };

        utility.Proces_CheckBox_Kiri = async function (parameter_scope) {
            parameter_scope.selectAllRows = false;

            parameter_scope.selectAllRows_Change = async function () {
                parameter_scope.dt.data.forEach(async function (row) {
                    row['rowSelected'] = parameter_scope.selectAllRows;
                });
            };

            parameter_scope.ProcessRow = async function (index) {
                let allCheck = true;

                parameter_scope.dt.data.forEach(async function (row) {
                    if (!row['rowSelected']) {
                        allCheck = false;

                        //break;
                        return;
                    }
                });

                parameter_scope.selectAllRows = allCheck;
            };
        };

        utility.setCriteriaList = function (request, filters) {
            let criteriaList = [];

            Object.entries(filters).map((filterItem) => {
                if (filterItem[1].Value !== '' && filterItem[1].Value !== null) criteriaList.push(filterItem[1]);
            });

            request['criteriaList'] = criteriaList;
        };

        utility.getData_CoverGiroEvent = async function () {
            var request = {
                modelName: 'XCoverGiroEventStatic',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_LeadSource = async function () {
            var request = {
                modelName: 'XLeadSource',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_OrderSource = async function () {
            var request = {
                modelName: 'XOrderSource',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_SourceType = async function () {
            var request = {
                modelName: 'XSalesOrderSourceType',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                criteriaList: [{ PropertyName: 'Active', Operator: '=', Value: true }],
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_ExpeditionPayment = async function () {
            var request = {
                modelName: 'XExpeditionPaymentMethodStatic',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_PickingProfile = async function () {
            var request = {
                modelName: 'XPickingProfileStatic',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.getData_CR_Grade = async function () {
            var request = {
                modelName: 'XCreditGradeStatic',
                fieldNames: ['*'],
                maximumResult: 100,
                pageNumber: 1,
                sortList: ['Code asc'],
            };

            let response = await BackEndService.RequestDataList(request);

            return response.data.Data;
        };

        utility.Still_Processing = function (scope, flag) {
            scope['still_processing'] = flag;

            if (flag) {
                $('#idLoading').show();
            } else {
                $('#idLoading').hide();
            }
        };

        utility.getSelectedData = function (arr, fieldName = 'Code', fieldName2 = 'rowSelected') {
            let selectedData = [];

            for (let i = 0; i < arr.length; i++) {
                if (arr[i][fieldName2]) {
                    selectedData.push(arr[i][fieldName]);
                }
            }

            return selectedData;
        };

        utility.BackEnd_Version = async function () {
            let request = {
                actionController: 'OtherController',
                actionName: 'Signature',
                actionParam: '',
            };

            return await BackEndService.RequestAction(request);
        };

        utility.LandingPage_for_User = function () {
            return "/frm/data/Organization";
        };

        utility.sdr_BuildFlatTreeData = function (param_scope, kolom_id, kolom_parent_id, kolom_code, kolom_desc) {
            if (!param_scope.dt.data || param_scope.dt.data.length === 0) {
                param_scope.dt.treeData = [];
                return;
            }

            var flatData = angular.copy(param_scope.dt.data);
            var lookup = {};
            var roots = [];
            var errors = [];

            // Step 1: Buat lookup berdasarkan AccountId
            flatData.forEach(function (item) {
                item.children = [];
                item.level = 0;
                item.hasError = false;
                lookup[item[kolom_id]] = item;
            });

            // Step 2: Fungsi untuk detect circular reference
            var detectCircular = function (itemId, visitedIds) {
                if (!visitedIds) visitedIds = [];

                if (visitedIds.indexOf(itemId) !== -1) {
                    return true; // Circular detected!
                }

                var item = lookup[itemId];
                if (!item || !item[kolom_parent_id] || item[kolom_parent_id] === 0) {
                    return false; // No circular
                }

                visitedIds.push(itemId);
                return detectCircular(item[kolom_parent_id], visitedIds);
            };

            // Step 3: Build parent-child relationship dengan circular detection
            flatData.forEach(function (item) {
                if (item[kolom_parent_id] && item[kolom_parent_id] !== 0) {
                    // Check circular reference
                    if (detectCircular(item[kolom_id])) {
                        console.error('Circular reference detected:', item[kolom_code], item[kolom_desc]);
                        errors.push({
                            type: 'circular',
                            item: item,
                            message: 'Circular reference detected for account: ' + item[kolom_code]
                        });
                        item.hasError = true;
                        // Treat as root level
                        roots.push(item);
                        return;
                    }

                    // Check if parent exists
                    if (lookup[item[kolom_parent_id]]) {
                        var parent = lookup[item[kolom_parent_id]];
                        parent.children.push(item);

                        // Calculate level safely with max depth limit
                        var level = 0;
                        var currentParent = parent;
                        var maxDepth = 20; // Prevent infinite loop

                        while (currentParent && level < maxDepth) {
                            level++;
                            currentParent = currentParent.ParentId && currentParent.ParentId !== 0
                                ? lookup[currentParent.ParentId]
                                : null;
                        }

                        if (level >= maxDepth) {
                            console.warn('Max depth reached for:', item[kolom_code]);
                            item.hasError = true;
                            errors.push({
                                type: 'max_depth',
                                item: item,
                                message: 'Max depth exceeded for account: ' + item[kolom_code]
                            });
                        }

                        item.level = level;
                    } else {
                        // Parent not found, treat as root
                        console.warn('Parent not found for:', item[kolom_code], 'ParentId:', item[kolom_parent_id]);
                        errors.push({
                            type: 'orphan',
                            item: item,
                            message: 'Parent not found for account: ' + item[kolom_code] + ' (ParentId: ' + item[kolom_parent_id] + ')'
                        });
                        item.hasError = true;
                        roots.push(item);
                    }
                } else {
                    // Item ini adalah root level
                    roots.push(item);
                }
            });

            // Step 3: Sort children by code
            var sortChildren = function (node) {
                if (node.children && node.children.length > 0) {
                    node.children.sort(function (a, b) {
                        if (a[kolom_code]) {
                            return a[kolom_code].localeCompare(b[kolom_code]);
                        }

                        return '';
                    });
                    node.children.forEach(sortChildren);
                }
            };

            // Sort roots by code
            roots.sort(function (a, b) {
                if (a[kolom_code]) {
                    return a[kolom_code].localeCompare(b[kolom_code]);
                }

                return '';
            });

            // Sort all children recursively
            roots.forEach(sortChildren);

            // Step 4: Flatten tree menjadi array dengan urutan hierarki
            var result = [];
            var flattenTree = function (nodes) {
                nodes.forEach(function (node) {
                    result.push(node);
                    if (node.children && node.children.length > 0) {
                        flattenTree(node.children);
                    }
                });
            };

            flattenTree(roots);

            // Step 5: Update display numbers
            result.forEach(function (item, index) {
                item.displayNumber = ((param_scope.dt.currentPage - 1) * param_scope.dt.pageLength) + index + 1;
            });

            // Show errors if any
            if (errors.length > 0) {
                console.warn('Tree building completed with', errors.length, 'error(s):');
                errors.forEach(function (err) {
                    console.warn('-', err.type + ':', err.message);
                });

                // Optionally show user notification
                param_scope.treeErrors = errors;
            } else {
                param_scope.treeErrors = null;
            }

            return result;
        };

        utility.SaveDataStore = async function (data) {
            let request = {
                actionController: 'OtherController',
                actionName: 'SaveDataStore',
                actionParam: data,
            };

            return await BackEndService.RequestAction(request);
        };

        utility.GeDataStore = async function (code) {
            let request = {
                modelName: 'XData_Store',
                criteriaList: [{ PropertyName: 'Kunci', Operator: '=', Value: code }],
            };

            return await BackEndService.RequestDataSingle(request);
        };


        return utility;
    },
]);