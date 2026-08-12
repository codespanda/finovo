import { useParams } from "react-router-dom"
import { ArrowLeft, Pencil, Mail, Phone, CalendarDays, Download, Eye } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { inr, maskEmail, maskPhone } from "@/lib/format"

const paySlips = [
  { month: "May 2025", gross: 125000, deductions: 23950, net: 101050, date: "31 May 2025" },
  { month: "Apr 2025", gross: 125000, deductions: 22850, net: 102150, date: "30 Apr 2025" },
  { month: "Mar 2025", gross: 123000, deductions: 22300, net: 100700, date: "31 Mar 2025" },
  { month: "Feb 2025", gross: 123000, deductions: 22100, net: 100900, date: "28 Feb 2025" },
]

export function EmployeeProfile() {
  const { id } = useParams()

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Payroll", href: "/payroll" }, { label: "Employees", href: "/payroll/employees" }, { label: id ?? "EMP-1001" }]}
        title="Employee Profile"
        description="View and manage employee details, payroll information, and history."
        actions={
          <>
            <Button variant="outline"><ArrowLeft className="size-4" /> Back to Employees</Button>
            <Button><Pencil className="size-4" /> Edit Employee</Button>
          </>
        }
      />

      <Card className="mb-5">
        <CardContent className="grid grid-cols-1 gap-6 pt-5 md:grid-cols-[auto_1fr_1fr_auto]">
          <div className="flex items-center gap-3">
            <Avatar className="size-14"><AvatarFallback className="bg-purple-bg text-purple-foreground text-lg">RK</AvatarFallback></Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">Rahul Kapoor</p>
                <StatusBadge status="Active" />
              </div>
              <p className="text-muted-foreground text-sm">Senior Developer • {id ?? "EMP-1001"}</p>
              <p className="text-muted-foreground flex items-center gap-1 text-xs"><Mail className="size-3" /> {maskEmail("rahul.kapoor@acme.com")}</p>
              <p className="text-muted-foreground flex items-center gap-1 text-xs"><Phone className="size-3" /> {maskPhone("+91 98765 43210")}</p>
            </div>
          </div>
          <div className="text-sm">
            <p className="text-muted-foreground text-xs">Department</p>
            <p className="mb-2 font-medium text-foreground">Engineering</p>
            <p className="text-muted-foreground text-xs">Location</p>
            <p className="font-medium text-foreground">Delhi, India</p>
          </div>
          <div className="text-sm">
            <p className="text-muted-foreground text-xs">Employment Type</p>
            <p className="mb-2 font-medium text-foreground">Full Time</p>
            <p className="text-muted-foreground flex items-center gap-1 text-xs"><CalendarDays className="size-3" /> Joined</p>
            <p className="font-medium text-foreground">15 Jan 2023</p>
          </div>
          <div className="text-sm md:text-right">
            <p className="text-muted-foreground text-xs">Year to Date (FY 2025)</p>
            <p className="font-semibold text-foreground">Net Pay: {inr(1179400)}</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="salary">Salary Details</TabsTrigger>
          <TabsTrigger value="payslips">Pay Slips</TabsTrigger>
          <TabsTrigger value="deductions">Deductions</TabsTrigger>
          <TabsTrigger value="tax">Tax &amp; Compliance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-5">
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <div className="flex flex-col gap-5 xl:col-span-2">
              <Card>
                <CardHeader><CardTitle>Salary Breakdown</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground text-xs">Earnings</p>
                    <p className="text-success-foreground text-lg font-bold">{inr(125000)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Deductions</p>
                    <p className="text-destructive text-lg font-bold">{inr(23950)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Net Pay</p>
                    <p className="text-lg font-bold text-foreground">{inr(101050)}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex-row items-center justify-between space-y-0">
                  <CardTitle>Recent Pay Slips</CardTitle>
                </CardHeader>
                <CardContent className="pb-5">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">Gross Pay</TableHead>
                        <TableHead className="text-right">Deductions</TableHead>
                        <TableHead className="text-right">Net Pay</TableHead>
                        <TableHead>Paid On</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paySlips.map((p) => (
                        <TableRow key={p.month}>
                          <TableCell className="font-medium text-foreground">{p.month}</TableCell>
                          <TableCell className="text-right text-foreground">{inr(p.gross)}</TableCell>
                          <TableCell className="text-muted-foreground text-right">{inr(p.deductions)}</TableCell>
                          <TableCell className="text-right font-medium text-foreground">{inr(p.net)}</TableCell>
                          <TableCell className="text-muted-foreground">{p.date}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button size="icon-sm" variant="ghost"><Eye className="size-4" /></Button>
                              <Button size="icon-sm" variant="ghost"><Download className="size-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-5">
              <Card>
                <CardHeader><CardTitle>Upcoming Payroll</CardTitle></CardHeader>
                <CardContent className="pb-5">
                  <p className="font-semibold text-foreground">June 2025 Payroll</p>
                  <p className="text-muted-foreground text-sm">Payment Date: 30 Jun 2025</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Quick Links</CardTitle></CardHeader>
                <CardContent className="flex flex-col gap-2 pb-5">
                  <Button variant="outline" className="justify-start"><Download className="size-4" /> Download Form 16</Button>
                  <Button variant="outline" className="justify-start"><Download className="size-4" /> Salary Certificate</Button>
                  <Button variant="outline" className="justify-start"><Download className="size-4" /> Request Document</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="salary" className="mt-5">
          <Card><CardContent className="text-muted-foreground py-10 text-center text-sm">Salary structure and earnings breakdown for {id ?? "this employee"}.</CardContent></Card>
        </TabsContent>
        <TabsContent value="payslips" className="mt-5">
          <Card><CardContent className="text-muted-foreground py-10 text-center text-sm">Full pay slip history for {id ?? "this employee"}.</CardContent></Card>
        </TabsContent>
        <TabsContent value="deductions" className="mt-5">
          <Card><CardContent className="text-muted-foreground py-10 text-center text-sm">Statutory and voluntary deductions for {id ?? "this employee"}.</CardContent></Card>
        </TabsContent>
        <TabsContent value="tax" className="mt-5">
          <Card><CardContent className="text-muted-foreground py-10 text-center text-sm">Tax filings and compliance status for {id ?? "this employee"}.</CardContent></Card>
        </TabsContent>
        <TabsContent value="documents" className="mt-5">
          <Card><CardContent className="text-muted-foreground py-10 text-center text-sm">Documents on file for {id ?? "this employee"}.</CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
