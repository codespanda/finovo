import { FileStack, CheckCircle2, Hourglass, Send, XCircle, Search, ChevronDown, Filter, Calendar, Download, Wallet, FileText, Users2, Receipt, FileBadge2, ShieldAlert, Download as DownloadIcon, Mail, MoreVertical } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { GenerateReportDialog } from "@/components/shared/TaxFilingDialogs"

const stats = [
  { icon: FileStack, label: "Total Reports", value: "62", sub: "This Financial Year", link: "View all reports", color: "green" as const },
  { icon: CheckCircle2, label: "Generated", value: "48", sub: "77.42% of total", link: "View generated", color: "blue" as const },
  { icon: Hourglass, label: "Scheduled", value: "8", sub: "12.90% of total", link: "View scheduled", color: "purple" as const },
  { icon: Send, label: "Filed on Time", value: "41", sub: "85.42% of generated", link: "View filed reports", color: "teal" as const },
  { icon: XCircle, label: "Overdue / Pending", value: "7", sub: "14.58% of generated", link: "View overdue", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
  red: "bg-danger-bg text-danger-foreground",
}

const typeColors: Record<string, "info" | "purple" | "success"> = { TDS: "info", TCS: "purple", AIR: "success" }

const reports = [
  { name: "TDS Payment Summary", desc: "Summary of TDS payments", form: "Form 26AS", type: "TDS", fy: "FY 2025-26", generated: "18 May 2025 11:30 AM", status: "Generated", due: "31 May 2025", note: "", icon: Wallet, bg: "bg-success-bg text-success-foreground" },
  { name: "TDS Statement", desc: "Quarterly TDS statement", form: "Form 27EQ", type: "TDS", fy: "FY 2025-26", generated: "16 May 2025 04:20 PM", status: "Generated", due: "31 May 2025", note: "Filed on time", icon: FileText, bg: "bg-info-bg text-info-foreground" },
  { name: "TDS Deductor Summary", desc: "Summary of deductors", form: "Form 24Q", type: "TDS", fy: "FY 2025-26", generated: "10 May 2025 10:15 AM", status: "Generated", due: "31 May 2025", note: "Filed on time", icon: Users2, bg: "bg-purple-bg text-purple-foreground" },
  { name: "TDS Challan Report", desc: "Challan wise TDS details", form: "Challan 281", type: "TDS", fy: "FY 2025-26", generated: "09 May 2025 02:45 PM", status: "Generated", due: "–", note: "", icon: Receipt, bg: "bg-warning-bg text-warning-foreground" },
  { name: "TCS Statement", desc: "Quarterly TCS statement", form: "Form 27EQ", type: "TCS", fy: "FY 2025-26", generated: "18 May 2025 11:00 AM", status: "Generated", due: "15 May 2025", note: "Filed on time", icon: FileText, bg: "bg-info-bg text-info-foreground" },
  { name: "TCS Collection Summary", desc: "Summary of TCS collections", form: "Form 27D", type: "TCS", fy: "FY 2025-26", generated: "16 May 2025 03:30 PM", status: "Generated", due: "15 May 2025", note: "Filed on time", icon: Users2, bg: "bg-purple-bg text-purple-foreground" },
  { name: "Annual Information Return", desc: "Annual information return", form: "Form 26A", type: "AIR", fy: "FY 2025-26", generated: "12 May 2025 09:10 AM", status: "Scheduled", due: "31 Aug 2025", note: "Due in 105 days", icon: FileBadge2, bg: "bg-info-bg text-info-foreground" },
  { name: "TDS Defaults Report", desc: "Default in TDS compliance", form: "Defaults", type: "TDS", fy: "FY 2025-26", generated: "08 May 2025 05:15 PM", status: "Overdue", due: "30 Apr 2025", note: "Overdue by 18 days", icon: ShieldAlert, bg: "bg-danger-bg text-danger-foreground" },
]

const noteClass: Record<string, string> = { Generated: "text-success-foreground", Scheduled: "text-warning-foreground", Overdue: "text-danger-foreground" }

const summary = [
  { name: "Generated", value: 48, pct: "77.42%", color: "var(--color-chart-2)" },
  { name: "Scheduled", value: 8, pct: "12.90%", color: "var(--color-chart-3)" },
  { name: "Overdue", value: 7, pct: "12.29%", color: "var(--color-chart-5)" },
]

const popularReports = [
  { name: "Form 26AS", sub: "TDS Annual Statement", icon: FileText },
  { name: "Form 24Q", sub: "TDS Deductor Quarterly Return", icon: Users2 },
  { name: "Form 27EQ", sub: "TDS / TCS Quarterly Statement", icon: FileBadge2 },
  { name: "Challan 281", sub: "TDS/TCS Challan Report", icon: Receipt },
  { name: "Form 26A", sub: "Annual Information Return", icon: FileText },
]

export function TaxReports() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Reports", href: "/reports" }, { label: "Tax Reports" }]}
        title="Tax Reports"
        description="Generate and download tax reports for compliance and filing."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Download Activity Log</Button>
            <GenerateReportDialog>
              <DialogTrigger asChild>
                <Button>+ Generate Report</Button>
              </DialogTrigger>
            </GenerateReportDialog>
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
                <a href="/tax/gst" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search by report name, type, form, year..." className="pl-9" />
                </div>
                <div className="flex flex-wrap gap-2 sm:ml-auto">
                  <Button variant="outline">FY 2025-26 <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Types <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Forms <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Statuses <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                  <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Report Name</th>
                      <th className="pb-2 font-medium">Form / Return</th>
                      <th className="pb-2 font-medium">Report Type</th>
                      <th className="pb-2 font-medium">Financial Year</th>
                      <th className="pb-2 font-medium">Generated On</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Due Date</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((r) => (
                      <tr key={r.name} className="border-b last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${r.bg}`}>
                              <r.icon className="size-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium whitespace-nowrap text-foreground">{r.name}</p>
                              <p className="text-muted-foreground text-xs whitespace-nowrap">{r.desc}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.form}</td>
                        <td className="py-3"><Badge variant={typeColors[r.type]}>{r.type}</Badge></td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.fy}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.generated}</td>
                        <td className="py-3"><StatusBadge status={r.status} /></td>
                        <td className="py-3 whitespace-nowrap">
                          <p className="text-foreground">{r.due}</p>
                          {r.note && <p className={`text-xs ${noteClass[r.status]}`}>{r.note}</p>}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon-sm"><DownloadIcon className="size-4" /></Button>
                            <Button variant="outline" size="icon-sm"><Mail className="size-4" /></Button>
                            <Button variant="outline" size="icon-sm"><MoreVertical className="size-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 8 of 62 reports</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="size-8 p-0">«</Button>
                  <Button size="sm" variant="outline" className="size-8 p-0">‹</Button>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                  </div>
                  <span className="px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">8</Button>
                  <Button size="sm" variant="outline" className="size-8 p-0">›</Button>
                  <Button size="sm" variant="outline" className="size-8 p-0">»</Button>
                  <span className="ml-2">Rows per page:</span>
                  <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Tax Reports Summary <span className="text-muted-foreground text-xs font-normal">(FY 2025-26)</span></CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={summary} total="62" totalLabel="Total" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="ml-auto font-medium whitespace-nowrap text-foreground">{s.value} ({s.pct})</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Popular Reports</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-1 pb-3">
              {popularReports.map((r) => (
                <button key={r.name} className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2 text-left transition-colors">
                  <div className="bg-info-bg text-info-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                    <r.icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{r.name}</p>
                    <p className="text-muted-foreground text-xs">{r.sub}</p>
                  </div>
                </button>
              ))}
              <a href="/reports/tax-reports" className="text-primary mt-1 text-sm font-medium">View all reports →</a>
            </CardContent>
          </Card>

          <Card className="bg-muted/40">
            <CardContent className="flex flex-col items-center gap-2 pt-5 pb-5 text-center">
              <div className="bg-success-bg text-success-foreground flex size-9 items-center justify-center rounded-full">?</div>
              <p className="text-sm font-semibold text-foreground">Need Help?</p>
              <p className="text-muted-foreground text-xs">Learn more about tax reports and compliance.</p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">View User Guide →</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
