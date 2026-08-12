import { Building2, Lock, Users2, Building, ShieldCheck, Search, ChevronDown, Filter, Upload, Download } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MASKED } from "@/lib/format"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewDeductorDialog } from "@/components/shared/TaxDialogs"

const stats = [
  { icon: Building2, label: "Total Deductors", value: "352", sub: "Active deductors", link: "View all", color: "green" as const },
  { icon: Lock, label: "New This FY", value: "28", sub: "Added in FY 2025-26", link: "View new", color: "blue" as const },
  { icon: Users2, label: "In Transactions", value: "298", sub: "With TDS transactions", link: "View details", color: "orange" as const },
  { icon: Building, label: "Inactive Deductors", value: "12", sub: "Not used this FY", link: "View inactive", color: "purple" as const },
  { icon: ShieldCheck, label: "PAN Not Verified", value: "12", sub: "Needs verification", link: "Verify now", color: "green" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const catColors: Record<string, "purple" | "info" | "warning" | "success"> = {
  Company: "success",
  Firm: "purple",
  Individual: "warning",
}

const deductors = [
  { name: "ABC Solutions Pvt. Ltd.", pan: "AABCA1234A", cat: "Company", state: "Maharashtra", status: "Active", verified: true, txns: 24, last: "28 Apr 2025" },
  { name: "XYZ Technologies", pan: "AAHCX5678B", cat: "Company", state: "Karnataka", status: "Active", verified: true, txns: 18, last: "26 Apr 2025" },
  { name: "Global Services Ltd.", pan: "AAGCG2345C", cat: "Company", state: "Delhi", status: "Active", verified: true, txns: 31, last: "25 Apr 2025" },
  { name: "PQR Enterprises", pan: "AATFP6789D", cat: "Firm", state: "Gujarat", status: "Active", verified: true, txns: 9, last: "22 Apr 2025" },
  { name: "LMN Consultants", pan: "AAJFL3456E", cat: "Firm", state: "Maharashtra", status: "Active", verified: true, txns: 14, last: "20 Apr 2025" },
  { name: "Ramesh Traders", pan: "ABCPR9876F", cat: "Individual", state: "Rajasthan", status: "Active", verified: true, txns: 6, last: "18 Apr 2025" },
  { name: "Sunil Contractors", pan: "ABEPS1234G", cat: "Individual", state: "Uttar Pradesh", status: "Active", verified: false, txns: 3, last: "15 Apr 2025" },
  { name: "Sharma & Co.", pan: "AABFS5678H", cat: "Firm", state: "Punjab", status: "Inactive", verified: true, txns: 0, last: null },
  { name: "Kumar Associates", pan: "AAKFK9012K", cat: "Firm", state: "Delhi", status: "Inactive", verified: false, txns: 0, last: null },
  { name: "Mehta Enterprises", pan: "AABFM3456L", cat: "Company", state: "Gujarat", status: "Active", verified: false, txns: 2, last: "10 Apr 2025" },
]

const byCategory = [
  { name: "Company", value: 198, color: "var(--color-chart-2)" },
  { name: "Firm", value: 96, color: "var(--color-chart-1)" },
  { name: "Individual / HUF", value: 58, color: "var(--color-chart-4)" },
]

const panSummary = [
  { name: "Verified", value: 340, color: "var(--color-chart-2)" },
  { name: "Not Verified", value: 12, color: "var(--color-chart-5)" },
]

const byState = [
  { name: "Maharashtra", value: 98, pct: 27.84 },
  { name: "Delhi", value: 62, pct: 17.61 },
  { name: "Karnataka", value: 48, pct: 13.64 },
  { name: "Gujarat", value: 42, pct: 11.93 },
  { name: "Uttar Pradesh", value: 28, pct: 7.95 },
]

const quickActions = ["Import Deductors", "PAN Verification", "Download Deductors", "Deductor Analytics"]

export function Deductors() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "Deductors" }]}
        title="Deductors"
        description="Manage and view all your TDS deductors and their details."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import Deductors</Button>
            <NewDeductorDialog>
              <DialogTrigger asChild>
                <Button>+ New Deductor</Button>
              </DialogTrigger>
            </NewDeductorDialog>
            <Button variant="outline"><Download className="size-4" /> Download</Button>
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
                <a href="/tax/tds/deductors" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search deductors..." className="pl-9" />
                </div>
                <div className="flex flex-wrap gap-2 sm:ml-auto">
                  <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Category <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All States <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline"><Filter className="size-4" /> Filter</Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Deductor Name</th>
                      <th className="pb-2 font-medium">PAN</th>
                      <th className="pb-2 font-medium">TDS Category</th>
                      <th className="pb-2 font-medium">State</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">PAN Verification</th>
                      <th className="pb-2 text-right font-medium">Transactions</th>
                      <th className="pb-2 font-medium">Last Transaction</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deductors.map((d) => (
                      <tr key={d.pan} className="border-b last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
                              <Building2 className="size-4" />
                            </div>
                            <span className="font-medium whitespace-nowrap text-foreground">{d.name}</span>
                          </div>
                        </td>
                        <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{MASKED}</td>
                        <td className="py-3"><Badge variant={catColors[d.cat]}>{d.cat}</Badge></td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{d.state}</td>
                        <td className="py-3"><StatusBadge status={d.status} /></td>
                        <td className="py-3"><StatusBadge status={d.verified ? "Verified" : "Not Verified"} /></td>
                        <td className="py-3 text-right text-foreground">{d.txns}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{d.last ?? "—"}</td>
                        <td className="py-3">
                          <Button size="sm" variant="outline" className="gap-1">View <ChevronDown className="size-3.5" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 10 of 352 deductors</span>
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
            <CardHeader><CardTitle>Deductors by TDS Category</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={byCategory} total="352" totalLabel="Total" size={140} />
              <ul className="w-full text-sm">
                {byCategory.map((c) => (
                  <li key={c.name} className="flex items-center gap-2 py-0.5">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className="text-muted-foreground flex-1 truncate text-xs">{c.name}</span>
                    <span className="text-xs font-medium whitespace-nowrap text-foreground">{c.value} ({((c.value / 352) * 100).toFixed(2)}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>PAN Verification Summary</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={panSummary} total="340" totalLabel="Verified" size={140} />
              <ul className="w-full text-sm">
                {panSummary.map((p) => (
                  <li key={p.name} className="flex items-center gap-2 py-0.5">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: p.color }} />
                    <span className="text-muted-foreground flex-1 truncate text-xs">{p.name}</span>
                    <span className="text-xs font-medium whitespace-nowrap text-foreground">{p.value} ({((p.value / 352) * 100).toFixed(2)}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Deductors by State <span className="text-muted-foreground text-xs font-normal">(Top 5)</span></CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {byState.map((s) => (
                <div key={s.name} className="flex flex-col gap-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{s.name}</span>
                    <span className="text-muted-foreground text-xs">{s.value} ({s.pct}%)</span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
              <a href="/tax/tds/deductors" className="text-primary mt-1 text-sm font-medium">View all states →</a>
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
