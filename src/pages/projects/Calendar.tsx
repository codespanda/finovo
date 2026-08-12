import { Info, ChevronLeft, ChevronRight, SlidersHorizontal, Filter } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewEventDialog } from "@/components/shared/ProjectDialogs"
import { cn } from "@/lib/utils"

type EventType = "task" | "milestone" | "meeting" | "deadline" | "review" | "other"

interface DayCell {
  day: number
  inMonth: boolean
  events: { label: string; type: EventType }[]
}

const typeDot: Record<EventType, string> = {
  task: "bg-info",
  milestone: "bg-success",
  meeting: "bg-warning",
  deadline: "bg-destructive",
  review: "bg-purple-foreground",
  other: "bg-muted-foreground",
}

const typeChip: Record<EventType, string> = {
  task: "bg-info-bg text-info-foreground",
  milestone: "bg-success-bg text-success-foreground",
  meeting: "bg-warning-bg text-warning-foreground",
  deadline: "bg-danger-bg text-danger-foreground",
  review: "bg-purple-bg text-purple-foreground",
  other: "bg-purple-bg text-purple-foreground",
}

const weeks: DayCell[][] = [
  [
    { day: 27, inMonth: false, events: [] },
    { day: 28, inMonth: true, events: [{ label: "Requirements Analysis", type: "milestone" }, { label: "Design System", type: "task" }, { label: "Kickoff Notes", type: "task" }, { label: "Scope Review", type: "task" }] },
    { day: 29, inMonth: true, events: [{ label: "UI/UX Design Review", type: "meeting" }, { label: "Database Setup", type: "task" }, { label: "Wireframes", type: "task" }] },
    { day: 30, inMonth: true, events: [{ label: "Team Standup", type: "meeting" }, { label: "API Development", type: "deadline" }, { label: "Sprint Backlog", type: "task" }, { label: "Code Review", type: "task" }] },
    { day: 1, inMonth: true, events: [{ label: "Sprint Planning", type: "milestone" }, { label: "QA Testing", type: "task" }, { label: "Env Setup", type: "task" }, { label: "Test Plan", type: "task" }] },
    { day: 2, inMonth: true, events: [{ label: "Frontend Development", type: "task" }, { label: "Budget Review", type: "review" }, { label: "Stakeholder Sync", type: "meeting" }] },
    { day: 3, inMonth: true, events: [] },
  ],
  [
    { day: 4, inMonth: true, events: [] },
    { day: 5, inMonth: true, events: [{ label: "Frontend Development", type: "task" }, { label: "Component Library", type: "task" }, { label: "Style Guide", type: "task" }] },
    { day: 6, inMonth: true, events: [{ label: "Backend Development", type: "task" }, { label: "API Integration", type: "task" }, { label: "Schema Review", type: "task" }] },
    { day: 7, inMonth: true, events: [{ label: "Weekly Sync", type: "meeting" }, { label: "UI/UX Feedback", type: "task" }, { label: "Prototype Demo", type: "task" }] },
    { day: 8, inMonth: true, events: [{ label: "Milestone: Beta", type: "milestone" }, { label: "Testing & QA", type: "task" }, { label: "Regression Tests", type: "task" }, { label: "Bug Triage", type: "task" }] },
    { day: 9, inMonth: true, events: [{ label: "Bug Fixing", type: "task" }, { label: "Performance Review", type: "review" }, { label: "Load Testing", type: "task" }] },
    { day: 10, inMonth: true, events: [] },
  ],
  [
    { day: 11, inMonth: true, events: [] },
    { day: 12, inMonth: true, events: [{ label: "User Acceptance Test", type: "task" }, { label: "Documentation", type: "task" }, { label: "Release Notes", type: "task" }] },
    { day: 13, inMonth: true, events: [{ label: "Deployment Prep", type: "task" }, { label: "Security Review", type: "task" }, { label: "Access Audit", type: "task" }] },
    { day: 14, inMonth: true, events: [{ label: "Team Standup", type: "meeting" }, { label: "Client Demo", type: "deadline" }, { label: "Demo Prep", type: "task" }] },
    { day: 15, inMonth: true, events: [{ label: "Training Session", type: "task" }, { label: "Content Update", type: "task" }, { label: "Support Handoff", type: "task" }] },
    { day: 16, inMonth: true, events: [{ label: "Final Testing", type: "task" }, { label: "Go-Live Planning", type: "milestone" }, { label: "Runbook Review", type: "task" }] },
    { day: 17, inMonth: true, events: [] },
  ],
  [
    { day: 18, inMonth: true, events: [] },
    { day: 19, inMonth: true, events: [{ label: "Go-Live", type: "milestone" }, { label: "Announce Release", type: "task" }, { label: "Comms Plan", type: "task" }] },
    { day: 20, inMonth: true, events: [{ label: "Post-Launch Support", type: "deadline" }, { label: "Monitor & Optimize", type: "task" }, { label: "Hotfix Window", type: "task" }] },
    { day: 21, inMonth: true, events: [{ label: "Weekly Sync", type: "meeting" }, { label: "Feedback Review", type: "other" }, { label: "Roadmap Update", type: "task" }] },
    { day: 22, inMonth: true, events: [{ label: "Enhancement Plan", type: "task" }, { label: "Budget Review", type: "review" }, { label: "Vendor Sync", type: "task" }] },
    { day: 23, inMonth: true, events: [{ label: "Sprint Review", type: "task" }, { label: "Retrospective", type: "task" }, { label: "Team Feedback", type: "task" }] },
    { day: 24, inMonth: true, events: [] },
  ],
  [
    { day: 25, inMonth: true, events: [] },
    { day: 26, inMonth: true, events: [{ label: "Report Generation", type: "task" }, { label: "Analytics Review", type: "review" }, { label: "KPI Dashboard", type: "task" }] },
    { day: 27, inMonth: true, events: [{ label: "Feature Planning", type: "meeting" }, { label: "Resource Planning", type: "task" }, { label: "Capacity Review", type: "task" }] },
    { day: 28, inMonth: true, events: [{ label: "Team Standup", type: "meeting" }, { label: "Risk Assessment", type: "deadline" }, { label: "Mitigation Plan", type: "task" }] },
    { day: 29, inMonth: true, events: [{ label: "Design Update", type: "task" }, { label: "Development", type: "task" }, { label: "Peer Review", type: "task" }] },
    { day: 30, inMonth: true, events: [{ label: "QA Cycle", type: "task" }, { label: "Milestone Review", type: "milestone" }, { label: "Signoff", type: "task" }] },
    { day: 31, inMonth: true, events: [] },
  ],
  [
    { day: 1, inMonth: false, events: [{ label: "Team Standup", type: "meeting" }, { label: "Planning", type: "task" }, { label: "Backlog Groom", type: "task" }] },
    { day: 2, inMonth: false, events: [{ label: "Development", type: "task" }, { label: "Code Review", type: "task" }, { label: "Merge Window", type: "task" }] },
    { day: 3, inMonth: false, events: [{ label: "Testing", type: "task" }, { label: "Bug Fixes", type: "task" }] },
    { day: 4, inMonth: false, events: [{ label: "Deployment", type: "task" }] },
    { day: 5, inMonth: false, events: [{ label: "Review Meeting", type: "review" }] },
    { day: 6, inMonth: false, events: [] },
    { day: 7, inMonth: false, events: [] },
  ],
]

const miniWeeks: { day: number; inMonth: boolean }[][] = [
  [{ day: 27, inMonth: false }, { day: 28, inMonth: false }, { day: 29, inMonth: false }, { day: 30, inMonth: false }, { day: 1, inMonth: true }, { day: 2, inMonth: true }, { day: 3, inMonth: true }],
  [{ day: 4, inMonth: true }, { day: 5, inMonth: true }, { day: 6, inMonth: true }, { day: 7, inMonth: true }, { day: 8, inMonth: true }, { day: 9, inMonth: true }, { day: 10, inMonth: true }],
  [{ day: 11, inMonth: true }, { day: 12, inMonth: true }, { day: 13, inMonth: true }, { day: 14, inMonth: true }, { day: 15, inMonth: true }, { day: 16, inMonth: true }, { day: 17, inMonth: true }],
  [{ day: 18, inMonth: true }, { day: 19, inMonth: true }, { day: 20, inMonth: true }, { day: 21, inMonth: true }, { day: 22, inMonth: true }, { day: 23, inMonth: true }, { day: 24, inMonth: true }],
  [{ day: 25, inMonth: true }, { day: 26, inMonth: true }, { day: 27, inMonth: true }, { day: 28, inMonth: true }, { day: 29, inMonth: true }, { day: 30, inMonth: true }, { day: 31, inMonth: true }],
]
const miniHighlight = new Set([5, 12, 14, 21])

const upcoming = [
  { date: "15 MAY", label: "Milestone: Beta Release", sub: "Inventory System", time: "10:00 AM" },
  { date: "19 MAY", label: "Go-Live", sub: "Inventory System", time: "09:30 AM" },
  { date: "22 MAY", label: "Budget Review", sub: "Website Redesign", time: "02:00 PM" },
  { date: "26 MAY", label: "Report Generation", sub: "Inventory System", time: "11:00 AM" },
]

const legend: { label: string; type: EventType }[] = [
  { label: "Task", type: "task" },
  { label: "Milestone", type: "milestone" },
  { label: "Meeting", type: "meeting" },
  { label: "Deadline", type: "deadline" },
  { label: "Review", type: "review" },
  { label: "Other", type: "other" },
]

const quickActions = ["New Event", "Team Calendar", "Project Calendar", "Sync with Google Calendar", "Calendar Settings"]

export function Calendar() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Projects", href: "/projects" }, { label: "Calendar" }]}
        title={<span className="flex items-center gap-2">Calendar <Info className="text-muted-foreground size-4" /></span>}
        description="View all your project tasks, milestones and events in one place."
        actions={
          <NewEventDialog>
            <DialogTrigger asChild>
              <Button>+ New Event</Button>
            </DialogTrigger>
          </NewEventDialog>
        }
      />

      <Card className="mb-5">
        <CardContent className="flex flex-wrap items-center gap-2 pt-5">
          <Button variant="ghost" size="icon"><ChevronLeft className="size-4" /></Button>
          <Button variant="ghost" size="icon"><ChevronRight className="size-4" /></Button>
          <Button variant="outline">Today</Button>
          <span className="ml-1 text-lg font-semibold text-foreground">May 2025 ⌄</span>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div className="bg-muted flex rounded-lg p-1">
              <Button size="sm" className="h-7">Month</Button>
              <Button size="sm" variant="ghost" className="h-7">Week</Button>
              <Button size="sm" variant="ghost" className="h-7">Day</Button>
            </div>
            <Button variant="outline" size="icon"><SlidersHorizontal className="size-4" /></Button>
            <Button variant="outline"><Filter className="size-4" /> Filters</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <Card className="xl:col-span-3">
          <CardContent className="pt-5">
            <div className="grid grid-cols-7 overflow-hidden rounded-lg border">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d} className="text-muted-foreground border-b bg-muted/40 px-2 py-2 text-center text-xs font-medium">
                  {d}
                </div>
              ))}
              {weeks.flat().map((c, i) => {
                const isToday = c.inMonth && c.day === 14
                return (
                  <div key={i} className={cn("min-h-[92px] border-r border-b p-1.5 last:border-r-0", !c.inMonth && "bg-muted/20")}>
                    <span
                      className={cn(
                        "mb-1 inline-flex size-6 items-center justify-center rounded-full text-xs",
                        isToday ? "bg-success text-success-foreground font-semibold" : c.inMonth ? "text-foreground" : "text-muted-foreground/50"
                      )}
                    >
                      {c.day}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      {c.events.slice(0, 2).map((e, j) => (
                        <span key={j} className={cn("truncate rounded px-1 py-0.5 text-[10px] leading-tight font-medium", typeChip[e.type])}>
                          <span className={cn("mr-1 inline-block size-1.5 rounded-full", typeDot[e.type])} />
                          {e.label}
                        </span>
                      ))}
                      {c.events.length > 2 && (
                        <span className="text-muted-foreground px-1 text-[10px]">+{c.events.length - 2} more</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Mini Calendar</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">May 2025</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon-sm"><ChevronLeft className="size-3.5" /></Button>
                  <Button variant="ghost" size="icon-sm"><ChevronRight className="size-3.5" /></Button>
                </div>
              </div>
              <div className="text-muted-foreground grid grid-cols-7 gap-y-1 text-center text-[11px]">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                  <span key={d} className="pb-1 font-medium">{d}</span>
                ))}
                {miniWeeks.flat().map(({ day: d, inMonth }, i) => (
                  <span key={i} className="relative flex flex-col items-center py-0.5">
                    <span className={cn("flex size-6 items-center justify-center rounded-full", d === 14 && inMonth ? "bg-success text-success-foreground font-semibold" : inMonth ? "text-foreground" : "text-muted-foreground/40")}>
                      {d}
                    </span>
                    {inMonth && miniHighlight.has(d) && <span className="bg-primary absolute bottom-0 size-1 rounded-full" />}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Upcoming Events</CardTitle>
              <a href="/projects/calendar" className="text-primary text-sm font-medium">View all</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {upcoming.map((u) => (
                <div key={u.label} className="flex gap-3">
                  <div className="bg-success-bg text-success-foreground flex size-11 shrink-0 flex-col items-center justify-center rounded-lg text-xs leading-none font-bold">
                    <span className="text-sm">{u.date.split(" ")[0]}</span>
                    <span>{u.date.split(" ")[1]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{u.label}</p>
                    <p className="text-muted-foreground text-xs">{u.sub}</p>
                  </div>
                  <span className="text-muted-foreground text-xs whitespace-nowrap">{u.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Calendar Legend</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-x-4 gap-y-2 pb-5">
              {legend.map((l) => (
                <span key={l.label} className="flex items-center gap-1.5 text-sm">
                  <span className={cn("size-2.5 rounded-full", typeDot[l.type])} />
                  <span className="text-foreground">{l.label}</span>
                </span>
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
