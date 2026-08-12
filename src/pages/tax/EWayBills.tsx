import { FileText, CheckCircle2, Clock, Truck, XCircle, Route, IndianRupee, PieChart, Percent, ChevronDown, Filter, RefreshCcw, PackagePlus, Layers, Car, Ban, Eye, MoreVertical } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { GenerateEWayBillDialog } from "@/components/shared/TaxFilingDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: FileText, label: "Total E-Way Bills", value: "324", sub: "This Month", link: "View All", color: "blue" as const },
  { icon: CheckCircle2, label: "Active", value: "278", sub: "85.80%", link: "View", color: "green" as const },
  { icon: Clock, label: "In Transit", value: "32", sub: "9.88%", link: "View", color: "orange" as const },
  { icon: Truck, label: "Expired", value: "10", sub: "3.09%", link: "View", color: "purple" as const },
  { icon: XCircle, label: "Cancelled", value: "4", sub: "1.23%", link: "View", color: "red" as const },
]

const colorMap: Record<string, string> = {
  blue: "bg-info-bg text-info-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const metrics = [
  { icon: Route, label: "Total Distance", value: "12,450 Kms", color: "blue" as const },
  { icon: IndianRupee, label: "Total Value", value: inr(12645780, { decimals: true }), color: "green" as const },
  { icon: PieChart, label: "Total Taxable Value", value: inr(10824560, { decimals: true }), color: "purple" as const },
  { icon: Percent, label: "Total Tax", value: inr(1821220, { decimals: true }), color: "purple" as const },
]

const bills = [
  { no: "4017 8965 2143", date: "30/04/2025", doc: "INV-25-26-1024", supply: "Outward", from: "Delhi", to: "Karnataka", type: "Tax Invoice", value: 45000, status: "Active", valid: "03/05/2025 11:59 PM" },
  { no: "4017 8964 9876", date: "30/04/2025", doc: "INV-25-26-1023", supply: "Outward", from: "Punjab", to: "Maharashtra", type: "Tax Invoice", value: 38500, status: "In Transit", valid: "02/05/2025 11:59 PM" },
  { no: "4017 8964 5210", date: "29/04/2025", doc: "INV-25-26-1022", supply: "Outward", from: "Haryana", to: "Uttar Pradesh", type: "Tax Invoice", value: 62000, status: "Active", valid: "01/05/2025 11:59 PM" },
  { no: "4017 8963 1156", date: "29/04/2025", doc: "CHL-25-26-0045", supply: "Outward", from: "Delhi", to: "Rajasthan", type: "Delivery Challan", value: 23750, status: "Active", valid: "01/05/2025 11:59 PM" },
  { no: "4017 8962 7787", date: "28/04/2025", doc: "INV-25-26-1021", supply: "Outward", from: "Gujarat", to: "Madhya Pradesh", type: "Tax Invoice", value: 71000, status: "Expired", valid: "29/04/2025 11:59 PM" },
  { no: "4017 8962 3344", date: "28/04/2025", doc: "INV-25-26-1020", supply: "Outward", from: "Tamil Nadu", to: "Telangana", type: "Tax Invoice", value: 18600, status: "Active", valid: "30/04/2025 11:59 PM" },
  { no: "4017 8961 9021", date: "27/04/2025", doc: "INV-25-26-1019", supply: "Outward", from: "Punjab", to: "West Bengal", type: "Tax Invoice", value: 33600, status: "In Transit", valid: "29/04/2025 11:59 PM" },
  { no: "4017 8961 3342", date: "27/04/2025", doc: "INV-25-26-1018", supply: "Outward", from: "Kerala", to: "Andhra Pradesh", type: "Tax Invoice", value: 27000, status: "Cancelled", valid: "–" },
  { no: "4017 8960 6678", date: "26/04/2025", doc: "INV-25-26-1017", supply: "Outward", from: "Delhi", to: "Bihar", type: "Tax Invoice", value: 50000, status: "Active", valid: "28/04/2025 11:59 PM" },
  { no: "4017 8959 4455", date: "26/04/2025", doc: "INV-25-26-1016", supply: "Outward", from: "Maharashtra", to: "Chhattisgarh", type: "Tax Invoice", value: 19250, status: "Active", valid: "28/04/2025 11:59 PM" },
]

const summary = [
  { name: "Active", value: 278, pct: "85.80%", color: "var(--color-chart-2)" },
  { name: "In Transit", value: 32, pct: "9.88%", color: "var(--color-chart-3)" },
  { name: "Expired", value: 10, pct: "3.09%", color: "var(--color-chart-5)" },
  { name: "Cancelled", value: 4, pct: "1.23%", color: "var(--color-muted-foreground)" },
]

const activities = [
  { icon: CheckCircle2, bg: "bg-success-bg text-success-foreground", label: "EWB 401789652143 generated", sub: "30 Apr 2025, 10:15 AM" },
  { icon: Truck, bg: "bg-info-bg text-info-foreground", label: "EWB 401789649876 in transit", sub: "30 Apr 2025, 09:45 AM" },
  { icon: Clock, bg: "bg-warning-bg text-warning-foreground", label: "EWB 401789631156 expired", sub: "29 Apr 2025, 11:59 PM" },
  { icon: XCircle, bg: "bg-danger-bg text-danger-foreground", label: "EWB 401789613342 cancelled", sub: "29 Apr 2025, 04:20 PM" },
]

const quickActions = [
  { icon: PackagePlus, label: "Generate E-Way Bill", sub: "Create new EWB for your invoice" },
  { icon: Layers, label: "Bulk Generate EWB", sub: "Generate EWB for multiple invoices" },
  { icon: Car, label: "Update Vehicle Details", sub: "Update vehicle number in EWB" },
  { icon: Ban, label: "Cancel E-Way Bill", sub: "Cancel an existing EWB" },
]

export function EWayBills() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "GST", href: "/tax/gst" }, { label: "E-Way Bills" }]}
        title="E-Way Bills"
        description="Generate, manage and track your E-Way Bills in real-time."
        actions={
          <>
            <Button variant="outline"><RefreshCcw className="size-4" /> Refresh</Button>
            <Button variant="outline"><Layers className="size-4" /> Bulk Generation</Button>
            <GenerateEWayBillDialog>
              <DialogTrigger asChild>
                <Button>+ Generate E-Way Bill</Button>
              </DialogTrigger>
            </GenerateEWayBillDialog>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <div className="flex flex-col gap-5 xl:col-span-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
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
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">{s.sub}</span>
                  <a href="/tax/gst/e-way-bills" className="text-primary text-xs font-medium">{s.link}</a>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button variant="outline">01/04/2025</Button>
                <Button variant="outline">30/04/2025</Button>
                <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                <Input placeholder="Enter EWB No." className="max-w-[160px]" />
                <div className="flex gap-2 sm:ml-auto">
                  <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                  <Button variant="outline" size="icon"><RefreshCcw className="size-4" /></Button>
                </div>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {metrics.map((m) => (
                  <div key={m.label} className="flex items-center gap-3 rounded-lg border p-3">
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${colorMap[m.color]}`}>
                      <m.icon className="size-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-muted-foreground truncate text-xs">{m.label}</p>
                      <p className="truncate text-sm font-bold text-foreground">{m.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">E-Way Bill No.</th>
                      <th className="pb-2 font-medium">EWB Date</th>
                      <th className="pb-2 font-medium">Invoice / Doc No.</th>
                      <th className="pb-2 font-medium">Supply Type</th>
                      <th className="pb-2 font-medium">From</th>
                      <th className="pb-2 font-medium">To</th>
                      <th className="pb-2 font-medium">Doc Type</th>
                      <th className="pb-2 text-right font-medium">Value (₹)</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Valid Upto</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map((b) => (
                      <tr key={b.no} className="border-b last:border-0">
                        <td className="text-primary py-3 font-medium whitespace-nowrap">{b.no}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{b.date}</td>
                        <td className="py-3 whitespace-nowrap text-foreground">{b.doc}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{b.supply}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{b.from}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{b.to}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{b.type}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(b.value, { decimals: true })}</td>
                        <td className="py-3"><StatusBadge status={b.status} /></td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{b.valid}</td>
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
                <span>Showing 1 to 10 of 324 entries</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="size-8 p-0">«</Button>
                  <Button size="sm" variant="outline" className="size-8 p-0">‹</Button>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                  </div>
                  <span className="px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">33</Button>
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
            <CardHeader><CardTitle>E-Way Bill Summary <span className="text-muted-foreground text-xs font-normal">(Apr 2025)</span></CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={summary} total="324" totalLabel="Total EWB" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="ml-auto font-medium whitespace-nowrap text-foreground">{s.value} ({s.pct})</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <a href="/tax/gst/e-way-bills" className="text-primary -mt-4 flex items-center gap-1 text-sm font-medium">View EWB Summary Report →</a>

          <Card>
            <CardHeader><CardTitle>Recent Activities</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-1 pb-3">
              {activities.map((a, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${a.bg}`}>
                    <a.icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{a.label}</p>
                    <p className="text-muted-foreground text-xs">{a.sub}</p>
                  </div>
                </div>
              ))}
              <a href="/tax/gst/e-way-bills" className="text-primary mt-1 text-sm font-medium">View all activities →</a>
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
            </CardContent>
          </Card>

          <Card className="bg-muted/40">
            <CardContent className="flex flex-col items-center gap-2 pt-5 pb-5 text-center">
              <div className="bg-success-bg text-success-foreground flex size-9 items-center justify-center rounded-full">?</div>
              <p className="text-sm font-semibold text-foreground">Need Help?</p>
              <p className="text-muted-foreground text-xs">Learn more about E-Way Bills and rules.</p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">View User Guide →</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
