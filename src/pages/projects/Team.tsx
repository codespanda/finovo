import { Info, Users, Briefcase, UserCog, Gauge, CalendarOff, Search, ChevronDown, List, LayoutGrid } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { AddTeamMemberDialog } from "@/components/shared/ProjectDialogs"
import { maskEmail } from "@/lib/format"

const stats = [
  { icon: Users, label: "Total Members", value: "24", sub: "Across all projects", color: "green" as const },
  { icon: Briefcase, label: "Active Members", value: "20", sub: "83.33% of total", color: "blue" as const },
  { icon: UserCog, label: "Roles", value: "6", sub: "Project roles", color: "purple" as const },
  { icon: Gauge, label: "Avg. Utilization", value: "68%", sub: "This month", color: "orange" as const },
  { icon: CalendarOff, label: "On Leave", value: "2", sub: "This week", color: "green" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
}

const roleColors: Record<string, "info" | "purple" | "success" | "warning" | "danger" | "secondary"> = {
  "Project Manager": "info",
  "UI/UX Designer": "purple",
  "Backend Developer": "success",
  "QA Engineer": "warning",
  "Frontend Developer": "danger",
  "Business Analyst": "secondary",
  "DevOps Engineer": "info",
  "Project Coordinator": "purple",
  "Support Engineer": "secondary",
}

const members = [
  { name: "Rohit Sharma", email: "rohit.sharma@acme.com", role: "Project Manager", projects: "Inventory System, Website Redesign +1 more", task: 82, util: 90, status: "Active" },
  { name: "Priya Nair", email: "priya.nair@acme.com", role: "UI/UX Designer", projects: "Website Redesign, Mobile App", task: 76, util: 75, status: "Active" },
  { name: "Amit Verma", email: "amit.verma@acme.com", role: "Backend Developer", projects: "Inventory System, Mobile App", task: 68, util: 65, status: "Active" },
  { name: "Sneha Iyer", email: "sneha.iyer@acme.com", role: "QA Engineer", projects: "Mobile App, Website Redesign", task: 93, util: 85, status: "Active" },
  { name: "Karan Mehta", email: "karan.mehta@acme.com", role: "Frontend Developer", projects: "Website Redesign", task: 71, util: 70, status: "Active" },
  { name: "Neha Joshi", email: "neha.joshi@acme.com", role: "Business Analyst", projects: "Inventory System +1 more", task: 64, util: 60, status: "Active" },
  { name: "Vikram Singh", email: "vikram.singh@acme.com", role: "DevOps Engineer", projects: "Inventory System", task: 88, util: 80, status: "Active" },
  { name: "Deepika Patel", email: "deepika.patel@acme.com", role: "Project Coordinator", projects: "Website Redesign, Mobile App", task: 55, util: 50, status: "On Leave", till: "Till 25 May 2025" },
  { name: "Arjun Gupta", email: "arjun.gupta@acme.com", role: "UI/UX Designer", projects: "Mobile App", task: 0, util: 0, status: "On Leave", till: "Till 28 May 2025" },
  { name: "Rahul Das", email: "rahul.das@acme.com", role: "Support Engineer", projects: "–", task: 0, util: 0, status: "Inactive" },
]

const summary = [
  { name: "Project Manager", value: 4, color: "var(--color-chart-2)" },
  { name: "Developer", value: 8, color: "var(--color-chart-1)" },
  { name: "Designer", value: 4, color: "var(--color-chart-4)" },
  { name: "QA Engineer", value: 3, color: "var(--color-chart-3)" },
  { name: "Others", value: 5, color: "var(--color-muted-foreground)" },
]

const workload = [
  { name: "Rohit Sharma", pct: 90 },
  { name: "Priya Nair", pct: 75 },
  { name: "Amit Verma", pct: 65 },
  { name: "Sneha Iyer", pct: 85 },
  { name: "Karan Mehta", pct: 70 },
]

const leaves = [
  { date: "25 MAY", name: "Deepika Patel", role: "Project Coordinator", days: "2 days" },
  { date: "28 MAY", name: "Arjun Gupta", role: "UI/UX Designer", days: "5 days" },
]

const quickActions = ["Add Team Member", "Team Roles & Permissions", "Manage Leave", "Workload Report", "Team Directory"]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export function Team() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Projects", href: "/projects" }, { label: "Team" }]}
        title={<span className="flex items-center gap-2">Team <Info className="text-muted-foreground size-4" /></span>}
        description="Manage your project team members, roles and workload."
        actions={
          <>
            <Button variant="outline">Filters</Button>
            <AddTeamMemberDialog>
              <DialogTrigger asChild>
                <Button>+ Add Member</Button>
              </DialogTrigger>
            </AddTeamMemberDialog>
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
                <Input placeholder="Search by name, role or email..." className="pl-9" />
              </div>
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <Button variant="outline">All Roles <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Projects <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline" size="icon"><List className="size-4" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Member</th>
                    <th className="pb-2 font-medium">Role</th>
                    <th className="pb-2 font-medium">Projects</th>
                    <th className="pb-2 font-medium">Task Completion</th>
                    <th className="pb-2 font-medium">Utilization</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr key={m.email} className="border-b last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-8"><AvatarFallback className="bg-purple-bg text-purple-foreground">{initials(m.name)}</AvatarFallback></Avatar>
                          <div>
                            <p className="font-medium whitespace-nowrap text-foreground">{m.name}</p>
                            <p className="text-muted-foreground text-xs">{maskEmail(m.email)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3"><Badge variant={roleColors[m.role]}>{m.role}</Badge></td>
                      <td className="text-muted-foreground max-w-[160px] py-3 whitespace-normal">{m.projects}</td>
                      <td className="py-3">
                        <p className="mb-1 text-xs font-medium text-foreground">{m.task}%</p>
                        <div className="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
                          <div className="bg-success h-full rounded-full" style={{ width: `${m.task}%` }} />
                        </div>
                      </td>
                      <td className="py-3">
                        <p className="mb-1 text-xs font-medium text-foreground">{m.util}%</p>
                        <div className="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
                          <div className="bg-primary h-full rounded-full" style={{ width: `${m.util}%` }} />
                        </div>
                      </td>
                      <td className="py-3">
                        <StatusBadge status={m.status} />
                        {m.till && <p className="text-muted-foreground mt-0.5 text-xs whitespace-nowrap">{m.till}</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 10 of 24 members</span>
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
            <CardHeader><CardTitle>Team Summary</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={summary} total="24" totalLabel="Total" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground truncate">{s.name}</span>
                    <span className="ml-auto font-medium whitespace-nowrap text-foreground">{s.value}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Workload Overview</CardTitle>
              <span className="text-muted-foreground text-xs">This Month</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {workload.map((w) => (
                <div key={w.name} className="flex items-center gap-3">
                  <Avatar className="size-7"><AvatarFallback className="bg-purple-bg text-purple-foreground text-[10px]">{initials(w.name)}</AvatarFallback></Avatar>
                  <span className="w-24 shrink-0 truncate text-sm text-foreground">{w.name}</span>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${w.pct}%` }} />
                  </div>
                  <span className="text-muted-foreground w-9 shrink-0 text-right text-xs">{w.pct}%</span>
                </div>
              ))}
              <a href="/projects/team" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View full report →</a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Upcoming Leaves</CardTitle>
              <a href="/projects/team" className="text-primary text-sm font-medium">View all</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {leaves.map((l) => (
                <div key={l.name} className="flex items-center gap-3">
                  <div className="bg-warning-bg text-warning-foreground flex size-11 shrink-0 flex-col items-center justify-center rounded-lg text-xs leading-none font-bold">
                    <span className="text-sm">{l.date.split(" ")[0]}</span>
                    <span>{l.date.split(" ")[1]}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{l.name}</p>
                    <p className="text-muted-foreground text-xs">{l.role}</p>
                  </div>
                  <span className="text-warning-foreground text-xs font-medium whitespace-nowrap">{l.days}</span>
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
