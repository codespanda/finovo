import { useMemo, useState } from "react"
import { Wallet, ShieldCheck, HeartPulse, Percent, Receipt, Search, SlidersHorizontal, Download, ChevronDown } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DonutChart, DonutLegend } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const stats = [
  { icon: Wallet, label: "Total Statutory Deductions", value: inr(285600, { decimals: true }), sub: "May 2025", color: "purple" as const },
  { icon: ShieldCheck, label: "Provident Fund (PF)", value: inr(132450, { decimals: true }), sub: "Employer + Employee", color: "blue" as const },
  { icon: HeartPulse, label: "ESI Contribution", value: inr(48750, { decimals: true }), sub: "Employer + Employee", color: "green" as const },
  { icon: Percent, label: "Professional Tax", value: inr(22400, { decimals: true }), sub: "128 employees", color: "orange" as const },
  { icon: Receipt, label: "TDS Deducted", value: inr(81000, { decimals: true }), sub: "As per IT slab", color: "red" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  blue: "bg-info-bg text-info-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const rows = [
  { id: "EMP-1001", name: "Rahul Kapoor", dept: "Engineering", pf: 7200, esi: 650, pt: 200, tds: 15900, total: 23950, status: "Deducted" },
  { id: "EMP-1002", name: "Anjali Sharma", dept: "Marketing", pf: 6800, esi: 620, pt: 200, tds: 12500, total: 20120, status: "Deducted" },
  { id: "EMP-1003", name: "Priya Mehta", dept: "Finance", pf: 6200, esi: 590, pt: 200, tds: 9800, total: 16790, status: "Deducted" },
  { id: "EMP-1004", name: "Vikram Singh", dept: "Sales", pf: 5400, esi: 510, pt: 200, tds: 7200, total: 13310, status: "Pending" },
  { id: "EMP-1005", name: "Manish Gupta", dept: "Operations", pf: 5900, esi: 560, pt: 200, tds: 8100, total: 14760, status: "Deducted" },
  { id: "EMP-1006", name: "Sneha Shah", dept: "HR", pf: 4800, esi: 460, pt: 200, tds: 5600, total: 11060, status: "Deducted" },
  { id: "EMP-1007", name: "Amit Das", dept: "Engineering", pf: 6100, esi: 580, pt: 200, tds: 8900, total: 15780, status: "Deducted" },
  { id: "EMP-1008", name: "Neha Bansal", dept: "Finance", pf: 5300, esi: 500, pt: 200, tds: 6700, total: 12700, status: "Deducted" },
]

const breakdown = [
  { name: "Provident Fund (PF)", value: 46.4, color: "var(--color-chart-1)" },
  { name: "TDS", value: 28.4, color: "var(--color-chart-2)" },
  { name: "ESI", value: 17.1, color: "var(--color-chart-3)" },
  { name: "Professional Tax", value: 7.8, color: "var(--color-chart-4)" },
  { name: "Others", value: 0.3, color: "var(--color-muted-foreground)" },
]

const calendar = [
  { date: "07 Jun", label: "PF Payment (May 2025)", tag: "Due in 7 days" },
  { date: "15 Jun", label: "ESI Payment (May 2025)", tag: "Due in 15 days" },
  { date: "30 Jun", label: "Professional Tax (Q1 FY 25-26)", tag: "Due in 30 days" },
  { date: "07 Jul", label: "TDS Payment (June 2025)", tag: "Upcoming" },
]

const quickActions = ["Download PF Challan", "Download ESI Challan", "File TDS Return", "Professional Tax Report", "Compliance Calendar"]

const deductionTabs = [
  { value: "all", label: "All Employees" },
  { value: "pf", label: "PF & ESI" },
  { value: "pt", label: "Professional Tax" },
  { value: "tds", label: "TDS" },
] as const

export function PayrollTaxesDeductions() {
  const [tab, setTab] = useState<(typeof deductionTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((r) => !q || r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.dept.toLowerCase().includes(q))
  }, [query])

  const showPf = tab === "all" || tab === "pf"
  const showPt = tab === "all" || tab === "pt"
  const showTds = tab === "all" || tab === "tds"

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Payroll", href: "/payroll" }, { label: "Taxes & Deductions" }]}
        title="Taxes & Deductions"
        description="Manage statutory deductions, contributions and compliance across your organization."
        actions={
          <>
            <Button variant="outline">May 2025</Button>
            <Button variant="outline"><Download className="size-4" /> Export <ChevronDown className="size-3.5" /></Button>
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
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList>
                {deductionTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search employees..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <Button variant="outline" className="sm:ml-auto"><SlidersHorizontal className="size-4" /> Filters</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  {showPf && <TableHead className="text-right">PF (₹)</TableHead>}
                  {showPf && <TableHead className="text-right">ESI (₹)</TableHead>}
                  {showPt && <TableHead className="text-right">Prof. Tax (₹)</TableHead>}
                  {showTds && <TableHead className="text-right">TDS (₹)</TableHead>}
                  <TableHead className="text-right">Total (₹)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>
                      <p className="font-medium whitespace-nowrap text-foreground">{r.name}</p>
                      <p className="text-muted-foreground text-xs">{r.id} • {r.dept}</p>
                    </TableCell>
                    {showPf && <TableCell className="text-right whitespace-nowrap text-foreground">{inr(r.pf, { decimals: true })}</TableCell>}
                    {showPf && <TableCell className="text-right whitespace-nowrap text-foreground">{inr(r.esi, { decimals: true })}</TableCell>}
                    {showPt && <TableCell className="text-right whitespace-nowrap text-foreground">{inr(r.pt, { decimals: true })}</TableCell>}
                    {showTds && <TableCell className="text-right whitespace-nowrap text-foreground">{inr(r.tds, { decimals: true })}</TableCell>}
                    <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{inr(r.total, { decimals: true })}</TableCell>
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">No employees found for this search.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 text-sm">Showing {filtered.length} of {rows.length} employees</div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Deductions Breakdown</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-4 pb-5">
              <DonutChart data={breakdown} total={inr(285600)} totalLabel="Total" size={150} />
              <DonutLegend data={breakdown} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Compliance Calendar</CardTitle>
              <a href="/payroll/taxes" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {calendar.map((c) => (
                <div key={c.label} className="flex gap-3">
                  <div className="bg-info-bg text-info-foreground flex size-11 shrink-0 flex-col items-center justify-center rounded-lg text-xs leading-none font-bold">
                    <span className="text-sm">{c.date.split(" ")[0]}</span>
                    <span>{c.date.split(" ")[1]}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{c.label}</p>
                    <p className="text-warning-foreground text-xs font-medium">{c.tag}</p>
                  </div>
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
