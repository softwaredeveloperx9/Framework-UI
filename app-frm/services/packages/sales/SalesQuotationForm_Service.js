"use strict";

angular.module('app.erpUtils').factory('SalesQuotationForm_Service', [
    'BackEndService',
    'DTService',
    '$q',
    function (BackEndService, DTService, $q) {
        var service = {};

        // Base API URL
        var baseUrl = '/api/sales/quotations';

        /**
         * Get Master Data for form dropdowns
         */
        service.getMasterData = function() {
            return BackEndService.get(baseUrl + '/masterdata');
        };

        /**
         * Search Customer by text
         */
        service.searchCustomer = function(searchText) {
            return BackEndService.get('/api/master/customers/search', {
                params: { searchText: searchText }
            });
        };

        /**
         * Get Customer Addresses
         */
        service.getCustomerAddresses = function(customerId) {
            return BackEndService.get('/api/master/customers/' + customerId + '/addresses');
        };

        /**
         * Search Inventory Item by text
         */
        service.searchInventoryItem = function(searchText) {
            return BackEndService.get('/api/inventory/items/search', {
                params: { searchText: searchText }
            });
        };

        /**
         * Get Item UOM Profile
         */
        service.getItemUomProfile = function(itemCode) {
            return BackEndService.get('/api/inventory/items/' + itemCode + '/uom-profile');
        };

        /**
         * Get Item Stock
         */
        service.getItemStock = function(itemCode) {
            return BackEndService.get('/api/inventory/items/' + itemCode + '/stock');
        };

        /**
         * Get Item Price for Customer
         */
        service.getItemPrice = function(itemCode, customerId) {
            return BackEndService.get('/api/sales/pricing/item-price', {
                params: { 
                    itemCode: itemCode,
                    customerId: customerId
                }
            });
        };

        /**
         * Get Quotation by ID
         */
        service.getQuotationById = function(quotationId) {
            return BackEndService.get(baseUrl + '/' + quotationId);
        };

        /**
         * Create new Quotation
         */
        service.createQuotation = function(data) {
            return BackEndService.post(baseUrl, data);
        };

        /**
         * Update existing Quotation
         */
        service.updateQuotation = function(quotationId, data) {
            return BackEndService.put(baseUrl + '/' + quotationId, data);
        };

        /**
         * Delete Quotation
         */
        service.deleteQuotation = function(quotationId) {
            return BackEndService.delete(baseUrl + '/' + quotationId);
        };

        /**
         * Get Quotation List with DataTables
         */
        service.getQuotationList = function(dtParams) {
            return DTService.getDTData(baseUrl + '/list', dtParams);
        };

        /**
         * Confirm Quotation
         */
        service.confirmQuotation = function(quotationId) {
            return BackEndService.post(baseUrl + '/' + quotationId + '/confirm');
        };

        /**
         * Cancel Quotation
         */
        service.cancelQuotation = function(quotationId) {
            return BackEndService.post(baseUrl + '/' + quotationId + '/cancel');
        };

        /**
         * Convert Quotation to Sales Order
         */
        service.convertToSalesOrder = function(quotationId) {
            return BackEndService.post(baseUrl + '/' + quotationId + '/convert-to-order');
        };

        /**
         * Get Alternate Items for Quotation
         */
        service.getAlternateItems = function(quotationId) {
            return BackEndService.get(baseUrl + '/' + quotationId + '/alternate-items');
        };

        /**
         * Print Quotation
         */
        service.printQuotation = function(quotationId) {
            return BackEndService.get(baseUrl + '/' + quotationId + '/print', {
                responseType: 'blob'
            });
        };

        /**
         * Export Quotation to PDF
         */
        service.exportToPDF = function(quotationId) {
            return BackEndService.get(baseUrl + '/' + quotationId + '/export/pdf', {
                responseType: 'blob'
            });
        };

        /**
         * Export Quotation to Excel
         */
        service.exportToExcel = function(quotationId) {
            return BackEndService.get(baseUrl + '/' + quotationId + '/export/excel', {
                responseType: 'blob'
            });
        };

        /**
         * Get Quotation History
         */
        service.getQuotationHistory = function(quotationId) {
            return BackEndService.get(baseUrl + '/' + quotationId + '/history');
        };

        /**
         * Clone Quotation
         */
        service.cloneQuotation = function(quotationId) {
            return BackEndService.post(baseUrl + '/' + quotationId + '/clone');
        };

        /**
         * Get Quotation Status List
         */
        service.getQuotationStatusList = function() {
            return BackEndService.get(baseUrl + '/status-list');
        };

        /**
         * Validate Quotation
         */
        service.validateQuotation = function(data) {
            return BackEndService.post(baseUrl + '/validate', data);
        };

        /**
         * Get VAT Calculation
         */
        service.calculateVAT = function(amount, vatCode) {
            return BackEndService.get('/api/master/vat/calculate', {
                params: {
                    amount: amount,
                    vatCode: vatCode
                }
            });
        };

        /**
         * Get Discount Calculation
         */
        service.calculateDiscount = function(amount, discountPercent) {
            var deferred = $q.defer();
            
            var discountAmount = amount * (discountPercent / 100);
            var result = {
                originalAmount: amount,
                discountPercent: discountPercent,
                discountAmount: discountAmount,
                finalAmount: amount - discountAmount
            };
            
            deferred.resolve({ data: result });
            return deferred.promise;
        };

        /**
         * Bulk update items
         */
        service.bulkUpdateItems = function(quotationId, items) {
            return BackEndService.post(baseUrl + '/' + quotationId + '/items/bulk-update', items);
        };

        /**
         * Get Item Alternatives
         */
        service.getItemAlternatives = function(itemCode) {
            return BackEndService.get('/api/inventory/items/' + itemCode + '/alternatives');
        };

        /**
         * Check Item Availability
         */
        service.checkItemAvailability = function(itemCode, qty, branchId) {
            return BackEndService.get('/api/inventory/items/' + itemCode + '/check-availability', {
                params: {
                    qty: qty,
                    branchId: branchId
                }
            });
        };

        return service;
    }
]);