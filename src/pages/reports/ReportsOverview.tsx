import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { TrendingUp, TrendingDown, Wallet, ArrowDownCircle, ArrowUpCircle, ChevronRight } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendLineChart, DonutChart } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const plTrend = [
  { m: "Jan", income: 1550000, expenses: 1200000 },
  { m: "Feb", income: 1680000, expenses: 1250000 },
  { m: "Mar", income: 1720000, expenses: 1300000 },
  { m: "Apr", income: 1810000, expenses: 1320000 },
  { m: "May", income: 1875300, expenses: 1286750 },
]

const reports = [
  { title: "Profit & Loss Statement", desc: "View your income and expenses", href: "/reports/profit-loss", group: "financial" },
  { title: "Balance Sheet", desc: "View your assets and liabilities", href: "/reports/balance-sheet", group: "financial" },
  { title: "Cash Flow Statement", desc: "Track cash inflows and outflows", href: "/reports/cash-flow", group: "financial" },
  { title: "AR Aging", desc: "Track overdue receivables", href: "/reports/ar-aging", group: "sales" },
  { title: "AP Aging", desc: "Track outstanding payables", href: "/reports/ap-aging", group: "purchase" },
  { title: "Tax Reports", desc: "GST, TDS and other taxes", href: "/reports/tax-reports", group: "tax" },
]

export function ReportsOverview() {
  const [tab, setTab] = useState("financial")

  const filtered = useMemo(() => reports.filter((r) => r.group === tab), [tab])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Reports" }, { label: "Overview" }]}
        title="Reports Overview"
        description="Get insights into your business performance with powerful financial reports."
        actions={<Button variant="outline">01 May &ndash; 31 May 2025</Button>}
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={TrendingUp} label="Total Revenue" value={inr(2435678)} delta={{ value: "12.4%" }} color="blue" />
        <StatCard icon={TrendingDown} label="Total Expenses" value={inr(987450)} delta={{ value: "8.6%" }} color="orange" />
        <StatCard icon={Wallet} label="Net Profit" value={inr(1448228)} delta={{ value: "15.8%" }} color="purple" />
        <StatCard icon={ArrowDownCircle} label="Receivables" value={inr(1245300)} delta={{ value: "5.3%", positive: false }} color="green" />
        <StatCard icon={ArrowUpCircle} label="Payables" value={inr(785600)} delta={{ value: "3.1%", positive: false }} color="red" className="col-span-2 lg:col-span-1" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Profit &amp; Loss</CardTitle></CardHeader>
          <CardContent className="pb-5">
            <TrendLineChart
              data={plTrend}
              xKey="m"
              series={[
                { key: "income", color: "var(--color-chart-2)", label: "Income" },
                { key: "expenses", color: "var(--color-chart-5)", label: "Expenses" },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Balance Sheet</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center gap-2 pb-5">
            <DonutChart
              data={[
                { name: "Assets", value: 58, color: "var(--color-chart-1)" },
                { name: "Liabilities", value: 26, color: "var(--color-chart-5)" },
                { name: "Equity", value: 16, color: "var(--color-chart-4)" },
              ]}
              total={inr(4567890)}
              totalLabel="Total Assets"
              size={140}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-5">
        <CardContent className="pt-5">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="financial">Financial Reports</TabsTrigger>
              <TabsTrigger value="sales">Sales Reports</TabsTrigger>
              <TabsTrigger value="purchase">Purchase Reports</TabsTrigger>
              <TabsTrigger value="tax">Tax Reports</TabsTrigger>
              <TabsTrigger value="custom">Custom Reports</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <Link
                key={r.title}
                to={r.href}
                className="hover:bg-muted flex items-center justify-between rounded-lg border p-4 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground">{r.title}</p>
                  <p className="text-muted-foreground text-sm">{r.desc}</p>
                </div>
                <ChevronRight className="text-muted-foreground size-4 shrink-0" />
              </Link>
            ))}
            {filtered.length === 0 && (
              <p className="text-muted-foreground col-span-full py-6 text-center text-sm">No reports in this category yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
