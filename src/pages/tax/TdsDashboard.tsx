import { FileText, FileCheck2, Landmark, Users2, FileBadge2, Clock, Link2, AlertTriangle, ShieldCheck, FileWarning, Download } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendAreaChart, ComparisonBarChart, DonutChart } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const stats = [
  { icon: FileText, label: "Total TDS Deducted", value: inr(1842750, { decimals: true }), sub: "This Financial Year", trend: "↑ 12.45% vs Last Year", color: "green" as const },
  { icon: FileCheck2, label: "TDS Returns", value: "14 / 16", sub: "Returns Filed", trend: "87.5% Completion", trendBar: 87.5, color: "blue" as const },
  { icon: Landmark, label: "Challans Deposited", value: inr(1801250, { decimals: true }), sub: "Total Challan Amount", trend: "↑ 9.20% vs Last Year", color: "purple" as const },
  { icon: Users2, label: "Deductees", value: "352", sub: "Active Deductees", trend: "↑ 98 this year", color: "orange" as const },
  { icon: FileBadge2, label: "Certificates Issued", value: "342", sub: "Form 16 & 16A", trend: "↑ 28 this year", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const alerts = [
  { icon: Clock, label: "Pending Returns", value: "2", link: "View Pending", color: "orange" as const },
  { icon: Link2, label: "Challans Pending Mapping", value: "5", link: "Map Now", color: "purple" as const },
  { icon: AlertTriangle, label: "Overdue Returns", value: "1", link: "Pay Fees", color: "red" as const },
  { icon: ShieldCheck, label: "PAN Not Verified", value: "12", link: "Verify Now", color: "green" as const },
  { icon: FileWarning, label: "Corrections Required", value: "3", link: "Review", color: "blue" as const },
]

const trend = [
  { m: "Apr 24", val: 145000 },
  { m: "May 24", val: 168000 },
  { m: "Jun 24", val: 152000 },
  { m: "Jul 24", val: 178000 },
  { m: "Aug 24", val: 245500 },
  { m: "Sep 24", val: 190000 },
  { m: "Oct 24", val: 205000 },
  { m: "Nov 24", val: 198000 },
  { m: "Dec 24", val: 215000 },
  { m: "Jan 25", val: 178000 },
  { m: "Feb 25", val: 165000 },
  { m: "Mar 25", val: 172000 },
]

const filing = [
  { q: "Q1 (Apr-Jun)", Required: 4, Filed: 3 },
  { q: "Q2 (Jul-Sep)", Required: 4, Filed: 1 },
  { q: "Q3 (Oct-Dec)", Required: 4, Filed: 0 },
  { q: "Q4 (Jan-Mar)", Required: 4, Filed: 0 },
]

const category = [
  { name: "Salary (24Q)", value: 825000, color: "var(--color-chart-2)" },
  { name: "Non Salary (26Q)", value: 670500, color: "var(--color-chart-1)" },
  { name: "Foreign Payment (27Q)", value: 245750, color: "var(--color-chart-4)" },
  { name: "Property (26QB)", value: 101500, color: "var(--color-chart-3)" },
]

const challanConsumption = [
  { name: "Utilized", value: 1525800, color: "var(--color-chart-2)" },
  { name: "Unutilized", value: 275450, color: "var(--color-chart-3)" },
]

const sectionWise = [
  { code: "194C - Contract", amount: 520000, pct: 28.24 },
  { code: "194J - Professional", amount: 385000, pct: 20.9 },
  { code: "192 - Salary", amount: 340000, pct: 18.46 },
  { code: "194H - Commission", amount: 225000, pct: 12.21 },
  { code: "Others", amount: 372750, pct: 20.19 },
]

const panStatus = [
  { name: "Verified", value: 340, color: "var(--color-chart-2)" },
  { name: "Not Verified", value: 12, color: "var(--color-chart-5)" },
]

const topDeductees = [
  { name: "ABC Solutions Pvt. Ltd.", amount: 245000 },
  { name: "XYZ Technologies", amount: 185500 },
  { name: "Global Services Ltd.", amount: 145750 },
  { name: "PQR Enterprises", amount: 120000 },
  { name: "LMN Consultants", amount: 95250 },
]

const lateFees = { fee: 15200, interest: 13250, total: 28450 }

const dueDates = [
  { date: "31 JUL", label: "24Q Q1 (Apr-Jun 2025)", tag: "Due in 4 days" },
  { date: "31 JUL", label: "26Q Q1 (Apr-Jun 2025)", tag: "Due in 4 days" },
  { date: "31 JUL", label: "27Q Q1 (Apr-Jun 2025)", tag: "Due in 4 days" },
]

const quickActions = ["New 24Q Return", "New 26Q Return", "New 27Q Return", "Import Challan", "Challan Mapping", "Generate Form 16", "Generate Form 16A", "TRACES Login", "Correction Return", "Download FVU"]

export function TdsDashboard() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "Dashboard" }]}
        title="TDS Dashboard"
        description="Overview of your TDS compliance, returns, challans, and certificates."
        actions={
          <>
            <Button variant="outline">01 Apr 2024 - 31 Mar 2025</Button>
            <Button variant="outline"><Download className="size-4" /> Download Reports</Button>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
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
            <p className="text-success-foreground text-xs font-medium">{s.trend}</p>
            {s.trendBar && (
              <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
                <div className="bg-success h-full rounded-full" style={{ width: `${s.trendBar}%` }} />
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {alerts.map((a) => (
          <Card key={a.label} className="gap-1.5 p-4">
            <div className="flex items-center gap-3">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${colorMap[a.color]}`}>
                <a.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-muted-foreground truncate text-xs font-medium">{a.label}</p>
                <p className="truncate text-lg font-bold text-foreground">{a.value}</p>
              </div>
            </div>
            <a href="/tax/tds" className="text-primary flex items-center gap-1 text-xs font-medium">{a.link} →</a>
          </Card>
        ))}
      </div>

      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>TDS Deduction Trend</CardTitle>
            <span className="text-muted-foreground text-xs">Monthly</span>
          </CardHeader>
          <CardContent className="pb-5">
            <TrendAreaChart data={trend} xKey="m" height={230} series={[{ key: "val", color: "var(--color-chart-2)", label: "TDS Deducted" }]} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Return Filing Status</CardTitle>
            <span className="text-muted-foreground text-xs">FY 2025-26</span>
          </CardHeader>
          <CardContent className="pb-5">
            <ComparisonBarChart
              data={filing}
              xKey="q"
              height={230}
              series={[
                { key: "Required", color: "var(--color-muted)", label: "Required" },
                { key: "Filed", color: "var(--color-chart-2)", label: "Filed" },
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>TDS by Category</CardTitle>
            <span className="text-muted-foreground text-xs">This FY</span>
          </CardHeader>
          <CardContent className="flex items-center gap-4 pb-5">
            <DonutChart data={category} total={inr(1842750)} totalLabel="Total TDS" size={130} />
            <ul className="flex flex-col gap-2 text-sm">
              {category.map((c) => (
                <li key={c.name} className="flex items-center gap-2">
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                  <span className="text-muted-foreground truncate text-xs">{c.name}</span>
                  <span className="ml-auto text-xs font-medium whitespace-nowrap text-foreground">{inr(c.value)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Challan Consumption</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-4 pb-5">
            <DonutChart data={challanConsumption} total={inr(1801250)} totalLabel="Total Challans" size={120} />
            <ul className="flex flex-col gap-2 text-sm">
              {challanConsumption.map((c) => (
                <li key={c.name} className="flex items-center gap-2">
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                  <span className="text-muted-foreground text-xs">{c.name}</span>
                  <span className="ml-auto text-xs font-medium whitespace-nowrap text-foreground">{inr(c.value)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Section-wise Deduction</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-2.5 pb-5">
            {sectionWise.map((s) => (
              <div key={s.code} className="flex items-center gap-2 text-xs">
                <span className="w-32 shrink-0 truncate text-foreground">{s.code}</span>
                <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
                <span className="text-muted-foreground w-28 shrink-0 text-right whitespace-nowrap">{inr(s.amount)} ({s.pct}%)</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>PAN Verification Status</CardTitle></CardHeader>
          <CardContent className="flex items-center gap-4 pb-5">
            <DonutChart data={panStatus} total="352" totalLabel="Total Deductees" size={120} />
            <ul className="flex flex-col gap-2 text-sm">
              {panStatus.map((p) => (
                <li key={p.name} className="flex items-center gap-2">
                  <span className="size-2.5 shrink-0 rounded-full" style={{ background: p.color }} />
                  <span className="text-muted-foreground text-xs">{p.name}</span>
                  <span className="ml-auto text-xs font-medium whitespace-nowrap text-foreground">{p.value} ({((p.value / 352) * 100).toFixed(2)}%)</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Top 5 Deductees <span className="text-muted-foreground text-xs font-normal">(By TDS Amount)</span></CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5 pb-5">
            {topDeductees.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{i + 1}. {d.name}</span>
                <span className="font-medium whitespace-nowrap text-foreground">{inr(d.amount)}</span>
              </div>
            ))}
            <a href="/tax/tds/deductees" className="text-primary mt-1 text-sm font-medium">View All Deductees →</a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Late Filing Fee &amp; Interest</CardTitle></CardHeader>
          <CardContent className="pb-5">
            <p className="text-2xl font-bold text-foreground">{inr(lateFees.total)}</p>
            <p className="text-muted-foreground mb-3 text-xs">Total Liability</p>
            <div className="flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Late Filing Fee</span><span className="text-foreground">{inr(lateFees.fee)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Interest Payable</span><span className="text-foreground">{inr(lateFees.interest)}</span></div>
            </div>
            <a href="/tax/tds/challans" className="text-destructive mt-2 flex items-center gap-1 text-sm font-medium">Pay Now →</a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Upcoming Due Dates</CardTitle>
            <a href="/tax/tds" className="text-primary text-sm font-medium">View all</a>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 pb-5">
            {dueDates.map((d, i) => (
              <div key={i} className="flex gap-3">
                <div className="bg-purple-bg text-purple-foreground flex size-11 shrink-0 flex-col items-center justify-center rounded-lg text-xs leading-none font-bold">
                  <span className="text-sm">{d.date.split(" ")[0]}</span>
                  <span>{d.date.split(" ")[1]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{d.label}</p>
                </div>
                <span className="text-destructive text-xs font-medium whitespace-nowrap">{d.tag}</span>
              </div>
            ))}
            <div className="mt-1 flex justify-between border-t pt-2 text-sm">
              <span className="text-muted-foreground">Total Pending</span>
              <span className="font-semibold text-foreground">3</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 pb-5 sm:grid-cols-3 lg:grid-cols-5">
          {quickActions.map((a) => (
            <button key={a} className="hover:bg-muted rounded-lg border p-3 text-left text-sm font-medium text-foreground transition-colors">
              {a}
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
