import { useMemo, useState } from "react"
import { Info, ClipboardList, Calendar, PlusCircle, MinusCircle, Wallet, Search, SlidersHorizontal, ChevronDown, LayoutGrid, List } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewStockAdjustmentDialog } from "@/components/shared/InventoryDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: ClipboardList, label: "Total Adjustments", value: "128", sub: "All time", color: "green" as const },
  { icon: Calendar, label: "This Month", value: "18", sub: inr(245300, { decimals: true }), color: "blue" as const },
  { icon: PlusCircle, label: "Positive Adjustments", value: "72", sub: inr(325600, { decimals: true }), color: "orange" as const },
  { icon: MinusCircle, label: "Negative Adjustments", value: "56", sub: `(${inr(80300, { decimals: true })})`, color: "red" as const },
  { icon: Wallet, label: "Total Impact (Value)", value: inr(245300, { decimals: true }), sub: "This month", color: "purple" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
  purple: "bg-purple-bg text-purple-foreground",
}

const adjustments = [
  { no: "ADJ-000128", date: "31 May 2025", wh: "Main Warehouse", whCode: "WH-001", reason: "Physical Count", type: "Positive", items: 8, qty: 120, value: 45600, status: "Posted" },
  { no: "ADJ-000127", date: "30 May 2025", wh: "East Warehouse", whCode: "WH-002", reason: "Damaged Goods", type: "Negative", items: 5, qty: -35, value: -12450, status: "Posted" },
  { no: "ADJ-000126", date: "28 May 2025", wh: "West Warehouse", whCode: "WH-003", reason: "Physical Count", type: "Positive", items: 12, qty: 230, value: 78750, status: "Posted" },
  { no: "ADJ-000125", date: "26 May 2025", wh: "South Warehouse", whCode: "WH-004", reason: "Expired Stock", type: "Negative", items: 6, qty: -60, value: -18200, status: "Posted" },
  { no: "ADJ-000124", date: "24 May 2025", wh: "Main Warehouse", whCode: "WH-001", reason: "Opening Stock Correction", type: "Positive", items: 4, qty: 45, value: 15300, status: "Posted" },
  { no: "ADJ-000123", date: "22 May 2025", wh: "Pune Warehouse", whCode: "WH-006", reason: "Vendor Short Supply", type: "Negative", items: 3, qty: -18, value: -4560, status: "Posted" },
  { no: "ADJ-000122", date: "20 May 2025", wh: "Chennai Warehouse", whCode: "WH-007", reason: "Physical Count", type: "Positive", items: 9, qty: 95, value: 26800, status: "Posted" },
  { no: "ADJ-000121", date: "18 May 2025", wh: "Ahmedabad WH", whCode: "WH-008", reason: "Damage in Transit", type: "Negative", items: 2, qty: -10, value: -2350, status: "Posted" },
  { no: "ADJ-000120", date: "16 May 2025", wh: "Main Warehouse", whCode: "WH-001", reason: "Measurement Error", type: "Positive", items: 3, qty: 15, value: 3200, status: "Draft" },
  { no: "ADJ-000119", date: "14 May 2025", wh: "East Warehouse", whCode: "WH-002", reason: "Reason Not Specified", type: "Negative", items: 1, qty: -5, value: -850, status: "Draft" },
]

const summary = [
  { name: "Positive", value: 12, pct: 66.67, color: "var(--color-chart-2)", amount: 325600 },
  { name: "Negative", value: 6, pct: 33.33, color: "var(--color-chart-5)", amount: -80300 },
]

const topReasons = [
  { label: "Physical Count", count: 8 },
  { label: "Damaged Goods", count: 3 },
  { label: "Expired Stock", count: 2 },
  { label: "Opening Stock Correction", count: 2 },
  { label: "Vendor Short Supply", count: 2 },
  { label: "Others", count: 1 },
]

const quickActions = ["New Adjustment", "Import Adjustments", "Stock Count", "Adjustment Report", "Adjustment History"]

const adjustmentTabs = [
  { value: "all", label: "All Adjustments" },
  { value: "draft", label: "Draft" },
  { value: "posted", label: "Posted" },
] as const

export function StockAdjustments() {
  const [tab, setTab] = useState<(typeof adjustmentTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return adjustments.filter((a) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "draft" ? a.status === "Draft" :
        tab === "posted" ? a.status === "Posted" :
        true
      const matchesQuery = !q || a.no.toLowerCase().includes(q) || a.reason.toLowerCase().includes(q) || a.wh.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Inventory", href: "/inventory" }, { label: "Stock Adjustments" }]}
        title={<span className="flex items-center gap-2">Stock Adjustments <Info className="text-muted-foreground size-4" /></span>}
        description="Adjust stock quantity to match physical inventory and maintain accurate records."
        actions={
          <>
            <Button variant="outline">Import Adjustments</Button>
            <Button variant="outline">Export <ChevronDown className="size-3.5" /></Button>
            <NewStockAdjustmentDialog>
              <DialogTrigger asChild>
                <Button>+ New Adjustment</Button>
              </DialogTrigger>
            </NewStockAdjustmentDialog>
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
                {adjustmentTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search by adjustment no., reason, item or reference..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline">All Types <ChevronDown className="size-3.5" /></Button>
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
                    <th className="pb-2 font-medium">Adjustment No.</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Warehouse</th>
                    <th className="pb-2 font-medium">Reason</th>
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 text-right font-medium">Items</th>
                    <th className="pb-2 text-right font-medium">Qty Adjusted</th>
                    <th className="pb-2 text-right font-medium">Value Impact (₹)</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a) => (
                    <tr key={a.no} className="border-b last:border-0">
                      <td className="text-primary py-3 font-medium whitespace-nowrap">{a.no}</td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{a.date}</td>
                      <td className="py-3 whitespace-nowrap">
                        <p className="text-foreground">{a.wh}</p>
                        <p className="text-muted-foreground text-xs">{a.whCode}</p>
                      </td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{a.reason}</td>
                      <td className="py-3"><Badge variant={a.type === "Positive" ? "success" : "danger"}>{a.type}</Badge></td>
                      <td className="py-3 text-right text-foreground">{a.items}</td>
                      <td className={`py-3 text-right font-medium whitespace-nowrap ${a.qty > 0 ? "text-success-foreground" : "text-destructive"}`}>
                        {a.qty > 0 ? "↑ +" : "↓ "}{Math.abs(a.qty)}
                      </td>
                      <td className={`py-3 text-right font-medium whitespace-nowrap ${a.value > 0 ? "text-foreground" : "text-destructive"}`}>
                        {a.value < 0 ? `(${inr(Math.abs(a.value), { decimals: true })})` : inr(a.value, { decimals: true })}
                      </td>
                      <td className="py-3"><StatusBadge status={a.status} /></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="text-muted-foreground py-8 text-center">No adjustments found for this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {adjustments.length} adjustments</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                  ))}
                  <span className="text-muted-foreground px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">13</Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Adjustment Summary</CardTitle>
              <span className="text-muted-foreground text-xs">This Month</span>
            </CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={summary} total="18" totalLabel="Total" size={140} />
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
            <CardHeader><CardTitle>Top Reasons (This Month)</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {topReasons.map((r) => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-foreground text-sm">{r.label}</span>
                  <span className="text-muted-foreground text-sm font-medium">{r.count}</span>
                </div>
              ))}
              <a href="/inventory/stock-adjustments" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View all reasons →</a>
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
