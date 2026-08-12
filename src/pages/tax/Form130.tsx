import { FileText, CheckCircle2, Clock, FileBadge2, AlertCircle, Search, ChevronDown, Filter, Calendar, Upload, Download, Pencil, RefreshCw, MoreVertical, Info, ExternalLink, Building2, ClipboardEdit } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { GenerateFormDialog } from "@/components/shared/TaxFilingDialogs"
import { MASKED } from "@/lib/format"

const stats = [
  { icon: FileText, label: "Total Form 130", value: "124", sub: "This Financial Year", link: "View all", color: "green" as const },
  { icon: CheckCircle2, label: "Generated", value: "96", sub: "77.42% of total", link: "View generated", color: "blue" as const },
  { icon: Clock, label: "Pending Generation", value: "18", sub: "14.52% of total", link: "View pending", color: "orange" as const },
  { icon: FileBadge2, label: "Issued / Downloaded", value: "86", sub: "69.35% of total", link: "View issued", color: "purple" as const },
  { icon: AlertCircle, label: "Correction Required", value: "6", sub: "4.84% of total", link: "View corrections", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const avatarColors = [
  "bg-info-bg text-info-foreground",
  "bg-purple-bg text-purple-foreground",
  "bg-warning-bg text-warning-foreground",
  "bg-success-bg text-success-foreground",
  "bg-danger-bg text-danger-foreground",
]

const employees = [
  { name: "Rohit Ahuja", code: "EMP001", dept: "Finance", pan: "AAJPA1234A", ay: "2026-27", qtr: "Q4", status: "Generated", genOn: "12 May 2025", genAt: "11:30 AM", dlOn: "14 May 2025", dlAt: "09:15 AM" },
  { name: "Priya Sharma", code: "EMP002", dept: "Accounts", pan: "ABXPS5678C", ay: "2026-27", qtr: "Q4", status: "Generated", genOn: "10 May 2025", genAt: "05:20 PM", dlOn: "12 May 2025", dlAt: "04:45 PM" },
  { name: "Amit Verma", code: "EMP003", dept: "Sales", pan: "ABKPV3456D", ay: "2026-27", qtr: "Q3", status: "Generated", genOn: "08 May 2025", genAt: "02:10 PM", dlOn: null, dlAt: null },
  { name: "Neha Kapoor", code: "EMP004", dept: "HR", pan: "AANPK6789E", ay: "2026-27", qtr: "Q4", status: "Pending Generation", genOn: null, genAt: null, dlOn: null, dlAt: null },
  { name: "Deepak Singh", code: "EMP005", dept: "Operations", pan: "AABPD7890F", ay: "2026-27", qtr: "Q2", status: "Correction Required", genOn: null, genAt: null, dlOn: null, dlAt: null },
  { name: "Sunita Mehta", code: "EMP006", dept: "Marketing", pan: "AAZPM2468G", ay: "2026-27", qtr: "Q4", status: "Generated", genOn: "05 May 2025", genAt: "10:05 AM", dlOn: "06 May 2025", dlAt: "11:40 AM" },
  { name: "Yogesh Gupta", code: "EMP007", dept: "IT", pan: "AAIPG1357H", ay: "2026-27", qtr: "Q3", status: "Issued", genOn: "02 May 2025", genAt: "03:15 PM", dlOn: "03 May 2025", dlAt: "09:30 AM" },
  { name: "Karan Bhatia", code: "EMP008", dept: "Finance", pan: "AACKB9753J", ay: "2026-27", qtr: "Q4", status: "Pending Generation", genOn: null, genAt: null, dlOn: null, dlAt: null },
  { name: "Megha Gupta", code: "EMP009", dept: "Accounts", pan: "AAQMG8642K", ay: "2026-27", qtr: "Q1", status: "Correction Required", genOn: null, genAt: null, dlOn: null, dlAt: null },
  { name: "Ankit Pandey", code: "EMP010", dept: "Sales", pan: "AAVPP2461L", ay: "2026-27", qtr: "Q2", status: "Generated", genOn: "28 Apr 2025", genAt: "04:50 PM", dlOn: "30 Apr 2025", dlAt: "02:20 PM" },
]

const summary = [
  { name: "Generated", value: 96, pct: 77.42, color: "var(--color-chart-2)" },
  { name: "Issued / Downloaded", value: 86, pct: 69.35, color: "var(--color-chart-1)" },
  { name: "Pending Generation", value: 18, pct: 14.52, color: "var(--color-chart-3)" },
  { name: "Correction Required", value: 6, pct: 4.84, color: "var(--color-chart-5)" },
]

const quickDownloads = [
  { icon: Download, label: "Download All (FY 2025-26)", sub: "ZIP file of all generated Form 130" },
  { icon: FileText, label: "Download by Quarter", sub: "Choose a quarter to download" },
  { icon: Building2, label: "Download by Department", sub: "Choose a department to download" },
]

const importantActions = [
  { icon: RefreshCw, label: "Generate Pending Form 130", sub: "Generate Form 130 for pending employees" },
  { icon: Upload, label: "Bulk Upload Form 130", sub: "Upload Form 130 in bulk for employees" },
  { icon: ClipboardEdit, label: "Correction Request", sub: "Raise correction request for Form 130" },
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

function ActionIcon({ status }: { status: string }) {
  if (status === "Pending Generation") return <RefreshCw className="size-4" />
  if (status === "Correction Required") return <Pencil className="size-4" />
  return <Download className="size-4" />
}

export function Form130() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "Form 130" }]}
        title="Form 130"
        description="View, download and manage Form 130 certificates for your employees."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Upload Form 130 (Bulk)</Button>
            <GenerateFormDialog formNo="130">
              <DialogTrigger asChild>
                <Button>+ Generate Form 130</Button>
              </DialogTrigger>
            </GenerateFormDialog>
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
                <a href="/tax/tds/form-130" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Button variant="outline">FY 2025-26 <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Quarters <ChevronDown className="size-3.5" /></Button>
                <div className="relative max-w-xs flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search employee name or code..." className="pl-9" />
                </div>
                <Button variant="outline" className="sm:ml-auto">All Status <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline"><Filter className="size-4" /> More Filters</Button>
                <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="w-8 pb-2"><Checkbox /></th>
                      <th className="pb-2 font-medium">Employee Details</th>
                      <th className="pb-2 font-medium">PAN</th>
                      <th className="pb-2 font-medium">Assessment Year</th>
                      <th className="pb-2 font-medium">Quarter</th>
                      <th className="pb-2 font-medium">Form 130 Status</th>
                      <th className="pb-2 font-medium">Generated On</th>
                      <th className="pb-2 font-medium">Downloaded On</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((e, i) => (
                      <tr key={e.code} className="border-b last:border-0">
                        <td className="py-3"><Checkbox /></td>
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar className="size-8"><AvatarFallback className={`text-xs ${avatarColors[i % avatarColors.length]}`}>{initials(e.name)}</AvatarFallback></Avatar>
                            <div className="min-w-0">
                              <p className="font-medium whitespace-nowrap text-foreground">{e.name}</p>
                              <p className="text-muted-foreground text-xs whitespace-nowrap">{e.code} • {e.dept}</p>
                            </div>
                          </div>
                        </td>
                        <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{MASKED}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{e.ay}</td>
                        <td className="text-muted-foreground py-3">{e.qtr}</td>
                        <td className="py-3"><StatusBadge status={e.status} /></td>
                        <td className="py-3 whitespace-nowrap">
                          {e.genOn ? (<><p className="text-foreground">{e.genOn}</p><p className="text-muted-foreground text-xs">{e.genAt}</p></>) : <span className="text-muted-foreground">–</span>}
                        </td>
                        <td className="py-3 whitespace-nowrap">
                          {e.dlOn ? (<><p className="text-foreground">{e.dlOn}</p><p className="text-muted-foreground text-xs">{e.dlAt}</p></>) : <span className="text-muted-foreground">–</span>}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1.5">
                            <Button size="icon-sm" variant="outline"><ActionIcon status={e.status} /></Button>
                            <Button size="icon-sm" variant="ghost"><MoreVertical className="size-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 10 of 124 records</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                    <span className="text-muted-foreground px-1">…</span>
                    <Button size="sm" variant="outline" className="size-8 p-0">13</Button>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Form 130 Summary <span className="text-muted-foreground text-xs font-normal">(FY 2025-26)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={summary} total="124" totalLabel="Total" size={140} />
              <ul className="w-full text-sm">
                {summary.map((s) => (
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
            <CardHeader><CardTitle>Quick Download</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-1 pb-3">
              {quickDownloads.map((a) => (
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
                Learn more about Form 130 generation, correction and related processes.
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
