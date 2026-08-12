import { Users2, UsersRound, Users, Building2, Briefcase, User, Landmark, Star, Headphones, Search, ChevronDown, Filter, Calendar, Upload, Plus, Pencil, MoreVertical, Info, ExternalLink, FolderPlus, Download, UserSearch, ShieldCheck } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewGroupDialog } from "@/components/shared/EntityDialogs"

const stats = [
  { icon: Users2, label: "Total Groups", value: "18", sub: "All Groups", link: "View all groups", color: "green" as const },
  { icon: UsersRound, label: "Active Groups", value: "15", sub: "83.33% of total", link: "View active groups", color: "blue" as const },
  { icon: Users, label: "Inactive Groups", value: "3", sub: "16.67% of total", link: "View inactive groups", color: "orange" as const },
  { icon: Users, label: "Total Contacts in Groups", value: "248", sub: "Across all groups", link: "View contacts", color: "purple" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const statusStyle: Record<string, { pill: string; dot: string }> = {
  Active: { pill: "bg-success-bg text-success-foreground", dot: "bg-success-foreground" },
  Inactive: { pill: "bg-danger-bg text-danger-foreground", dot: "bg-danger-foreground" },
}

function StatusPill({ status }: { status: string }) {
  const s = statusStyle[status]
  return (
    <span className={`inline-flex w-fit items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${s.pill}`}>
      <span className={`size-1.5 shrink-0 rounded-full ${s.dot}`} />
      {status}
    </span>
  )
}

const typeColors: Record<string, "info" | "warning"> = {
  System: "info",
  Custom: "warning",
}

const iconStyle = [
  { icon: Users2, bg: "bg-success-bg text-success-foreground" },
  { icon: Building2, bg: "bg-info-bg text-info-foreground" },
  { icon: Briefcase, bg: "bg-warning-bg text-warning-foreground" },
  { icon: User, bg: "bg-purple-bg text-purple-foreground" },
  { icon: Landmark, bg: "bg-success-bg text-success-foreground" },
  { icon: UsersRound, bg: "bg-warning-bg text-warning-foreground" },
  { icon: Star, bg: "bg-danger-bg text-danger-foreground" },
  { icon: Headphones, bg: "bg-purple-bg text-purple-foreground" },
]

const groups = [
  { name: "All Clients", default: true, desc: "All client contacts", type: "System", contacts: 108, status: "Active", by: "Deepak Singh", on: "18 May 2025" },
  { name: "Vendors", desc: "All vendor contacts", type: "System", contacts: 86, status: "Active", by: "Deepak Singh", on: "18 May 2025" },
  { name: "Deductors", desc: "TDS deductors", type: "Custom", contacts: 32, status: "Active", by: "Deepak Singh", on: "16 May 2025" },
  { name: "Deductees", desc: "TDS deductees", type: "Custom", contacts: 45, status: "Active", by: "Deepak Singh", on: "16 May 2025" },
  { name: "Banks", desc: "All bank contacts", type: "Custom", contacts: 12, status: "Active", by: "Rahul Mehta", on: "12 May 2025" },
  { name: "Internal Team", desc: "Company internal contacts", type: "Custom", contacts: 15, status: "Active", by: "Deepak Singh", on: "10 May 2025" },
  { name: "Important Clients", desc: "High priority clients", type: "Custom", contacts: 18, status: "Inactive", by: "Rahul Mehta", on: "08 May 2025" },
  { name: "Service Providers", desc: "Third party service providers", type: "Custom", contacts: 9, status: "Inactive", by: "Deepak Singh", on: "05 May 2025" },
]

const summary = [
  { name: "System Groups", value: 3, pct: 16.67, color: "var(--color-chart-2)" },
  { name: "Custom Groups", value: 12, pct: 66.67, color: "var(--color-chart-1)" },
  { name: "Inactive Groups", value: 3, pct: 16.67, color: "var(--color-chart-3)" },
]

const quickActions = [
  { icon: FolderPlus, label: "New Group", sub: "Create a new group" },
  { icon: Download, label: "Import Groups", sub: "Import groups from CSV/Excel" },
  { icon: UserSearch, label: "View All Contacts", sub: "View all contacts" },
  { icon: ShieldCheck, label: "Group Permissions", sub: "Manage group access" },
]

export function Groups() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Contacts", href: "/contacts" }, { label: "Groups" }]}
        title="Groups"
        description="Organize contacts into groups for better management and communication."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import Groups</Button>
            <NewGroupDialog>
              <DialogTrigger asChild>
                <Button><Plus className="size-4" /> New Group</Button>
              </DialogTrigger>
            </NewGroupDialog>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <div className="flex flex-col gap-5 xl:col-span-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
                <a href="/contacts/groups" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search by group name, description..." className="pl-9" />
                </div>
                <div className="flex flex-wrap gap-2 sm:ml-auto">
                  <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Types <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Users <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                  <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Group Name</th>
                      <th className="pb-2 font-medium">Description</th>
                      <th className="pb-2 font-medium">Group Type</th>
                      <th className="pb-2 font-medium">Contacts</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Created By</th>
                      <th className="pb-2 font-medium">Created On</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((g, i) => {
                      const IconInfo = iconStyle[i % iconStyle.length]
                      return (
                        <tr key={g.name} className="border-b last:border-0">
                          <td className="py-3">
                            <div className="flex items-center gap-2.5">
                              <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${IconInfo.bg}`}>
                                <IconInfo.icon className="size-4" />
                              </div>
                              <span className="flex items-center gap-2 font-medium whitespace-nowrap text-foreground">
                                {g.name}
                                {g.default && <Badge variant="secondary">Default</Badge>}
                              </span>
                            </div>
                          </td>
                          <td className="text-muted-foreground py-3 whitespace-nowrap">{g.desc}</td>
                          <td className="py-3"><Badge variant={typeColors[g.type]}>{g.type}</Badge></td>
                          <td className="text-foreground py-3">{g.contacts}</td>
                          <td className="py-3"><StatusPill status={g.status} /></td>
                          <td className="text-muted-foreground py-3 whitespace-nowrap">{g.by}</td>
                          <td className="text-muted-foreground py-3 whitespace-nowrap">{g.on}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-1.5">
                              <Button size="icon-sm" variant="outline"><Pencil className="size-4" /></Button>
                              <Button size="icon-sm" variant="ghost"><MoreVertical className="size-4" /></Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 8 of 18 groups</span>
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
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Groups Summary</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={summary} total="18" totalLabel="Total" size={140} />
              <ul className="w-full text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 py-0.5">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground flex-1 truncate text-xs">{s.name}</span>
                    <span className="text-xs font-medium whitespace-nowrap text-foreground">{s.value} ({s.pct.toFixed(2)}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-1 pb-3">
              {quickActions.map((a) => (
                <button key={a.label} className="hover:bg-muted -mx-1 flex items-start gap-3 rounded-lg px-1 py-2 text-left transition-colors">
                  <a.icon className="text-primary mt-0.5 size-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{a.label}</p>
                    <p className="text-muted-foreground text-xs">{a.sub}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="mb-1.5 flex items-center gap-2">
                <Info className="text-primary size-4" />
                <span className="text-sm font-semibold text-foreground">Need Help?</span>
              </div>
              <p className="text-muted-foreground mb-2 text-xs">
                Learn how to create and manage contact groups.
              </p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">
                View User Guide <ExternalLink className="size-3.5" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
