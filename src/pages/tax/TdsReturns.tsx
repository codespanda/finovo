import { Clock, CheckCircle2, FileText, Link2, FileBadge2, Search, ChevronDown, Filter, Calendar, ExternalLink, Upload, FilePlus2, Send, Download } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { GenerateTdsReturnDialog } from "@/components/shared/TaxFilingDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: Clock, label: "Pending Returns", value: "2", sub: "Quarterly returns pending", link: "View Pending", color: "orange" as const },
  { icon: CheckCircle2, label: "Filed Returns", value: "14", sub: "FY 2025-26", link: "View Returns", color: "green" as const },
  { icon: FileText, label: "Total TDS Deducted", value: inr(1842750, { decimals: true }), sub: "Current FY", link: "View Summary", color: "blue" as const },
  { icon: Link2, label: "Challans Pending Mapping", value: "5", sub: "Needs allocation", link: "Resolve", color: "purple" as const },
  { icon: FileBadge2, label: "Certificates Generated", value: "342", sub: "Form 130 & 131", link: "Download", color: "red" as const },
]

const colorMap: Record<string, string> = {
  orange: "bg-warning-bg text-warning-foreground",
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const formColors: Record<string, "info" | "success" | "warning"> = { "24Q": "info", "26Q": "success", "27Q": "warning" }

const returns = [
  { form: "24Q", quarter: "Q1", fy: "FY 2025-26", due: "31 Jul 2025", status: "Filed", deductees: 126, tax: 485000, challan: "Mapped", filed: "28 Jul 2025", action: "View" },
  { form: "26Q", quarter: "Q1", fy: "FY 2025-26", due: "31 Jul 2025", status: "Filed", deductees: 84, tax: 320500, challan: "Mapped", filed: "29 Jul 2025", action: "View" },
  { form: "27Q", quarter: "Q1", fy: "FY 2025-26", due: "31 Jul 2025", status: "Draft", deductees: 18, tax: 92000, challan: "Pending", filed: "–", action: "Prepare" },
  { form: "24Q", quarter: "Q2", fy: "FY 2025-26", due: "31 Oct 2025", status: "Due Soon", deductees: null, tax: null, challan: "–", filed: "–", action: "Prepare" },
  { form: "26Q", quarter: "Q2", fy: "FY 2025-26", due: "31 Oct 2025", status: "Not Started", deductees: null, tax: null, challan: "–", filed: "–", action: "Create" },
  { form: "27Q", quarter: "Q2", fy: "FY 2025-26", due: "31 Oct 2025", status: "Not Started", deductees: null, tax: null, challan: "–", filed: "–", action: "Create" },
  { form: "24Q", quarter: "Q3", fy: "FY 2025-26", due: "31 Jan 2026", status: "Not Started", deductees: null, tax: null, challan: "–", filed: "–", action: "Create" },
  { form: "26Q", quarter: "Q3", fy: "FY 2025-26", due: "31 Jan 2026", status: "Not Started", deductees: null, tax: null, challan: "–", filed: "–", action: "Create" },
  { form: "27Q", quarter: "Q3", fy: "FY 2025-26", due: "31 Jan 2026", status: "Not Started", deductees: null, tax: null, challan: "–", filed: "–", action: "Create" },
  { form: "24Q", quarter: "Q4", fy: "FY 2025-26", due: "31 May 2026", status: "Not Started", deductees: null, tax: null, challan: "–", filed: "–", action: "Create" },
]

const summary = [
  { name: "Salary (24Q)", value: 825000, color: "var(--color-chart-2)" },
  { name: "Non Salary (26Q)", value: 670500, color: "var(--color-chart-1)" },
  { name: "Foreign Payment (27Q)", value: 245750, color: "var(--color-chart-4)" },
  { name: "Property (26QB)", value: 101500, color: "var(--color-chart-3)" },
]

const compliance = [
  { label: "Returns Filed", done: true },
  { label: "Challans Mapped", done: true },
  { label: "PAN Verified", done: true },
  { label: "Certificates Issued", done: true },
]

const dueDates = [
  { date: "31 JUL", label: "24Q Q1", tag: "Due in 4 days" },
  { date: "31 JUL", label: "26Q Q1", tag: "Due in 4 days" },
  { date: "31 JUL", label: "27Q Q1", tag: "Due in 4 days" },
]

const quickActions = [
  { icon: FilePlus2, label: "New 24Q Return" },
  { icon: FilePlus2, label: "New 26Q Return" },
  { icon: FilePlus2, label: "New 27Q Return" },
  { icon: FileBadge2, label: "Generate Form 131" },
  { icon: Send, label: "Correction Return" },
  { icon: Download, label: "Download FVU" },
]

export function TdsReturns() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "TDS Returns" }]}
        title="TDS Returns"
        description="Manage TDS deductions, challans, certificates, quarterly returns, correction statements, and TRACES compliance."
        actions={
          <>
            <Button variant="outline"><ExternalLink className="size-4" /> Connect TRACES</Button>
            <Button variant="outline"><Upload className="size-4" /> Import Challans</Button>
            <GenerateTdsReturnDialog>
              <DialogTrigger asChild>
                <Button>+ Generate Return</Button>
              </DialogTrigger>
            </GenerateTdsReturnDialog>
            <Button variant="outline">File Return</Button>
            <Button variant="outline"><Download className="size-4" /> Download Form 130/131</Button>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
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
            <a href="/tax/tds-returns" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search returns..." className="pl-9" />
              </div>
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <Button variant="outline">All Quarters <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">FY 2025-26 <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Deductors <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline"><Filter className="size-4" /> Filter</Button>
                <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Form</th>
                    <th className="pb-2 font-medium">Quarter</th>
                    <th className="pb-2 font-medium">Financial Year</th>
                    <th className="pb-2 font-medium">Due Date</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 text-right font-medium">Deductees</th>
                    <th className="pb-2 text-right font-medium">Tax Amount</th>
                    <th className="pb-2 font-medium">Challan</th>
                    <th className="pb-2 font-medium">Filed On</th>
                    <th className="pb-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {returns.map((r, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3"><Badge variant={formColors[r.form]}>{r.form}</Badge></td>
                      <td className="py-3 text-foreground">{r.quarter}</td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{r.fy}</td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{r.due}</td>
                      <td className="py-3"><StatusBadge status={r.status} /></td>
                      <td className="py-3 text-right text-foreground">{r.deductees ?? "–"}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{r.tax ? inr(r.tax) : "–"}</td>
                      <td className="py-3"><Badge variant={r.challan === "Mapped" ? "success" : r.challan === "Pending" ? "warning" : "secondary"}>{r.challan}</Badge></td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{r.filed}</td>
                      <td className="py-3">
                        <Button size="sm" variant={r.action === "View" ? "outline" : "default"}>{r.action}</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 10 of 24 returns</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((p) => (
                  <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>TDS Summary</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={summary} total={inr(1842750)} totalLabel="Total TDS" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground truncate text-xs">{s.name}</span>
                    <span className="ml-auto text-xs font-medium whitespace-nowrap text-foreground">{inr(s.value)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Compliance Score</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={[{ name: "Complete", value: 94, color: "var(--color-chart-2)" }, { name: "Remaining", value: 6, color: "var(--color-muted)" }]} total="94%" size={130} />
              <ul className="w-full text-sm">
                {compliance.map((c) => (
                  <li key={c.label} className="flex items-center gap-2 py-1">
                    <CheckCircle2 className="text-success-foreground size-4" />
                    <span className="text-foreground">{c.label}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Upcoming Due Dates</CardTitle>
              <a href="/tax/tds-returns" className="text-primary text-sm font-medium">View all</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {dueDates.map((d, i) => (
                <div key={i} className="flex gap-3">
                  <div className="bg-purple-bg text-purple-foreground flex size-11 shrink-0 flex-col items-center justify-center rounded-lg text-xs leading-none font-bold">
                    <span className="text-sm">{d.date.split(" ")[0]}</span>
                    <span>{d.date.split(" ")[1]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{d.label}</p>
                  </div>
                  <span className="text-destructive text-xs font-medium whitespace-nowrap">{d.tag}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 pb-3">
              {quickActions.map((a) => (
                <button key={a.label} className="hover:bg-muted flex items-center gap-2 rounded-lg px-2 py-2 text-left text-xs font-medium text-foreground transition-colors">
                  <a.icon className="size-4 shrink-0" /> {a.label}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
