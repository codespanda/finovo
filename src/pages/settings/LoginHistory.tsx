import { Search, ChevronDown, Filter, Laptop, Smartphone, Monitor } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const logins = [
  { icon: Laptop, user: "John Doe", device: "Chrome on macOS", ip: "103.25.14.201", location: "Bengaluru, India", time: "30 May 2025, 10:12 AM", status: "Success" },
  { icon: Smartphone, user: "Priya Sharma", device: "Safari on iOS", ip: "103.25.14.188", location: "Bengaluru, India", time: "30 May 2025, 09:45 AM", status: "Success" },
  { icon: Monitor, user: "Rahul Mehta", device: "Edge on Windows", ip: "49.207.10.5", location: "Mumbai, India", time: "29 May 2025, 06:30 PM", status: "Success" },
  { icon: Laptop, user: "Amit Verma", device: "Chrome on Windows", ip: "117.99.32.44", location: "Pune, India", time: "29 May 2025, 03:15 PM", status: "Failed" },
  { icon: Smartphone, user: "Neha Kapoor", device: "Chrome on Android", ip: "182.74.55.12", location: "Delhi, India", time: "28 May 2025, 11:05 AM", status: "Success" },
  { icon: Monitor, user: "Sunil Reddy", device: "Firefox on Windows", ip: "203.94.12.88", location: "Hyderabad, India", time: "27 May 2025, 08:50 PM", status: "Failed" },
]

export function LoginHistory() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Login History" }]}
        title="Login History"
        description="View login history and user access sessions."
      />

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input placeholder="Search by user or IP..." className="pl-9" />
            </div>
            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <Button variant="outline">All Users <ChevronDown className="size-3.5" /></Button>
              <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
              <Button variant="outline"><Filter className="size-4" /> Filter</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b text-left text-xs">
                  <th className="pb-2 font-medium">User</th>
                  <th className="pb-2 font-medium">Device / Browser</th>
                  <th className="pb-2 font-medium">IP Address</th>
                  <th className="pb-2 font-medium">Location</th>
                  <th className="pb-2 font-medium">Date &amp; Time</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {logins.map((l, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-3 whitespace-nowrap text-foreground">{l.user}</td>
                    <td className="py-3">
                      <div className="text-muted-foreground flex items-center gap-2 whitespace-nowrap">
                        <l.icon className="size-4" /> {l.device}
                      </div>
                    </td>
                    <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{l.ip}</td>
                    <td className="text-muted-foreground py-3 whitespace-nowrap">{l.location}</td>
                    <td className="text-muted-foreground py-3 whitespace-nowrap">{l.time}</td>
                    <td className="py-3"><Badge variant={l.status === "Success" ? "success" : "danger"}>{l.status}</Badge></td>
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
