import { useState } from "react"
import { Play, ListChecks, CheckCircle2, Hourglass, FileEdit, Plus, Search } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DialogTrigger } from "@/components/ui/dialog"
import { RunPayrollDialog } from "@/components/shared/PayrollExpenseDialogs"
import { inr } from "@/lib/format"
import { cn } from "@/lib/utils"

const runs = [
  { id: "May 2025 Payroll", period: "01 May - 31 May 2025", employees: 128, gross: 1875300, net: 1179400, status: "Completed" },
  { id: "Apr 2025 Payroll", period: "01 Apr - 30 Apr 2025", employees: 128, gross: 1665300, net: 1028600, status: "Completed" },
  { id: "Mar 2025 Payroll", period: "01 Mar - 31 Mar 2025", employees: 128, gross: 1610200, net: 995800, status: "Completed" },
  { id: "Jun 2025 Payroll", period: "01 Jun - 30 Jun 2025", employees: 129, gross: 1930800, net: 0, status: "In Progress" },
  { id: "Jul 2025 Payroll", period: "01 Jul - 31 Jul 2025", employees: 129, gross: 0, net: 0, status: "Draft" },
]

export function PayrollRuns() {
  const [selected, setSelected] = useState(runs[0].id)
  const run = runs.find((r) => r.id === selected)!

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Payroll", href: "/payroll" }, { label: "Payroll Runs" }]}
        title="Payroll Runs"
        description="View, manage and track all your payroll runs."
        actions={
          <RunPayrollDialog>
            <DialogTrigger asChild>
              <Button><Plus className="size-4" /> Run Payroll</Button>
            </DialogTrigger>
          </RunPayrollDialog>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={ListChecks} label="Total Payroll Runs" value="16" color="blue" />
        <StatCard icon={CheckCircle2} label="Completed Runs" value="12" color="green" />
        <StatCard icon={Hourglass} label="In Progress" value="2" color="orange" />
        <StatCard icon={FileEdit} label="Draft Runs" value="1" color="purple" />
        <StatCard icon={Play} label="Upcoming Runs" value="1" color="pink" className="col-span-2 lg:col-span-1" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <div className="mb-4 flex items-center gap-2">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search payroll runs..." className="pl-9" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {runs.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r.id)}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-3 text-left transition-colors",
                    selected === r.id ? "border-primary bg-accent" : "hover:bg-muted"
                  )}
                >
                  <div>
                    <p className="font-medium text-foreground">{r.id}</p>
                    <p className="text-muted-foreground text-xs">{r.period} • {r.employees} Employees</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{r.gross ? inr(r.gross) : "—"}</p>
                    <StatusBadge status={r.status} />
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>{run.id}</CardTitle>
            <StatusBadge status={run.status} />
          </CardHeader>
          <CardContent className="pb-5">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="employees">Employees</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4 flex flex-col gap-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Pay Period</span><span className="text-foreground">{run.period}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Employees</span><span className="text-foreground">{run.employees}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Gross Pay</span><span className="font-medium text-foreground">{run.gross ? inr(run.gross) : "—"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Net Pay</span><span className="font-medium text-foreground">{run.net ? inr(run.net) : "—"}</span></div>
                <Button className="mt-2 w-full" disabled={run.status === "Completed"}>
                  {run.status === "Draft" ? "Process Payroll" : run.status === "In Progress" ? "Continue Payroll" : "View Payslips"}
                </Button>
              </TabsContent>
              <TabsContent value="employees" className="text-muted-foreground mt-4 text-sm">
                {run.employees} employees included in this run.
              </TabsContent>
              <TabsContent value="summary" className="text-muted-foreground mt-4 text-sm">
                Full statutory and cost summary for this run.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
