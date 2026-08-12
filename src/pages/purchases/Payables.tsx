import { useMemo, useState } from "react"
import { CircleDollarSign, Clock3, PauseCircle, Download, Search, SlidersHorizontal, ChevronDown } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { AddPaymentDialog } from "@/components/shared/EntityDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: CircleDollarSign, label: "Total Payable", value: inr(1875300, { decimals: true }), sub: "From 52 Bills", color: "red" as const },
  { icon: CircleDollarSign, label: "Current", value: inr(785600, { decimals: true }), sub: "From 18 Bills", color: "orange" as const },
  { icon: PauseCircle, label: "1 – 30 Days", value: inr(465200, { decimals: true }), sub: "From 15 Bills", color: "warning" as const },
  { icon: CircleDollarSign, label: "31 – 60 Days", value: inr(305500, { decimals: true }), sub: "From 10 Bills", color: "blue" as const },
  { icon: CircleDollarSign, label: "61 – 90 Days", value: inr(135000, { decimals: true }), sub: "From 5 Bills", color: "purple" as const },
  { icon: Clock3, label: "Over 90 Days", value: inr(85000, { decimals: true }), sub: "From 4 Bills", color: "red" as const },
]

const colorMap: Record<string, string> = {
  red: "bg-danger-bg text-danger-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  warning: "bg-warning-bg text-warning-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
}

const bills = [
  { no: "BILL-2025-0456", vendor: "ABC Supplies Pvt. Ltd.", date: "15 May 2025", due: "30 May 2025", total: 125000, balance: 125000, overdue: 1, status: "Overdue", bg: "bg-danger-bg" },
  { no: "BILL-2025-0440", vendor: "Tech Solutions", date: "10 May 2025", due: "25 May 2025", total: 78500, balance: 78500, overdue: 6, status: "Overdue", bg: "bg-info-bg" },
  { no: "BILL-2025-0435", vendor: "Global Distributors", date: "05 May 2025", due: "20 May 2025", total: 62000, balance: 62000, overdue: 11, status: "Overdue", bg: "bg-purple-bg" },
  { no: "BILL-2025-0427", vendor: "Industrial Goods Co.", date: "18 May 2025", due: "17 Jun 2025", total: 98500, balance: 98500, overdue: null, status: "Current", bg: "bg-info-bg" },
  { no: "BILL-2025-0421", vendor: "Office Essentials", date: "20 May 2025", due: "19 Jun 2025", total: 42000, balance: 42000, overdue: null, status: "Current", bg: "bg-warning-bg" },
  { no: "BILL-2025-0409", vendor: "Hardware Hub", date: "12 May 2025", due: "11 Jun 2025", total: 86600, balance: 56600, overdue: null, status: "Partially Paid", bg: "bg-danger-bg" },
  { no: "BILL-2025-0405", vendor: "IT World Solutions", date: "08 May 2025", due: "07 Jun 2025", total: 80000, balance: 20000, overdue: null, status: "Partially Paid", bg: "bg-purple-bg" },
  { no: "BILL-2025-0398", vendor: "Packaging Mart", date: "02 May 2025", due: "01 Jun 2025", total: 28000, balance: 0, overdue: null, status: "Paid", bg: "bg-info-bg" },
  { no: "BILL-2025-0391", vendor: "BuildRight Materials", date: "28 Apr 2025", due: "28 May 2025", total: 160000, balance: 0, overdue: null, status: "Paid", bg: "bg-warning-bg" },
  { no: "BILL-2025-0387", vendor: "ElectroTronix", date: "25 Apr 2025", due: "25 May 2025", total: 35900, balance: 0, overdue: null, status: "Paid", bg: "bg-success-bg" },
]

const summary = [
  { name: "Current", value: 41.8, color: "var(--color-chart-3)" },
  { name: "1 - 30 Days", value: 24.8, color: "var(--color-chart-4)" },
  { name: "31 - 60 Days", value: 16.3, color: "var(--color-chart-1)" },
  { name: "61 - 90 Days", value: 7.2, color: "var(--color-purple-foreground, #a855f7)" },
  { name: "Over 90 Days", value: 4.5, color: "var(--color-chart-5)" },
]

const summaryAmounts: Record<string, number> = {
  "Current": 785600,
  "1 - 30 Days": 465200,
  "31 - 60 Days": 305500,
  "61 - 90 Days": 135000,
  "Over 90 Days": 85000,
}

const topVendors = [
  { name: "ABC Supplies Pvt. Ltd.", amount: 325000, pct: 100 },
  { name: "Tech Solutions", amount: 275500, pct: 85 },
  { name: "Global Distributors", amount: 210000, pct: 65 },
  { name: "Industrial Goods Co.", amount: 198500, pct: 61 },
  { name: "Hardware Hub", amount: 150600, pct: 46 },
]

const upcoming = [
  { no: "BILL-2025-0456", vendor: "ABC Supplies Pvt. Ltd.", date: "30 May 2025", amount: 125000, bg: "bg-danger-bg" },
  { no: "BILL-2025-0440", vendor: "Tech Solutions", date: "01 Jun 2025", amount: 78500, bg: "bg-info-bg" },
  { no: "BILL-2025-0435", vendor: "Global Distributors", date: "02 Jun 2025", amount: 62000, bg: "bg-purple-bg" },
  { no: "BILL-2025-0427", vendor: "Industrial Goods Co.", date: "03 Jun 2025", amount: 98500, bg: "bg-info-bg" },
  { no: "BILL-2025-0421", vendor: "Office Essentials", date: "04 Jun 2025", amount: 42000, bg: "bg-warning-bg" },
]

const ageing = [
  { bucket: "0 – 30 Days", amount: 785600, pct: 41.8 },
  { bucket: "31 – 60 Days", amount: 305500, pct: 16.3 },
  { bucket: "61 – 90 Days", amount: 135000, pct: 7.2 },
  { bucket: "Over 90 Days", amount: 85000, pct: 4.5 },
]

const payableTabs = [
  { value: "all", label: "All Payables" },
  { value: "current", label: "Current" },
  { value: "overdue", label: "Overdue" },
  { value: "paid", label: "Paid" },
] as const

export function Payables() {
  const [tab, setTab] = useState<(typeof payableTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return bills.filter((b) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "current" ? b.status === "Current" :
        tab === "overdue" ? b.status === "Overdue" :
        tab === "paid" ? b.status === "Paid" :
        true
      const matchesQuery = !q || b.no.toLowerCase().includes(q) || b.vendor.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Purchases", href: "/purchases" }, { label: "Payables" }]}
        title="Payables"
        description="Track and manage all your vendor payables in one place."
        actions={
          <>
            <Button variant="outline">As on 31 May 2025</Button>
            <Button variant="outline">All Vendors</Button>
            <Button variant="outline"><Download className="size-4" /> Export</Button>
            <AddPaymentDialog>
              <DialogTrigger asChild>
                <Button>+ Add Payment</Button>
              </DialogTrigger>
            </AddPaymentDialog>
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
            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList>
                {payableTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search by vendor or bill number..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline" className="gap-1">Group by: None <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill No.</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Bill Date</TableHead>
                  <TableHead>Due Date ↓</TableHead>
                  <TableHead className="text-right">Total Amount (₹)</TableHead>
                  <TableHead className="text-right">Balance Due (₹)</TableHead>
                  <TableHead>Days Overdue</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((b) => (
                  <TableRow key={b.no}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-foreground ${b.bg}`}>{b.vendor[0]}</div>
                        <span className="text-primary font-medium whitespace-nowrap">{b.no}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground whitespace-nowrap">{b.vendor}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{b.date}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{b.due}</TableCell>
                    <TableCell className="text-right whitespace-nowrap text-foreground">{b.total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{b.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-muted-foreground">{b.overdue ? b.overdue : "–"}</TableCell>
                    <TableCell><StatusBadge status={b.status} /></TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-muted-foreground py-8 text-center">No bills found for this filter.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {bills.length} results</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((p) => (
                  <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Payables Summary</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={summary} total={inr(1875300)} totalLabel="Total Payable" size={150} />
              <ul className="flex flex-col gap-2 text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="font-medium text-foreground">{inr(summaryAmounts[s.name])} ({s.value}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Top Vendors by Payable</CardTitle>
              <a href="/purchases/suppliers" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {topVendors.map((v) => (
                <div key={v.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-foreground">{v.name}</span>
                    <span className="text-muted-foreground">{inr(v.amount, { decimals: true })}</span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${v.pct}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Upcoming Due (Next 7 Days)</CardTitle>
              <a href="/purchases/bills" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {upcoming.map((u) => (
                <div key={u.no} className="flex items-center gap-3">
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-foreground ${u.bg}`}>{u.vendor[0]}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{u.no}</p>
                    <p className="text-muted-foreground text-xs">{u.vendor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-xs whitespace-nowrap">{u.date}</p>
                    <p className="text-sm font-semibold whitespace-nowrap text-foreground">{inr(u.amount, { decimals: true })}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-5">
        <CardHeader><CardTitle>Payables Ageing</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto pb-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b text-left text-xs">
                <th className="pb-2 font-medium">Ageing Bucket</th>
                {ageing.map((a) => (
                  <th key={a.bucket} className="pb-2 text-right font-medium">{a.bucket}</th>
                ))}
                <th className="pb-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="text-muted-foreground py-3">Amount (₹)</td>
                {ageing.map((a) => (
                  <td key={a.bucket} className="py-3 text-right font-medium text-foreground">{inr(a.amount, { decimals: true })}</td>
                ))}
                <td className="py-3 text-right font-semibold text-foreground">{inr(1211100, { decimals: true })}</td>
              </tr>
              <tr>
                <td className="text-muted-foreground py-3">% of Total</td>
                {ageing.map((a) => (
                  <td key={a.bucket} className="text-muted-foreground py-3 text-right">{a.pct}%</td>
                ))}
                <td className="py-3 text-right font-semibold text-foreground">64.4%</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
