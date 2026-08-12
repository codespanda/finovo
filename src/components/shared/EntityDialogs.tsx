import { useMemo, useState, type ReactNode } from "react"
import { UserPlus, Contact2, IndianRupee, Package, Landmark, Wand2, Users, FileBarChart2 } from "lucide-react"

import { FormDialog, Field } from "@/components/shared/FormDialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { inr } from "@/lib/format"

const openInvoices = [
  { no: "INV-1023", customer: "Globex Pvt. Ltd.", balance: 25000 },
  { no: "INV-1022", customer: "Soylent Corp.", balance: 120000 },
  { no: "INV-1018", customer: "Wayne Enterprises", balance: 80000 },
  { no: "INV-1017", customer: "Oscorp Industries", balance: 30000 },
]

const openBills = [
  { no: "BILL-2025-0456", vendor: "ABC Supplies Pvt. Ltd.", balance: 125000 },
  { no: "BILL-2025-0440", vendor: "Tech Solutions", balance: 78500 },
  { no: "BILL-2025-0435", vendor: "Global Distributors", balance: 62000 },
  { no: "BILL-2025-0409", vendor: "Hardware Hub", balance: 56600 },
  { no: "BILL-2025-0405", vendor: "IT World Solutions", balance: 20000 },
]

export function AddCustomerDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={UserPlus}
      iconBg="bg-info-bg text-info-foreground"
      title="Add Customer"
      description="Add a new customer to bill and track receivables."
      primaryLabel="Save Customer"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Customer Name"><Input placeholder="e.g. Global Enterprises" /></Field>
        <Field label="Display Name"><Input placeholder="Name shown on invoices" /></Field>
        <Field label="Email"><Input type="email" placeholder="billing@company.com" /></Field>
        <Field label="Phone"><Input type="tel" placeholder="+91 98765 43210" /></Field>
        <Field label="GSTIN"><Input placeholder="29AAGFG1234A1Z5" className="font-mono" /></Field>
        <Field label="PAN"><Input placeholder="AAGPA1234A" className="font-mono" /></Field>
      </div>
      <Field label="Billing Address"><Textarea placeholder="Street, city, state, PIN code..." rows={2} /></Field>
    </FormDialog>
  )
}

export function NewContactDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Contact2}
      iconBg="bg-purple-bg text-purple-foreground"
      title="New Contact"
      description="Add a customer, vendor, or employee to your contacts."
      primaryLabel="Save Contact"
      trigger={children}
    >
      <Field label="Contact Type">
        <Select defaultValue="customer">
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="vendor">Vendor</SelectItem>
            <SelectItem value="employee">Employee</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name"><Input placeholder="Contact name" /></Field>
        <Field label="Company"><Input placeholder="Company name (optional)" /></Field>
        <Field label="Email"><Input type="email" placeholder="name@company.com" /></Field>
        <Field label="Phone"><Input type="tel" placeholder="+91 98765 43210" /></Field>
      </div>
    </FormDialog>
  )
}

export function ReceivePaymentDialog({ children }: { children: ReactNode }) {
  const [invoiceNo, setInvoiceNo] = useState("")
  const invoice = useMemo(() => openInvoices.find((i) => i.no === invoiceNo), [invoiceNo])

  return (
    <FormDialog
      icon={IndianRupee}
      iconBg="bg-success-bg text-success-foreground"
      title="Receive Payment"
      description="Record a payment received against a customer invoice."
      primaryLabel="Record Payment"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Customer">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select a customer" /></SelectTrigger>
            <SelectContent>
              {[...new Set(openInvoices.map((i) => i.customer))].map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Invoice">
          <Select value={invoiceNo} onValueChange={setInvoiceNo}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select an open invoice" /></SelectTrigger>
            <SelectContent>
              {openInvoices.map((i) => (
                <SelectItem key={i.no} value={i.no}>{i.no} — {inr(i.balance)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Amount Received">
          <Input type="number" placeholder="0.00" defaultValue={invoice ? String(invoice.balance) : ""} />
        </Field>
        <Field label="Payment Date"><Input type="date" defaultValue="2025-05-31" /></Field>
        <Field label="Payment Method">
          <Select defaultValue="bank">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="bank">Bank Transfer</SelectItem>
              <SelectItem value="upi">UPI</SelectItem>
              <SelectItem value="cheque">Cheque</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="card">Card</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Reference / Transaction ID"><Input placeholder="e.g. NEFT5123098756" /></Field>
      </div>
      {invoice && (
        <p className="text-muted-foreground text-xs">
          Outstanding balance on {invoice.no}: <span className="text-foreground font-medium">{inr(invoice.balance)}</span>
        </p>
      )}
    </FormDialog>
  )
}

export function AddPaymentDialog({ children }: { children: ReactNode }) {
  const [billNo, setBillNo] = useState("")
  const bill = useMemo(() => openBills.find((b) => b.no === billNo), [billNo])

  return (
    <FormDialog
      icon={IndianRupee}
      iconBg="bg-success-bg text-success-foreground"
      title="Add Payment"
      description="Record a payment made against a vendor bill."
      primaryLabel="Record Payment"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Vendor">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select a vendor" /></SelectTrigger>
            <SelectContent>
              {[...new Set(openBills.map((b) => b.vendor))].map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Bill">
          <Select value={billNo} onValueChange={setBillNo}>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select an open bill" /></SelectTrigger>
            <SelectContent>
              {openBills.map((b) => (
                <SelectItem key={b.no} value={b.no}>{b.no} — {inr(b.balance)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Amount Paid">
          <Input type="number" placeholder="0.00" defaultValue={bill ? String(bill.balance) : ""} />
        </Field>
        <Field label="Payment Date"><Input type="date" defaultValue="2025-05-31" /></Field>
        <Field label="Payment Method">
          <Select defaultValue="bank">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="bank">Bank Transfer</SelectItem>
              <SelectItem value="upi">UPI</SelectItem>
              <SelectItem value="cheque">Cheque</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="card">Card</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Reference / Transaction ID"><Input placeholder="e.g. NEFT5123098756" /></Field>
      </div>
      {bill && (
        <p className="text-muted-foreground text-xs">
          Outstanding balance on {bill.no}: <span className="text-foreground font-medium">{inr(bill.balance)}</span>
        </p>
      )}
    </FormDialog>
  )
}

export function NewItemDialog({ children }: { children: ReactNode }) {
  const [type, setType] = useState("goods")

  return (
    <FormDialog
      icon={Package}
      iconBg="bg-warning-bg text-warning-foreground"
      title="New Item"
      description="Add a product or service to your item catalog."
      primaryLabel="Save Item"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Item Name"><Input placeholder="e.g. Office Chair" /></Field>
        <Field label="SKU"><Input placeholder="e.g. SKU-1042" className="font-mono" /></Field>
        <Field label="Type">
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="goods">Goods</SelectItem>
              <SelectItem value="service">Service</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Category">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="office-supplies">Office Supplies</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="raw-materials">Raw Materials</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Sales Price"><Input type="number" placeholder="0.00" /></Field>
        <Field label="Purchase Price"><Input type="number" placeholder="0.00" /></Field>
        <Field label="Unit">
          <Select defaultValue="pcs">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="pcs">Pieces (PCS)</SelectItem>
              <SelectItem value="box">Box</SelectItem>
              <SelectItem value="kg">Kilogram (KG)</SelectItem>
              <SelectItem value="hrs">Hours</SelectItem>
              <SelectItem value="nos">Numbers (NOS)</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Tax Rate (GST)">
          <Select defaultValue="18">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0%</SelectItem>
              <SelectItem value="5">5%</SelectItem>
              <SelectItem value="12">12%</SelectItem>
              <SelectItem value="18">18%</SelectItem>
              <SelectItem value="28">28%</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        {type === "goods" && <Field label="Opening Stock"><Input type="number" placeholder="0" /></Field>}
      </div>
    </FormDialog>
  )
}

export function AddBankAccountDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Landmark}
      iconBg="bg-info-bg text-info-foreground"
      title="Add Bank Account"
      description="Connect a bank account to track balances and transactions."
      primaryLabel="Add Account"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Bank Name">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select bank" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="hdfc">HDFC Bank</SelectItem>
              <SelectItem value="icici">ICICI Bank</SelectItem>
              <SelectItem value="sbi">State Bank of India</SelectItem>
              <SelectItem value="axis">Axis Bank</SelectItem>
              <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Account Holder Name"><Input placeholder="As per bank records" /></Field>
        <Field label="Account Number"><Input placeholder="Account number" className="font-mono" /></Field>
        <Field label="IFSC Code"><Input placeholder="e.g. HDFC0001234" className="font-mono" /></Field>
        <Field label="Account Type">
          <Select defaultValue="current">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Account</SelectItem>
              <SelectItem value="savings">Savings Account</SelectItem>
              <SelectItem value="od">Overdraft Account</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Opening Balance"><Input type="number" placeholder="0.00" /></Field>
      </div>
    </FormDialog>
  )
}

export function NewRuleDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Wand2}
      iconBg="bg-purple-bg text-purple-foreground"
      title="New Bank Rule"
      description="Automatically categorize and match transactions that meet a condition."
      primaryLabel="Create Rule"
      wide
      trigger={children}
    >
      <Field label="Rule Name"><Input placeholder="e.g. Office Rent Auto-match" /></Field>

      <div>
        <label className="text-muted-foreground mb-1.5 block text-xs font-medium">Condition</label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Select defaultValue="description">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="description">Description</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="reference">Reference No.</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="contains">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="contains">Contains</SelectItem>
              <SelectItem value="equals">Equals</SelectItem>
              <SelectItem value="greater">Greater than</SelectItem>
              <SelectItem value="less">Less than</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Value" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Action">
          <Select defaultValue="match">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Match to Account</SelectItem>
              <SelectItem value="categorize">Categorize as Expense</SelectItem>
              <SelectItem value="ignore">Ignore Transaction</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Apply To Account">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select account" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rent">Rent Expense</SelectItem>
              <SelectItem value="salaries">Salaries & Wages</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="bank-charges">Bank Charges</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
    </FormDialog>
  )
}

export function NewGroupDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Users}
      iconBg="bg-purple-bg text-purple-foreground"
      title="New Group"
      description="Group contacts together for bulk actions and filtering."
      primaryLabel="Create Group"
      trigger={children}
    >
      <Field label="Group Name"><Input placeholder="e.g. VIP Customers" /></Field>
      <Field label="Group Type">
        <Select defaultValue="customer">
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="customer">Customers</SelectItem>
            <SelectItem value="vendor">Vendors</SelectItem>
            <SelectItem value="employee">Employees</SelectItem>
            <SelectItem value="mixed">Mixed</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Description"><Textarea placeholder="What is this group used for? (optional)" rows={2} /></Field>
    </FormDialog>
  )
}

export function NewReportDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={FileBarChart2}
      iconBg="bg-info-bg text-info-foreground"
      title="New Custom Report"
      description="Build a custom report with the filters and columns you need."
      primaryLabel="Generate Report"
      secondaryLabel="Save as Template"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Report Name"><Input placeholder="e.g. Q2 Travel Expenses" /></Field>
        <Field label="Report Type">
          <Select defaultValue="category">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="category">By Category</SelectItem>
              <SelectItem value="employee">By Employee</SelectItem>
              <SelectItem value="project">By Project</SelectItem>
              <SelectItem value="status">By Approval Status</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="From Date"><Input type="date" defaultValue="2025-04-01" /></Field>
        <Field label="To Date"><Input type="date" defaultValue="2025-06-30" /></Field>
        <Field label="Format">
          <Select defaultValue="pdf">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
    </FormDialog>
  )
}
