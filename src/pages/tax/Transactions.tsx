import { ArrowLeftRight, ArrowDownCircle, ArrowUpCircle, FileText, CheckCircle2, Search, ChevronDown, Filter, Calendar, Upload, Download, MoreVertical } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewTdsTransactionDialog } from "@/components/shared/TaxDialogs"
import { inr, MASKED } from "@/lib/format"

const stats = [
  { icon: ArrowLeftRight, label: "Total Transactions", value: "1,248", sub: "This Financial Year", link: "View summary", color: "green" as const },
  { icon: ArrowDownCircle, label: "Total Deducted", value: inr(12578450), sub: "This Financial Year", link: "View deductions", color: "blue" as const },
  { icon: ArrowUpCircle, label: "Total Deposited", value: inr(11845600), sub: "This Financial Year", link: "View deposits", color: "orange" as const },
  { icon: FileText, label: "Pending Deposits", value: inr(732850), sub: "This Financial Year", link: "View pending", color: "purple" as const },
  { icon: CheckCircle2, label: "Matched Transactions", value: "1,156", sub: "92.62% of total", link: "View matched", color: "green" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  blue: "bg-info-bg text-info-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const typeColors: Record<string, "info" | "purple"> = {
  Payment: "info",
  "Credit Note": "purple",
}

const transactions = [
  { id: "TXN-2505-0001", date: "07 May 2025", type: "Payment", party: "ABC Consultants Pvt. Ltd.", pan: "AAECA1234A", section: "194C", amount: "1,85,500.00", tds: "18,550.00", status: "Deposited", challan: "0510025202505001" },
  { id: "TXN-2505-0002", date: "15 May 2025", type: "Payment", party: "Tech Solutions", pan: "ABCDE5678B", section: "194J", amount: "2,45,000.00", tds: "24,500.00", status: "Deposited", challan: "0510025202505032" },
  { id: "TXN-2505-0003", date: "22 May 2025", type: "Payment", party: "Digital Services", pan: "AAFCD2345C", section: "194C", amount: "1,10,000.00", tds: "11,000.00", status: "Partially Deposited", challan: "0510025202505067" },
  { id: "TXN-2505-0004", date: "30 May 2025", type: "Payment", party: "Creative Minds", pan: "AAICA3456D", section: "194J", amount: "85,000.00", tds: "8,500.00", status: "Pending", challan: null },
  { id: "TXN-2506-0001", date: "05 Jun 2025", type: "Payment", party: "Future Systems", pan: "AAFCF4567E", section: "194C", amount: "1,60,000.00", tds: "16,000.00", status: "Deposited", challan: "0510025202506009" },
  { id: "TXN-2506-0002", date: "15 Jun 2025", type: "Payment", party: "NextGen Softwares", pan: "AAGFN5678F", section: "194J", amount: "2,20,000.00", tds: "22,000.00", status: "Pending", challan: null },
  { id: "TXN-2506-0003", date: "25 Jun 2025", type: "Credit Note", party: "ABC Consultants Pvt. Ltd.", pan: "AAECA1234A", section: "194C", amount: "75,000.00", tds: "7,500.00", status: "Deposited", challan: "0510025202506077" },
  { id: "TXN-2507-0001", date: "07 Jul 2025", type: "Payment", party: "Global Enterprises", pan: "AAGGE6789G", section: "194J", amount: "1,50,000.00", tds: "15,000.00", status: "Pending", challan: null },
  { id: "TXN-2507-0002", date: "15 Jul 2025", type: "Payment", party: "Innovative Tech", pan: "AAHFI7890H", section: "194C", amount: "1,35,750.00", tds: "13,575.00", status: "Partially Deposited", challan: "0510025202507034" },
  { id: "TXN-2507-0003", date: "22 Jul 2025", type: "Payment", party: "Smart Solutions", pan: "AAISS8901I", section: "194J", amount: "1,95,000.00", tds: "19,500.00", status: "Deposited", challan: "0510025202507068" },
]

const summary = [
  { name: "Deposited", value: 1156, pct: 92.62, color: "var(--color-chart-2)" },
  { name: "Partially Deposited", value: 56, pct: 4.49, color: "var(--color-chart-3)" },
  { name: "Pending", value: 36, pct: 2.89, color: "var(--color-chart-5)" },
]

const filters = [
  { label: "Transaction Type", value: "All Types" },
  { label: "Status", value: "All Status" },
  { label: "Section", value: "All Sections" },
  { label: "Challan Status", value: "All" },
]

const quickActions = ["Import Transactions", "Download Transaction Report", "View Pending Deposits", "Challan Mapping"]

export function Transactions() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Tax", href: "/tax" }, { label: "TDS", href: "/tax/tds" }, { label: "Transactions" }]}
        title="Transactions"
        description="View and manage all your TDS transactions."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Export</Button>
            <Button variant="outline"><Upload className="size-4" /> Import Transactions</Button>
            <NewTdsTransactionDialog>
              <DialogTrigger asChild>
                <Button>+ New Transaction</Button>
              </DialogTrigger>
            </NewTdsTransactionDialog>
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
                <a href="/tax/tds/transactions" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search transactions..." className="pl-9" />
                </div>
                <div className="flex flex-wrap gap-2 sm:ml-auto">
                  <Button variant="outline">FY 2025-26 <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Quarters <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Types <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline"><Filter className="size-4" /> Filters</Button>
                  <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="w-8 pb-2"><Checkbox /></th>
                      <th className="pb-2 font-medium">Transaction ID</th>
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 font-medium">Type</th>
                      <th className="pb-2 font-medium">Deductee / Party</th>
                      <th className="pb-2 font-medium">PAN</th>
                      <th className="pb-2 font-medium">Section</th>
                      <th className="pb-2 text-right font-medium">Amount (₹)</th>
                      <th className="pb-2 text-right font-medium">TDS (₹)</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Challan No.</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((t) => (
                      <tr key={t.id} className="border-b last:border-0">
                        <td className="py-3"><Checkbox /></td>
                        <td className="text-foreground py-3 font-mono text-xs whitespace-nowrap">{t.id}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{t.date}</td>
                        <td className="py-3"><Badge variant={typeColors[t.type]}>{t.type}</Badge></td>
                        <td className="text-foreground py-3 whitespace-nowrap">{t.party}</td>
                        <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{MASKED}</td>
                        <td className="text-muted-foreground py-3">{t.section}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{t.amount}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{t.tds}</td>
                        <td className="py-3"><StatusBadge status={t.status} /></td>
                        <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{t.challan ?? "–"}</td>
                        <td className="py-3">
                          <Button size="icon-sm" variant="ghost"><MoreVertical className="size-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 10 of 1,248 transactions</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
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
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Filters</CardTitle>
              <a href="/tax/tds/transactions" className="text-primary text-sm font-medium">Clear All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">From Date</label>
                <Input type="date" defaultValue="2025-04-01" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-foreground">To Date</label>
                <Input type="date" defaultValue="2026-03-31" />
              </div>
              {filters.map((f) => (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-foreground">{f.label}</label>
                  <button className="border-input bg-card flex h-9 w-full items-center justify-between rounded-lg border px-3 text-left text-sm shadow-sm">
                    <span className="text-foreground">{f.value}</span>
                    <ChevronDown className="text-muted-foreground size-3.5" />
                  </button>
                </div>
              ))}
              <Button className="w-full">Apply Filters</Button>
              <Button variant="outline" className="w-full">Reset</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Transaction Summary</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={summary} total="1,248" totalLabel="Total" size={140} />
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
