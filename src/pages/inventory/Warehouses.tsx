import { Info, Home, Boxes, Layers, PackageCheck, Ban, Search, SlidersHorizontal, Upload, ChevronDown, LayoutGrid, List, Plus, Minus } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewWarehouseDialog } from "@/components/shared/InventoryDialogs"
import { inr, maskEmail } from "@/lib/format"

const stats = [
  { icon: Home, label: "Total Warehouses", value: "12", sub: "Across all locations", color: "green" as const },
  { icon: Boxes, label: "Total Stock Value", value: inr(2458780, { decimals: true }), sub: "All warehouses", color: "blue" as const },
  { icon: Layers, label: "Total Stock Qty", value: "15,362", sub: "All warehouses", color: "purple" as const },
  { icon: PackageCheck, label: "Active Warehouses", value: "10", sub: "83.33% of total", color: "orange" as const },
  { icon: Ban, label: "Inactive Warehouses", value: "2", sub: "16.67% of total", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const warehouses = [
  { code: "WH-001", name: "Main Warehouse", location: "A-1, Sector 63", loc2: "Noida, UP 201301", manager: "Rohit Sharma", email: "rohit.sharma@acme.com", items: 2450, qty: 5620, value: 845200, status: "Active", pos: { top: "32%", left: "44%" } },
  { code: "WH-002", name: "East Warehouse", location: "12 Park Street", loc2: "Kolkata, WB 700016", manager: "Priya Nair", email: "priya.nair@acme.com", items: 1850, qty: 3250, value: 525600, status: "Active", pos: { top: "38%", left: "72%" } },
  { code: "WH-003", name: "West Warehouse", location: "B-23, Andheri (W)", loc2: "Mumbai, MH 400058", manager: "Amit Verma", email: "amit.verma@acme.com", items: 1320, qty: 2850, value: 410350, status: "Active", pos: { top: "52%", left: "26%" } },
  { code: "WH-004", name: "South Warehouse", location: "45, Koramangala", loc2: "Bengaluru, KA 560034", manager: "Sneha Iyer", email: "sneha.iyer@acme.com", items: 980, qty: 1650, value: 245300, status: "Active", pos: { top: "78%", left: "40%" } },
  { code: "WH-005", name: "Gurgaon Warehouse", location: "Udyog Vihar, Phase 4", loc2: "Gurgaon, HR 122016", manager: "Vikram Singh", email: "vikram.singh@acme.com", items: 1160, qty: 2150, value: 325800, status: "Active", pos: { top: "28%", left: "42%" } },
  { code: "WH-006", name: "Pune Warehouse", location: "Hinjewadi Phase 2", loc2: "Pune, MH 411057", manager: "Karan Mehta", email: "karan.mehta@acme.com", items: 850, qty: 1240, value: 185400, status: "Active", pos: { top: "58%", left: "30%" } },
  { code: "WH-007", name: "Chennai Warehouse", location: "Guindy Industrial Estate", loc2: "Chennai, TN 600032", manager: "Divya Suresh", email: "divya.suresh@acme.com", items: 760, qty: 1120, value: 165780, status: "Active", pos: { top: "82%", left: "48%" } },
  { code: "WH-008", name: "Ahmedabad Warehouse", location: "GIDC Estate", loc2: "Ahmedabad, GJ 382445", manager: "Hardik Patel", email: "hardik.patel@acme.com", items: 540, qty: 850, value: 125450, status: "Inactive", pos: { top: "44%", left: "20%" } },
  { code: "WH-009", name: "Jaipur Warehouse", location: "Sitapura Industrial Area", loc2: "Jaipur, RJ 302022", manager: "Manish Jain", email: "manish.jain@acme.com", items: 420, qty: 620, value: 85600, status: "Inactive", pos: { top: "34%", left: "34%" } },
  { code: "WH-010", name: "Indore Warehouse", location: "Pithampur Industrial Area", loc2: "Indore, MP 453775", manager: "Neha Joshi", email: "neha.joshi@acme.com", items: 310, qty: 480, value: 65200, status: "Active", pos: { top: "50%", left: "38%" } },
]

const quickActions = ["New Warehouse", "Warehouse Transfer", "Adjust Stock", "View Stock by Warehouse", "Warehouse Report"]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export function Warehouses() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Inventory", href: "/inventory" }, { label: "Warehouses" }]}
        title={<span className="flex items-center gap-2">Warehouses <Info className="text-muted-foreground size-4" /></span>}
        description="Manage your warehouses, locations and track inventory across all warehouses."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import Warehouses</Button>
            <Button variant="outline">Export <ChevronDown className="size-3.5" /></Button>
            <NewWarehouseDialog>
              <DialogTrigger asChild>
                <Button>+ New Warehouse</Button>
              </DialogTrigger>
            </NewWarehouseDialog>
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
                <Input placeholder="Search by warehouse name or location..." className="pl-9" />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline" size="icon"><List className="size-4" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Warehouse Name</th>
                    <th className="pb-2 font-medium">Location</th>
                    <th className="pb-2 font-medium">Manager</th>
                    <th className="pb-2 text-right font-medium">Total Items</th>
                    <th className="pb-2 text-right font-medium">Stock Qty</th>
                    <th className="pb-2 text-right font-medium">Stock Value (₹)</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {warehouses.map((w) => (
                    <tr key={w.code} className="border-b last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="bg-info-bg text-info-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
                            <Home className="size-4" />
                          </div>
                          <div>
                            <p className="font-medium whitespace-nowrap text-foreground">{w.name}</p>
                            <p className="text-muted-foreground text-xs">{w.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <p className="text-foreground">{w.location}</p>
                        <p className="text-muted-foreground text-xs">{w.loc2}</p>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-7"><AvatarFallback className="bg-purple-bg text-purple-foreground text-[10px]">{initials(w.manager)}</AvatarFallback></Avatar>
                          <div>
                            <p className="text-xs whitespace-nowrap text-foreground">{w.manager}</p>
                            <p className="text-muted-foreground text-xs whitespace-nowrap">{maskEmail(w.email)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{w.items.toLocaleString("en-IN")}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{w.qty.toLocaleString("en-IN")}</td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{w.value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                      <td className="py-3"><StatusBadge status={w.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 10 of 12 warehouses</span>
              <div className="flex gap-1">
                {[1, 2].map((p) => (
                  <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Warehouses by Location</CardTitle>
              <a href="/inventory/warehouses" className="text-primary text-sm font-medium">View map</a>
            </CardHeader>
            <CardContent className="pb-5">
              <div className="bg-info-bg/40 relative h-56 w-full overflow-hidden rounded-lg">
                <svg viewBox="0 0 200 220" className="absolute inset-0 h-full w-full opacity-40">
                  <path d="M70 10 L120 8 L140 30 L150 60 L145 90 L160 110 L150 150 L120 200 L90 210 L60 190 L45 150 L50 110 L40 70 L55 35 Z" fill="var(--color-info-foreground)" opacity="0.15" />
                </svg>
                {warehouses.slice(0, 10).map((w) => (
                  <span
                    key={w.code}
                    className={`absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white ${w.status === "Active" ? "bg-success" : "bg-muted-foreground"}`}
                    style={{ top: w.pos.top, left: w.pos.left }}
                    title={w.name}
                  />
                ))}
                <div className="absolute right-2 bottom-2 flex flex-col gap-1">
                  <Button size="icon-sm" variant="outline" className="bg-card"><Plus className="size-3.5" /></Button>
                  <Button size="icon-sm" variant="outline" className="bg-card"><Minus className="size-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Warehouse Summary</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Capacity</span><span className="font-medium text-foreground">1,20,000 Sq. Ft.</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Used Capacity</span><span className="font-medium text-foreground">78,250 Sq. Ft.</span></div>
              <div>
                <div className="mb-1 flex justify-between"><span className="text-muted-foreground">Utilization</span><span className="font-medium text-foreground">65.2%</span></div>
                <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                  <div className="bg-primary h-full rounded-full" style={{ width: "65.2%" }} />
                </div>
              </div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Bin Locations</span><span className="font-medium text-foreground">3,245</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Available Bin Locations</span><span className="font-medium text-foreground">1,120</span></div>
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
