import { useMemo, useState } from "react"
import { Upload, Plus, MoreVertical, Search, SlidersHorizontal } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { AddBankAccountDialog } from "@/components/shared/EntityDialogs"
import { inr } from "@/lib/format"

const accounts = [
  { bank: "HDFC Bank", type: "Business A/c XXXXXXXXX", balance: 425678, updated: "2 mins ago", active: true },
  { bank: "SBI Bank", type: "Current A/c XXXXXXXXX", balance: 185430.5, updated: "5 mins ago" },
  { bank: "Axis Bank", type: "Business A/c XXXXXXXXX", balance: 275000, updated: "1 hour ago" },
  { bank: "ICICI Bank", type: "Current A/c XXXXXXXXX", balance: 95240.25, updated: "3 hours ago" },
]

const transactions = [
  { date: "31 May 2025", desc: "ABC Technologies Pvt. Ltd.", ref: "INV-1023", in: 75000, out: 0, status: "Unmatched" },
  { date: "30 May 2025", desc: "Office Supplies Co.", ref: "BILL-1045", in: 0, out: 12450, status: "Unmatched" },
  { date: "29 May 2025", desc: "Globex Pvt. Ltd.", ref: "INV-1022", in: 45000, out: 0, status: "Matched" },
  { date: "28 May 2025", desc: "Internet Payment", ref: "—", in: 0, out: 1200, status: "Unmatched" },
  { date: "28 May 2025", desc: "John Doe", ref: "PAY-567", in: 25000, out: 0, status: "Matched" },
]

const feedTabs = [
  { value: "feed", label: "Bank Feed" },
  { value: "reconcile", label: "Reconcile (12)" },
  { value: "rules", label: "Rule Matches" },
  { value: "reviewed", label: "Reviewed" },
  { value: "all", label: "All Transactions" },
] as const

export function BankingOverview() {
  const [tab, setTab] = useState<(typeof feedTabs)[number]["value"]>("feed")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return transactions.filter((t) => {
      const matchesTab =
        tab === "all" || tab === "feed" ? true :
        tab === "reconcile" ? t.status === "Unmatched" :
        tab === "reviewed" ? t.status === "Matched" :
        tab === "rules" ? false :
        true
      const matchesQuery = !q || t.desc.toLowerCase().includes(q) || t.ref.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Banking" }]}
        title="Banking Overview"
        description="Manage your bank accounts, view transactions and reconcile accounts."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Upload Statement</Button>
            <AddBankAccountDialog>
              <DialogTrigger asChild>
                <Button><Plus className="size-4" /> Add Bank Account</Button>
              </DialogTrigger>
            </AddBankAccountDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {accounts.map((a) => (
          <Card key={a.bank} className={a.active ? "ring-2 ring-primary/40" : undefined}>
            <CardContent className="pt-5 pb-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="bg-info-bg text-info-foreground flex size-9 items-center justify-center rounded-lg font-bold">
                  {a.bank[0]}
                </div>
                <MoreVertical className="text-muted-foreground size-4" />
              </div>
              <p className="font-semibold text-foreground">{a.bank}</p>
              <p className="text-muted-foreground mb-2 text-xs">{a.type}</p>
              <p className="text-lg font-bold text-foreground">{inr(a.balance, { decimals: true })}</p>
              <p className="text-success-foreground mt-1 text-xs">✓ Updated {a.updated}</p>
            </CardContent>
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
                <Input placeholder="Search transactions..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <Button variant="outline" className="sm:ml-auto"><SlidersHorizontal className="size-4" /> Filters</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead className="text-right">Money In</TableHead>
                  <TableHead className="text-right">Money Out</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((t, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground">{t.date}</TableCell>
                    <TableCell className="text-foreground">{t.desc}</TableCell>
                    <TableCell className="text-muted-foreground">{t.ref}</TableCell>
                    <TableCell className="text-success-foreground text-right font-medium">{t.in ? inr(t.in, { decimals: true }) : "—"}</TableCell>
                    <TableCell className="text-destructive text-right font-medium">{t.out ? inr(t.out, { decimals: true }) : "—"}</TableCell>
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
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Bank Balances</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <ul className="flex flex-col gap-3 text-sm">
                {accounts.map((a) => (
                  <li key={a.bank} className="flex justify-between">
                    <span className="text-muted-foreground">{a.bank}</span>
                    <span className="font-medium text-foreground">{inr(a.balance, { decimals: true })}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t pt-3 text-sm font-semibold text-foreground">
                <span>Total Balance</span>
                <span>{inr(981348.75, { decimals: true })}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Cash Flow Forecast</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart
                data={[
                  { name: "Inflow", value: 60, color: "var(--color-chart-2)" },
                  { name: "Outflow", value: 40, color: "var(--color-chart-5)" },
                ]}
                total={inr(145000)}
                totalLabel="Net Cash Flow"
                size={120}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
