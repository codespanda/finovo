import { useMemo, useState } from "react"
import { Info, Boxes, Calendar, Hourglass, CheckCircle2, Ban, Search, SlidersHorizontal, ChevronDown, Upload, List, LayoutGrid } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewStockCountDialog } from "@/components/shared/InventoryDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: Boxes, label: "Total Counts", value: "112", sub: "All time", color: "green" as const },
  { icon: Calendar, label: "This Month", value: "16", sub: inr(185600, { decimals: true }), color: "blue" as const },
  { icon: Hourglass, label: "In Progress", value: "5", sub: inr(48250, { decimals: true }), color: "purple" as const },
  { icon: CheckCircle2, label: "Completed", value: "95", sub: inr(1845300, { decimals: true }), color: "orange" as const },
  { icon: Ban, label: "Cancelled", value: "12", sub: inr(32450, { decimals: true }), color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const counts = [
  { no: "CNT-000112", date: "31 May 2025", wh: "Main Warehouse", whCode: "WH-001", ref: "Monthly Physical Count", by: "Rohit Sharma", counted: 320, total: 325, pct: "98.46%", variance: 4250, status: "Completed" },
  { no: "CNT-000111", date: "30 May 2025", wh: "East Warehouse", whCode: "WH-002", ref: "Cycle Count - Zone A", by: "Priya Nair", counted: 180, total: 182, pct: "98.90%", variance: 2150, status: "Completed" },
  { no: "CNT-000110", date: "29 May 2025", wh: "West Warehouse", whCode: "WH-003", ref: "Monthly Physical Count", by: "Amit Verma", counted: 245, total: 250, pct: "98.00%", variance: 6800, status: "Completed" },
  { no: "CNT-000109", date: "28 May 2025", wh: "South Warehouse", whCode: "WH-004", ref: "Cycle Count - Fast Movers", by: "Sneha Iyer", counted: 98, total: 100, pct: "98.00%", variance: -1250, status: "In Progress" },
  { no: "CNT-000108", date: "27 May 2025", wh: "Pune Warehouse", whCode: "WH-006", ref: "Quarterly Physical Count", by: "Karan Mehta", counted: 210, total: 215, pct: "97.67%", variance: 3450, status: "Completed" },
  { no: "CNT-000107", date: "25 May 2025", wh: "Ahmedabad WH", whCode: "WH-008", ref: "Cycle Count - Zone B", by: "Vikram Singh", counted: 75, total: 80, pct: "93.75%", variance: -2800, status: "In Progress" },
  { no: "CNT-000106", date: "24 May 2025", wh: "Chennai Warehouse", whCode: "WH-007", ref: "Monthly Physical Count", by: "Divya Suresh", counted: 310, total: 312, pct: "99.36%", variance: 1650, status: "Completed" },
  { no: "CNT-000105", date: "22 May 2025", wh: "Jaipur Warehouse", whCode: "WH-009", ref: "Stock Verification", by: "Manish Jain", counted: 50, total: 52, pct: "96.15%", variance: 750, status: "Completed" },
  { no: "CNT-000104", date: "20 May 2025", wh: "Indore Warehouse", whCode: "WH-010", ref: "Cycle Count - Zone C", by: "Neha Joshi", counted: 60, total: 64, pct: "93.75%", variance: -1950, status: "Cancelled" },
  { no: "CNT-000103", date: "18 May 2025", wh: "Main Warehouse", whCode: "WH-001", ref: "Random Spot Check", by: "Rohit Sharma", counted: 40, total: 40, pct: "100.00%", variance: 0, status: "Completed" },
]

const summary = [
  { name: "Completed", value: 10, pct: 62.5, color: "var(--color-chart-2)", amount: 125300 },
  { name: "In Progress", value: 5, pct: 31.25, color: "var(--color-chart-1)", amount: 48250 },
  { name: "Cancelled", value: 1, pct: 6.25, color: "var(--color-chart-5)", amount: 12050 },
]

const variance = [
  { label: "Total Variance (₹)", value: inr(185600) },
  { label: "Positive Variance", value: inr(152400), color: "text-success-foreground" },
  { label: "Negative Variance", value: `(${inr(33200)})`, color: "text-destructive" },
  { label: "Variance %", value: "1.23%" },
]

const quickActions = ["New Stock Count", "Import Count", "Count History", "Stock Count Report", "Variance Report", "Recount Items"]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

const countTabs = [
  { value: "all", label: "All Counts" },
  { value: "progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const

export function StockCount() {
  const [tab, setTab] = useState<(typeof countTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return counts.filter((c) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "progress" ? c.status === "In Progress" :
        tab === "completed" ? c.status === "Completed" :
        tab === "cancelled" ? c.status === "Cancelled" :
        true
      const matchesQuery = !q || c.no.toLowerCase().includes(q) || c.wh.toLowerCase().includes(q) || c.ref.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Inventory", href: "/inventory" }, { label: "Stock Count" }]}
        title={<span className="flex items-center gap-2">Stock Count <Info className="text-muted-foreground size-4" /></span>}
        description="Perform physical counts and reconcile your stock to ensure accurate inventory records."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import Count</Button>
            <Button variant="outline">Export <ChevronDown className="size-3.5" /></Button>
            <NewStockCountDialog>
              <DialogTrigger asChild>
                <Button>+ New Stock Count</Button>
              </DialogTrigger>
            </NewStockCountDialog>
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
                {countTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search by count no., warehouse or reference..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Warehouses <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">01 May 2025 - 31 May 2025</Button>
                <Button variant="outline" size="icon"><List className="size-4" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Count No.</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Warehouse</th>
                    <th className="pb-2 font-medium">Reference</th>
                    <th className="pb-2 font-medium">Counted By</th>
                    <th className="pb-2 font-medium">Items Counted</th>
                    <th className="pb-2 text-right font-medium">Variance (₹)</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.no} className="border-b last:border-0">
                      <td className="text-primary py-3 font-medium whitespace-nowrap">{c.no}</td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{c.date}</td>
                      <td className="py-3 whitespace-nowrap">
                        <p className="text-foreground">{c.wh}</p>
                        <p className="text-muted-foreground text-xs">{c.whCode}</p>
                      </td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{c.ref}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-6"><AvatarFallback className="bg-purple-bg text-purple-foreground text-[10px]">{initials(c.by)}</AvatarFallback></Avatar>
                          <span className="text-xs whitespace-nowrap text-foreground">{c.by}</span>
                        </div>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <p className="text-foreground">{c.counted} / {c.total}</p>
                        <p className="text-muted-foreground text-xs">{c.pct}</p>
                      </td>
                      <td className={`py-3 text-right font-medium whitespace-nowrap ${c.variance < 0 ? "text-destructive" : "text-foreground"}`}>
                        {c.variance < 0 ? `(${inr(Math.abs(c.variance), { decimals: true })})` : inr(c.variance, { decimals: true })}
                      </td>
                      <td className="py-3"><StatusBadge status={c.status} /></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-muted-foreground py-8 text-center">No counts found for this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {counts.length} counts</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                  ))}
                  <span className="text-muted-foreground px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">12</Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Count Summary (This Month)</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={summary} total="16" totalLabel="Total" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex flex-col">
                    <span className="flex items-center gap-2">
                      <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                      <span className="text-muted-foreground">{s.name}</span>
                    </span>
                    <span className="pl-4.5 text-xs font-medium text-foreground">{s.value} ({s.pct.toFixed(2)}%)</span>
                    <span className="pl-4.5 text-muted-foreground text-xs">{inr(s.amount)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Variance Summary (This Month)</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              {variance.map((v) => (
                <div key={v.label} className="flex justify-between">
                  <span className="text-muted-foreground">{v.label}</span>
                  <span className={`font-medium ${v.color ?? "text-foreground"}`}>{v.value}</span>
                </div>
              ))}
              <a href="/inventory/stock-count" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View variance report →</a>
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
