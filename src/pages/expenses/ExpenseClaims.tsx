import { useMemo, useState } from "react"
import { ClipboardList, Wallet, CheckCircle2, Clock, XCircle, Search, SlidersHorizontal, Download, ChevronDown, LayoutGrid } from "lucide-react"

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
  { icon: ClipboardList, label: "Total Claims", value: "28", sub: "This Month", color: "purple" as const },
  { icon: Wallet, label: "Total Claimed", value: inr(245780, { decimals: true }), sub: "This Month", color: "green" as const },
  { icon: CheckCircle2, label: "Approved Amount", value: inr(189430, { decimals: true }), sub: "This Month", color: "blue" as const },
  { icon: Clock, label: "Pending Approval", value: "7", sub: inr(56350, { decimals: true }), color: "orange" as const },
  { icon: XCircle, label: "Rejected", value: "2", sub: inr(8450, { decimals: true }), color: "red" as const },
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
  Meals: "success",
  Software: "purple",
  Transport: "warning",
  Training: "secondary",
  Marketing: "warning",
  Other: "secondary",
}

const claims = [
  { id: "EXP-00028", name: "Rahul Sharma", dept: "Marketing", purpose: "Client Meeting - Bangalore", cat: "Travel", date: "31 May 2025", amount: 8450, status: "Pending Approval", submitted: "31 May 2025" },
  { id: "EXP-00027", name: "Priya Nair", dept: "Sales", purpose: "Travel to Mumbai Office", cat: "Travel", date: "30 May 2025", amount: 15780, status: "Approved", submitted: "30 May 2025" },
  { id: "EXP-00026", name: "Amit Verma", dept: "Product", purpose: "Team Lunch", cat: "Meals", date: "29 May 2025", amount: 2350, status: "Paid", submitted: "29 May 2025" },
  { id: "EXP-00025", name: "Neha Kapoor", dept: "Design", purpose: "Software Purchase", cat: "Software", date: "28 May 2025", amount: 12500, status: "Approved", submitted: "28 May 2025" },
  { id: "EXP-00024", name: "Vikram Singh", dept: "Operations", purpose: "Local Conveyance", cat: "Transport", date: "27 May 2025", amount: 1250, status: "Paid", submitted: "27 May 2025" },
  { id: "EXP-00023", name: "Sneha Iyer", dept: "HR", purpose: "Workshop Registration", cat: "Training", date: "26 May 2025", amount: 6750, status: "Pending Approval", submitted: "26 May 2025" },
  { id: "EXP-00022", name: "Arjun Mehta", dept: "Marketing", purpose: "Ad Campaign Expenses", cat: "Marketing", date: "25 May 2025", amount: 22600, status: "Rejected", submitted: "25 May 2025" },
  { id: "EXP-00021", name: "Kavya Reddy", dept: "Finance", purpose: "Office Supplies", cat: "Other", date: "24 May 2025", amount: 950, status: "Paid", submitted: "24 May 2025" },
]

const overview = [
  { name: "Travel", value: 45.9, color: "var(--color-chart-1)" },
  { name: "Meals", value: 17.2, color: "var(--color-chart-2)" },
  { name: "Software", value: 10.2, color: "var(--color-chart-4)" },
  { name: "Marketing", value: 9.2, color: "var(--color-chart-3)" },
  { name: "Others", value: 17.3, color: "var(--color-muted-foreground)" },
]

const overviewAmounts: Record<string, number> = { Travel: 112780, Meals: 42350, Software: 25000, Marketing: 22600, Others: 42450 }

const topClaimants = [
  { name: "Rahul Sharma", amount: 45850 },
  { name: "Priya Nair", amount: 31560 },
  { name: "Amit Verma", amount: 28950 },
  { name: "Neha Kapoor", amount: 24850 },
  { name: "Vikram Singh", amount: 18400 },
]

const activity = [
  { text: "Expense claim EXP-00027 approved", sub: "By Meera Joshi on 30 May 2025", color: "text-success-foreground" },
  { text: "Expense claim EXP-00026 paid", sub: "Amount ₹2,350.00 on 29 May 2025", color: "text-success-foreground" },
  { text: "Expense claim EXP-00022 rejected", sub: "By Arjun Kapoor on 25 May 2025", color: "text-destructive" },
  { text: "New expense claim EXP-00028 submitted", sub: "By Rahul Sharma on 31 May 2025", color: "text-info-foreground" },
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

const claimTabs = [
  { value: "all", label: "All Claims" },
  { value: "pending", label: "Pending Approval" },
  { value: "approved", label: "Approved" },
  { value: "paid", label: "Paid" },
  { value: "rejected", label: "Rejected" },
  { value: "drafts", label: "Drafts" },
] as const

export function ExpenseClaims() {
  const [tab, setTab] = useState<(typeof claimTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return claims.filter((c) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "pending" ? c.status === "Pending Approval" :
        tab === "approved" ? c.status === "Approved" :
        tab === "paid" ? c.status === "Paid" :
        tab === "rejected" ? c.status === "Rejected" :
        tab === "drafts" ? c.status === "Draft" :
        true
      const matchesQuery = !q || c.id.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) || c.purpose.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Expenses" }, { label: "Expense Claims" }]}
        title="Expense Claims"
        description="Manage and track employee expense claims from submission to reimbursement."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Export</Button>
            <Button variant="outline">More Actions <ChevronDown className="size-3.5" /></Button>
            <NewExpenseClaimDialog>
              <DialogTrigger asChild>
                <Button>+ New Expense Claim</Button>
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
                {claimTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search claims by employee or purpose..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline">01 May 2025 - 31 May 2025</Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Claim Date</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="text-primary font-medium whitespace-nowrap">{c.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-8"><AvatarFallback className="bg-purple-bg text-purple-foreground">{initials(c.name)}</AvatarFallback></Avatar>
                        <div>
                          <p className="font-medium text-foreground">{c.name}</p>
                          <p className="text-muted-foreground text-xs">{c.dept}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-foreground whitespace-nowrap">{c.purpose}</p>
                      <Badge variant={catColors[c.cat]} className="mt-1">{c.cat}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{c.date}</TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{c.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell><StatusBadge status={c.status} /></TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{c.submitted}</TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">No claims found for this filter.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {claims.length} claims</span>
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
              <DonutChart data={overview} total={inr(245780)} totalLabel="Total Claimed" size={150} />
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
              <CardTitle>Top Claimants</CardTitle>
              <span className="text-muted-foreground text-xs">This Month</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {topClaimants.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <Avatar className="size-8"><AvatarFallback className="bg-purple-bg text-purple-foreground">{initials(c.name)}</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                    <div className="bg-muted mt-1 h-1 w-full overflow-hidden rounded-full">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${(c.amount / 45850) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold whitespace-nowrap text-foreground">{inr(c.amount, { decimals: true })}</span>
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
