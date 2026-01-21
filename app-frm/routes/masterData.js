'use strict';

angular.module('app.erp').config(function ($stateProvider) {
    $stateProvider
        .state('app.erp.masterData', {
            url: '/erp/masterData',
            data: {
                title: 'Master Data',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/_WebPage.html',
                },
            },
        })

        .state('app.erp.masterData_Settings', {
            url: '/erp/masterData/Settings',
            data: {
                title: 'Settings',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/Settings.html',
                },
            },
        })
        .state('app.erp.masterData_SuperAdminSystem', {
            url: '/erp/masterData/SuperAdminSystem',
            data: {
                title: 'Super Admin System',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/SuperAdminSystem.html',
                },
            },
        })

        .state('app.erp.masterDataChartOfAccountsForm', {
            url: '/erp/masterData/ChartOfAccountForm',
            data: {
                title: 'Form: Chart of Account',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChartOfAccountForm.html',
                },
            },
        })

        .state('app.erp.masterDataChartOfAccounts', {
            url: '/erp/masterData/ChartOfAccounts',
            data: {
                title: 'CoA: Chart of Accounts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChartOfAccounts.html',
                },
            },
        })

        .state('app.erp.masterDataChartOfAccountsX', {
            url: '/erp/masterData/ChartOfAccountsX',
            data: {
                title: 'CoA: Chart of Accounts - X',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChartOfAccountsX.html',
                },
            },
        })

        .state('app.erp.masterDataWarehousesForm', {
            url: '/erp/masterData/WarehouseForm?code',
            data: {
                title: 'Form: Warehouse',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/WarehouseForm.html',
                },
            },
        })

        .state('app.erp.masterDataWarehouses', {
            url: '/erp/masterData/Warehouses',
            data: {
                title: 'Warehouses',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Warehouses.html',
                },
            },
        })

        .state('app.erp.masterDataDepartments', {
            url: '/erp/masterData/Departments',
            data: {
                title: 'Department',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/hr/Department.html',
                },
            },
        })

        .state('app.erp.masterData_UserSystem', {
            url: '/erp/masterData/UserSystem',
            data: {
                title: 'User System',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/UserSystem.html',
                },
            },
        })
        .state('app.erp.masterData_UserSystemForm', {
            url: '/erp/masterData/UserSystemForm',
            data: {
                title: 'Form: User System',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/UserSystemForm.html',
                },
            },
        })
        .state('app.erp.masterData_Role', {
            url: '/erp/masterData/Role',
            data: {
                title: 'Role',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/Role.html',
                },
            },
        })
        .state('app.erp.masterData_RoleForm', {
            url: '/erp/masterData/RoleForm',
            data: {
                title: 'Form: Role',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/RoleForm.html',
                },
            },
        })
        .state('app.erp.masterData_MenuModule', {
            url: '/erp/masterData/MenuModule',
            data: {
                title: 'Menu / Module',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/MenuModule.html',
                },
            },
        })
        .state('app.erp.masterData_CalenderSystem', {
            url: '/erp/masterData/CalenderSystem',
            data: {
                title: 'Calender System',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/CalenderSystem.html',
                },
            },
        })
        .state('app.erp.masterData_MasterHoliday', {
            url: '/erp/masterData/MasterHoliday',
            data: {
                title: 'Master Holiday',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/MasterHoliday.html',
                },
            },
        })
        .state('app.erp.masterData_Tax', {
            url: '/erp/masterData/Tax',
            data: {
                title: 'Tax',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/Tax.html',
                },
            },
        })
        .state('app.erp.masterData_TOPGroup', {
            url: '/erp/masterData/TOPGroup',
            data: {
                title: 'TOP Group',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/TOPGroup.html',
                },
            },
        })
        .state('app.erp.masterData_Branch', {
            url: '/erp/masterData/Branch',
            data: {
                title: 'Branch',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/Branch.html',
                },
            },
        })
        .state('app.erp.masterData_SalesZone', {
            url: '/erp/masterData/SalesZone',
            data: {
                title: 'Sales Zone',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/SalesZone.html',
                },
            },
        })
        .state('app.erp.masterData_SalesZoneForm', {
            url: '/erp/masterData/SalesZoneForm',
            data: {
                title: 'Form: Sales Zone',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/SalesZoneForm.html',
                },
            },
        })
        .state('app.erp.masterData_DeliveryZone', {
            url: '/erp/masterData/DeliveryZone',
            data: {
                title: 'Delivery Zone',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/DeliveryZone.html',
                },
            },
        })
        .state('app.erp.masterData_DeliveryZoneForm', {
            url: '/erp/masterData/DeliveryZoneForm',
            data: {
                title: 'Form: Delivery Zone',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/DeliveryZoneForm.html',
                },
            },
        })
        .state('app.erp.masterDataCollectZone', {
            url: '/erp/masterData/CollectZone',
            data: {
                title: 'Collect Zone',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/CollectZone.html',
                },
            },
        })
        .state('app.erp.masterDataCollectZoneForm', {
            url: '/erp/masterData/CollectZoneForm',
            data: {
                title: 'Form: Collect Zone',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/CollectZoneForm.html',
                },
            },
        })
        .state('app.erp.masterData_ContactPersonPicAndPosition', {
            url: '/erp/masterData/ContactPersonPicAndPosition',
            data: {
                title: 'Contact person pic dan position',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/ContactPersonPicAndPosition.html',
                },
            },
        })
        .state('app.erp.masterData_CustomerGrade', {
            url: '/erp/masterData/CustomerGrade',
            data: {
                title: 'Customer Grade',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/CustomerGrade.html',
                },
            },
        })
        .state('app.erp.masterData_CustomerGradeForm', {
            url: '/erp/masterData/masterData_CustomerGradeForm',
            data: {
                title: 'Form: Customer Grade',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/CustomerGradeForm.html',
                },
            },
        })
        .state('app.erp.masterData_UniverseBrand', {
            url: '/erp/masterData/UniverseBrand',
            data: {
                title: 'Universe Brand',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/UniverseBrand.html',
                },
            },
        })
        .state('app.erp.masterData_OwnershipProject', {
            url: '/erp/masterData/OwnershipProject',
            data: {
                title: 'Ownership Project',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/OwnershipProject.html',
                },
            },
        })
        .state('app.erp.masterData_OwnershipProjectForm', {
            url: '/erp/masterData/OwnershipProjectForm',
            data: {
                title: 'Form: Ownership Project',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/OwnershipProjectForm.html',
                },
            },
        })

        .state('app.erp.masterDataProfilesForm', {
            url: '/erp/masterData/ProfileForm?code',
            data: {
                title: 'Form: Profile',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/ProfileForm.html',
                },
            },
        })

        .state('app.erp.masterDataProfiles', {
            url: '/erp/masterData/Profiles',
            data: {
                title: 'Profiles',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Profiles.html',
                },
            },
        })

        .state('app.erp.masterDataYearCalendar', {
            url: '/erp/masterData/YearCalendar',
            data: {
                title: 'Year Calendar',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/hr/YearCalendar.html',
                },
            },
        })

        .state('app.erp.masterDataPosition', {
            url: '/erp/masterData/Position',
            data: {
                title: 'Position',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/hr/Position.html',
                },
            },
        })
        .state('app.erp.masterDataEmployee', {
            url: '/erp/masterData/Employee',
            data: {
                title: 'Employee',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/hr/HREmployee.html',
                },
            },
        })

        .state('app.erp.masterDataInventoryItemsForm', {
            url: '/erp/masterData/InventoryItemForm?code',
            data: {
                title: 'Form: Inventory Item',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryItemForm.html',
                },
            },
        })

        .state('app.erp.masterDataInventoryItems', {
            url: '/erp/masterData/InventoryItems',
            data: {
                title: 'Inventory Items',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/InventoryItems.html',
                },
            },
        })

        .state('app.erp.masterDataUoms', {
            url: '/erp/masterData/Uoms',
            data: {
                title: 'Uoms',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Uoms.html',
                },
            },
        })

        .state('app.erp.masterDataUomsForm', {
            url: '/erp/masterData/UomForm?code',
            data: {
                title: 'Form: Uom',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/UomForm.html',
                },
            },
        })

        .state('app.erp.masterDataBrandsForm', {
            url: '/erp/masterData/BrandForm?code',
            data: {
                title: 'Form: Brand',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/BrandForm.html',
                },
            },
        })

        .state('app.erp.masterDataBrands', {
            url: '/erp/masterData/Brands',
            data: {
                title: 'Brands',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Brands.html',
                },
            },
        })

        .state('app.erp.masterDataDickyBaru', {
            url: '/erp/masterData/DickyBaru?code',
            data: {
                title: 'Form: Dicky Baru',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/DickyBaru.html',
                },
            },
        })

        .state('app.erp.masterDataCategoriesX', {
            url: '/erp/masterData/CategoriesX',
            data: {
                title: 'Categories - X',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/CategoriesX.html',
                },
            },
        })

        .state('app.erp.masterDataCategories', {
            url: '/erp/masterData/Categories',
            data: {
                title: 'Categories',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/Categories.html',
                },
            },
        })

        .state('app.erp.masterDataCategoriesForm', {
            url: '/erp/masterData/CategoryForm?code',
            data: {
                title: 'Form: Category',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/inventory/CategoryForm.html',
                },
            },
        })

        .state('app.erp.masterDataPaymentTerms', {
            url: '/erp/masterData/PaymentTerms',
            data: {
                title: 'Payment Terms',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PaymentTerms.html',
                },
            },
        })

        .state('app.erp.masterDataPaymentTermsForm', {
            url: '/erp/masterData/PaymentTermForm',
            data: {
                title: 'Form: Payment Term',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PaymentTermForm.html',
                },
            },
        })

        .state('app.erp.masterDataTaxes', {
            url: '/erp/masterData/Taxes',
            data: {
                title: 'Taxes',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/Taxes.html',
                },
            },
        })

        .state('app.erp.masterDataTaxesForm', {
            url: '/erp/masterData/TaxForm',
            data: {
                title: 'Form: Tax',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/TaxesForm.html',
                },
            },
        })

        .state('app.erp.masterDataPromoForm', {
            url: '/erp/masterData/PromoForm',
            data: {
                title: 'Form: Promo',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/masterData.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/masterData/a1.html',
                },
            },
        })

        ;
});
