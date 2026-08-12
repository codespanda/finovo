import { useMemo, useState } from "react"
import { Boxes, PackageCheck, AlertTriangle, Ban, Wallet, Search, SlidersHorizontal, Columns3, LayoutGrid, ChevronDown, Upload, Barcode, Pencil, Headphones, Armchair, MonitorSmartphone, Mouse, Keyboard, Monitor, Cable, NotebookPen, Pen } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewItemDialog } from "@/components/shared/EntityDialogs"
import { inr } from "@/lib/format"
import { cn } from "@/lib/utils"

const stats = [
  { icon: Boxes, label: "Total Items", value: "1,248", sub: "Across all warehouses", color: "purple" as const },
  { icon: PackageCheck, label: "Active Items", value: "1,152", sub: "92.3% of total", color: "green" as const },
  { icon: AlertTriangle, label: "Low Stock Items", value: "23", sub: "Need attention", color: "orange" as const },
  { icon: Ban, label: "Out of Stock Items", value: "7", sub: "Urgent restock", color: "red" as const },
  { icon: Wallet, label: "Total Stock Value", value: inr(2458780, { decimals: true }), sub: "At cost price", color: "purple" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  green: "bg-success-bg text-success-foreground",
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
  { name: "Wireless Headphones", sku: "WH-1001", cat: "Electronics", unit: "Nos", qty: 120, cost: 2450, price: 4299, status: "In Stock", icon: Headphones, bg: "bg-info-bg text-info-foreground", warehouse: "Main Warehouse", location: "Aisle 01, Shelf 03" },
  { name: "Ergonomic Chair", sku: "CH-2002", cat: "Furniture", unit: "Nos", qty: 85, cost: 6500, price: 11999, status: "In Stock", icon: Armchair, bg: "bg-success-bg text-success-foreground", warehouse: "Main Warehouse", location: "Aisle 02, Shelf 01" },
  { name: "Laptop Stand", sku: "LS-3003", cat: "Accessories", unit: "Nos", qty: 18, cost: 850, price: 1499, status: "Low Stock", icon: MonitorSmartphone, bg: "bg-warning-bg text-warning-foreground", warehouse: "Warehouse 2", location: "Aisle 03, Shelf 02" },
  { name: "Wireless Mouse", sku: "WM-4004", cat: "Electronics", unit: "Nos", qty: 0, cost: 950, price: 1599, status: "Out of Stock", icon: Mouse, bg: "bg-info-bg text-info-foreground", warehouse: "Warehouse 2", location: "Aisle 01, Shelf 05" },
  { name: "Mechanical Keyboard", sku: "KB-5005", cat: "Electronics", unit: "Nos", qty: 32, cost: 2150, price: 3899, status: "Low Stock", icon: Keyboard, bg: "bg-info-bg text-info-foreground", warehouse: "Main Warehouse", location: "Aisle 01, Shelf 04" },
  { name: '24" Monitor', sku: "MN-6006", cat: "Electronics", unit: "Nos", qty: 56, cost: 7800, price: 12999, status: "In Stock", icon: Monitor, bg: "bg-info-bg text-info-foreground", warehouse: "Warehouse 3", location: "Aisle 02, Shelf 03" },
  { name: "Office Desk", sku: "DS-7007", cat: "Furniture", unit: "Nos", qty: 11, cost: 9500, price: 16999, status: "Low Stock", icon: Armchair, bg: "bg-success-bg text-success-foreground", warehouse: "Warehouse 4", location: "Aisle 01, Shelf 01" },
  { name: "HDMI Cable", sku: "HC-8008", cat: "Accessories", unit: "Nos", qty: 210, cost: 199, price: 399, status: "In Stock", icon: Cable, bg: "bg-warning-bg text-warning-foreground", warehouse: "Warehouse 3", location: "Aisle 04, Shelf 02" },
  { name: "Spiral Notebook", sku: "SN-9009", cat: "Stationery", unit: "Nos", qty: 0, cost: 45, price: 99, status: "Out of Stock", icon: NotebookPen, bg: "bg-muted text-foreground", warehouse: "Warehouse 4", location: "Aisle 05, Shelf 01" },
  { name: "Ball Pen (Blue)", sku: "BP-1010", cat: "Stationery", unit: "Nos", qty: 350, cost: 10, price: 20, status: "In Stock", icon: Pen, bg: "bg-muted text-foreground", warehouse: "Main Warehouse", location: "Aisle 05, Shelf 03" },
]

const quickActions = ["Edit Item", "Adjust Stock", "Add Opening Stock", "Add Batch / Serial Number", "Print Barcode Label", "View Item Ledger"]

const itemTabs = [
  { value: "all", label: "All Items" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "low", label: "Low Stock" },
  { value: "out", label: "Out of Stock" },
  { value: "services", label: "Services" },
] as const

export function Items() {
  const [selected, setSelected] = useState(items[0].sku)
  const [tab, setTab] = useState<(typeof itemTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")
  const item = items.find((i) => i.sku === selected)!

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((it) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "active" ? it.status !== "Out of Stock" :
        tab === "inactive" ? false :
        tab === "low" ? it.status === "Low Stock" :
        tab === "out" ? it.status === "Out of Stock" :
        tab === "services" ? false :
        true
      const matchesQuery = !q || it.name.toLowerCase().includes(q) || it.sku.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Inventory", href: "/inventory" }, { label: "Items" }]}
        title="Items"
        description="Manage all your inventory items, track stock levels, pricing and more."
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
                <Input placeholder="Search by item name, SKU or barcode..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline"><Columns3 className="size-4" /> Columns</Button>
                <Button variant="outline">All Categories <ChevronDown className="size-3.5" /></Button>
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
                    <th className="pb-2 font-medium">Unit</th>
                    <th className="pb-2 text-right font-medium">Stock Qty ↓</th>
                    <th className="pb-2 text-right font-medium">Unit Cost (₹)</th>
                    <th className="pb-2 text-right font-medium">Selling Price (₹)</th>
                    <th className="pb-2 text-right font-medium">Stock Value (₹)</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((it) => (
                    <tr
                      key={it.sku}
                      className={cn("cursor-pointer border-b last:border-0", selected === it.sku && "bg-accent")}
                      onClick={() => setSelected(it.sku)}
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${it.bg}`}>
                            <it.icon className="size-4" />
                          </div>
                          <span className="font-medium whitespace-nowrap text-foreground">{it.name}</span>
                        </div>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <div className="text-muted-foreground flex items-center gap-1.5 font-mono text-xs">
                          {it.sku} <Barcode className="size-3.5" />
                        </div>
                      </td>
                      <td className="py-3"><Badge variant={catColors[it.cat]}>{it.cat}</Badge></td>
                      <td className="text-muted-foreground py-3">{it.unit}</td>
                      <td className="py-3 text-right whitespace-nowrap">
                        <p className="text-foreground">{it.qty}</p>
                        <p className="text-muted-foreground text-xs">Available: {it.qty}</p>
                      </td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{it.cost.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{it.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{(it.qty * it.cost).toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="py-3"><StatusBadge status={it.status} /></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="text-muted-foreground py-8 text-center">No items found for this filter.</td>
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
            <CardContent className="pt-5">
              <div className="mb-4 flex items-center gap-3">
                <div className={`flex size-16 shrink-0 items-center justify-center rounded-lg ${item.bg}`}>
                  <item.icon className="size-7" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">{item.name}</p>
                  <p className="text-muted-foreground text-xs">{item.sku}</p>
                  <StatusBadge status={item.status} />
                </div>
                <Button variant="outline" size="icon-sm" className="ml-auto shrink-0"><Pencil className="size-4" /></Button>
              </div>

              <dl className="flex flex-col gap-2.5 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Category</dt><dd className="text-foreground">{item.cat}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">SKU / Barcode</dt><dd className="flex items-center gap-1.5 text-foreground">{item.sku} <Barcode className="size-3.5" /></dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Unit</dt><dd className="text-foreground">{item.unit}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Sales Price</dt><dd className="text-foreground">{inr(item.price, { decimals: true })}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Purchase Price</dt><dd className="text-foreground">{inr(item.cost, { decimals: true })}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Stock Quantity</dt><dd className="text-foreground">{item.qty} {item.unit}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Available</dt><dd className="text-foreground">{item.qty} {item.unit}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Reserved</dt><dd className="text-foreground">0 {item.unit}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Reorder Level</dt><dd className="text-foreground">20 {item.unit}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd className="text-foreground">18% GST</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Warehouse</dt><dd className="text-foreground">{item.warehouse}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Location</dt><dd className="text-foreground">{item.location}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd><StatusBadge status={item.status === "In Stock" ? "Active" : item.status} /></dd></div>
              </dl>
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
