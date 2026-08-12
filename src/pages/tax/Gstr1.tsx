import { TrendingUp, FileText, ArrowUpRight, IndianRupee, ShoppingBag, Download, Eye, UploadCloud, ChevronDown, CheckCircle2, Circle, Calendar, FileDown, FileSpreadsheet, History, RefreshCcw } from "lucide-react"

import { useMemo, useState } from "react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { StatCard } from "@/components/shared/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DialogTrigger } from "@/components/ui/dialog"
import { FileGstr1Dialog } from "@/components/shared/TaxFilingDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: TrendingUp, label: "Total Turnover", value: inr(12645780, { decimals: true }), delta: "18.62%", color: "green" as const },
  { icon: FileText, label: "Total Taxable Value", value: inr(10708200, { decimals: true }), delta: "17.35%", color: "blue" as const },
  { icon: ArrowUpRight, label: "Total IGST", value: inr(1872430, { decimals: true }), delta: "16.35%", color: "purple" as const },
  { icon: IndianRupee, label: "Total CGST", value: inr(936215, { decimals: true }), delta: "17.18%", color: "orange" as const },
  { icon: ShoppingBag, label: "Total SGST", value: inr(102450, { decimals: true }), delta: "12.44%", color: "blue" as const },
]

const tabs = ["Summary", "B2B", "B2C (Large)", "B2C (Small)", "Exports", "Nil Rated", "Credit / Debit Notes", "Advances", "HSN Summary"]

const summary = [
  { section: "4A", desc: "B2B Invoices", invoices: "356", taxable: 7545600, igst: 1280820, cgst: 640410, sgst: 640410, cess: 68250 },
  { section: "4B", desc: "B2C (Large Invoices)", invoices: "46", taxable: 1285600, igst: 115704, cgst: 102848, sgst: 102848, cess: 10110 },
  { section: "5A", desc: "B2C (Small Invoices)", invoices: "642", taxable: 985450, igst: null, cgst: 88690, sgst: 88690, cess: null },
  { section: "6A", desc: "Exports (With Payment)", invoices: "28", taxable: 575000, igst: 103500, cgst: null, sgst: null, cess: null },
  { section: "6B", desc: "Exports (Without Payment)", invoices: "12", taxable: 112500, igst: 20250, cgst: null, sgst: null, cess: null },
  { section: "7", desc: "Nil Rated Supplies", invoices: "10", taxable: 50300, igst: null, cgst: null, sgst: null, cess: null },
  { section: "8A", desc: "Credit / Debit Notes (Registered)", invoices: "15", taxable: -145670, igst: -26160, cgst: -12900, sgst: -12900, cess: -1020 },
  { section: "8B", desc: "Credit / Debit Notes (Unregistered)", invoices: "8", taxable: -54800, igst: null, cgst: null, sgst: null, cess: null },
  { section: "9B", desc: "Advances Received", invoices: "22", taxable: 153750, igst: 27675, cgst: 13838, sgst: 13838, cess: 1360 },
]

const totals = { invoices: "1,139", taxable: 10708200, igst: 1872430, cgst: 936215, sgst: 936215, cess: 102450 }

function fmt(v: number | null) {
  if (v === null) return <span className="text-muted-foreground">–</span>
  if (v < 0) return <span className="text-destructive">({inr(Math.abs(v)).replace("₹", "")})</span>
  return inr(v)
}

const filingHistory = [
  { period: "Apr 2025", turnover: 12645780, tax: 3744880, filed: "18 May 2025", status: "Filed", arn: "AA2904251234562" },
  { period: "Mar 2025", turnover: 10671250, tax: 3185990, filed: "11 Apr 2025", status: "Filed", arn: "AA1104250987652" },
  { period: "Feb 2025", turnover: 9815600, tax: 2872340, filed: "11 Mar 2025", status: "Filed", arn: "AA1103250678902" },
]

const filingSteps = [
  { label: "Data Prepared", ts: "18 May 2025, 04:00 PM" },
  { label: "Data Validated", ts: "18 May 2025, 04:05 PM" },
  { label: "Filed Successfully", ts: "18 May 2025, 04:30 PM" },
]

const importantDates = [
  { label: "Return Period", value: "April 2025" },
  { label: "Due Date", value: "11 May 2025" },
  { label: "Filed On", value: "18 May 2025" },
]

const quickActions = [
  { icon: FileDown, label: "Download GSTR-1 (PDF)" },
  { icon: FileSpreadsheet, label: "Download Excel" },
  { icon: History, label: "View GSTR-1 History" },
  { icon: RefreshCcw, label: "Reconcile Sales Data", sub: "Match with books & invoices" },
]

const tabMatch: Record<string, string | true> = {
  Summary: true,
  B2B: "B2B",
  "B2C (Large)": "B2C (Large",
  "B2C (Small)": "B2C (Small",
  Exports: "Exports",
  "Nil Rated": "Nil Rated",
  "Credit / Debit Notes": "Credit / Debit Notes",
  Advances: "Advances",
  "HSN Summary": "__none__",
}

export function Gstr1() {
  const [tab, setTab] = useState(tabs[0])

  const filteredSummary = useMemo(() => {
    const match = tabMatch[tab]
    return match === true ? summary : summary.filter((r) => r.desc.includes(match as string))
  }, [tab])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "GST", href: "/tax/gst" }, { label: "GSTR Returns", href: "/tax/gst/returns" }, { label: "GSTR-1" }]}
        title="GSTR-1"
        description="Details of outward supplies of goods and services."
        actions={
          <>
            <Button variant="outline">Financial Year 2025-26 <ChevronDown className="size-3.5" /></Button>
            <Button variant="outline">April 2025 <ChevronDown className="size-3.5" /></Button>
            <Badge variant="success">Filed</Badge>
            <Button variant="outline"><Download className="size-4" /> Download JSON</Button>
            <Button variant="outline"><Eye className="size-4" /> Preview</Button>
            <FileGstr1Dialog>
              <DialogTrigger asChild>
                <Button><UploadCloud className="size-4" /> File GSTR-1</Button>
              </DialogTrigger>
            </FileGstr1Dialog>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <div className="flex flex-col gap-5 xl:col-span-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {stats.map((s) => (
              <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} delta={{ value: s.delta, label: "vs Mar 2025" }} color={s.color} />
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

              <h3 className="mt-5 mb-3 text-base font-semibold text-foreground">GSTR-1 Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Section</th>
                      <th className="pb-2 font-medium">Description</th>
                      <th className="pb-2 text-right font-medium">No. of Invoices</th>
                      <th className="pb-2 text-right font-medium">Taxable Value (₹)</th>
                      <th className="pb-2 text-right font-medium">IGST (₹)</th>
                      <th className="pb-2 text-right font-medium">CGST (₹)</th>
                      <th className="pb-2 text-right font-medium">SGST (₹)</th>
                      <th className="pb-2 text-right font-medium">CESS (₹)</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSummary.map((r) => (
                      <tr key={r.section} className="border-b last:border-0">
                        <td className="py-3 font-medium whitespace-nowrap text-foreground">{r.section}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.desc}</td>
                        <td className="py-3 text-right text-foreground">{r.invoices}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{fmt(r.taxable)}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{fmt(r.igst)}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{fmt(r.cgst)}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{fmt(r.sgst)}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{fmt(r.cess)}</td>
                        <td className="py-3">
                          <Button size="sm" variant="outline" className="gap-1">View <ChevronDown className="size-3.5" /></Button>
                        </td>
                      </tr>
                    ))}
                    {filteredSummary.length === 0 && (
                      <tr><td colSpan={9} className="text-muted-foreground py-8 text-center">No entries for this section.</td></tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold text-foreground">
                      <td className="pt-3" colSpan={2}>Total</td>
                      <td className="pt-3 text-right">{totals.invoices}</td>
                      <td className="pt-3 text-right whitespace-nowrap">{inr(totals.taxable)}</td>
                      <td className="pt-3 text-right whitespace-nowrap">{inr(totals.igst)}</td>
                      <td className="pt-3 text-right whitespace-nowrap">{inr(totals.cgst)}</td>
                      <td className="pt-3 text-right whitespace-nowrap">{inr(totals.sgst)}</td>
                      <td className="pt-3 text-right whitespace-nowrap">{inr(totals.cess)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Last updated on 18 May 2025, 04:30 PM</span>
                <Button variant="outline" size="sm" className="gap-1.5"><RefreshCcw className="size-3.5" /> Refresh Summary</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>GSTR-1 Filing History</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto pb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Return Period</th>
                    <th className="pb-2 text-right font-medium">Turnover (₹)</th>
                    <th className="pb-2 text-right font-medium">Total Tax (₹)</th>
                    <th className="pb-2 font-medium">Filed On</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">ARN</th>
                    <th className="pb-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filingHistory.map((f) => (
                    <tr key={f.period} className="border-b last:border-0">
                      <td className="py-3 font-medium whitespace-nowrap text-foreground">{f.period}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(f.turnover)}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(f.tax)}</td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{f.filed}</td>
                      <td className="py-3"><StatusBadge status={f.status} /></td>
                      <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{f.arn}</td>
                      <td className="py-3">
                        <Button size="sm" variant="outline" className="gap-1">View <ChevronDown className="size-3.5" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Return Filing Status</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {filingSteps.map((s, i) => (
                <div key={s.label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <CheckCircle2 className="text-success-foreground size-5 shrink-0" />
                    {i < filingSteps.length - 1 && <span className="bg-success mt-1 h-6 w-px" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{s.label}</p>
                    <p className="text-muted-foreground text-xs">{s.ts}</p>
                  </div>
                </div>
              ))}
              <div className="bg-muted -mt-1 rounded-lg p-3 text-sm">
                <span className="text-muted-foreground">ARN: </span>
                <a href="/tax/gst/gstr-1" className="text-primary font-medium">AA2904251234562Z</a>
              </div>
              <Button variant="outline" className="text-success-foreground border-success">View Filed Details</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Important Dates</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {importantDates.map((d) => (
                <div key={d.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><Calendar className="size-4" /> {d.label}</span>
                  <span className="font-medium text-foreground">{d.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2"><Circle className="size-4" /> Status</span>
                <Badge variant="success">Filed On Time</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col pb-3">
              {quickActions.map((a) => (
                <button key={a.label} className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2.5 text-left text-sm font-medium text-foreground transition-colors">
                  <a.icon className="text-muted-foreground size-4 shrink-0" />
                  <span>
                    {a.label}
                    {a.sub && <span className="text-muted-foreground block text-xs font-normal">{a.sub}</span>}
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
