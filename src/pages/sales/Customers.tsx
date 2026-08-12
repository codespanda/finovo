import { Users, Wallet, AlertTriangle, Clock, Percent, Upload, Plus, Search, SlidersHorizontal } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DialogTrigger } from "@/components/ui/dialog"
import { AddCustomerDialog } from "@/components/shared/EntityDialogs"
import { inr, maskEmail, maskPhone } from "@/lib/format"

const customers = [
  { name: "Acme Corporation", email: "info@acmecorp.com", phone: "+91 98765 43210", receivable: 245000, overdue: 0, status: "Active" },
  { name: "Globex Pvt. Ltd.", email: "accounts@globex.com", phone: "+91 91234 56789", receivable: 125000, overdue: 25000, status: "Active" },
  { name: "Soylent Corp.", email: "finance@soylent.com", phone: "+91 99876 54321", receivable: 120000, overdue: 120000, status: "Overdue" },
  { name: "Initech", email: "billing@initech.com", phone: "+91 87654 32109", receivable: 60000, overdue: 0, status: "Active" },
  { name: "Umbrella Corp.", email: "contact@umbrella.com", phone: "+91 76543 21098", receivable: 85000, overdue: 0, status: "Active" },
  { name: "Stark Industries", email: "finance@stark.com", phone: "+91 95432 10987", receivable: 56000, overdue: 0, status: "Active" },
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export function Customers() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Sales", href: "/sales" }, { label: "Customers" }]}
        title="Customers"
        description="Manage your customers and track outstanding balances."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import</Button>
            <AddCustomerDialog>
              <DialogTrigger asChild>
                <Button><Plus className="size-4" /> Add Customer</Button>
              </DialogTrigger>
            </AddCustomerDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={Users} label="Total Customers" value="128" delta={{ value: "12.5%" }} color="blue" />
        <StatCard icon={Wallet} label="Total Receivable" value={inr(2435678)} delta={{ value: "8.7%" }} color="green" />
        <StatCard icon={AlertTriangle} label="Overdue Amount" value={inr(875432)} delta={{ value: "5.3%", positive: false }} color="red" />
        <StatCard icon={Clock} label="Avg. Days to Pay" value="34 Days" delta={{ value: "4 days", positive: false }} color="orange" />
        <StatCard icon={Percent} label="Credit Limit Used" value="42%" color="purple" className="col-span-2 lg:col-span-1" />
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input placeholder="Search customers..." className="pl-9" />
            </div>
            <Button variant="outline" className="sm:ml-auto"><SlidersHorizontal className="size-4" /> Filters</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Receivable</TableHead>
                <TableHead className="text-right">Overdue</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((c) => (
                <TableRow key={c.name}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8"><AvatarFallback className="bg-info-bg text-info-foreground">{initials(c.name)}</AvatarFallback></Avatar>
                      <span className="text-primary font-medium">{c.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{maskEmail(c.email)}</TableCell>
                  <TableCell className="text-muted-foreground">{maskPhone(c.phone)}</TableCell>
                  <TableCell className="text-right font-medium text-foreground">{inr(c.receivable)}</TableCell>
                  <TableCell className={`text-right font-medium ${c.overdue ? "text-destructive" : "text-muted-foreground"}`}>{inr(c.overdue)}</TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="text-muted-foreground mt-4 text-sm">Showing 1 to 6 of 128 customers</div>
        </CardContent>
      </Card>
    </div>
  )
}
