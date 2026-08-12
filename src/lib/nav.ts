import {
  LayoutDashboard,
  Calculator,
  ShoppingBag,
  ShoppingCart,
  Landmark,
  Receipt,
  Users,
  Package,
  FolderKanban,
  BarChart3,
  Percent,
  Contact,
  Settings,
  Puzzle,
  HelpCircle,
  type LucideIcon,
} from "lucide-react"

export interface NavChild {
  label: string
  href: string
  children?: NavChild[]
}

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  children?: NavChild[]
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    label: "Accounting",
    href: "/accounting",
    icon: Calculator,
    children: [
      { label: "Overview", href: "/accounting" },
      { label: "Journal Entries", href: "/accounting/journal-entries" },
    ],
  },
  {
    label: "Sales",
    href: "/sales",
    icon: ShoppingBag,
    children: [
      { label: "Invoices", href: "/sales" },
      { label: "Estimates", href: "/sales/estimates" },
      { label: "Credit Notes", href: "/sales/credit-notes" },
      { label: "Customers", href: "/sales/customers" },
      { label: "Payments Receivable", href: "/sales/payments" },
      { label: "Products & Services", href: "/sales/products" },
    ],
  },
  {
    label: "Purchases",
    href: "/purchases",
    icon: ShoppingCart,
    children: [
      { label: "Bills", href: "/purchases" },
      { label: "Purchase Orders", href: "/purchases/purchase-orders" },
      { label: "Vendors", href: "/purchases/suppliers" },
      { label: "Debit Notes", href: "/purchases/debit-notes" },
      { label: "Payables", href: "/purchases/payments" },
      { label: "Recurring Bills", href: "/purchases/recurring-bills" },
    ],
  },
  {
    label: "Banking",
    href: "/banking",
    icon: Landmark,
    children: [
      { label: "Bank Accounts", href: "/banking/accounts" },
      { label: "Bank Feed", href: "/banking/feed" },
      { label: "Reconciliation", href: "/banking/reconciliation" },
      { label: "Rules", href: "/banking/rules" },
      { label: "Statements", href: "/banking/statements" },
    ],
  },
  {
    label: "Expenses",
    href: "/expenses",
    icon: Receipt,
    children: [
      { label: "Expense Claims", href: "/expenses" },
      { label: "Categories", href: "/expenses/categories" },
      { label: "Approval Workflows", href: "/expenses/approval-workflows" },
      { label: "Mileage", href: "/expenses/mileage" },
      { label: "Tax & Deductions", href: "/expenses/tax-deductions" },
    ],
  },
  {
    label: "Payroll",
    href: "/payroll",
    icon: Users,
    children: [
      { label: "Overview", href: "/payroll" },
      { label: "Employees", href: "/payroll/employees" },
      { label: "Run Payroll", href: "/payroll/runs" },
      { label: "Pay Slips", href: "/payroll/payslips" },
      { label: "Taxes & Deductions", href: "/payroll/taxes" },
    ],
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: Package,
    children: [
      { label: "Overview", href: "/inventory" },
      { label: "Items", href: "/inventory/items" },
      { label: "Categories", href: "/inventory/categories" },
      { label: "Warehouses", href: "/inventory/warehouses" },
      { label: "Stock Adjustments", href: "/inventory/stock-adjustments" },
      { label: "Transfers", href: "/inventory/transfers" },
      { label: "Stock Count", href: "/inventory/stock-count" },
      { label: "Batch / Serial Numbers", href: "/inventory/batch-serial" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
    children: [
      { label: "Overview", href: "/projects" },
      { label: "Tasks", href: "/projects/tasks" },
      { label: "Timesheets", href: "/projects/timesheets" },
      { label: "Milestones", href: "/projects/milestones" },
      { label: "Team", href: "/projects/team" },
      { label: "Calendar", href: "/projects/calendar" },
      { label: "Files & Documents", href: "/projects/files" },
      { label: "Expenses", href: "/projects/expenses" },
      { label: "Invoices", href: "/projects/invoices" },
    ],
  },
  {
    label: "Reports",
    href: "/reports",
    icon: BarChart3,
    children: [
      { label: "Overview", href: "/reports" },
      { label: "Sales Reports", href: "/reports/sales" },
      { label: "AP Aging", href: "/reports/ap-aging" },
      { label: "AR Aging", href: "/reports/ar-aging" },
      { label: "Profit & Loss", href: "/reports/profit-loss" },
      { label: "Balance Sheet", href: "/reports/balance-sheet" },
      { label: "Cash Flow", href: "/reports/cash-flow" },
      { label: "Expense Reports", href: "/reports/expenses" },
      { label: "Payroll Reports", href: "/reports/payroll" },
      { label: "Inventory Reports", href: "/reports/inventory" },
      { label: "Tax Reports", href: "/reports/tax-reports" },
    ],
  },
  {
    label: "Tax",
    href: "/tax",
    icon: Percent,
    children: [
      { label: "Overview", href: "/tax" },
      {
        label: "GST",
        href: "/tax/gst",
        children: [
          { label: "Overview", href: "/tax/gst" },
          { label: "GSTR-1", href: "/tax/gst/gstr-1" },
          { label: "Returns Dashboard", href: "/tax/gst/returns" },
          { label: "Sales Register", href: "/tax/gst/sales-register" },
          { label: "Purchase Register", href: "/tax/gst/purchase-register" },
          { label: "GSTR-2B Reconciliation", href: "/tax/gst/reconciliation" },
          { label: "Input Tax Credit", href: "/tax/gst/itc" },
          { label: "E-Way Bills", href: "/tax/gst/e-way-bills" },
          { label: "GSTR-3B", href: "/tax/gst/gstr-3b" },
        ],
      },
      {
        label: "TDS",
        href: "/tax/tds",
        children: [
          { label: "Dashboard", href: "/tax/tds" },
          { label: "Deductors", href: "/tax/tds/deductors" },
          { label: "Deductees", href: "/tax/tds/deductees" },
          { label: "TDS Returns", href: "/tax/tds-returns" },
          { label: "Challans", href: "/tax/tds/challans" },
          { label: "Challan Mapping", href: "/tax/tds/challan-mapping" },
          { label: "Transactions", href: "/tax/tds/transactions" },
          { label: "Form 130", href: "/tax/tds/form-130" },
          { label: "Form 131", href: "/tax/tds/form-131" },
          { label: "Form 133", href: "/tax/tds/form-133" },
          { label: "Correction Returns", href: "/tax/tds/correction-returns" },
          { label: "PAN Verification", href: "/tax/tds/pan-verification" },
          { label: "TRACES Integration", href: "/tax/tds/traces" },
          { label: "Justification Reports", href: "/tax/tds/justification-reports" },
        ],
      },
    ],
  },
  {
    label: "Contacts",
    href: "/contacts",
    icon: Contact,
    children: [
      { label: "All Contacts", href: "/contacts" },
      { label: "Customers", href: "/contacts/customers" },
      { label: "Suppliers", href: "/contacts/suppliers" },
      { label: "Employees", href: "/contacts/employees" },
      { label: "Groups", href: "/contacts/groups" },
    ],
  },
]

export const bottomNavItems: NavItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Integrations", href: "/integrations", icon: Puzzle },
  { label: "Help & Support", href: "/help", icon: HelpCircle },
]
