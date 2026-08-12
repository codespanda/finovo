import { Search, ChevronDown, Filter, Calendar, Download } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { SettingsTabs } from "@/components/shared/SettingsTabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const actionColors: Record<string, "success" | "info" | "warning" | "danger"> = {
  Created: "success",
  Updated: "info",
  Deleted: "danger",
  "Logged In": "success",
  "Role Changed": "warning",
}

const logs = [
  { time: "30 May 2025, 04:12 PM", user: "John Doe", action: "Updated", module: "Invoices", details: "Updated INV-25-26-1024", ip: "103.25.14.201" },
  { time: "30 May 2025, 03:40 PM", user: "Priya Sharma", action: "Created", module: "Bills", details: "Created BILL/25-26/1056", ip: "103.25.14.188" },
  { time: "30 May 2025, 02:15 PM", user: "Rahul Mehta", action: "Logged In", module: "Auth", details: "Successful login", ip: "49.207.10.5" },
  { time: "29 May 2025, 06:50 PM", user: "John Doe", action: "Role Changed", module: "Users & Roles", details: "Neha Kapoor role changed to Sales Executive", ip: "103.25.14.201" },
  { time: "29 May 2025, 05:20 PM", user: "Amit Verma", action: "Deleted", module: "Expenses", details: "Deleted expense claim EXP-341", ip: "117.99.32.44" },
  { time: "29 May 2025, 11:30 AM", user: "Priya Sharma", action: "Updated", module: "Company Profile", details: "Updated business address", ip: "103.25.14.188" },
  { time: "28 May 2025, 09:05 AM", user: "Rahul Mehta", action: "Created", module: "Purchase Orders", details: "Created PO-458", ip: "49.207.10.5" },
]

export function AuditLog() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Audit Log" }]}
        title="Audit Log"
        description="View all system activities, changes and user actions."
        actions={<Button variant="outline"><Download className="size-4" /> Export</Button>}
      />

      <div className="mb-5"><SettingsTabs active="audit" /></div>

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input placeholder="Search audit log..." className="pl-9" />
            </div>
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <Button variant="outline">All Modules <ChevronDown className="size-3.5" /></Button>
              <Button variant="outline">All Users <ChevronDown className="size-3.5" /></Button>
              <Button variant="outline"><Filter className="size-4" /> Filter</Button>
              <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b text-left text-xs">
                  <th className="pb-2 font-medium">Timestamp</th>
                  <th className="pb-2 font-medium">User</th>
                  <th className="pb-2 font-medium">Action</th>
                  <th className="pb-2 font-medium">Module</th>
                  <th className="pb-2 font-medium">Details</th>
                  <th className="pb-2 font-medium">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="text-muted-foreground py-3 whitespace-nowrap">{l.time}</td>
                    <td className="py-3 whitespace-nowrap text-foreground">{l.user}</td>
                    <td className="py-3"><Badge variant={actionColors[l.action]}>{l.action}</Badge></td>
                    <td className="text-muted-foreground py-3 whitespace-nowrap">{l.module}</td>
                    <td className="text-muted-foreground py-3">{l.details}</td>
                    <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{l.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span>Showing 1 to 7 of 486 entries</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((p) => (
                <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
