import { ShoppingBag, FileText, FileCheck2, IndianRupee, Wallet, Search, ChevronDown, Filter, Calendar, Printer, Upload, Download, Eye, MoreVertical } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { StatCard } from "@/components/shared/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewBillDialog } from "@/components/shared/TransactionDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: ShoppingBag, label: "Total Purchases (This FY)", value: inr(9845210, { decimals: true }), delta: "19.4%", color: "green" as const },
  { icon: FileText, label: "Total Bills", value: "1,056", delta: "14.7%", color: "blue" as const },
  { icon: FileCheck2, label: "Total Debit Notes", value: "38", delta: "6.3%", positive: false, color: "orange" as const },
  { icon: IndianRupee, label: "Average Bill Value", value: inr(93156.25, { decimals: true }), delta: "8.5%", color: "blue" as const },
]

const bills = [
  { no: "BILL/25-26/1056", date: "18 May 2025", vendor: "Global Supplies Co.", gstin: "29AAGFG1234A1Z5", type: "Purchase Bill", taxable: 45000, tax: 8100, total: 53100, status: "Paid" },
  { no: "BILL/25-26/1055", date: "17 May 2025", vendor: "Mahesh Traders", gstin: "29AAZPM9876B1Z3", type: "Purchase Bill", taxable: 28500, tax: 5130, total: 33630, status: "Partially Paid" },
  { no: "BILL/25-26/1054", date: "16 May 2025", vendor: "Shakti Enterprises", gstin: "29AACCS4567C1Z2", type: "Purchase Bill", taxable: 62000, tax: 11160, total: 73160, status: "Pending" },
  { no: "BILL/25-26/1053", date: "15 May 2025", vendor: "Vishal Hardware", gstin: "29AAKFV3456D1Z8", type: "Purchase Bill", taxable: 18600, tax: 3348, total: 21948, status: "Paid" },
  { no: "DBN/25-26/0038", date: "14 May 2025", vendor: "Global Supplies Co.", gstin: "29AAGFG1234A1Z5", type: "Debit Note", taxable: -4500, tax: -810, total: -5310, status: "Adjusted" },
  { no: "BILL/25-26/1052", date: "13 May 2025", vendor: "Ankit Distributors", gstin: "29AADCA7865E1Z9", type: "Purchase Bill", taxable: 74500, tax: 13410, total: 87910, status: "Paid" },
  { no: "BILL/25-26/1051", date: "12 May 2025", vendor: "Pooja Agencies", gstin: "29AAJPA1122F1Z4", type: "Purchase Bill", taxable: 23750, tax: 4275, total: 28025, status: "Pending" },
  { no: "BILL/25-26/1050", date: "10 May 2025", vendor: "S.K. Industries", gstin: "29AAITS7788G1Z1", type: "Purchase Bill", taxable: 115000, tax: 20700, total: 135700, status: "Paid" },
  { no: "DBN/25-26/0037", date: "09 May 2025", vendor: "Mahesh Traders", gstin: "29AAZPM9876B1Z3", type: "Debit Note", taxable: -2250, tax: -405, total: -2655, status: "Adjusted" },
  { no: "BILL/25-26/1049", date: "08 May 2025", vendor: "Om Plastics", gstin: "29AAEPO3344H1Z6", type: "Purchase Bill", taxable: 30000, tax: 5400, total: 35400, status: "Paid" },
]

function money(v: number) {
  return v < 0 ? `- ${inr(Math.abs(v))}` : inr(v)
}

const summary = [
  { name: "Paid", value: 6245210, pct: "63.4%", color: "var(--color-chart-2)" },
  { name: "Partially Paid", value: 1875600, pct: "19.1%", color: "var(--color-chart-3)" },
  { name: "Pending", value: 1724000, pct: "17.5%", color: "var(--color-chart-1)" },
  { name: "Overdue", value: 610200, pct: "6.2%", color: "var(--color-chart-5)" },
]

const ageing = [
  { label: "0 - 30 Days", value: 875450, color: "bg-success" },
  { label: "31 - 60 Days", value: 1240300, color: "bg-warning" },
  { label: "61 - 90 Days", value: 620000, color: "bg-orange-500" },
  { label: "Above 90 Days", value: 539700, color: "bg-danger" },
]

const quickActions = [
  { icon: FileText, label: "Create Purchase Bill", sub: "Add a new purchase bill" },
  { icon: FileCheck2, label: "Create Debit Note", sub: "Create a purchase return" },
  { icon: Wallet, label: "Vendor Ledger", sub: "View vendor wise ledger" },
  { icon: IndianRupee, label: "Purchase Analytics", sub: "View detailed purchase reports" },
]

export function GstPurchaseRegister() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "GST", href: "/tax/gst" }, { label: "Purchase Register" }]}
        title="Purchases Register"
        description="Track and manage all your purchase bills and credit notes."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Export</Button>
            <Button variant="outline"><Printer className="size-4" /> Print</Button>
            <Button variant="outline"><Upload className="size-4" /> Import</Button>
            <NewBillDialog>
              <DialogTrigger asChild>
                <Button>+ New Purchase</Button>
              </DialogTrigger>
            </NewBillDialog>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <div className="flex flex-col gap-5 xl:col-span-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {stats.map((s) => (
              <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} delta={{ value: s.delta, label: "vs Last FY", positive: s.positive }} color={s.color} />
            ))}
            <StatCard icon={Wallet} label="Total Payable" value={inr(3275450, { decimals: true })} color="purple" className="col-span-2 lg:col-span-1" />
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search by bill no., vendor, GSTIN..." className="pl-9" />
                </div>
                <div className="flex flex-wrap gap-2 sm:ml-auto">
                  <Button variant="outline">2025-26 <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">01/04/2025</Button>
                  <Button variant="outline">31/03/2026</Button>
                  <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                  <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Bill No.</th>
                      <th className="pb-2 font-medium">Date ↓</th>
                      <th className="pb-2 font-medium">Vendor / Party</th>
                      <th className="pb-2 font-medium">GSTIN</th>
                      <th className="pb-2 font-medium">Bill Type</th>
                      <th className="pb-2 text-right font-medium">Taxable Amount</th>
                      <th className="pb-2 text-right font-medium">Tax Amount</th>
                      <th className="pb-2 text-right font-medium">Total Amount</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map((b) => (
                      <tr key={b.no} className="border-b last:border-0">
                        <td className="py-3 font-medium whitespace-nowrap text-foreground">{b.no}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{b.date}</td>
                        <td className="py-3 whitespace-nowrap text-foreground">{b.vendor}</td>
                        <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{b.gstin}</td>
                        <td className="py-3"><Badge variant={b.type === "Debit Note" ? "danger" : "info"}>{b.type}</Badge></td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{money(b.taxable)}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{money(b.tax)}</td>
                        <td className="py-3 text-right font-medium whitespace-nowrap text-foreground">{money(b.total)}</td>
                        <td className="py-3"><StatusBadge status={b.status} /></td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon-sm"><Eye className="size-4" /></Button>
                            <Button variant="outline" size="icon-sm"><MoreVertical className="size-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 10 of 1,056 entries</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="size-8 p-0">«</Button>
                  <Button size="sm" variant="outline" className="size-8 p-0">‹</Button>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                  </div>
                  <span className="px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">106</Button>
                  <Button size="sm" variant="outline" className="size-8 p-0">›</Button>
                  <Button size="sm" variant="outline" className="size-8 p-0">»</Button>
                  <span className="ml-2">Rows per page:</span>
                  <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Purchases Summary <span className="text-muted-foreground text-xs font-normal">(FY 2025-26)</span></CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={summary} total={inr(9845210)} totalLabel="Total Purchases" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground truncate">{s.name}</span>
                    <span className="ml-auto text-right font-medium whitespace-nowrap text-foreground">
                      {inr(s.value)}<br /><span className="text-muted-foreground text-xs font-normal">({s.pct})</span>
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Payable Ageing</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {ageing.map((a) => (
                <div key={a.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span className={`size-2.5 shrink-0 rounded-full ${a.color}`} /> {a.label}
                  </span>
                  <span className="font-medium text-foreground">{inr(a.value)}</span>
                </div>
              ))}
              <a href="/reports/ap-aging" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View Payable Ageing Report →</a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col pb-3">
              {quickActions.map((a) => (
                <button key={a.label} className="hover:bg-muted -mx-1 flex items-start gap-3 rounded-lg px-1 py-2 text-left transition-colors">
                  <div className="bg-info-bg text-info-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
                    <a.icon className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{a.label}</p>
                    <p className="text-muted-foreground text-xs">{a.sub}</p>
                  </div>
                </button>
              ))}
              <a href="/reports/tax-reports" className="text-primary mt-1 text-sm font-medium">View all reports →</a>
            </CardContent>
          </Card>

          <Card className="bg-muted/40">
            <CardContent className="flex flex-col items-center gap-2 pt-5 pb-5 text-center">
              <div className="bg-success-bg text-success-foreground flex size-9 items-center justify-center rounded-full">?</div>
              <p className="text-sm font-semibold text-foreground">Need Help?</p>
              <p className="text-muted-foreground text-xs">Learn more about purchases and vendor payments.</p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">View User Guide →</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
