"use strict";

angular.module('app.erpUtils').factory('RoleAccessForm_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        // Base API endpoint
        var apiEndpoint = '/api/role-access';

        /**
         * Get role access by ID
         * @param {string} id - Role Access ID
         * @returns {Promise}
         */
        service.getById = function(id) {
            return BackEndService.get(apiEndpoint + '/' + id);
        };

        /**
         * Get all role access
         * @returns {Promise}
         */
        service.getAll = function() {
            return BackEndService.get(apiEndpoint);
        };

        /**
         * Create new role access
         * @param {Object} data - Role access data
         * @returns {Promise}
         */
        service.create = function(data) {
            var payload = {
                RoleName: data.RoleName,
                RoleStatus: data.RoleStatus,
                Description: data.Description,
                Permissions: data.Permissions
            };
            return BackEndService.post(apiEndpoint, payload);
        };

        /**
         * Update existing role access
         * @param {Object} data - Role access data with ID
         * @returns {Promise}
         */
        service.update = function(data) {
            var payload = {
                RoleName: data.RoleName,
                RoleStatus: data.RoleStatus,
                Description: data.Description,
                Permissions: data.Permissions
            };
            
            return BackEndService.put(apiEndpoint + '/' + data.Id, payload);
        };

        /**
         * Delete role access
         * @param {string} id - Role Access ID
         * @returns {Promise}
         */
        service.delete = function(id) {
            return BackEndService.delete(apiEndpoint + '/' + id);
        };

        /**
         * Check if role name exists
         * @param {string} roleName - Role name to check
         * @returns {Promise}
         */
        service.checkRoleNameExists = function(roleName) {
            return BackEndService.get(apiEndpoint + '/check-rolename', { roleName: roleName });
        };

        /**
         * Get available modules
         * @returns {Promise}
         */
        service.getModules = function() {
            return BackEndService.get('/api/modules');
        };

        /**
         * Get permissions by role
         * @param {string} roleId - Role ID
         * @returns {Promise}
         */
        service.getPermissionsByRole = function(roleId) {
            return BackEndService.get(apiEndpoint + '/' + roleId + '/permissions');
        };

        /**
         * Clone role access from existing role
         * @param {string} sourceRoleId - Source Role ID to clone from
         * @param {string} newRoleName - New role name
         * @returns {Promise}
         */
        service.cloneRole = function(sourceRoleId, newRoleName) {
            return BackEndService.post(apiEndpoint + '/clone', {
                SourceRoleId: sourceRoleId,
                NewRoleName: newRoleName
            });
        };

        /**
         * Get roles with permission count
         * @returns {Promise}
         */
        service.getRolesWithPermissionCount = function() {
            return BackEndService.get(apiEndpoint + '/summary');
        };

        /**
         * Validate role access data
         * @param {Object} data - Role access data to validate
         * @returns {Object} Validation result
         */
        service.validateRoleAccessData = function(data) {
            var errors = [];

            if (!data.RoleName || data.RoleName.trim() === '') {
                errors.push('Role Name is required');
            }

            if (!data.RoleStatus || data.RoleStatus.trim() === '') {
                errors.push('Role Status is required');
            }

            if (!data.Permissions || data.Permissions.length === 0) {
                errors.push('At least one permission must be assigned');
            } else {
                // Check if at least one permission is enabled
                var hasPermission = false;
                for (var i = 0; i < data.Permissions.length; i++) {
                    var perm = data.Permissions[i];
                    if (perm.read || perm.create || perm.edit || perm.delete || perm.approval) {
                        hasPermission = true;
                        break;
                    }
                    // Check submodules
                    if (perm.submodules && perm.submodules.length > 0) {
                        for (var j = 0; j < perm.submodules.length; j++) {
                            var subPerm = perm.submodules[j];
                            if (subPerm.read || subPerm.create || subPerm.edit || subPerm.delete || subPerm.approval) {
                                hasPermission = true;
                                break;
                            }
                        }
                    }
                    if (hasPermission) break;
                }
                
                if (!hasPermission) {
                    errors.push('At least one permission must be enabled');
                }
            }

            return {
                isValid: errors.length === 0,
                errors: errors
            };
        };

        /**
         * Compare two roles and return differences
         * @param {string} role1Id - First Role ID
         * @param {string} role2Id - Second Role ID
         * @returns {Promise}
         */
        service.compareRoles = function(role1Id, role2Id) {
            return BackEndService.get(apiEndpoint + '/compare', {
                role1: role1Id,
                role2: role2Id
            });
        };

        /**
         * Export role access to Excel
         * @param {string} roleId - Role ID to export
         * @returns {Promise}
         */
        service.exportToExcel = function(roleId) {
            return BackEndService.download(apiEndpoint + '/' + roleId + '/export', {
                format: 'excel'
            });
        };

        /**
         * Import role access from Excel
         * @param {File} file - Excel file
         * @returns {Promise}
         */
        service.importFromExcel = function(file) {
            var formData = new FormData();
            formData.append('file', file);
            
            return BackEndService.upload(apiEndpoint + '/import', formData);
        };

        /**
         * Get role access history/audit log
         * @param {string} roleId - Role ID
         * @returns {Promise}
         */
        service.getAuditLog = function(roleId) {
            return BackEndService.get(apiEndpoint + '/' + roleId + '/audit-log');
        };

        /**
         * Activate/Deactivate role
         * @param {string} roleId - Role ID
         * @param {string} status - 'Active' or 'Inactive'
         * @returns {Promise}
         */
        service.updateStatus = function(roleId, status) {
            return BackEndService.put(apiEndpoint + '/' + roleId + '/status', {
                Status: status
            });
        };

        /**
         * Get users assigned to a role
         * @param {string} roleId - Role ID
         * @returns {Promise}
         */
        service.getUsersByRole = function(roleId) {
            return BackEndService.get(apiEndpoint + '/' + roleId + '/users');
        };

        /**
         * Bulk update permissions for multiple roles
         * @param {Array} roles - Array of role IDs
         * @param {Object} permissions - Permissions to apply
         * @returns {Promise}
         */
        service.bulkUpdatePermissions = function(roles, permissions) {
            return BackEndService.post(apiEndpoint + '/bulk-update', {
                RoleIds: roles,
                Permissions: permissions
            });
        };

        return service;
    },
]);