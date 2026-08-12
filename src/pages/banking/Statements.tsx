import { useMemo, useState } from "react"
import { Landmark, ArrowDownCircle, ArrowUpCircle, Wallet, Search, SlidersHorizontal, RefreshCcw, Download, ChevronDown, MoreHorizontal, FileText, FileSpreadsheet, FileDown, ArrowRight } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { inr, MASKED } from "@/lib/format"

const stats = [
  { icon: Landmark, label: "Opening Balance", value: inr(598450, { decimals: true }), sub: "As on 01 May 2025", color: "blue" as const },
  { icon: ArrowDownCircle, label: "Total Money In", value: inr(1265400, { decimals: true }), sub: "12 Transactions", color: "green" as const },
  { icon: ArrowUpCircle, label: "Total Money Out", value: inr(984800, { decimals: true }), sub: "23 Transactions", color: "red" as const },
  { icon: Wallet, label: "Closing Balance", value: inr(879050, { decimals: true }), sub: "As on 31 May 2025", color: "purple" as const },
]

const colorMap: Record<string, string> = {
  blue: "bg-info-bg text-info-foreground",
  green: "bg-success-bg text-success-foreground",
  red: "bg-danger-bg text-danger-foreground",
  purple: "bg-purple-bg text-purple-foreground",
}

const typeColors: Record<string, "purple" | "danger" | "success" | "warning" | "secondary"> = {
  Interest: "purple",
  Payment: "danger",
  Credit: "success",
  Deposit: "warning",
  "Opening Balance": "secondary",
}

const transactions = [
  { date: "31 May 2025", desc: "Interest Credited", sub: "Interest for May 2025", ref: "-", in: 2350, out: 0, balance: 879050, type: "Interest" },
  { date: "31 May 2025", desc: "NEFT to ABC Suppliers Pvt. Ltd.", sub: "Inv. #INV-1250", ref: "NEFT5123 08756", in: 0, out: 25000, balance: 876700, type: "Payment" },
  { date: "30 May 2025", desc: "Tech Solutions", sub: "Payment Received", ref: "IMPS4156239871", in: 78500, out: 0, balance: 901700, type: "Credit" },
  { date: "30 May 2025", desc: "Utility Bill Payment", sub: "Electricity Bill", ref: "UPI/123456789012", in: 0, out: 18750, balance: 823200, type: "Payment" },
  { date: "29 May 2025", desc: "Office Rent", sub: "May 2025", ref: "NEFT5123086453", in: 0, out: 50000, balance: 841950, type: "Payment" },
  { date: "29 May 2025", desc: "ABC Sales Pvt. Ltd.", sub: "Payment Received", ref: "RTGS5123009876", in: 125000, out: 0, balance: 891950, type: "Credit" },
  { date: "28 May 2025", desc: "Cash Deposit", sub: "", ref: "CD9221334455", in: 150000, out: 0, balance: 766950, type: "Deposit" },
  { date: "27 May 2025", desc: "Internet Subscription", sub: "Software / Internet", ref: "UPI/987654321098", in: 0, out: 2499, balance: 616950, type: "Payment" },
  { date: "27 May 2025", desc: "Customer Receipt", sub: "From John Doe", ref: "NEFT5123084562", in: 15000, out: 0, balance: 619449, type: "Credit" },
  { date: "26 May 2025", desc: "Opening Balance", sub: "", ref: "-", in: 0, out: 0, balance: 598450, type: "Opening Balance" },
]

const history = [
  { period: "01 May 2025 - 31 May 2025", date: "31 May 2025, 09:15 AM" },
  { period: "01 Apr 2025 - 30 Apr 2025", date: "30 Apr 2025, 08:40 AM" },
  { period: "01 Mar 2025 - 31 Mar 2025", date: "31 Mar 2025, 07:20 AM" },
]

const byType = Array.from(
  transactions.reduce((m, t) => {
    const cur = m.get(t.type) ?? { count: 0, amount: 0 }
    cur.count += 1
    cur.amount += t.in - t.out
    m.set(t.type, cur)
    return m
  }, new Map<string, { count: number; amount: number }>())
).map(([type, v]) => ({ type, ...v }))

export function Statements() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return transactions.filter((t) => !q || t.desc.toLowerCase().includes(q) || t.ref.toLowerCase().includes(q))
  }, [query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Banking", href: "/banking" }, { label: "Statements" }]}
        title="Statements"
        description="View, download and manage your bank account statements."
      />

      <Card className="mb-5">
        <CardContent className="flex flex-wrap items-center gap-3 pt-5">
          <Button variant="outline" className="gap-2">
            <div className="bg-info-bg text-info-foreground flex size-6 items-center justify-center rounded-md text-[10px] font-bold">H</div>
            Bank Account <span className="text-muted-foreground">HDFC Bank - {MASKED}</span> <ChevronDown className="size-3.5" />
          </Button>
          <Button variant="outline" className="gap-2">Statement Period <span className="text-muted-foreground">01 May 2025 - 31 May 2025</span> <ChevronDown className="size-3.5" /></Button>
          <div className="ml-auto flex gap-2">
            <Button variant="outline"><RefreshCcw className="size-4" /> Refresh</Button>
            <Button variant="outline"><Download className="size-4" /> Download Statement <ChevronDown className="size-3.5" /></Button>
            <Button variant="outline" size="icon"><MoreHorizontal className="size-4" /></Button>
          </div>
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
            <p className="text-muted-foreground text-xs">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <Tabs defaultValue="transactions">
              <TabsList>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="summary">Statement Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="transactions">
                <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative max-w-sm flex-1">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input placeholder="Search transactions..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
                  </div>
                  <div className="flex gap-2 sm:ml-auto">
                    <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                    <Button variant="outline">All Transactions <ChevronDown className="size-3.5" /></Button>
                    <Button variant="outline" size="icon"><Download className="size-4" /></Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground border-b text-left text-xs">
                        <th className="pb-2 font-medium">Date ↓</th>
                        <th className="pb-2 font-medium">Description</th>
                        <th className="pb-2 font-medium">Reference / Cheque No.</th>
                        <th className="pb-2 text-right font-medium">Money In (₹)</th>
                        <th className="pb-2 text-right font-medium">Money Out (₹)</th>
                        <th className="pb-2 text-right font-medium">Balance (₹)</th>
                        <th className="pb-2 font-medium">Transaction Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((t, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="text-muted-foreground py-3 whitespace-nowrap">{t.date}</td>
                          <td className="py-3">
                            <p className="font-medium whitespace-nowrap text-foreground">{t.desc}</p>
                            {t.sub && <p className="text-muted-foreground text-xs">{t.sub}</p>}
                          </td>
                          <td className="text-muted-foreground font-mono text-xs whitespace-nowrap py-3">{t.ref}</td>
                          <td className="text-success-foreground py-3 text-right font-medium whitespace-nowrap">{t.in ? t.in.toLocaleString("en-IN", { minimumFractionDigits: 2 }) : "-"}</td>
                          <td className="text-destructive py-3 text-right font-medium whitespace-nowrap">{t.out ? t.out.toLocaleString("en-IN", { minimumFractionDigits: 2 }) : "-"}</td>
                          <td className="py-3 text-right whitespace-nowrap text-foreground">{t.balance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</td>
                          <td className="py-3"><Badge variant={typeColors[t.type]}>{t.type}</Badge></td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr><td colSpan={7} className="text-muted-foreground py-8 text-center">No transactions found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                  <span>Showing {filtered.length} of {transactions.length} transactions</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((p) => (
                      <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="summary">
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground border-b text-left text-xs">
                        <th className="pb-2 font-medium">Transaction Type</th>
                        <th className="pb-2 text-right font-medium">Count</th>
                        <th className="pb-2 text-right font-medium">Net Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {byType.map((t) => (
                        <tr key={t.type} className="border-b last:border-0">
                          <td className="py-3"><Badge variant={typeColors[t.type]}>{t.type}</Badge></td>
                          <td className="py-3 text-right text-foreground">{t.count}</td>
                          <td className={`py-3 text-right font-medium whitespace-nowrap ${t.amount < 0 ? "text-destructive" : "text-foreground"}`}>{inr(t.amount, { decimals: true })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Statement Details</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Bank Name</span><span className="text-foreground">HDFC Bank</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Account Name</span><span className="text-foreground">Demo Company</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Account Number</span><span className="text-foreground font-mono text-xs">{MASKED}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Account Type</span><span className="text-foreground">Current Account</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Currency</span><span className="text-foreground">INR</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Branch</span><span className="text-foreground">Connaught Place, Delhi</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">IFSC Code</span><span className="text-foreground">HDFC0001234</span></div>
              <a href="/banking/accounts" className="text-primary mt-1 flex items-center gap-1 text-sm font-medium">View Account Details <ArrowRight className="size-3.5" /></a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Download Options</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-1 pb-3">
              <button className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2.5 text-left transition-colors">
                <FileText className="text-destructive size-4" /> <span className="text-sm font-medium text-foreground">Download as PDF</span>
              </button>
              <button className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2.5 text-left transition-colors">
                <FileSpreadsheet className="text-success-foreground size-4" /> <span className="text-sm font-medium text-foreground">Download as Excel</span>
              </button>
              <button className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2.5 text-left transition-colors">
                <FileDown className="text-info-foreground size-4" /> <span className="text-sm font-medium text-foreground">Download as CSV</span>
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Statement History</CardTitle>
              <a href="/banking/accounts" className="text-primary text-sm font-medium">View All</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {history.map((h) => (
                <div key={h.period} className="flex items-center gap-3">
                  <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg text-foreground">
                    <FileText className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{h.period}</p>
                    <p className="text-muted-foreground text-xs">Downloaded on {h.date}</p>
                  </div>
                  <Button variant="ghost" size="icon-sm"><MoreHorizontal className="size-4" /></Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Need Help?</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <p className="text-muted-foreground mb-3 text-sm">Learn more about bank statements and how they work.</p>
              <Button variant="outline" className="w-full">View Help Guide <ArrowRight className="size-3.5" /></Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
