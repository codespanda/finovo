import { FileText, CheckCircle2, Hourglass, Send, XCircle, Search, ChevronDown, Filter, Calendar, Download, Plus, Eye, Upload, Pencil, RefreshCw, MoreVertical, Info, ExternalLink, FilePlus2, Layers, FileUp, ShieldAlert, CalendarClock, FileCheck2, Target } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { GenerateReportDialog } from "@/components/shared/TaxFilingDialogs"
import { MASKED } from "@/lib/format"

const stats = [
  { icon: FileText, label: "Total Reports", value: "46", sub: "This Financial Year", link: "View all", color: "green" as const },
  { icon: CheckCircle2, label: "Generated", value: "28", sub: "60.87% of total", link: "View generated", color: "blue" as const },
  { icon: Hourglass, label: "Pending", value: "12", sub: "26.09% of total", link: "View pending", color: "orange" as const },
  { icon: Send, label: "Submitted", value: "4", sub: "8.70% of total", link: "View submitted", color: "purple" as const },
  { icon: XCircle, label: "Rejected", value: "2", sub: "4.35% of total", link: "View rejected", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const typeColors: Record<string, "success" | "purple" | "danger"> = {
  "Deductee Mismatch": "success",
  Consolidated: "purple",
  "Deductor Mismatch": "danger",
}

const typeIconBg: Record<string, string> = {
  "Deductee Mismatch": "bg-success-bg text-success-foreground",
  Consolidated: "bg-purple-bg text-purple-foreground",
  "Deductor Mismatch": "bg-danger-bg text-danger-foreground",
}

const dueTagColor: Record<string, string> = {
  "Due in 13 days": "text-warning-foreground",
  "Filed on time": "text-success-foreground",
  Rejected: "text-danger-foreground",
  Overdue: "text-danger-foreground",
}

const reports = [
  { name: "Quarterly Mismatch Report - Q4", sub: "Deductee vs AIS Mismatch", id: "JR2025-26-0045", type: "Deductee Mismatch", ay: "2026-27", status: "Generated", genOn: "18 May 2025", genAt: "11:30 AM", due: "31 May 2025", tag: "Due in 13 days" },
  { name: "Consolidated Justification - Q4", sub: "Consolidated TDS Mismatch", id: "JR2025-26-0044", type: "Consolidated", ay: "2026-27", status: "Pending", genOn: "16 May 2025", genAt: "04:20 PM", due: "31 May 2025", tag: "Due in 13 days" },
  { name: "Quarterly Mismatch Report - Q3", sub: "Deductee vs AIS Mismatch", id: "JR2025-26-0032", type: "Deductee Mismatch", ay: "2026-27", status: "Submitted", genOn: "22 Apr 2025", genAt: "09:15 AM", due: "30 Apr 2025", tag: "Filed on time" },
  { name: "Deductor Mismatch Report - Q3", sub: "Deductor vs TDS Return", id: "JR2025-26-0031", type: "Deductor Mismatch", ay: "2026-27", status: "Rejected", genOn: "20 Apr 2025", genAt: "02:10 PM", due: "30 Apr 2025", tag: "Rejected" },
  { name: "Annual Consolidated Report", sub: "FY 2024-25 Consolidated", id: "JR2025-26-0025", type: "Consolidated", ay: "2025-26", status: "Submitted", genOn: "15 Mar 2025", genAt: "10:45 AM", due: "31 Mar 2025", tag: "Filed on time" },
  { name: "Quarterly Mismatch Report - Q2", sub: "Deductee vs AIS Mismatch", id: "JR2025-26-0018", type: "Deductee Mismatch", ay: "2025-26", status: "Generated", genOn: "18 Jan 2025", genAt: "01:30 PM", due: "31 Jan 2025", tag: "Filed on time" },
  { name: "Deductor Mismatch Report - Q2", sub: "Deductor vs TDS Return", id: "JR2025-26-0017", type: "Deductor Mismatch", ay: "2025-26", status: "Submitted", genOn: "16 Jan 2025", genAt: "11:20 AM", due: "31 Jan 2025", tag: "Filed on time" },
  { name: "Quarterly Mismatch Report - Q1", sub: "Deductee vs AIS Mismatch", id: "JR2025-26-0009", type: "Deductee Mismatch", ay: "2025-26", status: "Rejected", genOn: "12 Oct 2024", genAt: "03:40 PM", due: "31 Oct 2024", tag: "Rejected" },
  { name: "Deductor Mismatch Report - Q1", sub: "Deductor vs TDS Return", id: "JR2025-26-0008", type: "Deductor Mismatch", ay: "2025-26", status: "Generated", genOn: "10 Oct 2024", genAt: "09:10 AM", due: "31 Oct 2024", tag: "Overdue" },
  { name: "Annual Consolidated Report", sub: "FY 2023-24 Consolidated", id: "JR2025-26-0001", type: "Consolidated", ay: "2024-25", status: "Submitted", genOn: "20 Mar 2024", genAt: "02:30 PM", due: "31 Mar 2024", tag: "Filed on time" },
]

const summary = [
  { name: "Generated", value: 28, pct: 60.87, color: "var(--color-chart-2)" },
  { name: "Pending", value: 12, pct: 26.09, color: "var(--color-chart-3)" },
  { name: "Submitted", value: 4, pct: 8.70, color: "var(--color-chart-1)" },
  { name: "Rejected", value: 2, pct: 4.35, color: "var(--color-chart-5)" },
]

const quickActions = [
  { icon: FilePlus2, label: "Generate Justification Report", sub: "Create a new justification report" },
  { icon: Layers, label: "Bulk Generation", sub: "Generate reports in bulk" },
  { icon: FileUp, label: "Upload Supporting Document", sub: "Upload documents for justification" },
  { icon: ShieldAlert, label: "View Rejection Reasons", sub: "Check rejected report reasons" },
]

const importantInfo = [
  { icon: CalendarClock, label: "Due Date", sub: "File justification before the due date to avoid penalties." },
  { icon: FileCheck2, label: "Document Format", sub: "Upload documents in PDF format (Max size: 10MB)." },
  { icon: Target, label: "Accuracy", sub: "Ensure all data is accurate to avoid report rejection." },
]

function ActionIcons({ status }: { status: string }) {
  if (status === "Pending") {
    return (
      <>
        <Button size="icon-sm" variant="outline"><Pencil className="size-4" /></Button>
        <Button size="icon-sm" variant="outline"><Upload className="size-4" /></Button>
      </>
    )
  }
  if (status === "Rejected") {
    return (
      <>
        <Button size="icon-sm" variant="outline"><Eye className="size-4" /></Button>
        <Button size="icon-sm" variant="outline"><RefreshCw className="size-4" /></Button>
      </>
    )
  }
  return (
    <>
      <Button size="icon-sm" variant="outline"><Eye className="size-4" /></Button>
      <Button size="icon-sm" variant="outline"><Download className="size-4" /></Button>
    </>
  )
}

export function JustificationReports() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "Justification Reports" }]}
        title="Justification Reports"
        description="Generate and manage justification reports for mismatches and compliance."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Download Activity Log</Button>
            <GenerateReportDialog>
              <DialogTrigger asChild>
                <Button><Plus className="size-4" /> Generate Report</Button>
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
                <a href="/tax/tds/justification-reports" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="relative max-w-xs flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search by report name, TAN, PAN, assessment year..." className="pl-9" />
                </div>
                <Button variant="outline">FY 2025-26 <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Assessment Years <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Types <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline" className="sm:ml-auto">All Statuses <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Report Name</th>
                      <th className="pb-2 font-medium">Report ID</th>
                      <th className="pb-2 font-medium">Report Type</th>
                      <th className="pb-2 font-medium">Assessment Year</th>
                      <th className="pb-2 font-medium">TAN</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Generated On</th>
                      <th className="pb-2 font-medium">Due Date</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((r, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${typeIconBg[r.type]}`}>
                              <FileText className="size-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium whitespace-nowrap text-foreground">{r.name}</p>
                              <p className="text-muted-foreground text-xs whitespace-nowrap">{r.sub}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{r.id}</td>
                        <td className="py-3"><Badge variant={typeColors[r.type]}>{r.type}</Badge></td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.ay}</td>
                        <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{MASKED}</td>
                        <td className="py-3"><StatusBadge status={r.status} /></td>
                        <td className="py-3 whitespace-nowrap">
                          <p className="text-foreground">{r.genOn}</p>
                          <p className="text-muted-foreground text-xs">{r.genAt}</p>
                        </td>
                        <td className="py-3 whitespace-nowrap">
                          <p className="text-foreground">{r.due}</p>
                          <p className={`text-xs font-medium ${dueTagColor[r.tag]}`}>{r.tag}</p>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1.5">
                            <ActionIcons status={r.status} />
                            <Button size="icon-sm" variant="ghost"><MoreVertical className="size-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 10 of 46 reports</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                    <span className="text-muted-foreground px-1">..</span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Report Summary <span className="text-muted-foreground text-xs font-normal">(FY 2025-26)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={summary} total="46" totalLabel="Total" size={140} />
              <ul className="w-full text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 py-0.5">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground flex-1 truncate text-xs">{s.name}</span>
                    <span className="text-xs font-medium whitespace-nowrap text-foreground">{s.value} ({s.pct.toFixed(2)}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-1 pb-3">
              {quickActions.map((a) => (
                <button key={a.label} className="hover:bg-muted -mx-1 flex items-start gap-3 rounded-lg px-1 py-2 text-left transition-colors">
                  <a.icon className="text-primary mt-0.5 size-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{a.label}</p>
                    <p className="text-muted-foreground text-xs">{a.sub}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Important Information</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {importantInfo.map((a) => (
                <div key={a.label} className="flex items-start gap-3">
                  <a.icon className="text-primary mt-0.5 size-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{a.label}</p>
                    <p className="text-muted-foreground text-xs">{a.sub}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="mb-1.5 flex items-center gap-2">
                <Info className="text-primary size-4" />
                <span className="text-sm font-semibold text-foreground">Need Help?</span>
              </div>
              <p className="text-muted-foreground mb-2 text-xs">
                Learn more about justification reports and filing requirements.
              </p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">
                View User Guide <ExternalLink className="size-3.5" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
