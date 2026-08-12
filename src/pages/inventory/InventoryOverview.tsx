import { useMemo, useState } from "react"
import { Boxes, Wallet, Layers, AlertTriangle, Ban, Search, SlidersHorizontal, Columns3, LayoutGrid, ChevronDown, Upload, Headphones, Armchair, MonitorSmartphone, Mouse, Keyboard, Monitor, Cable, NotebookPen, Pen } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewItemDialog } from "@/components/shared/EntityDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: Boxes, label: "Total Items", value: "1,248", sub: "Across 8 warehouses", color: "purple" as const },
  { icon: Wallet, label: "Total Stock Value", value: inr(2458780, { decimals: true }), sub: "At cost price", color: "blue" as const },
  { icon: Layers, label: "Units in Stock", value: "15,362", sub: "Total quantity", color: "purple" as const },
  { icon: AlertTriangle, label: "Low Stock Items", value: "23", sub: "Need attention", color: "orange" as const },
  { icon: Ban, label: "Out of Stock Items", value: "7", sub: "Urgent restock", color: "red" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const catColors: Record<string, "info" | "success" | "warning" | "secondary"> = {
  Electronics: "info",
  Furniture: "success",
  Accessories: "warning",
  Stationery: "secondary",
}

const items = [
  { name: "Wireless Headphones", sku: "WH-1001", cat: "Electronics", wh: "Main Warehouse", qty: 120, available: 120, cost: 2450, status: "In Stock", icon: Headphones, bg: "bg-info-bg text-info-foreground" },
  { name: "Ergonomic Chair", sku: "CH-2002", cat: "Furniture", wh: "Main Warehouse", qty: 85, available: 85, cost: 6500, status: "In Stock", icon: Armchair, bg: "bg-success-bg text-success-foreground" },
  { name: "Laptop Stand", sku: "LS-3003", cat: "Accessories", wh: "Warehouse 2", qty: 18, available: 18, cost: 850, status: "Low Stock", icon: MonitorSmartphone, bg: "bg-warning-bg text-warning-foreground" },
  { name: "Wireless Mouse", sku: "WM-4004", cat: "Electronics", wh: "Warehouse 2", qty: 0, available: 0, cost: 950, status: "Out of Stock", icon: Mouse, bg: "bg-info-bg text-info-foreground" },
  { name: "Mechanical Keyboard", sku: "KB-5005", cat: "Electronics", wh: "Main Warehouse", qty: 32, available: 32, cost: 2150, status: "Low Stock", icon: Keyboard, bg: "bg-info-bg text-info-foreground" },
  { name: '24" Monitor', sku: "MN-6006", cat: "Electronics", wh: "Warehouse 3", qty: 56, available: 56, cost: 7800, status: "In Stock", icon: Monitor, bg: "bg-info-bg text-info-foreground" },
  { name: "Office Desk", sku: "DS-7007", cat: "Furniture", wh: "Warehouse 4", qty: 11, available: 11, cost: 9500, status: "Low Stock", icon: Armchair, bg: "bg-success-bg text-success-foreground" },
  { name: "HDMI Cable", sku: "HC-8008", cat: "Accessories", wh: "Warehouse 3", qty: 210, available: 210, cost: 199, status: "In Stock", icon: Cable, bg: "bg-warning-bg text-warning-foreground" },
  { name: "Spiral Notebook", sku: "SN-9009", cat: "Stationery", wh: "Warehouse 4", qty: 0, available: 0, cost: 45, status: "Out of Stock", icon: NotebookPen, bg: "bg-muted text-foreground" },
  { name: "Ball Pen (Blue)", sku: "BP-1010", cat: "Stationery", wh: "Main Warehouse", qty: 350, available: 350, cost: 10, status: "In Stock", icon: Pen, bg: "bg-muted text-foreground" },
]

const byCategory = [
  { name: "Electronics", value: 53.4, color: "var(--color-chart-4)" },
  { name: "Furniture", value: 26.7, color: "var(--color-chart-1)" },
  { name: "Accessories", value: 9.4, color: "var(--color-chart-2)" },
  { name: "Stationery", value: 8.1, color: "var(--color-chart-3)" },
  { name: "Others", value: 2.4, color: "var(--color-muted-foreground)" },
]

const categoryAmounts: Record<string, number> = { Electronics: 1312090, Furniture: 657000, Accessories: 231890, Stationery: 196900, Others: 59000 }

const lowStock = [
  { name: "Laptop Stand", sku: "LS-3003", wh: "Warehouse 2", units: 18, reorder: 50 },
  { name: "Mechanical Keyboard", sku: "KB-5005", wh: "Main Warehouse", units: 32, reorder: 50 },
  { name: "Office Desk", sku: "DS-7007", wh: "Warehouse 4", units: 11, reorder: 20 },
]

const movements = [
  { name: "Ergonomic Chair", text: "Received in Main Warehouse", delta: "+20 units", time: "Today, 10:30 AM", positive: true, icon: Armchair, bg: "bg-success-bg text-success-foreground" },
  { name: "Wireless Mouse", text: "Sold from Warehouse 2", delta: "-15 units", time: "Today, 09:45 AM", positive: false, icon: Mouse, bg: "bg-danger-bg text-danger-foreground" },
  { name: "HDMI Cable", text: "Transferred to Warehouse 3", delta: "+50 units", time: "Today, 09:15 AM", positive: true, icon: Cable, bg: "bg-info-bg text-info-foreground" },
]

const quickActions = ["New Item", "Stock Adjustment", "Stock Transfer", "Stock Count", "Print Barcode Labels"]

const itemTabs = [
  { value: "all", label: "All Items" },
  { value: "low", label: "Low Stock" },
  { value: "out", label: "Out of Stock" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "services", label: "Services" },
] as const

export function InventoryOverview() {
  const [tab, setTab] = useState<(typeof itemTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((it) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "low" ? it.status === "Low Stock" :
        tab === "out" ? it.status === "Out of Stock" :
        tab === "active" ? it.status !== "Out of Stock" :
        tab === "inactive" ? false :
        tab === "services" ? false :
        true
      const matchesQuery = !q || it.name.toLowerCase().includes(q) || it.sku.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Inventory" }, { label: "Overview" }]}
        title="Inventory"
        description="Track and manage your stock across warehouses in real time."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import Items</Button>
            <Button variant="outline">Export <ChevronDown className="size-3.5" /></Button>
            <NewItemDialog>
              <DialogTrigger asChild>
                <Button>+ New Item</Button>
              </DialogTrigger>
            </NewItemDialog>
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
                {itemTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search items by name, SKU or barcode..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline"><Columns3 className="size-4" /> Columns</Button>
                <Button variant="outline">All Warehouses <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Item Name ↓</th>
                    <th className="pb-2 font-medium">SKU / Barcode</th>
                    <th className="pb-2 font-medium">Category ↕</th>
                    <th className="pb-2 font-medium">Warehouse</th>
                    <th className="pb-2 text-right font-medium">Quantity ↓</th>
                    <th className="pb-2 text-right font-medium">Unit Cost (₹)</th>
                    <th className="pb-2 text-right font-medium">Stock Value (₹)</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((it) => (
                    <tr key={it.sku} className="border-b last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${it.bg}`}>
                            <it.icon className="size-4" />
                          </div>
                          <span className="font-medium whitespace-nowrap text-foreground">{it.name}</span>
                        </div>
                      </td>
                      <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{it.sku}</td>
                      <td className="py-3"><Badge variant={catColors[it.cat]}>{it.cat}</Badge></td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{it.wh}</td>
                      <td className="py-3 text-right whitespace-nowrap">
                        <p className="text-foreground">{it.qty} units</p>
                        <p className="text-muted-foreground text-xs">Available: {it.available}</p>
                      </td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{it.cost.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{(it.qty * it.cost).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="py-3"><StatusBadge status={it.status} /></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="text-muted-foreground py-8 text-center">No items found for this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {items.length} items</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                  ))}
                  <span className="text-muted-foreground px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">125</Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Stock Value by Category</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={byCategory} total={inr(2458780)} totalLabel="Total Value" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {byCategory.map((c) => (
                  <li key={c.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className="text-muted-foreground truncate">{c.name}</span>
                    <span className="ml-auto font-medium whitespace-nowrap text-foreground">{inr(categoryAmounts[c.name])}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Low Stock Alerts</CardTitle>
              <a href="/inventory/items" className="text-primary text-sm font-medium">View all</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {lowStock.map((l) => (
                <div key={l.sku} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{l.name}</p>
                    <p className="text-muted-foreground text-xs">{l.wh}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-warning-foreground text-sm font-semibold whitespace-nowrap">{l.units} units</p>
                    <p className="text-muted-foreground text-xs whitespace-nowrap">Reorder: {l.reorder}</p>
                  </div>
                </div>
              ))}
              <a href="/inventory/items" className="text-primary text-sm font-medium">View all low stock items →</a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Stock Movements</CardTitle>
              <a href="/inventory/stock-adjustments" className="text-primary text-sm font-medium">View all</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {movements.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${m.bg}`}>
                    <m.icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{m.name}</p>
                    <p className="text-muted-foreground text-xs">{m.text}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold whitespace-nowrap ${m.positive ? "text-success-foreground" : "text-destructive"}`}>{m.delta}</p>
                    <p className="text-muted-foreground text-xs whitespace-nowrap">{m.time}</p>
                  </div>
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
