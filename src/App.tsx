import { Routes, Route } from "react-router-dom"

import { AppShell } from "@/components/layout/AppShell"
import { Login } from "@/pages/Login"
import { Dashboard } from "@/pages/Dashboard"
import { Accounting } from "@/pages/Accounting"
import { JournalEntries } from "@/pages/accounting/JournalEntries"
import { ComingSoon } from "@/pages/ComingSoon"

import { Invoices } from "@/pages/sales/Invoices"
import { InvoiceDetail } from "@/pages/sales/InvoiceDetail"
import { Customers } from "@/pages/sales/Customers"
import { Payments } from "@/pages/sales/Payments"
import { Estimates } from "@/pages/sales/Estimates"
import { CreditNotes } from "@/pages/sales/CreditNotes"
import { ProductsServices } from "@/pages/sales/ProductsServices"
import { SalesReports } from "@/pages/sales/SalesReports"

import { Bills } from "@/pages/purchases/Bills"
import { PurchaseOrders } from "@/pages/purchases/PurchaseOrders"
import { RecurringBills } from "@/pages/purchases/RecurringBills"
import { DebitNotes } from "@/pages/purchases/DebitNotes"
import { Payables } from "@/pages/purchases/Payables"
import { BankingOverview } from "@/pages/banking/BankingOverview"
import { BankAccounts } from "@/pages/banking/BankAccounts"
import { BankFeed } from "@/pages/banking/BankFeed"
import { Reconciliation } from "@/pages/banking/Reconciliation"
import { Rules } from "@/pages/banking/Rules"
import { Statements } from "@/pages/banking/Statements"
import { ExpenseClaims } from "@/pages/expenses/ExpenseClaims"
import { Categories } from "@/pages/expenses/Categories"
import { Mileage } from "@/pages/expenses/Mileage"
import { ApprovalWorkflows } from "@/pages/expenses/ApprovalWorkflows"
import { ExpenseReports } from "@/pages/expenses/ExpenseReports"
import { TaxDeductions } from "@/pages/expenses/TaxDeductions"

import { InventoryOverview } from "@/pages/inventory/InventoryOverview"
import { Items } from "@/pages/inventory/Items"
import { InventoryCategories } from "@/pages/inventory/InventoryCategories"
import { Warehouses } from "@/pages/inventory/Warehouses"
import { StockAdjustments } from "@/pages/inventory/StockAdjustments"
import { Transfers } from "@/pages/inventory/Transfers"
import { StockCount } from "@/pages/inventory/StockCount"
import { BatchSerialNumbers } from "@/pages/inventory/BatchSerialNumbers"
import { InventoryReports } from "@/pages/inventory/InventoryReports"

import { PayrollOverview } from "@/pages/payroll/PayrollOverview"
import { Employees } from "@/pages/payroll/Employees"
import { EmployeeProfile } from "@/pages/payroll/EmployeeProfile"
import { PayrollRuns } from "@/pages/payroll/PayrollRuns"
import { Payslips } from "@/pages/payroll/Payslips"
import { PayrollReports } from "@/pages/payroll/PayrollReports"
import { PayrollTaxesDeductions } from "@/pages/payroll/PayrollTaxesDeductions"

import { Projects } from "@/pages/projects/Projects"
import { Tasks } from "@/pages/projects/Tasks"
import { Timesheet } from "@/pages/projects/Timesheet"
import { Milestones } from "@/pages/projects/Milestones"
import { Team } from "@/pages/projects/Team"
import { Calendar } from "@/pages/projects/Calendar"
import { FilesDocuments } from "@/pages/projects/FilesDocuments"
import { ProjectExpenses } from "@/pages/projects/ProjectExpenses"
import { ProjectInvoices } from "@/pages/projects/ProjectInvoices"

import { ReportsOverview } from "@/pages/reports/ReportsOverview"
import { ProfitLoss } from "@/pages/reports/ProfitLoss"
import { BalanceSheet } from "@/pages/reports/BalanceSheet"
import { CashFlow } from "@/pages/reports/CashFlow"
import { ArAging } from "@/pages/reports/ArAging"
import { ApAging } from "@/pages/reports/ApAging"
import { TaxReports } from "@/pages/reports/TaxReports"

import { TaxOverview } from "@/pages/tax/TaxOverview"
import { GstOverview } from "@/pages/tax/GstOverview"
import { GstReturns } from "@/pages/tax/GstReturns"
import { GstSalesRegister } from "@/pages/tax/GstSalesRegister"
import { GstPurchaseRegister } from "@/pages/tax/GstPurchaseRegister"
import { Gstr1 } from "@/pages/tax/Gstr1"
import { GstReconciliation } from "@/pages/tax/GstReconciliation"
import { EWayBills } from "@/pages/tax/EWayBills"
import { Gstr3B } from "@/pages/tax/Gstr3B"
import { InputTaxCredit } from "@/pages/tax/InputTaxCredit"
import { TdsDashboard } from "@/pages/tax/TdsDashboard"
import { TdsReturns } from "@/pages/tax/TdsReturns"
import { Deductors } from "@/pages/tax/Deductors"
import { Deductees } from "@/pages/tax/Deductees"
import { Challans } from "@/pages/tax/Challans"
import { ChallanMapping } from "@/pages/tax/ChallanMapping"
import { Transactions } from "@/pages/tax/Transactions"
import { Form130 } from "@/pages/tax/Form130"
import { Form131 } from "@/pages/tax/Form131"
import { Form133 } from "@/pages/tax/Form133"
import { CorrectionReturns } from "@/pages/tax/CorrectionReturns"
import { PanVerification } from "@/pages/tax/PanVerification"
import { TracesIntegration } from "@/pages/tax/TracesIntegration"
import { JustificationReports } from "@/pages/tax/JustificationReports"
import { Contacts } from "@/pages/contacts/Contacts"
import { Groups } from "@/pages/contacts/Groups"
import { SupplierDetail } from "@/pages/contacts/SupplierDetail"

import { Settings } from "@/pages/settings/Settings"
import { CompanyProfile } from "@/pages/settings/CompanyProfile"
import { BusinessDetails } from "@/pages/settings/BusinessDetails"
import { TaxComplianceSettings } from "@/pages/settings/TaxComplianceSettings"
import { DocumentNumbering } from "@/pages/settings/DocumentNumbering"
import { UsersRoles } from "@/pages/settings/UsersRoles"
import { SecuritySettingsPage } from "@/pages/settings/SecuritySettingsPage"
import { NotificationSettings } from "@/pages/settings/NotificationSettings"
import { PreferencesPage } from "@/pages/settings/PreferencesPage"
import { AuditLog } from "@/pages/settings/AuditLog"
import { LoginHistory } from "@/pages/settings/LoginHistory"
import { FinancialSettingsPage } from "@/pages/settings/FinancialSettingsPage"
import { PayrollSettingsPage } from "@/pages/settings/PayrollSettingsPage"
import { Integrations } from "@/pages/settings/Integrations"
import { HelpSupport } from "@/pages/settings/HelpSupport"
import { SignUp } from "@/pages/SignUp"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/accounting" element={<Accounting />} />
        <Route path="/accounting/journal-entries" element={<JournalEntries />} />

        <Route path="/sales" element={<Invoices />} />
        <Route path="/sales/invoices" element={<Invoices />} />
        <Route path="/sales/invoices/:id" element={<InvoiceDetail />} />
        <Route path="/sales/customers" element={<Customers />} />
        <Route path="/sales/payments" element={<Payments />} />
        <Route path="/sales/estimates" element={<Estimates />} />
        <Route path="/sales/credit-notes" element={<CreditNotes />} />
        <Route path="/sales/products" element={<ProductsServices />} />

        <Route path="/purchases" element={<Bills />} />
        <Route path="/purchases/bills" element={<Bills />} />
        <Route path="/purchases/suppliers" element={<Contacts />} />
        <Route path="/purchases/purchase-orders" element={<PurchaseOrders />} />
        <Route path="/purchases/recurring-bills" element={<RecurringBills />} />
        <Route path="/purchases/debit-notes" element={<DebitNotes />} />
        <Route path="/purchases/payments" element={<Payables />} />

        <Route path="/banking" element={<BankingOverview />} />
        <Route path="/banking/accounts" element={<BankAccounts />} />
        <Route path="/banking/feed" element={<BankFeed />} />
        <Route path="/banking/reconciliation" element={<Reconciliation />} />
        <Route path="/banking/rules" element={<Rules />} />
        <Route path="/banking/statements" element={<Statements />} />

        <Route path="/expenses" element={<ExpenseClaims />} />
        <Route path="/expenses/categories" element={<Categories />} />
        <Route path="/expenses/approval-workflows" element={<ApprovalWorkflows />} />
        <Route path="/expenses/mileage" element={<Mileage />} />
        <Route path="/expenses/tax-deductions" element={<TaxDeductions />} />

        <Route path="/payroll" element={<PayrollOverview />} />
        <Route path="/payroll/employees" element={<Employees />} />
        <Route path="/payroll/employees/:id" element={<EmployeeProfile />} />
        <Route path="/payroll/runs" element={<PayrollRuns />} />
        <Route path="/payroll/payslips" element={<Payslips />} />
        <Route path="/payroll/taxes" element={<PayrollTaxesDeductions />} />

        <Route path="/inventory" element={<InventoryOverview />} />
        <Route path="/inventory/items" element={<Items />} />
        <Route path="/inventory/categories" element={<InventoryCategories />} />
        <Route path="/inventory/warehouses" element={<Warehouses />} />
        <Route path="/inventory/stock-adjustments" element={<StockAdjustments />} />
        <Route path="/inventory/transfers" element={<Transfers />} />
        <Route path="/inventory/stock-count" element={<StockCount />} />
        <Route path="/inventory/batch-serial" element={<BatchSerialNumbers />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/tasks" element={<Tasks />} />
        <Route path="/projects/timesheets" element={<Timesheet />} />
        <Route path="/projects/milestones" element={<Milestones />} />
        <Route path="/projects/team" element={<Team />} />
        <Route path="/projects/calendar" element={<Calendar />} />
        <Route path="/projects/files" element={<FilesDocuments />} />
        <Route path="/projects/expenses" element={<ProjectExpenses />} />
        <Route path="/projects/invoices" element={<ProjectInvoices />} />

        <Route path="/reports" element={<ReportsOverview />} />
        <Route path="/reports/sales" element={<SalesReports />} />
        <Route path="/reports/expenses" element={<ExpenseReports />} />
        <Route path="/reports/payroll" element={<PayrollReports />} />
        <Route path="/reports/inventory" element={<InventoryReports />} />
        <Route path="/reports/profit-loss" element={<ProfitLoss />} />
        <Route path="/reports/balance-sheet" element={<BalanceSheet />} />
        <Route path="/reports/cash-flow" element={<CashFlow />} />
        <Route path="/reports/ar-aging" element={<ArAging />} />
        <Route path="/reports/ap-aging" element={<ApAging />} />
        <Route path="/reports/tax-reports" element={<TaxReports />} />

        <Route path="/tax" element={<TaxOverview />} />

        <Route path="/tax/gst" element={<GstOverview />} />
        <Route path="/tax/gst/sales-register" element={<GstSalesRegister />} />
        <Route path="/tax/gst/purchase-register" element={<GstPurchaseRegister />} />
        <Route path="/tax/gst/returns" element={<GstReturns />} />
        <Route path="/tax/gst/gstr-1" element={<Gstr1 />} />
        <Route path="/tax/gst/gstr-3b" element={<Gstr3B />} />
        <Route path="/tax/gst/itc" element={<InputTaxCredit />} />
        <Route path="/tax/gst/reconciliation" element={<GstReconciliation />} />
        <Route path="/tax/gst/e-way-bills" element={<EWayBills />} />

        <Route path="/tax/tds" element={<TdsDashboard />} />
        <Route path="/tax/tds-returns" element={<TdsReturns />} />
        <Route path="/tax/tds/deductors" element={<Deductors />} />
        <Route path="/tax/tds/deductees" element={<Deductees />} />
        <Route path="/tax/tds/challans" element={<Challans />} />
        <Route path="/tax/tds/challan-mapping" element={<ChallanMapping />} />
        <Route path="/tax/tds/transactions" element={<Transactions />} />
        <Route path="/tax/tds/form-130" element={<Form130 />} />
        <Route path="/tax/tds/form-131" element={<Form131 />} />
        <Route path="/tax/tds/form-133" element={<Form133 />} />
        <Route path="/tax/tds/correction-returns" element={<CorrectionReturns />} />
        <Route path="/tax/tds/pan-verification" element={<PanVerification />} />
        <Route path="/tax/tds/traces" element={<TracesIntegration />} />
        <Route path="/tax/tds/justification-reports" element={<JustificationReports />} />

        <Route path="/tax/reports" element={<ComingSoon title="Tax Reports" crumbs={[{ label: "Tax", href: "/tax" }, { label: "Tax Reports" }]} />} />

        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/customers" element={<Customers />} />
        <Route path="/contacts/suppliers" element={<Contacts />} />
        <Route path="/contacts/suppliers/:id" element={<SupplierDetail />} />
        <Route path="/contacts/employees" element={<Employees />} />
        <Route path="/contacts/groups" element={<Groups />} />

        <Route path="/files" element={<ComingSoon title="Files" crumbs={[{ label: "Files" }]} />} />

        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/company-profile" element={<CompanyProfile />} />
        <Route path="/settings/business-details" element={<BusinessDetails />} />
        <Route path="/settings/tax-compliance" element={<TaxComplianceSettings />} />
        <Route path="/settings/document-numbering" element={<DocumentNumbering />} />
        <Route path="/settings/users-roles" element={<UsersRoles />} />
        <Route path="/settings/security" element={<SecuritySettingsPage />} />
        <Route path="/settings/notifications" element={<NotificationSettings />} />
        <Route path="/settings/preferences" element={<PreferencesPage />} />
        <Route path="/settings/audit-log" element={<AuditLog />} />
        <Route path="/settings/login-history" element={<LoginHistory />} />
        <Route path="/settings/financial" element={<FinancialSettingsPage />} />
        <Route path="/settings/payroll" element={<PayrollSettingsPage />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/help" element={<HelpSupport />} />
      </Route>
    </Routes>
  )
}

export default App
