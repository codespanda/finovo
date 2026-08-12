import { Link2, CheckCircle2, Clock, AlertCircle, Filter, Info, ExternalLink, Pencil, MoreVertical, ChevronDown, Download } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewChallanMappingDialog } from "@/components/shared/TaxDialogs"

const stats = [
  { icon: Link2, label: "Total Mappings", value: "128", sub: "All time mappings", link: "View all", color: "green" as const },
  { icon: CheckCircle2, label: "Mapped Challans", value: "96", sub: "75.00% of total", link: "View mapped", color: "blue" as const },
  { icon: Clock, label: "Partially Mapped", value: "20", sub: "15.63% of total", link: "View partial", color: "orange" as const },
  { icon: AlertCircle, label: "Unmapped Challans", value: "12", sub: "9.37% of total", link: "View unmapped", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const mappings = [
  { bsr: "0510025", serial: "0510025202505001", type: "Book Adjustment", date: "07 May 2025", qtr: "Q1", fy: "FY 2025-26", amount: "1,85,500.00", status: "Mapped", mappedOn: "08 May 2025", mappedAt: "10:30 AM" },
  { bsr: "0510025", serial: "0510025202506032", type: "Normal Payment", date: "15 May 2025", qtr: "Q1", fy: "FY 2025-26", amount: "2,45,000.00", status: "Mapped", mappedOn: "16 May 2025", mappedAt: "11:15 AM" },
  { bsr: "0510025", serial: "0510025202506067", type: "Normal Payment", date: "22 May 2025", qtr: "Q1", fy: "FY 2025-26", amount: "95,000.00", status: "Partially Mapped", mappedOn: "23 May 2025", mappedAt: "09:45 AM" },
  { bsr: "0510025", serial: "0510025202505098", type: "Book Adjustment", date: "30 May 2025", qtr: "Q1", fy: "FY 2025-26", amount: "85,000.00", status: "Unmapped", mappedOn: null, mappedAt: null },
  { bsr: "0510025", serial: "0510025202506009", type: "Normal Payment", date: "05 Jun 2025", qtr: "Q1", fy: "FY 2025-26", amount: "1,60,000.00", status: "Mapped", mappedOn: "06 Jun 2025", mappedAt: "02:20 PM" },
  { bsr: "0510025", serial: "0510025202506033", type: "Normal Payment", date: "15 Jun 2025", qtr: "Q2", fy: "FY 2025-26", amount: "0.00", status: "Unmapped", mappedOn: null, mappedAt: null },
  { bsr: "0510025", serial: "0510025202506077", type: "Book Adjustment", date: "25 Jun 2025", qtr: "Q2", fy: "FY 2025-26", amount: "75,000.00", status: "Mapped", mappedOn: "26 Jun 2025", mappedAt: "03:40 PM" },
  { bsr: "0510025", serial: "0510025202507003", type: "Normal Payment", date: "07 Jul 2025", qtr: "Q2", fy: "FY 2025-26", amount: "0.00", status: "Unmapped", mappedOn: null, mappedAt: null },
  { bsr: "0510025", serial: "0510025202507034", type: "Normal Payment", date: "15 Jul 2025", qtr: "Q2", fy: "FY 2025-26", amount: "1,35,750.00", status: "Partially Mapped", mappedOn: "16 Jul 2025", mappedAt: "10:05 AM" },
  { bsr: "0510025", serial: "0510025202507068", type: "Normal Payment", date: "22 Jul 2025", qtr: "Q2", fy: "FY 2025-26", amount: "1,95,000.00", status: "Mapped", mappedOn: "23 Jul 2025", mappedAt: "12:30 PM" },
]

const filters = [
  { label: "Financial Year", value: "FY 2025-26" },
  { label: "Quarter", value: "All Quarters" },
  { label: "Status", value: "All Status" },
  { label: "Challan Type", value: "All Types" },
  { label: "Mapping Status", value: "All" },
]

export function ChallanMapping() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "Challans", href: "/tax/tds/challans" }, { label: "Challan Mappings" }]}
        title="Challan Mappings"
        description="Map your challans with transactions for accurate TDS reconciliation."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Download Mapping Report</Button>
            <NewChallanMappingDialog>
              <DialogTrigger asChild>
                <Button>+ New Mapping</Button>
              </DialogTrigger>
            </NewChallanMappingDialog>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <div className="flex flex-col gap-5 xl:col-span-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
                <a href="/tax/tds/challan-mapping" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="overflow-x-auto pt-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Challan Details</th>
                    <th className="pb-2 font-medium">Transaction Details</th>
                    <th className="pb-2 font-medium">Mapping Details</th>
                    <th className="pb-2 text-right font-medium">Mapped Amount (₹)</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">Mapped On</th>
                    <th className="pb-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mappings.map((m) => (
                    <tr key={m.serial} className="border-b last:border-0">
                      <td className="py-3">
                        <div className="flex gap-6">
                          <div>
                            <p className="text-muted-foreground text-xs">BSR Code</p>
                            <p className="text-foreground whitespace-nowrap">{m.bsr}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Challan Serial No.</p>
                            <p className="text-foreground font-mono text-xs whitespace-nowrap">{m.serial}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-6">
                          <div>
                            <p className="text-muted-foreground text-xs">Type</p>
                            <p className="text-foreground whitespace-nowrap">{m.type}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Date</p>
                            <p className="text-foreground whitespace-nowrap">{m.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-6">
                          <div>
                            <p className="text-muted-foreground text-xs">Quarter</p>
                            <p className="text-foreground whitespace-nowrap">{m.qtr}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">FY</p>
                            <p className="text-foreground whitespace-nowrap">{m.fy}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{m.amount}</td>
                      <td className="py-3"><StatusBadge status={m.status} /></td>
                      <td className="py-3 whitespace-nowrap">
                        {m.mappedOn ? (
                          <>
                            <p className="text-foreground">{m.mappedOn}</p>
                            <p className="text-muted-foreground text-xs">{m.mappedAt}</p>
                          </>
                        ) : (
                          <span className="text-muted-foreground">–</span>
                        )}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          <Button size="sm" variant="outline" className="gap-1">
                            {m.status === "Unmapped" ? "Map Now" : (<><Pencil className="size-3.5" /> Edit</>)}
                          </Button>
                          <Button size="icon-sm" variant="outline"><MoreVertical className="size-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 10 of 128 mappings</span>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
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
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="flex-row items-center gap-2 space-y-0">
              <Filter className="size-4 text-foreground" />
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {filters.map((f) => (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground">{f.label}</label>
                  <button className="border-input bg-card flex h-9 w-full items-center justify-between rounded-lg border px-3 text-left text-sm shadow-sm">
                    <span className="text-foreground">{f.value}</span>
                    <ChevronDown className="text-muted-foreground size-3.5" />
                  </button>
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">From Date</label>
                <Input type="date" placeholder="dd/mm/yyyy" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">To Date</label>
                <Input type="date" placeholder="dd/mm/yyyy" />
              </div>
              <Button className="w-full">Apply Filters</Button>
              <Button variant="outline" className="w-full">Reset</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="mb-1.5 flex items-center gap-2">
                <Info className="text-primary size-4" />
                <span className="text-sm font-semibold text-foreground">Need Help?</span>
              </div>
              <p className="text-muted-foreground mb-2 text-xs">
                Learn how to map challans with transactions for accurate TDS reconciliation.
              </p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">
                View Guide <ExternalLink className="size-3.5" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
