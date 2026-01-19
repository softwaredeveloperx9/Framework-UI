"use strict";

angular.module('app.erpUtils').factory('UserForm_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        // Base API endpoint
        var apiEndpoint = '/api/users';

        /**
         * Get user by ID
         * @param {string} id - User ID
         * @returns {Promise}
         */
        service.getById = function(id) {
            return BackEndService.get(apiEndpoint + '/' + id);
        };

        /**
         * Get all users
         * @returns {Promise}
         */
        service.getAll = function() {
            return BackEndService.get(apiEndpoint);
        };

        /**
         * Create new user
         * @param {Object} data - User data
         * @returns {Promise}
         */
        service.create = function(data) {
            var payload = {
                Employee: data.Employee,
                FullName: data.FullName,
                EmailAddress: data.EmailAddress,
                Password: data.Password,
                AssignRole: data.AssignRole
            };
            return BackEndService.post(apiEndpoint, payload);
        };

        /**
         * Update existing user
         * @param {Object} data - User data with ID
         * @returns {Promise}
         */
        service.update = function(data) {
            var payload = {
                Employee: data.Employee,
                FullName: data.FullName,
                EmailAddress: data.EmailAddress,
                AssignRole: data.AssignRole
            };
            
            // Only include password if it's being changed
            if (data.Password && data.Password.trim() !== '') {
                payload.Password = data.Password;
            }
            
            return BackEndService.put(apiEndpoint + '/' + data.Id, payload);
        };

        /**
         * Delete user
         * @param {string} id - User ID
         * @returns {Promise}
         */
        service.delete = function(id) {
            return BackEndService.delete(apiEndpoint + '/' + id);
        };

        /**
         * Check if email exists
         * @param {string} email - Email address to check
         * @returns {Promise}
         */
        service.checkEmailExists = function(email) {
            return BackEndService.get(apiEndpoint + '/check-email', { email: email });
        };

        /**
         * Get available roles
         * @returns {Promise}
         */
        service.getRoles = function() {
            return BackEndService.get('/api/roles');
        };

        /**
         * Search employees
         * @param {string} searchTerm - Search term (NIK or Name)
         * @returns {Promise}
         */
        service.searchEmployees = function(searchTerm) {
            return BackEndService.get('/api/employees/search', { q: searchTerm });
        };

        /**
         * Validate user data
         * @param {Object} data - User data to validate
         * @returns {Object} Validation result
         */
        service.validateUserData = function(data) {
            var errors = [];

            if (!data.Employee || data.Employee.trim() === '') {
                errors.push('Employee is required');
            }

            if (!data.FullName || data.FullName.trim() === '') {
                errors.push('Full Name is required');
            }

            if (!data.EmailAddress || data.EmailAddress.trim() === '') {
                errors.push('Email Address is required');
            } else {
                // Basic email validation
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(data.EmailAddress)) {
                    errors.push('Invalid email format');
                }
            }

            if (!data.Password || data.Password.trim() === '') {
                errors.push('Password is required');
            } else if (data.Password.length < 8) {
                errors.push('Password must be at least 8 characters');
            }

            if (!data.ConfirmPassword || data.ConfirmPassword.trim() === '') {
                errors.push('Confirm Password is required');
            } else if (data.Password !== data.ConfirmPassword) {
                errors.push('Passwords do not match');
            }

            if (!data.AssignRole || data.AssignRole.trim() === '') {
                errors.push('Assign Role is required');
            }

            return {
                isValid: errors.length === 0,
                errors: errors
            };
        };

        return service;
    },
]);