import { Lock, ShieldAlert, Landmark, Scale } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DonutChart, DonutLegend } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const assets = [
  { label: "Current Assets", value: 10245860, header: true },
  { label: "Cash and Bank Balances", value: 2048600 },
  { label: "Accounts Receivable", value: 845230 },
  { label: "Inventory", value: 3562300 },
  { label: "Non-Current Assets", value: 4629460, header: true },
  { label: "Property, Plant & Equipment", value: 3275000 },
  { label: "Investments", value: 1235600 },
]

const liabilities = [
  { label: "Current Liabilities", value: 4032180, header: true },
  { label: "Accounts Payable", value: 326140 },
  { label: "Short Term Loans", value: 1280000 },
  { label: "Non-Current Liabilities", value: 1588300, header: true },
  { label: "Long Term Loans", value: 1250000 },
  { label: "Equity", value: 9254840, header: true },
  { label: "Owner's Capital", value: 6000000 },
  { label: "Retained Earnings", value: 3254840 },
]

const ratios = [
  { label: "Current Ratio", value: "2.54", good: true },
  { label: "Debt to Equity Ratio", value: "0.61", good: true },
  { label: "Gross Profit Margin", value: "31.4%", good: true },
  { label: "Net Profit Margin", value: "12.6%", good: true },
]

export function BalanceSheet() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Reports", href: "/reports" }, { label: "Balance Sheet" }]}
        title="Balance Sheet"
        description="Get a snapshot of your company's financial position."
        actions={<Button variant="outline">As on 31 May 2025</Button>}
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Landmark} label="Total Assets" value={inr(14875320)} delta={{ value: "11.6%" }} color="blue" />
        <StatCard icon={ShieldAlert} label="Total Liabilities" value={inr(5620480)} delta={{ value: "8.3%" }} color="orange" />
        <StatCard icon={Scale} label="Total Equity" value={inr(9254840)} delta={{ value: "13.4%" }} color="green" />
        <StatCard icon={Lock} label="Net Worth" value={inr(9254840)} delta={{ value: "13.4%" }} color="purple" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Assets</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-1.5 pb-5 text-sm">
                {assets.map((a) => (
                  <div key={a.label} className={`flex justify-between ${a.header ? "text-primary mt-2 font-semibold" : "text-muted-foreground pl-2"}`}>
                    <span>{a.label}</span>
                    <span className={a.header ? "text-foreground" : ""}>{inr(a.value)}</span>
                  </div>
                ))}
                <div className="mt-2 flex justify-between border-t pt-2 font-semibold text-foreground"><span>Total Assets</span><span>{inr(14875320)}</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Liabilities &amp; Equity</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-1.5 pb-5 text-sm">
                {liabilities.map((a) => (
                  <div key={a.label} className={`flex justify-between ${a.header ? "text-primary mt-2 font-semibold" : "text-muted-foreground pl-2"}`}>
                    <span>{a.label}</span>
                    <span className={a.header ? "text-foreground" : ""}>{inr(a.value)}</span>
                  </div>
                ))}
                <div className="mt-2 flex justify-between border-t pt-2 font-semibold text-foreground"><span>Total Liabilities &amp; Equity</span><span>{inr(14875320)}</span></div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardContent className="text-success-foreground flex items-center gap-2 py-3 text-sm font-medium">
              ✓ Balance Sheet is balanced
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Key Ratios</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {ratios.map((r) => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">{r.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{r.value}</span>
                    <Badge variant="success">Good</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Asset Breakdown</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-4 pb-5">
              <DonutChart
                data={[
                  { name: "Cash & Bank", value: 14, color: "var(--color-chart-2)" },
                  { name: "Receivable", value: 6, color: "var(--color-chart-3)" },
                  { name: "Inventory", value: 24, color: "var(--color-chart-1)" },
                  { name: "PP&E", value: 22, color: "var(--color-chart-4)" },
                  { name: "Others", value: 34, color: "var(--color-chart-5)" },
                ]}
                total={inr(14875320)}
                totalLabel="Total Assets"
                size={140}
              />
              <DonutLegend
                data={[
                  { name: "Cash & Bank", value: 14, color: "var(--color-chart-2)" },
                  { name: "Receivable", value: 6, color: "var(--color-chart-3)" },
                  { name: "Inventory", value: 24, color: "var(--color-chart-1)" },
                  { name: "PP&E", value: 22, color: "var(--color-chart-4)" },
                  { name: "Others", value: 34, color: "var(--color-chart-5)" },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
