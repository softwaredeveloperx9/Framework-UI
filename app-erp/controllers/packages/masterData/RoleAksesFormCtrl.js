angular.module('app.erp').controller('RoleAccessFormCtrl', function ($rootScope, $scope, $state, Utility_ERP, RoleAccessForm_Service) {

    // Initialize variables
    $scope.Is_Writeable = true;
    $scope.Is_Create = true;
    $scope.form = { submitted: false };
    $scope.allData_toJson = false;

    // Initialize model
    $scope.model = {
        RoleName: '',
        RoleStatus: 'Active',
        Description: '',
        Permissions: []
    };

    // Data for modules
    $scope.data_Modules = [
        {
            id: 'sales',
            name: 'Sales',
            hasChildren: true,
            expanded: false,
            permissions: {
                read: false,
                create: false,
                edit: false,
                delete: false,
                approval: false
            },
            children: [
                {
                    id: 'sales-order',
                    name: 'Sales Order',
                    permissions: {
                        read: false,
                        create: false,
                        edit: false,
                        delete: false,
                        approval: false
                    }
                },
                {
                    id: 'sales-invoice',
                    name: 'Sales Invoice',
                    permissions: {
                        read: false,
                        create: false,
                        edit: false,
                        delete: false,
                        approval: false
                    }
                },
                {
                    id: 'sales-quotation',
                    name: 'Sales Quotation',
                    permissions: {
                        read: false,
                        create: false,
                        edit: false,
                        delete: false,
                        approval: false
                    }
                }
            ]
        },
        {
            id: 'purchase',
            name: 'Purchase',
            hasChildren: true,
            expanded: false,
            permissions: {
                read: false,
                create: false,
                edit: false,
                delete: false,
                approval: false
            },
            children: [
                {
                    id: 'purchase-order',
                    name: 'Purchase Order',
                    permissions: {
                        read: false,
                        create: false,
                        edit: false,
                        delete: false,
                        approval: false
                    }
                },
                {
                    id: 'purchase-request',
                    name: 'Purchase Request',
                    permissions: {
                        read: false,
                        create: false,
                        edit: false,
                        delete: false,
                        approval: false
                    }
                }
            ]
        },
        {
            id: 'inventory',
            name: 'Inventory',
            hasChildren: true,
            expanded: false,
            permissions: {
                read: false,
                create: false,
                edit: false,
                delete: false,
                approval: false
            },
            children: [
                {
                    id: 'stock-movement',
                    name: 'Stock Movement',
                    permissions: {
                        read: false,
                        create: false,
                        edit: false,
                        delete: false,
                        approval: false
                    }
                },
                {
                    id: 'stock-adjustment',
                    name: 'Stock Adjustment',
                    permissions: {
                        read: false,
                        create: false,
                        edit: false,
                        delete: false,
                        approval: false
                    }
                }
            ]
        },
        {
            id: 'finance',
            name: 'Finance',
            hasChildren: true,
            expanded: false,
            permissions: {
                read: false,
                create: false,
                edit: false,
                delete: false,
                approval: false
            },
            children: [
                {
                    id: 'payment',
                    name: 'Payment',
                    permissions: {
                        read: false,
                        create: false,
                        edit: false,
                        delete: false,
                        approval: false
                    }
                },
                {
                    id: 'receipt',
                    name: 'Receipt',
                    permissions: {
                        read: false,
                        create: false,
                        edit: false,
                        delete: false,
                        approval: false
                    }
                }
            ]
        },
        {
            id: 'masterdata',
            name: 'Master Data',
            hasChildren: true,
            expanded: false,
            permissions: {
                read: false,
                create: false,
                edit: false,
                delete: false,
                approval: false
            },
            children: [
                {
                    id: 'customer',
                    name: 'Customer',
                    permissions: {
                        read: false,
                        create: false,
                        edit: false,
                        delete: false,
                        approval: false
                    }
                },
                {
                    id: 'supplier',
                    name: 'Supplier',
                    permissions: {
                        read: false,
                        create: false,
                        edit: false,
                        delete: false,
                        approval: false
                    }
                },
                {
                    id: 'product',
                    name: 'Product',
                    permissions: {
                        read: false,
                        create: false,
                        edit: false,
                        delete: false,
                        approval: false
                    }
                }
            ]
        }
    ];

    // Toggle module expansion
    $scope.toggleModule = function(module) {
        module.expanded = !module.expanded;
    };

    // Update permissions when parent module is changed
    $scope.updatePermissions = function(module) {
        if (module.hasChildren && module.children) {
            // Apply parent permissions to all children
            angular.forEach(module.children, function(child) {
                angular.forEach(['read', 'create', 'edit', 'delete', 'approval'], function(permission) {
                    child.permissions[permission] = module.permissions[permission];
                });
            });
        }
    };

    // Initialize function
    $scope.init = function () {
        var params = $state.params;

        if (params && params.id) {
            $scope.Is_Create = false;
            $scope.loadData(params.id);
        }
    };

    // Load existing data
    $scope.loadData = function (id) {
        $('#idLoading').show();

        RoleAccessForm_Service.getById(id).then(function (response) {
            if (response.data.success) {
                $scope.model = response.data.data;
                
                // Apply loaded permissions to modules
                if ($scope.model.Permissions && $scope.model.Permissions.length > 0) {
                    $scope.applyPermissionsToModules($scope.model.Permissions);
                }
            } else {
                Utility_ERP.showAlert('Error', response.data.message, 'error');
            }
            $('#idLoading').hide();
        }, function (error) {
            Utility_ERP.showAlert('Error', 'Failed to load data', 'error');
            $('#idLoading').hide();
        });
    };

    // Apply permissions to modules from loaded data
    $scope.applyPermissionsToModules = function(permissions) {
        angular.forEach(permissions, function(perm) {
            // Find module
            var module = $scope.data_Modules.find(function(m) {
                return m.id === perm.moduleId;
            });
            
            if (module) {
                module.permissions = {
                    read: perm.read,
                    create: perm.create,
                    edit: perm.edit,
                    delete: perm.delete,
                    approval: perm.approval
                };
                
                // Apply to children if exists
                if (perm.submodules && module.children) {
                    angular.forEach(perm.submodules, function(subPerm) {
                        var submodule = module.children.find(function(sm) {
                            return sm.id === subPerm.moduleId;
                        });
                        if (submodule) {
                            submodule.permissions = {
                                read: subPerm.read,
                                create: subPerm.create,
                                edit: subPerm.edit,
                                delete: subPerm.delete,
                                approval: subPerm.approval
                            };
                        }
                    });
                }
            }
        });
    };

    // Collect permissions from modules
    $scope.collectPermissions = function() {
        var permissions = [];
        
        angular.forEach($scope.data_Modules, function(module) {
            var modulePermission = {
                moduleId: module.id,
                moduleName: module.name,
                read: module.permissions.read,
                create: module.permissions.create,
                edit: module.permissions.edit,
                delete: module.permissions.delete,
                approval: module.permissions.approval,
                submodules: []
            };
            
            // Add submodules
            if (module.children && module.children.length > 0) {
                angular.forEach(module.children, function(child) {
                    modulePermission.submodules.push({
                        moduleId: child.id,
                        moduleName: child.name,
                        read: child.permissions.read,
                        create: child.permissions.create,
                        edit: child.permissions.edit,
                        delete: child.permissions.delete,
                        approval: child.permissions.approval
                    });
                });
            }
            
            permissions.push(modulePermission);
        });
        
        return permissions;
    };

    // Save data
    $scope.saveData = function () {
        $scope.form.submitted = true;

        // Validation
        if (!$scope.model.RoleName || $scope.model.RoleName.trim() === '') {
            Utility_ERP.showAlert('Validation Error', 'Role Name is required', 'warning');
            return;
        }

        // Collect permissions
        $scope.model.Permissions = $scope.collectPermissions();

        $('#idLoading').show();

        var savePromise = $scope.Is_Create ?
            RoleAccessForm_Service.create($scope.model) :
            RoleAccessForm_Service.update($scope.model);

        savePromise.then(function (response) {
            if (response.data.success) {
                Utility_ERP.showAlert('Success', 'Role Access saved successfully', 'success');
                $scope.sdr_GoBack();
            } else {
                Utility_ERP.showAlert('Error', response.data.message, 'error');
            }
            $('#idLoading').hide();
        }, function (error) {
            Utility_ERP.showAlert('Error', 'Failed to save role access', 'error');
            $('#idLoading').hide();
        });
    };

    // Toggle debug scope
    $scope.Toggle_debugScope = function () {
        $scope.allData_toJson = !$scope.allData_toJson;
        if ($scope.allData_toJson) {
            $scope.allData_toJson2 = {
                model: $scope.model,
                data_Modules: $scope.data_Modules,
                permissions: $scope.collectPermissions()
            };
        }
    };

    // Initialize on load
    $scope.init();
});