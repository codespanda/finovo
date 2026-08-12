import { Users2, CheckCircle2, AlertTriangle, Clock, XCircle, RefreshCw, Search, ChevronDown, Filter, Calendar, Upload, Plus, MoreVertical, ShieldCheck, ShieldAlert, Info, ExternalLink, Download, FileWarning } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { VerifyPanDialog } from "@/components/shared/TaxFilingDialogs"
import { MASKED } from "@/lib/format"

const stats = [
  { icon: Users2, label: "Total PANs", value: "2,568", sub: "This Financial Year", link: "View all", color: "green" as const },
  { icon: CheckCircle2, label: "Valid PANs", value: "2,102", sub: "81.88% of total", link: "View valid", color: "blue" as const },
  { icon: AlertTriangle, label: "Invalid PANs", value: "186", sub: "7.24% of total", link: "View invalid", color: "orange" as const },
  { icon: Clock, label: "In Progress", value: "142", sub: "5.53% of total", link: "View in progress", color: "purple" as const },
  { icon: XCircle, label: "Mismatch / Error", value: "138", sub: "5.36% of total", link: "View mismatch", color: "red" as const },
  { icon: RefreshCw, label: "Not Verified", value: "0", sub: "0.00% of total", link: "View not verified", color: "gray" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
  gray: "bg-muted text-muted-foreground",
}

const statusStyle: Record<string, { pill: string; dot: string }> = {
  Valid: { pill: "bg-success-bg text-success-foreground", dot: "bg-success-foreground" },
  Invalid: { pill: "bg-danger-bg text-danger-foreground", dot: "bg-danger-foreground" },
  Mismatch: { pill: "bg-warning-bg text-warning-foreground", dot: "bg-warning-foreground" },
  "In Progress": { pill: "bg-info-bg text-info-foreground", dot: "bg-info-foreground" },
}

function StatusPill({ status }: { status: string }) {
  const s = statusStyle[status]
  return (
    <span className={`inline-flex w-fit items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${s.pill}`}>
      <span className={`size-1.5 shrink-0 rounded-full ${s.dot}`} />
      {status}
    </span>
  )
}

const typeColors: Record<string, "success" | "info"> = {
  Company: "info",
  Individual: "success",
}

const records = [
  { deductee: "Acme Realty Pvt. Ltd.", type: "Company", ay: "2026-27", status: "Valid", holder: "Acme Reality Private Limited", panType: "Corporate", verOn: "18 May 2025", verAt: "11:30 AM" },
  { deductee: "Rahul Mehta", type: "Individual", ay: "2026-27", status: "Valid", holder: "RAHUL MEHTA", panType: "Individual", verOn: "18 May 2025", verAt: "10:20 AM" },
  { deductee: "Neha Kapoor", type: "Individual", ay: "2026-27", status: "Valid", holder: "NEHA KAPOOR", panType: "Individual", verOn: "17 May 2025", verAt: "04:45 PM" },
  { deductee: "Tech Solutions", type: "Company", ay: "2026-27", status: "Invalid", holder: null, panType: null, verOn: "16 May 2025", verAt: "03:15 PM" },
  { deductee: "Amit Sharma", type: "Individual", ay: "2026-27", status: "Mismatch", holder: "AMIT KUMAR SHARMA", panType: "Individual", verOn: "16 May 2025", verAt: "01:10 PM" },
  { deductee: "Creative Minds", type: "Company", ay: "2026-27", status: "In Progress", holder: null, panType: null, verOn: "16 May 2025", verAt: "11:02 AM" },
  { deductee: "Deepak Singh", type: "Individual", ay: "2026-27", status: "Valid", holder: "DEEPAK SINGH", panType: "Individual", verOn: "15 May 2025", verAt: "05:30 PM" },
  { deductee: "NextGen Softwares", type: "Company", ay: "2026-27", status: "Invalid", holder: null, panType: null, verOn: "15 May 2025", verAt: "02:05 PM" },
  { deductee: "Global Enterprises", type: "Company", ay: "2026-27", status: "Mismatch", holder: "GLOBAL ENTERPRISES PVT LTD", panType: "Corporate", verOn: "14 May 2025", verAt: "03:45 PM" },
  { deductee: "Innovative Tech", type: "Company", ay: "2026-27", status: "In Progress", holder: null, panType: null, verOn: "14 May 2025", verAt: "10:25 AM" },
]

const summary = [
  { name: "Valid", value: 2102, pct: 81.88, color: "var(--color-chart-2)" },
  { name: "Invalid", value: 186, pct: 7.24, color: "var(--color-chart-5)" },
  { name: "Mismatch / Error", value: 138, pct: 6.36, color: "var(--color-chart-3)" },
  { name: "In Progress", value: 142, pct: 6.53, color: "var(--color-chart-1)" },
  { name: "Not Verified", value: 0, pct: 0, color: "var(--color-muted-foreground)" },
]

const insights = [
  { icon: ShieldCheck, tone: "success" as const, label: "High Valid Rate", value: "81.88%", sub: "Your valid PAN rate is good." },
  { icon: ShieldAlert, tone: "warning" as const, label: "Action Required", value: "324", sub: "PANs need your attention." },
]

const insightStyle: Record<string, string> = {
  success: "bg-success-bg text-success-foreground",
  warning: "bg-warning-bg text-warning-foreground",
}

const quickActions = [
  { icon: Plus, label: "Verify PAN (Bulk)" },
  { icon: Upload, label: "Upload PAN File" },
  { icon: FileWarning, label: "View Invalid PANs" },
  { icon: Download, label: "Download Verification Report" },
]

export function PanVerification() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "PAN Verification" }]}
        title="PAN Verification"
        description="Verify and validate PAN details of deductees."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Upload PAN File (Bulk)</Button>
            <VerifyPanDialog>
              <DialogTrigger asChild>
                <Button>+ Verify PAN</Button>
              </DialogTrigger>
            </VerifyPanDialog>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <div className="flex flex-col gap-5 xl:col-span-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
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
                <a href="/tax/tds/pan-verification" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="relative max-w-xs flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search by PAN / Name / Deductee" className="pl-9" />
                </div>
                <Button variant="outline">FY 2025-26 <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Quarters <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline" className="sm:ml-auto">All Types <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="w-8 pb-2"><Checkbox /></th>
                      <th className="pb-2 font-medium">PAN</th>
                      <th className="pb-2 font-medium">Deductee Name</th>
                      <th className="pb-2 font-medium">Deductee Type</th>
                      <th className="pb-2 font-medium">Assessment Year</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">PAN Holder Name <span className="block font-normal normal-case">(as per ITD)</span></th>
                      <th className="pb-2 font-medium">PAN Type</th>
                      <th className="pb-2 font-medium">Verified On</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-3"><Checkbox /></td>
                        <td className="text-foreground py-3 font-mono text-xs whitespace-nowrap">{MASKED}</td>
                        <td className="text-foreground py-3 whitespace-nowrap">{r.deductee}</td>
                        <td className="py-3"><Badge variant={typeColors[r.type]}>{r.type}</Badge></td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.ay}</td>
                        <td className="py-3"><StatusPill status={r.status} /></td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.holder ?? "–"}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.panType ?? "–"}</td>
                        <td className="py-3 whitespace-nowrap">
                          <p className="text-foreground">{r.verOn}</p>
                          <p className="text-muted-foreground text-xs">{r.verAt}</p>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1.5">
                            <Button size="icon-sm" variant="outline"><RefreshCw className="size-4" /></Button>
                            <Button size="icon-sm" variant="ghost"><MoreVertical className="size-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 10 of 2,568 records</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                    <span className="text-muted-foreground px-1">…</span>
                    <Button size="sm" variant="outline" className="size-8 p-0">257</Button>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>PAN Verification Summary <span className="text-muted-foreground text-xs font-normal">(FY 2025-26)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={summary} total="2,568" totalLabel="Total" size={140} />
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
            <CardHeader><CardTitle>Verification Insights</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {insights.map((ins) => (
                <div key={ins.label} className={`flex items-start gap-3 rounded-lg p-3 ${insightStyle[ins.tone]}`}>
                  <ins.icon className="mt-0.5 size-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium">{ins.label}</p>
                    <p className="text-base font-bold">{ins.value}</p>
                    <p className="text-xs opacity-90">{ins.sub}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col pb-3">
              {quickActions.map((a) => (
                <button key={a.label} className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2.5 text-left text-sm font-medium text-foreground transition-colors">
                  <a.icon className="text-primary size-4 shrink-0" />
                  {a.label}
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
                Learn more about PAN verification and common error codes.
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
