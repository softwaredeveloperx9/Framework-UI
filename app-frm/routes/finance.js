'use strict';

angular.module('app.erp').config(function ($stateProvider) {
    $stateProvider
        .state('app.erp.finance', {
            url: '/erp/finance',
            data: {
                title: 'Finance',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/_WebPage.html',
                },
            },
        })

        .state('app.erp.financeAddressList', {
            url: '/erp/finance/AddressList',
            data: {
                title: 'Address List',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AddressListFin.html',
                },
            },
        })

        .state('app.erp.financeAdvanceAgings', {
            url: '/erp/finance/AdvanceAgings',
            data: {
                title: 'Advance Agings',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AdvanceAgings.html',
                },
            },
        })

        .state('app.erp.financeAdvanceAgingsView', {
            url: '/erp/finance/AdvanceAgingView',
            data: {
                title: 'View: Advance Aging',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AdvanceAgingsView.html',
                },
            },
        })

        .state('app.erp.financeAdvanceRequestsForm', {
            url: '/erp/finance/AdvanceRequestForm',
            data: {
                title: 'Form: Advance Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AdvanceRequestForm.html',
                },
            },
        })

        .state('app.erp.financeAdvanceRequests', {
            url: '/erp/finance/AdvanceRequests',
            data: {
                title: 'Advance Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AdvanceRequests.html',
                },
            },
        })

        .state('app.erp.financeAdvanceReasons', {
            url: '/erp/finance/AdvanceReasons',
            data: {
                title: 'Advance Reasons',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AdvanceReasons.html',
                },
            },
        })

        .state('app.erp.financeAdvanceReasonsForm', {
            url: '/erp/finance/AdvanceReasonForm',
            data: {
                title: 'Form: Advance Reason',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AdvanceReasonForm.html',
                },
            },
        })

        .state('app.erp.financeApprovalWorkFlowForm', {
            url: '/erp/finance/ApprovalWorkFlowForm',
            data: {
                title: 'Form: Approval WorkFlow',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ApprovalWorkFlowForm.html',
                },
            },
        })

        .state('app.erp.financeApprovalWorkflows', {
            url: '/erp/finance/ApprovalWorkflows',
            data: {
                title: 'Approval Workflows',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ApprovalWorkflows.html',
                },
            },
        })

        .state('app.erp.financeBankReconSummary', {
            url: '/erp/finance/BankReconSummary',
            data: {
                title: 'Bank Recon Summary',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/BankReconSummary.html',
                },
            },
        })

        .state('app.erp.financeBankReconSummaryView', {
            url: '/erp/finance/BankReconSummaryView',
            data: {
                title: 'View: Bank Recon Summary',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/BankReconSummaryView.html',
                },
            },
        })

        .state('app.erp.financeBankReconciliation', {
            url: '/erp/finance/BankReconciliation',
            data: {
                title: 'Bank Reconciliation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/BankReconciliation.html',
                },
            },
        })

        .state('app.erp.financeBudgetPlans', {
            url: '/erp/finance/BudgetPlans',
            data: {
                title: 'Budget Plans',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/BudgetPlans.html',
                },
            },
        })

        .state('app.erp.financeBudgetPlansForm', {
            url: '/erp/finance/BudgetPlanForm',
            data: {
                title: 'Form: Budget Plans',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/BudgetPlanForm.html',
                },
            },
        })

        .state('app.erp.financeBrowseAdvanceReason', {
            url: '/erp/finance/BrowseAdvanceReason',
            data: {
                title: 'Browse Advance Reason',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/BrowseAdvanceReason.html',
                },
            },
        })

        .state('app.erp.financeCashAccountsForm', {
            url: '/erp/finance/CashAccountForm',
            data: {
                title: 'Form: Cash Account',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CashAccountForm.html',
                },
            },
        })

        .state('app.erp.financeCashAccounts', {
            url: '/erp/finance/CashAccounts',
            data: {
                title: 'Cash Accounts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CashAccounts.html',
                },
            },
        })

        .state('app.erp.financeCashPositions', {
            url: '/erp/finance/CashPositions',
            data: {
                title: 'Cash Positions',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CashPositions.html',
                },
            },
        })

        .state('app.erp.financeCashPositionsForm', {
            url: '/erp/finance/CashPositionForm',
            data: {
                title: 'Form: Cash Position',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CashPositionsForm.html',
                },
            },
        })

        .state('app.erp.financeCashReconSummary', {
            url: '/erp/finance/CashReconSummary',
            data: {
                title: 'Cash Recon Summary',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CashReconSummary.html',
                },
            },
        })

        .state('app.erp.financeCashReconSummaryView', {
            url: '/erp/finance/CashReconSummaryView',
            data: {
                title: 'View: Cash Recon Summary',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CashReconSummaryView.html',
                },
            },
        })

        .state('app.erp.financeCashTransactions', {
            url: '/erp/finance/CashTransactions',
            data: {
                title: 'Cash Transactions',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CashTransactions.html',
                },
            },
        })

        .state('app.erp.financeChartOfAccountsForm', {
            url: '/erp/finance/ChartOfAccountForm',
            data: {
                title: 'Form: Chart of Account',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChartOfAccountForm.html',
                },
            },
        })

        .state('app.erp.financeChartOfAccounts', {
            url: '/erp/finance/ChartOfAccounts',
            data: {
                title: 'Chart of Accounts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChartOfAccounts.html',
                },
            },
        })

        .state('app.erp.financeChartOfAccountsX', {
            url: '/erp/finance/ChartOfAccountsX',
            data: {
                title: 'Chart of Accounts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChartOfAccountsX.html',
                },
            },
        })

        .state('app.erp.financeChequePositions', {
            url: '/erp/finance/ChequePositions',
            data: {
                title: 'Cheque Positions',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChequePositions.html',
                },
            },
        })

        .state('app.erp.financeChequePositionsView', {
            url: '/erp/finance/ChequePositionView',
            data: {
                title: 'View: Cheque Position',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChequePositionsView.html',
                },
            },
        })

        .state('app.erp.financeClearingOrders', {
            url: '/erp/finance/ClearingOrders',
            data: {
                title: 'Clearing Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ClearingOrders.html',
                },
            },
        })

        .state('app.erp.financeClearingOrdersForm', {
            url: '/erp/finance/ClearingOrderForm',
            data: {
                title: 'Form: Clearing Order',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ClearingOrderForm.html',
                },
            },
        })

        .state('app.erp.financeClearingRequests', {
            url: '/erp/finance/ClearingRequests',
            data: {
                title: 'Clearing Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ClearingRequests.html',
                },
            },
        })

        .state('app.erp.financeClearingRequestsForm', {
            url: '/erp/finance/ClearingRequestForm',
            data: {
                title: 'Form: Clearing Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ClearingRequestsForm.html',
                },
            },
        })

        .state('app.erp.financeCollectDashboard', {
            url: '/erp/finance/CollectDashboard',
            data: {
                title: 'Collect Dashboard',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CollectDashboard.html',
                },
            },
        })

        .state('app.erp.financeCollectOrders', {
            url: '/erp/finance/CollectOrders',
            data: {
                title: 'Collect Orders',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CollectOrders.html',
                },
            },
        })

        .state('app.erp.financeCollectOrdersForm', {
            url: '/erp/finance/CollectOrderForm',
            data: {
                title: 'Form: Collect Order',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CollectOrderForm.html',
                },
            },
        })

        .state('app.erp.financeCollectRequests', {
            url: '/erp/finance/CollectRequests',
            data: {
                title: 'Collect Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CollectRequests.html',
                },
            },
        })

        .state('app.erp.financeContactList', {
            url: '/erp/finance/ContactList',
            data: {
                title: 'Contact List',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ContactList.html',
                },
            },
        })

        .state('app.erp.financeCreditNotes', {
            url: '/erp/finance/CreditNotes',
            data: {
                title: 'Credit Notes',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CreditNotes.html',
                },
            },
        })

        .state('app.erp.financeCreditNotesForm', {
            url: '/erp/finance/CreditNoteForm',
            data: {
                title: 'Form: Credit Note',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CreditNoteForm.html',
                },
            },
        })

        .state('app.erp.financeCurrencies', {
            url: '/erp/finance/Currencies',
            data: {
                title: 'Currencies',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/Currencies.html',
                },
            },
        })

        .state('app.erp.financeCurrenciesForm', {
            url: '/erp/finance/CurrencyForm',
            data: {
                title: 'Form: Currency',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CurrencyForm.html',
                },
            },
        })

        .state('app.erp.financeCurrencyRates', {
            url: '/erp/finance/CurrencyRates',
            data: {
                title: 'Currency Rates',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CurrencyRates.html',
                },
            },
        })

        .state('app.erp.financeCurrencyRatesForm', {
            url: '/erp/finance/CurrencyRateForm',
            data: {
                title: 'Form: Currency Rate',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CurrencyRatesForm.html',
                },
            },
        })

        .state('app.erp.financeCustomerCategories', {
            url: '/erp/finance/CustomerCategories',
            data: {
                title: 'Customer Categories',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CustomerCategories.html',
                },
            },
        })

        .state('app.erp.financeCustomerCategoriesForm', {
            url: '/erp/finance/CustomerCategoryForm',
            data: {
                title: 'Form: Customer Category',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CustomerCategoryForm.html',
                },
            },
        })

        .state('app.erp.financeCustomerReceipts', {
            url: '/erp/finance/CustomerReceipts',
            data: {
                title: 'Customer Receipts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CustomerReceipts.html',
                },
            },
        })

        .state('app.erp.financeCustomerReceiptsForm', {
            url: '/erp/finance/CustomerReceiptForm',
            data: {
                title: 'Form: Customer Receipt',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CustomerReceiptsForm.html',
                },
            },
        })

        .state('app.erp.financeCustomers', {
            url: '/erp/finance/Customers',
            data: {
                title: 'Customers',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CustomersFin.html',
                },
            },
        })

        .state('app.erp.financeDailyReconSummary', {
            url: '/erp/finance/DailyReconSummary',
            data: {
                title: 'Daily Recon Summary',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DailyReconSummary.html',
                },
            },
        })

        .state('app.erp.financeDailyReconSummaryView', {
            url: '/erp/finance/DailyReconSummaryView',
            data: {
                title: 'View: Daily Recon Summary',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DailyReconSummaryView.html',
                },
            },
        })

        .state('app.erp.financeDailyReconciliation', {
            url: '/erp/finance/DailyReconciliation',
            data: {
                title: 'Daily Reconciliation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DailyReconciliation.html',
                },
            },
        })

        .state('app.erp.financeDebitNotes', {
            url: '/erp/finance/DebitNotes',
            data: {
                title: 'Debit Notes',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DebitNotes.html',
                },
            },
        })

        .state('app.erp.financeDebitNotesForm', {
            url: '/erp/finance/DebitNoteForm',
            data: {
                title: 'Form: Debit Note',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DebitNoteForm.html',
                },
            },
        })

        .state('app.erp.financeDepositTypes', {
            url: '/erp/finance/DepositTypes',
            data: {
                title: 'Deposit Types',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DepositTypes.html',
                },
            },
        })

        .state('app.erp.financeDepositTypesForm', {
            url: '/erp/finance/DepositTypeForm',
            data: {
                title: 'Form: Deposit Type',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DepositTypeForm.html',
                },
            },
        })

        .state('app.erp.financeDiscountsForm', {
            url: '/erp/finance/DiscountForm',
            data: {
                title: 'Form: Discount',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DiscountForm.html',
                },
            },
        })

        .state('app.erp.financeDiscounts', {
            url: '/erp/finance/Discounts',
            data: {
                title: 'Discounts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DiscountsFin.html',
                },
            },
        })

        .state('app.erp.financeDisposalMethods', {
            url: '/erp/finance/DisposalMethods',
            data: {
                title: 'Disposal Methods',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DisposalMethodsFin.html',
                },
            },
        })

        .state('app.erp.financeDisposalMethodsForm', {
            url: '/erp/finance/DisposalMethodForm',
            data: {
                title: 'Form: Disposal Method',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DisposalMethodsFinForm.html',
                },
            },
        })

        .state('app.erp.financeDisposalProfile', {
            url: '/erp/finance/DisposalProfile',
            data: {
                title: 'Disposal Profile',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DisposalProfile.html',
                },
            },
        })

        .state('app.erp.financeExpenseForm', {
            url: '/erp/finance/ExpenseForm',
            data: {
                title: 'Form: Expense',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ExpenseForm.html',
                },
            },
        })

        .state('app.erp.financeFinancialPeriods', {
            url: '/erp/finance/FinancialPeriods',
            data: {
                title: 'Financial Periods',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/FinancialPeriods.html',
                },
            },
        })

        .state('app.erp.financeFinancialPeriodsForm', {
            url: '/erp/finance/FinancialPeriodForm',
            data: {
                title: 'Form: Financial Periods',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/FinancialPeriodForm.html',
                },
            },
        })

        .state('app.erp.financeFinancialReports', {
            url: '/erp/finance/FinancialReports',
            data: {
                title: 'Financial Reports',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/FinancialReports.html',
                },
            },
        })

        .state('app.erp.financeFinancialReportsForm', {
            url: '/erp/finance/FinancialReportForm',
            data: {
                title: 'Form: Financial Report',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/FinancialReportsForm.html',
                },
            },
        })

        .state('app.erp.financeFinancialYearForm', {
            url: '/erp/finance/FinancialYearForm',
            data: {
                title: 'Form: Financial Year',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/FinancialYearForm.html',
                },
            },
        })

        .state('app.erp.financeFollowUpRequests', {
            url: '/erp/finance/FollowUpRequests',
            data: {
                title: 'Follow Up Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/FollowUpRequests.html',
                },
            },
        })

        .state('app.erp.financeFollowUpRequestsForm', {
            url: '/erp/finance/FollowUpRequestForm',
            data: {
                title: 'Form: Follow Up Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/FollowUpRequestsForm.html',
                },
            },
        })

        .state('app.erp.financeGeneralLedger', {
            url: '/erp/finance/GeneralLedger',
            data: {
                title: 'General Ledger',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/GeneralLedger.html',
                },
            },
        })

        .state('app.erp.financeGeneralLedgerForm', {
            url: '/erp/finance/GeneralLedgerForm',
            data: {
                title: 'Form: General Ledger',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/GeneralLedgerForm.html',
                },
            },
        })

        .state('app.erp.financeGLJournals', {
            url: '/erp/finance/GLJournals',
            data: {
                title: 'GL Journals',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/GLJournals.html',
                },
            },
        })

        .state('app.erp.financeGLJournalsForm', {
            url: '/erp/finance/GLJournalForm',
            data: {
                title: 'Form: GL Journals',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/GLJournalsForm.html',
                },
            },
        })

        .state('app.erp.financeGroupsForm', {
            url: '/erp/finance/GroupForm',
            data: {
                title: 'Form: Group',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/GroupForm.html',
                },
            },
        })

        .state('app.erp.financeGroups', {
            url: '/erp/finance/Groups',
            data: {
                title: 'Groups',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/Groups.html',
                },
            },
        })

        .state('app.erp.financeInvoiceRequests', {
            url: '/erp/finance/InvoiceRequests',
            data: {
                title: 'Invoice Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/InvoiceRequests.html',
                },
            },
        })

        .state('app.erp.financeItemChargesForm', {
            url: '/erp/finance/ItemChargeForm',
            data: {
                title: 'Form: Item Charge',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ItemChargeForm.html',
                },
            },
        })

        .state('app.erp.financeItemChargeProfile', {
            url: '/erp/finance/ItemChargeProfile',
            data: {
                title: 'Form: Item Charge',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ItemChargeProfile.html',
                },
            },
        })

        .state('app.erp.financeItemCharges', {
            url: '/erp/finance/ItemCharges',
            data: {
                title: 'Item Charges',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ItemCharges.html',
                },
            },
        })

        .state('app.erp.financeMutationsForm', {
            url: '/erp/finance/MutationForm',
            data: {
                title: 'Form: Mutation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/MutationForm.html',
                },
            },
        })

        .state('app.erp.financeMutations', {
            url: '/erp/finance/Mutations',
            data: {
                title: 'Mutations',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/Mutations.html',
                },
            },
        })

        .state('app.erp.financeOnIssueClearings', {
            url: '/erp/finance/OnIssueClearings',
            data: {
                title: 'On Issue Clearings',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/OnIssueClearings.html',
                },
            },
        })

        .state('app.erp.financeOnIssueClearingsForm', {
            url: '/erp/finance/OnIssueClearingForm',
            data: {
                title: 'Form: On Issue Clearing',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/OnIssueClearingsForm.html',
                },
            },
        })

        .state('app.erp.financePCashReconciliation', {
            url: '/erp/finance/PCashReconciliation',
            data: {
                title: 'P Cash Reconciliation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PCashReconciliation.html',
                },
            },
        })

        .state('app.erp.financePaidDeposits', {
            url: '/erp/finance/PaidDeposits',
            data: {
                title: 'Paid Deposits',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PaidDeposits.html',
                },
            },
        })

        .state('app.erp.financePaidDepositsForm', {
            url: '/erp/finance/PaidDepositForm',
            data: {
                title: 'Form: Paid Deposits',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PaidDepositsForm.html',
                },
            },
        })

        .state('app.erp.financePayableAgings', {
            url: '/erp/finance/PayableAgings',
            data: {
                title: 'Payable Agings',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PayableAgings.html',
                },
            },
        })

        .state('app.erp.financePayableAgingsView', {
            url: '/erp/finance/PayableAgingView',
            data: {
                title: 'View: Payable Aging',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PayableAgingsView.html',
                },
            },
        })

        .state('app.erp.financePayableInvoices', {
            url: '/erp/finance/PayableInvoices',
            data: {
                title: 'Payable Invoices',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PayableInvoices.html',
                },
            },
        })

        .state('app.erp.financePayableInvoicesForm', {
            url: '/erp/finance/PayableInvoiceForm',
            data: {
                title: 'Form: Payable Invoice',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PayableInvoicesForm.html',
                },
            },
        })

        .state('app.erp.financePayableReceipts', {
            url: '/erp/finance/PayableReceipts',
            data: {
                title: 'Payable Receipts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PayableReceipts.html',
                },
            },
        })

        .state('app.erp.financePayableReceiptsForm', {
            url: '/erp/finance/PayableReceiptForm',
            data: {
                title: 'Form: Payable Receipts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PayableReceiptsForm.html',
                },
            },
        })

        .state('app.erp.financePaymentRequests', {
            url: '/erp/finance/PaymentRequests',
            data: {
                title: 'Payment Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PaymentRequests.html',
                },
            },
        })

        .state('app.erp.financePaymentRequestsForm', {
            url: '/erp/finance/PaymentRequestForm',
            data: {
                title: 'Form: Payment Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PaymentRequestForm.html',
                },
            },
        })

        .state('app.erp.financePendingReceiptStatusUpdate', {
            url: '/erp/finance/PendingReceiptStatusUpdate',
            data: {
                title: 'Pending Receipt Status Update',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PendingReceiptStatusUpdate.html',
                },
            },
        })

        .state('app.erp.financePendingReceipts', {
            url: '/erp/finance/PendingReceipts',
            data: {
                title: 'Pending Receipts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PendingReceipts.html',
                },
            },
        })

        .state('app.erp.financePeriodClosing', {
            url: '/erp/finance/PeriodClosing',
            data: {
                title: 'Period Closing',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PeriodClosing.html',
                },
            },
        })

        .state('app.erp.financePeriodClosingForm', {
            url: '/erp/finance/PeriodClosingForm',
            data: {
                title: 'Form: Period Closing',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PeriodClosingForm.html',
                },
            },
        })

        .state('app.erp.financePersonnels', {
            url: '/erp/finance/Personnels',
            data: {
                title: 'Personnels',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PersonnelsFin.html',
                },
            },
        })

        .state('app.erp.financeRateTypes', {
            url: '/erp/finance/RateTypes',
            data: {
                title: 'Rate Types',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/RateTypes.html',
                },
            },
        })

        .state('app.erp.financeRateTypesForm', {
            url: '/erp/finance/RateTypeForm',
            data: {
                title: 'Form: Rate Type',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/RateTypeForm.html',
                },
            },
        })

        .state('app.erp.financeReceivableAgings', {
            url: '/erp/finance/ReceivableAgings',
            data: {
                title: 'Receivable Agings',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReceivableAgings.html',
                },
            },
        })

        .state('app.erp.financeReceivableAgingsView', {
            url: '/erp/finance/ReceivableAgingView',
            data: {
                title: 'View: Receivable Aging',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReceivableAgingsView.html',
                },
            },
        })


        .state('app.erp.financeReceivableReceipt', {
            url: '/erp/finance/ReceivableReceipt',
            data: {
                title: 'Receivable Receipt',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReceivableReceipt.html',
                },
            },
        })

        .state('app.erp.financeReceivableReceiptForm', {
            url: '/erp/finance/ReceivableReceiptForm',
            data: {
                title: 'Form: Receivable Receipt',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReceivableReceiptForm.html',
                },
            },
        })

        .state('app.erp.financeReceivedDeposits', {
            url: '/erp/finance/ReceivedDeposits',
            data: {
                title: 'Received Deposits',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReceivedDeposits.html',
                },
            },
        })

        .state('app.erp.financeReceivedDepositsForm', {
            url: '/erp/finance/ReceivedDepositForm',
            data: {
                title: 'Form: Received Deposit',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReceivedDepositsForm.html',
                },
            },
        })

        .state('app.erp.financeReportSettings', {
            url: '/erp/finance/ReportSettings',
            data: {
                title: 'Report Settings',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReportSettings.html',
                },
            },
        })

        .state('app.erp.financeReportSettingsForm', {
            url: '/erp/finance/ReportSettingForm',
            data: {
                title: 'Form: Report Settings',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReportSettingsForm.html',
                },
            },
        })

        .state('app.erp.financeSalesInvoices', {
            url: '/erp/finance/SalesInvoices',
            data: {
                title: 'Sales Invoices',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/SalesInvoices.html',
                },
            },
        })

        .state('app.erp.financeSalesInvoicesForm', {
            url: '/erp/finance/SalesInvoiceForm',
            data: {
                title: 'Form: Sales Invoice',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/SalesInvoiceForm.html',
                },
            },
        })

        .state('app.erp.financeSubAccountsForm', {
            url: '/erp/finance/SubAccountForm',
            data: {
                title: 'Form: Sub Account',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/SubAccountsForm.html',
                },
            },
        })

        .state('app.erp.financeSubAccounts', {
            url: '/erp/finance/SubAccounts',
            data: {
                title: 'Sub Accounts',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/SubAccounts.html',
                },
            },
        })

        .state('app.erp.financeSupplierCategories', {
            url: '/erp/finance/SupplierCategories',
            data: {
                title: 'Supplier Categories',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/SupplierCategories.html',
                },
            },
        })

        .state('app.erp.financeSupplierCategoriesForm', {
            url: '/erp/finance/SupplierCategoryForm',
            data: {
                title: 'Form: Supplier Category',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/SupplierCategoryForm.html',
                },
            },
        })

        .state('app.erp.financeSuppliers', {
            url: '/erp/finance/Suppliers',
            data: {
                title: 'Suppliers',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/Suppliers.html',
                },
            },
        })

        .state('app.erp.financeSurveyRequests', {
            url: '/erp/finance/SurveyRequests',
            data: {
                title: 'Survey Requests',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/SurveyRequests.html',
                },
            },
        })

        .state('app.erp.financeSurveyRequestsForm', {
            url: '/erp/finance/SurveyRequestForm',
            data: {
                title: 'Form: Survey Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/SurveyRequestsForm.html',
                },
            },
        })

        .state('app.erp.financeTaxCategories', {
            url: '/erp/finance/TaxCategories',
            data: {
                title: 'Tax Categories',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/TaxCategories.html',
                },
            },
        })

        .state('app.erp.financeTaxCategoriesForm', {
            url: '/erp/finance/TaxCategoryForm',
            data: {
                title: 'Form: Tax Category',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/TaxCategoriesForm.html',
                },
            },
        })

        .state('app.erp.financeTaxInvoiceRecon', {
            url: '/erp/finance/TaxInvoiceRecon',
            data: {
                title: 'Tax Invoice Recon.',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/TaxInvoiceRecon.html',
                },
            },
        })

        .state('app.erp.financeTaxInvoiceReconForm', {
            url: '/erp/finance/TaxInvoiceReconForm',
            data: {
                title: 'Form: Tax Invoice Recon.',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/TaxInvoiceReconForm.html',
                },
            },
        })

        .state('app.erp.financeTaxZonesForm', {
            url: '/erp/finance/TaxZoneForm',
            data: {
                title: 'Form: Tax Zone',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/TaxZonesForm.html',
                },
            },
        })

        .state('app.erp.financeTaxZones', {
            url: '/erp/finance/TaxZones',
            data: {
                title: 'Tax Zones',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/TaxZones.html',
                },
            },
        })

        .state('app.erp.financeTaxes', {
            url: '/erp/finance/Taxes',
            data: {
                title: 'Taxes',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/Taxes.html',
                },
            },
        })

        .state('app.erp.financeTaxesForm', {
            url: '/erp/finance/TaxForm',
            data: {
                title: 'Form: Tax',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/TaxesForm.html',
                },
            },
        })

        .state('app.erp.financeTrialBalance', {
            url: '/erp/finance/TrialBalance',
            data: {
                title: 'Trial Balance',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/TrialBalance.html',
                },
            },
        })

        .state('app.erp.financeTrialBalanceForm', {
            url: '/erp/finance/TrialBalanceForm',
            data: {
                title: 'Form: Trial Balance',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/TrialBalanceForm.html',
                },
            },
        })

        .state('app.erp.financeVATBalance', {
            url: '/erp/finance/VATBalance',
            data: {
                title: 'VAT Balance',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/VATBalance.html',
                },
            },
        })

        .state('app.erp.financeVATBalanceForm', {
            url: '/erp/finance/VATBalanceForm',
            data: {
                title: 'Form: VAT Balance',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/VATBalanceForm.html',
                },
            },
        })

        .state('app.erp.financeVATNrRegistrations', {
            url: '/erp/finance/VATNrRegistrations',
            data: {
                title: 'VAT Nr. Registrations',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/VATNrRegistrations.html',
                },
            },
        })

        .state('app.erp.financeVATNumberRegistrationForm', {
            url: '/erp/finance/VATNumberRegistrationForm',
            data: {
                title: 'Form: VAT Number Registration',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/VATNumberRegistrationForm.html',
                },
            },
        })

        .state('app.erp.financeVATNumbers', {
            url: '/erp/finance/VATNumbers',
            data: {
                title: 'VAT Numbers',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/VATNumbers.html',
                },
            },
        })

        .state('app.erp.financeVATNumbersForm', {
            url: '/erp/finance/VATNumberForm',
            data: {
                title: 'Form: VAT Number',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/VATNumbersForm.html',
                },
            },
        })

        .state('app.erp.financeVATReconciliation', {
            url: '/erp/finance/VATReconciliation',
            data: {
                title: 'VAT Reconciliation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/VATReconciliation.html',
                },
            },
        })

        .state('app.erp.financeVATReconciliationForm', {
            url: '/erp/finance/VATReconciliationForm',
            data: {
                title: 'Form: VAT Reconciliation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/VATReconciliationForm.html',
                },
            },
        })

        .state('app.erp.financePickedCollectRequest', {
            url: '/erp/finance/PickedCollectRequest',
            data: {
                title: 'Picked Collect Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PickedCollectRequest.html',
                },
            },
        })

        .state('app.erp.financeVATBalances', {
            url: '/erp/finance/VATBalances',
            data: {
                title: 'VAT Balances',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/VATBalances.html',
                },
            },
        })

        .state('app.erp.financeVATBalanceMovement', {
            url: '/erp/finance/VATBalanceMovement',
            data: {
                title: 'VAT Balance Movement',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/VATBalanceMovement.html',
                },
            },
        })

        .state('app.erp.financeSettlementVerification', {
            url: '/erp/finance/SettlementVerification',
            data: {
                title: 'Settlement Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/SettlementVerification.html',
                },
            },
        })

        .state('app.erp.financeVendorPayments', {
            url: '/erp/finance/VendorPayments',
            data: {
                title: 'Vendor Payments',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/VendorPayments.html',
                },
            },
        })

        .state('app.erp.financeVendorPaymentsForm', {
            url: '/erp/finance/VendorPaymentForm',
            data: {
                title: 'Form: Vendor Payments',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/VendorPaymentsForm.html',
                },
            },
        })

        .state('app.erp.financeWHReconciliation', {
            url: '/erp/finance/WHReconciliation',
            data: {
                title: 'W/H Reconciliation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/WHReconciliation.html',
                },
            },
        })

        .state('app.erp.financeWHReconciliationForm', {
            url: '/erp/finance/WHReconciliationForm',
            data: {
                title: 'Form: WH Reconciliation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/WHReconciliationForm.html',
                },
            },
        })

        .state('app.erp.financePaymentMethods', {
            url: '/erp/finance/PaymentMethods',
            data: {
                title: 'Payment Methods',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PaymentMethods.html',
                },
            },
        })

        .state('app.erp.financePaymentMethodsForm', {
            url: '/erp/finance/PaymentMethodForm',
            data: {
                title: 'Form: Payment Method',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PaymentMethodsForm.html',
                },
            },
        })

        .state('app.erp.financePaymentTerms', {
            url: '/erp/finance/PaymentTerms',
            data: {
                title: 'Payment Terms',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PaymentTerms.html',
                },
            },
        })

        .state('app.erp.financePaymentTermsForm', {
            url: '/erp/finance/PaymentTermForm',
            data: {
                title: 'Form: Payment Term',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PaymentTermForm.html',
                },
            },
        })

        .state('app.erp.financePaymentRequestVerify', {
            url: '/erp/finance/PaymentRequestVerify',
            data: {
                title: 'Verify: Payment Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PaymentRequestVerification.html',
                },
            },
        })

        .state('app.erp.financeChargeCategories', {
            url: '/erp/finance/ChargeCategories',
            data: {
                title: 'Charge Categories',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChargeCategories.html',
                },
            },
        })

        .state('app.erp.financeChargeCategoriesForm', {
            url: '/erp/finance/ChargeCategoryForm',
            data: {
                title: 'Form: Charge Category',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChargeCategoriesForm.html',
                },
            },
        })

        .state('app.erp.financeDefaultCharges', {
            url: '/erp/finance/DefaultCharges',
            data: {
                title: 'Default Charges',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DefaultCharges.html',
                },
            },
        })

        .state('app.erp.financeDefaultChargesForm', {
            url: '/erp/finance/DefaultChargeForm',
            data: {
                title: 'Form:Default Charge',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DefaultChargeForm.html',
                },
            },
        })

        .state('app.erp.financeChequeTypes', {
            url: '/erp/finance/ChequeTypes',
            data: {
                title: 'Cheque Types',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChequeTypes.html',
                },
            },
        })

        .state('app.erp.financeChequeTypesForm', {
            url: '/erp/finance/ChequeTypeForm',
            data: {
                title: 'Form: Cheque Type',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChequeTypeForm.html',
                },
            },
        })

        .state('app.erp.financeAdvanceCategories', {
            url: '/erp/finance/AdvanceCategories',
            data: {
                title: 'Advance Categories',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AdvanceCategories.html',
                },
            },
        })

        .state('app.erp.financeAdvanceCategoriesForm', {
            url: '/erp/finance/AdvanceCategoryForm',
            data: {
                title: 'Form: Advance Category',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AdvanceCategoryForm.html',
                },
            },
        })

        .state('app.erp.financeIBSchemas', {
            url: '/erp/finance/IBSchemas',
            data: {
                title: 'I/B Schemas',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/IBSchemas.html',
                },
            },
        })

        .state('app.erp.financeIBSchemasForm', {
            url: '/erp/finance/IBSchemaForm',
            data: {
                title: 'Form: I/B Schema',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/IBSchemaForm.html',
                },
            },
        })

        .state('app.erp.financePenalties', {
            url: '/erp/finance/Penalties',
            data: {
                title: 'Penalties',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/Penalties.html',
                },
            },
        })

        .state('app.erp.financePenaltiesForm', {
            url: '/erp/finance/PenaltyForm',
            data: {
                title: 'Form: Penalty',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PenaltyForm.html',
                },
            },
        })

        .state('app.erp.financeDownPayments', {
            url: '/erp/finance/DownPayments',
            data: {
                title: 'Down Payments',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DownPayments.html',
                },
            },
        })

        .state('app.erp.financeDownPaymentsForm', {
            url: '/erp/finance/DownPaymentForm',
            data: {
                title: 'Form: Down Payment',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DownPaymentForm.html',
                },
            },
        })

        .state('app.erp.financeReceivableListByAge', {
            url: '/erp/finance/ReceivableListByAge',
            data: {
                title: 'Receivable List By Age',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReceivableListByAge.html',
                },
            },
        })

        .state('app.erp.financeReceivableListByAgeView', {
            url: '/erp/finance/ReceivableListByAgeView',
            data: {
                title: 'View: Receivable List By Age',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReceivableListByAgeView.html',
                },
            },
        })

        .state('app.erp.financePayableListByAge', {
            url: '/erp/finance/PayableListByAge',
            data: {
                title: 'Payable List By Age',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PayableListByAge.html',
                },
            },
        })

        .state('app.erp.financePayableListByAgeView', {
            url: '/erp/finance/PayableListByAgeView',
            data: {
                title: 'View: Payable List By Age',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PayableListByAgeView.html',
                },
            },
        })

        .state('app.erp.financeLedgerPerAccount', {
            url: '/erp/finance/LedgerPerAccount',
            data: {
                title: 'Ledger Per Account',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/LedgerPerAccount.html',
                },
            },
        })

        .state('app.erp.financeLedgerPerAccountForm', {
            url: '/erp/finance/LedgerPerAccountForm',
            data: {
                title: 'Form: Ledger Per Account',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/LedgerPerAccountForm.html',
                },
            },
        })

        .state('app.erp.financeAdvanceRequestSelection', {
            url: '/erp/finance/AdvanceRequestSelection',
            data: {
                title: 'Advance Request Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AdvanceRequestSelection.html',
                },
            },
        })

        .state('app.erp.financeAdvanceRequestSettlement', {
            url: '/erp/finance/AdvanceRequestSettlement',
            data: {
                title: 'Advance Request Settlement',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AdvanceRequestSettlement.html',
                },
            },
        })

        .state('app.erp.financeARListForReceiptSelection', {
            url: '/erp/finance/ARListForReceiptSelection',
            data: {
                title: 'AR List For Receipt Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ARListForReceiptSelection.html',
                },
            },
        })

        .state('app.erp.financeARReceiptSelection', {
            url: '/erp/finance/ARReceiptSelection',
            data: {
                title: 'AR Receipt Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ARReceiptSelection.html',
                },
            },
        })

        .state('app.erp.financeAdvanceSettlements', {
            url: '/erp/finance/AdvanceSettlements',
            data: {
                title: 'Advance Settlements',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AdvanceSettlements.html',
                },
            },
        })

        .state('app.erp.financeClearingRecon', {
            url: '/erp/finance/ClearingRecon',
            data: {
                title: 'Clearing Recon',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ClearingRecon.html',
                },
            },
        })

        .state('app.erp.financeClosingExecution', {
            url: '/erp/finance/ClosingExecution',
            data: {
                title: 'Closing Execution',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ClosingExecution.html',
                },
            },
        })

        .state('app.erp.financeCollectInvoices', {
            url: '/erp/finance/CollectInvoices',
            data: {
                title: 'Collect Invoices',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CollectInvoices.html',
                },
            },
        })

        ////
        .state('app.erp.financeCollectOrderSelection', {
            url: '/erp/finance/CollectOrderSelection',
            data: {
                title: 'Collect Order Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CollectOrderSelection.html',
                },
            },
        })

        .state('app.erp.financeCollectReconciliation', {
            url: '/erp/finance/CollectReconciliation',
            data: {
                title: 'Collect Reconciliation',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CollectReconciliation.html',
                },
            },
        })

        .state('app.erp.financeCollectRequestAdjustment', {
            url: '/erp/finance/CollectRequestAdjustment',
            data: {
                title: 'Collect Request Adjustment',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CollectRequestAdjustment.html',
                },
            },
        })

        .state('app.erp.financeCollectRequestFollowUpForm', {
            url: '/erp/finance/CollectRequestFollowUpForm',
            data: {
                title: 'Form: Collect Request Follow Up',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CollectRequestFollowUpForm.html',
                },
            },
        })

        .state('app.erp.financeCollectRequestForm', {
            url: '/erp/finance/CollectRequestForm',
            data: {
                title: 'Form: Collect Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CollectRequestForm.html',
                },
            },
        })

        .state('app.erp.financeCollectRequestSelection', {
            url: '/erp/finance/CollectRequestSelection',
            data: {
                title: 'Collect Request Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CollectRequestSelection.html',
                },
            },
        })

        .state('app.erp.financeDeferredRevenues', {
            url: '/erp/finance/DeferredRevenues',
            data: {
                title: 'Deferred Revenues',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DeferredRevenues.html',
                },
            },
        })

        .state('app.erp.financeDisposeAP', {
            url: '/erp/finance/DisposeAP',
            data: {
                title: 'Collect Request Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DisposeAP.html',
                },
            },
        })

        .state('app.erp.financeFailCollectForm', {
            url: '/erp/finance/FailCollectForm',
            data: {
                title: 'Form: Fail Collect',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/FailCollectForm.html',
                },
            },
        })

        .state('app.erp.financeAdditionalTaskVerification', {
            url: '/erp/finance/AdditionalTaskVerification',
            data: {
                title: 'Verify: Additional Task',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/AdditionalTaskVerification.html',
                },
            },
        })

        .state('app.erp.financeDepositDisposal', {
            url: '/erp/finance/DepositDisposal',
            data: {
                title: 'Deposit Disposal',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/DepositDisposal.html',
                },
            },
        })

        .state('app.erp.financeFReportSettingForm', {
            url: '/erp/finance/FReportSettingForm',
            data: {
                title: 'Form: Report Settings',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/FReportSettingProfile.html',
                },
            },
        })

        .state('app.erp.financeFReportSettings', {
            url: '/erp/finance/FReportSettings',
            data: {
                title: 'Report Settings',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/FReportSettings.html',
                },
            },
        })

        .state('app.erp.financeUpdateClearDate', {
            url: '/erp/finance/UpdateClearDate',
            data: {
                title: 'Update Clear Date',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/UpdateClearDate.html',
                },
            },
        })

        .state('app.erp.financeWHTaxNumberAssignment', {
            url: '/erp/finance/WHTaxNumberAssignment',
            data: {
                title: 'WH Tax Number Assignment',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/WHTaxNumberAssignment.html',
                },
            },
        })

        .state('app.erp.financeReceivedChequeForm', {
            url: '/erp/finance/ReceivedChequeForm',
            data: {
                title: 'Forrm: Received Cheque',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReceivedChequeForm.html',
                },
            },
        })

        .state('app.erp.financeReceivedItemList', {
            url: '/erp/finance/ReceivedItemList',
            data: {
                title: 'Received Item List',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReceivedItemList.html',
                },
            },
        })

        .state('app.erp.financeRecurringBillForm', {
            url: '/erp/finance/RecurringBillForm',
            data: {
                title: 'Form: Recurring Bill',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/RecurringBillForm.html',
                },
            },
        })

        .state('app.erp.financeRecurringInvoiceForm', {
            url: '/erp/finance/RecurringInvoiceForm',
            data: {
                title: 'Form: Recurring Invoice',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/RecurringInvoiceForm.html',
                },
            },
        })

        // 

        .state('app.erp.financePickedClearingRequest', {
            url: '/erp/finance/PickedClearingRequest',
            data: {
                title: 'Picked Clearing Request',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PickedClearingRequest.html',
                },
            },
        })

        .state('app.erp.financePurchaseInvoiceForm', {
            url: '/erp/finance/PurchaseInvoiceForm',
            data: {
                title: 'Form: Purchase Invoice',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PurchaseInvoiceForm.html',
                },
            },
        })

        .state('app.erp.financePurchaseInvoiceSelection', {
            url: '/erp/finance/PurchaseInvoiceSelection',
            data: {
                title: 'Purchase Invoice Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PurchaseInvoiceSelection.html',
                },
            },
        })

        .state('app.erp.financePurchasePriceSelection', {
            url: '/erp/finance/PurchasePriceSelection',
            data: {
                title: 'Purchase Price Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PurchasePriceSelection.html',
                },
            },
        })

        .state('app.erp.financeReceiptForm', {
            url: '/erp/finance/ReceiptForm',
            data: {
                title: 'Form: Receipt',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ReceiptForm.html',
                },
            },
        })

        .state('app.erp.financePaymentForm', {
            url: '/erp/finance/PaymentForm',
            data: {
                title: 'Form: Payment',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/PaymentForm.html',
                },
            },
        })

        .state('app.erp.financeIBPayables', {
            url: '/erp/finance/IBPayables',
            data: {
                title: 'IB Payables',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/IBPayables.html',
                },
            },
        })

        .state('app.erp.financeIBReceivables', {
            url: '/erp/finance/IBReceivables',
            data: {
                title: 'IB Receivables',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/IBReceivables.html',
                },
            },
        })

        /////

        .state('app.erp.financeInterbranchPayableForm', {
            url: '/erp/finance/InterbranchPayableForm',
            data: {
                title: 'Form: Interbranch Payable',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/InterbranchPayableForm.html',
                },
            },
        })

        .state('app.erp.financeInterbranchReceivableForm', {
            url: '/erp/finance/InterbranchReceivableForm',
            data: {
                title: 'Form: Interbranch Receivable',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/InterbranchReceivableForm.html',
                },
            },
        })

        .state('app.erp.financeInvoiceList', {
            url: '/erp/finance/InvoiceList',
            data: {
                title: 'Invoice List',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/InvoiceList.html',
                },
            },
        })

        .state('app.erp.financeInvoiceReceiptForm', {
            url: '/erp/finance/InvoiceReceiptForm',
            data: {
                title: 'Form: Invoice Receipt',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/InvoiceReceiptForm.html',
                },
            },
        })

        .state('app.erp.financeInvoiceReceiptItemList', {
            url: '/erp/finance/InvoiceReceiptItemList',
            data: {
                title: 'Invoice Receipt Item List',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/InvoiceReceiptItemList.html',
                },
            },
        })

        .state('app.erp.financeInvoiceReqRecon', {
            url: '/erp/finance/InvoiceReqRecon',
            data: {
                title: 'Invoice Request Recon',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/InvoiceReqRecon.html',
                },
            },
        })

        //

        .state('app.erp.financeInvoiceRequestsSelection', {
            url: '/erp/finance/InvoiceRequestsSelection',
            data: {
                title: 'Invoice Requests Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/InvoiceRequestsSelection.html',
                },
            },
        })

        .state('app.erp.financeIssuedChequeForm', {
            url: '/erp/finance/IssuedChequeForm',
            data: {
                title: 'Form: Issued Cheque',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/IssuedChequeForm.html',
                },
            },
        })

        .state('app.erp.financeIssuedCheques', {
            url: '/erp/finance/IssuedCheques',
            data: {
                title: 'Issued Cheques',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/IssuedCheques.html',
                },
            },
        })

        // 

        .state('app.erp.financeJournalProfile', {
            url: '/erp/finance/JournalProfile',
            data: {
                title: 'Journal Profile',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/JournalProfile.html',
                },
            },
        })

        .state('app.erp.financeMutationRecon', {
            url: '/erp/finance/MutationRecon',
            data: {
                title: 'Mutation Recon',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/MutationRecon.html',
                },
            },
        })

        .state('app.erp.financeOrderVerification', {
            url: '/erp/finance/OrderVerification',
            data: {
                title: 'Order Verification',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/OrderVerification.html',
                },
            },
        })

        .state('app.erp.financeCustomerSelection', {
            url: '/erp/finance/CustomerSelection',
            data: {
                title: 'Customer Selection',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/CustomerSelection.html',
                },
            },
        })

        .state('app.erp.financeChargeCategoryProfile', {
            url: '/erp/finance/ChargeCategoryProfile',
            data: {
                title: 'Profile: Charge Category',
            },
            views: {
                'erpMenu@app': {
                    templateUrl: 'app-erp/_menu/finance.html',
                },
                'content@app': {
                    templateUrl: 'app-erp/views/packages/finance/ChargeCategoryProfile.html',
                },
            },
        })

        ;
});
