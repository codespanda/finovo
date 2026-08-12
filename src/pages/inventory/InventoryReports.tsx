import { Info, Boxes, FileText, Clock, DownloadCloud, Wallet, Search, ChevronDown, Upload, BarChart3, List, PieChart, Layers3, AlertTriangle, Hourglass, ClipboardList, Repeat2, ShieldCheck } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewReportDialog } from "@/components/shared/EntityDialogs"

const stats = [
  { icon: Boxes, label: "Total Reports", value: "18", sub: "All reports", color: "green" as const },
  { icon: FileText, label: "Generated This Month", value: "12", sub: "20% vs last month", trend: "up", color: "blue" as const },
  { icon: Clock, label: "Scheduled Reports", value: "6", sub: "Auto generated", color: "purple" as const },
  { icon: DownloadCloud, label: "Saved Reports", value: "24", sub: "Custom reports", color: "orange" as const },
  { icon: Wallet, label: "Total Value in Reports", value: "₹2,48,75,600", sub: "Based on selected filters", color: "info" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  info: "bg-info-bg text-info-foreground",
}

const typeColors: Record<string, "info" | "purple"> = { Standard: "info", Advanced: "purple" }
const formatColors: Record<string, "success" | "danger"> = { Excel: "success", PDF: "danger" }

const reports = [
  { name: "Stock Summary", cat: "Stock Overview", desc: "Overview of current stock across all warehouses", type: "Standard", generated: "31 May 2025 10:30 AM", asOf: "31 May 2025", format: "Excel", icon: BarChart3, bg: "bg-success-bg text-success-foreground" },
  { name: "Stock Valuation", cat: "Valuation", desc: "Total inventory value by cost and selling price", type: "Standard", generated: "31 May 2025 09:15 AM", asOf: "31 May 2025", format: "PDF", icon: List, bg: "bg-purple-bg text-purple-foreground" },
  { name: "Stock Movement", cat: "Movement", desc: "Detailed report of stock in, out and adjustments", type: "Standard", generated: "30 May 2025 06:45 PM", asOf: "30 May 2025", format: "Excel", icon: Repeat2, bg: "bg-warning-bg text-warning-foreground" },
  { name: "Warehouse Stock", cat: "Warehouse", desc: "Stock summary by warehouse", type: "Standard", generated: "30 May 2025 05:20 PM", asOf: "30 May 2025", format: "Excel", icon: Layers3, bg: "bg-info-bg text-info-foreground" },
  { name: "Low Stock Report", cat: "Alerts", desc: "Items that are below reorder level", type: "Standard", generated: "30 May 2025 08:05 AM", asOf: "30 May 2025", format: "Excel", icon: AlertTriangle, bg: "bg-danger-bg text-danger-foreground" },
  { name: "Stock Aging", cat: "Aging", desc: "Stock aging analysis by days in inventory", type: "Advanced", generated: "29 May 2025 04:10 PM", asOf: "29 May 2025", format: "PDF", icon: Hourglass, bg: "bg-warning-bg text-warning-foreground" },
  { name: "Item Wise Summary", cat: "Items", desc: "Summary of stock by item", type: "Standard", generated: "29 May 2025 02:30 PM", asOf: "29 May 2025", format: "Excel", icon: ClipboardList, bg: "bg-purple-bg text-purple-foreground" },
  { name: "Batch / Serial Report", cat: "Traceability", desc: "Batch and serial wise stock details", type: "Advanced", generated: "28 May 2025 11:50 AM", asOf: "28 May 2025", format: "PDF", icon: ShieldCheck, bg: "bg-info-bg text-info-foreground" },
  { name: "Stock Transfers", cat: "Transfers", desc: "Summary of stock transfers between warehouses", type: "Standard", generated: "28 May 2025 10:20 AM", asOf: "28 May 2025", format: "Excel", icon: Repeat2, bg: "bg-success-bg text-success-foreground" },
  { name: "Stock Adjustments", cat: "Adjustments", desc: "Stock adjustments and their impact", type: "Standard", generated: "27 May 2025 07:40 PM", asOf: "27 May 2025", format: "Excel", icon: PieChart, bg: "bg-purple-bg text-purple-foreground" },
]

const summary = [
  { name: "Standard", value: 7, pct: 58.33, color: "var(--color-chart-2)" },
  { name: "Advanced", value: 3, pct: 25.0, color: "var(--color-chart-1)" },
  { name: "Scheduled", value: 2, pct: 16.67, color: "var(--color-chart-3)" },
]

const topCategories = [
  { label: "Stock Overview", count: 4 },
  { label: "Movement", count: 3 },
  { label: "Valuation", count: 2 },
  { label: "Warehouse", count: 2 },
  { label: "Others", count: 7 },
]

const quickActions = ["New Custom Report", "Schedule Report", "Manage Scheduled Reports", "Saved Reports", "Report History", "Report Settings"]

export function InventoryReports() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Reports", href: "/reports" }, { label: "Inventory Reports" }]}
        title={<span className="flex items-center gap-2">Inventory Reports <Info className="text-muted-foreground size-4" /></span>}
        description="Analyze your inventory performance and get actionable insights."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Export All Reports</Button>
            <NewReportDialog>
              <DialogTrigger asChild>
                <Button>+ Custom Report</Button>
              </DialogTrigger>
            </NewReportDialog>
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
            <p className={`text-xs ${s.trend === "up" ? "text-success-foreground" : "text-muted-foreground"}`}>
              {s.trend === "up" && "↑ "}{s.sub}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search reports..." className="pl-9" />
              </div>
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <Button variant="outline">All Categories <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Types <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">01 May 2025 - 31 May 2025</Button>
                <Button variant="outline">Filters</Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Report Name</th>
                    <th className="pb-2 font-medium">Category</th>
                    <th className="pb-2 font-medium">Description</th>
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Last Generated</th>
                    <th className="pb-2 font-medium">Data As Of</th>
                    <th className="pb-2 font-medium">Format</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.name} className="border-b last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${r.bg}`}>
                            <r.icon className="size-4" />
                          </div>
                          <span className="font-medium whitespace-nowrap text-foreground">{r.name}</span>
                        </div>
                      </td>
                      <td className="py-3"><Badge variant="secondary">{r.cat}</Badge></td>
                      <td className="text-muted-foreground max-w-[220px] py-3 whitespace-normal">{r.desc}</td>
                      <td className="py-3"><Badge variant={typeColors[r.type]}>{r.type}</Badge></td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{r.generated}</td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{r.asOf}</td>
                      <td className="py-3"><Badge variant={formatColors[r.format]}>{r.format}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 10 of 18 reports</span>
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
            <CardHeader><CardTitle>Reports Summary (This Month)</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={summary} total="12" totalLabel="Reports" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {summary.map((s) => (
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
            <CardHeader><CardTitle>Top Report Categories</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {topCategories.map((c) => (
                <div key={c.label} className="flex items-center justify-between">
                  <span className="text-foreground text-sm">{c.label}</span>
                  <span className="text-muted-foreground text-sm font-medium">{c.count}</span>
                </div>
              ))}
              <a href="/inventory/categories" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View all categories →</a>
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
