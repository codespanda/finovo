import { useMemo, useState } from "react"
import {
  Shuffle,
  CheckCircle2,
  Sparkles,
  DownloadCloud,
  Link2,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Wifi,
  Landmark,
  Zap,
  Receipt,
} from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewRuleDialog } from "@/components/shared/EntityDialogs"
import { MASKED } from "@/lib/format"

const stats = [
  { icon: Shuffle, label: "Total Rules", value: "24", sub: "Across all accounts", color: "purple" as const },
  { icon: CheckCircle2, label: "Active Rules", value: "18", sub: "Currently active", color: "green" as const },
  { icon: Sparkles, label: "Auto Matched (This Month)", value: "1,256", sub: "By active rules", color: "warning" as const },
  { icon: DownloadCloud, label: "Success Rate", value: "98.4%", sub: "Last 30 days", color: "blue" as const },
  { icon: Link2, label: "Manually Matched", value: "32", sub: "This month", color: "red" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  green: "bg-success-bg text-success-foreground",
  warning: "bg-warning-bg text-warning-foreground",
  blue: "bg-info-bg text-info-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const rules = [
  { id: 1, name: "Vendor Payments - ABC", sub: "Payments to ABC Suppliers", cond: 'Description contains "ABC" Amount > ₹0', action: "Match to ABC Suppliers", apply: "HDFC Bank", applyNo: "502000••••••1234", auto: 152, status: "Active", priority: 3, icon: Shuffle, bg: "bg-purple-bg text-purple-foreground" },
  { id: 2, name: "Salary Credits", sub: "Employee salary payments", cond: 'Description contains "SALARY" or "PAYROLL"', action: "Match to Payroll Account", apply: "SBI Bank", applyNo: "345671••••••8901", auto: 98, status: "Active", priority: 2, icon: DownloadCloud, bg: "bg-success-bg text-success-foreground" },
  { id: 3, name: "Utility Payments", sub: "Electricity, Water, Gas, Internet", cond: 'Description contains any of "ELECTRICITY", "WATER", "GAS", "INTERNET"', action: "Match to Utility Expenses", apply: "HDFC Bank", applyNo: "502000••••••1234", auto: 210, status: "Active", priority: 1, icon: Wifi, bg: "bg-info-bg text-info-foreground" },
  { id: 4, name: "Customer Receipts", sub: "Payments from customers", cond: "Transaction Type is Credit Amount > ₹0", action: "Match to Accounts Receivable", apply: "ICICI Bank", applyNo: "123401••••••5678", auto: 325, status: "Active", priority: 3, icon: Receipt, bg: "bg-danger-bg text-danger-foreground" },
  { id: 5, name: "Bank Charges", sub: "Bank fees and charges", cond: 'Description contains "CHARGES" or "FEE"', action: "Match to Bank Charges", apply: "All Accounts", applyNo: "", auto: 176, status: "Active", priority: 1, icon: Landmark, bg: "bg-muted text-foreground" },
  { id: 6, name: "Interest Received", sub: "Interest income", cond: 'Description contains "INTEREST" Transaction Type is Credit', action: "Match to Interest Income", apply: "All Accounts", applyNo: "", auto: 64, status: "Active", priority: 1, icon: Sparkles, bg: "bg-warning-bg text-warning-foreground" },
  { id: 7, name: "Inter Account Transfers", sub: "Transfers between accounts", cond: 'Description contains "TRF" or "TRANSFER"', action: "Exclude From Reconciliation", apply: "All Accounts", applyNo: "", auto: null, status: "Active", priority: 2, icon: Shuffle, bg: "bg-purple-bg text-purple-foreground" },
  { id: 8, name: "Default Rule", sub: "Catch all unmatched transactions", cond: "All other transactions", action: "Create New Bank Transaction", apply: "All Accounts", applyNo: "", auto: 231, status: "Active", priority: 0, icon: Zap, bg: "bg-info-bg text-info-foreground" },
]

const ruleTabs = [
  { value: "all", label: "All Rules" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "system", label: "System Rules" },
] as const

export function Rules() {
  const [selected, setSelected] = useState(rules[0].id)
  const [tab, setTab] = useState<(typeof ruleTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")
  const rule = rules.find((r) => r.id === selected)!

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rules.filter((r) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "active" ? r.status === "Active" :
        tab === "inactive" ? r.status !== "Active" :
        tab === "system" ? r.name === "Default Rule" :
        true
      const matchesQuery = !q || r.name.toLowerCase().includes(q) || r.sub.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Banking", href: "/banking" }, { label: "Rules" }]}
        title="Bank Reconciliation Rules"
        description="Create rules to automatically match and categorize your bank transactions."
        actions={
          <>
            <Button variant="outline">Learn More</Button>
            <NewRuleDialog>
              <DialogTrigger asChild>
                <Button>+ New Rule</Button>
              </DialogTrigger>
            </NewRuleDialog>
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
            <p className="text-muted-foreground text-xs">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
              <TabsList>
                {ruleTabs.map((t) => (
                  <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search rules by name or description..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline">All Accounts</Button>
                <Button variant="outline" size="icon"><List className="size-4" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Conditions</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Apply To</TableHead>
                  <TableHead>Auto Match</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} className="cursor-pointer" onClick={() => setSelected(r.id)}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${r.bg}`}>
                          <r.icon className="size-4" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{r.name}</p>
                          <p className="text-muted-foreground text-xs">{r.sub}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[220px] text-xs whitespace-normal">{r.cond}</TableCell>
                    <TableCell className="text-foreground text-xs whitespace-nowrap">{r.action}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <p className="text-foreground text-xs">{r.apply}</p>
                      {r.applyNo && <p className="text-muted-foreground font-mono text-[11px]">{MASKED}</p>}
                    </TableCell>
                    <TableCell>
                      {r.auto ? <Badge variant="success">{r.auto}</Badge> : <span className="text-muted-foreground">–</span>}
                    </TableCell>
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                    <TableCell>
                      {r.priority > 0 ? (
                        <span className="text-success-foreground text-xs font-medium">{"↑".repeat(r.priority)}</span>
                      ) : (
                        <span className="text-muted-foreground text-xs">Lowest</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">No rules found for this filter.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing {filtered.length} of {rules.length} rules</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Rule Details</CardTitle>
            <StatusBadge status={rule.status} />
          </CardHeader>
          <CardContent className="pb-5">
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${rule.bg}`}>
                <rule.icon className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{rule.name}</p>
                <p className="text-muted-foreground text-xs">{rule.sub}</p>
                <p className="text-muted-foreground text-xs">Created on 15 Apr 2025 by Rahul</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="mb-1 text-sm font-semibold text-foreground">Description</p>
              <p className="text-muted-foreground text-sm">This rule matches all payments made to {rule.apply || "the selected account"} and automatically reconciles them.</p>
            </div>

            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Conditions</p>
                <a href="/banking/rules" className="text-primary text-xs font-medium">Edit</a>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="info">Description contains "ABC"</Badge>
                <Badge variant="secondary">Amount greater than ₹0</Badge>
              </div>
              <a href="/banking/rules" className="text-primary mt-2 flex items-center gap-1 text-xs font-medium">+ Add Condition</a>
            </div>

            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Action</p>
                <a href="/banking/rules" className="text-primary text-xs font-medium">Edit</a>
              </div>
              <p className="text-foreground flex items-center gap-2 text-sm">
                <Landmark className="text-muted-foreground size-4" /> Match to {rule.action.replace("Match to ", "")}
              </p>
            </div>

            <div className="mb-4">
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Apply To</p>
                <a href="/banking/rules" className="text-primary text-xs font-medium">Edit</a>
              </div>
              <p className="text-foreground flex items-center gap-2 text-sm">
                <Landmark className="text-muted-foreground size-4" /> {rule.apply}
              </p>
              {rule.applyNo && <p className="text-muted-foreground ml-6 font-mono text-xs">{MASKED}</p>}
            </div>

            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">Auto Match (This Month)</span>
              <span className="text-foreground font-medium">{rule.auto ?? "–"}</span>
            </div>

            <div className="mb-5 flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">Rule Priority</span>
              <span className="text-success-foreground font-medium">High</span>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Duplicate Rule</Button>
              <Button variant="outline" className="text-destructive flex-1">Deactivate Rule</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
