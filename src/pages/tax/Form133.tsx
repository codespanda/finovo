import { FileText, CheckCircle2, Clock, FileBadge2, AlertCircle, Search, ChevronDown, Filter, Calendar, Upload, Download, Pencil, RefreshCw, MoreVertical, Info, ExternalLink, User, Users, ClipboardEdit } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { GenerateFormDialog } from "@/components/shared/TaxFilingDialogs"
import { MASKED } from "@/lib/format"

const stats = [
  { icon: FileText, label: "Total Form 133", value: "158", sub: "This Financial Year", link: "View all", color: "green" as const },
  { icon: CheckCircle2, label: "Generated", value: "112", sub: "70.89% of total", link: "View generated", color: "blue" as const },
  { icon: Clock, label: "Pending Generation", value: "26", sub: "16.46% of total", link: "View pending", color: "orange" as const },
  { icon: FileBadge2, label: "Issued / Downloaded", value: "98", sub: "62.03% of total", link: "View issued", color: "purple" as const },
  { icon: AlertCircle, label: "Correction Required", value: "8", sub: "5.06% of total", link: "View corrections", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const records = [
  { deductor: "Acme Realty Pvt. Ltd.", deductee: "Rahul Mehta", ay: "2026-27", qtr: "Q4", amount: "1,25,000.00", status: "Generated", genOn: "18 May 2025", genAt: "11:30 AM", dlOn: "20 May 2025", dlAt: "10:15 AM" },
  { deductor: "Buildwell Developers", deductee: "Neha Kapoor", ay: "2026-27", qtr: "Q4", amount: "2,45,000.00", status: "Generated", genOn: "12 May 2025", genAt: "09:20 AM", dlOn: "13 May 2025", dlAt: "02:45 PM" },
  { deductor: "Skyline Constructions", deductee: "Amit Sharma", ay: "2026-27", qtr: "Q3", amount: "95,000.00", status: "Pending Generation", genOn: null, genAt: null, dlOn: null, dlAt: null },
  { deductor: "Metro Infra Pvt. Ltd.", deductee: "Priya Verma", ay: "2026-27", qtr: "Q3", amount: "1,10,000.00", status: "Generated", genOn: "24 Apr 2025", genAt: "04:45 PM", dlOn: "25 Apr 2025", dlAt: "11:10 AM" },
  { deductor: "Urban Spaces LLP", deductee: "Vikram Singh", ay: "2026-27", qtr: "Q2", amount: "85,000.00", status: "Issued", genOn: "20 Apr 2025", genAt: "10:15 AM", dlOn: "20 Apr 2025", dlAt: "12:05 PM" },
  { deductor: "Prime Estates", deductee: "Sneha Iyer", ay: "2026-27", qtr: "Q2", amount: "1,95,000.00", status: "Correction Required", genOn: null, genAt: null, dlOn: null, dlAt: null },
  { deductor: "Landmark Projects", deductee: "Manoj Tiwari", ay: "2026-27", qtr: "Q2", amount: "1,50,000.00", status: "Pending Generation", genOn: null, genAt: null, dlOn: null, dlAt: null },
  { deductor: "Galaxy Developers", deductee: "Ritika Malhotra", ay: "2026-27", qtr: "Q1", amount: "1,35,750.00", status: "Generated", genOn: "27 Mar 2025", genAt: "03:20 PM", dlOn: "28 Mar 2025", dlAt: "10:45 AM" },
  { deductor: "Omkar Estates Pvt. Ltd.", deductee: "Karan Patel", ay: "2026-27", qtr: "Q1", amount: "75,000.00", status: "Issued", genOn: "17 Mar 2025", genAt: "09:40 AM", dlOn: "18 Mar 2025", dlAt: "11:25 AM" },
  { deductor: "Heritage Developers", deductee: "Pooja Desai", ay: "2026-27", qtr: "Q1", amount: "1,20,000.00", status: "Generated", genOn: "12 Mar 2025", genAt: "11:05 AM", dlOn: "13 Mar 2025", dlAt: "01:15 PM" },
]

const summary = [
  { name: "Generated", value: 112, pct: 70.89, color: "var(--color-chart-2)" },
  { name: "Issued / Downloaded", value: 98, pct: 62.03, color: "var(--color-chart-1)" },
  { name: "Pending Generation", value: 26, pct: 16.46, color: "var(--color-chart-3)" },
  { name: "Correction Required", value: 8, pct: 5.06, color: "var(--color-chart-5)" },
]

const quickActions = [
  { icon: Download, label: "Download All (FY 2025-26)", sub: "ZIP file of all generated Form 133" },
  { icon: FileText, label: "Download by Quarter", sub: "Choose a quarter to download" },
  { icon: User, label: "Download by Deductor (Payer)", sub: "Download for a specific deductor" },
  { icon: Users, label: "Download by Deductee (Payee)", sub: "Download for a specific deductee" },
]

const importantActions = [
  { icon: RefreshCw, label: "Generate Pending Form 133", sub: "Generate Form 133 for pending records" },
  { icon: Upload, label: "Bulk Upload Form 133", sub: "Upload Form 133 in bulk" },
  { icon: ClipboardEdit, label: "Correction Request", sub: "Raise correction request for Form 133" },
]

function ActionIcon({ status }: { status: string }) {
  if (status === "Pending Generation") return <RefreshCw className="size-4" />
  if (status === "Correction Required") return <Pencil className="size-4" />
  return <Download className="size-4" />
}

export function Form133() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "Form 133" }]}
        title="Form 133"
        description="View, download and manage Form 133 certificates for tax deducted at source."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Upload Form 133 (Bulk)</Button>
            <GenerateFormDialog formNo="133">
              <DialogTrigger asChild>
                <Button>+ Generate Form 133</Button>
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
                <a href="/tax/tds/form-133" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Button variant="outline">FY 2025-26 <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Quarters <ChevronDown className="size-3.5" /></Button>
                <div className="relative max-w-[13rem] flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search deductor name or TAN" className="pl-9" />
                </div>
                <div className="relative max-w-[13rem] flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search deductee name or PAN" className="pl-9" />
                </div>
                <Button variant="outline" className="sm:ml-auto">All Status <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="w-8 pb-2"><Checkbox /></th>
                      <th className="pb-2 font-medium">Deductor (Payer) <span className="block font-normal normal-case">(TAN)</span></th>
                      <th className="pb-2 font-medium">Deductee (Payee) <span className="block font-normal normal-case">(PAN)</span></th>
                      <th className="pb-2 font-medium">Assessment Year</th>
                      <th className="pb-2 font-medium">Quarter</th>
                      <th className="pb-2 text-right font-medium">TDS Amount <span className="block font-normal normal-case">(₹)</span></th>
                      <th className="pb-2 font-medium">Form 133 Status</th>
                      <th className="pb-2 font-medium">Generated On</th>
                      <th className="pb-2 font-medium">Downloaded On</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-3"><Checkbox /></td>
                        <td className="py-3">
                          <p className="font-medium whitespace-nowrap text-foreground">{r.deductor}</p>
                          <p className="text-muted-foreground font-mono text-xs whitespace-nowrap">{MASKED}</p>
                        </td>
                        <td className="py-3">
                          <p className="font-medium whitespace-nowrap text-foreground">{r.deductee}</p>
                          <p className="text-muted-foreground font-mono text-xs whitespace-nowrap">{MASKED}</p>
                        </td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.ay}</td>
                        <td className="text-muted-foreground py-3">{r.qtr}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{r.amount}</td>
                        <td className="py-3"><StatusBadge status={r.status} /></td>
                        <td className="py-3 whitespace-nowrap">
                          {r.genOn ? (<><p className="text-foreground">{r.genOn}</p><p className="text-muted-foreground text-xs">{r.genAt}</p></>) : <span className="text-muted-foreground">–</span>}
                        </td>
                        <td className="py-3 whitespace-nowrap">
                          {r.dlOn ? (<><p className="text-foreground">{r.dlOn}</p><p className="text-muted-foreground text-xs">{r.dlAt}</p></>) : <span className="text-muted-foreground">–</span>}
                        </td>
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
                <span>Showing 1 to 10 of 158 records</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                    <span className="text-muted-foreground px-1">…</span>
                    <Button size="sm" variant="outline" className="size-8 p-0">16</Button>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Form 133 Summary <span className="text-muted-foreground text-xs font-normal">(FY 2025-26)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={summary} total="158" totalLabel="Total" size={140} />
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
                Learn more about Form 133 and related processes.
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
