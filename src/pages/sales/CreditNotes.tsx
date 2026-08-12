import { useState } from "react"
import { Receipt, FileCheck2, CheckCircle2, RotateCcw, Search, SlidersHorizontal, Download, ChevronDown, Eye } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewCreditNoteDialog } from "@/components/shared/TransactionDialogs"
import { inr } from "@/lib/format"
import { cn } from "@/lib/utils"

const stats = [
  { icon: Receipt, label: "Total Credit Notes", value: "42", delta: "8.2%", color: "purple" as const },
  { icon: FileCheck2, label: "Value Issued", value: inr(196450), delta: "12.4%", color: "green" as const },
  { icon: CheckCircle2, label: "Active", value: "38", sub: "90.5% of total", color: "green" as const },
  { icon: RotateCcw, label: "Refunded", value: "4", sub: "9.5% of total", color: "orange" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
}

const notes = [
  { no: "CN-2025-0048", customer: "ABC Solutions", issue: "28 May 2025", amount: 5000, status: "Issued", reason: "Product Return" },
  { no: "CN-2025-0047", customer: "TechCorp Ltd.", issue: "27 May 2025", amount: 12500, status: "Issued", reason: "Price Adjustment" },
  { no: "CN-2025-0046", customer: "Global Enterprises", issue: "26 May 2025", amount: 8000, status: "Issued", reason: "Discount" },
  { no: "CN-2025-0045", customer: "Infotech Pvt. Ltd.", issue: "24 May 2025", amount: 15000, status: "Paid", reason: "Return Stock" },
  { no: "CN-2025-0044", customer: "NextGen Systems", issue: "22 May 2025", amount: 7500, status: "Issued", reason: "Damage / Defect" },
  { no: "CN-2025-0043", customer: "Skyline Industries", issue: "20 May 2025", amount: 9200, status: "Refunded", reason: "Overpayment" },
  { no: "CN-2025-0042", customer: "Bright & Co.", issue: "18 May 2025", amount: 6750, status: "Issued", reason: "Price Adjustment" },
  { no: "CN-2025-0041", customer: "Vertex Solutions", issue: "15 May 2025", amount: 4300, status: "Issued", reason: "Product Return" },
  { no: "CN-2025-0040", customer: "Quantum Tech", issue: "12 May 2025", amount: 11000, status: "Paid", reason: "Bundle Change" },
  { no: "CN-2025-0039", customer: "DataSoft Pvt. Ltd.", issue: "10 May 2025", amount: 3250, status: "Issued", reason: "Discount" },
]

const byReason = [
  { label: "Product Return", pct: 40 },
  { label: "Price Adjustment", pct: 25 },
  { label: "Discount", pct: 20 },
  { label: "Overpayment", pct: 9 },
  { label: "Damage / Defect", pct: 6 },
]

const activity = [
  { text: "Credit Note CN-2025-0048 issued", time: "28 May 2025, 10:15 AM" },
  { text: "Credit Note CN-2025-0047 created", time: "27 May 2025, 11:20 AM" },
  { text: "Credit Note CN-2025-0043 refunded", time: "22 May 2025, 09:14 AM" },
]

export function CreditNotes() {
  const [selected, setSelected] = useState(notes[0].no)
  const note = notes.find((n) => n.no === selected)!

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Sales", href: "/sales" }, { label: "Credit Notes" }]}
        title="Credit Notes"
        description="View and manage credit notes for your customers."
        actions={
          <>
            <Button variant="outline">FY 2024-25</Button>
            <Button variant="outline"><SlidersHorizontal className="size-4" /> All Status</Button>
            <NewCreditNoteDialog>
              <DialogTrigger asChild>
                <Button>+ New Credit Note</Button>
              </DialogTrigger>
            </NewCreditNoteDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
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
            {s.delta && <p className="text-success-foreground text-xs font-medium">↑ {s.delta} from last year</p>}
            {s.sub && <p className="text-muted-foreground text-xs">{s.sub}</p>}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search credit notes..." className="pl-9" />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline"><Download className="size-4" /> Export <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Credit Note No.</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notes.map((n) => (
                  <TableRow
                    key={n.no}
                    className={cn("cursor-pointer", selected === n.no && "bg-accent")}
                    onClick={() => setSelected(n.no)}
                  >
                    <TableCell className="text-primary font-medium whitespace-nowrap">{n.no}</TableCell>
                    <TableCell className="text-foreground">{n.customer}</TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{n.issue}</TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{inr(n.amount, { decimals: true })}</TableCell>
                    <TableCell><StatusBadge status={n.status} /></TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{n.reason}</TableCell>
                    <TableCell className="text-right">
                      <Button size="icon-sm" variant="ghost"><Eye className="size-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 10 of 42 results</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((p) => (
                  <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Credit Note Details</CardTitle>
              <a href="/sales/credit-notes" className="text-primary text-sm font-medium">View</a>
            </CardHeader>
            <CardContent className="pb-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-semibold text-foreground">{note.no}</p>
                <StatusBadge status={note.status} />
              </div>
              <dl className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Customer:</dt><dd className="text-foreground">{note.customer}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Amount:</dt><dd className="font-medium text-foreground">{inr(note.amount, { decimals: true })}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Issued On:</dt><dd className="text-foreground">{note.issue}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Reason:</dt><dd className="text-foreground">{note.reason}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Status:</dt><dd className="text-foreground">{note.status}</dd></div>
              </dl>
              <Button variant="outline" className="mt-4 w-full"><Download className="size-4" /> Download</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Credit Notes by Reason</CardTitle>
              <a href="/sales/credit-notes" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {byReason.map((r) => (
                <div key={r.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-foreground">{r.label}</span>
                    <span className="text-muted-foreground">{r.pct}%</span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Activity</CardTitle>
              <a href="/accounting" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {activity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <span className="bg-primary mt-1.5 size-1.5 shrink-0 rounded-full" />
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
    </div>
  )
}
