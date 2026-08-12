import { useMemo, useState } from "react"
import {
  CheckCircle2,
  ArrowLeftRight,
  ArrowDownCircle,
  ArrowUpCircle,
  Search,
  SlidersHorizontal,
  Calendar,
  Upload,
  RefreshCcw,
  MoreHorizontal,
  ChevronDown,
  RotateCcw,
  FilePlus2,
  Ban,
  ListChecks,
  Landmark,
  Wifi,
  Zap,
  ArrowRightLeft,
  Wallet,
} from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DonutChart } from "@/components/shared/charts"
import { inr, MASKED } from "@/lib/format"

const stats = [
  { icon: CheckCircle2, label: "Closing Balance (30 May 2025)", value: inr(625450, { decimals: true }), color: "green" as const },
  { icon: ArrowLeftRight, label: "Unreconciled Transactions", value: "47", color: "purple" as const },
  { icon: ArrowDownCircle, label: "In (Money In)", value: inr(2230400, { decimals: true }), color: "green" as const },
  { icon: ArrowUpCircle, label: "Out (Money Out)", value: inr(984800, { decimals: true }), color: "red" as const },
]

const colorMap: Record<string, string> = {
  green: "bg-success-bg text-success-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const transactions = [
  { date: "30 May 2025", desc: "ABC Supplies Pvt. Ltd.", sub: "Bill Payment", ref: "NEFT5123098756", in: 0, out: 25000, status: "Matched", bg: "bg-info-bg", icon: FilePlus2 },
  { date: "30 May 2025", desc: "Tech Solutions", sub: "Payment Received", ref: "IMPS4156239871", in: 78500, out: 0, status: "Matched", bg: "bg-purple-bg", icon: ArrowRightLeft },
  { date: "29 May 2025", desc: "Office Rent", sub: "Rent Payment", ref: "UPI/123456789012", in: 0, out: 50000, status: "Matched", bg: "bg-danger-bg", icon: Landmark },
  { date: "29 May 2025", desc: "State Electricity Board", sub: "Utility Payment", ref: "NBS1230098765", in: 0, out: 18750, status: "Needs Match", bg: "bg-warning-bg", icon: Zap },
  { date: "28 May 2025", desc: "Global Distributors", sub: "Payment Received", ref: "NEFT5123087654", in: 62000, out: 0, status: "Matched", bg: "bg-info-bg", icon: FilePlus2 },
  { date: "28 May 2025", desc: "Internet Subscription", sub: "Software / Internet", ref: "UPI/987654321098", in: 0, out: 2499, status: "Needs Match", bg: "bg-danger-bg", icon: Wifi },
  { date: "27 May 2025", desc: "John Doe", sub: "Payment Received", ref: "IMPS4156231122", in: 15000, out: 0, status: "Matched", bg: "bg-info-bg", icon: FilePlus2 },
  { date: "27 May 2025", desc: "Fee Charges", sub: "Bank Charges", ref: "-", in: 0, out: 590, status: "Auto Matched", bg: "bg-info-bg", icon: FilePlus2 },
  { date: "26 May 2025", desc: "Demo Company", sub: "Transfer to Savings", ref: "TRF5123056677", in: 0, out: 100000, status: "Matched", bg: "bg-info-bg", icon: FilePlus2 },
  { date: "26 May 2025", desc: "Cash Deposit", sub: "Cash Deposit", ref: "CD9221334455", in: 150000, out: 0, status: "Needs Match", bg: "bg-info-bg", icon: FilePlus2 },
]

const matchStatus = [
  { name: "Matched", value: 32, pct: 68.1, color: "var(--color-chart-2)" },
  { name: "Needs Match", value: 10, pct: 21.3, color: "var(--color-chart-3)" },
  { name: "Auto Matched", value: 3, pct: 6.4, color: "var(--color-chart-1)" },
  { name: "Excluded", value: 2, pct: 4.2, color: "var(--color-muted-foreground)" },
]

const quickActions = [
  { icon: ListChecks, label: "Reconcile Account" },
  { icon: FilePlus2, label: "Create Rule" },
  { icon: Ban, label: "Exclude Transaction" },
  { icon: Wallet, label: "Bank Rules" },
]

const activity = [
  { text: "Payment to ABC Supplies matched", time: "30 May 2025, 09:14 AM", icon: CheckCircle2, color: "text-success-foreground" },
  { text: "New transaction imported", time: "30 May 2025, 09:10 AM", icon: ArrowDownCircle, color: "text-info-foreground" },
  { text: "Rule applied: Office Rent", time: "29 May 2025, 06:40 PM", icon: RefreshCcw, color: "text-purple-foreground" },
  { text: "Transaction excluded", time: "29 May 2025, 05:30 PM", icon: Ban, color: "text-destructive" },
]

const feedTabs = [
  { value: "all", label: "All Transactions" },
  { value: "unreconciled", label: "Unreconciled" },
  { value: "needs", label: "Needs Attention" },
  { value: "matched", label: "Matched" },
  { value: "excluded", label: "Excluded" },
] as const

export function BankFeed() {
  const [tab, setTab] = useState<(typeof feedTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return transactions.filter((t) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "unreconciled" ? t.status !== "Matched" && t.status !== "Auto Matched" :
        tab === "needs" ? t.status === "Needs Match" :
        tab === "matched" ? (t.status === "Matched" || t.status === "Auto Matched") :
        tab === "excluded" ? false :
        true
      const matchesQuery = !q || t.desc.toLowerCase().includes(q) || t.ref.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Banking", href: "/banking" }, { label: "Bank Feed" }]}
        title="Bank Feed"
        description="Automatically import and manage your bank transactions."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import <ChevronDown className="size-3.5" /></Button>
            <Button variant="outline" size="icon"><RefreshCcw className="size-4" /></Button>
            <Button variant="outline" size="icon"><MoreHorizontal className="size-4" /></Button>
          </>
        }
      />

      <Card className="mb-5">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-5">
          <Button variant="outline" className="gap-2">
            <div className="bg-info-bg text-info-foreground flex size-6 items-center justify-center rounded-md text-[10px] font-bold">H</div>
            HDFC Bank - {MASKED} <span className="text-muted-foreground">INR Account</span> <ChevronDown className="size-3.5" />
          </Button>
        </CardContent>
      </Card>

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
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList>
                {feedTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search description, amount or reference..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline"><Calendar className="size-4" /> 01 May 2025 - 31 May 2025 <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline">More Filters</Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date ↓</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Reference / Cheque No.</TableHead>
                  <TableHead className="text-right">Money In (₹)</TableHead>
                  <TableHead className="text-right">Money Out (₹)</TableHead>
                  <TableHead>Match Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground whitespace-nowrap">{t.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${t.bg} text-foreground`}>
                          <t.icon className="size-4" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{t.desc}</p>
                          <p className="text-muted-foreground text-xs">{t.sub}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs whitespace-nowrap">{t.ref}</TableCell>
                    <TableCell className="text-success-foreground text-right font-medium whitespace-nowrap">{t.in ? t.in.toLocaleString("en-IN", { minimumFractionDigits: 2 }) : ""}</TableCell>
                    <TableCell className="text-destructive text-right font-medium whitespace-nowrap">{t.out ? t.out.toLocaleString("en-IN", { minimumFractionDigits: 2 }) : ""}</TableCell>
                    <TableCell><StatusBadge status={t.status} /></TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-muted-foreground py-8 text-center">No transactions found for this filter.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {transactions.length} transactions</span>
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
              <CardTitle>Account Summary</CardTitle>
              <a href="/banking/statements" className="text-primary text-sm font-medium">View Statement</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Bank</span><span className="text-foreground">HDFC Bank</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Account Number</span><span className="text-foreground font-mono text-xs">{MASKED}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Account Type</span><span className="text-foreground">Current Account</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Currency</span><span className="text-foreground">INR</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Closing Balance (30 May 2025)</span><span className="font-medium text-foreground">{inr(625450)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Available Balance</span><span className="font-medium text-foreground">{inr(625450)}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Match Status Summary</CardTitle>
              <a href="/banking/reconciliation" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={matchStatus} total="47" totalLabel="Total" size={130} />
              <ul className="flex flex-col gap-2 text-sm">
                {matchStatus.map((s) => (
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
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col pb-3">
              {quickActions.map((a) => (
                <button key={a.label} className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2.5 text-left transition-colors">
                  <div className="bg-info-bg text-info-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
                    <a.icon className="size-4" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-foreground">{a.label}</span>
                  <ChevronDown className="text-muted-foreground -rotate-90 size-4 shrink-0" />
                </button>
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
                  <a.icon className={`size-4 shrink-0 ${a.color}`} />
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
          <p className="text-muted-foreground text-sm">Bank feed is automatically updated every 4 hours. Last updated on 30 May 2025, 09:15 AM.</p>
          <Button variant="outline" className="shrink-0"><RotateCcw className="size-4" /> Refresh Now</Button>
        </CardContent>
      </Card>
    </div>
  )
}
