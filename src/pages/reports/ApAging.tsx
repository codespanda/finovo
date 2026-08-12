import { useState } from "react"
import { FileText, CalendarClock, Hourglass, Timer, ShieldAlert, AlertTriangle, Search, SlidersHorizontal, ChevronDown, ChevronRight, List, LayoutGrid, Printer } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DonutChart } from "@/components/shared/charts"
import { inr } from "@/lib/format"
import { cn } from "@/lib/utils"

const stats = [
  { icon: FileText, label: "Total Payables", value: inr(8645780, { decimals: true }), sub: "Across 156 bills", color: "green" as const },
  { icon: CalendarClock, label: "Not Yet Due", value: inr(2135680, { decimals: true }), sub: "24.68%", color: "blue" as const },
  { icon: Hourglass, label: "0 - 30 Days", value: inr(1845320, { decimals: true }), sub: "21.33%", color: "orange" as const },
  { icon: Timer, label: "31 - 60 Days", value: inr(1520450, { decimals: true }), sub: "17.59%", color: "purple" as const },
  { icon: ShieldAlert, label: "61 - 90 Days", value: inr(1125640, { decimals: true }), sub: "13.01%", color: "info" as const },
  { icon: AlertTriangle, label: "90+ Days", value: inr(2018690, { decimals: true }), sub: "23.39%", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  info: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const summaryRow = { notDue: 2135680, d30: 1845320, d60: 1520450, d90: 1125640, over: 2018690, total: 8645780 }
const summaryPct = { notDue: 24.68, d30: 21.33, d60: 17.59, d90: 13.01, over: 23.39 }

const vendors = [
  { name: "Alpha Supplies Pvt. Ltd.", ref: "INV-045", bills: 6, total: 1256320, notDue: 325000, d30: 285450, d60: 210000, d90: 125000, over: 310870, initial: "A", bg: "bg-danger-bg text-danger-foreground" },
  { name: "Global Traders", ref: "INV-078", bills: 8, total: 985450, notDue: 235000, d30: 210250, d60: 185000, d90: 110000, over: 245200, initial: "G", bg: "bg-info-bg text-info-foreground" },
  { name: "Tech World Solutions", ref: "INV-034", bills: 5, total: 875200, notDue: 180000, d30: 195000, d60: 140000, d90: 80000, over: 280200, initial: "T", bg: "bg-purple-bg text-purple-foreground" },
  { name: "Office Needs Co.", ref: "INV-067", bills: 7, total: 720150, notDue: 165000, d30: 125000, d60: 110000, d90: 75000, over: 245150, initial: "O", bg: "bg-info-bg text-info-foreground" },
  { name: "Bright Marketing LLP", ref: "INV-055", bills: 4, total: 645700, notDue: 145000, d30: 120000, d60: 90000, d90: 60000, over: 230700, initial: "B", bg: "bg-info-bg text-info-foreground" },
  { name: "Green Energy Pvt. Ltd.", ref: "INV-091", bills: 6, total: 595800, notDue: 110000, d30: 105000, d60: 95000, d90: 65000, over: 220800, initial: "G", bg: "bg-success-bg text-success-foreground" },
  { name: "Prime Distributors", ref: "INV-063", bills: 6, total: 485160, notDue: 90000, d30: 80000, d60: 70000, d90: 50000, over: 195160, initial: "P", bg: "bg-info-bg text-info-foreground" },
  { name: "Other Vendors", ref: "22 bills", bills: 22, total: 3082000, notDue: 745680, d30: 695620, d60: 560450, d90: 390640, over: 689610, initial: "O", bg: "bg-muted text-foreground" },
]

const chartData = [
  { name: "Not Yet Due", value: 24.68, color: "var(--color-chart-2)" },
  { name: "0 - 30 Days", value: 21.33, color: "var(--color-chart-3)" },
  { name: "31 - 60 Days", value: 17.59, color: "var(--color-chart-4)" },
  { name: "61 - 90 Days", value: 13.01, color: "var(--color-chart-1)" },
  { name: "90+ Days", value: 23.39, color: "var(--color-chart-5)" },
]

const chartAmounts: Record<string, number> = { "Not Yet Due": 2135680, "0 - 30 Days": 1845320, "31 - 60 Days": 1520450, "61 - 90 Days": 1125640, "90+ Days": 2018690 }

const overdueVendors = [
  { name: "Alpha Supplies Pvt. Ltd.", amount: 310870 },
  { name: "Tech World Solutions", amount: 280200 },
  { name: "Global Traders", amount: 245200 },
  { name: "Office Needs Co.", amount: 245150 },
  { name: "Green Energy Pvt. Ltd.", amount: 220800 },
]

const quickActions = ["Pay Bills", "Schedule Payments", "Vendor Statement", "Export Aging Report", "Configure Aging Periods"]

export function ApAging() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Reports", href: "/reports" }, { label: "AP Aging" }]}
        title="AP Aging"
        description="View your outstanding payables grouped by aging periods."
        actions={
          <>
            <Button variant="outline">As of 31 May 2025</Button>
            <Button variant="outline">Export <ChevronDown className="size-3.5" /></Button>
            <Button><Printer className="size-4" /> Print / Share <ChevronDown className="size-3.5" /></Button>
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
            <p className="text-muted-foreground text-xs">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <Card>
            <CardHeader><CardTitle>Aging Summary</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium"></th>
                      <th className="pb-2 text-right font-medium">Not Yet Due</th>
                      <th className="pb-2 text-right font-medium">0 - 30 Days</th>
                      <th className="pb-2 text-right font-medium">31 - 60 Days</th>
                      <th className="pb-2 text-right font-medium">61 - 90 Days</th>
                      <th className="pb-2 text-right font-medium">90+ Days</th>
                      <th className="pb-2 text-right font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="text-muted-foreground py-2.5 font-medium">Amount (₹)</td>
                      <td className="py-2.5 text-right text-foreground">{inr(summaryRow.notDue, { decimals: true })}</td>
                      <td className="py-2.5 text-right text-foreground">{inr(summaryRow.d30, { decimals: true })}</td>
                      <td className="py-2.5 text-right text-foreground">{inr(summaryRow.d60, { decimals: true })}</td>
                      <td className="py-2.5 text-right text-foreground">{inr(summaryRow.d90, { decimals: true })}</td>
                      <td className="py-2.5 text-right text-foreground">{inr(summaryRow.over, { decimals: true })}</td>
                      <td className="py-2.5 text-right font-semibold text-foreground">{inr(summaryRow.total, { decimals: true })}</td>
                    </tr>
                    <tr>
                      <td className="text-muted-foreground py-2.5 font-medium">% of Total</td>
                      <td className="text-muted-foreground py-2.5 text-right">{summaryPct.notDue}%</td>
                      <td className="text-muted-foreground py-2.5 text-right">{summaryPct.d30}%</td>
                      <td className="text-muted-foreground py-2.5 text-right">{summaryPct.d60}%</td>
                      <td className="text-muted-foreground py-2.5 text-right">{summaryPct.d90}%</td>
                      <td className="text-muted-foreground py-2.5 text-right">{summaryPct.over}%</td>
                      <td className="py-2.5 text-right font-semibold text-foreground">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full">
                <div className="bg-chart-2 h-full" style={{ width: `${summaryPct.notDue}%`, background: "var(--color-chart-2)" }} />
                <div className="h-full" style={{ width: `${summaryPct.d30}%`, background: "var(--color-chart-3)" }} />
                <div className="h-full" style={{ width: `${summaryPct.d60}%`, background: "var(--color-chart-4)" }} />
                <div className="h-full" style={{ width: `${summaryPct.d90}%`, background: "var(--color-chart-1)" }} />
                <div className="h-full" style={{ width: `${summaryPct.over}%`, background: "var(--color-chart-5)" }} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search by vendor name or bill no..." className="pl-9" />
                </div>
                <div className="flex gap-2 sm:ml-auto">
                  <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                  <Button variant="outline">All Vendors <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">Grouped by: Vendor <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline" size="icon"><List className="size-4" /></Button>
                  <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="w-6 pb-2"></th>
                      <th className="pb-2 font-medium">Vendor</th>
                      <th className="pb-2 text-right font-medium">Total Payables (₹)</th>
                      <th className="pb-2 text-right font-medium">Not Yet Due</th>
                      <th className="pb-2 text-right font-medium">0 - 30 Days</th>
                      <th className="pb-2 text-right font-medium">31 - 60 Days</th>
                      <th className="pb-2 text-right font-medium">90+ Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((v) => (
                      <tr
                        key={v.name}
                        className="hover:bg-muted/40 cursor-pointer border-b last:border-0"
                        onClick={() => setExpanded((s) => ({ ...s, [v.name]: !s[v.name] }))}
                      >
                        <td className="py-3">
                          <ChevronRight className={cn("text-muted-foreground size-4 transition-transform", expanded[v.name] && "rotate-90")} />
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${v.bg}`}>{v.initial}</div>
                            <div>
                              <p className="font-medium whitespace-nowrap text-foreground">{v.name}</p>
                              <p className="text-muted-foreground text-xs">{v.ref}, {v.bills} bills</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-right font-medium whitespace-nowrap text-foreground">{inr(v.total, { decimals: true })}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(v.notDue, { decimals: true })}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(v.d30, { decimals: true })}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(v.d60, { decimals: true })}</td>
                        <td className="text-destructive py-3 text-right font-medium whitespace-nowrap">{inr(v.over, { decimals: true })}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-muted/40 font-semibold">
                      <td className="py-3"></td>
                      <td className="py-3 text-foreground">Total</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(summaryRow.total, { decimals: true })}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(summaryRow.notDue, { decimals: true })}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(summaryRow.d30, { decimals: true })}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(summaryRow.d60, { decimals: true })}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(summaryRow.d90, { decimals: true })}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 text-sm">Showing 1 to 8 of 8 vendors</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Payables Aging Chart</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={chartData} total={inr(8645780)} totalLabel="Total Payables" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {chartData.map((c) => (
                  <li key={c.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className="text-muted-foreground truncate">{c.name}</span>
                    <span className="ml-auto font-medium whitespace-nowrap text-foreground">{inr(chartAmounts[c.name])}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Top 5 Overdue Vendors (90+ Days)</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {overdueVendors.map((v) => (
                <div key={v.name} className="flex items-center justify-between">
                  <span className="text-foreground text-sm">{v.name}</span>
                  <span className="text-destructive text-sm font-semibold whitespace-nowrap">{inr(v.amount, { decimals: true })}</span>
                </div>
              ))}
              <a href="/purchases/payments" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View all overdue vendors →</a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col pb-3">
              {quickActions.map((a) => (
                <button key={a} className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2.5 text-left text-sm font-medium text-foreground transition-colors">
                  {a}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
