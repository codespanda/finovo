import { useMemo, useState } from "react"
import { FileText, Percent, MinusCircle, CheckCircle2, Search, SlidersHorizontal, Columns3, LayoutGrid, ChevronDown, Download, Info, Car, Home, Laptop, UtensilsCrossed, Fuel, Gift, Plane, Wrench, GraduationCap, Briefcase, FileBadge2 } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DonutChart } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const stats = [
  { icon: FileText, label: "Total Expenses", value: inr(1245780, { decimals: true }), sub: "100% of expenses", color: "blue" as const },
  { icon: Percent, label: "Tax Deductible", value: inr(963250, { decimals: true }), sub: "77.29% of expenses", trend: "up", color: "info" as const },
  { icon: MinusCircle, label: "Non-deductible", value: inr(282530, { decimals: true }), sub: "22.71% of expenses", trend: "down", color: "purple" as const },
  { icon: CheckCircle2, label: "Potential Savings", value: inr(144487.5, { decimals: true }), sub: "@ 30% tax rate", color: "green" as const },
]

const colorMap: Record<string, string> = {
  blue: "bg-info-bg text-info-foreground",
  info: "bg-info-bg text-info-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  green: "bg-success-bg text-success-foreground",
}

const rows = [
  { name: "Travel & Conveyance", cat: "Travel", section: "Section 37(1)", treatment: "Deductible", amount: 125430, saving: 37629, icon: Car, bg: "bg-info-bg text-info-foreground" },
  { name: "Office Rent", cat: "Rent", section: "Section 37(1)", treatment: "Deductible", amount: 240000, saving: 72000, icon: Home, bg: "bg-warning-bg text-warning-foreground" },
  { name: "Software Subscriptions", cat: "Software", section: "Section 37(1)", treatment: "Deductible", amount: 178950, saving: 53685, icon: Laptop, bg: "bg-purple-bg text-purple-foreground" },
  { name: "Client Entertainment", cat: "Entertainment", section: "Section 37(1)", treatment: "Deductible (Limits Apply)", amount: 68450, saving: 20535, icon: UtensilsCrossed, bg: "bg-danger-bg text-danger-foreground" },
  { name: "Fuel Expenses", cat: "Travel", section: "Section 37(1)", treatment: "Deductible", amount: 94320, saving: 28296, icon: Fuel, bg: "bg-info-bg text-info-foreground" },
  { name: "Employee Gifts", cat: "Gifts", section: "Section 37(1)", treatment: "Non-deductible", amount: 18750, saving: 0, icon: Gift, bg: "bg-danger-bg text-danger-foreground" },
  { name: "Foreign Travel", cat: "Travel", section: "Rule 6D", treatment: "Non-deductible", amount: 115600, saving: 0, icon: Plane, bg: "bg-info-bg text-info-foreground" },
  { name: "Personal Car Expenses", cat: "Motor Car", section: "Rule 6DD", treatment: "Non-deductible", amount: 48760, saving: 0, icon: Wrench, bg: "bg-warning-bg text-warning-foreground" },
  { name: "Staff Training", cat: "Training", section: "Section 37(1)", treatment: "Deductible", amount: 75990, saving: 22797, icon: GraduationCap, bg: "bg-success-bg text-success-foreground" },
  { name: "Professional Fees", cat: "Professional Fees", section: "Section 37(1)", treatment: "Deductible", amount: 135000, saving: 40500, icon: Briefcase, bg: "bg-purple-bg text-purple-foreground" },
]

const treatmentColors: Record<string, "success" | "danger" | "warning"> = {
  Deductible: "success",
  "Deductible (Limits Apply)": "warning",
  "Non-deductible": "danger",
}

const treatmentBreakdown = [
  { name: "Deductible", value: 9632.5, color: "var(--color-chart-2)" },
  { name: "Non-deductible", value: 2825.3, color: "var(--color-chart-5)" },
]

const topDeductible = [
  { name: "Office Rent", amount: 240000, pct: 100 },
  { name: "Software Subscriptions", amount: 178950, pct: 75 },
  { name: "Professional Fees", amount: 135000, pct: 56 },
  { name: "Travel & Conveyance", amount: 125430, pct: 52 },
  { name: "Fuel Expenses", amount: 94320, pct: 39 },
]

const quickActions = ["Download Tax Summary", "Export Deductions Report", "View Form 16", "Add Tax Payment", "Tax Calendar"]

const taxPayments = [
  { label: "Advance Tax (Q1)", date: "15 Jun 2024", amount: 68500, status: "Paid" as const },
  { label: "Advance Tax (Q2)", date: "15 Sep 2024", amount: 68500, status: "Paid" as const },
  { label: "Advance Tax (Q3)", date: "15 Dec 2024", amount: 68500, status: "Paid" as const },
  { label: "Advance Tax (Q4)", date: "15 Mar 2025", amount: 95816, status: "Pending" as const },
]

export function TaxDeductions() {
  const [tab, setTab] = useState("overview")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((r) => {
      const matchesTab =
        tab === "overview" ? true :
        tab === "deductible" ? r.treatment !== "Non-deductible" :
        tab === "non-deductible" ? r.treatment === "Non-deductible" :
        true
      const matchesQuery = !q || r.name.toLowerCase().includes(q) || r.cat.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Expenses", href: "/expenses" }, { label: "Tax & Deductions" }]}
        title="Tax & Deductions"
        description="Track and manage tax applicable expenses and deductions to optimize your tax savings."
        actions={
          <>
            <Button variant="outline">FY 2024-25 (01 Apr 2024 - 31 Mar 2025)</Button>
            <Button variant="outline"><Download className="size-4" /> Export <ChevronDown className="size-3.5" /></Button>
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
            <p className={`text-xs ${s.trend === "up" ? "text-success-foreground" : s.trend === "down" ? "text-destructive" : "text-muted-foreground"}`}>
              {s.trend === "up" && "↑ "}{s.trend === "down" && "↓ "}{s.sub}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="deductible">Deductible Expenses</TabsTrigger>
                <TabsTrigger value="non-deductible">Non-deductible Expenses</TabsTrigger>
                <TabsTrigger value="summary">Tax Deductions Summary</TabsTrigger>
                <TabsTrigger value="form16">Form 16/16A</TabsTrigger>
                <TabsTrigger value="payments">Tax Payments</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative max-w-sm flex-1">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input placeholder="Search by expense, vendor, category..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
                  </div>
                  <div className="flex gap-2 sm:ml-auto">
                    <Button variant="outline"><SlidersHorizontal className="size-4" /> Filters</Button>
                    <Button variant="outline"><Columns3 className="size-4" /> Columns</Button>
                    <Button variant="outline">All Categories <ChevronDown className="size-3.5" /></Button>
                    <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground border-b text-left text-xs">
                        <th className="pb-2 font-medium">Expense / Deduction ↓</th>
                        <th className="pb-2 font-medium">Category</th>
                        <th className="pb-2 font-medium">Type</th>
                        <th className="pb-2 font-medium">Tax Treatment <Info className="inline size-3" /> ↓</th>
                        <th className="pb-2 text-right font-medium">Amount (₹)</th>
                        <th className="pb-2 text-right font-medium">Potential Tax Saving (₹) ↓</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((r) => (
                        <tr key={r.name} className="border-b last:border-0">
                          <td className="py-3">
                            <div className="flex items-center gap-2.5">
                              <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${r.bg}`}>
                                <r.icon className="size-4" />
                              </div>
                              <span className="font-medium whitespace-nowrap text-foreground">{r.name}</span>
                            </div>
                          </td>
                          <td className="text-muted-foreground py-3 whitespace-nowrap">{r.cat}</td>
                          <td className="text-muted-foreground py-3 whitespace-nowrap">{r.section}</td>
                          <td className="py-3"><Badge variant={treatmentColors[r.treatment]}>{r.treatment}</Badge></td>
                          <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(r.amount, { decimals: true })}</td>
                          <td className="py-3 text-right whitespace-nowrap text-foreground">{r.saving ? inr(r.saving, { decimals: true }) : inr(0, { decimals: true })}</td>
                        </tr>
                      ))}
                      {filtered.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-muted-foreground py-8 text-center">No records found for this filter.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                  <span>Showing {filtered.length} of {rows.length} records</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((p) => (
                        <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="deductible">
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground border-b text-left text-xs">
                        <th className="pb-2 font-medium">Expense / Deduction</th>
                        <th className="pb-2 font-medium">Category</th>
                        <th className="pb-2 font-medium">Tax Treatment</th>
                        <th className="pb-2 text-right font-medium">Amount (₹)</th>
                        <th className="pb-2 text-right font-medium">Potential Saving (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.filter((r) => r.treatment !== "Non-deductible").map((r) => (
                        <tr key={r.name} className="border-b last:border-0">
                          <td className="py-3 font-medium whitespace-nowrap text-foreground">{r.name}</td>
                          <td className="text-muted-foreground py-3 whitespace-nowrap">{r.cat}</td>
                          <td className="py-3"><Badge variant={treatmentColors[r.treatment]}>{r.treatment}</Badge></td>
                          <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(r.amount, { decimals: true })}</td>
                          <td className="text-success-foreground py-3 text-right whitespace-nowrap">{inr(r.saving, { decimals: true })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="non-deductible">
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground border-b text-left text-xs">
                        <th className="pb-2 font-medium">Expense / Deduction</th>
                        <th className="pb-2 font-medium">Category</th>
                        <th className="pb-2 font-medium">Section</th>
                        <th className="pb-2 text-right font-medium">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.filter((r) => r.treatment === "Non-deductible").map((r) => (
                        <tr key={r.name} className="border-b last:border-0">
                          <td className="py-3 font-medium whitespace-nowrap text-foreground">{r.name}</td>
                          <td className="text-muted-foreground py-3 whitespace-nowrap">{r.cat}</td>
                          <td className="text-muted-foreground py-3 whitespace-nowrap">{r.section}</td>
                          <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(r.amount, { decimals: true })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="summary">
                <div className="mt-4 flex flex-col gap-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Net Profit Before Tax</span><span className="text-foreground">{inr(1875000)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Deductions</span><span className="text-foreground">{inr(963250)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Taxable Income</span><span className="text-foreground">{inr(911750)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Estimated Tax @ 30%</span><span className="text-foreground">{inr(273526)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Cess &amp; Surcharge</span><span className="text-foreground">{inr(27791)}</span></div>
                  <div className="mt-1 flex justify-between border-t pt-2 font-semibold text-foreground"><span>Total Tax Liability</span><span className="text-success-foreground">{inr(301316)}</span></div>
                </div>
              </TabsContent>

              <TabsContent value="form16">
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <div className="bg-info-bg text-info-foreground flex size-9 shrink-0 items-center justify-center rounded-lg"><FileBadge2 className="size-4" /></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">Form 16 (FY 2024-25)</p>
                      <p className="text-muted-foreground text-xs">TDS certificate for salary income</p>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <div className="bg-purple-bg text-purple-foreground flex size-9 shrink-0 items-center justify-center rounded-lg"><FileBadge2 className="size-4" /></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">Form 16A (Q4 FY 2024-25)</p>
                      <p className="text-muted-foreground text-xs">TDS certificate for non-salary payments</p>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="payments">
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-muted-foreground border-b text-left text-xs">
                        <th className="pb-2 font-medium">Payment</th>
                        <th className="pb-2 font-medium">Due Date</th>
                        <th className="pb-2 text-right font-medium">Amount (₹)</th>
                        <th className="pb-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taxPayments.map((p) => (
                        <tr key={p.label} className="border-b last:border-0">
                          <td className="py-3 font-medium whitespace-nowrap text-foreground">{p.label}</td>
                          <td className="text-muted-foreground py-3 whitespace-nowrap">{p.date}</td>
                          <td className="py-3 text-right whitespace-nowrap text-foreground">{inr(p.amount, { decimals: true })}</td>
                          <td className="py-3"><Badge variant={p.status === "Paid" ? "success" : "warning"}>{p.status}</Badge></td>
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
            <CardHeader><CardTitle>Tax Summary (FY 2024-25)</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Net Profit Before Tax</span><span className="text-foreground">{inr(1875000)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Deductions</span><span className="text-foreground">{inr(963250)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Taxable Income</span><span className="text-foreground">{inr(911750)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Estimated Tax @ 30%</span><span className="text-foreground">{inr(273526)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Cess &amp; Surcharge</span><span className="text-foreground">{inr(27791)}</span></div>
              <div className="mt-1 flex justify-between border-t pt-2 font-semibold text-foreground"><span>Total Tax Liability</span><span className="text-success-foreground">{inr(301316)}</span></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Expenses by Tax Treatment</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart data={treatmentBreakdown} total={inr(1245780)} totalLabel="Total Expenses" size={140} />
              <ul className="flex flex-col gap-2 text-sm">
                <li className="flex items-center gap-2"><span className="bg-chart-2 size-2.5 shrink-0 rounded-full" style={{ background: "var(--color-chart-2)" }} /><span className="text-muted-foreground">Deductible</span></li>
                <li className="pl-4.5 -mt-1 text-xs font-medium text-foreground">{inr(963250)} (77.3%)</li>
                <li className="flex items-center gap-2"><span className="size-2.5 shrink-0 rounded-full" style={{ background: "var(--color-chart-5)" }} /><span className="text-muted-foreground">Non-deductible</span></li>
                <li className="pl-4.5 -mt-1 text-xs font-medium text-foreground">{inr(282530)} (22.7%)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Top Deductible Categories</CardTitle>
              <a href="/expenses/categories" className="text-primary text-sm font-medium">View all categories</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {topDeductible.map((c) => (
                <div key={c.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-foreground">{c.name}</span>
                    <span className="text-muted-foreground">{inr(c.amount)}</span>
                  </div>
                  <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
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
        </div>
      </div>

      <Card className="mt-5">
        <CardContent className="flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
          <p className="text-muted-foreground text-sm">Always keep supporting documents for at least 8 years for tax compliance.</p>
          <a href="/help" className="text-primary text-sm font-medium">Learn more about tax deductions →</a>
        </CardContent>
      </Card>
    </div>
  )
}
