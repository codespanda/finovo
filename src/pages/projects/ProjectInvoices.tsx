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
  { no: "PINV-2041", project: "Website Redesign", code: "PRJ-001", customer: "Acme Corporation", issue: "20 May 2025", due: "20 Jun 2025", status: "Paid", amount: 185000, paid: 185000, balance: 0 },
  { no: "PINV-2040", project: "Mobile App Launch", code: "PRJ-002", customer: "Globex Pvt. Ltd.", issue: "18 May 2025", due: "17 Jun 2025", status: "Part Paid", amount: 245000, paid: 100000, balance: 145000 },
  { no: "PINV-2039", project: "Inventory System", code: "PRJ-003", customer: "Soylent Corp.", issue: "15 May 2025", due: "14 Jun 2025", status: "Overdue", amount: 320000, paid: 0, balance: 320000 },
  { no: "PINV-2038", project: "Q3 Marketing Campaign", code: "PRJ-004", customer: "Initech", issue: "10 May 2025", due: "09 Jun 2025", status: "Paid", amount: 96000, paid: 96000, balance: 0 },
  { no: "PINV-2037", project: "Website Redesign", code: "PRJ-001", customer: "Umbrella Corp.", issue: "08 May 2025", due: "07 Jun 2025", status: "Paid", amount: 142000, paid: 142000, balance: 0 },
  { no: "PINV-2036", project: "Mobile App Launch", code: "PRJ-002", customer: "Stark Industries", issue: "05 May 2025", due: "04 Jun 2025", status: "Paid", amount: 210000, paid: 210000, balance: 0 },
  { no: "PINV-2035", project: "Inventory System", code: "PRJ-003", customer: "Wayne Enterprises", issue: "02 May 2025", due: "01 Jun 2025", status: "Overdue", amount: 175000, paid: 25000, balance: 150000 },
  { no: "PINV-2034", project: "Q3 Marketing Campaign", code: "PRJ-004", customer: "Oscorp Industries", issue: "30 Apr 2025", due: "30 May 2025", status: "Draft", amount: 68000, paid: 0, balance: 68000 },
]

const invoiceTabs = [
  { value: "all", label: "All Invoices" },
  { value: "open", label: "Open" },
  { value: "overdue", label: "Overdue" },
  { value: "paid", label: "Paid" },
  { value: "draft", label: "Draft" },
] as const

export function ProjectInvoices() {
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
        true
      const matchesQuery = !q || inv.no.toLowerCase().includes(q) || inv.project.toLowerCase().includes(q) || inv.customer.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Projects", href: "/projects" }, { label: "Invoices" }]}
        title="Project Invoices"
        description="Manage and track invoices billed against your projects."
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
        <StatCard icon={FileText} label="4 Open Invoices" value={inr(1075000)} color="blue" />
        <StatCard icon={Clock} label="2 Overdue Invoices" value={inr(470000)} color="orange" />
        <StatCard icon={FileEdit} label="1 Draft Invoice" value={inr(68000)} color="purple" />
        <StatCard icon={Wallet} label="This Month" value={inr(1441000)} color="green" />
        <StatCard icon={CalendarRange} label="This Financial Year" value={inr(8245000)} color="blue" className="col-span-2 lg:col-span-1" />
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
              <Input placeholder="Search invoices by project or customer..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className="flex gap-2 sm:ml-auto">
              <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
              <Button variant="outline">All Projects <ChevronDown className="size-3.5" /></Button>
              <Button variant="outline">Export <ChevronDown className="size-3.5" /></Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice No.</TableHead>
                <TableHead>Project</TableHead>
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
                  <TableCell className="text-primary font-medium whitespace-nowrap">{inv.no}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <p className="text-foreground">{inv.project}</p>
                    <p className="text-muted-foreground text-xs">{inv.code}</p>
                  </TableCell>
                  <TableCell className="text-foreground whitespace-nowrap">{inv.customer}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{inv.issue}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{inv.due}</TableCell>
                  <TableCell><StatusBadge status={inv.status} /></TableCell>
                  <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{inr(inv.amount)}</TableCell>
                  <TableCell className="text-muted-foreground text-right whitespace-nowrap">{inr(inv.paid)}</TableCell>
                  <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{inr(inv.balance)}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-muted-foreground py-8 text-center">No invoices found for this filter.</TableCell>
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
