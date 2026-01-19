"use strict";

angular.module('app.erpUtils').factory('CustomerGradeForm_Service', [
    'BackEndService',
    'DTService',
    function (BackEndService, DTService) {
        var service = {};

        // Base API endpoint
        var apiEndpoint = '/api/customergrade';

        /**
         * Get customer grade by ID
         * @param {string} id - Customer Grade ID
         * @returns {Promise}
         */
        service.getById = function(id) {
            return BackEndService.get(apiEndpoint + '/' + id);
        };

        /**
         * Get all customer grades
         * @returns {Promise}
         */
        service.getAll = function() {
            return BackEndService.get(apiEndpoint);
        };

        /**
         * Get active customer grades only
         * @returns {Promise}
         */
        service.getActive = function() {
            return BackEndService.get(apiEndpoint + '/active');
        };

        /**
         * Create new customer grade
         * @param {Object} data - Customer Grade data
         * @returns {Promise}
         */
        service.create = function(data) {
            var payload = {
                Code: data.Code,
                Name: data.Name,
                Description: data.Description || '',
                Active: data.Active !== undefined ? data.Active : true
            };
            return BackEndService.post(apiEndpoint, payload);
        };

        /**
         * Update existing customer grade
         * @param {Object} data - Customer Grade data with ID
         * @returns {Promise}
         */
        service.update = function(data) {
            var payload = {
                Name: data.Name,
                Description: data.Description || '',
                Active: data.Active !== undefined ? data.Active : true
            };
            
            return BackEndService.put(apiEndpoint + '/' + data.Id, payload);
        };

        /**
         * Delete customer grade
         * @param {string} id - Customer Grade ID
         * @returns {Promise}
         */
        service.delete = function(id) {
            return BackEndService.delete(apiEndpoint + '/' + id);
        };

        /**
         * Check if code exists
         * @param {string} code - Code to check
         * @returns {Promise}
         */
        service.checkCodeExists = function(code) {
            return BackEndService.get(apiEndpoint + '/check-code', { code: code });
        };

        /**
         * Validate customer grade data
         * @param {Object} data - Customer Grade data to validate
         * @param {boolean} isCreate - Whether this is a create operation
         * @returns {Object} Validation result
         */
        service.validateData = function(data, isCreate) {
            var errors = [];

            if (isCreate && (!data.Code || data.Code.trim() === '')) {
                errors.push('Code is required');
            }

            if (!data.Name || data.Name.trim() === '') {
                errors.push('Name is required');
            }

            if (data.Name && data.Name.length > 100) {
                errors.push('Name cannot exceed 100 characters');
            }

            if (data.Description && data.Description.length > 500) {
                errors.push('Description cannot exceed 500 characters');
            }

            return {
                isValid: errors.length === 0,
                errors: errors
            };
        };

        /**
         * Get customer grades for dropdown
         * @returns {Promise}
         */
        service.getForDropdown = function() {
            return BackEndService.get(apiEndpoint + '/dropdown');
        };

        return service;
    },
]);