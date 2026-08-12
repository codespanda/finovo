import { useNavigate } from "react-router-dom"
import { Users, UserCheck, UserMinus, UserX, Network, Upload, Plus, Search, SlidersHorizontal } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DialogTrigger } from "@/components/ui/dialog"
import { AddEmployeeDialog } from "@/components/shared/PayrollExpenseDialogs"
import { maskEmail } from "@/lib/format"

const employees = [
  { id: "EMP-1001", name: "Rahul Kapoor", email: "rahul.kapoor@acme.com", dept: "Engineering", role: "Senior Developer", doj: "15 Jan 2023", status: "Active" },
  { id: "EMP-1002", name: "Anjali Sharma", email: "anjali.sharma@acme.com", dept: "Marketing", role: "Marketing Manager", doj: "10 Feb 2022", status: "Active" },
  { id: "EMP-1003", name: "Priya Mehta", email: "priya.mehta@acme.com", dept: "Finance", role: "Finance Executive", doj: "05 Mar 2023", status: "Active" },
  { id: "EMP-1004", name: "Vikram Singh", email: "vikram.singh@acme.com", dept: "Sales", role: "Sales Executive", doj: "18 Apr 2022", status: "On Leave" },
  { id: "EMP-1005", name: "Manish Gupta", email: "manish.gupta@acme.com", dept: "Operations", role: "Operations Manager", doj: "01 Jul 2021", status: "Active" },
  { id: "EMP-1006", name: "Sneha Shah", email: "sneha.shah@acme.com", dept: "HR", role: "HR Executive", doj: "12 Aug 2022", status: "Active" },
  { id: "EMP-1007", name: "Amit Das", email: "amit.das@acme.com", dept: "Engineering", role: "UI/UX Designer", doj: "22 Sep 2022", status: "Resigned" },
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export function Employees() {
  const navigate = useNavigate()
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Payroll", href: "/payroll" }, { label: "Employees" }]}
        title="Employees"
        description="Manage your organization's employees and their payroll details."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import Employees</Button>
            <AddEmployeeDialog>
              <DialogTrigger asChild>
                <Button><Plus className="size-4" /> Add Employee</Button>
              </DialogTrigger>
            </AddEmployeeDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={Users} label="Total Employees" value="128" color="blue" />
        <StatCard icon={UserCheck} label="Active Employees" value="120" color="green" />
        <StatCard icon={UserMinus} label="On Leave" value="5" color="orange" />
        <StatCard icon={UserX} label="Resigned" value="3" color="red" />
        <StatCard icon={Network} label="Departments" value="8" color="purple" className="col-span-2 lg:col-span-1" />
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input placeholder="Search employee by name, ID or email..." className="pl-9" />
            </div>
            <Button variant="outline" className="sm:ml-auto"><SlidersHorizontal className="size-4" /> Filters</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Date of Joining</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((e) => (
                <TableRow key={e.id} className="cursor-pointer" onClick={() => navigate(`/payroll/employees/${e.id}`)}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8"><AvatarFallback className="bg-purple-bg text-purple-foreground">{initials(e.name)}</AvatarFallback></Avatar>
                      <div>
                        <p className="text-primary font-medium">{e.name}</p>
                        <p className="text-muted-foreground text-xs">{maskEmail(e.email)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{e.id}</TableCell>
                  <TableCell className="text-foreground">{e.dept}</TableCell>
                  <TableCell className="text-foreground">{e.role}</TableCell>
                  <TableCell className="text-muted-foreground">{e.doj}</TableCell>
                  <TableCell><StatusBadge status={e.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="text-muted-foreground mt-4 text-sm">Showing 1 to 7 of 128 results</div>
        </CardContent>
      </Card>
    </div>
  )
}
