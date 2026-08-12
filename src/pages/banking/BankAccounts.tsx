import { useMemo, useState } from "react"
import { Landmark, Wallet, ArrowLeftRight, FileWarning, AlertTriangle, Search, SlidersHorizontal, Upload, LayoutGrid, ChevronDown, X } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { AddBankAccountDialog } from "@/components/shared/EntityDialogs"
import { inr, MASKED } from "@/lib/format"

const stats = [
  { icon: Landmark, label: "Total Accounts", value: "8", sub: "Active bank accounts", color: "blue" as const },
  { icon: Wallet, label: "Total Balance (INR)", value: inr(1875300, { decimals: true }), sub: "In all accounts", color: "green" as const },
  { icon: ArrowLeftRight, label: "In / Out This Month", value: inr(1245600, { decimals: true }), sub: null, color: "purple" as const },
  { icon: FileWarning, label: "Unreconciled Transactions", value: "47", sub: "Across all accounts", color: "orange" as const },
  { icon: AlertTriangle, label: "Low Balance Alerts", value: "2", sub: "Accounts need attention", color: "red" as const },
]

const colorMap: Record<string, string> = {
  blue: "bg-info-bg text-info-foreground",
  green: "bg-success-bg text-success-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const accounts = [
  { name: "HDFC Current Account", primary: true, no: "502000••••••1234", bank: "HDFC Bank Ltd.", branch: "Connaught Place, Delhi", type: "Current", currency: "INR", balance: 625450, status: "Active", bg: "bg-info-bg", emoji: "🏦" },
  { name: "SBI Business Account", no: "345671••••••8901", bank: "State Bank of India", branch: "MG Road, Bangalore", type: "Current", currency: "INR", balance: 380120.5, status: "Active", bg: "bg-info-bg", emoji: "🏛️" },
  { name: "ICICI Savings Account", no: "123401••••••5678", bank: "ICICI Bank Ltd.", branch: "Bandra West, Mumbai", type: "Savings", currency: "INR", balance: 275300, status: "Active", bg: "bg-warning-bg", emoji: "🧾" },
  { name: "Axis Salary Account", no: "918273••••••6453", bank: "Axis Bank Ltd.", branch: "Sector 17, Chandigarh", type: "Savings", currency: "INR", balance: 195840.3, status: "Active", bg: "bg-purple-bg", emoji: "🏦" },
  { name: "Kotak 811 Account", no: "811170••••••1122", bank: "Kotak Mahindra Bank", branch: "Indiranagar, Bangalore", type: "Savings", currency: "INR", balance: 85620, status: "Active", bg: "bg-danger-bg", emoji: "🔴" },
  { name: "HDFC USD Account", no: "502000••••••4321", bank: "HDFC Bank Ltd.", branch: "Connaught Place, Delhi", type: "Current", currency: "USD", balance: 4250, status: "Active", bg: "bg-info-bg", emoji: "💳" },
  { name: "Amex Corporate Card", no: "371234••••••1001", bank: "American Express", branch: "Corporate Card", type: "Credit Card", currency: "INR", balance: -125300, status: "Active", bg: "bg-info-bg", emoji: "💳" },
  { name: "IndusInd Overdraft", no: "650046••••••7890", bank: "IndusInd Bank", branch: "HSR Layout, Bangalore", type: "Overdraft", currency: "INR", balance: -65000, status: "Active (Limit)", bg: "bg-danger-bg", emoji: "🏦" },
]

const byCurrency = [
  { name: "INR", value: 76.5, color: "var(--color-chart-2)" },
  { name: "USD", value: 18.9, color: "var(--color-chart-1)" },
  { name: "Others", value: 4.6, color: "var(--color-chart-3)" },
]

const currencyAmounts: Record<string, number> = { INR: 1437330, USD: 354700, Others: 83270 }

const topAccounts = [
  { name: "HDFC Current Account", amount: 625450, pct: 100, bg: "bg-info-bg", emoji: "🏦" },
  { name: "SBI Business Account", amount: 380120.5, pct: 61, bg: "bg-info-bg", emoji: "🏛️" },
  { name: "ICICI Savings Account", amount: 275300, pct: 44, bg: "bg-warning-bg", emoji: "🧾" },
  { name: "Axis Salary Account", amount: 195840.3, pct: 31, bg: "bg-purple-bg", emoji: "🏦" },
  { name: "Kotak 811 Account", amount: 85620, pct: 14, bg: "bg-danger-bg", emoji: "🔴" },
]

const activities = [
  { text: "Statement imported for HDFC Current Account", time: "30 May 2025, 10:30 AM", color: "text-success-foreground" },
  { text: "New transaction matched in SBI Business Account", time: "30 May 2025, 09:15 AM", color: "text-info-foreground" },
  { text: "Low balance alert for Kotak 811 Account", time: "29 May 2025, 06:45 PM", color: "text-warning-foreground" },
  { text: "Statement imported for ICICI Savings Account", time: "29 May 2025, 04:20 PM", color: "text-success-foreground" },
]

const accountTabs = [
  { value: "all", label: "All Accounts" },
  { value: "checking", label: "Checking Accounts" },
  { value: "savings", label: "Savings Accounts" },
  { value: "cards", label: "Credit Cards" },
  { value: "inactive", label: "Inactive Accounts" },
] as const

export function BankAccounts() {
  const [tab, setTab] = useState<(typeof accountTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return accounts.filter((a) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "checking" ? a.type === "Current" :
        tab === "savings" ? a.type === "Savings" :
        tab === "cards" ? a.type === "Credit Card" :
        tab === "inactive" ? !a.status.startsWith("Active") :
        true
      const matchesQuery = !q || a.name.toLowerCase().includes(q) || a.bank.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Banking", href: "/banking" }, { label: "Bank Accounts" }]}
        title="Bank Accounts"
        description="Manage all your bank accounts and track account balances in real-time."
        actions={
          <>
            <Button variant="outline">All Currencies</Button>
            <Button variant="outline"><SlidersHorizontal className="size-4" /> Account Type</Button>
            <AddBankAccountDialog>
              <DialogTrigger asChild>
                <Button>+ Add Bank Account</Button>
              </DialogTrigger>
            </AddBankAccountDialog>
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
            {s.sub ? (
              <p className="text-muted-foreground text-xs">{s.sub}</p>
            ) : (
              <p className="text-xs">
                <span className="text-success-foreground font-medium">In: {inr(2230400, { decimals: true })}</span>{" "}
                <span className="text-destructive font-medium">Out: {inr(984800, { decimals: true })}</span>
              </p>
            )}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList>
                {accountTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search by account name or number..." className="pr-9 pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
                {query && (
                  <button type="button" onClick={() => setQuery("")} className="absolute top-1/2 right-3 -translate-y-1/2">
                    <X className="text-muted-foreground size-3.5" />
                  </button>
                )}
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline"><Upload className="size-4" /> Import Statement</Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account Name ↓</TableHead>
                  <TableHead>Account Number ↓</TableHead>
                  <TableHead>Bank / Branch</TableHead>
                  <TableHead>Account Type</TableHead>
                  <TableHead>Currency ↓</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((a) => (
                  <TableRow key={a.name}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-sm ${a.bg}`}>{a.emoji}</div>
                        <div>
                          <p className="font-medium text-foreground">{a.name}</p>
                          {a.primary && <Badge variant="info" className="mt-0.5">Primary</Badge>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono text-xs whitespace-nowrap">{MASKED}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <p className="text-foreground">{a.bank}</p>
                      <p className="text-muted-foreground text-xs">{a.branch}</p>
                    </TableCell>
                    <TableCell><Badge variant="secondary">{a.type}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{a.currency}</TableCell>
                    <TableCell className={`text-right font-medium whitespace-nowrap ${a.balance < 0 ? "text-destructive" : "text-success-foreground"}`}>
                      {a.balance < 0 ? "-" : ""}{a.currency === "USD" ? "$" : "₹"}{Math.abs(a.balance).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell><StatusBadge status={a.status} /></TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">No accounts found for this filter.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {accounts.length} results</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <Button size="sm" variant="default" className="size-8 p-0">1</Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1">10 / page <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Balance by Currency</CardTitle>
              <a href="/reports/balance-sheet" className="text-primary text-sm font-medium">View Report</a>
            </CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={byCurrency} total={inr(1875300)} totalLabel="Total Balance" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {byCurrency.map((c) => (
                  <li key={c.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className="text-muted-foreground">{c.name}</span>
                    <span className="font-medium text-foreground">{inr(currencyAmounts[c.name])} ({c.value}%)</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Top Accounts by Balance</CardTitle>
              <a href="/banking/accounts" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {topAccounts.map((a) => (
                <div key={a.name} className="flex items-center gap-3">
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-sm ${a.bg}`}>{a.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{a.name}</p>
                    <div className="bg-muted mt-1 h-1 w-full overflow-hidden rounded-full">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${a.pct}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold whitespace-nowrap text-foreground">{inr(a.amount, { decimals: true })}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Account Activity</CardTitle>
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
          <p className="text-muted-foreground text-sm">Keep your bank accounts updated to get real-time balances and accurate reports.</p>
          <Button variant="outline" className="shrink-0">Learn More</Button>
        </CardContent>
      </Card>
    </div>
  )
}
