import { Info, IndianRupee, Landmark, ArrowUpRight, Percent, Wallet, ChevronDown, Download, FileSpreadsheet, UploadCloud, FileDown, FileBarChart2, BookOpen, History, CircleCheck } from "lucide-react"

import { useState } from "react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { FileGstr3BDialog } from "@/components/shared/TaxFilingDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: IndianRupee, label: "Total Tax Payable", value: inr(2362180, { decimals: true }), sub: "Payable in Cash", subValue: inr(1572930, { decimals: true }), color: "red" as const },
  { icon: Landmark, label: "Total ITC Available", value: inr(1876540, { decimals: true }), sub: "Utilized for Payment", subValue: inr(789250, { decimals: true }), color: "blue" as const },
  { icon: ArrowUpRight, label: "Net Tax Payable", value: inr(1572930, { decimals: true }), sub: "(After ITC Utilization)", color: "purple" as const },
  { icon: Percent, label: "Interest Payable", value: inr(24560, { decimals: true }), sub: "Late Fees", subValue: inr(2000, { decimals: true }), color: "orange" as const },
  { icon: Wallet, label: "Total Liability (G+H)", value: inr(1598310, { decimals: true }), sub: "Balance in Cash", subValue: inr(1572930, { decimals: true }), color: "blue" as const },
]

const colorMap: Record<string, string> = {
  red: "bg-danger-bg text-danger-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
}

const tabs = ["Summary", "Outward Supplies", "ITC Details", "Tax Liability", "Payment of Tax"]

const outward = [
  { desc: "(a) Outward Taxable Supplies (Other than zero rated, nil rated & exempted)", igst: 972430, cgst: 486215, sgst: 486215, cess: 102450, total: 2047310 },
  { desc: "(b) Outward Taxable Supplies (Zero rated)", igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
  { desc: "(c) Other Outward Supplies (Nil rated, exempted)", igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
  { desc: "(d) Inward Supplies (liable to reverse charge)", igst: 218640, cgst: 109320, sgst: 109320, cess: 0, total: 437280 },
  { desc: "(e) Non-GST Outward Supplies", igst: 0, cgst: 0, sgst: 0, cess: 0, total: 0 },
]
const outwardTotal = { igst: 1191070, cgst: 595535, sgst: 595535, cess: 102450, total: 2484590 }

const itc = [
  { desc: "(A) ITC Available (Whether in full or part)", igst: 972430, cgst: 486215, sgst: 486215, cess: 98300 },
  { desc: "(B) ITC Reversed", igst: -125400, cgst: -62700, sgst: -62700, cess: -10250 },
  { desc: "(C) Net ITC Available (A-B)", igst: 847030, cgst: 423515, sgst: 423515, cess: 88050, bold: true },
  { desc: "(D) Ineligible ITC", igst: -75800, cgst: -37900, sgst: -37900, cess: -7800 },
  { desc: "(E) Net ITC Eligible (C-D)", igst: 771230, cgst: 385615, sgst: 385615, cess: 80250, bold: true },
]

const values = [
  { desc: "(a) Outward Taxable Supplies (other than zero rated, nil rated & exempted)", amount: 12645780 },
  { desc: "(b) Outward Taxable Supplies (zero rated)", amount: 1845600 },
  { desc: "(c) Other Outward Supplies (nil rated, exempted)", amount: 1250000 },
  { desc: "(d) Inward Supplies (liable to reverse charge)", amount: 2216500 },
  { desc: "(e) Non-GST Supplies", amount: 520000 },
]
const valuesTotal = 18479880

const payable = [
  { desc: "(A) Tax Payable (3.1 Outward Liability)", igst: 1191070, cgst: 595535, sgst: 595535, cess: 102450, total: 2484590 },
  { desc: "(B) Less: ITC Availment (Eligible ITC)", igst: -771230, cgst: -385615, sgst: -385615, cess: -80250, total: -1622710 },
  { desc: "(C) Net Tax Payable (A-B)", igst: 419840, cgst: 209920, sgst: 209920, cess: 22200, total: 861880, bold: true },
  { desc: "(D) Interest Payable", igst: 12300, cgst: 6150, sgst: 6150, cess: 1960, total: 26560 },
  { desc: "(E) Late Fees Payable", igst: 1000, cgst: 500, sgst: 500, cess: 0, total: 2000 },
]
const netPayable = { desc: "Net Amount Payable (C + D + E)", igst: 433140, cgst: 216570, sgst: 216570, cess: 24160, total: 890440 }

const otherInfo = [
  { label: "HSN-wise summary of outward supplies", value: "Provided" },
  { label: "Document Issued Summary", value: "Provided" },
  { label: "Liability Payable (G+H)", value: inr(1598310, { decimals: true }) },
  { label: "Paid through ITC", value: inr(225380, { decimals: true }) },
  { label: "Paid through Cash", value: inr(1572930, { decimals: true }) },
  { label: "Balance in Cash Ledger", value: inr(1572930, { decimals: true }) },
]

function money(v: number) {
  if (v === 0) return <span className="text-muted-foreground">–</span>
  return v < 0 ? <span className="text-destructive">({inr(Math.abs(v), { decimals: true }).replace("₹", "")})</span> : inr(v, { decimals: true })
}

const returnSummary = [
  { label: "Return Period", value: "April 2025" },
  { label: "Due Date", value: "20 May 2025" },
  { label: "Status", value: "Not Filed", badge: "warning" as const },
  { label: "Last Updated", value: "30 Apr 2025, 04:30 PM" },
  { label: "Return Type", value: "Monthly" },
  { label: "ARN", value: "—" },
  { label: "Acknowledgement No.", value: "—" },
]

const liability = [
  { name: "Paid through Cash", value: 1572930, pct: "98.42%", color: "var(--color-chart-2)" },
  { name: "Paid through ITC", value: 225380, pct: "14.10%", color: "var(--color-chart-1)" },
  { name: "Interest & Late Fees", value: 26560, pct: "1.66%", color: "var(--color-chart-3)" },
]

const quickActions = [
  { icon: FileDown, label: "Download GSTR-3B (JSON)", sub: "Download return details" },
  { icon: FileBarChart2, label: "Generate Summary Report", sub: "View summary of GSTR-3B" },
  { icon: BookOpen, label: "Payment Ledger", sub: "View tax payment ledger" },
  { icon: History, label: "View Filed Returns", sub: "View all filed GSTR-3B returns" },
]

export function Gstr3B() {
  const [tab, setTab] = useState(tabs[0])
  const showOutward = tab === "Summary" || tab === "Outward Supplies"
  const showItc = tab === "Summary" || tab === "ITC Details"
  const showPayable = tab === "Summary" || tab === "Tax Liability"
  const showPayment = tab === "Summary" || tab === "Payment of Tax"

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "GST", href: "/tax/gst" }, { label: "GSTR-3B" }]}
        title={<span className="flex items-center gap-2">GSTR-3B <Info className="text-muted-foreground size-4" /></span>}
        description="Summary of outward supplies, ITC availed and tax payable."
        actions={
          <>
            <Button variant="outline">April 2025 <ChevronDown className="size-3.5" /></Button>
            <Button variant="outline"><Download className="size-4" /> Download JSON</Button>
            <Button variant="outline"><FileSpreadsheet className="size-4" /> Export</Button>
            <FileGstr3BDialog>
              <DialogTrigger asChild>
                <Button><UploadCloud className="size-4" /> File GSTR-3B</Button>
              </DialogTrigger>
            </FileGstr3BDialog>
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
                <p className="text-muted-foreground text-xs">
                  {s.sub}{s.subValue && <span className="text-foreground font-medium"> {s.subValue}</span>}
                </p>
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

              {showOutward && (
              <div className="mt-5 overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary text-primary-foreground text-left text-xs">
                      <th className="px-3 py-2 font-medium">3.1 Tax on Outward and Reverse Charge Inward Supplies</th>
                      <th className="px-3 py-2 text-right font-medium">Integrated Tax (₹)</th>
                      <th className="px-3 py-2 text-right font-medium">Central Tax (₹)</th>
                      <th className="px-3 py-2 text-right font-medium">State/UT Tax (₹)</th>
                      <th className="px-3 py-2 text-right font-medium">Cess (₹)</th>
                      <th className="px-3 py-2 text-right font-medium">Total (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outward.map((r) => (
                      <tr key={r.desc} className="border-b last:border-0">
                        <td className="px-3 py-2.5 text-foreground">{r.desc}</td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.igst)}</td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.cgst)}</td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.sgst)}</td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.cess)}</td>
                        <td className="px-3 py-2.5 text-right font-medium whitespace-nowrap text-foreground">{inr(r.total, { decimals: true })}</td>
                      </tr>
                    ))}
                    <tr className="bg-muted font-semibold text-foreground">
                      <td className="px-3 py-2.5">Total (3.1)</td>
                      <td className="px-3 py-2.5 text-right whitespace-nowrap">{inr(outwardTotal.igst, { decimals: true })}</td>
                      <td className="px-3 py-2.5 text-right whitespace-nowrap">{inr(outwardTotal.cgst, { decimals: true })}</td>
                      <td className="px-3 py-2.5 text-right whitespace-nowrap">{inr(outwardTotal.sgst, { decimals: true })}</td>
                      <td className="px-3 py-2.5 text-right whitespace-nowrap">{inr(outwardTotal.cess, { decimals: true })}</td>
                      <td className="px-3 py-2.5 text-right whitespace-nowrap">{inr(outwardTotal.total, { decimals: true })}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              )}

              {showItc && (
              <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="overflow-x-auto rounded-lg border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary text-primary-foreground text-left text-xs">
                        <th className="px-3 py-2 font-medium">4. Eligible ITC</th>
                        <th className="px-3 py-2 text-right font-medium">Integrated (₹)</th>
                        <th className="px-3 py-2 text-right font-medium">Central (₹)</th>
                        <th className="px-3 py-2 text-right font-medium">State/UT (₹)</th>
                        <th className="px-3 py-2 text-right font-medium">Cess (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itc.map((r) => (
                        <tr key={r.desc} className={`border-b last:border-0 ${r.bold ? "bg-muted font-semibold text-foreground" : ""}`}>
                          <td className="px-3 py-2.5 text-foreground">{r.desc}</td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.igst)}</td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.cgst)}</td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.sgst)}</td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.cess)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary text-primary-foreground text-left text-xs">
                        <th className="px-3 py-2 font-medium">5. Values of Supplies</th>
                        <th className="px-3 py-2 text-right font-medium">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.map((v) => (
                        <tr key={v.desc} className="border-b last:border-0">
                          <td className="px-3 py-2.5 text-foreground">{v.desc}</td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">{inr(v.amount, { decimals: true })}</td>
                        </tr>
                      ))}
                      <tr className="bg-muted font-semibold text-foreground">
                        <td className="px-3 py-2.5">Total</td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">{inr(valuesTotal, { decimals: true })}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              )}

              {(showPayable || showPayment) && (
              <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
                <div className="overflow-x-auto rounded-lg border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary text-primary-foreground text-left text-xs">
                        <th className="px-3 py-2 font-medium">7. Tax Payable (Summary)</th>
                        <th className="px-3 py-2 text-right font-medium">Integrated (₹)</th>
                        <th className="px-3 py-2 text-right font-medium">Central (₹)</th>
                        <th className="px-3 py-2 text-right font-medium">State/UT (₹)</th>
                        <th className="px-3 py-2 text-right font-medium">Cess (₹)</th>
                        <th className="px-3 py-2 text-right font-medium">Total (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payable.map((r) => (
                        <tr key={r.desc} className={`border-b last:border-0 ${r.bold ? "bg-muted font-semibold text-foreground" : ""}`}>
                          <td className="px-3 py-2.5 text-foreground">{r.desc}</td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.igst)}</td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.cgst)}</td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.sgst)}</td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.cess)}</td>
                          <td className="px-3 py-2.5 text-right whitespace-nowrap">{money(r.total)}</td>
                        </tr>
                      ))}
                      <tr className="bg-success-bg text-success-foreground font-semibold">
                        <td className="px-3 py-2.5">{netPayable.desc}</td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">{inr(netPayable.igst, { decimals: true })}</td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">{inr(netPayable.cgst, { decimals: true })}</td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">{inr(netPayable.sgst, { decimals: true })}</td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">{inr(netPayable.cess, { decimals: true })}</td>
                        <td className="px-3 py-2.5 text-right whitespace-nowrap">{inr(netPayable.total, { decimals: true })}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-primary text-primary-foreground text-left text-xs">
                        <th className="px-3 py-2 font-medium">8. Other Information</th>
                        <th className="px-3 py-2 text-right font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {otherInfo.map((o) => (
                        <tr key={o.label} className="border-b last:border-0">
                          <td className="text-muted-foreground px-3 py-2.5">{o.label}</td>
                          <td className="px-3 py-2.5 text-right font-medium whitespace-nowrap text-foreground">{o.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              )}

              <div className="bg-info-bg mt-5 flex flex-col items-start gap-3 rounded-lg p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-info-foreground flex items-center gap-2 text-sm">
                  <Info className="size-4 shrink-0" /> Please review all the details before filing. Once filed, GSTR-3B cannot be edited.
                </p>
                <Button className="shrink-0">Preview GSTR-3B (PDF)</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Return Summary <span className="text-muted-foreground text-xs font-normal">(April 2025)</span></CardTitle>
              <Badge variant="success">Open</Badge>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              {returnSummary.map((r) => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{r.label}</span>
                  {r.badge ? <Badge variant={r.badge}>{r.value}</Badge> : <span className="font-medium whitespace-nowrap text-foreground">{r.value}</span>}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Liability Summary</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={liability} total={inr(1598310)} totalLabel="Total Liability" size={140} />
              <ul className="flex flex-col gap-2 text-xs">
                {liability.map((l) => (
                  <li key={l.name} className="flex items-center gap-1.5">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: l.color }} />
                    <span className="text-foreground">{l.name}</span>
                  </li>
                ))}
              </ul>
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
              <div className="bg-success-bg text-success-foreground flex size-9 items-center justify-center rounded-full"><CircleCheck className="size-5" /></div>
              <p className="text-sm font-semibold text-foreground">Need Help?</p>
              <p className="text-muted-foreground text-xs">Learn more about GSTR-3B return filing.</p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">View User Guide →</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
