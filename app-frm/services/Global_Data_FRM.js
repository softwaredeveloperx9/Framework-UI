'use strict';

angular.module('app.frmUtils').factory('Global_Data_FRM', [
    '$location',
    '$state',
    'FRM_Signature',
    'Utility_Frm',
    'OurStorage',
    'AuthenticationService',
    function ($location, $state, FRM_Signature, Utility_Frm, OurStorage, AuthenticationService) {
        var global_Functions = {};

        global_Functions.Generate = function (parameter_rootScope) {
            parameter_rootScope.FRM_Signature = FRM_Signature.Signature;
            parameter_rootScope.GlobalMessage = '';

            // sebagai tempat untuk "Passsing Data" antara PopUp dan "Parent Caller"
            parameter_rootScope.PopUp_DataSelection = [];
            parameter_rootScope.PopUp_DataSelectionPR = [];
            parameter_rootScope.PopUp_DataSelectionBrowseCharges = [];
            parameter_rootScope.PopUp_DataSelectionBrowseRequests = [];

            try {
                let appSetting = OurStorage.getItem('appSettings');
                parameter_rootScope.appSettings = JSON.parse(appSetting) || {};

                let x = OurStorage.getItem();
                parameter_rootScope.FRM = JSON.parse(x) || {};

                if (!parameter_rootScope.FRM.currentUser) parameter_rootScope.FRM.currentUser = '';
            } catch (e) { }

            parameter_rootScope.ValidString = function (str) {
                return Utility_Frm.ValidString(str);
            };

            parameter_rootScope.Not_ValidString = function (str) {
                return Utility_Frm.Not_ValidString(str);
            };

            parameter_rootScope.EmployeeSiteAccess = async function (parameter_scope) {
                await Utility_Frm.EmployeeSiteAccess(parameter_scope);
            };

            parameter_rootScope.EmployeeLocationAccess = async function (parameter_scope, selectedBranch = null) {
                await Utility_Frm.EmployeeLocationAccess(parameter_rootScope, parameter_scope, selectedBranch);
            };

            parameter_rootScope.EmployeeWarehouseAccess = async function (parameter_scope, selectedWarehouse = null) {
                await Utility_Frm.EmployeeWarehouseAccess(parameter_rootScope, parameter_scope, selectedWarehouse);
            };

            parameter_rootScope.getData_Personel = async function (val) {
                return await Utility_Frm.Personel_Dropdown(val);
            };

            parameter_rootScope.getData_User = async function (val) {
                return await Utility_Frm.Dropdown_User(val);
            };

            parameter_rootScope.getData_Customer = async function (val, parameter_scope) {
                return await Utility_Frm.Dropdown_Customer2(val, parameter_scope);
            };

            parameter_rootScope.getData_Supplier = async function (val) {
                return await Utility_Frm.Dropdown_Supplier(val);
            };

            parameter_rootScope.getData_InventoryItem = async function (val) {
                return await Utility_Frm.Dropdown_InventoryItem(val);
            };

            parameter_rootScope.getData_InventoryItemCOA = async function (val) {
                return await ChartofAccount_Service.Dropdown_InventoryItem(val);
            };

            parameter_rootScope.Proces_CheckBox_Kiri = function (parameter_scope) {
                return Utility_Frm.Proces_CheckBox_Kiri(parameter_scope);
            };

            parameter_rootScope.console_log = function (str) {
                return console.log(str);
            };

            parameter_rootScope.isNullish = function (input) {
                return (
                    input === null ||
                    input === undefined ||
                    input === '' ||
                    input === 'null' ||
                    input === 'undefined' ||
                    input === 'NaN'
                );
            }

            parameter_rootScope.Not_Null = function (input) {
                return !parameter_rootScope.isNullish(input);
            }

            parameter_rootScope.SanitizeNumeric = function (input) {
                if (parameter_rootScope.isNullish(input)) {
                    return 0;
                }

                const num = Number(input);
                return isNaN(num) ? 0 : num;
            };

            parameter_rootScope.SanitizeString = function (input) {
                if (parameter_rootScope.isNullish(input)) {
                    return '';
                }

                return String(input);
            };

            parameter_rootScope.SanitizeBoolean = function (input) {
                // Handle nullish values
                if (parameter_rootScope.isNullish(input)) {
                    return false;
                }

                // Handle string representations of boolean values
                if (typeof input === 'string') {
                    const lowerInput = input.toLowerCase().trim();
                    if (lowerInput === 'true' || lowerInput === '1') {
                        return true;
                    }
                    if (lowerInput === 'false' || lowerInput === '0') {
                        return false;
                    }
                }

                // Handle numbers (0 = false, anything else = true)
                if (typeof input === 'number') {
                    return input !== 0;
                }

                // For everything else, use JavaScript's built-in boolean conversion
                return Boolean(input);
            };

            parameter_rootScope.SanitizeDate = function (input) {
                if (parameter_rootScope.isNullish(input)) {
                    return '';
                }

                // If input is already a valid moment object, format it
                if (moment.isMoment(input)) {
                    return input.format('YYYY-MM-DD');
                }

                // Try to parse the input as a date
                const momentDate = moment(input);

                // If it's a valid date, return formatted string
                if (momentDate.isValid()) {
                    return momentDate.format('YYYY-MM-DD');
                }

                // If parsing failed, return empty string
                return '';
            };

            parameter_rootScope.SanitizeInput = function (data, header_Template, detail_Template = null, itemsName = 'xyz') {
                function sanitizeObjectWithTypes(obj, template) {
                    if (!obj || !template) return;

                    Object.keys(template).forEach(function (fieldName) {
                        if (obj.hasOwnProperty(fieldName)) {
                            const templateValue = template[fieldName];

                            // Infer type from template default value
                            if (typeof templateValue === 'number') {
                                obj[fieldName] = parameter_rootScope.SanitizeNumeric(obj[fieldName]);
                            } else if (typeof templateValue === 'string') {
                                obj[fieldName] = parameter_rootScope.SanitizeString(obj[fieldName]);
                            } else if (typeof templateValue === 'boolean') {
                                obj[fieldName] = parameter_rootScope.SanitizeBoolean(obj[fieldName]);
                            }
                            // Other types are left unchanged
                        }
                    });
                }

                if (data.dataInput && header_Template) {
                    sanitizeObjectWithTypes(data.dataInput, header_Template);
                }

                if (data.details && data.details[itemsName] && detail_Template) {
                    data.details[itemsName].forEach(function (item) {
                        sanitizeObjectWithTypes(item, detail_Template);
                    });
                }
            }

            parameter_rootScope.getDateOnly = function (str) {
                let result = '';
                try {
                    result = moment(str, 'YYYY-MM-DD').format('DD/MM/YYYY');
                } catch (error) {
                    result = str;
                }

                return result;
            };

            parameter_rootScope.setCriteriaList = function (request, filters) {
                Utility_Frm.setCriteriaList(request, filters);
            };

            parameter_rootScope.functionDelay = function (ms) {
                return new Promise((resolve) => setTimeout(resolve, ms));
            };

            parameter_rootScope.Timeout_Save = () => {
                return 500;
            };

            parameter_rootScope.SaveFilterState = function (key, scope) {
                OurStorage.setItem(`_Filter_${key}`, JSON.stringify(scope.filters));

                // Special case
                try {
                    OurStorage.setItem(`_Filter_${key}_searchKeyword`, JSON.stringify(scope['dt']['searchKeyword']));
                } catch (err) { }
            };

            /*
                Filter mempunyai pola seperti berikut:
                    $scope.filters = {
                        KeyFilter: { PropertyName: 'somethingName', Operator: '=', Value: somethingValue },
                        ...
                    };

                KeyFilter:
                    o pada akhir, ada "nilai khusus":
                        # "_dd": DropDown List
                        # "_date": bertipe date
                    o nilai date pada akhir, mempunyai tujuan khusus
                        # misalnya 

                        $scope.filters = {
                            NamaKey_date: { PropertyName: 'abc', Operator: '=', Value: 'xyz' },
                            ...
                        };

                        # otomatis akan diberikan nilai ke field $scope.selectedNamaKey

                Case study:
                    o Text
                        # simple Text biasa
                        # cara pakai:
                            o ng-model="filters.NamaFilter.Value"

                    o Text
                        # Text dengan tujuan pencarian "mirip"
                        # Operator: like, nilai menggunakan %, contoh value: '%xyz%'}
                        # cara pakai:
                            o pakai 2 varialbel
                                # selectedNama
                                # filters.NamaFilter
                            o pada View
                                # ng-model="selectedNama"
                            o pada Controller, lakukan secara Manual:
                                # assignment antara selectedNama dengan filters.NamaFilter
                                # handle karakter %
                                    o baik saat menambahkan karakter %
                                    o maupun saat menghilangkan karakter %

                    o CheckBox
                        # nilai Boolean
                        # ada 2, yaitu:
                            1. Checkbox yang langsung sebagai Filter
                                # cara pakai:
                                    o sama seperti Text - simple Text biasa

                            2. Checkbox ditujukan sebagai "Alias"
                                # cara pakai:
                                    o pakai 2 varialbel
                                        # selectedNama
                                        # filters.NamaFilter
                                    o pada View
                                        # ng-model="selectedNama"

                    o Date
                        # cara pakai:
                            o pakai 2 varialbel
                                # selectedNama
                                # filters.Nama_date {pakai akhiran "_date"}
                            o pada View
                                # ng-model="selectedNama"
                            o pada Controller, lakukan secara Manual:
                                # pada showData()
                                # $scope.filters.Nama_date.Value = $rootScope.Date_to_DB($scope.selectedNama);

                    o Parameter Url:
                        # kombinasi dengan Parameter dari Url
                        # cara pakai:
                            o panggil dulu function $rootScope.LoadFilterState()
                            o function Override_some_Filters()
                                # buat baru
                                # panggil setelah pemanggilan LoadFilterState();

                    o Bukan bagian Filter,
                      tetapi nilai disimpan pada Filter
            */
            parameter_rootScope.LoadFilterState = function (key, scope) {
                scope.LoadFilterState_ = false;

                let filters = OurStorage.getItem(`_Filter_${key}`);

                if (filters) {
                    scope.LoadFilterState_ = true;

                    scope.filters = { ...scope.filters, ...JSON.parse(filters) };

                    Object.entries(scope.filters).map((filterItem) => {
                        var key = filterItem[0];
                        var val = filterItem[1].Value;

                        if (key.endsWith('_dd')) {
                            key = key.replace('_dd', '');
                            key = 'selected' + key;

                            // reset if necessary
                            if (val && typeof val === 'string' && val.indexOf('(') >= 0) val = '';

                            scope[key] = val;
                        }
                        else if (key.endsWith('_date')) {
                            key = key.replace('_date', '');
                            key = 'selected' + key;

                            scope[key] = parameter_rootScope.Date_to_UI(val);
                        }
                    });
                }

                // Special case
                try {
                    let searchKeyword = OurStorage.getItem(`_Filter_${key}_searchKeyword`);

                    if (searchKeyword) {
                        scope['searchKeyword'] = JSON.parse(searchKeyword);
                    }
                } catch (err) { }
            };

            parameter_rootScope.hilangkanSpasi = function (str) {
                let result = str;

                try {
                    result = str.trim();
                } catch (e) { }

                return result;
            };

            parameter_rootScope.logout = function () {
                AuthenticationService.ClearSessions();
                $location.path('/login');
            };

            parameter_rootScope.CodeNameSeparator = function (code, name, separator = ' - ') {
                if (code && name) return code + separator + name;

                if (code) return code;

                return '';
            };

            parameter_rootScope.Date_to_UI = function (val) {
                let result = '';

                if (Utility_Frm.ValidString(val)) result = moment(new Date(val)).format('DD/MM/YYYY');
                return result;
            };

            parameter_rootScope.Date_to_DB = function (val, defaultValue = null) {
                let result = defaultValue;

                if (val) result = moment(val, 'DD/MM/YYYY').format('YYYY-MM-DD');
                return result;
            };

            parameter_rootScope.getParamValue = function (obj, name, defaultValue = null) {
                let result = defaultValue;

                if (!obj.hasOwnProperty(name)) return result;

                result = decodeURIComponent(obj[name]);

                if (result === undefined || result === 'undefined') result = defaultValue;

                return result;
            };

            //TODO: Access Controll
            parameter_rootScope.CheckAccess = function (moduleName, accessType) {
                // accessType: 'Read', 'Create', 'Update', 'Delete', 'Print', 'Approve'
                if (parameter_rootScope.FRM.currentUser === '') return false;
                if (parameter_rootScope.FRM.currentUser.IsAdmin) return true;
                if (!parameter_rootScope.FRM.currentUser.Roles) return false;
            };

            parameter_rootScope.Simple_Encode = function (str) {
                let result = str;

                if (parameter_rootScope.isNullish(str)) return result;

                // special case: karena di passing via URL, maka '/' di ganti '---'
                result = str.replaceAll('/', '---'); // decodeURIComponent(str);

                return result;
            };

            parameter_rootScope.Simple_Decode = function (str) {
                let result = str;

                if (parameter_rootScope.isNullish(str)) return result;

                // special case: karena di passing via URL, maka '/' di ganti '---'
                result = str.replaceAll('---', '/');

                return result;
            };

            parameter_rootScope.debugScope = function (scope) {
                let scopeData = {};

                for (var key in scope) {
                    if (key.charAt(0) !== '$' && typeof scope[key] !== 'function') {
                        scopeData[key] = scope[key];
                    }
                }

                return scopeData;
            };

            parameter_rootScope.SetDefaultDropdownList = function (arr, code, model, modelField) {
                if (arr.length > 0) {
                    model[modelField] = arr[0][code];
                }
            };

            parameter_rootScope.SanitizeStringArr = function (arr, fieldName) {
                arr.forEach(function (item) {
                    if (item.hasOwnProperty(fieldName)) {
                        item[fieldName] = parameter_rootScope.SanitizeString(item[fieldName]);
                    }
                });
            };

            parameter_rootScope.SanitizeStringAB = function (A, B) {
                let result = A;

                if (parameter_rootScope.isNullish(A)) {
                    result = B;
                }

                return result;
            };

            parameter_rootScope.SanitizeInput_ItemDate = function (arr, fieldName) {
                arr.forEach(function (item) {
                    if (item.hasOwnProperty(fieldName)) {
                        item[fieldName] = parameter_rootScope.Date_to_DB(item[fieldName]);
                    }
                });
            };

            parameter_rootScope.allData_toJson = false;
            parameter_rootScope.allData_toJson2 = {};

            parameter_rootScope.Toggle_debugScope = function () {
                var scope = angular.element(event.target).scope();
                parameter_rootScope.allData_toJson = !parameter_rootScope.allData_toJson;

                parameter_rootScope.allData_toJson2 = {};
                if (!parameter_rootScope.allData_toJson) return;

                parameter_rootScope.allData_toJson2 = parameter_rootScope.debugScope(scope);
            };

            window.SDR_BackEnd_Version = async function () {
                return await Utility_Frm.BackEnd_Version();
            };

            parameter_rootScope.LandingPage_for_User = function () {
                return Utility_Frm.LandingPage_for_User();
            };

            parameter_rootScope.sdr_GoBack = function (toState = '') {
                var currentState = $state.current.name;
                var pageState = currentState.replace('Form', '');

                if ($state.get(pageState)) {
                    $state.go(pageState);
                } else {
                    $state.go(toState);
                }
            };

            parameter_rootScope.sdr_GoToForm = function (toParams = {}) {
                var currentState = $state.current.name;
                var formState = currentState + 'Form';
                $state.go(formState, toParams);
            };
        };

        return global_Functions;
    },
]);
