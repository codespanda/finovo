import { Network, CheckCircle2, Power, Lock, RefreshCw, TrendingUp, Search, ChevronDown, Filter, Calendar, Download, Plus, Pencil, MoreVertical, Play, Building2, Globe, Bell, Monitor, Settings2, Info, ExternalLink, PlugZap, Zap, KeyRound, History } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewIntegrationDialog } from "@/components/shared/TaxDialogs"
import { MASKED } from "@/lib/format"

const stats = [
  { icon: Network, label: "Total Integrations", value: "12", sub: "All Connections", link: "View all", color: "green" as const },
  { icon: CheckCircle2, label: "Active Integrations", value: "8", sub: "66.67% of total", link: "View active", color: "blue" as const },
  { icon: Power, label: "Inactive Integrations", value: "2", sub: "16.67% of total", link: "View inactive", color: "red" as const },
  { icon: Lock, label: "Authentication Expired", value: "1", sub: "8.33% of total", link: "View expired", color: "orange" as const },
  { icon: RefreshCw, label: "Last Sync (All)", value: "15 May 2025", sub: "10:30 AM", link: "View sync history", color: "purple" as const },
  { icon: TrendingUp, label: "Success Rate", value: "98.72%", sub: "This Financial Year", link: "View details", color: "green" as const },
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
  "Auth Expired": { pill: "bg-warning-bg text-warning-foreground", dot: "bg-warning-foreground" },
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

const typeColors: Record<string, "info" | "purple" | "success"> = {
  "API Integration": "info",
  "Web Login": "purple",
  "Desktop Utility": "success",
}

const iconColors = [
  { icon: Building2, bg: "bg-success-bg text-success-foreground" },
  { icon: Globe, bg: "bg-purple-bg text-purple-foreground" },
  { icon: Bell, bg: "bg-warning-bg text-warning-foreground" },
  { icon: Monitor, bg: "bg-info-bg text-info-foreground" },
  { icon: KeyRound, bg: "bg-danger-bg text-danger-foreground" },
  { icon: Settings2, bg: "bg-warning-bg text-warning-foreground" },
]

const integrations = [
  { name: "Demo Company TRACES Integration", sub: "Primary Integration", type: "API Integration", status: "Active", lastSync: "15 May 2025", lastAt: "10:30 AM", nextSync: "15 May 2025", nextAt: "02:30 PM", rate: 99.45 },
  { name: "Rahul Mehta Integration", sub: "Primary Integration", type: "Web Login", status: "Active", lastSync: "15 May 2025", lastAt: "09:15 AM", nextSync: "15 May 2025", nextAt: "03:15 PM", rate: 97.80 },
  { name: "Neha Kapoor Integration", sub: "Backup Integration", type: "API Integration", status: "Inactive", lastSync: "10 May 2025", lastAt: "11:20 AM", nextSync: null, nextAt: null, rate: 0 },
  { name: "Tech Solutions TRACES", sub: "Test Integration", type: "Desktop Utility", status: "Active", lastSync: "15 May 2025", lastAt: "08:45 AM", nextSync: "15 May 2025", nextAt: "12:45 PM", rate: 99.12 },
  { name: "Amit Sharma Integration", sub: "Primary Integration", type: "Web Login", status: "Auth Expired", lastSync: "14 May 2025", lastAt: "05:30 PM", nextSync: null, nextAt: null, rate: null },
  { name: "Global Enterprises TRACES", sub: "Primary Integration", type: "API Integration", status: "Active", lastSync: "15 May 2025", lastAt: "07:20 AM", nextSync: "15 May 2025", nextAt: "01:20 PM", rate: 98.96 },
  { name: "Creative Minds TRACES", sub: "Secondary Integration", type: "Web Login", status: "Inactive", lastSync: "05 May 2025", lastAt: "04:10 PM", nextSync: null, nextAt: null, rate: 0 },
  { name: "Innovative Tech Integration", sub: "Primary Integration", type: "Desktop Utility", status: "Active", lastSync: "15 May 2025", lastAt: "06:05 AM", nextSync: "15 May 2025", nextAt: "11:05 AM", rate: 99.67 },
  { name: "NextGen Softwares TRACES", sub: "Backup Integration", type: "API Integration", status: "Inactive", lastSync: "03 May 2025", lastAt: "10:00 AM", nextSync: null, nextAt: null, rate: 0 },
  { name: "Deepak Singh Integration", sub: "Primary Integration", type: "Web Login", status: "Auth Expired", lastSync: "12 May 2025", lastAt: "03:25 PM", nextSync: null, nextAt: null, rate: null },
]

const summary = [
  { name: "Active", value: 8, pct: 66.67, color: "var(--color-chart-2)" },
  { name: "Inactive", value: 2, pct: 16.67, color: "var(--color-chart-5)" },
  { name: "Auth Expired", value: 1, pct: 8.33, color: "var(--color-chart-3)" },
  { name: "Not Configured", value: 1, pct: 8.33, color: "var(--color-muted-foreground)" },
]

const quickActions = [
  { icon: PlugZap, label: "New TRACES Integration", sub: "Setup a new integration" },
  { icon: Zap, label: "Test Connection", sub: "Verify TRACES connectivity" },
  { icon: RefreshCw, label: "Sync Now", sub: "Trigger manual data sync" },
  { icon: KeyRound, label: "Manage Credentials", sub: "Update TRACES login details" },
  { icon: History, label: "View Sync History", sub: "Track integration sync logs" },
]

export function TracesIntegration() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "TRACES Integration" }]}
        title="TRACES Integrations"
        description="Manage and monitor TRACES integrations for seamless TDS operations."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Download Activity Log</Button>
            <NewIntegrationDialog>
              <DialogTrigger asChild>
                <Button><Plus className="size-4" /> New Integration</Button>
              </DialogTrigger>
            </NewIntegrationDialog>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <div className="flex flex-col gap-5 xl:col-span-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
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
                <a href="/tax/tds/traces" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <div className="relative max-w-xs flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search by integration name, TAN, PAN..." className="pl-9" />
                </div>
                <Button variant="outline">All Types <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All TANs <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline" className="sm:ml-auto">FY 2025-26 <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Integration Name</th>
                      <th className="pb-2 font-medium">TAN</th>
                      <th className="pb-2 font-medium">Integration Type</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Last Sync</th>
                      <th className="pb-2 font-medium">Next Sync</th>
                      <th className="pb-2 font-medium">Success Rate</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {integrations.map((it, i) => {
                      const IconInfo = iconColors[i % iconColors.length]
                      return (
                        <tr key={it.name} className="border-b last:border-0">
                          <td className="py-3">
                            <div className="flex items-center gap-2.5">
                              <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${IconInfo.bg}`}>
                                <IconInfo.icon className="size-4" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium whitespace-nowrap text-foreground">{it.name}</p>
                                <p className="text-muted-foreground text-xs whitespace-nowrap">{it.sub}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{MASKED}</td>
                          <td className="py-3"><Badge variant={typeColors[it.type]}>{it.type}</Badge></td>
                          <td className="py-3"><StatusPill status={it.status} /></td>
                          <td className="py-3 whitespace-nowrap">
                            <p className="text-foreground">{it.lastSync}</p>
                            <p className="text-muted-foreground text-xs">{it.lastAt}</p>
                          </td>
                          <td className="py-3 whitespace-nowrap">
                            {it.nextSync ? (<><p className="text-foreground">{it.nextSync}</p><p className="text-muted-foreground text-xs">{it.nextAt}</p></>) : <span className="text-muted-foreground">–</span>}
                          </td>
                          <td className="py-3">
                            {it.rate !== null ? (
                              <div className="flex flex-col gap-1">
                                <span className="text-foreground text-xs font-medium">{it.rate.toFixed(2)}%</span>
                                <div className="bg-muted h-1.5 w-24 overflow-hidden rounded-full">
                                  <div className="bg-success h-full rounded-full" style={{ width: `${it.rate}%` }} />
                                </div>
                              </div>
                            ) : <span className="text-muted-foreground">–</span>}
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-1.5">
                              <Button size="icon-sm" variant="outline">
                                {it.status === "Active" ? <RefreshCw className="size-4" /> : <Play className="size-4" />}
                              </Button>
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
                <span>Showing 1 to 10 of 12 integrations</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2].map((p) => (
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
            <CardHeader><CardTitle>Integration Summary <span className="text-muted-foreground text-xs font-normal">(FY 2025-26)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={summary} total="12" totalLabel="Total" size={140} />
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
                Learn more about TRACES integration setup and best practices.
              </p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">
                View Integration Guide <ExternalLink className="size-3.5" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
