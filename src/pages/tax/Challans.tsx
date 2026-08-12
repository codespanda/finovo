import { FileText, CheckCircle2, Clock, CalendarDays, CheckCircle, Search, ChevronDown, Filter, Calendar, Upload, Download } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewChallanDialog } from "@/components/shared/TaxDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: FileText, label: "Total Challans Deposited", value: inr(1801250), sub: "This Financial Year", link: "View summary", color: "green" as const },
  { icon: CheckCircle, label: "Mapped Challans", value: inr(1562450), sub: "86.72% of total", link: "View mapping", color: "blue" as const },
  { icon: Clock, label: "Unmapped Challans", value: inr(238800), sub: "13.28% of total", link: "Map now", color: "orange" as const },
  { icon: CalendarDays, label: "Challans This Month", value: inr(275500), sub: "May 2025", link: "View details", color: "purple" as const },
  { icon: CheckCircle2, label: "Refundable Amount", value: inr(25150), sub: "As on today", link: "View refunds", color: "green" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const challans = [
  { bsr: "0510025", serial: "0510025202505001", date: "07 May 2025", qtr: "Q1", fy: "FY 2025-26", type: "Book Adjustment", amount: 185500, status: "Mapped", mapped: 185500 },
  { bsr: "0510025", serial: "0510025202505032", date: "15 May 2025", qtr: "Q1", fy: "FY 2025-26", type: "Normal Payment", amount: 245000, status: "Mapped", mapped: 245000 },
  { bsr: "0510025", serial: "0510025202505067", date: "22 May 2025", qtr: "Q1", fy: "FY 2025-26", type: "Normal Payment", amount: 110000, status: "Partially Mapped", mapped: 95000 },
  { bsr: "0510025", serial: "0510025202505098", date: "30 May 2025", qtr: "Q1", fy: "FY 2025-26", type: "Book Adjustment", amount: 85000, status: "Unmapped", mapped: 0 },
  { bsr: "0510025", serial: "0510025202506009", date: "05 Jun 2025", qtr: "Q1", fy: "FY 2025-26", type: "Normal Payment", amount: 160000, status: "Mapped", mapped: 160000 },
  { bsr: "0510025", serial: "0510025202506033", date: "15 Jun 2025", qtr: "Q2", fy: "FY 2025-26", type: "Normal Payment", amount: 220000, status: "Unmapped", mapped: 0 },
  { bsr: "0510025", serial: "0510025202506077", date: "25 Jun 2025", qtr: "Q2", fy: "FY 2025-26", type: "Book Adjustment", amount: 75000, status: "Mapped", mapped: 75000 },
  { bsr: "0510025", serial: "0510025202507003", date: "07 Jul 2025", qtr: "Q2", fy: "FY 2025-26", type: "Normal Payment", amount: 150000, status: "Unmapped", mapped: 0 },
  { bsr: "0510025", serial: "0510025202507034", date: "15 Jul 2025", qtr: "Q2", fy: "FY 2025-26", type: "Normal Payment", amount: 135750, status: "Partially Mapped", mapped: 100000 },
  { bsr: "0510025", serial: "0510025202507068", date: "22 Jul 2025", qtr: "Q2", fy: "FY 2025-26", type: "Normal Payment", amount: 195000, status: "Mapped", mapped: 195000 },
]

const summary = [
  { name: "Mapped", value: 1562450, pct: 86.72, color: "var(--color-chart-2)" },
  { name: "Partially Mapped", value: 100000, pct: 5.55, color: "var(--color-chart-3)" },
  { name: "Unmapped", value: 238800, pct: 13.28, color: "var(--color-chart-5)" },
]

const statusCount = [
  { name: "Mapped", value: 24, pct: 52.17, color: "var(--color-chart-2)" },
  { name: "Partially Mapped", value: 5, pct: 10.87, color: "var(--color-chart-3)" },
  { name: "Unmapped", value: 17, pct: 36.96, color: "var(--color-chart-5)" },
]

const recentChallans = [
  { date: "22 MAY", serial: "0510025202505067", amount: 110000, status: "Partially Mapped" },
  { date: "15 MAY", serial: "0510025202505032", amount: 245000, status: "Mapped" },
  { date: "07 MAY", serial: "0510025202505001", amount: 185500, status: "Mapped" },
]

const statusTextColor: Record<string, string> = {
  Mapped: "text-success-foreground",
  "Partially Mapped": "text-warning-foreground",
  Unmapped: "text-danger-foreground",
}

const quickActions = ["Import Challans", "Challan Mapping", "Download Challan Statement", "Unmapped Challans Report", "Challan Reconciliation Report"]

function n(value: number) {
  return new Intl.NumberFormat("en-IN").format(value)
}

export function Challans() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "Challans" }]}
        title="Challans"
        description="View, manage and reconcile your TDS challans."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import Challans</Button>
            <Button variant="outline"><Download className="size-4" /> Download Challan Statement</Button>
            <NewChallanDialog>
              <DialogTrigger asChild>
                <Button>+ New Challan</Button>
              </DialogTrigger>
            </NewChallanDialog>
          </>
        }
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
                <p className="text-muted-foreground text-xs">{s.sub}</p>
                <a href="/tax/tds/challans" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search challans..." className="pl-9" />
                </div>
                <div className="flex flex-wrap gap-2 sm:ml-auto">
                  <Button variant="outline">All Quarters <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">FY 2025-26 <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Types <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline"><Filter className="size-4" /> Filter</Button>
                  <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">BSR Code</th>
                      <th className="pb-2 font-medium">Challan Serial No.</th>
                      <th className="pb-2 font-medium">Challan Date</th>
                      <th className="pb-2 font-medium">Quarter</th>
                      <th className="pb-2 font-medium">Financial Year</th>
                      <th className="pb-2 font-medium">Challan Type</th>
                      <th className="pb-2 text-right font-medium">Amount (₹)</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 text-right font-medium">Mapped Amount (₹)</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {challans.map((c) => (
                      <tr key={c.serial} className="border-b last:border-0">
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{c.bsr}</td>
                        <td className="text-foreground py-3 font-mono text-xs whitespace-nowrap">{c.serial}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{c.date}</td>
                        <td className="text-muted-foreground py-3">{c.qtr}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{c.fy}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{c.type}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{n(c.amount)}</td>
                        <td className="py-3"><StatusBadge status={c.status} /></td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{n(c.mapped)}</td>
                        <td className="py-3">
                          <Button size="sm" variant="outline" className="gap-1">View <ChevronDown className="size-3.5" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 10 of 46 challans</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Challan Summary <span className="text-muted-foreground text-xs font-normal">(FY 2025-26)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={summary} total={inr(1801250)} totalLabel="Total Deposited" size={140} />
              <ul className="w-full text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 py-0.5">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground flex-1 truncate text-xs">{s.name}</span>
                    <span className="text-xs font-medium whitespace-nowrap text-foreground">{inr(s.value)} ({s.pct}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Challan Status</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={statusCount} total="46" totalLabel="Total" size={140} />
              <ul className="w-full text-sm">
                {statusCount.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 py-0.5">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground flex-1 truncate text-xs">{s.name}</span>
                    <span className="text-xs font-medium whitespace-nowrap text-foreground">{s.value} ({s.pct}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Challans</CardTitle>
              <a href="/tax/tds/challans" className="text-primary text-sm font-medium">View all</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {recentChallans.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="border-border flex size-11 shrink-0 flex-col items-center justify-center rounded-lg border text-xs leading-none font-bold text-foreground">
                    <span className="text-sm">{c.date.split(" ")[0]}</span>
                    <span className="text-muted-foreground font-medium">{c.date.split(" ")[1]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-muted-foreground text-xs">Challan No.</p>
                    <p className="truncate text-sm font-medium text-foreground">{c.serial}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold whitespace-nowrap text-foreground">{inr(c.amount)}</p>
                    <p className={`text-xs font-medium whitespace-nowrap ${statusTextColor[c.status]}`}>{c.status}</p>
                  </div>
                </div>
              ))}
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
