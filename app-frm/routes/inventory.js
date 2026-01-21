'use strict';

angular.module('app.erp').config(function ($stateProvider) {
    $stateProvider
        .state('app.erp.inventory', {
            url: '/erp/inventory',
            data: {
                title: 'Inventory',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/_WebPage.html',
                },
            },
        })

        .state('app.erp.inventoryAssemblyOrdersForm', {
            url: '/erp/inventory/AssemblyOrderForm',
            data: {
                title: 'Form: Assembly Order',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/AssemblyOrdersForm.html',
                },
            },
        })

        .state('app.erp.inventoryAssemblyOrders', {
            url: '/erp/inventory/AssemblyOrders',
            data: {
                title: 'Assembly Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/AssemblyOrders.html',
                },
            },
        })

        .state('app.erp.inventoryAssetDisposalsForm', {
            url: '/erp/inventory/AssetDisposalForm',
            data: {
                title: 'Form: Asset Disposals',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/AssetDisposalsForm.html',
                },
            },
        })

        .state('app.erp.inventoryAssetDisposals', {
            url: '/erp/inventory/AssetDisposals',
            data: {
                title: 'Asset Disposals',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/AssetDisposals.html',
                },
            },
        })

        .state('app.erp.inventoryAssetsForm', {
            url: '/erp/inventory/AssetForm',
            data: {
                title: 'Form: Asset',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/AssetForm.html',
                },
            },
        })

        .state('app.erp.inventoryAssets', {
            url: '/erp/inventory/Assets',
            data: {
                title: 'Assets',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Assets.html',
                },
            },
        })

        .state('app.erp.inventoryBranchAllocation', {
            url: '/erp/inventory/BranchAllocation',
            data: {
                title: 'Branch Allocation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/BranchAllocation.html',
                },
            },
        })

        .state('app.erp.inventoryBrandsForm', {
            url: '/erp/inventory/BrandForm?code',
            data: {
                title: 'Form: Brand',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/BrandForm.html',
                },
            },
        })

        .state('app.erp.inventoryBrands', {
            url: '/erp/inventory/Brands',
            data: {
                title: 'Brands',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Brands.html',
                },
            },
        })

        .state('app.erp.inventoryCategoriesX', {
            url: '/erp/inventory/CategoriesX',
            data: {
                title: 'Categories - X',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/CategoriesX.html',
                },
            },
        })

        .state('app.erp.inventoryCategories', {
            url: '/erp/inventory/Categories',
            data: {
                title: 'Categories',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Categories.html',
                },
            },
        })

        .state('app.erp.inventoryCategoriesForm', {
            url: '/erp/inventory/CategoryForm?code',
            data: {
                title: 'Form: Category',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/CategoryForm.html',
                },
            },
        })

        .state('app.erp.inventoryComparisonPanel', {
            url: '/erp/inventory/ComparisonPanel',
            data: {
                title: 'Comparison Panel',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/ComparisonPanel.html',
                },
            },
        })

        .state('app.erp.inventoryContractPosition', {
            url: '/erp/inventory/ContractPosition',
            data: {
                title: 'Contract Position',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/ContractPosition.html',
                },
            },
        })

        .state('app.erp.inventoryCostGroupsForm', {
            url: '/erp/inventory/CostGroupForm?code',
            data: {
                title: 'Form: Cost Group',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/CostGroupForm.html',
                },
            },
        })

        .state('app.erp.inventoryCostGroups', {
            url: '/erp/inventory/CostGroups',
            data: {
                title: 'Cost Groups',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/CostGroups.html',
                },
            },
        })

        .state('app.erp.inventoryDisassemblyOrders', {
            url: '/erp/inventory/DisassemblyOrders',
            data: {
                title: 'Disassembly Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/DisassemblyOrders.html',
                },
            },
        })

        .state('app.erp.inventoryDisassemblyOrdersForm', {
            url: '/erp/inventory/DisassemblyOrderForm',
            data: {
                title: 'Form: Disassembly Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/DisassemblyOrdersForm.html',
                },
            },
        })

        .state('app.erp.inventoryDisposalMethods', {
            url: '/erp/inventory/DisposalMethods',
            data: {
                title: 'Disposal Methods',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/DisposalMethods.html',
                },
            },
        })

        .state('app.erp.inventoryDisposalMethodsForm', {
            url: '/erp/inventory/DisposalMethodForm?code',
            data: {
                title: 'Form: Disposal Methods',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/DisposalMethodsForm.html',
                },
            },
        })

        .state('app.erp.inventoryDropshipPositions', {
            url: '/erp/inventory/DropshipPositions',
            data: {
                title: 'Dropship Positions',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/DropshipPositions.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryAdjustments', {
            url: '/erp/inventory/InventoryAdjustments',
            data: {
                title: 'Inventory Adjustments',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryAdjustments.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryAdjustmentsForm', {
            url: '/erp/inventory/InventoryAdjustmentForm',
            data: {
                title: 'Form: Inventory Adjustments',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryAdjustmentsForm.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryCounts', {
            url: '/erp/inventory/InventoryCounts',
            data: {
                title: 'Inventory Counts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryCounts.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryCountsForm', {
            url: '/erp/inventory/InventoryCountForm',
            data: {
                title: 'Form: Inventory Counts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryCountsForm.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryIsolations', {
            url: '/erp/inventory/InventoryIsolations',
            data: {
                title: 'Inventory Isolations',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryIsolations.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryIsolationsForm', {
            url: '/erp/inventory/InventoryIsolationForm',
            data: {
                title: 'Form: Inventory Isolations',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryIsolationsForm.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryItemsForm', {
            url: '/erp/inventory/InventoryItemForm?code',
            data: {
                title: 'Form: Inventory Item',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryItemForm.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryItems', {
            url: '/erp/inventory/InventoryItems',
            data: {
                title: 'Inventory Items',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryItems.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryLeaseForm', {
            url: '/erp/inventory/InventoryLeaseForm',
            data: {
                title: 'Form: Inventory Lease',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryLeaseForm.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryLease', {
            url: '/erp/inventory/InventoryLease',
            data: {
                title: 'Inventory Lease',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryLease.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryRequests', {
            url: '/erp/inventory/InventoryRequests',
            data: {
                title: 'Inventory Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryRequests.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryRequestsForm', {
            url: '/erp/inventory/InventoryRequestForm',
            data: {
                title: 'Form: Inventory Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryRequestsForm.html',
                },
            },
        })

        .state('app.erp.inventoryIssueForm', {
            url: '/erp/inventory/IssueForm',
            data: {
                title: 'Form: Issue',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/IssueForm.html',
                },
            },
        })

        .state('app.erp.inventoryItemCosts', {
            url: '/erp/inventory/ItemCosts',
            data: {
                title: 'Item Costs',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/ItemCosts.html',
                },
            },
        })

        .state('app.erp.inventoryItemCostsForm', {
            url: '/erp/inventory/ItemCostForm',
            data: {
                title: 'Form: Item Costs',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/ItemCostsForm.html',
                },
            },
        })

        .state('app.erp.inventoryManufacturersForm', {
            url: '/erp/inventory/ManufacturerForm?code',
            data: {
                title: 'Form: Manufacture',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/ManufacturerForm.html',
                },
            },
        })

        .state('app.erp.inventoryManufacturers', {
            url: '/erp/inventory/Manufacturers',
            data: {
                title: 'Manufacturers',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Manufacturers.html',
                },
            },
        })

        .state('app.erp.inventoryMinimumStocks', {
            url: '/erp/inventory/MinimumStocks',
            data: {
                title: 'Minimum Stocks',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/MinimumStocks.html',
                },
            },
        })

        .state('app.erp.inventoryOutgoingOrders', {
            url: '/erp/inventory/OutgoingOrders',
            data: {
                title: 'Outgoing Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/OutgoingOrders.html',
                },
            },
        })

        .state('app.erp.inventoryOutgoingOrdersForm', {
            url: '/erp/inventory/OutgoingOrderForm',
            data: {
                title: 'Form: Outgoing Order',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/OutgoingOrdersForm.html',
                },
            },
        })

        .state('app.erp.inventoryProfilesForm', {
            url: '/erp/inventory/ProfileForm?code',
            data: {
                title: 'Form: Profile',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/ProfileForm.html',
                },
            },
        })

        .state('app.erp.inventoryProfiles', {
            url: '/erp/inventory/Profiles',
            data: {
                title: 'Profiles',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Profiles.html',
                },
            },
        })

        .state('app.erp.inventoryReplenishment', {
            url: '/erp/inventory/Replenishment',
            data: {
                title: 'Replenishment',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Replenishment.html',
                },
            },
        })

        .state('app.erp.inventoryReservePositions', {
            url: '/erp/inventory/ReservePositions',
            data: {
                title: 'Reserve Positions',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/ReservePositions.html',
                },
            },
        })

        .state('app.erp.inventoryStockPositions', {
            url: '/erp/inventory/StockPositions',
            data: {
                title: 'Stock Positions',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/StockPositions.html',
                },
            },
        })

        .state('app.erp.inventoryTaxPositions', {
            url: '/erp/inventory/TaxPositions',
            data: {
                title: 'Tax Positions',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/TaxPositions.html',
                },
            },
        })

        .state('app.erp.inventoryTaxReplenishment', {
            url: '/erp/inventory/TaxReplenishment',
            data: {
                title: 'Tax Replenishment',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/TaxReplenishment.html',
                },
            },
        })

        .state('app.erp.inventoryTransferForm', {
            url: '/erp/inventory/TransferForm',
            data: {
                title: 'Form: Transfer',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/TransferForm.html',
                },
            },
        })

        .state('app.erp.inventoryTransferRequests', {
            url: '/erp/inventory/TransferRequests',
            data: {
                title: 'Transfer Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/TransferRequests.html',
                },
            },
        })

        .state('app.erp.inventoryTransferRequestsForm', {
            url: '/erp/inventory/TransferRequestForm',
            data: {
                title: 'Form: Transfer Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/TransferRequestsForm.html',
                },
            },
        })

        .state('app.erp.inventoryUoms', {
            url: '/erp/inventory/Uoms',
            data: {
                title: 'Uoms',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Uoms.html',
                },
            },
        })

        .state('app.erp.inventoryUomsForm', {
            url: '/erp/inventory/UomForm?code',
            data: {
                title: 'Form: Uom',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/UomForm.html',
                },
            },
        })

        .state('app.erp.inventoryWarehousesForm', {
            url: '/erp/inventory/WarehouseForm?code',
            data: {
                title: 'Form: Warehouse',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/WarehouseForm.html',
                },
            },
        })

        .state('app.erp.inventoryWarehouses', {
            url: '/erp/inventory/Warehouses',
            data: {
                title: 'Warehouses',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Warehouses.html',
                },
            },
        })

        .state('app.erp.inventoryWarehouseSelection', {
            url: '/erp/inventory/WarehouseSelection',
            data: {
                title: 'Warehouse Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/WarehouseSelection.html',
                },
            },
        })

        .state('app.erp.inventoryIsolationVerification', {
            url: '/erp/inventory/IsolationVerification',
            data: {
                title: 'Isolation Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/IsolationVerification.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryReceiptVerification', {
            url: '/erp/inventory/InventoryReceiptVerification',
            data: {
                title: 'Inventory Receipt Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryReceiptVerification.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryIssueVerification', {
            url: '/erp/inventory/InventoryIssueVerification',
            data: {
                title: 'Inventory Issue Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryIssueVerification.html',
                },
            },
        })

        .state('app.erp.inventoryDeliveredClosedDoSelection', {
            url: '/erp/inventory/DeliveredClosedDoSelection',
            data: {
                title: 'Delivered Closed DO Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/DeliveredClosedDOSelection.html',
                },
            },
        })

        .state('app.erp.inventoryCountVerification', {
            url: '/erp/inventory/CountVerification',
            data: {
                title: 'Count Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/CountVerification.html',
                },
            },
        })

        .state('app.erp.inventoryAssetTypes', {
            url: '/erp/inventory/AssetTypes',
            data: {
                title: 'Asset Types',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/AssetTypes.html',
                },
            },
        })

        .state('app.erp.inventoryTransferCloseForm', {
            url: '/erp/inventory/TransferCloseForm',
            data: {
                title: 'Form: Transfer Close',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/TransferCloseForm.html',
                },
            },
        })

        .state('app.erp.inventoryIsolationForm', {
            url: '/erp/inventory/IsolationForm',
            data: {
                title: 'Form: Isolation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/IsolationForm.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryLeaseReturn', {
            url: '/erp/inventory/InventoryLeaseReturn',
            data: {
                title: 'Inventory Lease Return',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryLeaseReturn.html',
                },
            },
        })

        .state('app.erp.inventoryInventoryLeaseExtension', {
            url: '/erp/inventory/InventoryLeaseExtension',
            data: {
                title: 'Inventory Lease Extension',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryLeaseExtension.html',
                },
            },
        })

        .state('app.erp.inventoryDeliveryRequestForm', {
            url: '/erp/inventory/DeliveryRequestForm',
            data: {
                title: 'Form: Delivery Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/DeliveryRequestForm.html',
                },
            },
        })

        .state('app.erp.inventoryCountSheet', {
            url: '/erp/inventory/CountSheet',
            data: {
                title: 'Count Sheet',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/CountSheet.html',
                },
            },
        })

        .state('app.erp.inventoryAssetTypeForm', {
            url: '/erp/inventory/AssetTypeForm',
            data: {
                title: 'Form: Asset Type',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/AssetTypeForm.html',
                },
            },
        })

        .state('app.erp.inventoryAssetDisposalMethodForm', {
            url: '/erp/inventory/AssetDisposalMethodForm',
            data: {
                title: 'Form: Asset Disposal Method',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/AssetDisposalMethodForm.html',
                },
            },
        })

        .state('app.erp.inventoryCountForm', {
            url: '/erp/inventory/CountForm',
            data: {
                title: 'Form: Count',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/CountForm.html',
                },
            },
        })

        .state('app.erp.inventoryAssembleForm', {
            url: '/erp/inventory/AssembleForm',
            data: {
                title: 'Form: Assemble',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/AssembleForm.html',
                },
            },
        })

        .state('app.erp.inventoryAdjustmentForm', {
            url: '/erp/inventory/AdjustmentForm',
            data: {
                title: 'Form: Adjustment',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/inventory.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/AdjustmentForm.html',
                },
            },
        })

        ;
});
