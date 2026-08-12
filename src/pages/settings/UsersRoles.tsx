import { Users, UserCheck, Clock, ShieldCheck, Search, ChevronDown, MoreVertical } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { SettingsTabs } from "@/components/shared/SettingsTabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { maskEmail } from "@/lib/format"

const stats = [
  { icon: Users, label: "Total Users", value: "18", color: "blue" as const },
  { icon: UserCheck, label: "Active Users", value: "16", color: "green" as const },
  { icon: Clock, label: "Pending Invites", value: "2", color: "orange" as const },
  { icon: ShieldCheck, label: "Roles Defined", value: "5", color: "purple" as const },
]

const roleColors: Record<string, "purple" | "info" | "success" | "warning"> = {
  Owner: "purple",
  Admin: "info",
  Accountant: "success",
  "Sales Executive": "warning",
  Viewer: "info",
}

const users = [
  { name: "Deepak Kumar", email: "deepak@codespanda.com", role: "Owner", status: "Active", lastActive: "Just now" },
  { name: "Priya Sharma", email: "priya@codespanda.com", role: "Admin", status: "Active", lastActive: "2 hours ago" },
  { name: "Rahul Mehta", email: "rahul@codespanda.com", role: "Accountant", status: "Active", lastActive: "1 day ago" },
  { name: "Neha Kapoor", email: "neha@codespanda.com", role: "Sales Executive", status: "Active", lastActive: "3 days ago" },
  { name: "Amit Verma", email: "amit@codespanda.com", role: "Accountant", status: "Inactive", lastActive: "2 weeks ago" },
  { name: "Sunil Reddy", email: "sunil@codespanda.com", role: "Viewer", status: "Pending", lastActive: "Invited 3 days ago" },
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export function UsersRoles() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Users & Roles" }]}
        title="Users & Roles"
        description="Manage users, roles, permissions and access levels."
        actions={<Button>+ Invite User</Button>}
      />

      <div className="mb-5"><SettingsTabs active="users" /></div>

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} color={s.color} />
        ))}
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input placeholder="Search users..." className="pl-9" />
            </div>
            <Button variant="outline" className="sm:ml-auto">All Roles <ChevronDown className="size-3.5" /></Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b text-left text-xs">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Email</th>
                  <th className="pb-2 font-medium">Role</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Last Active</th>
                  <th className="pb-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-b last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-8"><AvatarFallback className="bg-info-bg text-info-foreground text-xs">{initials(u.name)}</AvatarFallback></Avatar>
                        <span className="font-medium whitespace-nowrap text-foreground">{u.name}</span>
                      </div>
                    </td>
                    <td className="text-muted-foreground py-3 whitespace-nowrap">{maskEmail(u.email)}</td>
                    <td className="py-3"><Badge variant={roleColors[u.role]}>{u.role}</Badge></td>
                    <td className="py-3">
                      <Badge variant={u.status === "Active" ? "success" : u.status === "Pending" ? "warning" : "secondary"}>{u.status}</Badge>
                    </td>
                    <td className="text-muted-foreground py-3 whitespace-nowrap">{u.lastActive}</td>
                    <td className="py-3"><Button variant="outline" size="icon-sm"><MoreVertical className="size-4" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
