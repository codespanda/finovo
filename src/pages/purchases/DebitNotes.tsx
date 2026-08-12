import { Receipt, CheckCircle2, FileEdit, FileCheck2, AlertTriangle, Search, SlidersHorizontal, Download, ChevronDown } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewDebitNoteDialog } from "@/components/shared/TransactionDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: Receipt, label: "Total Debit Notes", value: "28", sub: "This Period", color: "purple" as const },
  { icon: CheckCircle2, label: "Total Amount", value: inr(375650, { decimals: true }), sub: "This Period", color: "green" as const },
  { icon: FileEdit, label: "Open Amount", value: inr(115450, { decimals: true }), sub: "From 9 Debit Notes", color: "orange" as const },
  { icon: FileCheck2, label: "Used / Adjusted", value: inr(245200, { decimals: true }), sub: "From 16 Debit Notes", color: "blue" as const },
  { icon: AlertTriangle, label: "Overdue", value: inr(35650, { decimals: true }), sub: "From 3 Debit Notes", color: "red" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  blue: "bg-info-bg text-info-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const notes = [
  { no: "DN-2025-0028", date: "30 May 2025", vendor: "ABC Supplies Pvt. Ltd.", bill: "BILL-2025-0456", reason: "Price Difference", amount: 18750, status: "Open" },
  { no: "DN-2025-0027", date: "28 May 2025", vendor: "Tech Solutions", bill: "BILL-2025-0440", reason: "Damaged Goods", amount: 12500, status: "Used" },
  { no: "DN-2025-0026", date: "27 May 2025", vendor: "Global Distributors", bill: "BILL-2025-0435", reason: "Short Quantity", amount: 6300, status: "Open" },
  { no: "DN-2025-0025", date: "25 May 2025", vendor: "Industrial Goods Co.", bill: "BILL-2025-0427", reason: "Additional Charges", amount: 9850, status: "Used" },
  { no: "DN-2025-0024", date: "24 May 2025", vendor: "Office Essentials", bill: "BILL-2025-0421", reason: "Price Difference", amount: 4250, status: "Used" },
  { no: "DN-2025-0023", date: "22 May 2025", vendor: "Hardware Hub", bill: "BILL-2025-0409", reason: "Damaged Goods", amount: 8600, status: "Open" },
  { no: "DN-2025-0022", date: "20 May 2025", vendor: "IT World Solutions", bill: "BILL-2025-0405", reason: "Short Quantity", amount: 7150, status: "Used" },
  { no: "DN-2025-0021", date: "18 May 2025", vendor: "Packaging Mart", bill: "BILL-2025-0398", reason: "Other", amount: 2800, status: "Closed" },
  { no: "DN-2025-0020", date: "16 May 2025", vendor: "BuildRight Materials", bill: "BILL-2025-0391", reason: "Quality Issue", amount: 5450, status: "Open" },
  { no: "DN-2025-0019", date: "14 May 2025", vendor: "ElectroTronix", bill: "BILL-2025-0387", reason: "Additional Charges", amount: 3200, status: "Used" },
]

const byStatus = [
  { name: "Open", value: 9, pct: 32.1, color: "var(--color-chart-3)" },
  { name: "Used / Adjusted", value: 16, pct: 57.1, color: "var(--color-chart-2)" },
  { name: "Closed", value: 3, pct: 10.7, color: "var(--color-muted-foreground)" },
]

const topVendors = [
  { name: "ABC Supplies Pvt. Ltd.", amount: 78250, pct: 100 },
  { name: "Tech Solutions", amount: 65400, pct: 84 },
  { name: "Global Distributors", amount: 52150, pct: 67 },
  { name: "Industrial Goods Co.", amount: 38950, pct: 50 },
  { name: "Hardware Hub", amount: 28600, pct: 37 },
]

const activities = [
  { text: "Debit note DN-2025-0028 created for ABC Supplies Pvt. Ltd.", time: "30 May 2025, 10:30 AM", color: "text-purple-foreground" },
  { text: "Debit note DN-2025-0027 applied to bill BILL-2025-0440", time: "28 May 2025, 02:15 PM", color: "text-success-foreground" },
  { text: "Debit note DN-2025-0026 created for Global Distributors", time: "27 May 2025, 11:20 AM", color: "text-purple-foreground" },
]

export function DebitNotes() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Purchases", href: "/purchases" }, { label: "Debit Notes" }]}
        title="Debit Notes"
        description="Create and manage debit notes issued to vendors."
        actions={
          <>
            <Button variant="outline">01 May 2025 - 31 May 2025</Button>
            <Button variant="outline">All Vendors</Button>
            <Button variant="outline">All Status</Button>
            <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
            <NewDebitNoteDialog>
              <DialogTrigger asChild>
                <Button>+ New Debit Note</Button>
              </DialogTrigger>
            </NewDebitNoteDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
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
                <Input placeholder="Search debit notes..." className="pl-9" />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline"><Download className="size-4" /> Export <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Debit Note # ↓</TableHead>
                  <TableHead>Date ↓</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Related To</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notes.map((n) => (
                  <TableRow key={n.no}>
                    <TableCell className="text-primary font-medium whitespace-nowrap">{n.no}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{n.date}</TableCell>
                    <TableCell className="text-foreground whitespace-nowrap">{n.vendor}</TableCell>
                    <TableCell className="text-primary whitespace-nowrap">{n.bill}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{n.reason}</TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{n.amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell><StatusBadge status={n.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 10 of 28 results</span>
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
            <CardHeader><CardTitle>Debit Note Summary</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Debit Notes</span><span className="font-medium text-foreground">28</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Amount</span><span className="font-medium text-foreground">{inr(375650)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Open Amount</span><span className="text-warning-foreground font-medium">{inr(115450)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Used / Adjusted</span><span className="text-success-foreground font-medium">{inr(245200)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Overdue Amount</span><span className="text-destructive font-medium">{inr(35650)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Average Debit Note Value</span><span className="font-medium text-foreground">{inr(13416.07, { decimals: true })}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Debit Notes by Status</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={byStatus} total="28" totalLabel="Total" size={130} />
              <ul className="flex flex-col gap-2 text-sm">
                {byStatus.map((s) => (
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
              <CardTitle>Top Vendors</CardTitle>
              <a href="/purchases/suppliers" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {topVendors.map((v) => (
                <div key={v.name} className="flex items-center gap-3">
                  <div className="bg-purple-bg text-purple-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                    {v.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{v.name}</p>
                    <div className="bg-muted mt-1 h-1 w-full overflow-hidden rounded-full">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${v.pct}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold whitespace-nowrap text-foreground">{inr(v.amount, { decimals: true })}</span>
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
          <p className="text-muted-foreground text-sm">Debit notes help you record adjustments for overcharges, returns, short supplies or other issues from vendors.</p>
          <Button variant="outline" className="shrink-0">Learn More</Button>
        </CardContent>
      </Card>
    </div>
  )
}
