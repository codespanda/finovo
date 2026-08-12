import { useMemo, useState } from "react"
import { FolderKanban, TrendingUp, CheckCircle2, Clock, AlertTriangle, Search, SlidersHorizontal, Columns3, List, LayoutGrid, ChevronDown } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewProjectDialog } from "@/components/shared/ProjectDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: FolderKanban, label: "Total Projects", value: "24", sub: "Across all teams", color: "green" as const },
  { icon: TrendingUp, label: "Active Projects", value: "14", sub: "In progress", color: "blue" as const },
  { icon: CheckCircle2, label: "Completed Projects", value: "8", sub: "33.33% completion", color: "purple" as const },
  { icon: Clock, label: "On Hold", value: "2", sub: "Awaiting updates", color: "orange" as const },
  { icon: AlertTriangle, label: "Overdue Projects", value: "3", sub: "Need attention", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const projects = [
  { code: "PRJ-2024-001", name: "Website Redesign", client: "BrightWave Tech", clientSub: "Website", pm: "Rahul Sharma", pmSub: "Design Team", status: "In Progress", progress: 65, start: "01 May 2025", due: "30 Jun 2025", left: "30 days left", overdue: false, budget: 250000, bg: "bg-success-bg text-success-foreground" },
  { code: "PRJ-2024-002", name: "Mobile App Development", client: "HealthPlus", clientSub: "Mobile App", pm: "Priya Nair", pmSub: "Development Team", status: "In Progress", progress: 40, start: "15 Apr 2025", due: "15 Jul 2025", left: "45 days left", overdue: false, budget: 580000, bg: "bg-purple-bg text-purple-foreground" },
  { code: "PRJ-2024-003", name: "E-commerce Platform", client: "ShopEase", clientSub: "E-commerce", pm: "Amit Verma", pmSub: "Development Team", status: "On Hold", progress: 25, start: "10 Mar 2025", due: "10 Jul 2025", left: "40 days left", overdue: false, budget: 720000, bg: "bg-danger-bg text-danger-foreground" },
  { code: "PRJ-2024-004", name: "Brand Identity Design", client: "Creative Minds", clientSub: "Branding", pm: "Neha Kapoor", pmSub: "Design Team", status: "Completed", progress: 100, start: "05 Feb 2025", due: "20 Mar 2025", left: "", overdue: false, budget: 120000, bg: "bg-danger-bg text-danger-foreground" },
  { code: "PRJ-2024-005", name: "Data Analytics Dashboard", client: "Data Insights Ltd.", clientSub: "Analytics", pm: "Vikram Singh", pmSub: "Analytics Team", status: "In Progress", progress: 75, start: "20 Apr 2025", due: "20 Jun 2025", left: "20 days left", overdue: false, budget: 340000, bg: "bg-info-bg text-info-foreground" },
  { code: "PRJ-2024-006", name: "Marketing Campaign", client: "GreenMart", clientSub: "Marketing", pm: "Sneha Iyer", pmSub: "Marketing Team", status: "Overdue", progress: 60, start: "01 Apr 2025", due: "15 May 2025", left: "15 days overdue", overdue: true, budget: 110000, bg: "bg-purple-bg text-purple-foreground" },
  { code: "PRJ-2024-007", name: "CRM Implementation", client: "NextGen Solutions", clientSub: "Software", pm: "Arjun Mehta", pmSub: "Development Team", status: "Completed", progress: 100, start: "10 Jan 2025", due: "28 Feb 2025", left: "", overdue: false, budget: 460000, bg: "bg-info-bg text-info-foreground" },
  { code: "PRJ-2024-008", name: "Training Portal", client: "EduLearn", clientSub: "Education", pm: "Kavya Reddy", pmSub: "Development Team", status: "In Progress", progress: 35, start: "12 May 2025", due: "12 Aug 2025", left: "72 days left", overdue: false, budget: 230000, bg: "bg-danger-bg text-danger-foreground" },
]

const statusColor: Record<string, string> = { "In Progress": "bg-primary", "On Hold": "bg-warning", Completed: "bg-success", Overdue: "bg-destructive" }

const projectStatus = [
  { name: "In Progress", value: 14, pct: 58.33, color: "var(--color-chart-2)" },
  { name: "Completed", value: 8, pct: 33.33, color: "var(--color-chart-1)" },
  { name: "On Hold", value: 2, pct: 8.33, color: "var(--color-chart-3)" },
  { name: "Overdue", value: 3, pct: 12.5, color: "var(--color-chart-5)" },
]

const tasks = [
  { label: "Completed", count: 128, pct: 50, color: "bg-success" },
  { label: "In Progress", count: 96, pct: 37.5, color: "bg-primary" },
  { label: "To Do", count: 32, pct: 12.5, color: "bg-muted-foreground" },
]

const activity = [
  { who: "Rahul Sharma", text: "updated project", sub: "Website Redesign", time: "Today, 10:30 AM" },
  { who: "Priya Nair", text: "completed task", sub: "UI Design - Mobile App", time: "Today, 09:15 AM" },
  { who: "Amit Verma", text: "added a new milestone", sub: "Beta Release", time: "Yesterday, 04:45 PM" },
  { who: "Neha Kapoor", text: "updated project status", sub: "Brand Identity Design", time: "Yesterday, 02:20 PM" },
]

const quickActions = ["New Project", "New Task", "Log Time", "Timesheet"]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

const projectTabs = [
  { value: "all", label: "All Projects" },
  { value: "active", label: "Active" },
  { value: "onhold", label: "On Hold" },
  { value: "completed", label: "Completed" },
  { value: "overdue", label: "Overdue" },
  { value: "mine", label: "My Projects" },
] as const

export function Projects() {
  const [tab, setTab] = useState<(typeof projectTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "active" ? p.status === "In Progress" :
        tab === "onhold" ? p.status === "On Hold" :
        tab === "completed" ? p.status === "Completed" :
        tab === "overdue" ? p.status === "Overdue" :
        tab === "mine" ? p.pm === "Rahul Sharma" :
        true
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Projects" }]}
        title="Projects"
        description="Plan, track and deliver projects successfully."
        actions={
          <>
            <Button variant="outline">All Projects</Button>
            <Button variant="outline">Export <ChevronDown className="size-3.5" /></Button>
            <NewProjectDialog>
              <DialogTrigger asChild>
                <Button>+ New Project</Button>
              </DialogTrigger>
            </NewProjectDialog>
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
                {projectTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search projects by name, client or code..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline"><Columns3 className="size-4" /> Columns</Button>
                <Button variant="outline" size="icon"><List className="size-4" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Project</th>
                    <th className="pb-2 font-medium">Client</th>
                    <th className="pb-2 font-medium">Project Manager</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Progress</th>
                    <th className="pb-2 font-medium">Start Date</th>
                    <th className="pb-2 font-medium">Due Date</th>
                    <th className="pb-2 text-right font-medium">Budget (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.code} className="border-b last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${p.bg}`}>{p.name.slice(0, 2).toUpperCase()}</div>
                          <div>
                            <p className="font-medium whitespace-nowrap text-foreground">{p.name}</p>
                            <p className="text-muted-foreground text-xs">{p.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <p className="text-foreground">{p.client}</p>
                        <p className="text-muted-foreground text-xs">{p.clientSub}</p>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-6"><AvatarFallback className="bg-purple-bg text-purple-foreground text-[10px]">{initials(p.pm)}</AvatarFallback></Avatar>
                          <div>
                            <p className="text-xs whitespace-nowrap text-foreground">{p.pm}</p>
                            <p className="text-muted-foreground text-xs whitespace-nowrap">{p.pmSub}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3"><StatusBadge status={p.status} /></td>
                      <td className="py-3">
                        <p className="mb-1 text-xs font-medium text-foreground">{p.progress}%</p>
                        <div className="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
                          <div className={`h-full rounded-full ${statusColor[p.status]}`} style={{ width: `${p.progress}%` }} />
                        </div>
                      </td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{p.start}</td>
                      <td className="py-3 whitespace-nowrap">
                        <p className="text-foreground">{p.due}</p>
                        {p.left && <p className={`text-xs ${p.overdue ? "text-destructive" : "text-muted-foreground"}`}>{p.left}</p>}
                      </td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(p.budget, { decimals: true })}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-muted-foreground py-8 text-center">No projects found for this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {projects.length} projects</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
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
            <CardHeader><CardTitle>Project Status</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={projectStatus} total="24" totalLabel="Total" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {projectStatus.map((s) => (
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
            <CardHeader><CardTitle>Task Overview</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Tasks</span><span className="font-medium text-foreground">256</span></div>
              {tasks.map((t) => (
                <div key={t.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-foreground">{t.label}</span>
                    <span className="text-muted-foreground">{t.count} ({t.pct}%)</span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Activity</CardTitle>
              <a href="/accounting" className="text-primary text-sm font-medium">View all</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {activity.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar className="size-8"><AvatarFallback className="bg-purple-bg text-purple-foreground">{initials(a.who)}</AvatarFallback></Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground text-sm"><span className="font-medium">{a.who}</span> {a.text}</p>
                    <p className="text-muted-foreground text-xs">{a.sub}</p>
                  </div>
                  <span className="text-muted-foreground text-xs whitespace-nowrap">{a.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 pb-5">
              {quickActions.map((a) => (
                <button key={a} className="hover:bg-muted flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-colors">
                  <div className="bg-info-bg text-info-foreground flex size-9 items-center justify-center rounded-lg">
                    <FolderKanban className="size-4" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{a}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
