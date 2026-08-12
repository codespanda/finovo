import { useMemo, useState } from "react"
import { CheckCircle2, Wallet, Hourglass, Ban, Search, Filter, Settings2, Download, ChevronDown, FileText, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MultiBarLineChart, DonutChart, DonutLegend } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewReportDialog } from "@/components/shared/EntityDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: CheckCircle2, label: "Total Expenses", value: inr(1245780, { decimals: true }), delta: "18.6%", color: "blue" as const },
  { icon: Wallet, label: "Total Reimbursed", value: inr(963250, { decimals: true }), delta: "14.3%", color: "green" as const },
  { icon: Hourglass, label: "Pending Approval", value: inr(189430, { decimals: true }), delta: "6.2%", positive: false, color: "orange" as const },
  { icon: Ban, label: "Unreimbursed", value: inr(92100, { decimals: true }), delta: "3.8%", positive: false, color: "red" as const },
]

const colorMap: Record<string, string> = {
  blue: "bg-info-bg text-info-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const trend = [
  { m: "Jun 2024", expenses: 850000, reimbursed: 650000, claims: 42 },
  { m: "Jul 2024", expenses: 920000, reimbursed: 720000, claims: 48 },
  { m: "Aug 2024", expenses: 780000, reimbursed: 600000, claims: 38 },
  { m: "Sep 2024", expenses: 890000, reimbursed: 680000, claims: 45 },
  { m: "Oct 2024", expenses: 1050000, reimbursed: 820000, claims: 58 },
  { m: "Nov 2024", expenses: 760000, reimbursed: 590000, claims: 36 },
  { m: "Dec 2024", expenses: 880000, reimbursed: 690000, claims: 44 },
  { m: "Jan 2025", expenses: 940000, reimbursed: 710000, claims: 46 },
  { m: "Feb 2025", expenses: 870000, reimbursed: 660000, claims: 41 },
  { m: "Mar 2025", expenses: 960000, reimbursed: 730000, claims: 47 },
  { m: "Apr 2025", expenses: 900000, reimbursed: 700000, claims: 43 },
  { m: "May 2025", expenses: 1245780, reimbursed: 963250, claims: 28 },
]

const byCategory = [
  { name: "Travel", value: 17.1, color: "var(--color-chart-1)" },
  { name: "Meals & Entertainment", value: 14.3, color: "var(--color-chart-2)" },
  { name: "Software & Subscriptions", value: 12.3, color: "var(--color-chart-4)" },
  { name: "Transport", value: 7.9, color: "var(--color-chart-3)" },
  { name: "Office Supplies", value: 7.0, color: "var(--color-chart-5)" },
  { name: "Others", value: 41.4, color: "var(--color-muted-foreground)" },
]

const reports = [
  { name: "Expense Summary", desc: "Summary of all expenses", group: "Overall", period: "01 May - 31 May 2025", total: 1245780, reimbursed: 963250, claims: 28, generated: "31 May 2025, 10:30 AM" },
  { name: "Employee Expense Report", desc: "Expenses report by employee", group: "Employee", period: "01 May - 31 May 2025", total: 1245780, reimbursed: 963250, claims: 28, generated: "31 May 2025, 10:25 AM" },
  { name: "Category Wise Report", desc: "Expenses grouped by category", group: "Category", period: "01 May - 31 May 2025", total: 1245780, reimbursed: 963250, claims: 28, generated: "31 May 2025, 10:20 AM" },
  { name: "Tax Summary Report", desc: "Taxable & non-taxable summary", group: "Tax", period: "01 May - 31 May 2025", total: 1245780, reimbursed: null, claims: 28, generated: "31 May 2025, 10:15 AM" },
  { name: "Reimbursement Report", desc: "Reimbursed vs unreimbursed", group: "Reimbursement", period: "01 May - 31 May 2025", total: 1245780, reimbursed: 963250, claims: 28, generated: "31 May 2025, 10:10 AM" },
]

const quickLinks = [
  { icon: FileText, label: "Expense Summary", sub: "Summary of all expenses" },
  { icon: FileText, label: "Employee Expense Report", sub: "Expenses report by employee" },
  { icon: FileText, label: "Category Wise Report", sub: "Expenses grouped by category" },
  { icon: FileText, label: "Tax Summary Report", sub: "Taxable & non-taxable summary" },
  { icon: FileText, label: "Reimbursement Report", sub: "Reimbursed vs unreimbursed" },
]

const insights = [
  { icon: TrendingUp, text: "Travel expenses increased by 17.1% compared to last month.", color: "text-success-foreground" },
  { icon: AlertTriangle, text: "2 departments have 20% higher expenses than last month.", color: "text-destructive" },
  { icon: TrendingDown, text: "₹92,100 in expenses are not yet reimbursed.", color: "text-warning-foreground" },
]

const reportTabGroups: Record<string, string | null | true> = {
  overview: true,
  category: "Category",
  employee: "Employee",
  department: null,
  project: null,
  purpose: null,
  location: null,
  tax: "Tax",
}

export function ExpenseReports() {
  const [tab, setTab] = useState("overview")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const group = reportTabGroups[tab]
    return reports.filter((r) => {
      const matchesTab = group === true ? true : group === null ? false : r.group === group
      const matchesQuery = !q || r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Reports", href: "/reports" }, { label: "Expense Reports" }]}
        title="Expense Reports"
        description="Analyze and track your business expenses with insightful reports."
        actions={
          <>
            <Button variant="outline">Schedule Report</Button>
            <Button variant="outline"><Download className="size-4" /> Export <ChevronDown className="size-3.5" /></Button>
            <NewReportDialog>
              <DialogTrigger asChild>
                <Button>+ New Report</Button>
              </DialogTrigger>
            </NewReportDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Card className="cursor-pointer justify-center gap-1 p-4">
          <div className="flex items-center gap-2">
            <div className="bg-purple-bg text-purple-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
              <FileText className="size-4" />
            </div>
            <div className="min-w-0">
              <p className="text-muted-foreground text-xs font-medium">This Month</p>
              <p className="truncate text-sm font-semibold text-foreground">01 May - 31 May 2025</p>
            </div>
            <ChevronDown className="text-muted-foreground ml-auto size-4 shrink-0" />
          </div>
        </Card>
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
            <p className={`text-xs font-medium ${s.positive === false ? "text-destructive" : "text-success-foreground"}`}>
              {s.positive === false ? "↓" : "↑"} {s.delta} vs Apr 2025
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <Card>
            <CardContent className="pt-5">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="category">By Category</TabsTrigger>
                  <TabsTrigger value="employee">By Employee</TabsTrigger>
                  <TabsTrigger value="department">By Department</TabsTrigger>
                  <TabsTrigger value="project">By Project</TabsTrigger>
                  <TabsTrigger value="purpose">By Purpose</TabsTrigger>
                  <TabsTrigger value="location">By Location</TabsTrigger>
                  <TabsTrigger value="tax">Tax Summary</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="mt-5 mb-3 flex items-center justify-between">
                <p className="font-semibold text-foreground">Expense Trend</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Monthly <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline" size="sm"><Settings2 className="size-3.5" /> Customize</Button>
                </div>
              </div>
              <MultiBarLineChart
                data={trend}
                xKey="m"
                bars={[
                  { key: "expenses", color: "var(--color-chart-1)", label: "Total Expenses (₹)" },
                  { key: "reimbursed", color: "var(--color-chart-2)", label: "Reimbursed (₹)" },
                ]}
                line={{ key: "claims", color: "var(--color-chart-4)", label: "No. of Claims" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>All Reports</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search reports..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <Button variant="outline" className="sm:ml-auto"><Filter className="size-4" /> Filters</Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Report Name</th>
                      <th className="pb-2 font-medium">Description</th>
                      <th className="pb-2 font-medium">Group By</th>
                      <th className="pb-2 font-medium">Period</th>
                      <th className="pb-2 text-right font-medium">Total Expenses (₹)</th>
                      <th className="pb-2 text-right font-medium">Total Reimbursed (₹)</th>
                      <th className="pb-2 text-right font-medium">Total Claims</th>
                      <th className="pb-2 font-medium">Generated On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r) => (
                      <tr key={r.name} className="border-b last:border-0">
                        <td className="text-primary py-3 font-medium whitespace-nowrap">{r.name}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.desc}</td>
                        <td className="py-3 text-foreground">{r.group}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.period}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(r.total, { decimals: true })}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{r.reimbursed ? inr(r.reimbursed, { decimals: true }) : "–"}</td>
                        <td className="py-3 text-right text-foreground">{r.claims}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.generated}</td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={8} className="text-muted-foreground py-8 text-center">No reports found for this filter.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing {filtered.length} of {reports.length} reports</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Expense by Category</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-4 pb-5">
              <DonutChart data={byCategory} total={inr(1245780)} totalLabel="Total Expenses" size={150} />
              <DonutLegend data={byCategory} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Reports Quick Links</CardTitle></CardHeader>
            <CardContent className="flex flex-col pb-3">
              {quickLinks.map((q) => (
                <button key={q.label} className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2.5 text-left transition-colors">
                  <div className="bg-info-bg text-info-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                    <q.icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{q.label}</p>
                    <p className="text-muted-foreground text-xs">{q.sub}</p>
                  </div>
                </button>
              ))}
              <a href="/reports/expenses" className="text-primary mt-2 text-sm font-medium">View All Reports →</a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Report Insights</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {insights.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <a.icon className={`size-4 shrink-0 ${a.color}`} />
                  <p className="text-foreground text-sm">{a.text}</p>
                </div>
              ))}
              <a href="/accounting" className="text-primary text-sm font-medium">View all insights →</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
