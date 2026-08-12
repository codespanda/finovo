import { useState } from "react"
import { Landmark, XCircle, TrendingUp, ShieldAlert, ChevronDown, RefreshCcw, Filter, Download, Eye, FileMinus2, FilePlus2, BookOpen, FileBarChart2 } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DonutChart } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const stats = [
  { icon: Landmark, label: "ITC Available (Eligible)", value: inr(1876540, { decimals: true }), delta: "12.45%", color: "green" as const },
  { icon: Landmark, label: "ITC Availed (Claimed)", value: inr(1572930, { decimals: true }), delta: "10.23%", color: "blue" as const },
  { icon: XCircle, label: "ITC Reversed", value: inr(125400, { decimals: true }), delta: "5.12%", positive: false, color: "purple" as const },
  { icon: TrendingUp, label: "Net ITC Available", value: inr(1751140, { decimals: true }), delta: "11.89%", color: "blue" as const },
  { icon: ShieldAlert, label: "Ineligible ITC", value: inr(769240, { decimals: true }), delta: "6.34%", positive: false, color: "orange" as const },
]

const tabs = ["ITC by Tax Components", "ITC by Documents", "ITC by Supplier", "ITC Reversal", "Blocked Credits", "ITC Ledger"]

const components = [
  { name: "CGST", eligible: 423515, availed: 365210, reversed: 32480, net: 390795, pct: 86.24, color: "bg-success" },
  { name: "SGST", eligible: 423515, availed: 365210, reversed: 32480, net: 390795, pct: 86.24, color: "bg-success" },
  { name: "IGST", eligible: 985960, availed: 820510, reversed: 45960, net: 939990, pct: 83.18, color: "bg-success" },
  { name: "CESS", eligible: 43550, availed: 22000, reversed: 14480, net: 29070, pct: 50.52, color: "bg-warning" },
]
const componentsTotal = { eligible: 1876540, availed: 1572930, reversed: 125400, net: 1751140, pct: 83.74 }

const eligColors: Record<string, "success" | "warning"> = { "Fully Eligible": "success", "Partially Eligible": "warning" }
const statusColors: Record<string, "success" | "info"> = { Available: "success", Adjusted: "info" }

const docs = [
  { name: "Global Enterprises", gstin: "29AAGFG1234A1Z5", type: "Tax Invoice", no: "GE/25-26/1124", date: "18/04/2025", taxable: 45000, igst: 8100, cgst: 4050, sgst: 4050, cess: 0, status: "Available", eligibility: "Fully Eligible" },
  { name: "Techno Solutions Pvt. Ltd.", gstin: "29AABCT6789B1Z2", type: "Tax Invoice", no: "TSPL/25-26/0987", date: "17/04/2025", taxable: 38500, igst: 0, cgst: 2640, sgst: 2640, cess: 0, status: "Available", eligibility: "Fully Eligible" },
  { name: "Sunrise Traders", gstin: "29AACCS4567C1Z2", type: "Debit Note", no: "ST/25-26/0765", date: "16/04/2025", taxable: -5000, igst: -900, cgst: -450, sgst: -450, cess: 0, status: "Adjusted", eligibility: "Fully Eligible" },
  { name: "Krishna Retailers", gstin: "29AAACK1234D1Z1", type: "Tax Invoice", no: "KR/25-26/0554", date: "15/04/2025", taxable: 23750, igst: 0, cgst: 1625, sgst: 1625, cess: 0, status: "Available", eligibility: "Partially Eligible" },
  { name: "ABC Supermart", gstin: "29AADCA7865E1Z9", type: "Credit Note", no: "CN/25-26/0098", date: "14/04/2025", taxable: -4500, igst: -810, cgst: -405, sgst: -405, cess: 0, status: "Adjusted", eligibility: "Fully Eligible" },
]

function money(v: number) {
  if (v === 0) return <span className="text-muted-foreground">–</span>
  return v < 0 ? <span className="text-destructive">({inr(Math.abs(v), { decimals: true }).replace("₹", "")})</span> : inr(v, { decimals: true })
}

const summary = [
  { name: "CGST", value: 423515, pct: "22.57%", color: "var(--color-chart-2)" },
  { name: "SGST", value: 423515, pct: "22.57%", color: "var(--color-chart-1)" },
  { name: "IGST", value: 985960, pct: "52.56%", color: "var(--color-chart-4)" },
  { name: "CESS", value: 43550, pct: "2.31%", color: "var(--color-chart-3)" },
]

const eligibility = [
  { label: "Fully Eligible", value: 1675340, pct: "89.29%", color: "bg-success" },
  { label: "Partially Eligible", value: 120340, pct: "6.41%", color: "bg-warning" },
  { label: "Ineligible", value: 769240, pct: "4.10%", color: "bg-danger" },
]

const quickActions = [
  { icon: FileMinus2, label: "ITC Reversal Entry", sub: "Record ITC reversal entries" },
  { icon: FilePlus2, label: "ITC Adjustment Entry", sub: "Adjust ITC for any changes" },
  { icon: BookOpen, label: "View ITC Ledger", sub: "View month-wise ITC ledger" },
  { icon: FileBarChart2, label: "ITC Summary Report", sub: "Download ITC summary report" },
]

const bySupplier = Array.from(
  docs.reduce((m, d) => {
    const cur = m.get(d.name) ?? { docs: 0, taxable: 0, itc: 0 }
    cur.docs += 1
    cur.taxable += d.taxable
    cur.itc += d.igst + d.cgst + d.sgst + d.cess
    m.set(d.name, cur)
    return m
  }, new Map<string, { docs: number; taxable: number; itc: number }>())
).map(([name, v]) => ({ name, ...v }))

const reversals = docs.filter((d) => d.status === "Adjusted")

export function InputTaxCredit() {
  const [tab, setTab] = useState(tabs[0])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "GST", href: "/tax/gst" }, { label: "Input Tax Credit" }]}
        title="Input Tax Credit (ITC)"
        description="View, track and manage eligible ITC available for claiming."
        actions={
          <>
            <Button variant="outline">April 2025 <ChevronDown className="size-3.5" /></Button>
            <Button variant="outline"><RefreshCcw className="size-4" /> Refresh</Button>
            <Button variant="outline"><Download className="size-4" /> Export</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <div className="flex flex-col gap-5 xl:col-span-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {stats.map((s) => (
              <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} delta={{ value: s.delta, label: "vs Mar 2025", positive: s.positive }} color={s.color} />
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button variant="outline">2025-26 <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">01/04/2025</Button>
                <Button variant="outline">30/04/2025</Button>
                <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All <ChevronDown className="size-3.5" /></Button>
                <div className="flex gap-2 sm:ml-auto">
                  <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                  <Button variant="outline" size="icon"><RefreshCcw className="size-4" /></Button>
                </div>
              </div>

              <Tabs value={tab} onValueChange={setTab}>
                <TabsList>
                  {tabs.map((t) => (
                    <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="ITC by Tax Components">
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-muted-foreground border-b text-left text-xs">
                          <th className="pb-2 font-medium">Tax Component</th>
                          <th className="pb-2 text-right font-medium">Eligible ITC (₹)</th>
                          <th className="pb-2 text-right font-medium">Availed ITC (₹)</th>
                          <th className="pb-2 text-right font-medium">Reversed ITC (₹)</th>
                          <th className="pb-2 text-right font-medium">Net ITC Available (₹)</th>
                          <th className="pb-2 font-medium">% Availed</th>
                          <th className="pb-2 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {components.map((c) => (
                          <tr key={c.name} className="border-b last:border-0">
                            <td className="py-3 font-medium whitespace-nowrap text-foreground">{c.name}</td>
                            <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(c.eligible, { decimals: true })}</td>
                            <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(c.availed, { decimals: true })}</td>
                            <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(c.reversed, { decimals: true })}</td>
                            <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(c.net, { decimals: true })}</td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <div className="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
                                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                                </div>
                                <span className="text-xs font-medium whitespace-nowrap text-foreground">{c.pct}%</span>
                              </div>
                            </td>
                            <td className="py-3"><a href="/tax/gst/itc" className="text-primary text-sm font-medium whitespace-nowrap">View Details</a></td>
                          </tr>
                        ))}
                        <tr className="bg-muted font-semibold text-foreground">
                          <td className="py-3 pl-2">Total</td>
                          <td className="py-3 text-right whitespace-nowrap">{inr(componentsTotal.eligible, { decimals: true })}</td>
                          <td className="py-3 text-right whitespace-nowrap">{inr(componentsTotal.availed, { decimals: true })}</td>
                          <td className="py-3 text-right whitespace-nowrap">{inr(componentsTotal.reversed, { decimals: true })}</td>
                          <td className="py-3 text-right whitespace-nowrap">{inr(componentsTotal.net, { decimals: true })}</td>
                          <td className="py-3">{componentsTotal.pct}%</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="ITC by Documents">
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-muted-foreground border-b text-left text-xs">
                          <th rowSpan={2} className="pb-2 align-bottom font-medium">Supplier / Party</th>
                          <th rowSpan={2} className="pb-2 align-bottom font-medium">GSTIN</th>
                          <th rowSpan={2} className="pb-2 align-bottom font-medium">Document Type</th>
                          <th rowSpan={2} className="pb-2 align-bottom font-medium">Document No.</th>
                          <th rowSpan={2} className="pb-2 align-bottom font-medium">Date</th>
                          <th rowSpan={2} className="pb-2 text-right align-bottom font-medium">Taxable Value (₹)</th>
                          <th colSpan={4} className="border-b pb-1 text-center font-medium">ITC Available (₹)</th>
                          <th rowSpan={2} className="pb-2 align-bottom font-medium">ITC Status</th>
                          <th rowSpan={2} className="pb-2 align-bottom font-medium">Eligibility</th>
                          <th rowSpan={2} className="pb-2 align-bottom font-medium">Action</th>
                        </tr>
                        <tr className="text-muted-foreground text-left text-xs">
                          <th className="pt-1 pb-2 text-right font-medium">IGST</th>
                          <th className="pt-1 pb-2 text-right font-medium">CGST</th>
                          <th className="pt-1 pb-2 text-right font-medium">SGST</th>
                          <th className="pt-1 pb-2 text-right font-medium">CESS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {docs.map((d) => (
                          <tr key={d.no} className="border-b last:border-0">
                            <td className="py-3 whitespace-nowrap text-foreground">{d.name}</td>
                            <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{d.gstin}</td>
                            <td className="text-muted-foreground py-3 whitespace-nowrap">{d.type}</td>
                            <td className="py-3 whitespace-nowrap text-foreground">{d.no}</td>
                            <td className="text-muted-foreground py-3 whitespace-nowrap">{d.date}</td>
                            <td className="py-3 text-right whitespace-nowrap text-foreground">{money(d.taxable)}</td>
                            <td className="py-3 text-right whitespace-nowrap text-foreground">{money(d.igst)}</td>
                            <td className="py-3 text-right whitespace-nowrap text-foreground">{money(d.cgst)}</td>
                            <td className="py-3 text-right whitespace-nowrap text-foreground">{money(d.sgst)}</td>
                            <td className="py-3 text-right whitespace-nowrap text-foreground">{money(d.cess)}</td>
                            <td className="py-3"><Badge variant={statusColors[d.status]}>{d.status}</Badge></td>
                            <td className="py-3"><Badge variant={eligColors[d.eligibility]}>{d.eligibility}</Badge></td>
                            <td className="py-3"><Button variant="outline" size="icon-sm"><Eye className="size-4" /></Button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                      <span>Showing 1 to 5 of 145 entries</span>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="size-8 p-0">«</Button>
                        <Button size="sm" variant="outline" className="size-8 p-0">‹</Button>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((p) => (
                            <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                          ))}
                        </div>
                        <span className="px-1">…</span>
                        <Button size="sm" variant="outline" className="size-8 p-0">29</Button>
                        <Button size="sm" variant="outline" className="size-8 p-0">›</Button>
                        <Button size="sm" variant="outline" className="size-8 p-0">»</Button>
                        <span className="ml-2">Rows per page:</span>
                        <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ITC by Supplier">
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-muted-foreground border-b text-left text-xs">
                          <th className="pb-2 font-medium">Supplier</th>
                          <th className="pb-2 text-right font-medium">Documents</th>
                          <th className="pb-2 text-right font-medium">Taxable Value (₹)</th>
                          <th className="pb-2 text-right font-medium">ITC Available (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bySupplier.map((s) => (
                          <tr key={s.name} className="border-b last:border-0">
                            <td className="py-3 font-medium whitespace-nowrap text-foreground">{s.name}</td>
                            <td className="py-3 text-right text-foreground">{s.docs}</td>
                            <td className="py-3 text-right whitespace-nowrap text-foreground">{money(s.taxable)}</td>
                            <td className="py-3 text-right whitespace-nowrap text-foreground">{money(s.itc)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="ITC Reversal">
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-muted-foreground border-b text-left text-xs">
                          <th className="pb-2 font-medium">Document No.</th>
                          <th className="pb-2 font-medium">Supplier</th>
                          <th className="pb-2 font-medium">Date</th>
                          <th className="pb-2 text-right font-medium">ITC Reversed (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reversals.map((d) => (
                          <tr key={d.no} className="border-b last:border-0">
                            <td className="py-3 font-medium whitespace-nowrap text-foreground">{d.no}</td>
                            <td className="text-muted-foreground py-3 whitespace-nowrap">{d.name}</td>
                            <td className="text-muted-foreground py-3 whitespace-nowrap">{d.date}</td>
                            <td className="py-3 text-right whitespace-nowrap text-destructive">{money(d.igst + d.cgst + d.sgst + d.cess)}</td>
                          </tr>
                        ))}
                        {reversals.length === 0 && (
                          <tr><td colSpan={4} className="text-muted-foreground py-8 text-center">No reversal entries this period.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="Blocked Credits">
                  <div className="mt-5 flex flex-col gap-3">
                    {eligibility.filter((e) => e.label === "Ineligible").map((e) => (
                      <div key={e.label} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-2">
                          <span className={`size-2.5 shrink-0 rounded-full ${e.color}`} />
                          <span className="text-foreground text-sm font-medium">{e.label} (Section 17(5))</span>
                        </div>
                        <span className="text-foreground text-sm font-semibold">{inr(e.value)} <span className="text-muted-foreground text-xs font-normal">({e.pct})</span></span>
                      </div>
                    ))}
                    <p className="text-muted-foreground text-sm">Blocked credits under Section 17(5) cannot be claimed and are excluded from eligible ITC.</p>
                  </div>
                </TabsContent>

                <TabsContent value="ITC Ledger">
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-muted-foreground border-b text-left text-xs">
                          <th className="pb-2 font-medium">Date</th>
                          <th className="pb-2 font-medium">Document No.</th>
                          <th className="pb-2 font-medium">Type</th>
                          <th className="pb-2 text-right font-medium">ITC Amount (₹)</th>
                          <th className="pb-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {docs.map((d) => (
                          <tr key={d.no} className="border-b last:border-0">
                            <td className="text-muted-foreground py-3 whitespace-nowrap">{d.date}</td>
                            <td className="py-3 font-medium whitespace-nowrap text-foreground">{d.no}</td>
                            <td className="text-muted-foreground py-3 whitespace-nowrap">{d.type}</td>
                            <td className="py-3 text-right whitespace-nowrap text-foreground">{money(d.igst + d.cgst + d.sgst + d.cess)}</td>
                            <td className="py-3"><Badge variant={statusColors[d.status]}>{d.status}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>ITC Summary <span className="text-muted-foreground text-xs font-normal">(April 2025)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              <div className="flex items-center gap-4">
                <DonutChart data={summary} total={inr(1876540)} totalLabel="Total Eligible ITC" size={140} />
                <ul className="flex flex-col gap-2 text-xs">
                  {summary.map((s) => (
                    <li key={s.name} className="flex items-center gap-1.5">
                      <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                      <span className="text-foreground">{s.name}</span>
                      <span className="text-muted-foreground ml-auto whitespace-nowrap">{inr(s.value)} <span className="text-muted-foreground">({s.pct})</span></span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/tax/gst/itc" className="text-primary flex items-center gap-1 text-sm font-medium">View ITC Summary Report →</a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>ITC Eligibility <span className="text-muted-foreground text-xs font-normal">(Throughout Supply)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {eligibility.map((e) => (
                <div key={e.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <span className={`size-2.5 shrink-0 rounded-full ${e.color}`} /> {e.label}
                  </span>
                  <span className="font-medium whitespace-nowrap text-foreground">{inr(e.value)} <span className="text-muted-foreground text-xs font-normal">({e.pct})</span></span>
                </div>
              ))}
              <a href="/tax/gst/itc" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View Eligibility Report →</a>
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
              <p className="text-muted-foreground text-xs">Learn more about Input Tax Credit rules and eligibility.</p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">View User Guide →</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
