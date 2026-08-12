import { TrendingUp, TrendingDown, PiggyBank, Wallet, Percent } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ComparisonBarChart } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const trend = [
  { m: "Jan", income: 1656200, expenses: 1332100 },
  { m: "Feb", income: 1710500, expenses: 1345800 },
  { m: "Mar", income: 1760300, expenses: 1358600 },
  { m: "Apr", income: 1681200, expenses: 1372500 },
  { m: "May", income: 1875300, expenses: 1286750 },
]

const income = [
  { label: "Sales Income", value: 1745300 },
  { label: "Other Income", value: 130000 },
]

const expenses = [
  { label: "Cost of Goods Sold", value: 735400 },
  { label: "Operating Expenses", value: 369850 },
  { label: "Employee Expenses", value: 123500 },
  { label: "Other Expenses", value: 57000 },
]

export function ProfitLoss() {
  const totalIncome = income.reduce((s, i) => s + i.value, 0)
  const totalExpenses = expenses.reduce((s, i) => s + i.value, 0)

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Reports", href: "/reports" }, { label: "Profit & Loss" }]}
        title="Profit & Loss Statement"
        description="Track your income and expenses to see how your business is performing."
        actions={<Button variant="outline">01 Apr &ndash; 31 May 2025</Button>}
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={TrendingUp} label="Total Income" value={inr(totalIncome)} delta={{ value: "12.1%" }} color="green" />
        <StatCard icon={TrendingDown} label="Total Expenses" value={inr(totalExpenses)} delta={{ value: "8.6%", positive: false }} color="orange" />
        <StatCard icon={PiggyBank} label="Gross Profit" value={inr(totalIncome - expenses[0].value)} delta={{ value: "24.7%" }} color="purple" />
        <StatCard icon={Wallet} label="Net Profit" value={inr(totalIncome - totalExpenses)} delta={{ value: "24.7%" }} color="blue" />
        <StatCard icon={Percent} label="Net Profit Margin" value={`${(((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)}%`} color="green" className="col-span-2 lg:col-span-1" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Income vs Expenses</CardTitle></CardHeader>
          <CardContent className="pb-5">
            <ComparisonBarChart
              data={trend}
              xKey="m"
              series={[
                { key: "income", color: "var(--color-chart-2)", label: "Income" },
                { key: "expenses", color: "var(--color-chart-5)", label: "Expenses" },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>P&amp;L Summary</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3 pb-5 text-sm">
            <p className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">Income</p>
            {income.map((i) => (
              <div key={i.label} className="flex justify-between"><span className="text-muted-foreground">{i.label}</span><span className="text-foreground">{inr(i.value)}</span></div>
            ))}
            <div className="flex justify-between border-t pt-2 font-semibold text-foreground"><span>Total Income</span><span>{inr(totalIncome)}</span></div>

            <p className="mt-3 text-muted-foreground text-xs font-semibold tracking-wide uppercase">Expenses</p>
            {expenses.map((e) => (
              <div key={e.label} className="flex justify-between"><span className="text-muted-foreground">{e.label}</span><span className="text-foreground">{inr(e.value)}</span></div>
            ))}
            <div className="flex justify-between border-t pt-2 font-semibold text-foreground"><span>Total Expenses</span><span>{inr(totalExpenses)}</span></div>

            <div className="bg-success-bg text-success-foreground mt-2 flex justify-between rounded-md px-3 py-2 font-semibold">
              <span>Net Profit</span><span>{inr(totalIncome - totalExpenses)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
