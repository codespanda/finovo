import {
  Wallet,
  Landmark,
  ArrowDownCircle,
  ArrowUpCircle,
  TrendingUp,
  FileText,
  Receipt,
  UserPlus,
  RefreshCcw,
  PlusCircle,
  UploadCloud,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react"

import { Link } from "react-router-dom"

import { StatCard } from "@/components/shared/StatCard"
import { TrendAreaChart, TrendLineChart, DonutChart, DonutLegend } from "@/components/shared/charts"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewInvoiceDialog, NewBillDialog } from "@/components/shared/TransactionDialogs"
import { ReceivePaymentDialog, NewContactDialog } from "@/components/shared/EntityDialogs"
import { NewExpenseClaimDialog } from "@/components/shared/PayrollExpenseDialogs"
import { inr } from "@/lib/format"

const cashFlowData = [
  { d: "1 May", inflow: 45000, outflow: 30000 },
  { d: "8 May", inflow: 62000, outflow: 40000 },
  { d: "15 May", inflow: 125000, outflow: 85000 },
  { d: "22 May", inflow: 58000, outflow: 44000 },
  { d: "29 May", inflow: 70000, outflow: 52000 },
]

const revenueExpenseData = [
  { m: "1 May", revenue: 40000, expenses: 30000 },
  { m: "8 May", revenue: 85000, expenses: 42000 },
  { m: "15 May", revenue: 60000, expenses: 55000 },
  { m: "22 May", revenue: 92000, expenses: 48000 },
  { m: "29 May", revenue: 70000, expenses: 60000 },
]

const expenseBreakdown = [
  { name: "Rent", value: 40, color: "var(--color-chart-1)" },
  { name: "Salaries", value: 25, color: "var(--color-chart-4)" },
  { name: "Marketing", value: 15, color: "var(--color-chart-2)" },
  { name: "Utilities", value: 10, color: "var(--color-chart-3)" },
  { name: "Others", value: 10, color: "var(--color-chart-5)" },
]

const outstandingInvoices = [
  { name: "0-30 Days", value: 40, color: "var(--color-chart-2)" },
  { name: "31-60 Days", value: 30, color: "var(--color-chart-3)" },
  { name: "61-90 Days", value: 20, color: "var(--color-chart-1)" },
  { name: "90+ Days", value: 10, color: "var(--color-chart-5)" },
]

const bankAccounts = [
  { name: "Business Current Account", bank: "HDFC Bank", no: "•••• 5678", balance: 425678, status: "Reconciled" },
  { name: "Business Savings Account", bank: "ICICI Bank", no: "•••• 1234", balance: 215432, status: "Reconciled" },
  { name: "Payroll Account", bank: "Axis Bank", no: "•••• 2345", balance: 65320, status: "Pending" },
]

const recentInvoices = [
  { no: "INV-1024", customer: "Acme Corporation", due: "20 May 2025", amount: 75000, status: "Paid" },
  { no: "INV-1023", customer: "Globex Pvt. Ltd.", due: "18 May 2025", amount: 45000, status: "Part Paid" },
  { no: "INV-1022", customer: "Soylent Corp.", due: "15 May 2025", amount: 120000, status: "Overdue" },
  { no: "INV-1021", customer: "Initech", due: "10 May 2025", amount: 60000, status: "Paid" },
]

const quickActions = [
  { icon: FileText, label: "Create Invoice", color: "bg-info-bg text-info-foreground", Dialog: NewInvoiceDialog },
  { icon: Receipt, label: "Record Bill", color: "bg-success-bg text-success-foreground", Dialog: NewBillDialog },
  { icon: Wallet, label: "Receive Payment", color: "bg-purple-bg text-purple-foreground", Dialog: ReceivePaymentDialog },
  { icon: ArrowUpCircle, label: "Create Expense", color: "bg-warning-bg text-warning-foreground", Dialog: NewExpenseClaimDialog },
  { icon: UserPlus, label: "Add Contact", color: "bg-info-bg text-info-foreground", Dialog: NewContactDialog },
]

const recentActivity = [
  { text: "Invoice INV-1024 paid by Acme Corporation", time: "2 min ago" },
  { text: "Bill for ₹45,000 approved by John Doe", time: "15 min ago" },
  { text: "Payment of ₹75,000 received from Globex Pvt. Ltd.", time: "1 hr ago" },
  { text: "Bank statement imported — HDFC Bank", time: "2 hrs ago" },
  { text: "Payroll for May completed", time: "3 hrs ago" },
]

export function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Good morning, John! 👋</h1>
          <p className="text-muted-foreground mt-1 text-sm">Here&apos;s what&apos;s happening with your business today.</p>
        </div>
        <Button variant="outline" className="w-fit">
          01 May &ndash; 31 May 2025
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        <StatCard icon={Wallet} label="Cash Balance" value={inr(1245678)} delta={{ value: "12.5%" }} color="blue" />
        <StatCard icon={Landmark} label="Bank Balance" value={inr(875432)} delta={{ value: "8.2%" }} color="green" />
        <StatCard icon={ArrowDownCircle} label="Accounts Receivable" value={inr(325000)} delta={{ value: "5.4%" }} color="orange" />
        <StatCard icon={ArrowUpCircle} label="Accounts Payable" value={inr(245000)} delta={{ value: "3.6%", positive: false }} color="red" />
        <StatCard icon={TrendingUp} label="Net Profit (MTD)" value={inr(105678)} delta={{ value: "10.3%" }} color="purple" className="col-span-2 sm:col-span-1" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Overview</CardTitle>
              </CardHeader>
              <CardContent className="pb-5">
                <TrendAreaChart
                  data={cashFlowData}
                  xKey="d"
                  height={220}
                  series={[
                    { key: "inflow", color: "var(--color-chart-2)", label: "Inflow" },
                    { key: "outflow", color: "var(--color-chart-5)", label: "Outflow" },
                  ]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
              </CardHeader>
              <CardContent className="pb-5">
                <TrendLineChart
                  data={revenueExpenseData}
                  xKey="m"
                  height={220}
                  series={[
                    { key: "revenue", color: "var(--color-chart-1)", label: "Revenue" },
                    { key: "expenses", color: "var(--color-chart-5)", label: "Expenses" },
                  ]}
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardAction className="text-muted-foreground text-xs">This Month</CardAction>
              </CardHeader>
              <CardContent className="flex items-center gap-5 pb-5">
                <DonutChart data={expenseBreakdown} total={inr(245678)} totalLabel="Total Expenses" size={130} />
                <DonutLegend data={expenseBreakdown} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Outstanding Invoices</CardTitle>
                <CardAction className="text-muted-foreground text-xs">All</CardAction>
              </CardHeader>
              <CardContent className="flex items-center gap-5 pb-5">
                <DonutChart data={outstandingInvoices} total={inr(325000)} totalLabel="Total Outstanding" size={130} />
                <DonutLegend data={outstandingInvoices} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Bank Accounts</CardTitle>
              <a href="/banking/accounts" className="text-primary flex items-center text-sm font-medium">
                View all accounts <ChevronRight className="size-4" />
              </a>
            </CardHeader>
            <CardContent className="overflow-x-auto pb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Account</th>
                    <th className="pb-2 font-medium">Bank</th>
                    <th className="pb-2 font-medium">Balance</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bankAccounts.map((a) => (
                    <tr key={a.name} className="border-b last:border-0">
                      <td className="py-3 font-medium text-foreground">{a.name}</td>
                      <td className="text-muted-foreground py-3">
                        {a.bank} {a.no}
                      </td>
                      <td className="py-3 font-medium text-foreground">{inr(a.balance)}</td>
                      <td className="py-3">
                        <StatusBadge status={a.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Invoices</CardTitle>
              <a href="/sales/invoices" className="text-primary flex items-center text-sm font-medium">
                View all <ChevronRight className="size-4" />
              </a>
            </CardHeader>
            <CardContent className="overflow-x-auto pb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Invoice No.</th>
                    <th className="pb-2 font-medium">Customer</th>
                    <th className="pb-2 font-medium">Due Date</th>
                    <th className="pb-2 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((inv) => (
                    <tr key={inv.no} className="border-b last:border-0">
                      <td className="text-primary py-3 font-medium">{inv.no}</td>
                      <td className="py-3 text-foreground">{inv.customer}</td>
                      <td className="text-muted-foreground py-3">{inv.due}</td>
                      <td className="py-3 font-medium text-foreground">{inr(inv.amount)}</td>
                      <td className="py-3">
                        <StatusBadge status={inv.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-3 pb-5">
              {quickActions.map((a) => (
                <a.Dialog key={a.label}>
                  <DialogTrigger asChild>
                    <button className="hover:bg-muted flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-colors">
                      <div className={`flex size-9 items-center justify-center rounded-lg ${a.color}`}>
                        <a.icon className="size-4" />
                      </div>
                      <span className="text-[11px] leading-tight font-medium text-foreground">{a.label}</span>
                    </button>
                  </DialogTrigger>
                </a.Dialog>
              ))}
              <Link
                to="/banking/reconciliation"
                className="hover:bg-muted flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-colors"
              >
                <div className="bg-success-bg text-success-foreground flex size-9 items-center justify-center rounded-lg">
                  <RefreshCcw className="size-4" />
                </div>
                <span className="text-[11px] leading-tight font-medium text-foreground">Bank Reconcile</span>
              </Link>
              <Link
                to="/reports"
                className="hover:bg-muted flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-colors"
              >
                <div className="bg-muted flex size-9 items-center justify-center rounded-lg text-foreground">
                  <MoreHorizontal className="size-4" />
                </div>
                <span className="text-[11px] leading-tight font-medium text-foreground">More</span>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Activity</CardTitle>
              <a href="/accounting" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="pb-5">
              <ul className="flex flex-col gap-4">
                {recentActivity.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="bg-primary mt-1.5 size-1.5 shrink-0 rounded-full" />
                    <div className="min-w-0">
                      <p className="text-foreground text-sm">{a.text}</p>
                      <p className="text-muted-foreground text-xs">{a.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Cash Flow Forecast</CardTitle>
              <span className="text-muted-foreground text-xs">Next 3 Months</span>
            </CardHeader>
            <CardContent className="pb-5">
              <p className="text-2xl font-bold text-foreground">{inr(645000)}</p>
              <p className="text-muted-foreground mb-2 text-xs">Expected Balance in Aug 2025</p>
              <TrendAreaChart
                data={[
                  { m: "Jun", val: 500000 },
                  { m: "Jul", val: 580000 },
                  { m: "Aug", val: 645000 },
                ]}
                xKey="m"
                height={140}
                series={[{ key: "val", color: "var(--color-chart-2)", label: "Forecast" }]}
              />
              <a href="/reports/cash-flow" className="text-primary mt-2 flex items-center text-sm font-medium">
                View full forecast <ChevronRight className="size-4" />
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 py-4">
              <div className="bg-info-bg text-info-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                <UploadCloud className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">Import bank statement</p>
                <p className="text-muted-foreground text-xs">Sync your transactions instantly</p>
              </div>
              <Button size="icon-sm" variant="ghost">
                <PlusCircle className="size-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
