import { useMemo, useState } from "react"
import { Gauge, Wallet, Clock, Ban, Search, SlidersHorizontal, LayoutGrid, ChevronDown } from "lucide-react"

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
import { AddMileageDialog } from "@/components/shared/PayrollExpenseDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: Gauge, label: "Total Mileage", value: "2,845.6 km", sub: "This Month", color: "purple" as const },
  { icon: Wallet, label: "Total Reimbursement", value: inr(42683.25, { decimals: true }), sub: "This Month", color: "green" as const },
  { icon: Clock, label: "Pending Approval", value: "327.4 km", sub: inr(4910.5, { decimals: true }), color: "orange" as const },
  { icon: Ban, label: "Unapproved", value: "156.2 km", sub: inr(2343, { decimals: true }), color: "red" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const catColors: Record<string, "info" | "success" | "purple" | "warning" | "danger" | "secondary"> = {
  Meeting: "info",
  Sales: "success",
  Meals: "purple",
  "Site Visit": "warning",
  Recruitment: "danger",
  Conference: "secondary",
  General: "secondary",
}

const entries = [
  { date: "31 May 2025", name: "Rahul Sharma", dept: "Marketing", purpose: "Client Meeting", cat: "Meeting", route: "Bangalore Office – Whitefield", km: 48.6, rate: 15, amount: 729, status: "Pending Approval" },
  { date: "30 May 2025", name: "Priya Nair", dept: "Sales", purpose: "Client Visit", cat: "Sales", route: "Bangalore Office – Electronic City", km: 32.4, rate: 15, amount: 486, status: "Approved" },
  { date: "29 May 2025", name: "Amit Verma", dept: "Product", purpose: "Team Lunch", cat: "Meals", route: "Bangalore Office – Indiranagar", km: 12.8, rate: 15, amount: 192, status: "Paid" },
  { date: "28 May 2025", name: "Neha Kapoor", dept: "Design", purpose: "Vendor Meeting", cat: "Meeting", route: "Bangalore Office – Marathahalli", km: 25.6, rate: 15, amount: 384, status: "Approved" },
  { date: "27 May 2025", name: "Vikram Singh", dept: "Operations", purpose: "Site Visit", cat: "Site Visit", route: "Bangalore Office – Hosur Road", km: 68.9, rate: 15, amount: 1033.5, status: "Pending Approval" },
  { date: "26 May 2025", name: "Sneha Iyer", dept: "HR", purpose: "Interview", cat: "Recruitment", route: "Bangalore Office – Koramangala", km: 18.7, rate: 15, amount: 280.5, status: "Rejected" },
  { date: "25 May 2025", name: "Arjun Mehta", dept: "Marketing", purpose: "Conference", cat: "Conference", route: "Bangalore Office – Airport Road", km: 41.2, rate: 15, amount: 618, status: "Paid" },
  { date: "24 May 2025", name: "Kavya Reddy", dept: "Finance", purpose: "Bank Visit", cat: "General", route: "Bangalore Office – MG Road", km: 8.3, rate: 15, amount: 124.5, status: "Approved" },
]

const overview = [
  { name: "Client Meeting", value: 32.1, color: "var(--color-chart-1)" },
  { name: "Sales & Visits", value: 24.7, color: "var(--color-chart-2)" },
  { name: "Site Visit", value: 18.2, color: "var(--color-chart-4)" },
  { name: "Team Lunch", value: 10.2, color: "var(--color-chart-3)" },
  { name: "Others", value: 14.4, color: "var(--color-muted-foreground)" },
]

const overviewKm: Record<string, number> = { "Client Meeting": 915.4, "Sales & Visits": 705.6, "Site Visit": 518.6, "Team Lunch": 301.2, "Others": 406.8 }

const quickActions = ["Add Mileage Entry", "Import Mileage", "Mileage Rates", "Download Mileage Report"]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

const mileageTabs = [
  { value: "all", label: "All Mileage" },
  { value: "pending", label: "Pending Approval" },
  { value: "approved", label: "Approved" },
  { value: "paid", label: "Paid" },
  { value: "rejected", label: "Rejected" },
] as const

export function Mileage() {
  const [tab, setTab] = useState<(typeof mileageTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return entries.filter((e) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "pending" ? e.status === "Pending Approval" :
        tab === "approved" ? e.status === "Approved" :
        tab === "paid" ? e.status === "Paid" :
        tab === "rejected" ? e.status === "Rejected" :
        true
      const matchesQuery = !q || e.name.toLowerCase().includes(q) || e.purpose.toLowerCase().includes(q) || e.route.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Expenses", href: "/expenses" }, { label: "Mileage" }]}
        title="Mileage"
        description="Track and manage business mileage for reimbursement."
        actions={
          <>
            <Button variant="outline">More Actions <ChevronDown className="size-3.5" /></Button>
            <AddMileageDialog>
              <DialogTrigger asChild>
                <Button>+ Add Mileage</Button>
              </DialogTrigger>
            </AddMileageDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
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
                {mileageTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search by employee, purpose or location..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
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
                  <TableHead>Date ↓</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>From – To</TableHead>
                  <TableHead className="text-right">Distance</TableHead>
                  <TableHead className="text-right">Rate / km</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{e.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-8"><AvatarFallback className="bg-purple-bg text-purple-foreground">{initials(e.name)}</AvatarFallback></Avatar>
                        <div>
                          <p className="font-medium whitespace-nowrap text-foreground">{e.name}</p>
                          <p className="text-muted-foreground text-xs">{e.dept}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-foreground whitespace-nowrap">{e.purpose}</p>
                      <Badge variant={catColors[e.cat]} className="mt-1">{e.cat}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] text-xs whitespace-normal">{e.route}</TableCell>
                    <TableCell className="text-right whitespace-nowrap text-foreground">{e.km} km</TableCell>
                    <TableCell className="text-muted-foreground text-right whitespace-nowrap">{inr(e.rate, { decimals: true })}</TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{inr(e.amount, { decimals: true })}</TableCell>
                    <TableCell><StatusBadge status={e.status} /></TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-muted-foreground py-8 text-center">No mileage entries found for this filter.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {entries.length} entries</span>
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
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Mileage Overview</CardTitle>
              <span className="text-muted-foreground text-xs">This Month</span>
            </CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={overview} total="2,845.6 km" totalLabel="Total Distance" size={150} />
              <ul className="flex flex-col gap-2 text-sm">
                {overview.map((c) => (
                  <li key={c.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className="text-muted-foreground truncate">{c.name}</span>
                    <span className="ml-auto font-medium whitespace-nowrap text-foreground">{c.value}% ({overviewKm[c.name]} km)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Reimbursement Summary</CardTitle>
              <span className="text-muted-foreground text-xs">This Month</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Mileage</span><span className="font-medium text-foreground">2,845.6 km</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Reimbursement</span><span className="font-medium text-foreground">{inr(42683.25, { decimals: true })}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Average Rate / km</span><span className="font-medium text-foreground">{inr(15, { decimals: true })}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Paid Amount</span><span className="text-success-foreground font-medium">{inr(23450.75, { decimals: true })}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Pending Amount</span><span className="text-warning-foreground font-medium">{inr(4910.5, { decimals: true })}</span></div>
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

          <Card>
            <CardHeader><CardTitle>Need Help?</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <p className="text-muted-foreground mb-3 text-sm">Learn how mileage tracking and reimbursement works.</p>
              <Button variant="outline" className="w-full">View Help Guide</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-5">
        <CardContent className="flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
          <p className="text-muted-foreground text-sm">Mileage rate used: {inr(15, { decimals: true })} per km (Effective from 01 Apr 2025)</p>
          <Button variant="outline" className="shrink-0">Manage Rates</Button>
        </CardContent>
      </Card>
    </div>
  )
}
