import { useMemo, useState } from "react"
import { Landmark, ArrowUpCircle, ArrowDownCircle, FileCheck2, Scale, Search, SlidersHorizontal, Sparkles, RefreshCcw, ChevronDown } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DonutChart } from "@/components/shared/charts"
import { inr, MASKED } from "@/lib/format"

const stats = [
  { icon: Landmark, label: "Statement Balance", value: inr(625450, { decimals: true }), sub: "As on 31 May 2025", color: "blue" as const },
  { icon: ArrowUpCircle, label: "Payments in Transit", value: inr(78500, { decimals: true }), sub: "3 transactions", color: "green" as const },
  { icon: ArrowDownCircle, label: "Receipts in Transit", value: inr(22300, { decimals: true }), sub: "2 transactions", color: "purple" as const },
  { icon: FileCheck2, label: "Books Balance", value: inr(681650, { decimals: true }), sub: "As on 31 May 2025", color: "warning" as const },
  { icon: Scale, label: "Difference", value: inr(0, { decimals: true }), sub: "Reconciled", color: "green" as const },
]

const colorMap: Record<string, string> = {
  blue: "bg-info-bg text-info-foreground",
  green: "bg-success-bg text-success-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  warning: "bg-warning-bg text-warning-foreground",
}

const rows = [
  { checked: true, date: "30 May 2025", statement: "ABC Supplies Pvt. Ltd.", statementRef: "NEFT5123098756", statementAmt: -25000, books: "ABC Supplies Pvt. Ltd.", booksSub: "Bill Payment", booksAmt: -25000, status: "Matched" },
  { checked: true, date: "30 May 2025", statement: "Tech Solutions", statementRef: "IMPS4156239871", statementAmt: 78500, books: "Tech Solutions", booksSub: "Payment Received", booksAmt: 78500, status: "Matched" },
  { checked: true, date: "29 May 2025", statement: "Office Rent", statementRef: "UPI/123456789012", statementAmt: -50000, books: "Office Rent", booksSub: "Rent Payment", booksAmt: -50000, status: "Matched" },
  { checked: true, date: "29 May 2025", statement: "State Electricity Board", statementRef: "NBS1230098765", statementAmt: -18750, books: "State Electricity Board", booksSub: "Utility Payment", booksAmt: -18750, status: "Matched" },
  { checked: true, date: "28 May 2025", statement: "Global Distributors", statementRef: "NEFT5123087654", statementAmt: 62000, books: "Global Distributors", booksSub: "Payment Received", booksAmt: 62000, status: "Matched" },
  { checked: false, date: "28 May 2025", statement: "Internet Subscription", statementRef: "UPI/987654321098", statementAmt: -2499, books: "Internet Subscription", booksSub: "Software / Internet", booksAmt: -2499, status: "Unmatched" },
  { checked: false, date: "26 May 2025", statement: "Demo Company", statementRef: "TRF5123056677", statementAmt: -100000, books: "Demo Company", booksSub: "Transfer to Savings", booksAmt: -100000, status: "Unmatched" },
]

const progress = [
  { name: "Matched", value: 42, pct: 89.4, color: "var(--color-chart-2)" },
  { name: "Unmatched (Bank)", value: 5, pct: 10.6, color: "var(--color-chart-3)" },
  { name: "Unmatched (Books)", value: 0, pct: 0, color: "var(--color-chart-5)" },
]

const history = [
  { month: "April 2025", by: "Reconciled by Rahul", date: "30 Apr 2025" },
  { month: "March 2025", by: "Reconciled by Rahul", date: "31 Mar 2025" },
  { month: "February 2025", by: "Reconciled by Rahul", date: "28 Feb 2025" },
  { month: "January 2025", by: "Reconciled by Rahul", date: "31 Jan 2025" },
]

const reconTabs = [
  { value: "match", label: "Match Transactions" },
  { value: "unmatched-statement", label: "Unmatched Statement (5)" },
  { value: "unmatched-books", label: "Unmatched Books (3)" },
  { value: "summary", label: "Summary" },
] as const

export function Reconciliation() {
  const [checkedRows, setCheckedRows] = useState<Record<number, boolean>>(
    Object.fromEntries(rows.map((r, i) => [i, r.checked]))
  )
  const [tab, setTab] = useState<(typeof reconTabs)[number]["value"]>("match")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows
      .map((r, i) => ({ ...r, i }))
      .filter((r) => {
        const matchesTab = tab === "match" || tab === "summary" ? true : r.status === "Unmatched"
        const matchesQuery = !q || r.statement.toLowerCase().includes(q) || r.books.toLowerCase().includes(q)
        return matchesTab && matchesQuery
      })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Banking", href: "/banking" }, { label: "Reconciliation" }]}
        title="Reconciliation"
        description="Reconcile your bank transactions with your books and ensure accuracy."
        actions={
          <>
            <Button variant="outline">Reconciliation Rules</Button>
            <Button variant="outline">Export</Button>
          </>
        }
      />

      <Card className="mb-5">
        <CardContent className="flex flex-wrap items-center gap-3 pt-5">
          <Button variant="outline" className="gap-2">
            <div className="bg-info-bg text-info-foreground flex size-6 items-center justify-center rounded-md text-[10px] font-bold">H</div>
            HDFC Bank - {MASKED} <span className="text-muted-foreground">INR Account</span> <ChevronDown className="size-3.5" />
          </Button>
          <Button variant="outline" className="gap-2">May 2025 <span className="text-muted-foreground">01 May 2025 - 31 May 2025</span> <ChevronDown className="size-3.5" /></Button>
        </CardContent>
      </Card>

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
                {reconTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search transactions..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <Button variant="outline" className="sm:ml-auto"><SlidersHorizontal className="size-4" /> Filters</Button>
            </div>

            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-4">
                <span className="text-success-foreground flex items-center gap-1.5 font-medium">
                  <span className="bg-success size-2 rounded-full" /> Matched (42) <span className="text-muted-foreground font-normal">{inr(603950, { decimals: true })}</span>
                </span>
                <span className="text-warning-foreground flex items-center gap-1.5 font-medium">
                  <span className="bg-warning size-2 rounded-full" /> Unmatched (5) <span className="text-muted-foreground font-normal">{inr(21500, { decimals: true })}</span>
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm"><Sparkles className="size-3.5" /> Auto Match</Button>
                <Button size="icon-sm" variant="outline"><RefreshCcw className="size-3.5" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="w-8 pb-2"></th>
                    <th className="pb-2 font-medium">Date ↓</th>
                    <th className="pb-2 font-medium">Bank Statement <span className="font-normal">(Money In / Out)</span></th>
                    <th className="pb-2 font-medium">Your Books <span className="font-normal">(Money In / Out)</span></th>
                    <th className="pb-2 font-medium">Match Status</th>
                    <th className="pb-2 text-right font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.i} className="border-b last:border-0">
                      <td className="py-3">
                        <Checkbox
                          checked={checkedRows[r.i]}
                          onCheckedChange={(v) => setCheckedRows((s) => ({ ...s, [r.i]: !!v }))}
                        />
                      </td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{r.date}</td>
                      <td className="py-3">
                        <p className="font-medium text-foreground">{r.statement}</p>
                        <p className="text-muted-foreground font-mono text-xs">{r.statementRef}</p>
                        <p className={`text-xs font-medium ${r.statementAmt < 0 ? "text-destructive" : "text-success-foreground"}`}>
                          {r.statementAmt < 0 ? "-" : ""}{inr(Math.abs(r.statementAmt), { decimals: true })}
                        </p>
                      </td>
                      <td className="py-3">
                        <p className="font-medium text-foreground">{r.books}</p>
                        <p className="text-muted-foreground text-xs">{r.booksSub}</p>
                        <p className={`text-xs font-medium ${r.booksAmt < 0 ? "text-destructive" : "text-success-foreground"}`}>
                          {r.booksAmt < 0 ? "-" : ""}{inr(Math.abs(r.booksAmt), { decimals: true })}
                        </p>
                      </td>
                      <td className="py-3">
                        {r.status === "Matched" ? (
                          <span className="text-success-foreground flex items-center gap-1 text-xs font-medium">✓ Matched ⌄</span>
                        ) : (
                          <span className="text-warning-foreground flex items-center gap-1 text-xs font-medium">⏱ Unmatched</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        {r.status !== "Matched" && <Button size="sm" variant="outline">Match</Button>}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={6} className="text-muted-foreground py-8 text-center">No transactions found for this filter.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {rows.length} transactions</span>
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
            <CardHeader><CardTitle>Reconciliation Summary</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Statement Balance (31 May 2025)</span><span className="text-foreground">{inr(625450)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Add: Payments in Transit</span><span className="text-foreground">{inr(78500)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Less: Receipts in Transit</span><span className="text-foreground">-{inr(22300)}</span></div>
              <div className="mt-1 flex justify-between border-t pt-2 font-medium text-foreground"><span>Adjusted Statement Balance</span><span>{inr(681650)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Books Balance (31 May 2025)</span><span className="text-foreground">{inr(681650)}</span></div>
              <div className="mt-1 flex justify-between border-t pt-2 font-semibold text-foreground"><span>Difference</span><span>{inr(0)}</span></div>
              <div className="bg-success-bg text-success-foreground mt-2 rounded-md px-3 py-2 text-center text-sm font-medium">
                ✓ Your account is fully reconciled!
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Reconciliation Progress</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={progress.filter((p) => p.value > 0)} total="47" totalLabel="Total" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {progress.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="font-medium text-foreground">{s.value} ({s.pct}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Reconciliation</CardTitle>
              <a href="/banking/reconciliation" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {history.map((h) => (
                <div key={h.month} className="flex items-center gap-3">
                  <span className="text-success-foreground text-lg">✓</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{h.month}</p>
                    <p className="text-muted-foreground text-xs">{h.by}</p>
                  </div>
                  <span className="text-muted-foreground text-xs whitespace-nowrap">{h.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-5">
        <CardContent className="flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
          <p className="text-muted-foreground text-sm">Auto match last run on 30 May 2025, 09:15 AM. You can also match transactions manually.</p>
          <Button variant="outline" className="shrink-0"><RefreshCcw className="size-4" /> Re-run Auto Match</Button>
        </CardContent>
      </Card>
    </div>
  )
}
