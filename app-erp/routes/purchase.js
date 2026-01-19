'use strict';

angular.module('app.erp').config(function ($stateProvider) {
    $stateProvider
        .state('app.erp.purchase', {
            url: '/erp/purchase',
            data: {
                title: 'Purchase',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/_WebPage.html',
                },
            },
        })

        .state('app.erp.purchaseApprovalWorkFlowForm', {
            url: '/erp/purchase/ApprovalWorkFlowForm',
            data: {
                title: 'Form: Approval WorkFlow',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/ApprovalWorkFlowForm.html',
                },
            },
        })

        .state('app.erp.purchaseApprovalWorkflows', {
            url: '/erp/purchase/ApprovalWorkflows',
            data: {
                title: 'Approval Workflows',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/ApprovalWorkflows.html',
                },
            },
        })

        .state('app.erp.purchaseInterbranchOrders', {
            url: '/erp/purchase/InterbranchOrders',
            data: {
                title: 'Interbranch Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/InterbranchOrdersPur.html',
                },
            },
        })

        .state('app.erp.purchaseInterbranchOrdersForm', {
            url: '/erp/purchase/InterbranchOrderForm',
            data: {
                title: 'Form: Interbranch Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/InterbranchOrdersPurForm.html',
                },
            },
        })

        .state('app.erp.purchaseOutstandingOrders', {
            url: '/erp/purchase/OutstandingOrders',
            data: {
                title: 'Outstanding Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/OutstandingOrdersPur.html',
                },
            },
        })

        .state('app.erp.purchaseOutstandingRequests', {
            url: '/erp/purchase/OutstandingRequests',
            data: {
                title: 'Outstanding Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/OutstandingRequests.html',
                },
            },
        })

        .state('app.erp.purchasePendingGoods', {
            url: '/erp/purchase/PendingGoods',
            data: {
                title: 'Pending Goods',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PendingGoods.html',
                },
            },
        })

        .state('app.erp.purchasePRPORecon', {
            url: '/erp/purchase/PRPORecon',
            data: {
                title: 'PR/PO Recon.',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PRPORecon.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseContractsForm', {
            url: '/erp/purchase/PurchaseContractForm',
            data: {
                title: 'Form: Purchase Contract',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseContractForm.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseContracts', {
            url: '/erp/purchase/PurchaseContracts',
            data: {
                title: 'Purchase Contracts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseContracts.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseDiscounts', {
            url: '/erp/purchase/PurchaseDiscounts',
            data: {
                title: 'Purchase Discounts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseDiscounts.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseDiscountsForm', {
            url: '/erp/purchase/PurchaseDiscountForm',
            data: {
                title: 'Form: Purchase Discounts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseDiscountsForm.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseOrdersForm', {
            url: '/erp/purchase/PurchaseOrderForm',
            data: {
                title: 'Form: Purchase Order',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseOrderForm.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseOrders', {
            url: '/erp/purchase/PurchaseOrders',
            data: {
                title: 'Purchase Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseOrders.html',
                },
            },
        })

        .state('app.erp.purchasePurchasePrices', {
            url: '/erp/purchase/PurchasePrices',
            data: {
                title: 'Purchase Prices',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchasePrices.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseReceiptsForm', {
            url: '/erp/purchase/PurchaseReceiptForm',
            data: {
                title: 'Form: Purchase Receipt',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseReceiptForm.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseReceipts', {
            url: '/erp/purchase/PurchaseReceipts',
            data: {
                title: 'Purchase Receipts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseReceipts.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseRequestsForm', {
            url: '/erp/purchase/PurchaseRequestForm',
            data: {
                title: 'Form: Purchase Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseRequestForm.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseRequests', {
            url: '/erp/purchase/PurchaseRequests',
            data: {
                title: 'Purchase Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseRequests.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseReturnsForm', {
            url: '/erp/purchase/PurchaseReturnForm',
            data: {
                title: 'Form: Purchase Return',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseReturnForm.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseReturns', {
            url: '/erp/purchase/PurchaseReturns',
            data: {
                title: 'Purchase Returns',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseReturns.html',
                },
            },
        })

        .state('app.erp.purchaseReceiptRevision', {
            url: '/erp/purchase/ReceiptRevision',
            data: {
                title: 'Receipt Revision',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/ReceiptRevision.html',
                },
            },
        })

        .state('app.erp.purchasePurchaseRequestItemSelection', {
            url: '/erp/purchase/PurchaseRequestItemSelection',
            data: {
                title: 'Purchase Request Item Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PurchaseRequestItemSelection.html',
                },
            },
        })

        .state('app.erp.purchasePOItemSelection', {
            url: '/erp/purchase/POItemSelection',
            data: {
                title: 'PO Item Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/POItemSelection.html',
                },
            },
        })

        .state('app.erp.purchasePReturnVerification', {
            url: '/erp/purchase/PReturnVerification',
            data: {
                title: 'P Return Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PReturnVerification.html',
                },
            },
        })

        .state('app.erp.purchasePReceiptItemSelection', {
            url: '/erp/purchase/PReceiptItemSelection',
            data: {
                title: 'P Receipt Item Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PReceiptItemSelection.html',
                },
            },
        })

        .state('app.erp.purchaseNonPRDemand', {
            url: '/erp/purchase/NonPRDemand',
            data: {
                title: 'Non PR Demand',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/NonPRDemand.html',
                },
            },
        })

        .state('app.erp.purchasePRToPO', {
            url: '/erp/purchase/PRToPO',
            data: {
                title: 'PR To PO',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PRToPO.html',
                },
            },
        })

        .state('app.erp.purchasePRClosingForm', {
            url: '/erp/purchase/PRClosingForm',
            data: {
                title: 'Form: PR Closing',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/PRClosingForm.html',
                },
            },
        })

        .state('app.erp.purchasePOClosingForm', {
            url: '/erp/purchase/POClosingForm',
            data: {
                title: 'Form: PO Closing',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/POClosingForm.html',
                },
            },
        })

        .state('app.erp.purchaseCancelPurchaseForm', {
            url: '/erp/purchase/CancelPurchaseForm',
            data: {
                title: 'Form: Cancel Purchase',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/CancelPurchaseForm.html',
                },
            },
        })

        .state('app.erp.purchaseDiscountForm', {
            url: '/erp/purchase/DiscountForm',
            data: {
                title: 'Form: Discount',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/purchase.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/purchase/DiscountForm.html',
                },
            },
        })

        ;
});
