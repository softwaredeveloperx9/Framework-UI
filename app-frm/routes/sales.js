'use strict';

angular.module('app.erp').config(function ($stateProvider) {
    $stateProvider
        .state('app.erp.sales', {
            url: '/erp/sales',
            data: {
                title: 'Sales',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/_WebPage.html',
                },
            },
        })

        .state('app.erp.salesAddressList', {
            url: '/erp/sales/AddressList',
            data: {
                title: 'Address List',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/AddressList.html',
                },
            },
        })

        .state('app.erp.salesAddressListForm', {
            url: '/erp/sales/AddressListForm',
            data: {
                title: 'Form: Address List',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/AddressListForm.html',
                },
            },
        })

        .state('app.erp.salesApprovalWorkFlowForm', {
            url: '/erp/sales/ApprovalWorkFlowForm',
            data: {
                title: 'Form: Approval WorkFlow',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/ApprovalWorkFlowForm.html',
                },
            },
        })

        .state('app.erp.salesApprovalWorkflows', {
            url: '/erp/sales/ApprovalWorkflows',
            data: {
                title: 'Approval Workflows',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/ApprovalWorkflows.html',
                },
            },
        })

        .state('app.erp.salesCloseOrders', {
            url: '/erp/sales/CloseOrders',
            data: {
                title: 'Close Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CloseOrders.html',
                },
            },
        })

        .state('app.erp.salesContractsForm', {
            url: '/erp/sales/ContractForm',
            data: {
                title: 'Form: Contract',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/ContractForm.html',
                },
            },
        })

        .state('app.erp.salesContracts', {
            url: '/erp/sales/Contracts',
            data: {
                title: 'Contracts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Contracts.html',
                },
            },
        })

        .state('app.erp.salesCreditLimitForm', {
            url: '/erp/sales/CreditLimitForm',
            data: {
                title: 'Form: Credit Limit',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CreditLimitForm.html',
                },
            },
        })

        .state('app.erp.salesCreditLimitRequests', {
            url: '/erp/sales/CreditLimitRequests',
            data: {
                title: 'Credit Limit Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CreditLimitRequests.html',
                },
            },
        })

        .state('app.erp.salesCustomerPricing', {
            url: '/erp/sales/CustomerPricing',
            data: {
                title: 'Customer Pricing',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CustomerPricing.html',
                },
            },
        })

        .state('app.erp.salesCustomerRequests', {
            url: '/erp/sales/CustomerRequests',
            data: {
                title: 'Customer Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CustomerRequests.html',
                },
            },
        })

        .state('app.erp.salesCustomerRequestsForm', {
            url: '/erp/sales/CustomerRequestForm',
            data: {
                title: 'Form: Customer Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CustomerRequestsForm.html',
                },
            },
        })

        .state('app.erp.salesCustomers', {
            url: '/erp/sales/Customers',
            data: {
                title: 'Customers',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Customers.html',
                },
            },
        })

        .state('app.erp.salesCustomersForm', {
            url: '/erp/sales/CustomerForm',
            data: {
                title: 'Customers',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CustomersForm.html',
                },
            },
        })

        .state('app.erp.salesDiscountForm', {
            url: '/erp/sales/DiscountForm',
            data: {
                title: 'Form: Discount',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/DiscountForm.html',
                },
            },
        })

        .state('app.erp.salesDiscounts', {
            url: '/erp/sales/Discounts',
            data: {
                title: 'Discounts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Discounts.html',
                },
            },
        })

        .state('app.erp.salesDropshipShipments', {
            url: '/erp/sales/DropshipShipments',
            data: {
                title: 'Dropship Shipments',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/DropshipShipments.html',
                },
            },
        })

        .state('app.erp.salesInterbranchOrders', {
            url: '/erp/sales/InterbranchOrders',
            data: {
                title: 'Interbranch Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/InterbranchOrders.html',
                },
            },
        })

        .state('app.erp.salesNewCustomerForm', {
            url: '/erp/sales/NewCustomerForm',
            data: {
                title: 'Form: New Customer',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/NewCustomerForm.html',
                },
            },
        })

        .state('app.erp.salesOnDemandItems', {
            url: '/erp/sales/OnDemandItems',
            data: {
                title: 'On Demand Items',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/OnDemandItems.html',
                },
            },
        })

        .state('app.erp.salesOutstandingItems', {
            url: '/erp/sales/OutstandingItems',
            data: {
                title: 'Outstanding Items',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/OutstandingItems.html',
                },
            },
        })

        .state('app.erp.salesOutstandingOrders', {
            url: '/erp/sales/OutstandingOrders',
            data: {
                title: 'Outstanding Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/OutstandingOrders.html',
                },
            },
        })

        .state('app.erp.salesPersonnels', {
            url: '/erp/sales/Personnels',
            data: {
                title: 'Personnels',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Personnels.html',
                },
            },
        })

        .state('app.erp.salesPriceAvailability', {
            url: '/erp/sales/PriceAvailability',
            data: {
                title: 'Price Availability',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/PriceAvailability.html',
                },
            },
        })

        .state('app.erp.salesPriceGroupsForm', {
            url: '/erp/sales/PriceGroupForm',
            data: {
                title: 'Form: Price Group',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/PriceGroupForm.html',
                },
            },
        })

        .state('app.erp.salesPriceGroups', {
            url: '/erp/sales/PriceGroups',
            data: {
                title: 'Price Groups',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/PriceGroups.html',
                },
            },
        })

        .state('app.erp.salesPricingSchemaForm', {
            url: '/erp/sales/PricingSchemaForm',
            data: {
                title: 'Form: Pricing Schema',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/PricingSchemaForm.html',
                },
            },
        })

        .state('app.erp.salesPricingSchema', {
            url: '/erp/sales/PricingSchema',
            data: {
                title: 'Pricing Schema',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/PricingSchema.html',
                },
            },
        })

        .state('app.erp.salesProjectDashboard', {
            url: '/erp/sales/ProjectDashboard',
            data: {
                title: 'Project Dashboard',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/ProjectDashboard.html',
                },
            },
        })

        .state('app.erp.salesProjectsForm', {
            url: '/erp/sales/ProjectForm',
            data: {
                title: 'Form: Project',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/ProjectForm.html',
                },
            },
        })

        .state('app.erp.salesProjects02', {
            url: '/erp/sales/Projects02',
            data: {
                title: 'Projects 02',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Projects02.html',
                },
            },
        })

        .state('app.erp.salesProjects', {
            url: '/erp/sales/Projects',
            data: {
                title: 'Projects',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Projects.html',
                },
            },
        })

        .state('app.erp.salesRevisions', {
            url: '/erp/sales/Revisions',
            data: {
                title: 'Revisions',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Revisions.html',
                },
            },
        })

        .state('app.erp.salesSalesOrdersForm', {
            url: '/erp/sales/SalesOrderForm',
            data: {
                title: 'Form: Sales Order',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesOrderForm.html',
                },
            },
        })

        .state('app.erp.salesSalesOrders', {
            url: '/erp/sales/SalesOrders',
            data: {
                title: 'Sales Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesOrders.html',
                },
            },
        })

        .state('app.erp.salesSalesOrdersTemplate', {
            url: '/erp/sales/SalesOrdersTemplate',
            data: {
                title: 'Sales Orders - Template',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesOrdersTemplate.html',
                },
            },
        })

        .state('app.erp.salesSalesPrices', {
            url: '/erp/sales/SalesPrices',
            data: {
                title: 'Sales Prices',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesPrices.html',
                },
            },
        })

        .state('app.erp.salesSalesQuotationsForm', {
            url: '/erp/sales/SalesQuotationForm',
            data: {
                title: 'Form: Sales Quotation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesQuotationForm.html',
                },
            },
        })

        .state('app.erp.salesSalesQuotations', {
            url: '/erp/sales/SalesQuotations',
            data: {
                title: 'Sales Quotations',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesQuotations.html',
                },
            },
        })

        .state('app.erp.salesSalesReturnsForm', {
            url: '/erp/sales/SalesReturnForm',
            data: {
                title: 'Form: Sales Return',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesReturnForm.html',
                },
            },
        })

        .state('app.erp.salesSalesReturns', {
            url: '/erp/sales/SalesReturns',
            data: {
                title: 'Sales Returns',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesReturns.html',
                },
            },
        })

        .state('app.erp.salesSupplierForm', {
            url: '/erp/sales/SupplierForm',
            data: {
                title: 'Form: Supplier',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SupplierForm.html',
                },
            },
        })

        .state('app.erp.salesVendors', {
            url: '/erp/sales/Vendors',
            data: {
                title: 'Vendors',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/Vendors.html',
                },
            },
        })

        .state('app.erp.salesOrderType', {
            url: '/erp/sales/OrderType',
            data: {
                title: 'Sales Order Type',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesOrderType.html',
                },
            },
        })

        .state('app.erp.salesOrderTypeForm', {
            url: '/erp/sales/OrderTypeForm',
            data: {
                title: 'Form: Sales Order Type',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesOrderTypeForm.html',
                },
            },
        })

        .state('app.erp.salesReleaseBlock', {
            url: '/erp/sales/ReleaseBlock',
            data: {
                title: 'Release Block',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/ReleaseBlock.html',
                },
            },
        })

        .state('app.erp.salesCreditLine', {
            url: '/erp/sales/CreditLine',
            data: {
                title: 'Credit Line',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CreditLine.html',
                },
            },
        })

        .state('app.erp.salesCreditLineForm', {
            url: '/erp/sales/CreditLineForm',
            data: {
                title: 'Form: Credit Line',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CreditLineForm.html',
                },
            },
        })

        .state('app.erp.salesTopChangeRequest', {
            url: '/erp/sales/TopChangeRequest',
            data: {
                title: 'TOP Change Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/TOPChangeRequest.html',
                },
            },
        })

        .state('app.erp.salesTopChangeRequestForm', {
            url: '/erp/sales/TopChangeRequestForm',
            data: {
                title: 'Form: TOP Change Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/TOPChangeRequestForm.html',
                },
            },
        })

        .state('app.erp.salesCustomerHold', {
            url: '/erp/sales/CustomerHold',
            data: {
                title: 'Customer Hold',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CustomerHold.html',
                },
            },
        })

        .state('app.erp.salesSalesPromo', {
            url: '/erp/sales/SalesPromo',
            data: {
                title: 'Sales Promo',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesPromo.html',
                },
            },
        })

        .state('app.erp.salesSalesPromoForm', {
            url: '/erp/sales/SalesPromoForm',
            data: {
                title: 'Form: Sales Promo',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SalesPromoForm.html',
                },
            },
        })

        .state('app.erp.salesVerifySalesOrders', {
            url: '/erp/sales/VerifySalesOrders',
            data: {
                title: 'Verify Sales Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/VerifySalesOrders.html',
                },
            },
        })

        .state('app.erp.salesReopenOrders', {
            url: '/erp/sales/ReopenOrders',
            data: {
                title: 'Reopen Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/ReopenOrders.html',
                },
            },
        })

        .state('app.erp.salesReopenOrdersForm', {
            url: '/erp/sales/ReopenOrderForm',
            data: {
                title: 'Form: Reopen Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/ReopenOrdersForm.html',
                },
            },
        })

        .state('app.erp.salesCloseRequestMonitoring', {
            url: '/erp/sales/CloseRequestMonitoring',
            data: {
                title: 'Close Request Monitoring',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CloseRequestMonitoring.html',
                },
            },
        })

        .state('app.erp.salesCloseRequestMonitoringForm', {
            url: '/erp/sales/CloseRequestMonitoringForm',
            data: {
                title: 'Form: Close Request Monitoring',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CloseRequestMonitoringForm.html',
                },
            },
        })

        .state('app.erp.salesSwapReservation', {
            url: '/erp/sales/SwapReservation',
            data: {
                title: 'Swap Reservation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SwapReservation.html',
                },
            },
        })

        .state('app.erp.salesReservedItems', {
            url: '/erp/sales/ReservedItems',
            data: {
                title: 'Reserved Items',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/ReservedItems.html',
                },
            },
        })

        .state('app.erp.salesDocumentTree', {
            url: '/erp/sales/DocumentTree',
            data: {
                title: 'Document Tree',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/DocumentTree.html',
                },
            },
        })

        .state('app.erp.salesDeliveredAndClosedDOSelection', {
            url: '/erp/sales/DeliveredAndClosedDOSelection',
            data: {
                title: 'Delivered and Closed DO Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/DeliveredAndClosedDOSelection.html',
                },
            },
        })

        .state('app.erp.salesCancelPurchase', {
            url: '/erp/sales/CancelPurchase',
            data: {
                title: 'Cancel Purchase',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CancelPurchase.html',
                },
            },
        })

        .state('app.erp.salesSOReopenForm', {
            url: '/erp/sales/SOReopenForm',
            data: {
                title: 'Form: SO Reopen Form',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SOReopenForm.html',
                },
            },
        })

        .state('app.erp.salesSOClosingForm', {
            url: '/erp/sales/SOClosingForm',
            data: {
                title: 'Form: SO Closing Form',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/SOClosingForm.html',
                },
            },
        })

        .state('app.erp.salesReleaseBlockedSO', {
            url: '/erp/sales/ReleaseBlockedSO',
            data: {
                title: 'Release Blocked SO',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/ReleaseBlockedSO.html',
                },
            },
        })

        .state('app.erp.salesExtendSORequest', {
            url: '/erp/sales/ExtendSORequest',
            data: {
                title: 'Extend SO Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/ExtendSORequest.html',
                },
            },
        })

        .state('app.erp.salesExtendSOItemReservation', {
            url: '/erp/sales/ExtendSOItemReservation',
            data: {
                title: 'Extend SO Item Reservation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/ExtendSOItemReservation.html',
                },
            },
        })

        .state('app.erp.salesDeliveryRequestForm', {
            url: '/erp/sales/DeliveryRequestForm',
            data: {
                title: 'Form: Delivery Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/DeliveryRequestForm.html',
                },
            },
        })

        .state('app.erp.salesCancelShipmentForm', {
            url: '/erp/sales/CancelShipmentForm',
            data: {
                title: 'Form: Cancel Shipment Form',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CancelShipmentForm.html',
                },
            },
        })

        .state('app.erp.salesCancelPurchaseForm', {
            url: '/erp/sales/CancelPurchaseForm',
            data: {
                title: 'Form: Cancel Purchase Form',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-frm/_menu/sales.html',
                },
                'content@app': {
                    templateUrl: 'app-frm/views/packages/sales/CancelPurchaseForm.html',
                },
            },
        })

        ;
});
