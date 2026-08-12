import { FileText, CheckCircle2, Clock, Hourglass, XCircle, Search, SlidersHorizontal, Download, ChevronDown } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewEstimateDialog } from "@/components/shared/TransactionDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: FileText, label: "Total Estimates", value: "64", sub: "This Financial Year", color: "blue" as const },
  { icon: CheckCircle2, label: "Accepted", value: "22", sub: "34.4% of total", color: "green" as const },
  { icon: Clock, label: "Pending", value: "18", sub: "28.1% of total", color: "orange" as const },
  { icon: Hourglass, label: "Expired", value: "10", sub: "15.6% of total", color: "purple" as const },
  { icon: XCircle, label: "Declined", value: "14", sub: "21.9% of total", color: "red" as const },
]

const colorMap: Record<string, string> = {
  blue: "bg-info-bg text-info-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const estimates = [
  { no: "EST-2025-0064", customer: "ABC Solutions", loc: "Gurgaon, Haryana", issue: "28 May 2025", valid: "12 Jun 2025", amount: 75000, status: "Accepted" },
  { no: "EST-2025-0063", customer: "TechCorp Ltd.", loc: "Noida, Uttar Pradesh", issue: "27 May 2025", valid: "10 Jun 2025", amount: 125000, status: "Pending" },
  { no: "EST-2025-0062", customer: "Global Enterprises", loc: "Mumbai, Maharashtra", issue: "26 May 2025", valid: "09 Jun 2025", amount: 50000, status: "Expired" },
  { no: "EST-2025-0061", customer: "Infotech Pvt. Ltd.", loc: "Bengaluru, Karnataka", issue: "25 May 2025", valid: "08 Jun 2025", amount: 98500, status: "Pending" },
  { no: "EST-2025-0060", customer: "NextGen Systems", loc: "Pune, Maharashtra", issue: "24 May 2025", valid: "07 Jun 2025", amount: 115600, status: "Accepted" },
  { no: "EST-2025-0059", customer: "Skyline Industries", loc: "Ahmedabad, Gujarat", issue: "23 May 2025", valid: "06 Jun 2025", amount: 65000, status: "Converted" },
  { no: "EST-2025-0058", customer: "Bright & Co.", loc: "Chennai, Tamil Nadu", issue: "22 May 2025", valid: "05 Jun 2025", amount: 42000, status: "Declined" },
  { no: "EST-2025-0057", customer: "Vertex Solutions", loc: "Hyderabad, Telangana", issue: "21 May 2025", valid: "04 Jun 2025", amount: 80000, status: "Pending" },
  { no: "EST-2025-0056", customer: "Quantum Tech", loc: "Kolkata, West Bengal", issue: "20 May 2025", valid: "03 Jun 2025", amount: 55500, status: "Accepted" },
  { no: "EST-2025-0055", customer: "DataSoft Pvt. Ltd.", loc: "Noida, Uttar Pradesh", issue: "19 May 2025", valid: "02 Jun 2025", amount: 105000, status: "Converted" },
]

const summary = [
  { label: "Total Estimate Amount", value: 1875400, color: "text-foreground" },
  { label: "Accepted Amount", value: 745600, color: "text-success-foreground" },
  { label: "Pending Amount", value: 625300, color: "text-warning-foreground" },
  { label: "Expired Amount", value: 260500, color: "text-destructive" },
  { label: "Declined Amount", value: 244000, color: "text-destructive" },
  { label: "Converted to Invoice", value: 468900, color: "text-purple-foreground" },
]

const topCustomers = [
  { name: "ABC Solutions", count: 8, amount: 325000, pct: 17.3 },
  { name: "TechCorp Ltd.", count: 6, amount: 275000, pct: 14.7 },
  { name: "Global Enterprises", count: 5, amount: 250000, pct: 13.3 },
  { name: "Infotech Pvt. Ltd.", count: 4, amount: 198500, pct: 10.6 },
  { name: "NextGen Systems", count: 4, amount: 180000, pct: 9.6 },
]

const activities = [
  { text: "Estimate EST-2025-0064 accepted by ABC Solutions", time: "28 May 2025, 10:30 AM", color: "text-success-foreground" },
  { text: "Estimate EST-2025-0063 sent to TechCorp Ltd.", time: "27 May 2025, 04:25 PM", color: "text-warning-foreground" },
  { text: "Estimate EST-2025-0059 converted to invoice", time: "26 May 2025, 11:15 AM", color: "text-info-foreground" },
  { text: "Estimate EST-2025-0058 declined by customer", time: "22 May 2025, 09:45 AM", color: "text-destructive" },
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export function Estimates() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Sales", href: "/sales" }, { label: "Estimates" }]}
        title="Estimates"
        description="Create professional estimates and convert them to invoices with ease."
        actions={
          <>
            <Button variant="outline">FY 2024-25</Button>
            <Button variant="outline"><SlidersHorizontal className="size-4" /> All Status</Button>
            <NewEstimateDialog>
              <DialogTrigger asChild>
                <Button>+ New Estimate</Button>
              </DialogTrigger>
            </NewEstimateDialog>
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
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search estimates..." className="pl-9" />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline"><Download className="size-4" /> Export <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Estimate No.</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estimates.map((e) => (
                  <TableRow key={e.no}>
                    <TableCell className="text-primary font-medium whitespace-nowrap">{e.no}</TableCell>
                    <TableCell>
                      <p className="text-foreground">{e.customer}</p>
                      <p className="text-muted-foreground text-xs">{e.loc}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{e.issue}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{e.valid}</TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{inr(e.amount, { decimals: true })}</TableCell>
                    <TableCell><StatusBadge status={e.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 10 of 64 results</span>
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
              <CardTitle>Estimate Summary</CardTitle>
              <span className="text-muted-foreground text-xs">This Financial Year</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              {summary.map((s) => (
                <div key={s.label} className="flex justify-between">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className={`font-medium ${s.color}`}>{inr(s.value)}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Top Customers by Estimates</CardTitle>
              <a href="/sales/customers" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {topCustomers.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <Avatar className="size-9"><AvatarFallback className="bg-info-bg text-info-foreground">{initials(c.name)}</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-muted-foreground text-xs">{c.count} Estimates</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{inr(c.amount)}</p>
                    <p className="text-muted-foreground text-xs">{c.pct}% of total</p>
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
    </div>
  )
}
