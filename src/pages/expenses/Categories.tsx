import { ClipboardList, Wallet, TrendingUp, AlertTriangle, Search, SlidersHorizontal, Upload, LayoutGrid, ChevronDown, Plane, UtensilsCrossed, Laptop, Car, Package, Megaphone, GraduationCap, Landmark, Scale, HelpCircle } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewCategoryDialog } from "@/components/shared/PayrollExpenseDialogs"
import { inr } from "@/lib/format"

const stats = [
  { icon: ClipboardList, label: "Total Categories", value: "24", sub: "Active categories", color: "purple" as const },
  { icon: Wallet, label: "Total Expenses", value: inr(1245780, { decimals: true }), sub: "This Month", color: "green" as const },
  { icon: TrendingUp, label: "Top Category", value: "Travel", sub: inr(212780, { decimals: true }) + " (17.1%)", color: "orange" as const },
  { icon: AlertTriangle, label: "Uncategorized", value: inr(8450, { decimals: true }), sub: "Needs attention", color: "red" as const },
]

const colorMap: Record<string, string> = {
  purple: "bg-purple-bg text-purple-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
}

const categories = [
  { name: "Travel", type: "Expense", desc: "Business travel expenses including flights, hotels, meals", amount: 212780, pct: 17.1, status: "Active", icon: Plane, bg: "bg-info-bg text-info-foreground" },
  { name: "Meals & Entertainment", type: "Expense", desc: "Client meetings, team lunches, entertainment", amount: 178450, pct: 14.3, status: "Active", icon: UtensilsCrossed, bg: "bg-warning-bg text-warning-foreground" },
  { name: "Software & Subscriptions", type: "Expense", desc: "Software licenses and monthly subscriptions", amount: 152900, pct: 12.3, status: "Active", icon: Laptop, bg: "bg-purple-bg text-purple-foreground" },
  { name: "Transport", type: "Expense", desc: "Local transport, taxi, fuel and parking", amount: 98600, pct: 7.9, status: "Active", icon: Car, bg: "bg-warning-bg text-warning-foreground" },
  { name: "Office Supplies", type: "Expense", desc: "Office stationery, supplies and equipment", amount: 86750, pct: 7.0, status: "Active", icon: Package, bg: "bg-info-bg text-info-foreground" },
  { name: "Marketing", type: "Expense", desc: "Marketing campaigns, ads and promotions", amount: 82300, pct: 6.6, status: "Active", icon: Megaphone, bg: "bg-danger-bg text-danger-foreground" },
  { name: "Training & Development", type: "Expense", desc: "Employee training and development programs", amount: 62400, pct: 5.0, status: "Active", icon: GraduationCap, bg: "bg-success-bg text-success-foreground" },
  { name: "Bank Charges", type: "Expense", desc: "Bank fees, charges and interest", amount: 24780, pct: 2.0, status: "Active", icon: Landmark, bg: "bg-muted text-foreground" },
  { name: "Professional Services", type: "Expense", desc: "Legal, consulting and professional fees", amount: 18960, pct: 1.5, status: "Inactive", icon: Scale, bg: "bg-purple-bg text-purple-foreground" },
  { name: "Uncategorized", type: "System", desc: "Transactions not assigned to any category", amount: 8450, pct: 0.7, status: "Active", icon: HelpCircle, bg: "bg-muted text-foreground" },
]

const overview = [
  { name: "Travel", value: 17.1, color: "var(--color-chart-1)" },
  { name: "Meals & Entertainment", value: 14.3, color: "var(--color-chart-2)" },
  { name: "Software & Subscriptions", value: 12.3, color: "var(--color-chart-4)" },
  { name: "Transport", value: 7.9, color: "var(--color-chart-3)" },
  { name: "Office Supplies", value: 7.0, color: "var(--color-chart-5)" },
  { name: "Others", value: 41.4, color: "var(--color-muted-foreground)" },
]

const topCategories = categories.slice(0, 4).map((c) => ({ name: c.name, amount: c.amount, icon: c.icon, bg: c.bg, pct: (c.amount / categories[0].amount) * 100 }))

const quickActions = ["New Category", "Import Categories", "Export Categories", "View Category Report"]

export function Categories() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Expenses", href: "/expenses" }, { label: "Categories" }]}
        title="Categories"
        description="Create and manage expense categories to organize and track your business expenses."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import Categories</Button>
            <NewCategoryDialog kind="expense">
              <DialogTrigger asChild>
                <Button>+ New Category</Button>
              </DialogTrigger>
            </NewCategoryDialog>
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
            <p className="text-muted-foreground truncate text-xs">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search categories..." className="pl-9" />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                <Button variant="outline">All Types <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category Name ↓</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Total Expenses (This Month)</TableHead>
                  <TableHead className="text-right">% of Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((c) => (
                  <TableRow key={c.name}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
                          <c.icon className="size-4" />
                        </div>
                        <span className="font-medium whitespace-nowrap text-foreground">{c.name}</span>
                      </div>
                    </TableCell>
                    <TableCell><Badge variant={c.type === "System" ? "purple" : "info"}>{c.type}</Badge></TableCell>
                    <TableCell className="text-muted-foreground max-w-[260px] text-xs whitespace-normal">{c.desc}</TableCell>
                    <TableCell className="text-right font-medium whitespace-nowrap text-foreground">{inr(c.amount, { decimals: true })}</TableCell>
                    <TableCell className="text-muted-foreground text-right whitespace-nowrap">{c.pct}%</TableCell>
                    <TableCell><StatusBadge status={c.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 10 of 24 categories</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((p) => (
                  <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Category Overview</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={overview} total={inr(1245780)} totalLabel="Total Expenses" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                {overview.map((c) => (
                  <li key={c.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className="text-muted-foreground truncate">{c.name}</span>
                    <span className="ml-auto font-medium whitespace-nowrap text-foreground">{c.value}%</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Top Categories by Amount</CardTitle>
              <span className="text-muted-foreground text-xs">This Month</span>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-5">
              {topCategories.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${c.bg}`}>
                    <c.icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                    <div className="bg-muted mt-1 h-1 w-full overflow-hidden rounded-full">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold whitespace-nowrap text-foreground">{inr(c.amount, { decimals: true })}</span>
                </div>
              ))}
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

          <Card>
            <CardHeader><CardTitle>Need Help?</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <p className="text-muted-foreground mb-3 text-sm">Learn more about managing categories and best practices.</p>
              <Button variant="outline" className="w-full">View Help Guide</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
