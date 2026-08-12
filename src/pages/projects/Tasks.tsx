import { useMemo, useState } from "react"
import { Info, ClipboardList, ListTodo, Hourglass, CheckCircle2, AlertTriangle, Search, ChevronDown, ChevronLeft, ChevronRight, List, LayoutGrid } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewTaskDialog } from "@/components/shared/ProjectDialogs"

const stats = [
  { icon: ClipboardList, label: "Total Tasks", value: "32", sub: "All time", color: "green" as const },
  { icon: ListTodo, label: "To Do", value: "14", sub: "43.75%", color: "blue" as const },
  { icon: Hourglass, label: "In Progress", value: "8", sub: "25.00%", color: "orange" as const },
  { icon: CheckCircle2, label: "Completed", value: "9", sub: "28.13%", color: "purple" as const },
  { icon: AlertTriangle, label: "Overdue", value: "3", sub: "9.38%", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const priorityColors: Record<string, "danger" | "warning" | "secondary"> = { High: "danger", Medium: "warning", Low: "secondary" }

const tasks = [
  { id: "TASK-2025-001", name: "Conduct Monthly Stock Count", cat: "Stock Count", assignee: "Rohit Sharma", priority: "High", due: "29 May 2025", rel: "2 days overdue", relColor: "text-destructive", status: "Overdue", progress: 0 },
  { id: "TASK-2025-002", name: "Review Low Stock Items", cat: "Inventory Review", assignee: "Priya Nair", priority: "Medium", due: "31 May 2025", rel: "Today", relColor: "text-warning-foreground", status: "In Progress", progress: 60 },
  { id: "TASK-2025-003", name: "Update Item Prices", cat: "Item Management", assignee: "Amit Verma", priority: "Medium", due: "02 Jun 2025", rel: "In 2 days", relColor: "text-muted-foreground", status: "To Do", progress: 0 },
  { id: "TASK-2025-004", name: "Verify Expiring Batches", cat: "Batch / Serial", assignee: "Sneha Iyer", priority: "High", due: "30 May 2025", rel: "1 day overdue", relColor: "text-destructive", status: "In Progress", progress: 30 },
  { id: "TASK-2025-005", name: "Warehouse Safety Inspection", cat: "Warehouse", assignee: "Vikram Singh", priority: "Low", due: "05 Jun 2025", rel: "In 5 days", relColor: "text-muted-foreground", status: "To Do", progress: 0 },
  { id: "TASK-2025-006", name: "Reorder Raw Materials", cat: "Purchase", assignee: "Neha Joshi", priority: "High", due: "28 May 2025", rel: "3 days overdue", relColor: "text-destructive", status: "Overdue", progress: 10 },
  { id: "TASK-2025-007", name: "Validate Stock Adjustments", cat: "Adjustments", assignee: "Karan Mehta", priority: "Medium", due: "03 Jun 2025", rel: "In 3 days", relColor: "text-muted-foreground", status: "To Do", progress: 0 },
  { id: "TASK-2025-008", name: "Generate Inventory Report", cat: "Reports", assignee: "Rohit Sharma", priority: "Low", due: "06 Jun 2025", rel: "In 6 days", relColor: "text-muted-foreground", status: "To Do", progress: 0 },
  { id: "TASK-2025-009", name: "Check Damaged Goods", cat: "Quality Check", assignee: "Priya Nair", priority: "Medium", due: "01 Jun 2025", rel: "Tomorrow", relColor: "text-muted-foreground", status: "In Progress", progress: 75 },
  { id: "TASK-2025-010", name: "Update Vendor Lead Times", cat: "Vendor", assignee: "Amit Verma", priority: "Low", due: "07 Jun 2025", rel: "In 7 days", relColor: "text-muted-foreground", status: "To Do", progress: 0 },
]

const byStatus = [
  { name: "To Do", value: 14, pct: 43.75, color: "var(--color-muted-foreground)" },
  { name: "In Progress", value: 8, pct: 25.0, color: "var(--color-chart-1)" },
  { name: "Completed", value: 9, pct: 28.13, color: "var(--color-chart-2)" },
  { name: "Overdue", value: 3, pct: 9.38, color: "var(--color-chart-5)" },
]

const quickActions = ["New Task", "My Tasks", "Task Categories", "Recurring Tasks", "Task History", "Task Settings"]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

const taskTabs = [
  { value: "all", label: "All Tasks" },
  { value: "todo", label: "To Do" },
  { value: "progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "overdue", label: "Overdue" },
] as const

export function Tasks() {
  const [tab, setTab] = useState<(typeof taskTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tasks.filter((t) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "todo" ? t.status === "To Do" :
        tab === "progress" ? t.status === "In Progress" :
        tab === "completed" ? t.status === "Completed" :
        tab === "overdue" ? t.status === "Overdue" :
        true
      const matchesQuery = !q || t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || t.assignee.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Projects", href: "/projects" }, { label: "Tasks" }]}
        title={<span className="flex items-center gap-2">Tasks <Info className="text-muted-foreground size-4" /></span>}
        description="Manage and track all project related tasks efficiently."
        actions={
          <>
            <Button variant="outline">Filters</Button>
            <NewTaskDialog>
              <DialogTrigger asChild>
                <Button>+ New Task</Button>
              </DialogTrigger>
            </NewTaskDialog>
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
            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList>
                {taskTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search tasks by title, reference, assignee..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <Button variant="outline">All Priorities <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Categories <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Assignees <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">01 May 2025 - 31 May 2025</Button>
                <Button variant="outline" size="icon"><List className="size-4" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Task</th>
                    <th className="pb-2 font-medium">Category</th>
                    <th className="pb-2 font-medium">Assignee</th>
                    <th className="pb-2 font-medium">Priority</th>
                    <th className="pb-2 font-medium">Due Date</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t) => (
                    <tr key={t.id} className="border-b last:border-0">
                      <td className="py-3">
                        <p className="font-medium whitespace-nowrap text-foreground">{t.name}</p>
                        <p className="text-muted-foreground text-xs">{t.id}</p>
                      </td>
                      <td className="py-3"><Badge variant="secondary">{t.cat}</Badge></td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-6"><AvatarFallback className="bg-purple-bg text-purple-foreground text-[10px]">{initials(t.assignee)}</AvatarFallback></Avatar>
                          <span className="text-xs whitespace-nowrap text-foreground">{t.assignee}</span>
                        </div>
                      </td>
                      <td className="py-3"><Badge variant={priorityColors[t.priority]}>{t.priority}</Badge></td>
                      <td className="py-3 whitespace-nowrap">
                        <p className="text-foreground">{t.due}</p>
                        <p className={`text-xs ${t.relColor}`}>{t.rel}</p>
                      </td>
                      <td className="py-3"><StatusBadge status={t.status} /></td>
                      <td className="py-3">
                        <p className="mb-1 text-xs font-medium text-foreground">{t.progress}%</p>
                        <div className="bg-muted h-1.5 w-20 overflow-hidden rounded-full">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${t.progress}%` }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-muted-foreground py-8 text-center">No tasks found for this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {tasks.length} tasks</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((p) => (
                    <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Calendar</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <div className="mb-3 flex items-center justify-between">
                <Button variant="ghost" size="icon-sm"><ChevronLeft className="size-4" /></Button>
                <span className="text-sm font-semibold text-foreground">May 2025</span>
                <Button variant="ghost" size="icon-sm"><ChevronRight className="size-4" /></Button>
              </div>
              <div className="text-muted-foreground grid grid-cols-7 gap-1 text-center text-xs">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                  <span key={d} className="pb-1 font-medium">{d}</span>
                ))}
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = i - 3
                  const inMonth = day >= 1 && day <= 31
                  const isOverdue = [28, 29].includes(day)
                  const isToday = day === 31
                  return (
                    <span
                      key={i}
                      className={`flex size-7 items-center justify-center rounded-full text-xs ${
                        !inMonth ? "text-muted-foreground/40" : isToday ? "bg-primary text-primary-foreground font-semibold" : isOverdue ? "bg-danger-bg text-danger-foreground" : "text-foreground"
                      }`}
                    >
                      {inMonth ? day : ((day + 30) % 30) + 1}
                    </span>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Tasks by Status</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              <div className="flex items-center gap-4">
                <DonutChart data={byStatus} total="32" totalLabel="Total" size={140} />
                <ul className="flex flex-col gap-2 text-sm">
                  {byStatus.map((s) => (
                    <li key={s.name} className="flex items-center gap-2">
                      <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                      <span className="text-muted-foreground">{s.name}</span>
                      <span className="ml-auto font-medium whitespace-nowrap text-foreground">{s.value} ({s.pct.toFixed(2)}%)</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="/projects/tasks" className="text-primary text-sm font-medium">View all tasks →</a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col pb-3">
              {quickActions.map((a) => (
                <button key={a} className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2.5 text-left text-sm font-medium text-foreground transition-colors">
                  {a}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
