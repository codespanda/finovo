import { FileText, Landmark, ArrowUpRight, CalendarCheck2, CalendarClock, Building2, FilePlus2, FileSearch, RefreshCcw, Calculator, Truck, CheckCircle2, FileWarning, AlertTriangle } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendAreaChart, DonutChart } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const stats = [
  { icon: FileText, label: "Total GST Liability", value: inr(874560, { decimals: true }), sub: "This FY", link: "View details", color: "green" as const },
  { icon: Landmark, label: "Input Tax Credit (ITC)", value: inr(543210, { decimals: true }), sub: "This FY", link: "View details", color: "blue" as const },
  { icon: ArrowUpRight, label: "Net GST Payable", value: inr(331350, { decimals: true }), sub: "This FY", link: "View details", color: "purple" as const },
  { icon: CalendarCheck2, label: "Returns Filed", value: "9 / 12", sub: "This FY", link: "View returns", color: "orange" as const },
  { icon: CalendarClock, label: "Next Return Due", value: "GSTR-3B", sub: "20 Jun 2025", subClass: "text-danger-foreground font-medium", link: "View schedule", color: "teal" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
}

const trend = [
  { m: "Apr 2025", output: 950000, itc: 620000, net: 330000 },
  { m: "May 2025", output: 890000, itc: 580000, net: 310000 },
  { m: "Jun 2025", output: 920000, itc: 610000, net: 310000 },
  { m: "Jul 2025", output: 960000, itc: 650000, net: 310000 },
  { m: "Aug 2025", output: 900000, itc: 590000, net: 310000 },
  { m: "Sep 2025", output: 940000, itc: 620000, net: 320000 },
  { m: "Oct 2025", output: 980000, itc: 650000, net: 330000 },
  { m: "Nov 2025", output: 960000, itc: 630000, net: 330000 },
  { m: "Dec 2025", output: 990000, itc: 640000, net: 350000 },
  { m: "Jan 2026", output: 1010000, itc: 650000, net: 360000 },
  { m: "Feb 2026", output: 1000000, itc: 645000, net: 355000 },
  { m: "Mar 2026", output: 1150000, itc: 750000, net: 400000 },
]

const filingStatus = [
  { name: "Filed", value: 9, pct: "75%", color: "var(--color-chart-2)" },
  { name: "Pending", value: 2, pct: "16.67%", color: "var(--color-chart-3)" },
  { name: "Overdue", value: 1, pct: "8.33%", color: "var(--color-chart-5)" },
]

const returnSummary = [
  { type: "GSTR-1", desc: "Details of Outward Supplies", freq: "Monthly", due: "11 Jun 2025", status: "Filed", lastFiled: "09 May 2025", action: "View" },
  { type: "GSTR-3B", desc: "Monthly Summary Return", freq: "Monthly", due: "20 Jun 2025", status: "Pending", lastFiled: "20 May 2025", action: "Prepare" },
  { type: "GSTR-4", desc: "Composition Tax Return", freq: "Quarterly", due: "18 Jul 2025", status: "–", lastFiled: "–", action: "–" },
  { type: "GSTR-9", desc: "Annual Return", freq: "Annual", due: "31 Dec 2025", status: "–", lastFiled: "–", action: "–" },
  { type: "GSTR-9C", desc: "Reconciliation Statement", freq: "Annual", due: "31 Dec 2025", status: "–", lastFiled: "–", action: "–" },
]

const taxBreakdown = [
  { name: "CGST", value: 218640, pct: "25%", color: "var(--color-chart-2)" },
  { name: "SGST", value: 218640, pct: "25%", color: "var(--color-chart-1)" },
  { name: "IGST", value: 327960, pct: "37.5%", color: "var(--color-chart-3)" },
  { name: "CESS", value: 109320, pct: "12.5%", color: "var(--color-chart-4)" },
]

const recentActivities = [
  { icon: CheckCircle2, bg: "bg-success-bg text-success-foreground", label: "GSTR-1 for May 2025 filed successfully", sub: "09 May 2025 04:15 PM" },
  { icon: FileText, bg: "bg-info-bg text-info-foreground", label: "GSTR-3B for Apr 2025 filed successfully", sub: "20 May 2025 02:40 PM" },
  { icon: AlertTriangle, bg: "bg-warning-bg text-warning-foreground", label: "GSTR-3B for Mar 2025 is overdue", sub: "Due date was 20 Apr 2025" },
]

const alerts = [
  { icon: CalendarClock, bg: "bg-warning-bg text-warning-foreground", label: "GSTR-3B for May 2025", sub: "Due on 20 Jun 2025", tag: "10 Days Left" },
  { icon: FileWarning, bg: "bg-danger-bg text-danger-foreground", label: "GSTR-1 for Jun 2025", sub: "Due on 11 Jul 2025", tag: "31 Days Left" },
  { icon: Landmark, bg: "bg-purple-bg text-purple-foreground", label: "GSTR-4 for Q1 (Apr-Jun)", sub: "Due on 18 Jul 2025", tag: "38 Days Left" },
]

const quickActions = [
  { icon: FilePlus2, label: "Generate GSTR-3B", sub: "Prepare and file GSTR-3B return" },
  { icon: FileSearch, label: "View GSTR-1", sub: "View and download GSTR-1" },
  { icon: RefreshCcw, label: "Reconcile ITC", sub: "Reconcile input tax credit" },
  { icon: Calculator, label: "GST Rate Finder", sub: "Find applicable GST rates" },
  { icon: Truck, label: "E-Way Bill Portal", sub: "Generate and manage E-Way Bills" },
]

export function GstOverview() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "GST", href: "/tax/gst" }, { label: "Overview" }]}
        title="GST Overview"
        description="Get a quick summary of your GST compliance, returns, and tax liabilities."
        actions={<Button variant="outline">Financial Year 2025-26</Button>}
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <div className="flex flex-col gap-5 xl:col-span-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
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
                <p className={`text-xs ${s.subClass ?? "text-muted-foreground"}`}>{s.sub}</p>
                <a href="/tax/gst" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle>GST Liability Trend</CardTitle>
                <Button variant="outline" size="sm">This Financial Year</Button>
              </CardHeader>
              <CardContent className="pb-5">
                <TrendAreaChart
                  data={trend}
                  xKey="m"
                  series={[
                    { key: "output", color: "var(--color-chart-2)", label: "Output Tax" },
                    { key: "itc", color: "var(--color-chart-1)", label: "Input Tax Credit" },
                    { key: "net", color: "var(--color-chart-4)", label: "Net Payable" },
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Return Filing Status</CardTitle></CardHeader>
              <CardContent className="flex flex-col items-center gap-3 pb-5">
                <DonutChart data={filingStatus} total="12" totalLabel="Total Returns" size={140} />
                <ul className="w-full text-sm">
                  {filingStatus.map((f) => (
                    <li key={f.name} className="flex items-center gap-2 py-0.5">
                      <span className="size-2.5 shrink-0 rounded-full" style={{ background: f.color }} />
                      <span className="text-muted-foreground flex-1 text-xs">{f.name}</span>
                      <span className="text-xs font-medium whitespace-nowrap text-foreground">{f.value} ({f.pct})</span>
                    </li>
                  ))}
                </ul>
                <a href="/tax/gst/returns" className="text-primary self-start text-sm font-medium">View return calendar →</a>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader><CardTitle>Return Summary</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto pb-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Return Type</th>
                      <th className="pb-2 font-medium">Frequency</th>
                      <th className="pb-2 font-medium">Due Date</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Last Filed On</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returnSummary.map((r) => (
                      <tr key={r.type} className="border-b last:border-0">
                        <td className="py-3">
                          <p className="font-medium whitespace-nowrap text-foreground">{r.type}</p>
                          <p className="text-muted-foreground text-xs whitespace-nowrap">{r.desc}</p>
                        </td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.freq}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.due}</td>
                        <td className="py-3">{r.status === "–" ? <span className="text-muted-foreground">–</span> : <StatusBadge status={r.status} />}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.lastFiled}</td>
                        <td className="py-3">
                          {r.action === "–" ? (
                            <span className="text-muted-foreground">–</span>
                          ) : (
                            <Button size="sm" variant={r.action === "View" ? "outline" : "default"}>{r.action}</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <a href="/tax/gst/returns" className="text-primary mt-4 flex items-center gap-1 text-sm font-medium">View all returns →</a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Tax Liability Breakdown <span className="text-muted-foreground text-xs font-normal">(This FY)</span></CardTitle></CardHeader>
              <CardContent className="flex flex-col items-center gap-3 pb-5">
                <DonutChart data={taxBreakdown} total={inr(874560)} totalLabel="Total Liability" size={150} />
                <ul className="w-full text-sm">
                  {taxBreakdown.map((t) => (
                    <li key={t.name} className="flex items-center gap-2 py-0.5">
                      <span className="size-2.5 shrink-0 rounded-full" style={{ background: t.color }} />
                      <span className="text-muted-foreground flex-1 text-xs">{t.name}</span>
                      <span className="text-xs font-medium whitespace-nowrap text-foreground">{inr(t.value)} ({t.pct})</span>
                    </li>
                  ))}
                </ul>
                <a href="/reports/tax-reports" className="text-primary self-start text-sm font-medium">View detailed breakdown →</a>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Recent Activities</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-1 pb-3">
                {recentActivities.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${a.bg}`}>
                      <a.icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{a.label}</p>
                      <p className="text-muted-foreground text-xs">{a.sub}</p>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1">View <ArrowUpRight className="size-3.5" /></Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Important Alerts</CardTitle></CardHeader>
              <CardContent className="flex flex-col gap-1 pb-3">
                {alerts.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${a.bg}`}>
                      <a.icon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{a.label}</p>
                      <p className="text-muted-foreground text-xs">{a.sub}</p>
                    </div>
                    <span className="bg-warning-bg text-warning-foreground rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap">{a.tag}</span>
                  </div>
                ))}
                <a href="/tax/gst" className="text-primary mt-1 text-sm font-medium">View all alerts →</a>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>GSTIN Information</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              <div className="flex items-start gap-3">
                <div className="bg-success-bg text-success-foreground flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <Building2 className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-muted-foreground text-xs">GSTIN</p>
                  <p className="truncate font-mono text-sm font-semibold text-foreground">29AAACC1206D1ZS</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Legal Name</p>
                <p className="text-sm font-medium text-foreground">Demo Consulting Pvt. Ltd.</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Trade Name</p>
                <p className="text-sm font-medium text-foreground">Demo Company</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Constitution of Business</p>
                <p className="text-sm font-medium text-foreground">Private Limited Company</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">State</p>
                <p className="text-sm font-medium text-foreground">Karnataka (29)</p>
              </div>
              <a href="/settings/company-profile" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View GST Profile →</a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-1 pb-3">
              {quickActions.map((a) => (
                <button key={a.label} className="hover:bg-muted -mx-1 flex items-start gap-3 rounded-lg px-1 py-2 text-left transition-colors">
                  <div className="bg-info-bg text-info-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
                    <a.icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{a.label}</p>
                    <p className="text-muted-foreground text-xs">{a.sub}</p>
                  </div>
                </button>
              ))}
              <a href="/tax/gst" className="text-primary mt-1 text-sm font-medium">View all actions →</a>
            </CardContent>
          </Card>

          <Card className="bg-muted/40">
            <CardContent className="flex flex-col items-center gap-2 pt-5 pb-5 text-center">
              <div className="bg-success-bg text-success-foreground flex size-9 items-center justify-center rounded-full">?</div>
              <p className="text-sm font-semibold text-foreground">Need Help?</p>
              <p className="text-muted-foreground text-xs">Learn more about GST compliance and filing.</p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">View User Guide →</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
