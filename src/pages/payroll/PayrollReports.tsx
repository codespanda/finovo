import { useState } from "react"
import { Wallet, Users, Banknote, Receipt, TrendingUp, FileText } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { TrendAreaChart, DonutChart, DonutLegend } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewReportDialog } from "@/components/shared/EntityDialogs"
import { inr } from "@/lib/format"

const trend = [
  { m: "Dec", cost: 1450000 },
  { m: "Jan", cost: 1510000 },
  { m: "Feb", cost: 1525000 },
  { m: "Mar", cost: 1610000 },
  { m: "Apr", cost: 1665000 },
  { m: "May", cost: 1875000 },
]

const breakdown = [
  { name: "Basic Salary", value: 56, color: "var(--color-chart-1)" },
  { name: "Allowances", value: 19, color: "var(--color-chart-2)" },
  { name: "Employer PF", value: 10, color: "var(--color-chart-3)" },
  { name: "Bonus", value: 6, color: "var(--color-chart-4)" },
  { name: "Others", value: 9, color: "var(--color-chart-5)" },
]

const departments = [
  { dept: "Engineering", employees: 48, gross: 612000, net: 501660 },
  { dept: "Sales & Marketing", employees: 22, gross: 285000, net: 230850 },
  { dept: "Finance", employees: 12, gross: 195000, net: 158100 },
  { dept: "HR", employees: 10, gross: 120000, net: 97200 },
  { dept: "Operations", employees: 28, gross: 253000, net: 204150 },
]

const statutoryReports = [
  { name: "PF Challan (ECR)", period: "May 2025", status: "Ready" },
  { name: "ESI Challan", period: "May 2025", status: "Ready" },
  { name: "Professional Tax Report", period: "May 2025", status: "Ready" },
  { name: "Form 24Q (TDS on Salary)", period: "Q1 FY 2025-26", status: "Pending" },
]

function DeptTable({ title }: { title: string }) {
  return (
    <Card className="mt-5">
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="overflow-x-auto pb-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground border-b text-left text-xs">
              <th className="pb-2 font-medium">Department</th>
              <th className="pb-2 font-medium">Employees</th>
              <th className="pb-2 text-right font-medium">Gross Pay</th>
              <th className="pb-2 text-right font-medium">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.dept} className="border-b last:border-0">
                <td className="py-3 font-medium text-foreground">{d.dept}</td>
                <td className="text-muted-foreground py-3">{d.employees}</td>
                <td className="py-3 text-right text-foreground">{inr(d.gross)}</td>
                <td className="py-3 text-right font-medium text-foreground">{inr(d.net)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

export function PayrollReports() {
  const [tab, setTab] = useState("dashboard")

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Reports", href: "/reports" }, { label: "Payroll Reports" }]}
        title="Reports & Analytics"
        description="Explore payroll insights and download detailed reports."
        actions={
          <NewReportDialog>
            <DialogTrigger asChild>
              <Button>Custom Report</Button>
            </DialogTrigger>
          </NewReportDialog>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={Wallet} label="Total Payroll Cost (MTD)" value={inr(1875300)} delta={{ value: "12.5%" }} color="blue" />
        <StatCard icon={Users} label="Employees Paid (MTD)" value="128" delta={{ value: "4" }} color="green" />
        <StatCard icon={TrendingUp} label="Average Salary (MTD)" value={inr(146500)} delta={{ value: "8.3%" }} color="orange" />
        <StatCard icon={Receipt} label="Total Deductions (MTD)" value={inr(695900)} delta={{ value: "10.6%" }} color="red" />
        <StatCard icon={Banknote} label="Net Pay (MTD)" value={inr(1179400)} delta={{ value: "13.6%" }} color="purple" className="col-span-2 lg:col-span-1" />
      </div>

      <Card>
        <CardContent className="pt-5">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="summary">Payroll Summary</TabsTrigger>
              <TabsTrigger value="employee">Employee Reports</TabsTrigger>
              <TabsTrigger value="tax">Tax &amp; Compliance</TabsTrigger>
              <TabsTrigger value="statutory">Statutory Reports</TabsTrigger>
              <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
              <TabsTrigger value="custom">Custom Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                  <CardHeader><CardTitle>Payroll Cost Trend</CardTitle></CardHeader>
                  <CardContent className="pb-5">
                    <TrendAreaChart data={trend} xKey="m" series={[{ key: "cost", color: "var(--color-chart-1)", label: "Total Payroll Cost" }]} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Payroll Cost Breakdown</CardTitle></CardHeader>
                  <CardContent className="flex flex-col items-center gap-4 pb-5">
                    <DonutChart data={breakdown} total={inr(1875300)} totalLabel="Total" size={140} />
                    <DonutLegend data={breakdown} />
                  </CardContent>
                </Card>
              </div>
              <DeptTable title="Department Wise Payroll Cost" />
            </TabsContent>

            <TabsContent value="summary">
              <DeptTable title="Payroll Summary by Department" />
            </TabsContent>

            <TabsContent value="employee">
              <DeptTable title="Employee Headcount by Department" />
            </TabsContent>

            <TabsContent value="tax">
              <Card className="mt-5">
                <CardHeader><CardTitle>Tax &amp; Compliance Summary</CardTitle></CardHeader>
                <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">TDS Deducted (MTD)</span><span className="text-foreground font-medium">{inr(81000, { decimals: true })}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Professional Tax (MTD)</span><span className="text-foreground font-medium">{inr(22400, { decimals: true })}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">PF Contribution (MTD)</span><span className="text-foreground font-medium">{inr(132450, { decimals: true })}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">ESI Contribution (MTD)</span><span className="text-foreground font-medium">{inr(48750, { decimals: true })}</span></div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="statutory">
              <Card className="mt-5">
                <CardHeader><CardTitle>Statutory Reports</CardTitle></CardHeader>
                <CardContent className="overflow-x-auto pb-5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground border-b text-left text-xs">
                        <th className="pb-2 font-medium">Report</th>
                        <th className="pb-2 font-medium">Period</th>
                        <th className="pb-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statutoryReports.map((r) => (
                        <tr key={r.name} className="border-b last:border-0">
                          <td className="py-3 font-medium whitespace-nowrap text-foreground">{r.name}</td>
                          <td className="text-muted-foreground py-3 whitespace-nowrap">{r.period}</td>
                          <td className="py-3">
                            <span className={r.status === "Ready" ? "text-success-foreground text-xs font-medium" : "text-warning-foreground text-xs font-medium"}>{r.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cost">
              <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                  <CardHeader><CardTitle>Payroll Cost Trend</CardTitle></CardHeader>
                  <CardContent className="pb-5">
                    <TrendAreaChart data={trend} xKey="m" series={[{ key: "cost", color: "var(--color-chart-1)", label: "Total Payroll Cost" }]} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Cost Breakdown</CardTitle></CardHeader>
                  <CardContent className="flex flex-col items-center gap-4 pb-5">
                    <DonutChart data={breakdown} total={inr(1875300)} totalLabel="Total" size={140} />
                    <DonutLegend data={breakdown} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="custom">
              <Card className="mt-5">
                <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
                  <div className="bg-info-bg text-info-foreground flex size-10 items-center justify-center rounded-lg"><FileText className="size-5" /></div>
                  <p className="font-semibold text-foreground">No custom reports yet</p>
                  <p className="text-muted-foreground max-w-sm text-sm">Build a custom report with the filters and columns you need.</p>
                  <NewReportDialog>
                    <DialogTrigger asChild>
                      <Button>Custom Report</Button>
                    </DialogTrigger>
                  </NewReportDialog>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
