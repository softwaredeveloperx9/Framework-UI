'use strict';

angular.module('app.erp').config(function ($stateProvider) {
    $stateProvider
        .state('app.erp.shipment', {
            url: '/erp/shipment',
            data: {
                title: 'Shipment',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/_WebPage.html',
                },
            },
        })

        .state('app.erp.shipmentCancelShipments', {
            url: '/erp/shipment/CancelShipments',
            data: {
                title: 'Cancel Shipments',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/CancelShipments.html',
                },
            },
        })

        .state('app.erp.shipmentCancelShipmentsForm', {
            url: '/erp/shipment/CancelShipmentForm',
            data: {
                title: 'Form: Cancel Shipments',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/CancelShipmentForm.html',
                },
            },
        })

        .state('app.erp.shipmentCarrierTypesForm', {
            url: '/erp/shipment/CarrierTypeForm',
            data: {
                title: 'Form: Carrier Type',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/CarrierTypeForm.html',
                },
            },
        })

        .state('app.erp.shipmentCarrierTypes', {
            url: '/erp/shipment/CarrierTypes',
            data: {
                title: 'Carrier Types',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/CarrierTypes.html',
                },
            },
        })

        .state('app.erp.shipmentCarriers', {
            url: '/erp/shipment/Carriers',
            data: {
                title: 'Carriers',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/Carriers.html',
                },
            },
        })

        .state('app.erp.shipmentCarriersForm', {
            url: '/erp/shipment/CarrierForm',
            data: {
                title: 'Form: Carrier',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/CarrierForm.html',
                },
            },
        })

        .state('app.erp.shipmentDOReconciliation', {
            url: '/erp/shipment/DOReconciliation',
            data: {
                title: 'DO Reconciliation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/DOReconciliation.html',
                },
            },
        })

        .state('app.erp.shipmentDOReconciliationForm', {
            url: '/erp/shipment/DOReconciliationForm',
            data: {
                title: 'Form: DO Reconciliation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/DOReconciliationForm.html',
                },
            },
        })

        .state('app.erp.shipmentDeliveryMemos', {
            url: '/erp/shipment/DeliveryMemos',
            data: {
                title: 'Delivery Memos',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/DeliveryMemos.html',
                },
            },
        })

        .state('app.erp.shipmentDeliveryOrderVerification', {
            url: '/erp/shipment/DeliveryOrderVerification',
            data: {
                title: 'Delivery Order Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/DeliveryOrderVerification.html',
                },
            },
        })

        .state('app.erp.shipmentDeliveryOrders', {
            url: '/erp/shipment/DeliveryOrders',
            data: {
                title: 'Delivery Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/DeliveryOrders.html',
                },
            },
        })

        .state('app.erp.shipmentDeliveryOrdersForm', {
            url: '/erp/shipment/DeliveryOrderForm',
            data: {
                title: 'Form: Delivery Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/DeliveryOrdersForm.html',
                },
            },
        })

        .state('app.erp.shipmentDeliveryRequests', {
            url: '/erp/shipment/DeliveryRequests',
            data: {
                title: 'Delivery Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/DeliveryRequests.html',
                },
            },
        })

        .state('app.erp.shipmentDeliveryRequestsForm', {
            url: '/erp/shipment/DeliveryRequestForm',
            data: {
                title: 'Form: Delivery Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/DeliveryRequestForm.html',
                },
            },
        })

        .state('app.erp.shipmentDoToManifest', {
            url: '/erp/shipment/DoToManifest',
            data: {
                title: 'DO to Manifest',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/DOToManifest.html',
                },
            },
        })

        .state('app.erp.shipmentLogisticOrders', {
            url: '/erp/shipment/LogisticOrders',
            data: {
                title: 'Logistic Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/LogisticOrders.html',
                },
            },
        })

        .state('app.erp.shipmentLogisticOrdersForm', {
            url: '/erp/shipment/LogisticOrderForm',
            data: {
                title: 'Form: Logistic Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/LogisticOrderForm.html',
                },
            },
        })

        .state('app.erp.shipmentLogisticRequests', {
            url: '/erp/shipment/LogisticRequests',
            data: {
                title: 'Logistic Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/LogisticRequests.html',
                },
            },
        })

        .state('app.erp.shipmentLogisticRequestsForm', {
            url: '/erp/shipment/LogisticRequestForm',
            data: {
                title: 'Form: Logistic Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/LogisticRequestsForm.html',
                },
            },
        })

        .state('app.erp.shipmentManifestPublishForm', {
            url: '/erp/shipment/ManifestPublishForm',
            data: {
                title: 'Form: Manifest Publish',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/ManifestPublishForm.html',
                },
            },
        })

        .state('app.erp.shipmentManifests', {
            url: '/erp/shipment/Manifests',
            data: {
                title: 'Manifests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/Manifests.html',
                },
            },
        })

        .state('app.erp.shipmentManifestsForm', {
            url: '/erp/shipment/ManifestForm',
            data: {
                title: 'Form: Manifests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/ManifestForm.html',
                },
            },
        })

        .state('app.erp.shipmentPackingVerification', {
            url: '/erp/shipment/PackingVerification',
            data: {
                title: 'Packing Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PackingVerification.html',
                },
            },
        })

        .state('app.erp.shipmentPickerPersonnels', {
            url: '/erp/shipment/PickerPersonnels',
            data: {
                title: 'Picker Personnels',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PickerPersonnels.html',
                },
            },
        })

        .state('app.erp.shipmentPickingOrder', {
            url: '/erp/shipment/PickingOrder',
            data: {
                title: 'Picking Order',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PickingOrder.html',
                },
            },
        })

        .state('app.erp.shipmentPickupOrdersForm', {
            url: '/erp/shipment/PickupOrderForm',
            data: {
                title: 'Form: Pickup Order',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PickupOrderForm.html',
                },
            },
        })

        .state('app.erp.shipmentPickupOrders', {
            url: '/erp/shipment/PickupOrders',
            data: {
                title: 'Pickup Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PickupOrders.html',
                },
            },
        })

        .state('app.erp.shipmentProofOfDeliveries', {
            url: '/erp/shipment/ProofOfDeliveries',
            data: {
                title: 'Proof Of Deliveries',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/ProofOfDeliveries.html',
                },
            },
        })

        .state('app.erp.shipmentProofOfDeliveriesForm', {
            url: '/erp/shipment/ProofOfDeliveryForm',
            data: {
                title: 'Form: Proof Of Deliveries',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/ProofOfDeliveriesForm.html',
                },
            },
        })

        .state('app.erp.shipmentRouteItemVerification', {
            url: '/erp/shipment/RouteItemVerification',
            data: {
                title: 'Route Item Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/RouteItemVerification.html',
                },
            },
        })

        .state('app.erp.shipmentSalesReturns', {
            url: '/erp/shipment/SalesReturns',
            data: {
                title: 'Sales Returns',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/SalesReturnsSH.html',
                },
            },
        })

        .state('app.erp.shipmentSalesReturnsForm', {
            url: '/erp/shipment/SalesReturnForm',
            data: {
                title: 'Form: Sales Returns',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/SalesReturnsSHForm.html',
                },
            },
        })

        .state('app.erp.shipmentShipmentRequests', {
            url: '/erp/shipment/ShipmentRequests',
            data: {
                title: 'Shipment Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/ShipmentRequests.html',
                },
            },
        })

        .state('app.erp.shipmentShipmentRequestsForm', {
            url: '/erp/shipment/ShipmentRequestForm',
            data: {
                title: 'Shipment Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/ShipmentRequestForm.html',
                },
            },
        })

        .state('app.erp.shipmentShipmentRouting', {
            url: '/erp/shipment/ShipmentRouting',
            data: {
                title: 'Shipment Routing',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/ShipmentRouting.html',
                },
            },
        })

        .state('app.erp.shipmentShipmentRoutingForm', {
            url: '/erp/shipment/ShipmentRoutingForm',
            data: {
                title: 'Shipment Routing',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/ShipmentRoutingForm.html',
                },
            },
        })

        .state('app.erp.shipmentApprovalWorkflows', {
            url: '/erp/shipment/ApprovalWorkflows',
            data: {
                title: 'Approval Workflows',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/ApprovalWorkflows.html',
                },
            },
        })

        .state('app.erp.shipmentPickedOutstandingItem', {
            url: '/erp/shipment/PickedOutstandingItem',
            data: {
                title: 'Picked Outstanding Item',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PickedOutstandingItem.html',
                },
            },
        })

        .state('app.erp.shipmentInternalPickupMemos', {
            url: '/erp/shipment/InternalPickupMemos',
            data: {
                title: 'Internal Pickup Memos',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/InternalPickupMemos.html',
                },
            },
        })

        .state('app.erp.shipmentPickedRoutes', {
            url: '/erp/shipment/PickedRoutes',
            data: {
                title: 'Picked Routes',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PickedRoutes.html',
                },
            },
        })

        .state('app.erp.shipmentUpdatePickupPicked', {
            url: '/erp/shipment/UpdatePickupPicked',
            data: {
                title: 'Update Pickup Picked',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/UpdatePickupPicked.html',
                },
            },
        })

        .state('app.erp.shipmentSplitRouteForm', {
            url: '/erp/shipment/SplitRouteForm',
            data: {
                title: 'Form: Split Route',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/SplitRouteForm.html',
                },
            },
        })

        .state('app.erp.shipmentRouteForm', {
            url: '/erp/shipment/RouteForm',
            data: {
                title: 'Form: Route',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/RouteForm.html',
                },
            },
        })

        .state('app.erp.shipmentRouteDelayForm', {
            url: '/erp/shipment/RouteDelayForm',
            data: {
                title: 'Form: Route Delay',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/RouteDelayForm.html',
                },
            },
        })

        .state('app.erp.shipmentPODVerification', {
            url: '/erp/shipment/PODVerification',
            data: {
                title: 'POD Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PODVerification.html',
                },
            },
        })

        .state('app.erp.shipmentPickupVerification', {
            url: '/erp/shipment/PickupVerification',
            data: {
                title: 'Pickup Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PickupVerification.html',
                },
            },
        })

        .state('app.erp.shipmentPickupRequestForm', {
            url: '/erp/shipment/PickupRequestForm',
            data: {
                title: 'Form: Pickup Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PickupRequestForm.html',
                },
            },
        })

        .state('app.erp.shipmentPackingForm', {
            url: '/erp/shipment/PackingForm',
            data: {
                title: 'Form: Packing',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PackingForm.html',
                },
            },
        })

        .state('app.erp.shipmentManifestRevision', {
            url: '/erp/shipment/ManifestRevision',
            data: {
                title: 'Manifest Revision',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/ManifestRevision.html',
                },
            },
        })

        .state('app.erp.shipmentLogisticRequestSelection', {
            url: '/erp/shipment/LogisticRequestSelection',
            data: {
                title: 'Logistic Request Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/LogisticRequestSelection.html',
                },
            },
        })

        .state('app.erp.shipmentExtPickupMemos', {
            url: '/erp/shipment/ExtPickupMemos',
            data: {
                title: 'Ext Pickup Memos',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/ExtPickupMemos.html',
                },
            },
        })

        .state('app.erp.shipmentDeliveryMemoForm', {
            url: '/erp/shipment/DeliveryMemoForm',
            data: {
                title: 'Form: Delivery Memo',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/DeliveryMemoForm.html',
                },
            },
        })

        .state('app.erp.shipmentDeliveryMemoVerification', {
            url: '/erp/shipment/DeliveryMemoVerification',
            data: {
                title: 'Delivery Memo Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/DeliveryMemoVerification.html',
                },
            },
        })

        .state('app.erp.shipmentAddToManifest', {
            url: '/erp/shipment/AddToManifest',
            data: {
                title: 'Add to Manifest',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/AddToManifest.html',
                },
            },
        })

        .state('app.erp.shipmentAddRouteToManifest', {
            url: '/erp/shipment/AddRouteToManifest',
            data: {
                title: 'Add Route to Manifest',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/AddRouteToManifest.html',
                },
            },
        })

        .state('app.erp.shipmentPickingOrderVerification', {
            url: '/erp/shipment/PickingOrderVerification',
            data: {
                title: 'Verify: Picking Order',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PickingOrderVerification.html',
                },
            },
        })

        .state('app.erp.shipmentSalesReturnsSH', {
            url: '/erp/shipment/SalesReturnsSH',
            data: {
                title: 'Sales Returns',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/SalesReturnsSH.html',
                },
            },
        })

        .state('app.erp.shipmentPickingForm', {
            url: '/erp/shipment/PickingForm',
            data: {
                title: 'Form: Picking',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/PickingForm.html',
                },
            },
        })

        .state('app.erp.shipmentRouteAddressUpdate', {
            url: '/erp/shipment/RouteAddressUpdate',
            data: {
                title: 'Update: Route Address',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/RouteAddressUpdate.html',
                },
            },
        })

        .state('app.erp.shipmentKirimanBarangOpen', {
            url: '/erp/shipment/KirimanBarangOpen',
            data: {
                title: 'KirimanBarang - Open',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/KirimanBarangOpen.html',
                },
            },
        })

        .state('app.erp.shipmentKirimanBarangCL', {
            url: '/erp/shipment/KirimanBarangCL',
            data: {
                title: 'KirimanBarang - CL',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/shipment.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/shipment/KirimanBarangCL.html',
                },
            },
        })

        ;
});
