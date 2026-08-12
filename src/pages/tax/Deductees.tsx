import { Users2, UserPlus, ArrowLeftRight, FileText, ShieldAlert, Search, ChevronDown, Filter, Calendar, Upload, Download } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewDeducteeDialog } from "@/components/shared/TaxDialogs"
import { inr, MASKED } from "@/lib/format"

const stats = [
  { icon: Users2, label: "Total Deductees", value: "1,245", sub: "Active deductees", link: "View all", color: "green" as const },
  { icon: UserPlus, label: "New This FY", value: "186", sub: "Added in FY 2025-26", link: "View new", color: "blue" as const },
  { icon: ArrowLeftRight, label: "Transactions This FY", value: "2,845", sub: "With TDS transactions", link: "View details", color: "orange" as const },
  { icon: FileText, label: "Total TDS Deducted", value: inr(1842750, { decimals: true }), sub: "Current FY", link: "View summary", color: "purple" as const },
  { icon: ShieldAlert, label: "PAN Not Verified", value: "78", sub: "Needs verification", link: "Verify now", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const catColors: Record<string, "purple" | "info" | "warning" | "success"> = {
  "Professional Fees (194J)": "purple",
  "Contract (194C)": "info",
  "Rent (194I)": "warning",
  "Salary (192)": "success",
}

const deductees = [
  { name: "Rajesh Agarwal", pan: "AAGPA1234A", cat: "Professional Fees (194J)", state: "Maharashtra", status: "Active", verified: true, txns: 24, tds: 245000 },
  { name: "Innovative Infotech Pvt. Ltd.", pan: "AAACI5678B", cat: "Contract (194C)", state: "Karnataka", status: "Active", verified: true, txns: 18, tds: 185500 },
  { name: "Global Solutions Ltd.", pan: "AAGCG2345C", cat: "Contract (194C)", state: "Delhi", status: "Active", verified: true, txns: 31, tds: 295750 },
  { name: "Pooja Mehta", pan: "ABCPM6789D", cat: "Rent (194I)", state: "Gujarat", status: "Active", verified: true, txns: 12, tds: 75000 },
  { name: "Sunil Reddy", pan: "AASPR1234E", cat: "Salary (192)", state: "Telangana", status: "Active", verified: true, txns: 36, tds: 320000 },
  { name: "Vertex Consultancy", pan: "AAECV5678F", cat: "Professional Fees (194J)", state: "Maharashtra", status: "Active", verified: false, pending: true, txns: 9, tds: 60500 },
  { name: "Amit Kumar", pan: "AALPK9012G", cat: "Rent (194I)", state: "Uttar Pradesh", status: "Active", verified: false, txns: 6, tds: 45000 },
  { name: "HB Enterprises", pan: "AAHFB3456H", cat: "Contract (194C)", state: "Punjab", status: "Inactive", verified: true, txns: 0, tds: 0 },
  { name: "TechSolve India Pvt. Ltd.", pan: "AATCT6789I", cat: "Contract (194C)", state: "Tamil Nadu", status: "Active", verified: false, pending: true, txns: 14, tds: 115750 },
  { name: "Neha Kapoor", pan: "AANKK2345J", cat: "Salary (192)", state: "Delhi", status: "Active", verified: false, txns: 8, tds: 50000 },
]

const byCategory = [
  { name: "Contract (194C)", value: 725250, color: "var(--color-chart-2)" },
  { name: "Professional (194J)", value: 485500, color: "var(--color-chart-1)" },
  { name: "Salary (192)", value: 320000, color: "var(--color-chart-4)" },
  { name: "Rent (194I)", value: 211000, color: "var(--color-chart-3)" },
  { name: "Others", value: 101000, color: "var(--color-muted-foreground)" },
]

const panSummary = [
  { name: "Verified", value: 1167, color: "var(--color-chart-2)" },
  { name: "Pending", value: 37, color: "var(--color-chart-3)" },
  { name: "Not Verified", value: 78, color: "var(--color-chart-5)" },
]

const topDeductees = [
  { name: "Global Solutions Ltd.", amount: 295750 },
  { name: "Sunil Reddy", amount: 320000 },
  { name: "Rajesh Agarwal", amount: 245000 },
  { name: "Innovative Infotech Pvt. Ltd.", amount: 185500 },
  { name: "TechSolve India Pvt. Ltd.", amount: 115750 },
]

const quickActions = ["Import Deductees", "PAN Verification", "Download Deductees", "Deductee Analytics"]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export function Deductees() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "Deductees" }]}
        title="Deductees"
        description="Manage and view all your TDS deductees and their transaction details."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import Deductees</Button>
            <NewDeducteeDialog>
              <DialogTrigger asChild>
                <Button>+ New Deductee</Button>
              </DialogTrigger>
            </NewDeducteeDialog>
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
                <a href="/tax/tds/deductees" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search deductees..." className="pl-9" />
                </div>
                <div className="flex flex-wrap gap-2 sm:ml-auto">
                  <Button variant="outline">All Category <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All States <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline"><Filter className="size-4" /> Filter</Button>
                  <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Deductee Name</th>
                      <th className="pb-2 font-medium">PAN</th>
                      <th className="pb-2 font-medium">TDS Category</th>
                      <th className="pb-2 font-medium">State</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">PAN Verification</th>
                      <th className="pb-2 text-right font-medium">Total Transactions</th>
                      <th className="pb-2 text-right font-medium">TDS Deducted (FY)</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deductees.map((d) => (
                      <tr key={d.pan} className="border-b last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar className="size-8"><AvatarFallback className="bg-success-bg text-success-foreground text-xs">{initials(d.name)}</AvatarFallback></Avatar>
                            <span className="font-medium whitespace-nowrap text-foreground">{d.name}</span>
                          </div>
                        </td>
                        <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{MASKED}</td>
                        <td className="py-3"><Badge variant={catColors[d.cat]}>{d.cat}</Badge></td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{d.state}</td>
                        <td className="py-3"><StatusBadge status={d.status} /></td>
                        <td className="py-3"><StatusBadge status={d.pending ? "Pending" : d.verified ? "Verified" : "Not Verified"} /></td>
                        <td className="py-3 text-right text-foreground">{d.txns}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(d.tds)}</td>
                        <td className="py-3">
                          <Button size="sm" variant="outline" className="gap-1">View <ChevronDown className="size-3.5" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 10 of 1,245 deductees</span>
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
            <CardHeader><CardTitle>TDS Deduction by Category</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={byCategory} total={inr(1842750)} totalLabel="Total TDS" size={140} />
              <ul className="w-full text-sm">
                {byCategory.map((c) => (
                  <li key={c.name} className="flex items-center gap-2 py-0.5">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className="text-muted-foreground flex-1 truncate text-xs">{c.name}</span>
                    <span className="text-xs font-medium whitespace-nowrap text-foreground">{inr(c.value)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>PAN Verification Summary</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={panSummary} total="1,245" totalLabel="Total" size={140} />
              <ul className="w-full text-sm">
                {panSummary.map((p) => (
                  <li key={p.name} className="flex items-center gap-2 py-0.5">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: p.color }} />
                    <span className="text-muted-foreground flex-1 truncate text-xs">{p.name}</span>
                    <span className="text-xs font-medium whitespace-nowrap text-foreground">{p.value}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Top 5 Deductees <span className="text-muted-foreground text-xs font-normal">(By TDS)</span></CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5">
              {topDeductees.map((d, i) => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{i + 1}. {d.name}</span>
                  <span className="font-medium whitespace-nowrap text-foreground">{inr(d.amount)}</span>
                </div>
              ))}
              <a href="/tax/tds/deductees" className="text-primary mt-1 text-sm font-medium">View all deductees →</a>
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
