import { Info, Flag, CheckCircle2, RefreshCcw, AlertTriangle, CalendarClock, Search, ChevronDown, List, LayoutGrid, Upload, PlayCircle, XCircle } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewMilestoneDialog } from "@/components/shared/ProjectDialogs"

const stats = [
  { icon: Flag, label: "Total Milestones", value: "12", sub: "All projects", color: "green" as const },
  { icon: CheckCircle2, label: "Completed", value: "5", sub: "41.67%", color: "blue" as const },
  { icon: RefreshCcw, label: "In Progress", value: "4", sub: "33.33%", color: "orange" as const },
  { icon: AlertTriangle, label: "Overdue", value: "2", sub: "16.67%", color: "red" as const },
  { icon: CalendarClock, label: "Upcoming", value: "1", sub: "8.33%", color: "purple" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
  purple: "bg-purple-bg text-purple-foreground",
}

const priorityColors: Record<string, "danger" | "warning" | "secondary"> = { High: "danger", Medium: "warning", Low: "secondary" }
const statusIcon: Record<string, { icon: typeof CheckCircle2; className: string }> = {
  Completed: { icon: CheckCircle2, className: "text-success-foreground" },
  "In Progress": { icon: PlayCircle, className: "text-info-foreground" },
  Overdue: { icon: XCircle, className: "text-destructive" },
  Upcoming: { icon: CalendarClock, className: "text-purple-foreground" },
}

const milestones = [
  { name: "Requirements Analysis", sub: "Define and finalize all requirements", project: "Inventory System", code: "PRJ-003", owner: "Rohit Sharma", due: "10 May 2025", rel: "Completed", relColor: "text-success-foreground", status: "Completed", progress: 100, priority: "High" },
  { name: "UI/UX Design", sub: "Design wireframes and prototypes", project: "Website Redesign", code: "PRJ-001", owner: "Priya Nair", due: "20 May 2025", rel: "2 days left", relColor: "text-warning-foreground", status: "In Progress", progress: 65, priority: "High" },
  { name: "Database Setup", sub: "Setup database and integrations", project: "Inventory System", code: "PRJ-003", owner: "Amit Verma", due: "18 May 2025", rel: "1 day left", relColor: "text-warning-foreground", status: "In Progress", progress: 40, priority: "Medium" },
  { name: "API Development", sub: "Develop core APIs", project: "Mobile App", code: "PRJ-002", owner: "Sneha Iyer", due: "15 May 2025", rel: "2 days overdue", relColor: "text-destructive", status: "Overdue", progress: 70, priority: "High" },
  { name: "Testing & QA", sub: "Test all modules and fix issues", project: "Website Redesign", code: "PRJ-001", owner: "Karan Mehta", due: "22 May 2025", rel: "Completed", relColor: "text-success-foreground", status: "Completed", progress: 100, priority: "Medium" },
  { name: "User Acceptance Test", sub: "UAT by end users", project: "Inventory System", code: "PRJ-003", owner: "Vikram Singh", due: "28 May 2025", rel: "5 days left", relColor: "text-warning-foreground", status: "In Progress", progress: 25, priority: "Medium" },
  { name: "Deployment", sub: "Deploy to production environment", project: "Website Redesign", code: "PRJ-001", owner: "Neha Joshi", due: "02 Jun 2025", rel: "Starts in 10 days", relColor: "text-muted-foreground", status: "Upcoming", progress: 0, priority: "High" },
  { name: "Training", sub: "Train team and end users", project: "Mobile App", code: "PRJ-002", owner: "Rohit Sharma", due: "05 Jun 2025", rel: "Starts in 13 days", relColor: "text-muted-foreground", status: "Upcoming", progress: 0, priority: "Low" },
]

const progress = [
  { name: "Completed", value: 5, pct: 41.67, color: "var(--color-chart-2)" },
  { name: "In Progress", value: 4, pct: 33.33, color: "var(--color-chart-1)" },
  { name: "Overdue", value: 2, pct: 16.67, color: "var(--color-chart-5)" },
  { name: "Upcoming", value: 1, pct: 8.33, color: "var(--color-chart-4)" },
]

const deadlines = [
  { date: "28 MAY", label: "User Acceptance Test", sub: "Inventory System (PRJ-003)", tag: "5 days left" },
  { date: "02 JUN", label: "Deployment", sub: "Website Redesign (PRJ-001)", tag: "10 days left" },
  { date: "05 JUN", label: "Training", sub: "Mobile App (PRJ-002)", tag: "13 days left" },
]

const completion = [
  { name: "Inventory System (PRJ-003)", pct: 75, color: "bg-success" },
  { name: "Website Redesign (PRJ-001)", pct: 60, color: "bg-primary" },
  { name: "Mobile App (PRJ-002)", pct: 30, color: "bg-purple-foreground" },
]

const quickActions = ["New Milestone", "Milestone Templates", "Milestone Calendar", "Milestone Report", "Manage Milestones"]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export function Milestones() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Projects", href: "/projects" }, { label: "Milestones" }]}
        title={<span className="flex items-center gap-2">Milestones <Info className="text-muted-foreground size-4" /></span>}
        description="Track key milestones and ensure timely delivery of project goals."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Export <ChevronDown className="size-3.5" /></Button>
            <Button variant="outline">Filters</Button>
            <NewMilestoneDialog>
              <DialogTrigger asChild>
                <Button>+ New Milestone</Button>
              </DialogTrigger>
            </NewMilestoneDialog>
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
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search milestones..." className="pl-9" />
              </div>
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <Button variant="outline">All Projects <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Statuses <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Owners <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">01 May 2025 - 31 May 2025</Button>
                <Button variant="outline" size="icon"><List className="size-4" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Milestone</th>
                    <th className="pb-2 font-medium">Project</th>
                    <th className="pb-2 font-medium">Owner</th>
                    <th className="pb-2 font-medium">Due Date</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Progress</th>
                    <th className="pb-2 font-medium">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {milestones.map((m) => {
                    const si = statusIcon[m.status]
                    return (
                      <tr key={m.name} className="border-b last:border-0">
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <si.icon className={`size-4 shrink-0 ${si.className}`} />
                            <div>
                              <p className="font-medium whitespace-nowrap text-foreground">{m.name}</p>
                              <p className="text-muted-foreground text-xs">{m.sub}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 whitespace-nowrap">
                          <p className="text-foreground">{m.project}</p>
                          <p className="text-muted-foreground text-xs">{m.code}</p>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="size-6"><AvatarFallback className="bg-purple-bg text-purple-foreground text-[10px]">{initials(m.owner)}</AvatarFallback></Avatar>
                            <span className="text-xs whitespace-nowrap text-foreground">{m.owner}</span>
                          </div>
                        </td>
                        <td className="py-3 whitespace-nowrap">
                          <p className="text-foreground">{m.due}</p>
                          <p className={`text-xs ${m.relColor}`}>{m.rel}</p>
                        </td>
                        <td className="py-3"><StatusBadge status={m.status} /></td>
                        <td className="py-3">
                          <p className="mb-1 text-xs font-medium text-foreground">{m.progress}%</p>
                          <div className="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
                            <div className="bg-primary h-full rounded-full" style={{ width: `${m.progress}%` }} />
                          </div>
                        </td>
                        <td className="py-3"><Badge variant={priorityColors[m.priority]}>{m.priority}</Badge></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 8 of 12 milestones</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2].map((p) => (
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
            <CardHeader><CardTitle>Milestone Progress</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={progress} total="12" totalLabel="Total" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {progress.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="ml-auto font-medium whitespace-nowrap text-foreground">{s.value} ({s.pct.toFixed(2)}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <a href="/projects/milestones" className="text-primary text-sm font-medium">View all</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {deadlines.map((d) => (
                <div key={d.label} className="flex gap-3">
                  <div className="bg-info-bg text-info-foreground flex size-11 shrink-0 flex-col items-center justify-center rounded-lg text-xs leading-none font-bold">
                    <span className="text-sm">{d.date.split(" ")[0]}</span>
                    <span>{d.date.split(" ")[1]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{d.label}</p>
                    <p className="text-muted-foreground text-xs">{d.sub}</p>
                  </div>
                  <span className="text-warning-foreground text-xs font-medium whitespace-nowrap">{d.tag}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Project Completion Overview</CardTitle>
              <a href="/projects" className="text-primary text-sm font-medium">View all</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {completion.map((c) => (
                <div key={c.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-foreground">{c.name}</span>
                    <span className="text-muted-foreground">{c.pct}%</span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
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
