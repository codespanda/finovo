import { useMemo, useState } from "react"
import { Info, IndianRupee, CheckCircle2, Hourglass, XCircle, Search, ChevronDown, Filter, RefreshCcw, Calendar, Download, Eye, MoreVertical, FileCheck, FileClock, UploadCloud } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonutChart } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const stats = [
  { icon: IndianRupee, label: "GSTR-2B Total (Taxable)", value: inr(12645780, { decimals: true }), sub: "From 412 documents", color: "blue" as const },
  { icon: CheckCircle2, label: "ITC Available (Eligible)", value: inr(11876540, { decimals: true }), sub: "93.93% of 2B Total", color: "green" as const },
  { icon: FileCheck, label: "Matched (Reconciled)", value: inr(10845230, { decimals: true }), sub: "85.77% of 2B Total", color: "blue" as const },
  { icon: Hourglass, label: "Partially Matched", value: inr(875610, { decimals: true }), sub: "6.93% of 2B Total", color: "orange" as const },
  { icon: XCircle, label: "Unmatched", value: inr(924940, { decimals: true }), sub: "7.30% of 2B Total", color: "red" as const },
]

const colorMap: Record<string, string> = {
  blue: "bg-info-bg text-info-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const tabs = ["Summary", "Matched (356)", "Partially Matched (28)", "Unmatched (28)", "ITC Not Available (35)", "Reverse Charge (8)", "ISD (12)"]

const overview = [
  { name: "Matched", value: 356, pct: "85.77%", color: "var(--color-chart-2)" },
  { name: "Partially Matched", value: 28, pct: "6.93%", color: "var(--color-chart-3)" },
  { name: "Unmatched", value: 28, pct: "7.30%", color: "var(--color-chart-5)" },
  { name: "ITC Not Available", value: 35, pct: "8.50%", color: "var(--color-muted-foreground)" },
]

const mismatches = [
  { label: "Invoice / Debit Note not in Books", value: 612450, pct: 100, color: "var(--color-danger-foreground)" },
  { label: "Taxable Value Mismatch", value: 165230, pct: 27, color: "var(--color-warning-foreground)" },
  { label: "Tax Amount Mismatch", value: 112760, pct: 18, color: "var(--color-warning-foreground)" },
  { label: "GSTIN Mismatch", value: 75800, pct: 12, color: "var(--color-warning-foreground)" },
  { label: "Document Type Mismatch", value: 58700, pct: 10, color: "var(--color-warning-foreground)" },
]

const itcAvailability = [
  { name: "ITC Available (Eligible)", value: 1187654000, pct: "93.93%", color: "var(--color-chart-2)" },
  { name: "ITC Not Available (Ineligible)", value: 76924000, pct: "6.07%", color: "var(--color-chart-5)" },
]

const statusColors: Record<string, "success" | "warning" | "danger"> = { Matched: "success", "Partially Matched": "warning", Unmatched: "danger" }
const itcColors: Record<string, "success" | "danger"> = { Eligible: "success", Ineligible: "danger" }

const docs = [
  { name: "Global Enterprises", gstin: "29AAGFG1234A1Z5", type: "Tax Invoice", no: "GE/25-26/1124", date: "18 Apr 2025", taxable: 45000, tax: 8100, status: "Matched", itc: "Eligible" },
  { name: "Techno Solutions Pvt. Ltd.", gstin: "29AABCT6789B1Z2", type: "Tax Invoice", no: "TSPL/25-26/0987", date: "17 Apr 2025", taxable: 38500, tax: 5280, status: "Matched", itc: "Eligible" },
  { name: "Sunrise Traders", gstin: "29AACCS4567C1Z2", type: "Tax Invoice", no: "ST/25-26/0765", date: "16 Apr 2025", taxable: 62000, tax: 11160, status: "Partially Matched", itc: "Eligible" },
  { name: "Krishna Retailers", gstin: "29AAACK1234D1Z1", type: "Tax Invoice", no: "KR/25-26/0554", date: "15 Apr 2025", taxable: 23750, tax: 4275, status: "Partially Matched", itc: "Eligible" },
  { name: "ABC Supermart", gstin: "29AADCA7865E1Z9", type: "Credit Note", no: "CN/25-26/0098", date: "14 Apr 2025", taxable: -4500, tax: -810, status: "Matched", itc: "Eligible" },
  { name: "Shakti Distributors", gstin: "29AAEFG8901F1Z6", type: "Tax Invoice", no: "SD/25-26/0432", date: "13 Apr 2025", taxable: 18600, tax: 3348, status: "Unmatched", itc: "Ineligible" },
  { name: "Nexus Infotech", gstin: "29AABCN5344G1Z6", type: "Tax Invoice", no: "NI/25-26/0321", date: "12 Apr 2025", taxable: 125000, tax: 22500, status: "Unmatched", itc: "Ineligible" },
  { name: "VR Enterprises", gstin: "29AAJPA1122F1Z4", type: "Debit Note", no: "DN/25-26/0044", date: "11 Apr 2025", taxable: -2250, tax: -405, status: "Unmatched", itc: "Ineligible" },
]

function money(v: number) {
  return v < 0 ? `(${inr(Math.abs(v)).replace("₹", "")})` : inr(v)
}

const reconSummary = [
  { label: "Total Documents", value: "412" },
  { label: "Total Taxable Value", value: inr(12645780, { decimals: true }) },
  { label: "Total Tax Amount", value: inr(2362180, { decimals: true }) },
  { label: "ITC Available (Eligible)", value: inr(11876540, { decimals: true }) },
  { label: "ITC Not Available (Ineligible)", value: inr(769240, { decimals: true }) },
]

const comparison = [
  { particulars: "Taxable Value", data: 12645780, books: 12488560, diff: 157220 },
  { particulars: "IGST", data: 972430, books: 958680, diff: 13750 },
  { particulars: "CGST", data: 486215, books: 478335, diff: 7880 },
  { particulars: "SGST", data: 486215, books: 478335, diff: 7880 },
  { particulars: "CESS", data: 102450, books: 98300, diff: 4150 },
]

const quickActions = [
  { icon: RefreshCcw, label: "Reconcile Now", sub: "Match 2B with your purchase records" },
  { icon: FileCheck, label: "View Reconciliation Report", sub: "Download detailed reconciliation report" },
  { icon: FileClock, label: "ITC Summary Report", sub: "View ITC availability summary" },
  { icon: UploadCloud, label: "Upload Purchase Data", sub: "Upload purchase data for reconciliation" },
]

export function GstReconciliation() {
  const [tab, setTab] = useState(tabs[0])
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return docs.filter((d) => {
      const matchesTab =
        tab === "Summary" ? true :
        tab.startsWith("Matched") ? d.status === "Matched" :
        tab.startsWith("Partially Matched") ? d.status === "Partially Matched" :
        tab.startsWith("Unmatched") ? d.status === "Unmatched" :
        tab.startsWith("ITC Not Available") ? d.itc === "Ineligible" :
        false
      const matchesQuery = !q || d.name.toLowerCase().includes(q) || d.gstin.toLowerCase().includes(q) || d.no.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "GST", href: "/tax/gst" }, { label: "GSTR-2B Reconciliation" }]}
        title={<span className="flex items-center gap-2">GSTR-2B Reconciliation <Info className="text-muted-foreground size-4" /></span>}
        description="Reconcile your purchase data with GSTR-2B to ensure accurate ITC claims."
        actions={
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline"><Calendar className="size-4" /> April 2025 <ChevronDown className="size-3.5" /></Button>
              <Button variant="outline"><RefreshCcw className="size-4" /> Refresh 2B Data</Button>
              <Button><Download className="size-4" /> Download 2B (JSON) <ChevronDown className="size-3.5" /></Button>
            </div>
            <span className="text-success-foreground flex items-center gap-1 text-xs">
              <CheckCircle2 className="size-3.5" /> Last fetched on 30 Apr 2025, 10:30 AM
            </span>
          </div>
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
                <p className="text-muted-foreground text-xs">{s.sub}</p>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList>
                  {tabs.map((t) => (
                    <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
                <Card>
                  <CardHeader><CardTitle>Reconciliation Overview</CardTitle></CardHeader>
                  <CardContent className="flex items-center gap-3 pb-5">
                    <DonutChart data={overview} total="412" totalLabel="Total Docs" size={130} />
                    <ul className="flex flex-col gap-1.5 text-xs">
                      {overview.map((o) => (
                        <li key={o.name} className="flex items-center gap-1.5">
                          <span className="size-2.5 shrink-0 rounded-full" style={{ background: o.color }} />
                          <span className="text-foreground">{o.name}</span>
                          <span className="text-muted-foreground">{o.value} ({o.pct})</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>Mismatch Summary <span className="text-muted-foreground text-xs font-normal">(Top Reasons)</span></CardTitle></CardHeader>
                  <CardContent className="flex flex-col gap-3 pb-5">
                    {mismatches.map((m) => (
                      <div key={m.label}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="text-muted-foreground truncate">{m.label}</span>
                          <span className="ml-2 shrink-0 font-medium whitespace-nowrap text-foreground">{inr(m.value)}</span>
                        </div>
                        <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                          <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.color }} />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader><CardTitle>ITC Availability <span className="text-muted-foreground text-xs font-normal">(Eligible vs Ineligible)</span></CardTitle></CardHeader>
                  <CardContent className="flex flex-col items-center gap-3 pb-5">
                    <DonutChart data={itcAvailability} total={inr(12645780)} totalLabel="2B Total" size={130} />
                    <ul className="w-full text-xs">
                      {itcAvailability.map((i) => (
                        <li key={i.name} className="flex items-center gap-1.5 py-0.5">
                          <span className="size-2.5 shrink-0 rounded-full" style={{ background: i.color }} />
                          <span className="text-foreground flex-1 truncate">{i.name}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="w-full text-xs">
                      {itcAvailability.map((i) => (
                        <li key={i.name} className="text-muted-foreground flex justify-between py-0.5">
                          <span>{inr(i.value / 100)}</span>
                          <span>({i.pct})</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-5 mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search by Vendor, GSTIN, Invoice No..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="flex flex-wrap gap-2 sm:ml-auto">
                  <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                  <Button variant="outline" size="icon"><RefreshCcw className="size-4" /></Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Supplier / Party</th>
                      <th className="pb-2 font-medium">GSTIN</th>
                      <th className="pb-2 font-medium">Document Type</th>
                      <th className="pb-2 font-medium">Document No.</th>
                      <th className="pb-2 font-medium">Document Date</th>
                      <th className="pb-2 text-right font-medium">Taxable Value (₹)</th>
                      <th className="pb-2 text-right font-medium">Tax Amount (₹)</th>
                      <th className="pb-2 font-medium">2B Status</th>
                      <th className="pb-2 font-medium">ITC Availability</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((d) => (
                      <tr key={d.no} className="border-b last:border-0">
                        <td className="py-3 whitespace-nowrap text-foreground">{d.name}</td>
                        <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{d.gstin}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{d.type}</td>
                        <td className="py-3 whitespace-nowrap text-foreground">{d.no}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{d.date}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{money(d.taxable)}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{money(d.tax)}</td>
                        <td className="py-3"><Badge variant={statusColors[d.status]}>{d.status}</Badge></td>
                        <td className="py-3"><Badge variant={itcColors[d.itc]}>{d.itc}</Badge></td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon-sm"><Eye className="size-4" /></Button>
                            <Button variant="outline" size="icon-sm"><MoreVertical className="size-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={10} className="text-muted-foreground py-8 text-center">No entries found for this filter.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing {filtered.length} of {docs.length} entries</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="size-8 p-0">«</Button>
                  <Button size="sm" variant="outline" className="size-8 p-0">‹</Button>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                  </div>
                  <span className="px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">42</Button>
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
            <CardHeader><CardTitle>Reconciliation Summary</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              {reconSummary.map((r) => (
                <div key={r.label} className="flex justify-between">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium whitespace-nowrap text-foreground">{r.value}</span>
                </div>
              ))}
              <a href="/tax/gst/reconciliation" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View detailed summary →</a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>2B vs Books Comparison</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto pb-5">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-muted-foreground border-b text-left">
                    <th className="pb-2 font-medium">Particulars</th>
                    <th className="pb-2 text-right font-medium">2B Data (₹)</th>
                    <th className="pb-2 text-right font-medium">Books (₹)</th>
                    <th className="pb-2 text-right font-medium">Diff (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((c) => (
                    <tr key={c.particulars} className="border-b last:border-0">
                      <td className="py-2 font-medium whitespace-nowrap text-foreground">{c.particulars}</td>
                      <td className="py-2 text-right whitespace-nowrap text-foreground">{inr(c.data)}</td>
                      <td className="py-2 text-right whitespace-nowrap text-foreground">{inr(c.books)}</td>
                      <td className="text-warning-foreground py-2 text-right whitespace-nowrap">{inr(c.diff)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <a href="/tax/gst/reconciliation" className="text-primary mt-3 flex items-center gap-1 text-sm font-medium">View full comparison →</a>
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
              <p className="text-muted-foreground text-xs">Learn more about GSTR-2B reconciliation and ITC matching.</p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">View User Guide →</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
