import { ArrowDownCircle, ArrowUpCircle, TrendingUp, Landmark, Wallet } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ComparisonBarChart, DonutChart } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const trend = [
  { m: "Jan", inflow: 1580000, outflow: 1120000 },
  { m: "Feb", inflow: 1720000, outflow: 1340000 },
  { m: "Mar", inflow: 1690000, outflow: 1280000 },
  { m: "Apr", inflow: 1810000, outflow: 1350000 },
  { m: "May", inflow: 2048600, outflow: 1432200 },
]

const inflowSources = [
  { label: "Customer Receipts", value: 1542300 },
  { label: "Loans Received", value: 320000 },
  { label: "Other Income", value: 186300 },
]

const outflowSources = [
  { label: "Purchases", value: 560000 },
  { label: "Operating Expenses", value: 345500 },
  { label: "Payroll", value: 240000 },
  { label: "Loan Repayments", value: 180000 },
  { label: "Tax Payments", value: 106700 },
]

export function CashFlow() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Reports", href: "/reports" }, { label: "Cash Flow" }]}
        title="Cash Flow"
        description="Track your cash inflows and outflows in real time."
        actions={<Button variant="outline">01 Apr &ndash; 31 May 2025</Button>}
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={ArrowDownCircle} label="Cash Inflow" value={inr(2048600)} delta={{ value: "15.3%" }} color="green" />
        <StatCard icon={ArrowUpCircle} label="Cash Outflow" value={inr(1432200)} delta={{ value: "9.8%", positive: false }} color="red" />
        <StatCard icon={TrendingUp} label="Net Cash Flow" value={inr(616400)} delta={{ value: "25.7%" }} color="purple" />
        <StatCard icon={Landmark} label="Opening Balance" value={inr(984500)} color="blue" />
        <StatCard icon={Wallet} label="Closing Balance" value={inr(1600900)} color="green" className="col-span-2 lg:col-span-1" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Cash Flow Trend</CardTitle></CardHeader>
          <CardContent className="pb-5">
            <ComparisonBarChart
              data={trend}
              xKey="m"
              series={[
                { key: "inflow", color: "var(--color-chart-2)", label: "Cash Inflow" },
                { key: "outflow", color: "var(--color-chart-5)", label: "Cash Outflow" },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Inflow vs Outflow</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center gap-2 pb-5">
            <DonutChart
              data={[
                { name: "Inflow", value: 59, color: "var(--color-chart-2)" },
                { name: "Outflow", value: 41, color: "var(--color-chart-5)" },
              ]}
              total={inr(616400)}
              totalLabel="Net Cash Flow"
              size={140}
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Cash Inflow</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-2 pb-5 text-sm">
            {inflowSources.map((s) => (
              <div key={s.label} className="flex justify-between"><span className="text-muted-foreground">{s.label}</span><span className="text-foreground">{inr(s.value)}</span></div>
            ))}
            <div className="mt-1 flex justify-between border-t pt-2 font-semibold text-foreground"><span>Total Inflow</span><span>{inr(2048600)}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Cash Outflow</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-2 pb-5 text-sm">
            {outflowSources.map((s) => (
              <div key={s.label} className="flex justify-between"><span className="text-muted-foreground">{s.label}</span><span className="text-foreground">{inr(s.value)}</span></div>
            ))}
            <div className="mt-1 flex justify-between border-t pt-2 font-semibold text-foreground"><span>Total Outflow</span><span>{inr(1432200)}</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
