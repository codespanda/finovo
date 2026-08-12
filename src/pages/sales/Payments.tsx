import { useMemo, useState } from "react"
import { TrendingUp, FileStack, Wallet, AlertTriangle, RotateCcw, Search, SlidersHorizontal, Filter, Download, ChevronDown, Landmark, Smartphone, FileCheck2, CreditCard, Building2 } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DonutChart, DonutLegend } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { ReceivePaymentDialog } from "@/components/shared/EntityDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: TrendingUp, label: "Total Payments Received", value: inr(8245300), delta: "18.7%", color: "green" as const },
  { icon: FileStack, label: "Total Transactions", value: "246", delta: "12.3%", color: "blue" as const },
  { icon: Wallet, label: "Average Payment", value: inr(33516), delta: "9.2%", color: "purple" as const },
  { icon: AlertTriangle, label: "Overdue Payments", value: inr(525600), delta: "12.4%", positive: false, color: "orange" as const },
  { icon: RotateCcw, label: "Refunds Issued", value: inr(125300), delta: "5.6%", color: "blue" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
}

const methodIcon: Record<string, { icon: typeof Landmark; color: string }> = {
  "Bank Transfer": { icon: Landmark, color: "bg-info-bg text-info-foreground" },
  UPI: { icon: Smartphone, color: "bg-purple-bg text-purple-foreground" },
  Cheque: { icon: FileCheck2, color: "bg-warning-bg text-warning-foreground" },
  "Credit Card": { icon: CreditCard, color: "bg-danger-bg text-danger-foreground" },
  "Net Banking": { icon: Building2, color: "bg-success-bg text-success-foreground" },
}

const payments = [
  { no: "PAY-2025-0246", customer: "ABC Solutions", inv: "INV-2025-0042", date: "28 May 2025", method: "Bank Transfer", amount: 75000, status: "Received" },
  { no: "PAY-2025-0245", customer: "TechCorp Ltd.", inv: "INV-2025-0041", date: "27 May 2025", method: "UPI", amount: 125000, status: "Received" },
  { no: "PAY-2025-0244", customer: "Global Enterprises", inv: "INV-2025-0040", date: "26 May 2025", method: "Cheque", amount: 50000, status: "Received" },
  { no: "PAY-2025-0243", customer: "Infotech Pvt. Ltd.", inv: "INV-2025-0039", date: "25 May 2025", method: "Bank Transfer", amount: 98500, status: "Received" },
  { no: "PAY-2025-0242", customer: "NextGen Systems", inv: "INV-2025-0038", date: "24 May 2025", method: "Credit Card", amount: 115600, status: "Received" },
  { no: "PAY-2025-0241", customer: "Skyline Industries", inv: "INV-2025-0037", date: "23 May 2025", method: "UPI", amount: 65000, status: "Received" },
  { no: "PAY-2025-0240", customer: "Bright & Co.", inv: "INV-2025-0036", date: "22 May 2025", method: "Cheque", amount: 42000, status: "Partially Received" },
  { no: "PAY-2025-0239", customer: "Vertex Solutions", inv: "INV-2025-0035", date: "21 May 2025", method: "Bank Transfer", amount: 80000, status: "Overdue" },
  { no: "PAY-2025-0238", customer: "Orion Retail", inv: "INV-2025-0034", date: "20 May 2025", method: "Bank Transfer", amount: 85300, status: "Refunded" },
  { no: "PAY-2025-0237", customer: "Zenith Traders", inv: "INV-2025-0033", date: "19 May 2025", method: "UPI", amount: 40000, status: "Refunded" },
]

const paymentTabs = [
  { value: "all", label: "All Payments" },
  { value: "received", label: "Received" },
  { value: "overdue", label: "Overdue" },
  { value: "refunds", label: "Refunds" },
] as const

const methodBreakdown = [
  { name: "Bank Transfer", value: 40.2, color: "var(--color-chart-1)" },
  { name: "UPI", value: 24.8, color: "var(--color-chart-4)" },
  { name: "Cheque", value: 14.6, color: "var(--color-chart-3)" },
  { name: "Credit Card", value: 10.5, color: "var(--color-chart-5)" },
  { name: "Net Banking", value: 6.0, color: "var(--color-chart-2)" },
  { name: "Others", value: 3.9, color: "var(--color-muted-foreground)" },
]

const activities = [
  { text: "Payment of ₹75,000 received from ABC Solutions", time: "28 May 2025, 10:30 AM", color: "text-success-foreground" },
  { text: "Payment of ₹1,25,000 received from TechCorp Ltd.", time: "27 May 2025, 04:25 PM", color: "text-info-foreground" },
  { text: "Cheque payment of ₹42,000 received from Bright & Co.", time: "22 May 2025, 11:15 AM", color: "text-warning-foreground" },
  { text: "Payment of ₹80,000 is overdue from Vertex Solutions", time: "21 May 2025, 09:45 AM", color: "text-destructive" },
]

export function Payments() {
  const [tab, setTab] = useState<(typeof paymentTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return payments.filter((p) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "received" ? (p.status === "Received" || p.status === "Partially Received") :
        tab === "overdue" ? p.status === "Overdue" :
        tab === "refunds" ? p.status === "Refunded" :
        true
      const matchesQuery = !q || p.no.toLowerCase().includes(q) || p.customer.toLowerCase().includes(q) || p.inv.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Sales", href: "/sales" }, { label: "Payments Receivable" }]}
        title="Payments"
        description="Track and manage all payments received from your customers."
        actions={
          <>
            <Button variant="outline">FY 2024-25</Button>
            <Button variant="outline"><Filter className="size-4" /> All Payment Methods</Button>
            <ReceivePaymentDialog>
              <DialogTrigger asChild>
                <Button>+ Receive Payment</Button>
              </DialogTrigger>
            </ReceivePaymentDialog>
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
            <p className={`text-xs font-medium ${s.positive === false ? "text-destructive" : "text-success-foreground"}`}>
              {s.positive === false ? "↓" : "↑"} {s.delta} from last year
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList>
                {paymentTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search payments..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline" size="icon"><SlidersHorizontal className="size-4" /></Button>
                <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                <Button variant="outline"><Download className="size-4" /> Export <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment No.</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Invoice No.</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p) => {
                  const m = methodIcon[p.method]
                  return (
                    <TableRow key={p.no}>
                      <TableCell className="text-primary font-medium whitespace-nowrap">{p.no}</TableCell>
                      <TableCell className="text-foreground">{p.customer}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{p.inv}</TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">{p.date}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={`gap-1.5 ${m.color}`}>
                          <m.icon className="size-3.5" /> {p.method}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{inr(p.amount, { decimals: true })}</TableCell>
                      <TableCell><StatusBadge status={p.status} /></TableCell>
                    </TableRow>
                  )
                })}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">
                      No payments found for this filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {payments.length} results</span>
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
              <CardTitle>Payment Summary</CardTitle>
              <span className="text-muted-foreground text-xs">This Financial Year</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Payments Received</span><span className="text-success-foreground font-medium">{inr(8245300)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Invoices</span><span className="text-foreground font-medium">{inr(10275600)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Amount Due</span><span className="text-warning-foreground font-medium">{inr(2030300)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Overdue Amount</span><span className="text-destructive font-medium">{inr(525600)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Refunds Issued</span><span className="text-primary font-medium">{inr(125300)}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Payments by Method</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-4 pb-5">
              <DonutChart data={methodBreakdown} total={inr(8245300)} totalLabel="Total" size={150} />
              <DonutLegend data={methodBreakdown} />
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

          <Card>
            <CardContent className="text-muted-foreground py-4 text-sm">
              Need help with payments? <a href="/help" className="text-primary font-medium">Learn more about receiving payments</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
