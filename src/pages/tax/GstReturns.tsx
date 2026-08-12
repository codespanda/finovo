import { FileWarning, CheckCircle2, Hourglass, IndianRupee, Wallet, Search, ChevronDown, Filter, Calendar, ExternalLink } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewGstReturnDialog } from "@/components/shared/TaxDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: FileWarning, label: "Returns Due", value: "3", sub: "Total returns", link: "View due returns", color: "red" as const },
  { icon: CheckCircle2, label: "Filed Returns", value: "28", sub: "This Financial Year", link: "View filed returns", color: "green" as const },
  { icon: Hourglass, label: "Pending Returns", value: "1", sub: "Awaiting action", link: "View pending", color: "orange" as const },
  { icon: IndianRupee, label: "Late Fees Payable", value: inr(2450, { decimals: true }), sub: "Total amount", link: "View details", color: "purple" as const },
  { icon: Wallet, label: "ITC Available", value: inr(128650, { decimals: true }), sub: "As on today", link: "View ITC summary", color: "blue" as const },
]

const colorMap: Record<string, string> = {
  red: "bg-danger-bg text-danger-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  blue: "bg-info-bg text-info-foreground",
}

const typeColors: Record<string, "info" | "success" | "purple" | "danger"> = {
  "GSTR-1": "info",
  "GSTR-3B": "success",
  "GSTR-9": "purple",
  "GSTR-9C": "purple",
  "GSTR-4": "danger",
}

const returns = [
  { type: "GSTR-1", period: "Apr 2025", due: "11 May 2025", status: "Filed", filed: "10 May 2025", arn: "AA1104250001234", fees: 0, action: "View" },
  { type: "GSTR-3B", period: "Apr 2025", due: "20 May 2025", status: "Filed", filed: "19 May 2025", arn: "AA2005250005678", fees: 0, action: "View" },
  { type: "GSTR-9", period: "FY 2024-25", due: "31 Dec 2025", status: "Not Due", filed: "–", arn: "–", fees: 0, action: "Prepare" },
  { type: "GSTR-1", period: "May 2025", due: "11 Jun 2025", status: "Due Soon", filed: "–", arn: "–", fees: 0, action: "Prepare" },
  { type: "GSTR-3B", period: "May 2025", due: "20 Jun 2025", status: "Due Soon", filed: "–", arn: "–", fees: 0, action: "Prepare" },
  { type: "GSTR-4", period: "Q1 (Apr-Jun) 2025", due: "18 Jul 2025", status: "Not Due", filed: "–", arn: "–", fees: 0, action: "Prepare" },
  { type: "GSTR-1", period: "Mar 2025", due: "11 Apr 2025", status: "Filed", filed: "09 Apr 2025", arn: "AA0904250009876", fees: 0, action: "View" },
  { type: "GSTR-3B", period: "Mar 2025", due: "20 Apr 2025", status: "Filed", filed: "18 Apr 2025", arn: "AA1804250006543", fees: 0, action: "View" },
  { type: "GSTR-9C", period: "FY 2023-24", due: "31 Dec 2024", status: "Filed", filed: "28 Dec 2024", arn: "AA2812240004321", fees: 0, action: "View" },
  { type: "GSTR-9", period: "FY 2023-24", due: "31 Dec 2024", status: "Filed", filed: "27 Dec 2024", arn: "AA2712240001111", fees: 0, action: "View" },
]

const gstSummary = [
  { name: "Taxable Sales", value: 980000, color: "var(--color-chart-2)" },
  { name: "Exempt Sales", value: 110000, color: "var(--color-chart-1)" },
  { name: "Nil Rated Sales", value: 95000, color: "var(--color-chart-3)" },
  { name: "Non-GST Sales", value: 100450, color: "var(--color-chart-4)" },
]

const itc = [
  { label: "ITC Available", value: 128650, color: "text-foreground" },
  { label: "ITC Utilized", value: 485200, color: "text-foreground" },
  { label: "ITC Reversed", value: 35750, color: "text-destructive" },
]

const dueDates = [
  { date: "11 JUN", label: "GSTR-1 (May 2025)", tag: "Due in 7 days" },
  { date: "20 JUN", label: "GSTR-3B (May 2025)", tag: "Due in 16 days" },
  { date: "18 JUL", label: "GSTR-4 (Q1 2025-26)", tag: "Due in 44 days" },
]

const quickActions = ["New GSTR-1", "New GSTR-3B", "ITC Reconciliation", "Returns History", "GST Payments", "Configuration"]

export function GstReturns() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "GST", href: "/tax/gst" }, { label: "GSTR Returns" }]}
        title="GSTR Returns"
        description="File and manage your GST returns, view filing history and track compliance."
        actions={
          <>
            <Button variant="outline"><ExternalLink className="size-4" /> GST Portal</Button>
            <NewGstReturnDialog>
              <DialogTrigger asChild>
                <Button>+ New Return</Button>
              </DialogTrigger>
            </NewGstReturnDialog>
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
            <a href="/tax/gst/returns" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
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
                <Button variant="outline">All Return Types <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Periods <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline"><Filter className="size-4" /> Filter</Button>
                <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Return Type</th>
                    <th className="pb-2 font-medium">Tax Period</th>
                    <th className="pb-2 font-medium">Due Date</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Filed On</th>
                    <th className="pb-2 font-medium">ARN / Reference No.</th>
                    <th className="pb-2 text-right font-medium">Late Fees</th>
                    <th className="pb-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {returns.map((r, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3"><Badge variant={typeColors[r.type]}>{r.type}</Badge></td>
                      <td className="py-3 whitespace-nowrap text-foreground">{r.period}</td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{r.due}</td>
                      <td className="py-3"><StatusBadge status={r.status} /></td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{r.filed}</td>
                      <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{r.arn}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(r.fees, { decimals: false })}</td>
                      <td className="py-3">
                        <Button size="sm" variant={r.action === "View" ? "outline" : "default"}>{r.action}</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 10 of 32 returns</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((p) => (
                    <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>GST Summary</CardTitle>
              <span className="text-muted-foreground text-xs">01 Apr 2024 - 31 Mar 2025</span>
            </CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={gstSummary} total={inr(1285450)} totalLabel="Total Turnover" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {gstSummary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground truncate">{s.name}</span>
                    <span className="ml-auto font-medium whitespace-nowrap text-foreground">{inr(s.value)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>ITC Summary <span className="text-muted-foreground text-xs font-normal">(As on today)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              {itc.map((i) => (
                <div key={i.label} className="flex justify-between">
                  <span className="text-muted-foreground">{i.label}</span>
                  <span className={`font-medium ${i.color}`}>{inr(i.value)}</span>
                </div>
              ))}
              <div className="text-success-foreground mt-1 flex justify-between border-t pt-2 font-semibold">
                <span>Net ITC Balance</span><span>{inr(128650)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Upcoming Due Dates</CardTitle>
              <a href="/tax/gst/returns" className="text-primary text-sm font-medium">View all</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {dueDates.map((d) => (
                <div key={d.label} className="flex gap-3">
                  <div className="bg-info-bg text-info-foreground flex size-11 shrink-0 flex-col items-center justify-center rounded-lg text-xs leading-none font-bold">
                    <span className="text-sm">{d.date.split(" ")[0]}</span>
                    <span>{d.date.split(" ")[1]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{d.label}</p>
                  </div>
                  <span className="text-warning-foreground text-xs font-medium whitespace-nowrap">{d.tag}</span>
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
