import { Wallet, FileText, Receipt, Users, Landmark, AlertTriangle, Search, Filter, Download } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TrendLineChart, ComparisonBarChart, DonutChart, DonutLegend } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const stats = [
  { icon: Wallet, label: "Total Sales", value: inr(1875300), delta: "16.3%", color: "green" as const },
  { icon: FileText, label: "Total Invoices", value: "128", delta: "8.6%", color: "blue" as const },
  { icon: Receipt, label: "Average Order Value", value: inr(14650), delta: "12.1%", color: "purple" as const },
  { icon: Users, label: "Total Customers", value: "86", delta: "10.3%", color: "orange" as const },
  { icon: Landmark, label: "Collection Received", value: inr(1680200), delta: "18.7%", color: "green" as const },
  { icon: AlertTriangle, label: "Outstanding Amount", value: inr(195100), delta: "4.2%", positive: false, color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const trend = [
  { d: "01 May", thisPeriod: 210000, lastPeriod: 180000 },
  { d: "06 May", thisPeriod: 380000, lastPeriod: 260000 },
  { d: "11 May", thisPeriod: 300000, lastPeriod: 240000 },
  { d: "16 May", thisPeriod: 420000, lastPeriod: 220000 },
  { d: "21 May", thisPeriod: 140000, lastPeriod: 300000 },
  { d: "26 May", thisPeriod: 340000, lastPeriod: 250000 },
  { d: "31 May", thisPeriod: 460000, lastPeriod: 320000 },
]

const salesByCategory = [
  { name: "Laptops", value: 38.7, color: "var(--color-chart-1)" },
  { name: "IT Services", value: 22.4, color: "var(--color-chart-2)" },
  { name: "Accessories", value: 16.8, color: "var(--color-chart-3)" },
  { name: "Software", value: 13.1, color: "var(--color-chart-4)" },
  { name: "Other", value: 9.0, color: "var(--color-muted-foreground)" },
]

const invoices = [
  { no: "INV-2025-0128", date: "31 May 2025", customer: "ABC Solutions", amount: 65000, tax: 11700, total: 76700, status: "Paid" },
  { no: "INV-2025-0127", date: "30 May 2025", customer: "TechCorp Ltd.", amount: 125000, tax: 22500, total: 147500, status: "Paid" },
  { no: "INV-2025-0126", date: "29 May 2025", customer: "Global Enterprises", amount: 50000, tax: 9000, total: 59000, status: "Partially Paid" },
  { no: "INV-2025-0125", date: "28 May 2025", customer: "Infotech Pvt. Ltd.", amount: 98500, tax: 17730, total: 116230, status: "Paid" },
  { no: "INV-2025-0124", date: "27 May 2025", customer: "NextGen Systems", amount: 115600, tax: 20808, total: 136408, status: "Unpaid" },
]

const monthly = [
  { m: "Apr", thisYear: 1450000, lastYear: 1180000 },
  { m: "May", thisYear: 1875300, lastYear: 1320000 },
  { m: "Jun", thisYear: 1420000, lastYear: 1150000 },
  { m: "Jul", thisYear: 1480000, lastYear: 1240000 },
  { m: "Aug", thisYear: 1560000, lastYear: 1280000 },
  { m: "Sep", thisYear: 1750000, lastYear: 1350000 },
  { m: "Oct", thisYear: 1400000, lastYear: 1180000 },
  { m: "Nov", thisYear: 1620000, lastYear: 1300000 },
  { m: "Dec", thisYear: 1500000, lastYear: 1260000 },
  { m: "Jan", thisYear: 1580000, lastYear: 1290000 },
  { m: "Feb", thisYear: 1700000, lastYear: 1420000 },
  { m: "Mar", thisYear: 1830000, lastYear: 1500000 },
]

const summary = [
  { label: "Total Sales", value: 1875300 },
  { label: "Total Cost of Goods Sold", value: 965200 },
  { label: "Gross Profit", value: 910100 },
  { label: "Gross Profit Margin", value: null, text: "48.53%" },
  { label: "Total Discounts", value: 120500 },
  { label: "Total Tax", value: 284600 },
  { label: "Total Refunds", value: 25300 },
]

const byCustomer = [
  { name: "ABC Solutions", amount: 325000, pct: 17.3 },
  { name: "TechCorp Ltd.", amount: 275000, pct: 14.7 },
  { name: "Global Enterprises", amount: 250000, pct: 13.3 },
  { name: "Infotech Pvt. Ltd.", amount: 198500, pct: 10.6 },
  { name: "NextGen Systems", amount: 180000, pct: 9.6 },
]

const topItems = [
  { name: "Dell Inspiron 15 Laptop", units: 56, amount: 525000, emoji: "💻" },
  { name: "HP Pavilion 14 Laptop", units: 38, amount: 380000, emoji: "💻" },
  { name: "Laptop Repair Service", units: 25, amount: 125000, emoji: "🛠️" },
  { name: "Microsoft Office 365", units: 22, amount: 110000, emoji: "🪟" },
  { name: "Logitech Wireless Mouse", units: 18, amount: 72000, emoji: "🖱️" },
]

export function SalesReports() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Reports", href: "/reports" }, { label: "Sales Reports" }]}
        title="Sales Report"
        description="Analyze your sales performance and trends."
        actions={
          <>
            <Button variant="outline">01 May 2025 - 31 May 2025</Button>
            <Button variant="outline">Compare: 01 Apr 2025 - 30 Apr 2025</Button>
            <Button variant="outline"><Filter className="size-4" /> Filters</Button>
            <Button variant="outline"><Download className="size-4" /> Export Report</Button>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => (
          <Card key={s.label} className="gap-2 p-4">
            <div className="flex items-center gap-3">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${colorMap[s.color]}`}>
                <s.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-muted-foreground truncate text-xs font-medium">{s.label}</p>
                <p className="truncate text-lg font-bold text-foreground">{s.value}</p>
              </div>
            </div>
            <p className={`text-xs font-medium ${s.positive === false ? "text-destructive" : "text-success-foreground"}`}>
              {s.positive === false ? "↓" : "↑"} {s.delta} from 01 Apr - 30 Apr
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            <Card className="lg:col-span-3">
              <CardHeader><CardTitle>Sales Trend</CardTitle></CardHeader>
              <CardContent className="pb-5">
                <TrendLineChart
                  data={trend}
                  xKey="d"
                  series={[
                    { key: "thisPeriod", color: "var(--color-chart-1)", label: "This Period (01 May - 31 May 2025)" },
                    { key: "lastPeriod", color: "var(--color-muted-foreground)", label: "Last Period (01 Apr - 30 Apr 2025)" },
                  ]}
                />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Sales by Category</CardTitle></CardHeader>
              <CardContent className="flex flex-col items-center gap-4 pb-5">
                <DonutChart data={salesByCategory} total={inr(1875300)} totalLabel="Total Sales" size={150} />
                <DonutLegend data={salesByCategory} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle>Sales by Invoice</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search invoice..." className="pl-9" />
                </div>
                <div className="flex gap-2 sm:ml-auto">
                  <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                  <Button variant="outline"><Download className="size-4" /> Export</Button>
                </div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Invoice No.</th>
                    <th className="pb-2 font-medium">Invoice Date</th>
                    <th className="pb-2 font-medium">Customer</th>
                    <th className="pb-2 text-right font-medium">Amount</th>
                    <th className="pb-2 text-right font-medium">Tax</th>
                    <th className="pb-2 text-right font-medium">Total Amount</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.no} className="border-b last:border-0">
                      <td className="text-primary py-3 font-medium whitespace-nowrap">{inv.no}</td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{inv.date}</td>
                      <td className="py-3 text-foreground">{inv.customer}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(inv.amount, { decimals: true })}</td>
                      <td className="text-muted-foreground py-3 text-right whitespace-nowrap">{inr(inv.tax, { decimals: true })}</td>
                      <td className="py-3 text-right font-medium whitespace-nowrap text-foreground">{inr(inv.total, { decimals: true })}</td>
                      <td className="py-3"><StatusBadge status={inv.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 5 of 128 results</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Sales Summary by Month</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <ComparisonBarChart
                data={monthly}
                xKey="m"
                series={[
                  { key: "thisYear", color: "var(--color-chart-1)", label: "This Financial Year (FY 2024-25)" },
                  { key: "lastYear", color: "var(--color-chart-1-light, #93c5fd)", label: "Last Financial Year (FY 2023-24)" },
                ]}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Sales Summary</CardTitle>
              <span className="text-muted-foreground text-xs">This Period</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              {summary.map((s) => (
                <div key={s.label} className="flex justify-between">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium text-foreground">{s.text ?? inr(s.value!)}</span>
                </div>
              ))}
              <div className="mt-1 flex justify-between border-t pt-2 font-semibold text-foreground">
                <span>Net Sales</span><span className="text-primary">{inr(1875300)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Sales by Customer</CardTitle>
              <a href="/sales/customers" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {byCustomer.map((c) => (
                <div key={c.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-foreground">{c.name}</span>
                    <span className="text-muted-foreground">{inr(c.amount)} ({c.pct}%)</span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Top Selling Items</CardTitle>
              <a href="/sales/products" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {topItems.map((it) => (
                <div key={it.name} className="flex items-center gap-3">
                  <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg text-base">{it.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{it.name}</p>
                    <p className="text-muted-foreground text-xs">{it.units} Units</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{inr(it.amount)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
