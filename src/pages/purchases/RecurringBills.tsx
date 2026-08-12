import {
  Repeat,
  CheckCircle2,
  CalendarClock,
  AlertTriangle,
  PauseCircle,
  CheckCheck,
  Search,
  SlidersHorizontal,
  Download,
  ChevronDown,
  Wifi,
  Cloud,
  Shield,
  Home,
  Zap,
  Phone,
  Image,
  Wrench,
  PhoneCall,
  Umbrella,
} from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewRecurringBillDialog } from "@/components/shared/TransactionDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: Repeat, label: "Total Recurring Bills", value: "34", sub: "All Active", color: "purple" as const },
  { icon: CheckCircle2, label: "Total Monthly Value", value: inr(675400), sub: "Across 34 bills", color: "green" as const },
  { icon: CalendarClock, label: "Next 30 Days", value: inr(245800), sub: "10 bills", color: "blue" as const },
  { icon: AlertTriangle, label: "Overdue", value: inr(35600), sub: "2 bills", color: "red" as const },
  { icon: PauseCircle, label: "Paused", value: "3", sub: "Bills paused", color: "orange" as const },
  { icon: CheckCheck, label: "Completed (This Month)", value: inr(392200), sub: "12 bills", color: "green" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  red: "bg-danger-bg text-danger-foreground",
  orange: "bg-warning-bg text-warning-foreground",
}

const bills = [
  { id: "RB-00034", name: "Internet Subscription", vendor: "NetConnect Ltd.", category: "Internet & Telecom", freq: "Monthly", date: "05 Jun 2025", rel: "In 5 days", relColor: "text-muted-foreground", amount: 2499, status: "Active", icon: Wifi, iconBg: "bg-purple-bg text-purple-foreground" },
  { id: "RB-00033", name: "AWS Hosting", vendor: "Amazon Web Services", category: "IT Services", freq: "Monthly", date: "07 Jun 2025", rel: "In 7 days", relColor: "text-muted-foreground", amount: 12500, status: "Active", icon: Cloud, iconBg: "bg-info-bg text-info-foreground" },
  { id: "RB-00032", name: "Office Security", vendor: "SecureTech Solutions", category: "Security Services", freq: "Quarterly", date: "15 Jun 2025", rel: "In 15 days", relColor: "text-muted-foreground", amount: 15000, status: "Active", icon: Shield, iconBg: "bg-success-bg text-success-foreground" },
  { id: "RB-00031", name: "Office Rent", vendor: "Acme Properties", category: "Rent", freq: "Monthly", date: "01 Jun 2025", rel: "Tomorrow", relColor: "text-warning-foreground", amount: 150000, status: "Active", icon: Home, iconBg: "bg-danger-bg text-danger-foreground" },
  { id: "RB-00030", name: "Electricity Bill", vendor: "State Electricity Board", category: "Utilities", freq: "Monthly", date: "03 Jun 2025", rel: "In 3 days", relColor: "text-muted-foreground", amount: 18750, status: "Active", icon: Zap, iconBg: "bg-warning-bg text-warning-foreground" },
  { id: "RB-00029", name: "Mobile Postpaid", vendor: "Airtel Business", category: "Mobile & Telecom", freq: "Monthly", date: "10 Jun 2025", rel: "In 10 days", relColor: "text-muted-foreground", amount: 3200, status: "Active", icon: Phone, iconBg: "bg-danger-bg text-danger-foreground" },
  { id: "RB-00028", name: "Zoho One Subscription", vendor: "Zoho Corporation", category: "Software", freq: "Yearly", date: "20 Jun 2025", rel: "In 20 days", relColor: "text-muted-foreground", amount: 45000, status: "Active", icon: Image, iconBg: "bg-info-bg text-info-foreground" },
  { id: "RB-00027", name: "Maintenance Service", vendor: "Facility Care Pvt. Ltd.", category: "Maintenance", freq: "Monthly", date: "12 Jun 2025", rel: "In 12 days", relColor: "text-muted-foreground", amount: 8500, status: "Paused", icon: Wrench, iconBg: "bg-warning-bg text-warning-foreground" },
  { id: "RB-00026", name: "Telephone Landline", vendor: "BSNL", category: "Telephone", freq: "Monthly", date: "08 Jun 2025", rel: "In 8 days", relColor: "text-muted-foreground", amount: 1250, status: "Cancelled", icon: PhoneCall, iconBg: "bg-muted text-foreground" },
  { id: "RB-00025", name: "Business Insurance", vendor: "HDFC ERGO", category: "Insurance", freq: "Yearly", date: "01 Jul 2025", rel: "In 31 days", relColor: "text-muted-foreground", amount: 28000, status: "Active", icon: Umbrella, iconBg: "bg-purple-bg text-purple-foreground" },
]

const statusBreakdown = [
  { name: "Active", value: 28, pct: 82.4, color: "var(--color-chart-2)" },
  { name: "Paused", value: 3, pct: 8.8, color: "var(--color-chart-3)" },
  { name: "Cancelled", value: 3, pct: 8.8, color: "var(--color-chart-5)" },
]

const upcoming = bills
  .filter((b) => b.status === "Active")
  .slice(0, 5)
  .map((b) => ({ name: b.name, vendor: b.vendor, date: b.date, amount: b.amount, icon: b.icon, iconBg: b.iconBg }))

const activities = [
  { text: 'Recurring bill "Internet Subscription" created', time: "28 May 2025, 10:30 AM", color: "text-success-foreground" },
  { text: 'Recurring bill "AWS Hosting" updated', time: "27 May 2025, 04:15 PM", color: "text-info-foreground" },
  { text: 'Recurring bill "Telephone Landline" cancelled', time: "26 May 2025, 11:20 AM", color: "text-destructive" },
]

export function RecurringBills() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Purchases", href: "/purchases" }, { label: "Recurring Bills" }]}
        title="Recurring Bills"
        description="Create, manage and automate your recurring vendor bills."
        actions={
          <>
            <Button variant="outline">All Vendors</Button>
            <Button variant="outline">All Status</Button>
            <Button variant="outline">This Month</Button>
            <NewRecurringBillDialog>
              <DialogTrigger asChild>
                <Button>+ New Recurring Bill</Button>
              </DialogTrigger>
            </NewRecurringBillDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
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
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search recurring bills..." className="pl-9" />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline"><Download className="size-4" /> Export <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill Name</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Next Bill Date</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${b.iconBg}`}>
                          <b.icon className="size-4" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{b.name}</p>
                          <p className="text-muted-foreground text-xs">{b.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground whitespace-nowrap">{b.vendor}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{b.category}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{b.freq}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <p className="text-foreground">{b.date}</p>
                      <p className={`text-xs ${b.relColor}`}>{b.rel}</p>
                    </TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap text-foreground">
                      {b.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell><StatusBadge status={b.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 10 of 34 results</span>
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
              <CardTitle>Recurring Bills Summary</CardTitle>
              <span className="text-muted-foreground text-xs">This Month</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Recurring Bills</span><span className="font-medium text-foreground">34</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Active</span><span className="text-success-foreground font-medium">28</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Paused</span><span className="text-warning-foreground font-medium">3</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Cancelled</span><span className="text-destructive font-medium">3</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Monthly Value</span><span className="font-medium text-foreground">{inr(675400)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Next 30 Days Value</span><span className="font-medium text-foreground">{inr(245800)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Overdue Value</span><span className="text-destructive font-medium">{inr(35600)}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Bills by Status</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={statusBreakdown.map((s) => ({ name: s.name, value: s.value, color: s.color }))} total="34" totalLabel="Total Bills" size={130} />
              <ul className="flex flex-col gap-2 text-sm">
                {statusBreakdown.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="font-medium text-foreground">{s.value} ({s.pct}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Upcoming Bills (Next 30 Days)</CardTitle>
              <a href="/purchases/bills" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {upcoming.map((b) => (
                <div key={b.name} className="flex items-center gap-3">
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${b.iconBg}`}>
                    <b.icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{b.name}</p>
                    <p className="text-muted-foreground text-xs">{b.vendor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-xs whitespace-nowrap">{b.date}</p>
                    <p className="text-sm font-semibold whitespace-nowrap text-foreground">{inr(b.amount, { decimals: true })}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Activities</CardTitle>
              <a href="/accounting" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {activities.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full bg-current ${a.color}`} />
                  <div className="min-w-0">
                    <p className="text-foreground text-sm">{a.text}</p>
                    <p className="text-muted-foreground text-xs">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-5">
        <CardContent className="flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            Recurring bills help you automate bill creation. A new bill will be created automatically based on the frequency and next bill date.
          </p>
          <Button variant="outline" className="shrink-0">Learn More</Button>
        </CardContent>
      </Card>
    </div>
  )
}
