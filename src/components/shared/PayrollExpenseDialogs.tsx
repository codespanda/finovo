import { useMemo, useState, type ReactNode } from "react"
import { Receipt, FolderPlus, Workflow, Route, PlayCircle, UserPlus2, Mail, Plus, Trash2, Upload } from "lucide-react"

import { FormDialog, Field } from "@/components/shared/FormDialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { inr } from "@/lib/format"

export function NewExpenseClaimDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Receipt}
      iconBg="bg-purple-bg text-purple-foreground"
      title="New Expense Claim"
      description="Submit a business expense for reimbursement approval."
      primaryLabel="Submit for Approval"
      secondaryLabel="Save as Draft"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Category">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="meals">Meals & Entertainment</SelectItem>
              <SelectItem value="office-supplies">Office Supplies</SelectItem>
              <SelectItem value="software">Software & Subscriptions</SelectItem>
              <SelectItem value="lodging">Lodging</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Amount"><Input type="number" placeholder="0.00" /></Field>
        <Field label="Expense Date"><Input type="date" defaultValue="2025-05-31" /></Field>
        <Field label="Merchant / Vendor"><Input placeholder="e.g. Uber, Café Coffee Day" /></Field>
        <Field label="Payment Mode">
          <Select defaultValue="personal">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal (Reimbursable)</SelectItem>
              <SelectItem value="company-card">Company Card</SelectItem>
              <SelectItem value="cash">Cash Advance</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Project (optional)">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Link to a project" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="website-revamp">Website Revamp</SelectItem>
              <SelectItem value="client-onboarding">Client Onboarding</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Description"><Textarea placeholder="What was this expense for?" rows={2} /></Field>
      <Field label="Receipt">
        <button type="button" className="hover:bg-muted flex w-full items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-sm text-muted-foreground transition-colors">
          <Upload className="size-4" /> Click to upload receipt (PDF, JPG, PNG)
        </button>
      </Field>
    </FormDialog>
  )
}

export function NewCategoryDialog({ children, kind = "expense" }: { children: ReactNode; kind?: "expense" | "inventory" }) {
  const isExpense = kind === "expense"
  return (
    <FormDialog
      icon={FolderPlus}
      iconBg="bg-info-bg text-info-foreground"
      title="New Category"
      description={isExpense ? "Create a category to organize and track expenses." : "Create a category to organize your inventory items."}
      primaryLabel="Save Category"
      trigger={children}
    >
      <Field label="Category Name"><Input placeholder={isExpense ? "e.g. Travel & Transport" : "e.g. Electronics"} /></Field>
      <Field label="Parent Category">
        <Select defaultValue="none">
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None (Top level)</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      {isExpense ? (
        <Field label="Monthly Budget Limit (optional)"><Input type="number" placeholder="0.00" /></Field>
      ) : (
        <Field label="Default Reorder Level"><Input type="number" placeholder="0" /></Field>
      )}
      <Field label="Description"><Textarea placeholder="Add a short description (optional)..." rows={2} /></Field>
    </FormDialog>
  )
}

let stageId = 0
function newStage() {
  stageId += 1
  return { id: stageId, approver: "", threshold: "" }
}

export function NewWorkflowDialog({ children }: { children: ReactNode }) {
  const [stages, setStages] = useState([newStage(), newStage()])

  function updateStage(id: number, patch: Partial<(typeof stages)[number]>) {
    setStages((s) => s.map((st) => (st.id === id ? { ...st, ...patch } : st)))
  }
  function removeStage(id: number) {
    setStages((s) => (s.length > 1 ? s.filter((st) => st.id !== id) : s))
  }

  return (
    <FormDialog
      icon={Workflow}
      iconBg="bg-success-bg text-success-foreground"
      title="New Approval Workflow"
      description="Define a multi-stage approval flow for expense claims."
      primaryLabel="Create Workflow"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Workflow Name"><Input placeholder="e.g. Standard Expense Approval" /></Field>
        <Field label="Applies To">
          <Select defaultValue="all">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Expense Claims</SelectItem>
              <SelectItem value="travel">Travel Expenses</SelectItem>
              <SelectItem value="above-threshold">Claims Above ₹10,000</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">Approval Stages</label>
          <Button variant="outline" size="sm" onClick={() => setStages((s) => [...s, newStage()])}>
            <Plus className="size-3.5" /> Add Stage
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {stages.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 rounded-lg border p-2.5">
              <Badge variant="secondary" className="shrink-0">Stage {i + 1}</Badge>
              <Select value={s.approver} onValueChange={(v) => updateStage(s.id, { approver: v })}>
                <SelectTrigger className="h-9 w-full"><SelectValue placeholder="Approver role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Reporting Manager</SelectItem>
                  <SelectItem value="finance">Finance Team</SelectItem>
                  <SelectItem value="director">Director</SelectItem>
                  <SelectItem value="hr">HR Manager</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Above ₹"
                type="number"
                className="w-28 shrink-0"
                value={s.threshold}
                onChange={(e) => updateStage(s.id, { threshold: e.target.value })}
              />
              <button onClick={() => removeStage(s.id)} disabled={stages.length <= 1} className="text-muted-foreground hover:text-destructive shrink-0 disabled:opacity-30">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </FormDialog>
  )
}

export function AddMileageDialog({ children }: { children: ReactNode }) {
  const [distance, setDistance] = useState("")
  const [rate, setRate] = useState("12")
  const amount = (parseFloat(distance) || 0) * (parseFloat(rate) || 0)

  return (
    <FormDialog
      icon={Route}
      iconBg="bg-success-bg text-success-foreground"
      title="Add Mileage"
      description="Log a business trip to claim mileage reimbursement."
      primaryLabel="Submit Mileage"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Trip Date"><Input type="date" defaultValue="2025-05-31" /></Field>
        <Field label="Vehicle Type">
          <Select defaultValue="car">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="car">Car</SelectItem>
              <SelectItem value="bike">Two-Wheeler</SelectItem>
              <SelectItem value="own-vehicle">Own Vehicle</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="From Location"><Input placeholder="e.g. Office, Bengaluru" /></Field>
        <Field label="To Location"><Input placeholder="e.g. Client Site, Whitefield" /></Field>
        <Field label="Distance (km)">
          <Input type="number" placeholder="0" value={distance} onChange={(e) => setDistance(e.target.value)} />
        </Field>
        <Field label="Rate per km (₹)">
          <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
      </div>
      <Field label="Purpose"><Textarea placeholder="Reason for the trip..." rows={2} /></Field>
      <div className="bg-muted flex items-center justify-between rounded-lg p-3 text-sm">
        <span className="text-muted-foreground">Reimbursement Amount</span>
        <span className="font-semibold text-foreground">{inr(amount, { decimals: true })}</span>
      </div>
    </FormDialog>
  )
}

const departments = ["Engineering", "Sales & Marketing", "Finance", "HR", "Operations"]

export function RunPayrollDialog({ children }: { children: ReactNode }) {
  const [scope, setScope] = useState("all")

  return (
    <FormDialog
      icon={PlayCircle}
      iconBg="bg-success-bg text-success-foreground"
      title="Run Payroll"
      description="Process payroll for the selected pay period and employees."
      primaryLabel="Run Payroll"
      secondaryLabel="Save as Draft"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Pay Period">
          <Select defaultValue="may-2025">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="may-2025">May 2025</SelectItem>
              <SelectItem value="jun-2025">June 2025</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Payment Date"><Input type="date" defaultValue="2025-05-31" /></Field>
        <Field label="Employee Scope">
          <Select value={scope} onValueChange={setScope}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees (128)</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Payment Method">
          <Select defaultValue="bank">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="bank">Bank Transfer</SelectItem>
              <SelectItem value="cheque">Cheque</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-3 rounded-lg border p-3 text-sm">
        <div>
          <p className="text-muted-foreground text-xs">Employees</p>
          <p className="font-semibold text-foreground">{scope === "all" ? 128 : Math.floor(Math.random() * 30) + 10}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Gross Pay</p>
          <p className="font-semibold text-foreground">{inr(1875300)}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-xs">Net Pay</p>
          <p className="font-semibold text-foreground">{inr(1179400)}</p>
        </div>
      </div>
    </FormDialog>
  )
}

export function AddEmployeeDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={UserPlus2}
      iconBg="bg-info-bg text-info-foreground"
      title="Add Employee"
      description="Add a new employee to payroll and HR records."
      primaryLabel="Save Employee"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name"><Input placeholder="Employee name" /></Field>
        <Field label="Employee ID"><Input defaultValue="EMP-0129" readOnly className="font-mono text-sm" /></Field>
        <Field label="Email"><Input type="email" placeholder="name@codespanda.com" /></Field>
        <Field label="Phone"><Input type="tel" placeholder="+91 98765 43210" /></Field>
        <Field label="Department">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select department" /></SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Designation"><Input placeholder="e.g. Software Engineer" /></Field>
        <Field label="Date of Joining"><Input type="date" defaultValue="2025-06-01" /></Field>
        <Field label="Employment Type">
          <Select defaultValue="full-time">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="intern">Intern</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Annual CTC"><Input type="number" placeholder="0.00" /></Field>
      </div>
    </FormDialog>
  )
}

const payrollEmployees = [
  { name: "Rajesh Kumar", dept: "Engineering" },
  { name: "Priya Sharma", dept: "Sales & Marketing" },
  { name: "Amit Verma", dept: "Finance" },
  { name: "Neha Kapoor", dept: "HR" },
  { name: "Sunil Reddy", dept: "Operations" },
]

export function EmailPayslipsDialog({ children }: { children: ReactNode }) {
  const [scope, setScope] = useState("all")
  const count = useMemo(() => (scope === "all" ? payrollEmployees.length : payrollEmployees.filter((e) => e.dept === scope).length), [scope])

  return (
    <FormDialog
      icon={Mail}
      iconBg="bg-purple-bg text-purple-foreground"
      title="Email Payslips"
      description="Send payslips to employees for the selected pay period."
      primaryLabel="Send Payslips"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Pay Period">
          <Select defaultValue="may-2025">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="may-2025">May 2025</SelectItem>
              <SelectItem value="apr-2025">April 2025</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Send To">
          <Select value={scope} onValueChange={setScope}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Email Subject"><Input defaultValue="Your Payslip for May 2025" /></Field>
      <Field label="Message">
        <Textarea defaultValue="Hi, please find attached your payslip for the selected pay period. Reach out to HR for any queries." rows={3} />
      </Field>
      <p className="text-muted-foreground text-xs">
        This will email payslips to <span className="text-foreground font-medium">{count} employee{count === 1 ? "" : "s"}</span>.
      </p>
    </FormDialog>
  )
}
