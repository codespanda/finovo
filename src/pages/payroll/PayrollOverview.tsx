import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Wallet, Banknote, Receipt, Users, Play, Search, SlidersHorizontal, Download } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DonutChart, DonutLegend } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const employees = [
  { id: "EMP-1001", name: "Deepak Sharma", dept: "Finance", ctc: 1200000, net: 86750, deductions: 18250, status: "Paid" },
  { id: "EMP-1002", name: "Ritika Kapoor", dept: "Marketing", ctc: 960000, net: 69200, deductions: 14800, status: "Paid" },
  { id: "EMP-1003", name: "Amit Malhotra", dept: "Sales", ctc: 840000, net: 61350, deductions: 12650, status: "Paid" },
  { id: "EMP-1004", name: "Neha Singh", dept: "HR", ctc: 720000, net: 52750, deductions: 10750, status: "Paid" },
  { id: "EMP-1005", name: "Vikas Patel", dept: "Operations", ctc: 660000, net: 48300, deductions: 9700, status: "Pending" },
]

const breakdown = [
  { name: "Net Pay", value: 75, color: "var(--color-chart-1)" },
  { name: "Deductions", value: 15, color: "var(--color-chart-2)" },
  { name: "Employer Contrib.", value: 10, color: "var(--color-chart-3)" },
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

const employeeTabs = [
  { value: "all", label: "All Employees" },
  { value: "paid", label: "Paid" },
  { value: "pending", label: "Pending" },
  { value: "hold", label: "On Hold" },
] as const

export function PayrollOverview() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<(typeof employeeTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return employees.filter((e) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "paid" ? e.status === "Paid" :
        tab === "pending" ? e.status === "Pending" :
        tab === "hold" ? e.status === "On Hold" :
        true
      const matchesQuery = !q || e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Payroll" }, { label: "Overview" }]}
        title="Payroll"
        description="Manage your employee payroll, taxes, and compliance in one place."
        actions={
          <>
            <Button variant="outline">May 2025 Payroll</Button>
            <Button onClick={() => navigate("/payroll/runs")}><Play className="size-4" /> Run Payroll</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard icon={Wallet} label="Total Payroll Cost" value={inr(1845678)} delta={{ value: "12.4%" }} color="purple" />
            <StatCard icon={Banknote} label="Net Pay" value={inr(1375250)} delta={{ value: "9.8%" }} color="green" />
            <StatCard icon={Receipt} label="Total Deductions" value={inr(285430)} delta={{ value: "8.2%" }} color="red" />
            <StatCard icon={Users} label="Employees Paid" value="42 / 42" color="blue" />
          </div>

          <Card>
            <CardContent className="pt-5">
              <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
                <TabsList>
                  {employeeTabs.map((t) => (
                    <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search employees..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="flex gap-2 sm:ml-auto">
                  <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                  <Button variant="outline"><Download className="size-4" /> Export</Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-right">CTC (Annual)</TableHead>
                    <TableHead className="text-right">Net Pay</TableHead>
                    <TableHead className="text-right">Deductions</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((e) => (
                    <TableRow key={e.id} className="cursor-pointer" onClick={() => navigate(`/payroll/employees/${e.id}`)}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-8"><AvatarFallback className="bg-purple-bg text-purple-foreground">{initials(e.name)}</AvatarFallback></Avatar>
                          <div>
                            <p className="font-medium text-foreground">{e.name}</p>
                            <p className="text-muted-foreground text-xs">{e.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{e.dept}</TableCell>
                      <TableCell className="text-right text-foreground">{inr(e.ctc)}</TableCell>
                      <TableCell className="text-right font-medium text-foreground">{inr(e.net)}</TableCell>
                      <TableCell className="text-muted-foreground text-right">{inr(e.deductions)}</TableCell>
                      <TableCell><StatusBadge status={e.status} /></TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-muted-foreground py-8 text-center">No employees found for this filter.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <div className="text-muted-foreground mt-4 text-sm">Showing {filtered.length} of {employees.length} employees</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Payroll Summary</CardTitle>
              <span className="text-muted-foreground text-xs">May 2025</span>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4 pb-5">
              <DonutChart data={breakdown} total={inr(1845678)} totalLabel="Total Cost" size={150} />
              <DonutLegend data={breakdown} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Upcoming Payroll</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <p className="font-semibold text-foreground">June 2025 Payroll</p>
              <p className="text-muted-foreground mb-3 text-sm">Pay Date: 05 Jun 2025</p>
              <Button className="w-full">Prepare Payroll</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
