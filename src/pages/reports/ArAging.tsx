import { Wallet, AlertTriangle, CalendarClock, Hourglass, ShieldAlert, Search, SlidersHorizontal } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DonutChart } from "@/components/shared/charts"
import { inr } from "@/lib/format"

const rows = [
  { customer: "Global Traders", total: 38900, d0: 0, d30: 0, d60: 0, over: 38900 },
  { customer: "Sunrise Industries", total: 44750, d0: 12000, d30: 8000, d60: 5000, over: 19750 },
  { customer: "Webline Consulting", total: 22800, d0: 8400, d30: 6000, d60: 0, over: 8400 },
  { customer: "Office Essentials", total: 21600, d0: 9100, d30: 4600, d60: 3000, over: 4900 },
  { customer: "Tech Solutions Pvt. Ltd.", total: 15600, d0: 6000, d30: 0, d60: 0, over: 9600 },
]

export function ArAging() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Reports", href: "/reports" }, { label: "AR Aging" }]}
        title="AR Aging"
        description="Track outstanding receivables and follow up on overdue payments."
        actions={<Button variant="outline">As on 31 May 2025</Button>}
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={Wallet} label="Total Receivables" value={inr(845230)} delta={{ value: "10.2%" }} color="blue" />
        <StatCard icon={AlertTriangle} label="Overdue Amount" value={inr(152450)} delta={{ value: "8.6%", positive: false }} color="red" />
        <StatCard icon={CalendarClock} label="Current (0-30 Days)" value={inr(423450)} color="green" />
        <StatCard icon={Hourglass} label="31-60 Days" value={inr(120230)} color="orange" />
        <StatCard icon={ShieldAlert} label="Above 90 Days" value={inr(72600)} color="purple" className="col-span-2 lg:col-span-1" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent className="pt-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search customer..." className="pl-9" />
              </div>
              <Button variant="outline" className="sm:ml-auto"><SlidersHorizontal className="size-4" /> Filters</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">0-30 Days</TableHead>
                  <TableHead className="text-right">31-60 Days</TableHead>
                  <TableHead className="text-right">61-90 Days</TableHead>
                  <TableHead className="text-right">Above 90 Days</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.customer}>
                    <TableCell className="font-medium text-foreground">{r.customer}</TableCell>
                    <TableCell className="text-right font-medium text-foreground">{inr(r.total)}</TableCell>
                    <TableCell className="text-muted-foreground text-right">{inr(r.d0)}</TableCell>
                    <TableCell className="text-muted-foreground text-right">{inr(r.d30)}</TableCell>
                    <TableCell className="text-muted-foreground text-right">{inr(r.d60)}</TableCell>
                    <TableCell className="text-destructive text-right font-medium">{inr(r.over)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Aging Summary</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center gap-2 pb-5">
            <DonutChart
              data={[
                { name: "Current (0-30)", value: 50, color: "var(--color-chart-2)" },
                { name: "31-60 Days", value: 14, color: "var(--color-chart-3)" },
                { name: "61-90 Days", value: 10, color: "var(--color-chart-4)" },
                { name: "Above 90 Days", value: 9, color: "var(--color-chart-5)" },
                { name: "Not Due", value: 17, color: "var(--color-chart-1)" },
              ]}
              total={inr(845230)}
              totalLabel="Total"
              size={150}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
