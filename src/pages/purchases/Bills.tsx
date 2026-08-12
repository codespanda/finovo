import { useMemo, useState } from "react"
import { Receipt, Clock, AlertTriangle, CheckCircle2, CalendarClock, Upload, Plus, Search, SlidersHorizontal } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewBillDialog } from "@/components/shared/TransactionDialogs"
import { inr } from "@/lib/format"

const bills = [
  { no: "BILL-1045", supplier: "Tech Solutions Pvt. Ltd.", date: "20 May 2025", due: "20 Jun 2025", status: "Open", amount: 75000, balance: 50000, recurring: false },
  { no: "BILL-1044", supplier: "Global Supplies Co.", date: "18 May 2025", due: "17 Jun 2025", status: "Overdue", amount: 120000, balance: 120000, recurring: false },
  { no: "BILL-1043", supplier: "Office Essentials", date: "15 May 2025", due: "15 Jun 2025", status: "Part Paid", amount: 45000, balance: 15000, recurring: true },
  { no: "BILL-1042", supplier: "Industrial Tools & Co.", date: "10 May 2025", due: "09 Jun 2025", status: "Paid", amount: 60000, balance: 0, recurring: false },
  { no: "BILL-1041", supplier: "Marketing World", date: "08 May 2025", due: "07 Jun 2025", status: "Open", amount: 35000, balance: 35000, recurring: true },
  { no: "BILL-1040", supplier: "Transport Services", date: "05 May 2025", due: "04 Jun 2025", status: "Paid", amount: 85000, balance: 0, recurring: false },
]

const billTabs = [
  { value: "all", label: "All Bills" },
  { value: "open", label: "Open" },
  { value: "overdue", label: "Overdue" },
  { value: "paid", label: "Paid" },
  { value: "draft", label: "Draft" },
  { value: "recurring", label: "Recurring" },
] as const

export function Bills() {
  const [tab, setTab] = useState<(typeof billTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return bills.filter((b) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "open" ? (b.status === "Open" || b.status === "Part Paid") :
        tab === "overdue" ? b.status === "Overdue" :
        tab === "paid" ? b.status === "Paid" :
        tab === "draft" ? b.status === "Draft" :
        tab === "recurring" ? b.recurring :
        true
      const matchesQuery = !q || b.no.toLowerCase().includes(q) || b.supplier.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Purchases", href: "/purchases" }, { label: "Bills" }]}
        title="Bills"
        description="Track and manage all your vendor bills and payments."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import Bills</Button>
            <NewBillDialog>
              <DialogTrigger asChild>
                <Button><Plus className="size-4" /> New Bill</Button>
              </DialogTrigger>
            </NewBillDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={Receipt} label="Total Bills" value={inr(1845678)} delta={{ value: "12.4%" }} color="green" />
        <StatCard icon={Clock} label="Bills Due (14)" value={inr(875432)} color="orange" />
        <StatCard icon={AlertTriangle} label="Overdue Bills (6)" value={inr(245000)} color="red" />
        <StatCard icon={CheckCircle2} label="Paid This Month" value={inr(725246)} delta={{ value: "8.6%" }} color="purple" />
        <StatCard icon={CalendarClock} label="Upcoming Payments" value={inr(325000)} color="blue" className="col-span-2 lg:col-span-1" />
      </div>

      <Card>
        <CardContent className="pt-5">
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList>
              {billTabs.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input placeholder="Search bills..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <Button variant="outline" className="sm:ml-auto"><SlidersHorizontal className="size-4" /> Filters</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill No.</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Bill Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance Due</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.no}>
                  <TableCell className="text-primary font-medium">{b.no}</TableCell>
                  <TableCell className="text-foreground">{b.supplier}</TableCell>
                  <TableCell className="text-muted-foreground">{b.date}</TableCell>
                  <TableCell className="text-muted-foreground">{b.due}</TableCell>
                  <TableCell><StatusBadge status={b.status} /></TableCell>
                  <TableCell className="text-right font-medium text-foreground">{inr(b.amount)}</TableCell>
                  <TableCell className="text-right font-medium text-foreground">{inr(b.balance)}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">No bills found for this filter.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="text-muted-foreground mt-4 text-sm">Showing {filtered.length} of {bills.length} bills</div>
        </CardContent>
      </Card>
    </div>
  )
}
