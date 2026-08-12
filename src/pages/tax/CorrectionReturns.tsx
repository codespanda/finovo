import { FileText, CheckCircle2, Clock, FileBadge2, AlertCircle, Search, ChevronDown, Filter, Calendar, Upload, Download, RefreshCw, MoreVertical, Info, ExternalLink, FilePlus2, ClipboardCheck, FileDown } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { FileCorrectionReturnDialog } from "@/components/shared/TaxFilingDialogs"
import { MASKED } from "@/lib/format"

const stats = [
  { icon: FileText, label: "Total Correction Returns", value: "48", sub: "This Financial Year", link: "View all", color: "green" as const },
  { icon: CheckCircle2, label: "Filed Successfully", value: "28", sub: "58.33% of total", link: "View filed", color: "blue" as const },
  { icon: Clock, label: "In Progress", value: "12", sub: "25.00% of total", link: "View in progress", color: "orange" as const },
  { icon: FileBadge2, label: "Processed by CPC", value: "20", sub: "41.67% of total", link: "View processed", color: "purple" as const },
  { icon: AlertCircle, label: "Failed / Rejected", value: "8", sub: "16.67% of total", link: "View failed", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const returns = [
  { crn: "CRN250526000123", type: "Correction Return (u/s 200(3))", ay: "2026-27", qtr: "Q4", date: "18 May 2025", time: "11:30 AM", status: "Filed Successfully", procOn: "20 May 2025", procAt: "04:15 PM", remarks: "Accepted by CPC" },
  { crn: "CRN250512000112", type: "Correction Return (u/s 200(3))", ay: "2026-27", qtr: "Q4", date: "12 May 2025", time: "09:20 AM", status: "Processed by CPC", procOn: "14 May 2025", procAt: "02:45 PM", remarks: "Processed" },
  { crn: "CRN250508000098", type: "Correction Return (u/s 200(3A))", ay: "2026-27", qtr: "Q3", date: "08 May 2025", time: "05:10 PM", status: "In Progress", procOn: null, procAt: null, remarks: "Under Processing" },
  { crn: "CRN250430000082", type: "Correction Return (u/s 200(3))", ay: "2026-27", qtr: "Q4", date: "30 Apr 2025", time: "10:05 AM", status: "Filed Successfully", procOn: "02 May 2025", procAt: "11:20 AM", remarks: "Accepted by CPC" },
  { crn: "CRN250420000071", type: "Correction Return (u/s 200(3A))", ay: "2026-27", qtr: "Q3", date: "20 Apr 2025", time: "03:40 PM", status: "Failed / Rejected", procOn: "21 Apr 2025", procAt: "10:30 AM", remarks: "File Rejected by CPC (Validation Error)" },
  { crn: "CRN250415000056", type: "Correction Return (u/s 200(3))", ay: "2026-27", qtr: "Q3", date: "15 Apr 2025", time: "11:15 AM", status: "Processed by CPC", procOn: "17 Apr 2025", procAt: "01:25 PM", remarks: "Processed" },
  { crn: "CRN250401000045", type: "Correction Return (u/s 200(3))", ay: "2026-27", qtr: "Q2", date: "01 Apr 2025", time: "09:10 AM", status: "In Progress", procOn: null, procAt: null, remarks: "Under Processing" },
  { crn: "CRN250328000033", type: "Correction Return (u/s 200(3A))", ay: "2026-27", qtr: "Q2", date: "28 Mar 2025", time: "04:00 PM", status: "Filed Successfully", procOn: "30 Mar 2025", procAt: "09:45 AM", remarks: "Accepted by CPC" },
  { crn: "CRN250321000021", type: "Correction Return (u/s 200(3))", ay: "2026-27", qtr: "Q2", date: "21 Mar 2025", time: "02:30 PM", status: "Failed / Rejected", procOn: "22 Mar 2025", procAt: "11:05 AM", remarks: "PAN Not Available" },
  { crn: "CRN250315000015", type: "Correction Return (u/s 200(3A))", ay: "2026-27", qtr: "Q1", date: "15 Mar 2025", time: "10:00 AM", status: "Processed by CPC", procOn: "16 Mar 2025", procAt: "12:35 PM", remarks: "Processed" },
]

const summary = [
  { name: "Filed Successfully", value: 28, pct: 58.33, color: "var(--color-chart-2)" },
  { name: "In Progress", value: 12, pct: 25.00, color: "var(--color-chart-3)" },
  { name: "Failed / Rejected", value: 8, pct: 16.67, color: "var(--color-chart-5)" },
]

const quickActions = [
  { icon: FilePlus2, label: "File Correction Return", sub: "File a new correction return" },
  { icon: Upload, label: "Upload Correction File (Bulk)", sub: "Upload file in bulk and file" },
  { icon: AlertCircle, label: "View Failed Returns", sub: "View and rectify failed returns" },
  { icon: FileDown, label: "Download Acknowledgement", sub: "Download ACK for filed returns" },
]

const importantActions = [
  { icon: RefreshCw, label: "Track Return Status", sub: "Track status of correction returns" },
  { icon: ClipboardCheck, label: "Validate Correction File", sub: "Validate file before filing" },
  { icon: Download, label: "Download Correction Report", sub: "Download detailed correction report" },
]

function ActionIcon({ status }: { status: string }) {
  if (status === "In Progress" || status === "Failed / Rejected") return <RefreshCw className="size-4" />
  return <Download className="size-4" />
}

export function CorrectionReturns() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "Correction Returns" }]}
        title="Correction Returns"
        description="View, file and manage correction returns for TDS."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Upload Correction File (Bulk)</Button>
            <FileCorrectionReturnDialog>
              <DialogTrigger asChild>
                <Button>+ File Correction Return</Button>
              </DialogTrigger>
            </FileCorrectionReturnDialog>
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
                <a href="/tax/tds/correction-returns" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="relative max-w-xs flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search by CRN / Return Type / TAN" className="pl-9" />
                </div>
                <Button variant="outline">FY 2025-26 <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Quarters <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Types <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline" className="sm:ml-auto">All Status <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="w-8 pb-2"><Checkbox /></th>
                      <th className="pb-2 font-medium">CRN (Correction Ref. No.)</th>
                      <th className="pb-2 font-medium">Return Type</th>
                      <th className="pb-2 font-medium">TAN</th>
                      <th className="pb-2 font-medium">Assessment Year</th>
                      <th className="pb-2 font-medium">Quarter</th>
                      <th className="pb-2 font-medium">Date of Filing</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Processed On</th>
                      <th className="pb-2 font-medium">Remarks</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {returns.map((r) => (
                      <tr key={r.crn} className="border-b last:border-0">
                        <td className="py-3"><Checkbox /></td>
                        <td className="text-foreground py-3 font-mono text-xs whitespace-nowrap">{r.crn}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.type}</td>
                        <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{MASKED}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.ay}</td>
                        <td className="text-muted-foreground py-3">{r.qtr}</td>
                        <td className="py-3 whitespace-nowrap">
                          <p className="text-foreground">{r.date}</p>
                          <p className="text-muted-foreground text-xs">{r.time}</p>
                        </td>
                        <td className="py-3"><StatusBadge status={r.status} /></td>
                        <td className="py-3 whitespace-nowrap">
                          {r.procOn ? (<><p className="text-foreground">{r.procOn}</p><p className="text-muted-foreground text-xs">{r.procAt}</p></>) : <span className="text-muted-foreground">–</span>}
                        </td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.remarks}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-1.5">
                            <Button size="icon-sm" variant="outline"><ActionIcon status={r.status} /></Button>
                            <Button size="icon-sm" variant="ghost"><MoreVertical className="size-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 10 of 48 correction returns</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
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
            <CardHeader><CardTitle>Correction Returns Summary <span className="text-muted-foreground text-xs font-normal">(FY 2025-26)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={summary} total="48" totalLabel="Total" size={140} />
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
            <CardHeader><CardTitle>Important Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-1 pb-3">
              {importantActions.map((a) => (
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
            <CardContent className="pt-5 pb-5">
              <div className="mb-1.5 flex items-center gap-2">
                <Info className="text-primary size-4" />
                <span className="text-sm font-semibold text-foreground">Need Help?</span>
              </div>
              <p className="text-muted-foreground mb-2 text-xs">
                Learn more about correction returns and the filing process.
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
