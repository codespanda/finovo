import { useMemo, useState } from "react"
import { Wallet, ClipboardList, CheckCircle2, Clock, XCircle, Search, SlidersHorizontal, Download, ChevronDown } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewExpenseClaimDialog } from "@/components/shared/PayrollExpenseDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: ClipboardList, label: "Total Expenses", value: "34", sub: "Across all projects", color: "purple" as const },
  { icon: Wallet, label: "Total Spent", value: inr(486750, { decimals: true }), sub: "This Month", color: "green" as const },
  { icon: CheckCircle2, label: "Billable", value: inr(358200, { decimals: true }), sub: "73.60% of total", color: "blue" as const },
  { icon: Clock, label: "Pending Approval", value: "6", sub: inr(42850, { decimals: true }), color: "orange" as const },
  { icon: XCircle, label: "Non-Billable", value: inr(128550, { decimals: true }), sub: "26.40% of total", color: "red" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const catColors: Record<string, "info" | "purple" | "warning" | "success" | "secondary"> = {
  Travel: "info",
  Software: "purple",
  Materials: "warning",
  Contractor: "success",
  Other: "secondary",
}

const expenses = [
  { id: "PEX-00034", project: "Website Redesign", code: "PRJ-001", desc: "Stock photography license", cat: "Software", by: "Priya Nair", date: "31 May 2025", amount: 8450, billable: true, status: "Pending Approval" },
  { id: "PEX-00033", project: "Mobile App Launch", code: "PRJ-002", desc: "Client onsite visit - Mumbai", cat: "Travel", by: "Sneha Iyer", date: "30 May 2025", amount: 24500, billable: true, status: "Approved" },
  { id: "PEX-00032", project: "Inventory System", code: "PRJ-003", desc: "Server rack components", cat: "Materials", by: "Amit Verma", date: "29 May 2025", amount: 36200, billable: false, status: "Paid" },
  { id: "PEX-00031", project: "Website Redesign", code: "PRJ-001", desc: "Freelance illustrator", cat: "Contractor", by: "Karan Mehta", date: "28 May 2025", amount: 18000, billable: true, status: "Approved" },
  { id: "PEX-00030", project: "Q3 Marketing Campaign", code: "PRJ-004", desc: "Ad platform subscription", cat: "Software", by: "Rohit Sharma", date: "27 May 2025", amount: 12750, billable: false, status: "Paid" },
  { id: "PEX-00029", project: "Mobile App Launch", code: "PRJ-002", desc: "Beta tester incentives", cat: "Other", by: "Vikram Singh", date: "26 May 2025", amount: 6300, billable: true, status: "Rejected" },
  { id: "PEX-00028", project: "Inventory System", code: "PRJ-003", desc: "QA contractor - 2 weeks", cat: "Contractor", by: "Neha Joshi", date: "25 May 2025", amount: 42000, billable: true, status: "Pending Approval" },
  { id: "PEX-00027", project: "Website Redesign", code: "PRJ-001", desc: "Client review lunch", cat: "Travel", by: "Priya Nair", date: "24 May 2025", amount: 3250, billable: false, status: "Paid" },
]

const overview = [
  { name: "Contractor", value: 34.5, color: "var(--color-chart-1)" },
  { name: "Travel", value: 24.2, color: "var(--color-chart-2)" },
  { name: "Materials", value: 18.6, color: "var(--color-chart-3)" },
  { name: "Software", value: 14.2, color: "var(--color-chart-4)" },
  { name: "Other", value: 8.5, color: "var(--color-muted-foreground)" },
]

const overviewAmounts: Record<string, number> = { Contractor: 167850, Travel: 117750, Materials: 90480, Software: 69060, Other: 41610 }

const byProject = [
  { name: "Website Redesign (PRJ-001)", amount: 148600 },
  { name: "Inventory System (PRJ-003)", amount: 132400 },
  { name: "Mobile App Launch (PRJ-002)", amount: 108500 },
  { name: "Q3 Marketing Campaign (PRJ-004)", amount: 97250 },
]

const activity = [
  { text: "Expense PEX-00033 approved", sub: "Mobile App Launch — ₹24,500.00", color: "text-success-foreground" },
  { text: "Expense PEX-00032 paid", sub: "Inventory System — ₹36,200.00", color: "text-success-foreground" },
  { text: "Expense PEX-00029 rejected", sub: "Mobile App Launch — Not project related", color: "text-destructive" },
  { text: "New expense PEX-00034 submitted", sub: "By Priya Nair, Website Redesign", color: "text-info-foreground" },
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

const expenseTabs = [
  { value: "all", label: "All Expenses" },
  { value: "pending", label: "Pending Approval" },
  { value: "approved", label: "Approved" },
  { value: "billable", label: "Billable" },
  { value: "paid", label: "Paid" },
] as const

export function ProjectExpenses() {
  const [tab, setTab] = useState<(typeof expenseTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return expenses.filter((e) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "pending" ? e.status === "Pending Approval" :
        tab === "approved" ? e.status === "Approved" :
        tab === "billable" ? e.billable :
        tab === "paid" ? e.status === "Paid" :
        true
      const matchesQuery = !q || e.id.toLowerCase().includes(q) || e.project.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Projects", href: "/projects" }, { label: "Expenses" }]}
        title="Project Expenses"
        description="Track and bill project-related expenses across all your projects."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Export</Button>
            <Button variant="outline">More Actions <ChevronDown className="size-3.5" /></Button>
            <NewExpenseClaimDialog>
              <DialogTrigger asChild>
                <Button>+ New Expense</Button>
              </DialogTrigger>
            </NewExpenseClaimDialog>
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
                {expenseTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search expenses by project or description..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline">All Projects <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense ID</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Billable</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="text-primary font-medium whitespace-nowrap">{e.id}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <p className="text-foreground">{e.project}</p>
                      <p className="text-muted-foreground text-xs">{e.code}</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-foreground whitespace-nowrap">{e.desc}</p>
                      <Badge variant={catColors[e.cat]} className="mt-1">{e.cat}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6"><AvatarFallback className="bg-purple-bg text-purple-foreground text-[10px]">{initials(e.by)}</AvatarFallback></Avatar>
                        <span className="text-xs whitespace-nowrap text-foreground">{e.by}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{e.date}</TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{inr(e.amount)}</TableCell>
                    <TableCell>
                      <Badge variant={e.billable ? "success" : "secondary"}>{e.billable ? "Billable" : "Non-Billable"}</Badge>
                    </TableCell>
                    <TableCell><StatusBadge status={e.status} /></TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-muted-foreground py-8 text-center">No expenses found for this filter.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {expenses.length} expenses</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((p) => (
                  <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Expense Overview</CardTitle>
              <span className="text-muted-foreground text-xs">This Month</span>
            </CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={overview} total={inr(486750)} totalLabel="Total Spent" size={150} />
              <ul className="flex flex-col gap-2 text-sm">
                {overview.map((c) => (
                  <li key={c.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className="text-muted-foreground">{c.name}</span>
                    <span className="font-medium text-foreground">{inr(overviewAmounts[c.name])} ({c.value}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Spend by Project</CardTitle>
              <span className="text-muted-foreground text-xs">This Month</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {byProject.map((p) => (
                <div key={p.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="truncate text-foreground">{p.name}</span>
                    <span className="text-muted-foreground shrink-0 whitespace-nowrap">{inr(p.amount, { decimals: true })}</span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${(p.amount / 148600) * 100}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Activity</CardTitle>
              <a href="/accounting" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full bg-current ${a.color}`} />
                  <div className="min-w-0">
                    <p className="text-foreground text-sm">{a.text}</p>
                    <p className="text-muted-foreground text-xs">{a.sub}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
