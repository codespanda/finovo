import { FileText, CheckCircle2, Clock, FileBadge2, AlertCircle, Search, ChevronDown, Filter, Calendar, Upload, Download, Pencil, RefreshCw, MoreVertical, Info, ExternalLink, User, Users, ClipboardEdit } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { GenerateFormDialog } from "@/components/shared/TaxFilingDialogs"
import { MASKED } from "@/lib/format"

const stats = [
  { icon: FileText, label: "Total Form 131", value: "86", sub: "This Financial Year", link: "View all", color: "green" as const },
  { icon: CheckCircle2, label: "Generated", value: "64", sub: "74.42% of total", link: "View generated", color: "blue" as const },
  { icon: Clock, label: "Pending Generation", value: "14", sub: "16.28% of total", link: "View pending", color: "orange" as const },
  { icon: FileBadge2, label: "Issued / Downloaded", value: "52", sub: "60.47% of total", link: "View issued", color: "purple" as const },
  { icon: AlertCircle, label: "Correction Required", value: "6", sub: "6.98% of total", link: "View corrections", color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const records = [
  { seller: "Acme Realty Pvt. Ltd.", sellerPan: "AAACA1234A", buyer: "Rahul Mehta", buyerPan: "AABPM1234C", property: "Flat No. 101, Tower A, Green Residency, Mumbai", date: "15 May 2025", amount: "1,25,000.00", status: "Generated", genOn: "18 May 2025", genAt: "11:30 AM" },
  { seller: "Buildwell Developers", sellerPan: "AAICB5678D", buyer: "Neha Kapoor", buyerPan: "AANNK6789K", property: "Shop No. 12, City Mall, Pune, Maharashtra", date: "10 May 2025", amount: "2,45,000.00", status: "Generated", genOn: "12 May 2025", genAt: "09:20 AM" },
  { seller: "Skyline Constructions", sellerPan: "AASCS9876F", buyer: "Amit Sharma", buyerPan: "AABPS3456G", property: "Plot No. 45, Sector 9, Gurgaon, Haryana", date: "08 May 2025", amount: "95,000.00", status: "Pending Generation", genOn: null, genAt: null },
  { seller: "Metro Infra Pvt. Ltd.", sellerPan: "AAACM2468H", buyer: "Priya Verma", buyerPan: "AABPV4321P", property: "Flat No. 502, Maple Heights, Bangalore, Karnataka", date: "22 Apr 2025", amount: "1,10,000.00", status: "Generated", genOn: "24 Apr 2025", genAt: "04:45 PM" },
  { seller: "Urban Spaces LLP", sellerPan: "AAAUL1357J", buyer: "Vikram Singh", buyerPan: "AABVS9876L", property: "Flat No. 204, Lotus, Hyderabad, Telangana", date: "18 Apr 2025", amount: "85,000.00", status: "Issued", genOn: "20 Apr 2025", genAt: "10:15 AM" },
  { seller: "Prime Estates", sellerPan: "AAACP8642K", buyer: "Sneha Iyer", buyerPan: "AABSI2468M", property: "Villa No. 7, Palm Grove, Chennai, Tamil Nadu", date: "05 Apr 2025", amount: "1,95,000.00", status: "Correction Required", genOn: null, genAt: null },
  { seller: "Landmark Projects", sellerPan: "AALPZ8876P", buyer: "Manoj Tiwari", buyerPan: "AABMT1357N", property: "Plot No. 78, Sector 15, Noida, Uttar Pradesh", date: "01 Apr 2025", amount: "1,50,000.00", status: "Pending Generation", genOn: null, genAt: null },
  { seller: "Galaxy Developers", sellerPan: "AAGXD2391R", buyer: "Ritika Malhotra", buyerPan: "AABRM3579Q", property: "Plot No. 803, Orion, Kolkata, West Bengal", date: "25 Mar 2025", amount: "1,35,750.00", status: "Generated", genOn: "27 Mar 2025", genAt: "03:20 PM" },
  { seller: "Omkar Estates Pvt. Ltd.", sellerPan: "AAACO4412S", buyer: "Karan Patel", buyerPan: "AABKP6642T", property: "Shop No. 03, Central Plaza, Ahmedabad, Gujarat", date: "15 Mar 2025", amount: "75,000.00", status: "Issued", genOn: "17 Mar 2025", genAt: "09:40 AM" },
  { seller: "Heritage Developers", sellerPan: "AAACH5523U", buyer: "Pooja Desai", buyerPan: "AABPD2468V", property: "Flat No. 1201, Heritage City, Jaipur, Rajasthan", date: "10 Mar 2025", amount: "1,20,000.00", status: "Generated", genOn: "12 Mar 2025", genAt: "11:05 AM" },
]

const summary = [
  { name: "Generated", value: 64, pct: 74.42, color: "var(--color-chart-2)" },
  { name: "Issued / Downloaded", value: 52, pct: 60.47, color: "var(--color-chart-1)" },
  { name: "Pending Generation", value: 14, pct: 16.28, color: "var(--color-chart-3)" },
  { name: "Correction Required", value: 6, pct: 6.98, color: "var(--color-chart-5)" },
]

const quickActions = [
  { icon: Download, label: "Download All (FY 2025-26)", sub: "ZIP file of all generated Form 131" },
  { icon: FileText, label: "Download by Quarter", sub: "Choose a quarter to download" },
  { icon: User, label: "Download by Seller / Deductor", sub: "Download for a specific seller" },
  { icon: Users, label: "Download by Buyer / Deductee", sub: "Download for a specific buyer" },
]

const importantActions = [
  { icon: RefreshCw, label: "Generate Pending Form 131", sub: "Generate Form 131 for pending records" },
  { icon: Upload, label: "Bulk Upload Form 131", sub: "Upload Form 131 in bulk" },
  { icon: ClipboardEdit, label: "Correction Request", sub: "Raise correction request for Form 131" },
]

function ActionIcon({ status }: { status: string }) {
  if (status === "Pending Generation") return <RefreshCw className="size-4" />
  if (status === "Correction Required") return <Pencil className="size-4" />
  return <Download className="size-4" />
}

export function Form131() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "Form 131" }]}
        title="Form 131"
        description="View, download and manage Form 131 certificates for TDS on sale of immovable property."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Upload Form 131 (Bulk)</Button>
            <GenerateFormDialog formNo="131">
              <DialogTrigger asChild>
                <Button>+ Generate Form 131</Button>
              </DialogTrigger>
            </GenerateFormDialog>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
        <div className="flex flex-col gap-5 xl:col-span-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
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
                <a href="/tax/tds/form-131" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Button variant="outline">FY 2025-26 <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">All Quarters <ChevronDown className="size-3.5" /></Button>
                <div className="relative max-w-[13rem] flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search seller name or PAN" className="pl-9" />
                </div>
                <div className="relative max-w-[13rem] flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search buyer name or PAN" className="pl-9" />
                </div>
                <Button variant="outline" className="sm:ml-auto">All Status <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="w-8 pb-2"><Checkbox /></th>
                      <th className="pb-2 font-medium">Seller / Deductor <span className="block font-normal normal-case">(PAN)</span></th>
                      <th className="pb-2 font-medium">Buyer / Deductee <span className="block font-normal normal-case">(PAN)</span></th>
                      <th className="pb-2 font-medium">Property Details</th>
                      <th className="pb-2 font-medium">Date of Deduction <span className="block font-normal normal-case">(Section 194-IA)</span></th>
                      <th className="pb-2 text-right font-medium">TDS Amount <span className="block font-normal normal-case">(₹)</span></th>
                      <th className="pb-2 font-medium">Form 131 Status</th>
                      <th className="pb-2 font-medium">Generated On</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="py-3"><Checkbox /></td>
                        <td className="py-3">
                          <p className="font-medium whitespace-nowrap text-foreground">{r.seller}</p>
                          <p className="text-muted-foreground font-mono text-xs whitespace-nowrap">{MASKED}</p>
                        </td>
                        <td className="py-3">
                          <p className="font-medium whitespace-nowrap text-foreground">{r.buyer}</p>
                          <p className="text-muted-foreground font-mono text-xs whitespace-nowrap">{MASKED}</p>
                        </td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.property}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{r.date}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{r.amount}</td>
                        <td className="py-3"><StatusBadge status={r.status} /></td>
                        <td className="py-3 whitespace-nowrap">
                          {r.genOn ? (<><p className="text-foreground">{r.genOn}</p><p className="text-muted-foreground text-xs">{r.genAt}</p></>) : <span className="text-muted-foreground">–</span>}
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-1.5">
                            <Button size="icon-sm" variant="outline"><ActionIcon status={r.status} /></Button>
                            <Button size="icon-sm" variant="ghost"><MoreVertical className="size-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 10 of 86 records</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                    <span className="text-muted-foreground px-1">…</span>
                    <Button size="sm" variant="outline" className="size-8 p-0">9</Button>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Form 131 Summary <span className="text-muted-foreground text-xs font-normal">(FY 2025-26)</span></CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={summary} total="86" totalLabel="Total" size={140} />
              <ul className="w-full text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 py-0.5">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground flex-1 truncate text-xs">{s.name}</span>
                    <span className="text-xs font-medium whitespace-nowrap text-foreground">{s.value} ({s.pct}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-1 pb-3">
              {quickActions.map((a) => (
                <button key={a.label} className="hover:bg-muted -mx-1 flex items-start gap-3 rounded-lg px-1 py-2 text-left transition-colors">
                  <a.icon className="text-primary mt-0.5 size-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{a.label}</p>
                    <p className="text-muted-foreground text-xs">{a.sub}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Important Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-1 pb-3">
              {importantActions.map((a) => (
                <button key={a.label} className="hover:bg-muted -mx-1 flex items-start gap-3 rounded-lg px-1 py-2 text-left transition-colors">
                  <a.icon className="text-primary mt-0.5 size-4 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{a.label}</p>
                    <p className="text-muted-foreground text-xs">{a.sub}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="mb-1.5 flex items-center gap-2">
                <Info className="text-primary size-4" />
                <span className="text-sm font-semibold text-foreground">Need Help?</span>
              </div>
              <p className="text-muted-foreground mb-2 text-xs">
                Learn more about Form 131 generation, eligibility and related processes.
              </p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">
                View User Guide <ExternalLink className="size-3.5" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
