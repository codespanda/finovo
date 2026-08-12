import { Users, CheckCircle2, Wallet, Receipt, FileStack, Search, SlidersHorizontal, Download, Mail } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DialogTrigger } from "@/components/ui/dialog"
import { EmailPayslipsDialog } from "@/components/shared/PayrollExpenseDialogs"
import { inr } from "@/lib/format"

const payslips = [
  { id: "EMP-1001", name: "Rahul Kapoor", role: "Senior Developer", net: 101050, mode: "Bank Transfer •••• 4567", status: "Paid" },
  { id: "EMP-1002", name: "Anjali Sharma", role: "Marketing Manager", net: 103150, mode: "Bank Transfer •••• 3466", status: "Paid" },
  { id: "EMP-1003", name: "Priya Mehta", role: "Finance Executive", net: 101800, mode: "Bank Transfer •••• 6789", status: "Paid" },
  { id: "EMP-1004", name: "Vikram Singh", role: "Sales Executive", net: 101200, mode: "Bank Transfer •••• 9876", status: "Paid" },
  { id: "EMP-1006", name: "Manish Gupta", role: "Operations Manager", net: 101050, mode: "Bank Transfer •••• 1234", status: "Paid" },
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export function Payslips() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Payroll", href: "/payroll" }, { label: "Pay Slips" }]}
        title="Payslips"
        description="View and download payslips for employees."
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Download All</Button>
            <EmailPayslipsDialog>
              <DialogTrigger asChild>
                <Button><Mail className="size-4" /> Email Payslips</Button>
              </DialogTrigger>
            </EmailPayslipsDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={Users} label="Total Employees" value="128" color="blue" />
        <StatCard icon={FileStack} label="Payslips Generated" value="128" color="green" />
        <StatCard icon={Wallet} label="Total Net Pay" value={inr(1179400)} color="purple" />
        <StatCard icon={Receipt} label="Total Deductions" value={inr(285600)} color="orange" />
        <StatCard icon={CheckCircle2} label="Total Cost" value={inr(1875300)} color="blue" className="col-span-2 lg:col-span-1" />
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input placeholder="Search employee by name or ID..." className="pl-9" />
            </div>
            <Button variant="outline" className="sm:ml-auto"><SlidersHorizontal className="size-4" /> Filters</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead className="text-right">Net Pay</TableHead>
                <TableHead>Payment Mode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payslips.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8"><AvatarFallback className="bg-purple-bg text-purple-foreground">{initials(p.name)}</AvatarFallback></Avatar>
                      <div>
                        <p className="font-medium text-foreground">{p.name}</p>
                        <p className="text-muted-foreground text-xs">{p.role}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{p.id}</TableCell>
                  <TableCell className="text-right font-medium text-foreground">{inr(p.net)}</TableCell>
                  <TableCell className="text-muted-foreground">{p.mode}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="text-muted-foreground mt-4 text-sm">Showing 1 to 5 of 128 results</div>
        </CardContent>
      </Card>
    </div>
  )
}
