import { BookText, CheckCircle2, FileEdit, IndianRupee, Layers, Search, ChevronDown, Filter, Calendar, Upload, Download, Eye, MoreVertical } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewJournalEntryDialog } from "@/components/shared/NewJournalEntryDialog"
import { inr } from "@/lib/format"

const stats = [
  { icon: BookText, label: "Total Entries", value: "342", sub: "This Financial Year", link: "View all", color: "blue" as const },
  { icon: IndianRupee, label: "Total Debit", value: inr(4875600, { decimals: true }), sub: "This Financial Year", link: "View details", color: "green" as const },
  { icon: IndianRupee, label: "Total Credit", value: inr(4875600, { decimals: true }), sub: "This Financial Year", link: "View details", color: "purple" as const },
  { icon: FileEdit, label: "Draft Entries", value: "8", sub: "Awaiting posting", link: "View drafts", color: "orange" as const },
  { icon: CheckCircle2, label: "Posted Entries", value: "334", sub: "97.66% of total", link: "View posted", color: "green" as const },
]

const colorMap: Record<string, string> = {
  blue: "bg-info-bg text-info-foreground",
  green: "bg-success-bg text-success-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
}

const entries = [
  { no: "JE-2025-0342", date: "31 May 2025", ref: "Depreciation", narration: "Monthly depreciation on fixed assets", debit: 45000, credit: 45000, status: "Posted" },
  { no: "JE-2025-0341", date: "30 May 2025", ref: "Salary Accrual", narration: "Salary payable accrued for May 2025", debit: 825000, credit: 825000, status: "Posted" },
  { no: "JE-2025-0340", date: "29 May 2025", ref: "Prepaid Insurance", narration: "Amortization of prepaid insurance", debit: 12500, credit: 12500, status: "Posted" },
  { no: "JE-2025-0339", date: "28 May 2025", ref: "Bad Debts", narration: "Write-off of doubtful debts - TechCorp", debit: 35000, credit: 35000, status: "Posted" },
  { no: "JE-2025-0338", date: "27 May 2025", ref: "Bank Charges", narration: "Bank charges for RTGS transactions", debit: 1250, credit: 1250, status: "Posted" },
  { no: "JE-2025-0337", date: "26 May 2025", ref: "Opening Balance", narration: "Opening balance adjustment - Petty Cash", debit: 5000, credit: 5000, status: "Draft" },
  { no: "JE-2025-0336", date: "25 May 2025", ref: "Foreign Exchange", narration: "Forex gain/loss on USD invoice settlement", debit: 8750, credit: 8750, status: "Posted" },
  { no: "JE-2025-0335", date: "24 May 2025", ref: "Interest Accrual", narration: "Interest accrued on fixed deposit", debit: 6200, credit: 6200, status: "Draft" },
  { no: "JE-2025-0334", date: "23 May 2025", ref: "GST Adjustment", narration: "ITC reversal for ineligible credit", debit: 18400, credit: 18400, status: "Posted" },
  { no: "JE-2025-0333", date: "22 May 2025", ref: "Reclassification", narration: "Reclassified advance to expense", debit: 95000, credit: 95000, status: "Posted" },
]

const summary = [
  { name: "Posted", value: 334, pct: "97.66%", color: "var(--color-chart-2)" },
  { name: "Draft", value: 8, pct: "2.34%", color: "var(--color-chart-3)" },
]

const topAccounts = [
  { name: "Salaries & Wages", count: 48 },
  { name: "Depreciation Expense", count: 36 },
  { name: "Prepaid Expenses", count: 24 },
  { name: "Bank Charges", count: 20 },
  { name: "GST Input Credit", count: 16 },
]

const quickActions = ["New Journal Entry", "Import Journal Entries", "Recurring Journal Entries", "Journal Approval Rules"]

export function JournalEntries() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Accounting", href: "/accounting" }, { label: "Journal Entries" }]}
        title="Journal Entries"
        description="Record and manage manual journal entries for your books."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import</Button>
            <Button variant="outline"><Download className="size-4" /> Export</Button>
            <NewJournalEntryDialog>
              <DialogTrigger asChild>
                <Button>+ New Journal Entry</Button>
              </DialogTrigger>
            </NewJournalEntryDialog>
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
                <a href="/accounting/journal-entries" className="text-primary flex items-center gap-1 text-xs font-medium">{s.link} →</a>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="pt-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative max-w-sm flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input placeholder="Search entries, reference, narration..." className="pl-9" />
                </div>
                <div className="flex flex-wrap gap-2 sm:ml-auto">
                  <Button variant="outline">FY 2025-26 <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Status <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline">All Accounts <ChevronDown className="size-3.5" /></Button>
                  <Button variant="outline"><Filter className="size-4" /> Filter</Button>
                  <Button variant="outline" size="icon"><Calendar className="size-4" /></Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-muted-foreground border-b text-left text-xs">
                      <th className="pb-2 font-medium">Entry No.</th>
                      <th className="pb-2 font-medium">Date</th>
                      <th className="pb-2 font-medium">Reference</th>
                      <th className="pb-2 font-medium">Narration</th>
                      <th className="pb-2 text-right font-medium">Debit (₹)</th>
                      <th className="pb-2 text-right font-medium">Credit (₹)</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((e) => (
                      <tr key={e.no} className="border-b last:border-0">
                        <td className="text-primary py-3 font-medium whitespace-nowrap">{e.no}</td>
                        <td className="text-muted-foreground py-3 whitespace-nowrap">{e.date}</td>
                        <td className="py-3 whitespace-nowrap text-foreground">{e.ref}</td>
                        <td className="text-muted-foreground max-w-[240px] py-3 whitespace-normal">{e.narration}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(e.debit)}</td>
                        <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(e.credit)}</td>
                        <td className="py-3"><StatusBadge status={e.status} /></td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <Button variant="outline" size="icon-sm"><Eye className="size-4" /></Button>
                            <Button variant="outline" size="icon-sm"><MoreVertical className="size-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span>Showing 1 to 10 of 342 entries</span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="size-8 p-0">«</Button>
                  <Button size="sm" variant="outline" className="size-8 p-0">‹</Button>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                  </div>
                  <span className="px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">35</Button>
                  <Button size="sm" variant="outline" className="size-8 p-0">›</Button>
                  <Button size="sm" variant="outline" className="size-8 p-0">»</Button>
                  <span className="ml-2">Rows per page:</span>
                  <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Entries by Status</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={summary} total="342" totalLabel="Total" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {summary.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="ml-auto font-medium whitespace-nowrap text-foreground">{s.value} ({s.pct})</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Top Accounts Used</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {topAccounts.map((a) => (
                <div key={a.name} className="flex items-center justify-between">
                  <span className="text-foreground text-sm">{a.name}</span>
                  <span className="text-muted-foreground text-sm font-medium">{a.count}</span>
                </div>
              ))}
              <a href="/accounting" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View chart of accounts →</a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col pb-3">
              {quickActions.map((a) => (
                <button key={a} className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2.5 text-left text-sm font-medium text-foreground transition-colors">
                  <Layers className="text-muted-foreground size-4" /> {a}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-muted/40">
            <CardContent className="flex flex-col items-center gap-2 pt-5 pb-5 text-center">
              <div className="bg-success-bg text-success-foreground flex size-9 items-center justify-center rounded-full">?</div>
              <p className="text-sm font-semibold text-foreground">Need Help?</p>
              <p className="text-muted-foreground text-xs">Learn more about journal entries and double-entry bookkeeping.</p>
              <a href="/help" className="text-primary flex items-center gap-1 text-sm font-medium">View User Guide →</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
