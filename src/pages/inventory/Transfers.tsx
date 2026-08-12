import { useMemo, useState } from "react"
import { Repeat, Calendar, Truck, CheckCircle2, Ban, Search, SlidersHorizontal, ChevronDown, Upload, List, LayoutGrid } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewTransferDialog } from "@/components/shared/InventoryDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: Repeat, label: "Total Transfers", value: "96", sub: "All time", color: "green" as const },
  { icon: Calendar, label: "This Month", value: "14", sub: inr(324750, { decimals: true }), color: "blue" as const },
  { icon: Truck, label: "In Transit", value: "8", sub: inr(115600, { decimals: true }), color: "purple" as const },
  { icon: CheckCircle2, label: "Completed", value: "76", sub: inr(1865200, { decimals: true }), color: "orange" as const },
  { icon: Ban, label: "Cancelled", value: "4", sub: inr(32850, { decimals: true }), color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const transfers = [
  { no: "TRF-00096", date: "31 May 2025", from: "Main Warehouse", fromCode: "WH-001", to: "East Warehouse", toCode: "WH-002", items: 6, qty: 120, value: 45600, status: "Completed" },
  { no: "TRF-00095", date: "30 May 2025", from: "West Warehouse", fromCode: "WH-003", to: "South Warehouse", toCode: "WH-004", items: 8, qty: 210, value: 78750, status: "Completed" },
  { no: "TRF-00094", date: "29 May 2025", from: "Pune Warehouse", fromCode: "WH-006", to: "Main Warehouse", toCode: "WH-001", items: 5, qty: 80, value: 26400, status: "In Transit" },
  { no: "TRF-00093", date: "28 May 2025", from: "East Warehouse", fromCode: "WH-002", to: "West Warehouse", toCode: "WH-003", items: 7, qty: 150, value: 56200, status: "Completed" },
  { no: "TRF-00092", date: "27 May 2025", from: "South Warehouse", fromCode: "WH-004", to: "Ahmedabad WH", toCode: "WH-008", items: 4, qty: 60, value: 18900, status: "In Transit" },
  { no: "TRF-00091", date: "26 May 2025", from: "Chennai Warehouse", fromCode: "WH-007", to: "Pune Warehouse", toCode: "WH-006", items: 9, qty: 175, value: 63250, status: "Completed" },
  { no: "TRF-00090", date: "25 May 2025", from: "Main Warehouse", fromCode: "WH-001", to: "Jaipur Warehouse", toCode: "WH-009", items: 3, qty: 45, value: 12750, status: "Cancelled" },
  { no: "TRF-00089", date: "24 May 2025", from: "Indore Warehouse", fromCode: "WH-010", to: "Main Warehouse", toCode: "WH-001", items: 6, qty: 110, value: 34600, status: "Completed" },
  { no: "TRF-00088", date: "23 May 2025", from: "Main Warehouse", fromCode: "WH-001", to: "West Warehouse", toCode: "WH-003", items: 10, qty: 240, value: 89400, status: "Completed" },
  { no: "TRF-00087", date: "22 May 2025", from: "Pune Warehouse", fromCode: "WH-006", to: "South Warehouse", toCode: "WH-004", items: 2, qty: 30, value: 8800, status: "Cancelled" },
]

const overview = [
  { name: "Completed", value: 6, pct: 42.86, color: "var(--color-chart-2)", amount: 184550 },
  { name: "In Transit", value: 5, pct: 35.71, color: "var(--color-chart-1)", amount: 115600 },
  { name: "Cancelled", value: 3, pct: 21.43, color: "var(--color-chart-5)", amount: 24600 },
]

const routes = [
  { route: "Main Warehouse → East Warehouse", count: 3 },
  { route: "West Warehouse → South Warehouse", count: 2 },
  { route: "Pune Warehouse → Main Warehouse", count: 2 },
  { route: "South Warehouse → Ahmedabad WH", count: 1 },
  { route: "Others", count: 6 },
]

const quickActions = ["New Transfer", "Import Transfers", "Transfer Report", "View Stock by Warehouse", "Transfer History"]

const transferTabs = [
  { value: "all", label: "All Transfers" },
  { value: "transit", label: "In Transit" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const

export function Transfers() {
  const [tab, setTab] = useState<(typeof transferTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return transfers.filter((t) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "transit" ? t.status === "In Transit" :
        tab === "completed" ? t.status === "Completed" :
        tab === "cancelled" ? t.status === "Cancelled" :
        true
      const matchesQuery = !q || t.no.toLowerCase().includes(q) || t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Inventory", href: "/inventory" }, { label: "Transfers" }]}
        title="Transfers"
        description="Move stock between warehouses and track all inventory transfers."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import Transfers</Button>
            <Button variant="outline">Export <ChevronDown className="size-3.5" /></Button>
            <NewTransferDialog>
              <DialogTrigger asChild>
                <Button>+ New Transfer</Button>
              </DialogTrigger>
            </NewTransferDialog>
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
                {transferTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search by transfer no., reference, or item..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
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
                    <th className="pb-2 font-medium">Transfer No.</th>
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">From Warehouse</th>
                    <th className="pb-2 font-medium">To Warehouse</th>
                    <th className="pb-2 text-right font-medium">Items</th>
                    <th className="pb-2 text-right font-medium">Total Qty</th>
                    <th className="pb-2 text-right font-medium">Value (₹)</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((t) => (
                    <tr key={t.no} className="border-b last:border-0">
                      <td className="text-primary py-3 font-medium whitespace-nowrap">{t.no}</td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{t.date}</td>
                      <td className="py-3 whitespace-nowrap">
                        <p className="text-foreground">{t.from}</p>
                        <p className="text-muted-foreground text-xs">{t.fromCode}</p>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <p className="text-foreground">{t.to}</p>
                        <p className="text-muted-foreground text-xs">{t.toCode}</p>
                      </td>
                      <td className="py-3 text-right text-foreground">{t.items}</td>
                      <td className="py-3 text-right text-foreground">{t.qty}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(t.value, { decimals: true })}</td>
                      <td className="py-3"><StatusBadge status={t.status} /></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-muted-foreground py-8 text-center">No transfers found for this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {transfers.length} transfers</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                  ))}
                  <span className="text-muted-foreground px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">10</Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Transfer Overview (This Month)</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={overview} total="14" totalLabel="Total" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {overview.map((s) => (
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
            <CardHeader><CardTitle>Top Transfer Routes (This Month)</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {routes.map((r) => (
                <div key={r.route} className="flex items-center justify-between gap-2">
                  <span className="text-foreground text-sm">{r.route}</span>
                  <span className="text-muted-foreground text-sm font-medium">{r.count}</span>
                </div>
              ))}
              <a href="/inventory/transfers" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View all routes →</a>
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
