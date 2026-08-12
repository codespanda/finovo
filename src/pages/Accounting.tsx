import { useNavigate } from "react-router-dom"
import {
  Wallet,
  Clock,
  TrendingUp,
  FileText,
  Wallet2,
  Plus,
  FilePlus2,
  Receipt,
  Landmark,
  BookText,
  ChevronRight,
  ChevronDown,
  CreditCard,
} from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ComparisonBarChart, TrendAreaChart, DonutChart, DonutLegend } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const newTransactionOptions = [
  { icon: FilePlus2, label: "New Invoice", href: "/sales/invoices" },
  { icon: Receipt, label: "New Bill", href: "/purchases/bills" },
  { icon: CreditCard, label: "New Expense", href: "/expenses" },
  { icon: BookText, label: "New Journal Entry", href: "/accounting/journal-entries" },
  { icon: Landmark, label: "New Payment", href: "/sales/payments" },
]

const trend = [
  { m: "Apr 2024", income: 320000, expenses: 245000 },
  { m: "May 2024", income: 350000, expenses: 260000 },
  { m: "Jun 2024", income: 335000, expenses: 250000 },
  { m: "Jul 2024", income: 430000, expenses: 300000 },
  { m: "Aug 2024", income: 355000, expenses: 265000 },
  { m: "Sep 2024", income: 340000, expenses: 255000 },
  { m: "Oct 2024", income: 330000, expenses: 250000 },
  { m: "Nov 2024", income: 360000, expenses: 270000 },
  { m: "Dec 2024", income: 345000, expenses: 260000 },
  { m: "Jan 2025", income: 390000, expenses: 280000 },
  { m: "Feb 2025", income: 405000, expenses: 300000 },
  { m: "Mar 2025", income: 425000, expenses: 310000 },
]

const expenseByCategory = [
  { name: "Salaries & Wages", value: 40.5, color: "var(--color-chart-1)" },
  { name: "Rent & Utilities", value: 18.7, color: "var(--color-chart-2)" },
  { name: "Office Expenses", value: 12.6, color: "var(--color-chart-3)" },
  { name: "Marketing", value: 10.3, color: "var(--color-chart-5)" },
  { name: "Travel & Conveyance", value: 7.8, color: "var(--color-chart-4)" },
  { name: "Others", value: 10.1, color: "var(--color-muted-foreground)" },
]

const transactions = [
  { date: "28 May 2025", type: "Invoice", ref: "INV-2025-0042", account: "ABC Solutions", desc: "Website Development", amount: 75000, status: "Paid" },
  { date: "27 May 2025", type: "Bill", ref: "BILL-2025-0031", account: "Rent", desc: "Office Rent - May 2025", amount: 45000, status: "Paid" },
  { date: "27 May 2025", type: "Payment", ref: "PAY-2025-0028", account: "State Bank of India", desc: "Payment to Vendor", amount: 25600, status: "Paid" },
  { date: "26 May 2025", type: "Invoice", ref: "INV-2025-0041", account: "TechCorp Ltd.", desc: "Software License", amount: 125000, status: "Unpaid" },
  { date: "25 May 2025", type: "Receipt", ref: "RCPT-2025-0022", account: "Global Enterprises", desc: "Advance Payment", amount: 50000, status: "Paid" },
]

const quickActions = [
  { icon: FilePlus2, label: "Create Invoice", href: "/sales/invoices" },
  { icon: Receipt, label: "Record Expense", href: "/expenses" },
  { icon: Landmark, label: "Add Bank Transaction", href: "/banking/feed" },
  { icon: BookText, label: "Create Journal Entry", href: "/accounting/journal-entries" },
  { icon: Wallet, label: "Manage Recurring Transactions", href: "/purchases/recurring-bills" },
]

const bankAccounts = [
  { name: "State Bank of India", no: "A/c No. •••• 4567", balance: 1245600 },
  { name: "HDFC Bank", no: "A/c No. •••• 7890", balance: 875300 },
  { name: "ICICI Bank", no: "A/c No. •••• 2345", balance: 325100 },
]

const topReceivables = [
  { name: "ABC Solutions", ref: "INV-2025-0038", amount: 245600, overdue: "15 Days Overdue" },
  { name: "TechCorp Ltd.", ref: "INV-2025-0040", amount: 185000, overdue: "10 Days Overdue" },
  { name: "Global Enterprises", ref: "INV-2025-0039", amount: 150000, overdue: "7 Days Overdue" },
]

const incomeExpenseRows = [
  { m: "Jan 2025", income: 390000, expenses: 280000 },
  { m: "Feb 2025", income: 405000, expenses: 300000 },
  { m: "Mar 2025", income: 425000, expenses: 310000 },
  { m: "Apr 2025", income: 320000, expenses: 245000 },
  { m: "May 2025", income: 350000, expenses: 260000 },
]

const cashFlowData = [
  { m: "Jan", cashIn: 410000, cashOut: 295000 },
  { m: "Feb", cashIn: 425000, cashOut: 312000 },
  { m: "Mar", cashIn: 445000, cashOut: 325000 },
  { m: "Apr", cashIn: 335000, cashOut: 258000 },
  { m: "May", cashIn: 365000, cashOut: 274000 },
]

const cashFlowRows = [
  { m: "Jan 2025", opening: 1685000, in: 410000, out: 295000, closing: 1800000 },
  { m: "Feb 2025", opening: 1800000, in: 425000, out: 312000, closing: 1913000 },
  { m: "Mar 2025", opening: 1913000, in: 445000, out: 325000, closing: 2033000 },
  { m: "Apr 2025", opening: 2033000, in: 335000, out: 258000, closing: 2110000 },
  { m: "May 2025", opening: 2110000, in: 365000, out: 274000, closing: 2201000 },
]

const bankAccountsFull = [
  { name: "State Bank of India", no: "A/c No. •••• 4567", type: "Current Account", balance: 1245600, status: "Active" },
  { name: "HDFC Bank", no: "A/c No. •••• 7890", type: "Current Account", balance: 875300, status: "Active" },
  { name: "ICICI Bank", no: "A/c No. •••• 2345", type: "Savings Account", balance: 325100, status: "Active" },
  { name: "Axis Bank", no: "A/c No. •••• 6789", type: "Payroll Account", balance: 65320, status: "Pending" },
]

const chartOfAccounts = [
  { group: "Assets", code: "1000 – 1999", accounts: [
    { code: "1010", name: "Cash in Hand", type: "Asset", balance: 45600 },
    { code: "1020", name: "Bank Accounts", type: "Asset", balance: 2511320 },
    { code: "1100", name: "Accounts Receivable", type: "Asset", balance: 875400 },
    { code: "1200", name: "Inventory", type: "Asset", balance: 645200 },
  ] },
  { group: "Liabilities", code: "2000 – 2999", accounts: [
    { code: "2010", name: "Accounts Payable", type: "Liability", balance: 525600 },
    { code: "2100", name: "GST Payable", type: "Liability", balance: 145200 },
    { code: "2200", name: "TDS Payable", type: "Liability", balance: 62500 },
  ] },
  { group: "Equity", code: "3000 – 3999", accounts: [
    { code: "3010", name: "Owner's Capital", type: "Equity", balance: 2500000 },
    { code: "3020", name: "Retained Earnings", type: "Equity", balance: 1845600 },
  ] },
  { group: "Income", code: "4000 – 4999", accounts: [
    { code: "4010", name: "Sales Revenue", type: "Income", balance: 4275300 },
    { code: "4020", name: "Service Revenue", type: "Income", balance: 300000 },
  ] },
  { group: "Expenses", code: "5000 – 5999", accounts: [
    { code: "5010", name: "Salaries & Wages", type: "Expense", balance: 1006668 },
    { code: "5020", name: "Rent & Utilities", type: "Expense", balance: 464727 },
    { code: "5030", name: "Office Expenses", type: "Expense", balance: 313186 },
    { code: "5040", name: "Marketing", type: "Expense", balance: 256017 },
  ] },
]

export function Accounting() {
  const navigate = useNavigate()

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Accounting" }]}
        title="Accounting"
        description="Manage your financial transactions, accounts, and reports."
        actions={
          <>
            <Select defaultValue="2024-25">
              <SelectTrigger className="w-32 shrink-0"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-26">FY 2025-26</SelectItem>
                <SelectItem value="2024-25">FY 2024-25</SelectItem>
                <SelectItem value="2023-24">FY 2023-24</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button><Plus className="size-4" /> New Transaction <ChevronDown className="size-3.5 opacity-80" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {newTransactionOptions.map((o) => (
                  <DropdownMenuItem key={o.label} onClick={() => navigate(o.href)}>
                    <o.icon className="size-4" /> {o.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={Wallet} label="Total Income" value={inr(4575300)} delta={{ value: "12.5%" }} color="green" />
        <StatCard icon={Clock} label="Total Expenses" value={inr(2485600)} delta={{ value: "8.3%" }} color="red" />
        <StatCard icon={TrendingUp} label="Net Profit" value={inr(2089700)} delta={{ value: "18.6%" }} color="blue" />
        <StatCard icon={FileText} label="Outstanding Receivables" value={inr(875400)} delta={{ value: "3 Overdue Invoices", label: "", positive: false }} color="orange" />
        <StatCard icon={Wallet2} label="Outstanding Payables" value={inr(525600)} delta={{ value: "2 Overdue Bills", label: "", positive: false }} color="purple" className="col-span-2 lg:col-span-1" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <Card>
            <CardContent className="pt-5">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="income-expense">Income &amp; Expense</TabsTrigger>
                  <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
                  <TabsTrigger value="bank-accounts">Bank Accounts</TabsTrigger>
                  <TabsTrigger value="chart-of-accounts">Chart of Accounts</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="font-semibold text-foreground">Income vs Expenses</p>
                        <Button variant="outline" size="sm">This Financial Year</Button>
                      </div>
                      <ComparisonBarChart
                        data={trend}
                        xKey="m"
                        height={280}
                        series={[
                          { key: "income", color: "var(--color-chart-2)", label: "Income" },
                          { key: "expenses", color: "var(--color-chart-5)", label: "Expenses" },
                        ]}
                      />
                    </div>

                    <div className="flex shrink-0 flex-col items-center gap-4 lg:w-56">
                      <p className="self-start font-semibold text-foreground lg:self-center">Expense by Category</p>
                      <DonutChart data={expenseByCategory} total={inr(2485600)} totalLabel="Total" size={160} />
                      <DonutLegend data={expenseByCategory} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="income-expense">
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-muted-foreground border-b text-left text-xs">
                          <th className="pb-2 font-medium">Month</th>
                          <th className="pb-2 text-right font-medium">Income</th>
                          <th className="pb-2 text-right font-medium">Expenses</th>
                          <th className="pb-2 text-right font-medium">Net</th>
                        </tr>
                      </thead>
                      <tbody>
                        {incomeExpenseRows.map((r) => (
                          <tr key={r.m} className="border-b last:border-0">
                            <td className="py-3 whitespace-nowrap text-foreground">{r.m}</td>
                            <td className="text-success-foreground py-3 text-right font-medium whitespace-nowrap">{inr(r.income)}</td>
                            <td className="py-3 text-right font-medium whitespace-nowrap text-destructive">{inr(r.expenses)}</td>
                            <td className="py-3 text-right font-semibold whitespace-nowrap text-foreground">{inr(r.income - r.expenses)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="cash-flow">
                  <div className="mt-5">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="font-semibold text-foreground">Cash In vs Cash Out</p>
                      <Button variant="outline" size="sm">This Financial Year</Button>
                    </div>
                    <TrendAreaChart
                      data={cashFlowData}
                      xKey="m"
                      height={220}
                      series={[
                        { key: "cashIn", color: "var(--color-chart-2)", label: "Cash In" },
                        { key: "cashOut", color: "var(--color-chart-5)", label: "Cash Out" },
                      ]}
                    />
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-muted-foreground border-b text-left text-xs">
                            <th className="pb-2 font-medium">Month</th>
                            <th className="pb-2 text-right font-medium">Opening Balance</th>
                            <th className="pb-2 text-right font-medium">Cash In</th>
                            <th className="pb-2 text-right font-medium">Cash Out</th>
                            <th className="pb-2 text-right font-medium">Closing Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cashFlowRows.map((r) => (
                            <tr key={r.m} className="border-b last:border-0">
                              <td className="py-3 whitespace-nowrap text-foreground">{r.m}</td>
                              <td className="text-muted-foreground py-3 text-right whitespace-nowrap">{inr(r.opening)}</td>
                              <td className="text-success-foreground py-3 text-right font-medium whitespace-nowrap">{inr(r.in)}</td>
                              <td className="py-3 text-right font-medium whitespace-nowrap text-destructive">{inr(r.out)}</td>
                              <td className="py-3 text-right font-semibold whitespace-nowrap text-foreground">{inr(r.closing)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="bank-accounts">
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-muted-foreground border-b text-left text-xs">
                          <th className="pb-2 font-medium">Bank</th>
                          <th className="pb-2 font-medium">Account Type</th>
                          <th className="pb-2 text-right font-medium">Balance</th>
                          <th className="pb-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bankAccountsFull.map((b) => (
                          <tr key={b.name} className="border-b last:border-0">
                            <td className="py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="bg-info-bg text-info-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
                                  <Landmark className="size-4" />
                                </div>
                                <div>
                                  <p className="font-medium whitespace-nowrap text-foreground">{b.name}</p>
                                  <p className="text-muted-foreground text-xs">{b.no}</p>
                                </div>
                              </div>
                            </td>
                            <td className="text-muted-foreground py-3 whitespace-nowrap">{b.type}</td>
                            <td className="py-3 text-right font-medium whitespace-nowrap text-foreground">{inr(b.balance)}</td>
                            <td className="py-3"><StatusBadge status={b.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="chart-of-accounts">
                  <div className="mt-5 flex flex-col gap-5">
                    {chartOfAccounts.map((g) => (
                      <div key={g.group}>
                        <div className="mb-2 flex items-center gap-2">
                          <p className="font-semibold text-foreground">{g.group}</p>
                          <span className="text-muted-foreground text-xs">{g.code}</span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="text-muted-foreground border-b text-left text-xs">
                                <th className="pb-2 font-medium">Code</th>
                                <th className="pb-2 font-medium">Account Name</th>
                                <th className="pb-2 font-medium">Type</th>
                                <th className="pb-2 text-right font-medium">Balance</th>
                              </tr>
                            </thead>
                            <tbody>
                              {g.accounts.map((a) => (
                                <tr key={a.code} className="border-b last:border-0">
                                  <td className="text-muted-foreground py-2.5 font-mono whitespace-nowrap">{a.code}</td>
                                  <td className="py-2.5 whitespace-nowrap text-foreground">{a.name}</td>
                                  <td className="py-2.5"><Badge variant="secondary">{a.type}</Badge></td>
                                  <td className="py-2.5 text-right font-medium whitespace-nowrap text-foreground">{inr(a.balance)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto pb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Reference</th>
                    <th className="pb-2 font-medium">Account</th>
                    <th className="pb-2 font-medium">Description</th>
                    <th className="pb-2 text-right font-medium">Amount</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.ref} className="border-b last:border-0">
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{t.date}</td>
                      <td className="py-3 text-foreground">{t.type}</td>
                      <td className="text-primary py-3 font-medium whitespace-nowrap">{t.ref}</td>
                      <td className="py-3 text-foreground">{t.account}</td>
                      <td className="text-muted-foreground py-3">{t.desc}</td>
                      <td className="py-3 text-right font-medium text-foreground whitespace-nowrap">{inr(t.amount)}</td>
                      <td className="py-3"><StatusBadge status={t.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-center">
                <a href="/reports/profit-loss" className="text-primary text-sm font-medium">View All Transactions</a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col pb-3">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.href)}
                  className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2.5 text-left transition-colors"
                >
                  <div className="bg-info-bg text-info-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                    <a.icon className="size-4" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-foreground">{a.label}</span>
                  <ChevronRight className="text-muted-foreground size-4 shrink-0" />
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Bank Accounts</CardTitle>
              <a href="/banking/accounts" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {bankAccounts.map((b) => (
                <div key={b.name} className="flex items-center gap-3">
                  <div className="bg-info-bg text-info-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                    <Landmark className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{b.name}</p>
                    <p className="text-muted-foreground text-xs">{b.no}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{inr(b.balance)}</p>
                    <p className="text-muted-foreground text-xs">Balance</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Top Receivables</CardTitle>
              <a href="/reports/ar-aging" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {topReceivables.map((r) => (
                <div key={r.ref} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{r.name}</p>
                    <p className="text-muted-foreground text-xs">{r.ref}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{inr(r.amount)}</p>
                    <p className="text-destructive text-xs">{r.overdue}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
