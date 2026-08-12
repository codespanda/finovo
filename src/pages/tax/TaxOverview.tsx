import { Wallet, CheckCircle2, FileWarning, CalendarClock, Landmark } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ComparisonBarChart, DonutChart } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const tdsTrend = [
  { m: "Jan", deducted: 285000, deposited: 285000 },
  { m: "Feb", deducted: 298000, deposited: 298000 },
  { m: "Mar", deducted: 312500, deposited: 305000 },
  { m: "Apr", deducted: 305600, deposited: 305600 },
  { m: "May", deducted: 320450, deposited: 296000 },
]

const otherTaxes = [
  { label: "Professional Tax", value: 22400, sub: "128 employees", status: "Paid" },
  { label: "Provident Fund (PF)", value: 132450, sub: "Employer + Employee", status: "Paid" },
  { label: "ESI Contribution", value: 48750, sub: "Employer + Employee", status: "Paid" },
  { label: "Advance Tax (Q4)", value: 95816, sub: "Due 15 Mar 2025", status: "Pending" },
]

const gstTrend = [
  { m: "Jan", output: 2800000, input: 2100000 },
  { m: "Feb", output: 2950000, input: 2200000 },
  { m: "Mar", output: 3100000, input: 2150000 },
  { m: "Apr", output: 3050000, input: 2180000 },
  { m: "May", output: 3245600, input: 2215300 },
]

const deadlines = [
  { date: "07 Jun", label: "GSTR-1 (May 2025)", sub: "Sales details return", tag: "Due in 5 days" },
  { date: "11 Jun", label: "GSTR-3B (May 2025)", sub: "Summary return", tag: "Due in 9 days" },
  { date: "20 Jun", label: "GSTR-9 (FY 2024-25)", sub: "Annual return", tag: "Due in 18 days" },
  { date: "25 Jun", label: "GST Payment (May 2025)", sub: "Tax payment due", tag: "Due in 23 days" },
]

export function TaxOverview() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax" }, { label: "Overview" }]}
        title="Tax Overview"
        description="Manage your GST, TDS, and other tax compliances in one place."
        actions={<Button variant="outline">Financial Year 2024-25</Button>}
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={Wallet} label="Total Tax Payable" value={inr(645250)} delta={{ value: "8.4%" }} color="purple" />
        <StatCard icon={CheckCircle2} label="Paid This Year" value={inr(1875300)} delta={{ value: "12.1%" }} color="green" />
        <StatCard icon={FileWarning} label="Pending Returns" value="05" color="orange" />
        <StatCard icon={CalendarClock} label="Upcoming Deadlines" value="07" color="blue" />
        <StatCard icon={Landmark} label="Refunds Receivable" value={inr(125340)} color="green" className="col-span-2 lg:col-span-1" />
      </div>

      <Card>
        <CardContent className="pt-5">
          <Tabs defaultValue="gst">
            <TabsList>
              <TabsTrigger value="gst">GST Overview</TabsTrigger>
              <TabsTrigger value="tds">TDS Overview</TabsTrigger>
              <TabsTrigger value="other">Other Taxes</TabsTrigger>
            </TabsList>

            <TabsContent value="gst">
              <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                  <CardHeader><CardTitle>GST Liability Trend</CardTitle></CardHeader>
                  <CardContent className="pb-5">
                    <ComparisonBarChart
                      data={gstTrend}
                      xKey="m"
                      series={[
                        { key: "output", color: "var(--color-chart-1)", label: "Output Tax" },
                        { key: "input", color: "var(--color-chart-2)", label: "Input Tax" },
                      ]}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Return Filing Status</CardTitle></CardHeader>
                  <CardContent className="flex flex-col items-center gap-2 pb-5">
                    <DonutChart
                      data={[
                        { name: "Filed", value: 14, color: "var(--color-chart-2)" },
                        { name: "Pending", value: 5, color: "var(--color-chart-3)" },
                        { name: "Overdue", value: 3, color: "var(--color-chart-5)" },
                        { name: "N/A", value: 2, color: "var(--color-chart-1)" },
                      ]}
                      total="24"
                      totalLabel="Total Returns"
                      size={150}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tds">
              <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                  <CardHeader><CardTitle>TDS Deducted vs Deposited</CardTitle></CardHeader>
                  <CardContent className="pb-5">
                    <ComparisonBarChart
                      data={tdsTrend}
                      xKey="m"
                      series={[
                        { key: "deducted", color: "var(--color-chart-1)", label: "Deducted" },
                        { key: "deposited", color: "var(--color-chart-2)", label: "Deposited" },
                      ]}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Return Filing Status</CardTitle></CardHeader>
                  <CardContent className="flex flex-col items-center gap-2 pb-5">
                    <DonutChart
                      data={[
                        { name: "Filed", value: 3, color: "var(--color-chart-2)" },
                        { name: "Draft", value: 1, color: "var(--color-chart-3)" },
                      ]}
                      total="4"
                      totalLabel="Quarterly Returns"
                      size={150}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="other">
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Tax / Contribution</th>
                      <th className="pb-2 font-medium">Details</th>
                      <th className="pb-2 text-right font-medium">Amount (₹)</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherTaxes.map((t) => (
                      <tr key={t.label} className="border-b last:border-0">
                        <td className="py-3 font-medium whitespace-nowrap text-foreground">{t.label}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{t.sub}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(t.value, { decimals: true })}</td>
                        <td className="py-3">
                          <span className={t.status === "Paid" ? "text-success-foreground text-xs font-medium" : "text-warning-foreground text-xs font-medium"}>{t.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-5">
            <CardHeader><CardTitle>Upcoming Deadlines</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 pb-5 sm:grid-cols-2 lg:grid-cols-4">
              {deadlines.map((d) => (
                <div key={d.label} className="flex gap-3 rounded-lg border p-3">
                  <div className="bg-info-bg text-info-foreground flex size-11 shrink-0 flex-col items-center justify-center rounded-lg text-xs font-bold leading-none">
                    <span className="text-sm">{d.date.split(" ")[0]}</span>
                    <span>{d.date.split(" ")[1]}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{d.label}</p>
                    <p className="text-muted-foreground text-xs">{d.sub}</p>
                    <p className="text-warning-foreground text-xs font-medium">{d.tag}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
