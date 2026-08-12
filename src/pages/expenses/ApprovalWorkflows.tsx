import { useState } from "react"
import { Workflow, CheckCircle2, Hourglass, FileText, Wallet, Search, SlidersHorizontal, GripVertical, List, LayoutGrid, ChevronDown } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewWorkflowDialog } from "@/components/shared/PayrollExpenseDialogs"
import { inr } from "@/lib/format"
import { cn } from "@/lib/utils"

const stats = [
  { icon: Workflow, label: "Total Workflows", value: "9", sub: "Across all modules", color: "purple" as const },
  { icon: CheckCircle2, label: "Active Workflows", value: "7", sub: "Currently active", color: "green" as const },
  { icon: Hourglass, label: "Pending Updates", value: "2", sub: "Require your attention", color: "orange" as const },
  { icon: FileText, label: "Total Requests", value: "1,248", sub: "This Month", color: "blue" as const },
  { icon: Wallet, label: "Approved Amount", value: inr(2458780, { decimals: true }), sub: "This Month", color: "red" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  blue: "bg-info-bg text-info-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const moduleColors: Record<string, "purple" | "info" | "warning"> = {
  Expenses: "purple",
  Purchases: "info",
  Mileage: "warning",
}

const workflows = [
  { id: 1, name: "Expense Claim Approval", sub: "Standard expense claims", module: "Expenses", applies: "All Employees", stages: 3, limit: "Up to ₹50,000", status: "Active", by: "Priya Nair", date: "28 May 2025" },
  { id: 2, name: "High Value Expense Approval", sub: "For high value expense claims", module: "Expenses", applies: "All Employees", stages: 4, limit: "Above ₹50,000", status: "Active", by: "Amit Verma", date: "27 May 2025" },
  { id: 3, name: "Travel Expense Approval", sub: "Travel & related expenses", module: "Expenses", applies: "All Employees", stages: 3, limit: "No Limit", status: "Active", by: "Neha Kapoor", date: "25 May 2025" },
  { id: 4, name: "Advance Payment Approval", sub: "Employee advance requests", module: "Expenses", applies: "All Employees", stages: 2, limit: "No Limit", status: "Active", by: "Vikram Singh", date: "24 May 2025" },
  { id: 5, name: "Vendor Payment Approval", sub: "Vendor bill payments", module: "Purchases", applies: "Finance Team", stages: 3, limit: "No Limit", status: "Active", by: "Rahul Sharma", date: "23 May 2025" },
  { id: 6, name: "Capital Purchase Approval", sub: "Asset & capital purchases", module: "Purchases", applies: "All Employees", stages: 4, limit: "Above ₹1,00,000", status: "Active", by: "Priya Nair", date: "20 May 2025" },
  { id: 7, name: "Mileage Reimbursement Approval", sub: "Mileage reimbursement claims", module: "Mileage", applies: "All Employees", stages: 2, limit: "No Limit", status: "Active", by: "Amit Verma", date: "18 May 2025" },
  { id: 8, name: "Petty Cash Approval", sub: "Petty cash requests", module: "Expenses", applies: "Specific Users", stages: 2, limit: "Up to ₹10,000", status: "Inactive", by: "Neha Kapoor", date: "15 May 2025" },
  { id: 9, name: "IT Purchase Approval", sub: "IT & software purchases", module: "Purchases", applies: "IT Department", stages: 3, limit: "Up to ₹75,000", status: "Draft", by: "Rahul Sharma", date: "12 May 2025" },
]

const stageDetail = [
  { level: "Level 1", name: "Manager Approval", approver: "Direct Manager", required: true },
  { level: "Level 2", name: "Finance Approval", approver: "Finance Manager", required: true },
  { level: "Level 3", name: "Final Approval", approver: "Head - Finance", required: true },
]

const activity = [
  { who: "Priya Nair", text: "updated the workflow", time: "28 May 2025, 10:30 AM" },
  { who: "Amit Verma", text: "approved a request", time: "28 May 2025, 09:15 AM" },
  { who: "Neha Kapoor", text: "submitted a request", time: "28 May 2025, 08:45 AM" },
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export function ApprovalWorkflows() {
  const [selected, setSelected] = useState(workflows[0].id)
  const wf = workflows.find((w) => w.id === selected)!

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Expenses", href: "/expenses" }, { label: "Approval Workflows" }]}
        title="Approval Workflows"
        description="Create and manage approval workflows for expenses and claims."
        actions={
          <>
            <Button variant="outline">Learn More</Button>
            <NewWorkflowDialog>
              <DialogTrigger asChild>
                <Button>+ New Workflow</Button>
              </DialogTrigger>
            </NewWorkflowDialog>
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
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Workflows</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search workflows..." className="pl-9" />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline">All Modules <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline" size="icon"><List className="size-4" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-6"></TableHead>
                  <TableHead>Workflow Name</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Applies To</TableHead>
                  <TableHead>Stages</TableHead>
                  <TableHead>Amount Limit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflows.map((w) => (
                  <TableRow key={w.id} className="cursor-pointer" onClick={() => setSelected(w.id)}>
                    <TableCell><GripVertical className="text-muted-foreground size-4" /></TableCell>
                    <TableCell>
                      <p className="font-medium whitespace-nowrap text-foreground">{w.name}</p>
                      <p className="text-muted-foreground text-xs">{w.sub}</p>
                    </TableCell>
                    <TableCell><Badge variant={moduleColors[w.module]}>{w.module}</Badge></TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{w.applies}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: w.stages }).map((_, i) => (
                          <span key={i} className="flex items-center">
                            <span className="border-primary text-primary flex size-5 items-center justify-center rounded-full border text-[10px] font-semibold">{i + 1}</span>
                            {i < w.stages - 1 && <span className="text-muted-foreground mx-0.5">→</span>}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{w.limit}</TableCell>
                    <TableCell><StatusBadge status={w.status} /></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6"><AvatarFallback className="bg-purple-bg text-purple-foreground text-[10px]">{initials(w.by)}</AvatarFallback></Avatar>
                        <div>
                          <p className="text-xs whitespace-nowrap text-foreground">{w.date}</p>
                          <p className="text-muted-foreground text-xs whitespace-nowrap">by {w.by}</p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 9 of 9 workflows</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <Button size="sm" variant="default" className="size-8 p-0">1</Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1">10 / page <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Workflow Details</CardTitle>
            <StatusBadge status={wf.status} />
          </CardHeader>
          <CardContent className="pb-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-purple-bg text-purple-foreground flex size-10 shrink-0 items-center justify-center rounded-lg">
                <Workflow className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{wf.name}</p>
                <p className="text-muted-foreground text-xs">{wf.sub}</p>
                <p className="text-muted-foreground text-xs">Created on 10 Apr 2025 by Priya Nair</p>
              </div>
            </div>

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="config">Configuration</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <p className="mb-1 text-sm font-semibold text-foreground">Description</p>
                <p className="text-muted-foreground mb-4 text-sm">This workflow is for standard expense claims up to ₹50,000. It includes manager and finance approval.</p>

                <div className="mb-4 flex flex-col gap-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Module</span><span className="text-foreground">{wf.module}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Applies To</span><span className="text-foreground">{wf.applies}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Amount Limit</span><span className="text-foreground">{wf.limit}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Requests</span><span className="text-foreground">486</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Approved Amount</span><span className="text-foreground">{inr(876450)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Last Updated</span><span className="text-foreground">{wf.date} by {wf.by}</span></div>
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Stages ({stageDetail.length})</p>
                    <a href="/expenses/approval-workflows" className="text-primary text-xs font-medium">Edit Stages</a>
                  </div>
                  <div className="flex flex-col gap-3">
                    {stageDetail.map((s, i) => (
                      <div key={s.name} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <span className="bg-info-bg text-info-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">{i + 1}</span>
                          {i < stageDetail.length - 1 && <span className="bg-border my-1 w-px flex-1" />}
                        </div>
                        <div className={cn("pb-1", i === stageDetail.length - 1 && "pb-0")}>
                          <p className="flex items-center gap-2 text-sm font-medium text-foreground">{s.name} <span className="text-muted-foreground text-xs font-normal">{s.level}</span> {s.required && <Badge variant="secondary">Required</Badge>}</p>
                          <p className="text-muted-foreground text-xs">Approver: {s.approver}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Recent Activity</p>
                    <a href="/accounting" className="text-primary text-xs font-medium">View All</a>
                  </div>
                  <div className="flex flex-col gap-3">
                    {activity.map((a, i) => (
                      <div key={i} className="text-sm">
                        <p className="text-foreground"><span className="font-medium">{a.who}</span> {a.text}</p>
                        <p className="text-muted-foreground text-xs">{a.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">Edit Workflow</Button>
                  <Button variant="outline" className="text-destructive flex-1">Deactivate</Button>
                </div>
              </TabsContent>
              <TabsContent value="config" className="text-muted-foreground mt-4 text-sm">
                Stage approvers, escalation rules and notification settings for this workflow.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
