import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FileText, Clock, FileEdit, Wallet, CalendarRange, Upload, Plus, Search, SlidersHorizontal, ChevronDown } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewInvoiceDialog } from "@/components/shared/TransactionDialogs"
import { inr } from "@/lib/format"

const invoices = [
  { no: "INV-1024", customer: "Acme Corporation", issue: "20 May 2025", due: "20 Jun 2025", status: "Paid", amount: 75000, paid: 75000, balance: 0, recurring: false },
  { no: "INV-1023", customer: "Globex Pvt. Ltd.", issue: "18 May 2025", due: "17 Jun 2025", status: "Part Paid", amount: 45000, paid: 20000, balance: 25000, recurring: false },
  { no: "INV-1022", customer: "Soylent Corp.", issue: "15 May 2025", due: "14 Jun 2025", status: "Overdue", amount: 120000, paid: 0, balance: 120000, recurring: false },
  { no: "INV-1021", customer: "Initech", issue: "10 May 2025", due: "09 Jun 2025", status: "Paid", amount: 60000, paid: 60000, balance: 0, recurring: true },
  { no: "INV-1020", customer: "Umbrella Corp.", issue: "08 May 2025", due: "07 Jun 2025", status: "Paid", amount: 85000, paid: 85000, balance: 0, recurring: false },
  { no: "INV-1019", customer: "Stark Industries", issue: "05 May 2025", due: "04 Jun 2025", status: "Paid", amount: 56000, paid: 56000, balance: 0, recurring: true },
  { no: "INV-1018", customer: "Wayne Enterprises", issue: "02 May 2025", due: "01 Jun 2025", status: "Overdue", amount: 90000, paid: 10000, balance: 80000, recurring: false },
  { no: "INV-1017", customer: "Oscorp Industries", issue: "30 Apr 2025", due: "30 May 2025", status: "Draft", amount: 30000, paid: 0, balance: 30000, recurring: false },
]

const invoiceTabs = [
  { value: "all", label: "All Invoices" },
  { value: "open", label: "Open" },
  { value: "overdue", label: "Overdue" },
  { value: "paid", label: "Paid" },
  { value: "draft", label: "Draft" },
  { value: "recurring", label: "Recurring" },
] as const

export function Invoices() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<(typeof invoiceTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return invoices.filter((inv) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "open" ? inv.status === "Part Paid" :
        tab === "overdue" ? inv.status === "Overdue" :
        tab === "paid" ? inv.status === "Paid" :
        tab === "draft" ? inv.status === "Draft" :
        tab === "recurring" ? inv.recurring :
        true
      const matchesQuery = !q || inv.no.toLowerCase().includes(q) || inv.customer.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Sales", href: "/sales" }, { label: "Invoices" }]}
        title="Invoices"
        description="Manage and track all your customer invoices."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import</Button>
            <NewInvoiceDialog>
              <DialogTrigger asChild>
                <Button><Plus className="size-4" /> Create Invoice</Button>
              </DialogTrigger>
            </NewInvoiceDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={FileText} label="5 Open Invoices" value={inr(785000)} color="blue" />
        <StatCard icon={Clock} label="8 Overdue Invoices" value={inr(1245000)} color="orange" />
        <StatCard icon={FileEdit} label="3 Draft Invoices" value={inr(245000)} color="purple" />
        <StatCard icon={Wallet} label="This Month" value={inr(2845000)} color="green" />
        <StatCard icon={CalendarRange} label="This Financial Year" value={inr(11520000)} color="blue" className="col-span-2 lg:col-span-1" />
      </div>

      <Card>
        <CardContent className="pt-5">
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList>
              {invoiceTabs.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input placeholder="Search invoices..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="flex gap-2 sm:ml-auto">
              <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
              <Button variant="outline">Export <ChevronDown className="size-3.5" /></Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice No.</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Paid</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((inv) => (
                <TableRow key={inv.no} className="cursor-pointer" onClick={() => navigate(`/sales/invoices/${inv.no}`)}>
                  <TableCell className="text-primary font-medium">{inv.no}</TableCell>
                  <TableCell className="text-foreground">{inv.customer}</TableCell>
                  <TableCell className="text-muted-foreground">{inv.issue}</TableCell>
                  <TableCell className="text-muted-foreground">{inv.due}</TableCell>
                  <TableCell><StatusBadge status={inv.status} /></TableCell>
                  <TableCell className="text-right font-medium text-foreground">{inr(inv.amount)}</TableCell>
                  <TableCell className="text-muted-foreground text-right">{inr(inv.paid)}</TableCell>
                  <TableCell className="text-right font-medium text-foreground">{inr(inv.balance)}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-muted-foreground py-8 text-center">
                    No invoices found for this filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span>Showing {filtered.length} of {invoices.length} invoices</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((p) => (
                <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">
                  {p}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
