import { TrendingUp, FileText, ArrowUpRight, IndianRupee, ShoppingBag, Receipt, Search, ChevronDown, Filter, Calendar, Printer, Upload, Download, Eye, MoreVertical, FileBarChart2, Users2, BookUser, Truck } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { StatCard } from "@/components/shared/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewInvoiceDialog } from "@/components/shared/TransactionDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: TrendingUp, label: "Total Taxable Value", value: inr(12645780, { decimals: true }), delta: "18.62%", color: "green" as const },
  { icon: FileText, label: "Total IGST", value: inr(1872430, { decimals: true }), delta: "16.35%", color: "blue" as const },
  { icon: ArrowUpRight, label: "Total CGST", value: inr(936215, { decimals: true }), delta: "17.18%", color: "purple" as const },
  { icon: IndianRupee, label: "Total SGST", value: inr(936215, { decimals: true }), delta: "17.18%", color: "orange" as const },
  { icon: ShoppingBag, label: "Total CESS", value: inr(102450, { decimals: true }), delta: "12.44%", color: "blue" as const },
]

const KARNATAKA = "Karnataka (29)"

const invoices = [
  { no: "INV-25-26-1024", date: "18 May 2025", customer: "Global Enterprises", gstin: "29AAGFG1234A1Z5", place: KARNATAKA, taxable: 45000 },
  { no: "INV-25-26-1023", date: "17 May 2025", customer: "Techno Solutions Pvt. Ltd.", gstin: "29AABCT6789B1Z2", place: "Maharashtra (27)", taxable: 38500 },
  { no: "INV-25-26-1022", date: "16 May 2025", customer: "Sunrise Traders", gstin: "29AACCS4567C1Z2", place: KARNATAKA, taxable: 62000 },
  { no: "INV-25-26-1021", date: "15 May 2025", customer: "Krishna Retailers", gstin: "29AAACK1234D1Z1", place: "Delhi (07)", taxable: 23750, status: "Partially Paid" },
  { no: "INV-25-26-1020", date: "14 May 2025", customer: "ABC Supermart", gstin: "29AADCA7865E1Z9", place: "Uttar Pradesh (09)", taxable: 71000 },
  { no: "INV-25-26-1019", date: "13 May 2025", customer: "Shakti Distributors", gstin: "29AAEFG8901F1Z6", place: "Rajasthan (08)", taxable: 18600 },
  { no: "INV-25-26-1018", date: "12 May 2025", customer: "Nexus Infotech", gstin: "29AABCN3344G1Z6", place: "Tamil Nadu (33)", taxable: 125000, cess: 1020 },
  { no: "INV-25-26-1017", date: "11 May 2025", customer: "VR Enterprises", gstin: "29AAJPA1122F1Z4", place: "Gujarat (24)", taxable: 33600, eligible: false, status: "Overdue" },
  { no: "INV-25-26-1016", date: "10 May 2025", customer: "Om Traders", gstin: "29AAEPO3344H1Z6", place: "West Bengal (19)", taxable: 27000 },
  { no: "INV-25-26-1015", date: "09 May 2025", customer: "Bright Agencies", gstin: "29AACB1122F1Z3", place: KARNATAKA, taxable: 50000 },
].map((r) => {
  const intraState = r.place === KARNATAKA
  const igst = intraState ? 0 : Math.round(r.taxable * 0.18)
  const cgst = intraState ? Math.round(r.taxable * 0.09) : 0
  const sgst = intraState ? Math.round(r.taxable * 0.09) : 0
  const cess = r.cess ?? 0
  const total = r.taxable + igst + cgst + sgst + cess
  return { ...r, igst, cgst, sgst, cess, total, eligible: r.eligible ?? true, status: r.status ?? "Paid" }
})

function orDash(v: number) {
  return v > 0 ? inr(v) : <span className="text-muted-foreground">–</span>
}

const summary = [
  { name: "Filed", value: 856, pct: "66.7%", color: "var(--color-chart-2)" },
  { name: "Pending", value: 312, pct: "24.3%", color: "var(--color-chart-3)" },
  { name: "Overdue", value: 116, pct: "9.0%", color: "var(--color-chart-5)" },
]

const taxSummary = [
  { label: "Taxable Value", value: 12645780 },
  { label: "Total IGST", value: 1872430 },
  { label: "Total CGST", value: 936215 },
  { label: "Total SGST", value: 936215 },
  { label: "Total CESS", value: 102450 },
]

const quickActions = [
  { icon: Receipt, label: "Create Sales Invoice", sub: "Add a new GST sales invoice" },
  { icon: FileBarChart2, label: "Sales Analytics", sub: "View sales and tax reports" },
  { icon: BookUser, label: "Customer Ledger", sub: "View customer wise ledger" },
  { icon: Truck, label: "E-Way Bill Portal", sub: "Generate E-Way Bills" },
]

export function GstSalesRegister() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "GST", href: "/tax/gst" }, { label: "Sales Register" }]}
        title="GST Sales Register"
        description="View and manage all your sales invoices recorded under GST."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Export</Button>
            <Button variant="outline"><Printer className="size-4" /> Print</Button>
            <Button variant="outline"><Upload className="size-4" /> Import</Button>
            <NewInvoiceDialog>
              <DialogTrigger asChild>
                <Button>+ New Sales Invoice</Button>
              </DialogTrigger>
            </NewInvoiceDialog>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <div className="flex flex-col gap-5 xl:col-span-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
            {stats.map((s) => (
              <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} delta={{ value: s.delta, label: "vs Last FY" }} color={s.color} />
            ))}
            <StatCard icon={Users2} label="Total Invoices" value="1,284" delta={{ value: "366", label: "Customers" }} color="purple" className="col-span-2 lg:col-span-1" />
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search by invoice no., customer, GSTIN..." className="pl-9" />
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
                      <th className="pb-2 font-medium">Invoice No.</th>
                      <th className="pb-2 font-medium">Date ↓</th>
                      <th className="pb-2 font-medium">Customer / Party</th>
                      <th className="pb-2 font-medium">GSTIN</th>
                      <th className="pb-2 font-medium">Place of Supply</th>
                      <th className="pb-2 text-right font-medium">Taxable Value (₹)</th>
                      <th className="pb-2 text-right font-medium">IGST (₹)</th>
                      <th className="pb-2 text-right font-medium">CGST (₹)</th>
                      <th className="pb-2 text-right font-medium">SGST (₹)</th>
                      <th className="pb-2 text-right font-medium">CESS (₹)</th>
                      <th className="pb-2 text-right font-medium">Total Invoice (₹)</th>
                      <th className="pb-2 font-medium">ITC Applicability</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((r) => (
                      <tr key={r.no} className="border-b last:border-0">
                        <td className="py-3 font-medium whitespace-nowrap text-foreground">{r.no}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.date}</td>
                        <td className="py-3 whitespace-nowrap text-foreground">{r.customer}</td>
                        <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{r.gstin}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.place}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(r.taxable)}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{orDash(r.igst)}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{orDash(r.cgst)}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{orDash(r.sgst)}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{orDash(r.cess)}</td>
                        <td className="py-3 text-right font-medium whitespace-nowrap text-foreground">{inr(r.total)}</td>
                        <td className="py-3"><Badge variant={r.eligible ? "success" : "danger"}>{r.eligible ? "Eligible" : "Not Eligible"}</Badge></td>
                        <td className="py-3"><StatusBadge status={r.status} /></td>
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
                <span>Showing 1 to 10 of 1,284 entries</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="size-8 p-0">«</Button>
                  <Button size="sm" variant="outline" className="size-8 p-0">‹</Button>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                  </div>
                  <span className="px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">129</Button>
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
            <CardHeader><CardTitle>GSTR-1 Summary <span className="text-muted-foreground text-xs font-normal">(FY 2025-26)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              <div className="flex items-center gap-4">
                <DonutChart data={summary} total="1,284" totalLabel="Total Invoices" size={140} />
                <ul className="flex flex-col gap-2 text-sm">
                  {summary.map((s) => (
                    <li key={s.name} className="flex items-center gap-2">
                      <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                      <span className="text-muted-foreground">{s.name}</span>
                      <span className="ml-auto font-medium whitespace-nowrap text-foreground">{s.value} <span className="text-muted-foreground text-xs font-normal">({s.pct})</span></span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/tax/gst/gstr-1" className="text-primary flex items-center gap-1 text-sm font-medium">View GSTR-1 Report →</a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Tax Summary <span className="text-muted-foreground text-xs font-normal">(This FY)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              {taxSummary.map((t) => (
                <div key={t.label} className="flex justify-between">
                  <span className="text-muted-foreground">{t.label}</span>
                  <span className="font-medium text-foreground">{inr(t.value)}</span>
                </div>
              ))}
              <a href="/tax/gst/gstr-3b" className="text-primary mt-1 text-sm font-medium">View tax summary →</a>
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
              <a href="/tax/gst/sales-register" className="text-primary mt-1 text-sm font-medium">View all actions →</a>
            </CardContent>
          </Card>

          <Card className="bg-muted/40">
            <CardContent className="flex flex-col items-center gap-2 pt-5 pb-5 text-center">
              <div className="bg-success-bg text-success-foreground flex size-9 items-center justify-center rounded-full">?</div>
              <p className="text-sm font-semibold text-foreground">Need Help?</p>
              <p className="text-muted-foreground text-xs">Learn more about GST sales register and reports.</p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">View User Guide →</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
