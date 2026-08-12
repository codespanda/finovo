import { Fragment, useState } from "react"
import { Info, Clock, CalendarCheck, FileText, Target, Search, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, List, LayoutGrid, Play } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { LogTimeDialog } from "@/components/shared/ProjectDialogs"
import { cn } from "@/lib/utils"

const stats = [
  { icon: Clock, label: "Total Hours", value: "38h 45m", sub: "This Week", color: "green" as const },
  { icon: CalendarCheck, label: "Billable Hours", value: "31h 15m", sub: "80.54% of total", color: "blue" as const },
  { icon: FileText, label: "Non-Billable Hours", value: "7h 30m", sub: "19.46% of total", color: "purple" as const },
  { icon: Target, label: "Required Hours", value: "40h 00m", sub: "100% of target", color: "orange" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
}

const days = [
  {
    label: "Monday, 26 May 2025",
    total: "7h 45m",
    entries: [
      { proj: "Website Redesign", code: "PRJ-001", activity: "Design", desc: "Created mockups for inventory module", time: "3h 30m", type: "Billable", status: "Approved" },
      { proj: "Mobile App", code: "PRJ-002", activity: "Development", desc: "Implemented product list API", time: "3h 15m", type: "Billable", status: "Approved" },
      { proj: "Internal", code: "INT-001", activity: "Meeting", desc: "Team sync and requirements discussion", time: "1h 00m", type: "Non-Billable", status: "Approved" },
    ],
  },
  {
    label: "Tuesday, 27 May 2025",
    total: "8h 00m",
    entries: [
      { proj: "Inventory System", code: "PRJ-003", activity: "Development", desc: "Worked on stock adjustment feature", time: "4h 30m", type: "Billable", status: "Approved" },
      { proj: "Mobile App", code: "PRJ-002", activity: "Testing", desc: "Tested invoice flow and fixed bugs", time: "2h 00m", type: "Billable", status: "Approved" },
      { proj: "Internal", code: "INT-001", activity: "Training", desc: "New tool training session", time: "1h 30m", type: "Non-Billable", status: "Approved" },
    ],
  },
  {
    label: "Wednesday, 28 May 2025",
    total: "7h 15m",
    entries: [
      { proj: "Website Redesign", code: "PRJ-001", activity: "Design", desc: "Designed warehouse pages", time: "3h 00m", type: "Billable", status: "Pending" },
      { proj: "Inventory System", code: "PRJ-003", activity: "Development", desc: "Implemented transfer module", time: "3h 15m", type: "Billable", status: "Approved" },
      { proj: "Internal", code: "INT-001", activity: "Documentation", desc: "Updated inventory workflow docs", time: "1h 00m", type: "Non-Billable", status: "Approved" },
    ],
  },
]

const typeColors: Record<string, "success" | "purple"> = { Billable: "success", "Non-Billable": "purple" }

const weekly = [
  { name: "Billable", value: 80.54, color: "var(--color-chart-2)", hours: "31h 15m" },
  { name: "Non-Billable", value: 19.46, color: "var(--color-chart-1)", hours: "7h 30m" },
]

const projects = [
  { name: "Inventory System (PRJ-003)", hours: "14h 00m", pct: 100 },
  { name: "Website Redesign (PRJ-001)", hours: "10h 15m", pct: 73 },
  { name: "Mobile App (PRJ-002)", hours: "7h 15m", pct: 52 },
  { name: "Internal (INT-001)", hours: "7h 15m", pct: 52 },
]

const quickActions = ["Log Time", "Start Timer", "Timesheet Report", "My Timesheet", "Approve Timesheets", "Timesheet Settings"]

const timesheetTabs = [
  { value: "entries", label: "Timesheet Entries" },
  { value: "mine", label: "My Timesheet" },
  { value: "team", label: "Team Timesheet" },
  { value: "approvals", label: "Approvals" },
] as const

export function Timesheet() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [tab, setTab] = useState<(typeof timesheetTabs)[number]["value"]>("entries")

  const visibleDays = days
    .map((d) => ({
      ...d,
      entries: tab === "approvals" ? d.entries.filter((e) => e.status === "Pending") : d.entries,
    }))
    .filter((d) => d.entries.length > 0)

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Projects", href: "/projects" }, { label: "Timesheet" }]}
        title={<span className="flex items-center gap-2">Timesheet <Info className="text-muted-foreground size-4" /></span>}
        description="Track and manage your work hours. Log time manually or start a timer."
        actions={
          <>
            <Button variant="outline"><ChevronLeft className="size-4" /> 26 May 2025 - 1 Jun 2025 <ChevronRight className="size-4" /></Button>
            <Button variant="outline">Filters</Button>
            <LogTimeDialog>
              <DialogTrigger asChild>
                <Button><Play className="size-4" /> Log Time</Button>
              </DialogTrigger>
            </LogTimeDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
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
                {timesheetTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search by task, project or description..." className="pl-9" />
              </div>
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <Button variant="outline">All Projects <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Activities <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline" size="icon"><List className="size-4" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Project / Task</th>
                    <th className="pb-2 font-medium">Activity</th>
                    <th className="pb-2 font-medium">Description</th>
                    <th className="pb-2 font-medium">Time</th>
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleDays.map((d) => (
                    <Fragment key={d.label}>
                      <tr className="bg-muted/40 border-b">
                        <td colSpan={4} className="py-2 font-medium text-foreground">
                          <button className="flex items-center gap-1.5" onClick={() => setCollapsed((s) => ({ ...s, [d.label]: !s[d.label] }))}>
                            <ChevronUp className={cn("size-3.5 transition-transform", collapsed[d.label] && "rotate-180")} />
                            {d.label}
                          </button>
                        </td>
                        <td colSpan={3} className="py-2 text-right font-semibold text-foreground">{d.total}</td>
                      </tr>
                      {!collapsed[d.label] &&
                        d.entries.map((e, i) => (
                          <tr key={i} className="border-b last:border-0">
                            <td className="text-muted-foreground py-3 whitespace-nowrap">{d.label.split(", ")[1]}</td>
                            <td className="py-3 whitespace-nowrap">
                              <p className="text-foreground">{e.proj}</p>
                              <p className="text-muted-foreground text-xs">{e.code}</p>
                            </td>
                            <td className="text-muted-foreground py-3 whitespace-nowrap">{e.activity}</td>
                            <td className="text-muted-foreground max-w-[200px] py-3 whitespace-normal">{e.desc}</td>
                            <td className="py-3 font-medium whitespace-nowrap text-foreground">{e.time}</td>
                            <td className="py-3"><Badge variant={typeColors[e.type]}>{e.type}</Badge></td>
                            <td className="py-3"><StatusBadge status={e.status} /></td>
                          </tr>
                        ))}
                    </Fragment>
                  ))}
                  {visibleDays.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-muted-foreground py-8 text-center">No entries found for this view.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-3 flex justify-center">
              <Button variant="outline" size="sm" className="gap-1">Show More Entries <ChevronDown className="size-3.5" /></Button>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 9 of 27 entries</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                  ))}
                  <span className="text-muted-foreground px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">5</Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Weekly Summary</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              <div className="flex items-center gap-4">
                <DonutChart data={weekly} total="38h 45m" totalLabel="Total" size={140} />
                <ul className="flex flex-col gap-2 text-sm">
                  {weekly.map((s) => (
                    <li key={s.name} className="flex flex-col">
                      <span className="flex items-center gap-2">
                        <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                        <span className="text-muted-foreground">{s.name}</span>
                      </span>
                      <span className="pl-4.5 text-xs font-medium text-foreground">{s.hours} ({s.value}%)</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2 border-t pt-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Required Hours</span><span className="font-medium text-foreground">40h 00m</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Overtime</span><span className="text-success-foreground font-medium">2h 15m (5.63%)</span></div>
              </div>
              <a href="/projects/timesheets" className="text-primary text-sm font-medium">View detailed report →</a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Projects Summary</CardTitle>
              <span className="text-muted-foreground text-xs">This Week</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {projects.map((p) => (
                <div key={p.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-foreground">{p.name}</span>
                    <span className="text-muted-foreground">{p.hours}</span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              ))}
              <a href="/projects" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View all projects →</a>
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
