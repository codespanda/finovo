import { useMemo, useState } from "react"
import { Boxes, Tag, AlertTriangle, Ban, Wallet, Search, SlidersHorizontal, Columns3, LayoutGrid, ChevronDown, Headphones, Armchair, MonitorSmartphone, NotebookPen, Shirt, Home, Dumbbell, BookOpen, Wrench, MoreHorizontal } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewCategoryDialog } from "@/components/shared/PayrollExpenseDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: Boxes, label: "Total Categories", value: "18", sub: "Across all warehouses", color: "purple" as const },
  { icon: Tag, label: "Active Categories", value: "16", sub: "88.89% of total", color: "blue" as const },
  { icon: AlertTriangle, label: "Low Stock Categories", value: "4", sub: "Need attention", color: "orange" as const },
  { icon: Ban, label: "Out of Stock Categories", value: "2", sub: "Urgent action needed", color: "red" as const },
  { icon: Wallet, label: "Total Stock Value", value: inr(2458780, { decimals: true }), sub: "Of all categories", color: "purple" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const categories = [
  { name: "Electronics", desc: "Devices and electronic accessories", items: 245, qty: 2450, value: 845200, status: "Active", icon: Headphones, bg: "bg-info-bg text-info-foreground" },
  { name: "Furniture", desc: "Office and home furniture items", items: 118, qty: 1180, value: 552500, status: "Active", icon: Armchair, bg: "bg-success-bg text-success-foreground" },
  { name: "Accessories", desc: "Various accessories and add-ons", items: 176, qty: 3250, value: 285600, status: "Active", icon: MonitorSmartphone, bg: "bg-warning-bg text-warning-foreground" },
  { name: "Stationery", desc: "Office and school stationery", items: 210, qty: 5620, value: 195160, status: "Active", icon: NotebookPen, bg: "bg-purple-bg text-purple-foreground" },
  { name: "Apparel", desc: "Clothing and apparel items", items: 142, qty: 1320, value: 320450, status: "Active", icon: Shirt, bg: "bg-danger-bg text-danger-foreground" },
  { name: "Home Appliances", desc: "Home and kitchen appliances", items: 86, qty: 860, value: 475890, status: "Active", icon: Home, bg: "bg-info-bg text-info-foreground" },
  { name: "Sports & Fitness", desc: "Sports and fitness equipment", items: 64, qty: 540, value: 98760, status: "Low Stock", icon: Dumbbell, bg: "bg-success-bg text-success-foreground" },
  { name: "Books", desc: "Educational and reference books", items: 32, qty: 120, value: 45300, status: "Low Stock", icon: BookOpen, bg: "bg-warning-bg text-warning-foreground" },
  { name: "Tools & Hardware", desc: "Tools and hardware items", items: 28, qty: 0, value: 0, status: "Out of Stock", icon: Wrench, bg: "bg-muted text-foreground" },
  { name: "Others", desc: "Miscellaneous items", items: 17, qty: 210, value: 34920, status: "Active", icon: MoreHorizontal, bg: "bg-muted text-foreground" },
]

const byStockValue = [
  { name: "Electronics", value: 34.4, color: "var(--color-chart-2)" },
  { name: "Furniture", value: 22.5, color: "var(--color-chart-1)" },
  { name: "Accessories", value: 11.6, color: "var(--color-chart-3)" },
  { name: "Home Appliances", value: 19.4, color: "var(--color-chart-4)" },
  { name: "Others", value: 12.1, color: "var(--color-muted-foreground)" },
]

const categoryAmounts: Record<string, number> = { Electronics: 845200, Furniture: 552500, Accessories: 285600, "Home Appliances": 475890, Others: 299590 }

const topByItems = [
  { name: "Stationery", count: 210 },
  { name: "Electronics", count: 245 },
  { name: "Accessories", count: 176 },
  { name: "Apparel", count: 142 },
  { name: "Furniture", count: 118 },
]

const quickActions = ["New Category", "Category Report", "Reorder Level Settings", "Bulk Upload Categories", "Export Categories"]

const categoryTabs = [
  { value: "all", label: "All Categories" },
  { value: "inactive", label: "Inactive Categories" },
] as const

export function InventoryCategories() {
  const [tab, setTab] = useState<(typeof categoryTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return categories.filter((c) => {
      const matchesTab = tab === "all" ? true : c.status === "Inactive"
      const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Inventory", href: "/inventory" }, { label: "Categories" }]}
        title="Inventory Categories"
        description="Organize your inventory by categories to streamline management and reporting."
        actions={
          <>
            <Button variant="outline">Export <ChevronDown className="size-3.5" /></Button>
            <NewCategoryDialog kind="inventory">
              <DialogTrigger asChild>
                <Button>+ New Category</Button>
              </DialogTrigger>
            </NewCategoryDialog>
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
                {categoryTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search by category name or description..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline"><Columns3 className="size-4" /> Columns</Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Category Name ↓</th>
                    <th className="pb-2 font-medium">Description</th>
                    <th className="pb-2 text-right font-medium">Total Items</th>
                    <th className="pb-2 text-right font-medium">Total Stock Qty</th>
                    <th className="pb-2 text-right font-medium">Stock Value (₹)</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.name} className="border-b last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
                            <c.icon className="size-4" />
                          </div>
                          <span className="font-medium whitespace-nowrap text-foreground">{c.name}</span>
                        </div>
                      </td>
                      <td className="text-muted-foreground py-3 max-w-[220px] whitespace-normal">{c.desc}</td>
                      <td className="py-3 text-right text-foreground">{c.items}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{c.qty.toLocaleString("en-IN")}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{c.value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="py-3"><StatusBadge status={c.status} /></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-muted-foreground py-8 text-center">No categories found for this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {categories.length} categories</span>
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
            <CardHeader><CardTitle>Categories by Stock Value</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={byStockValue} total={inr(2458780)} totalLabel="Total Value" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {byStockValue.map((c) => (
                  <li key={c.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className="text-muted-foreground truncate">{c.name}</span>
                    <span className="ml-auto font-medium whitespace-nowrap text-foreground">{c.value}% ({inr(categoryAmounts[c.name])})</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Top Categories by Items</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {topByItems.map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <span className="text-foreground text-sm">{c.name}</span>
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
