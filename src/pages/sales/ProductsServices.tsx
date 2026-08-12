import { Box, PackageCheck, Briefcase, Gem, Tag, Search, SlidersHorizontal, Download, ChevronDown } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewItemDialog } from "@/components/shared/EntityDialogs"

const stats = [
  { icon: Box, label: "Total Items", value: "156", sub: "All Products & Services", color: "purple" as const },
  { icon: PackageCheck, label: "Products", value: "110", sub: "70.5% of total", color: "green" as const },
  { icon: Briefcase, label: "Services", value: "46", sub: "29.5% of total", color: "orange" as const },
  { icon: Gem, label: "Active Items", value: "142", sub: "91.0% of total", color: "warning" as const },
  { icon: Tag, label: "Inactive Items", value: "14", sub: "9.0% of total", color: "red" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  warning: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const items = [
  { name: "Dell Inspiron 15 Laptop", sku: "PRD-0001", type: "Product", category: "Laptops", rate: 65000, tax: "18% GST", status: "Active", emoji: "💻", bg: "bg-info-bg" },
  { name: "HP Pavilion 14 Laptop", sku: "PRD-0002", type: "Product", category: "Laptops", rate: 55000, tax: "18% GST", status: "Active", emoji: "💻", bg: "bg-info-bg" },
  { name: 'LG 24" Monitor', sku: "PRD-0003", type: "Product", category: "Monitors", rate: 12500, tax: "18% GST", status: "Active", emoji: "🖥️", bg: "bg-muted" },
  { name: "Logitech Wireless Keyboard", sku: "PRD-0004", type: "Product", category: "Accessories", rate: 2500, tax: "18% GST", status: "Active", emoji: "⌨️", bg: "bg-muted" },
  { name: "Logitech Wireless Mouse", sku: "PRD-0005", type: "Product", category: "Accessories", rate: 1200, tax: "18% GST", status: "Active", emoji: "🖱️", bg: "bg-muted" },
  { name: "Microsoft Office 365", sku: "PRD-0006", type: "Product", category: "Software", rate: 4999, tax: "18% GST", status: "Active", emoji: "🪟", bg: "bg-info-bg" },
  { name: "Laptop Repair Service", sku: "SRV-0001", type: "Service", category: "Repair Services", rate: 1500, tax: "18% GST", status: "Active", emoji: "🛠️", bg: "bg-warning-bg" },
  { name: "Software Installation", sku: "SRV-0002", type: "Service", category: "IT Services", rate: 800, tax: "18% GST", status: "Active", emoji: "💿", bg: "bg-purple-bg" },
  { name: "On-site IT Support (Monthly)", sku: "SRV-0003", type: "Service", category: "IT Services", rate: 5000, tax: "18% GST", status: "Active", emoji: "🖥️", bg: "bg-purple-bg" },
  { name: "IT Consulting (Per Hour)", sku: "SRV-0004", type: "Service", category: "Consulting", rate: 2000, tax: "18% GST", status: "Active", emoji: "🧑‍💼", bg: "bg-success-bg" },
]

const topCategories = [
  { label: "Laptops", count: 38, pct: 24.4 },
  { label: "IT Services", count: 28, pct: 17.9 },
  { label: "Accessories", count: 26, pct: 16.7 },
  { label: "Software", count: 20, pct: 12.8 },
  { label: "Repair Services", count: 18, pct: 11.5 },
]

const activities = [
  { text: 'New product "Dell Inspiron 15 Laptop" added', time: "28 May 2025, 10:30 AM by John Doe", color: "text-success-foreground" },
  { text: 'Product "Logitech Wireless Mouse" updated', time: "27 May 2025, 04:15 PM by John Doe", color: "text-warning-foreground" },
  { text: 'New service "On-site IT Support (Monthly)" added', time: "26 May 2025, 11:20 AM by John Doe", color: "text-info-foreground" },
  { text: 'Product "Old Printer Model" marked as inactive', time: "25 May 2025, 09:45 AM by John Doe", color: "text-destructive" },
]

export function ProductsServices() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Sales", href: "/sales" }, { label: "Products & Services" }]}
        title="Products & Services"
        description="Manage all your products and services in one place."
        actions={
          <>
            <Button variant="outline">FY 2024-25</Button>
            <Button variant="outline"><SlidersHorizontal className="size-4" /> All Categories</Button>
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
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search products & services..." className="pl-9" />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline"><Download className="size-4" /> Export <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>SKU / Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Rate (₹)</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((it) => (
                  <TableRow key={it.sku}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-base ${it.bg}`}>{it.emoji}</div>
                        <span className="font-medium text-foreground">{it.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{it.sku}</TableCell>
                    <TableCell><Badge variant={it.type === "Product" ? "success" : "info"}>{it.type}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{it.category}</TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{it.rate.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{it.tax}</TableCell>
                    <TableCell><StatusBadge status={it.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 10 of 156 results</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((p) => (
                  <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Item Summary</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart
                data={[
                  { name: "Products", value: 70.5, color: "var(--color-chart-2)" },
                  { name: "Services", value: 20.6, color: "var(--color-chart-1)" },
                  { name: "Inactive", value: 9.0, color: "var(--color-muted-foreground)" },
                ]}
                total="156"
                totalLabel="Total Items"
                size={130}
              />
              <ul className="flex flex-col gap-2 text-sm">
                <li className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[var(--color-chart-2)]" /><span className="text-muted-foreground">Products</span><span className="ml-auto font-medium text-foreground">110 (70.5%)</span></li>
                <li className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[var(--color-chart-1)]" /><span className="text-muted-foreground">Services</span><span className="ml-auto font-medium text-foreground">46 (29.5%)</span></li>
                <li className="flex items-center gap-2"><span className="bg-muted-foreground size-2.5 rounded-full" /><span className="text-muted-foreground">Inactive</span><span className="ml-auto font-medium text-foreground">14 (9.0%)</span></li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Top Categories</CardTitle>
              <a href="/inventory/categories" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {topCategories.map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-baseline justify-between">
                      <span className="text-sm font-medium text-foreground">{c.label}</span>
                      <span className="text-muted-foreground text-xs">{c.pct}%</span>
                    </div>
                    <p className="text-muted-foreground mb-1 text-xs">{c.count} Items</p>
                    <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Activities</CardTitle>
              <a href="/accounting" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {activities.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full bg-current ${a.color}`} />
                  <div className="min-w-0">
                    <p className="text-foreground text-sm">{a.text}</p>
                    <p className="text-muted-foreground text-xs">{a.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-5">
        <CardContent className="flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
          <div>
            <p className="font-medium text-foreground">Organize and track all your products and services</p>
            <p className="text-muted-foreground text-sm">Add detailed information, set tax rates, and manage inventory with ease.</p>
          </div>
          <Button variant="outline" className="shrink-0">Learn More</Button>
        </CardContent>
      </Card>
    </div>
  )
}
