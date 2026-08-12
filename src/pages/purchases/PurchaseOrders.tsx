import { useMemo, useState } from "react"
import { ClipboardList, Hourglass, Truck, CheckCircle2, Wallet, Search, SlidersHorizontal, Download, ChevronDown } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewPurchaseOrderDialog } from "@/components/shared/TransactionDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: ClipboardList, label: "Total Purchase Orders", value: "68", delta: "9.4%", color: "blue" as const },
  { icon: Hourglass, label: "Pending Approval", value: "6", color: "orange" as const },
  { icon: Truck, label: "Awaiting Delivery", value: "14", color: "purple" as const },
  { icon: CheckCircle2, label: "Received", value: "44", sub: "64.7% of total", color: "green" as const },
  { icon: Wallet, label: "Total PO Value", value: inr(2845600), delta: "11.2%", color: "blue" as const },
]

const colorMap: Record<string, string> = {
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  green: "bg-success-bg text-success-foreground",
}

const orders = [
  { no: "PO-10045", supplier: "Tech Solutions Pvt. Ltd.", date: "20 May 2025", delivery: "10 Jun 2025", amount: 250000, status: "Approved" },
  { no: "PO-10044", supplier: "Global Supplies Co.", date: "18 May 2025", delivery: "05 Jun 2025", amount: 125000, status: "Received" },
  { no: "PO-10043", supplier: "Office Essentials", date: "16 May 2025", delivery: "02 Jun 2025", amount: 45000, status: "Pending" },
  { no: "PO-10042", supplier: "Industrial Tools & Co.", date: "12 May 2025", delivery: "28 May 2025", amount: 98000, status: "Received" },
  { no: "PO-10041", supplier: "Marketing World", date: "10 May 2025", delivery: "24 May 2025", amount: 35000, status: "Approved" },
  { no: "PO-10040", supplier: "Transport Services", date: "08 May 2025", delivery: "20 May 2025", amount: 85000, status: "Received" },
  { no: "PO-10039", supplier: "Electricity Board", date: "05 May 2025", delivery: "18 May 2025", amount: 25000, status: "Cancelled" },
  { no: "PO-10038", supplier: "Software Licence India", date: "02 May 2025", delivery: "12 May 2025", amount: 95000, status: "Received" },
]

const statusBreakdown = [
  { name: "Received", value: 64.7, color: "var(--color-chart-2)" },
  { name: "Approved", value: 20.6, color: "var(--color-chart-1)" },
  { name: "Pending", value: 8.8, color: "var(--color-chart-3)" },
  { name: "Cancelled", value: 5.9, color: "var(--color-chart-5)" },
]

const topSuppliers = [
  { name: "Tech Solutions Pvt. Ltd.", orders: 14, amount: 625000 },
  { name: "Global Supplies Co.", orders: 11, amount: 480000 },
  { name: "Industrial Tools & Co.", orders: 9, amount: 355000 },
  { name: "Office Essentials", orders: 7, amount: 210000 },
]

const activities = [
  { text: "PO-10045 approved for Tech Solutions Pvt. Ltd.", time: "20 May 2025, 11:30 AM", color: "text-success-foreground" },
  { text: "PO-10044 marked as received", time: "18 May 2025, 03:10 PM", color: "text-info-foreground" },
  { text: "PO-10043 awaiting approval", time: "16 May 2025, 09:45 AM", color: "text-warning-foreground" },
  { text: "PO-10039 cancelled by John Doe", time: "05 May 2025, 02:20 PM", color: "text-destructive" },
]

const orderTabs = [
  { value: "all", label: "All Orders" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "received", label: "Received" },
  { value: "cancelled", label: "Cancelled" },
] as const

export function PurchaseOrders() {
  const [tab, setTab] = useState<(typeof orderTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return orders.filter((o) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "pending" ? o.status === "Pending" :
        tab === "approved" ? o.status === "Approved" :
        tab === "received" ? o.status === "Received" :
        tab === "cancelled" ? o.status === "Cancelled" :
        true
      const matchesQuery = !q || o.no.toLowerCase().includes(q) || o.supplier.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Purchases", href: "/purchases" }, { label: "Purchase Orders" }]}
        title="Purchase Orders"
        description="Create, track and manage purchase orders sent to your suppliers."
        actions={
          <>
            <Button variant="outline">FY 2024-25</Button>
            <Button variant="outline"><SlidersHorizontal className="size-4" /> All Status</Button>
            <NewPurchaseOrderDialog>
              <DialogTrigger asChild>
                <Button>+ New Purchase Order</Button>
              </DialogTrigger>
            </NewPurchaseOrderDialog>
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
            {s.delta && <p className="text-success-foreground text-xs font-medium">↑ {s.delta} from last month</p>}
            {s.sub && <p className="text-muted-foreground text-xs">{s.sub}</p>}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList>
                {orderTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search purchase orders..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline"><Download className="size-4" /> Export <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO No.</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Expected Delivery</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((o) => (
                  <TableRow key={o.no}>
                    <TableCell className="text-primary font-medium whitespace-nowrap">{o.no}</TableCell>
                    <TableCell className="text-foreground">{o.supplier}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{o.date}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{o.delivery}</TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{inr(o.amount)}</TableCell>
                    <TableCell><StatusBadge status={o.status} /></TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-muted-foreground py-8 text-center">No purchase orders found for this filter.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {orders.length} results</span>
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
            <CardHeader><CardTitle>Orders by Status</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-4 pb-5">
              <DonutChart data={statusBreakdown} total={inr(2845600)} totalLabel="Total Value" size={150} />
              <ul className="flex w-full flex-col gap-2 text-sm">
                {statusBreakdown.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground flex-1">{s.name}</span>
                    <span className="font-medium text-foreground">{s.value}%</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Top Suppliers</CardTitle>
              <a href="/purchases/suppliers" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {topSuppliers.map((s) => (
                <div key={s.name} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-muted-foreground text-xs">{s.orders} Orders</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{inr(s.amount)}</span>
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
