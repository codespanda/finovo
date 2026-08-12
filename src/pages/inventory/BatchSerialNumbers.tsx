import { useMemo, useState } from "react"
import { Info, Boxes, ScanLine, Timer, Ban, Wallet, Search, SlidersHorizontal, ChevronDown, Upload, List, LayoutGrid } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewBatchSerialDialog } from "@/components/shared/InventoryDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: Boxes, label: "Total Batches", value: "256", sub: "Across all items", color: "green" as const },
  { icon: ScanLine, label: "Total Serials", value: "1,842", sub: "Across all items", color: "blue" as const },
  { icon: Timer, label: "Expiring Soon", value: "18", sub: "Within 30 days", color: "purple" as const },
  { icon: Ban, label: "Expired", value: "7", sub: "Batches expired", color: "red" as const },
  { icon: Wallet, label: "Total Stock Value", value: inr(1875430, { decimals: true }), sub: "All batches & serials", color: "purple" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const records = [
  { no: "BATCH-2505-001", type: "Batch", item: "Paracetamol 650mg Tablet", wh: "Main Warehouse", whCode: "WH-001", mfg: "01 May 2025", exp: "01 May 2026", qty: "500 Strip", available: "420 Strip", status: "Active", value: 12600 },
  { no: "BATCH-2504-058", type: "Batch", item: "Amoxicillin 500mg Capsule", wh: "East Warehouse", whCode: "WH-002", mfg: "15 Apr 2025", exp: "15 Apr 2026", qty: "300 Strip", available: "180 Strip", status: "Active", value: 9450 },
  { no: "BATCH-2503-022", type: "Batch", item: "Vitamin C 500mg Tablet", wh: "South Warehouse", whCode: "WH-004", mfg: "10 Mar 2025", exp: "10 Mar 2026", qty: "200 Bottle", available: "0 Bottle", status: "Expired", value: 0 },
  { no: "BATCH-2502-019", type: "Batch", item: "Ibuprofen 400mg Tablet", wh: "West Warehouse", whCode: "WH-003", mfg: "20 Feb 2025", exp: "20 Feb 2026", qty: "400 Strip", available: "250 Strip", status: "Active", value: 8000 },
  { no: "SN-2505-0001", type: "Serial", item: "Digital Thermometer DT-101", wh: "Main Warehouse", whCode: "WH-001", mfg: "05 May 2025", exp: "–", qty: "1 Unit", available: "1 Unit", status: "Active", value: 850 },
  { no: "SN-2505-0002", type: "Serial", item: "Digital Thermometer DT-101", wh: "Main Warehouse", whCode: "WH-001", mfg: "05 May 2025", exp: "–", qty: "1 Unit", available: "1 Unit", status: "Active", value: 850 },
  { no: "SN-2505-0003", type: "Serial", item: "Blood Pressure Monitor BP-120", wh: "East Warehouse", whCode: "WH-002", mfg: "12 May 2025", exp: "–", qty: "1 Unit", available: "0 Unit", status: "Sold", value: 2150 },
  { no: "SN-2505-0004", type: "Serial", item: "Blood Pressure Monitor BP-120", wh: "East Warehouse", whCode: "WH-002", mfg: "12 May 2025", exp: "–", qty: "1 Unit", available: "1 Unit", status: "Active", value: 2150 },
  { no: "SN-2505-0005", type: "Serial", item: "Pulse Oximeter PO-55", wh: "South Warehouse", whCode: "WH-004", mfg: "18 Apr 2025", exp: "–", qty: "1 Unit", available: "1 Unit", status: "Active", value: 1450 },
  { no: "SN-2505-0006", type: "Serial", item: "Pulse Oximeter PO-55", wh: "South Warehouse", whCode: "WH-004", mfg: "18 Apr 2025", exp: "–", qty: "1 Unit", available: "0 Unit", status: "Sold", value: 1450 },
]

const summary = [
  { name: "Active", value: 1768, pct: 84.18, color: "var(--color-chart-2)" },
  { name: "Expiring Soon", value: 18, pct: 0.86, color: "var(--color-chart-3)" },
  { name: "Expired", value: 7, pct: 0.33, color: "var(--color-chart-5)" },
  { name: "Sold / Used", value: 305, pct: 14.53, color: "var(--color-muted-foreground)" },
]

const expiring = [
  { no: "BATCH-2504-058", item: "Amoxicillin 500mg Capsule", date: "15 Jun 2025" },
  { no: "BATCH-2504-067", item: "Cefixime 200mg Tablet", date: "20 Jun 2025" },
  { no: "BATCH-2504-077", item: "Vitamin D3 60K Capsule", date: "28 Jun 2025" },
]

const quickActions = ["New Batch", "New Serial", "Import Batch / Serial", "Batch / Serial Report", "Expiry Report", "History"]

const recordTabs = [
  { value: "all", label: "All" },
  { value: "batch", label: "Batch" },
  { value: "serial", label: "Serial" },
  { value: "expiring", label: "Expiring Soon" },
  { value: "expired", label: "Expired" },
] as const

const expiringNos = new Set(expiring.map((e) => e.no))

export function BatchSerialNumbers() {
  const [tab, setTab] = useState<(typeof recordTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return records.filter((r) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "batch" ? r.type === "Batch" :
        tab === "serial" ? r.type === "Serial" :
        tab === "expiring" ? expiringNos.has(r.no) :
        tab === "expired" ? r.status === "Expired" :
        true
      const matchesQuery = !q || r.no.toLowerCase().includes(q) || r.item.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Inventory", href: "/inventory" }, { label: "Batch / Serial Numbers" }]}
        title={<span className="flex items-center gap-2">Batch / Serial Numbers <Info className="text-muted-foreground size-4" /></span>}
        description="Track batch and serial numbers to ensure product traceability and quality control."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import</Button>
            <Button variant="outline">Export <ChevronDown className="size-3.5" /></Button>
            <NewBatchSerialDialog>
              <DialogTrigger asChild>
                <Button>+ New Batch / Serial</Button>
              </DialogTrigger>
            </NewBatchSerialDialog>
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
                <Input placeholder="Search by batch no., serial no., item or reference..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline">All Types <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Items <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Warehouses <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline" size="icon"><List className="size-4" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList>
                {recordTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Batch / Serial No.</th>
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Item</th>
                    <th className="pb-2 font-medium">Warehouse</th>
                    <th className="pb-2 font-medium">Mfg Date</th>
                    <th className="pb-2 font-medium">Expiry Date</th>
                    <th className="pb-2 font-medium">Qty / Units</th>
                    <th className="pb-2 font-medium">Available</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 text-right font-medium">Value (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.no} className="border-b last:border-0">
                      <td className="text-primary py-3 font-medium whitespace-nowrap">{r.no}</td>
                      <td className="py-3"><Badge variant={r.type === "Batch" ? "info" : "secondary"}>{r.type}</Badge></td>
                      <td className="py-3 text-foreground">{r.item}</td>
                      <td className="py-3 whitespace-nowrap">
                        <p className="text-foreground">{r.wh}</p>
                        <p className="text-muted-foreground text-xs">{r.whCode}</p>
                      </td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{r.mfg}</td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{r.exp}</td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{r.qty}</td>
                      <td className={`py-3 whitespace-nowrap ${r.available.startsWith("0") ? "text-destructive" : "text-foreground"}`}>{r.available}</td>
                      <td className="py-3"><StatusBadge status={r.status} /></td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{r.value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={10} className="text-muted-foreground py-8 text-center">No records found for this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {records.length} records</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                  ))}
                  <span className="text-muted-foreground px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">210</Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Batch &amp; Serial Summary</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={summary} total="2,098" totalLabel="Total" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground truncate">{s.name}</span>
                    <span className="ml-auto font-medium whitespace-nowrap text-foreground">{s.value.toLocaleString("en-IN")} ({s.pct}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Expiring Soon</CardTitle>
              <a href="/inventory/batch-serial" className="text-primary text-sm font-medium">View all</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {expiring.map((e) => (
                <div key={e.no} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{e.no}</p>
                    <p className="text-muted-foreground text-xs">{e.item}</p>
                  </div>
                  <Badge variant="warning" className="shrink-0">{e.date}</Badge>
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
