import { useState, type ReactNode } from "react"
import {
  UploadCloud,
  FileBarChart2,
  Truck,
  FileBadge2,
  FilePlus2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react"

import { FormDialog, Field } from "@/components/shared/FormDialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export function UploadFilesDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={UploadCloud}
      iconBg="bg-info-bg text-info-foreground"
      title="Upload Files"
      description="Upload one or more files to this project's document library."
      primaryLabel="Upload"
      trigger={children}
    >
      <Field label="File(s)"><Input type="file" multiple /></Field>
      <Field label="Folder">
        <Select defaultValue="root">
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="root">Project Root</SelectItem>
            <SelectItem value="planning">01. Planning &amp; Research</SelectItem>
            <SelectItem value="design">02. Design</SelectItem>
            <SelectItem value="dev">03. Development</SelectItem>
            <SelectItem value="testing">04. Testing</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Description (optional)"><Textarea placeholder="Add a note about these files..." rows={2} /></Field>
    </FormDialog>
  )
}

export function GenerateReportDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={FileBarChart2}
      iconBg="bg-info-bg text-info-foreground"
      title="Generate Report"
      description="Generate a compliance report for the selected form and period."
      primaryLabel="Generate Report"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Report Type">
          <Select defaultValue="tds">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="tds">TDS Payment Summary</SelectItem>
              <SelectItem value="tcs">TCS Statement</SelectItem>
              <SelectItem value="mismatch">Deductee Mismatch Report</SelectItem>
              <SelectItem value="consolidated">Consolidated Justification</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Financial Year">
          <Select defaultValue="2025-26">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-26">FY 2025-26</SelectItem>
              <SelectItem value="2024-25">FY 2024-25</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Quarter">
          <Select defaultValue="q4">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="q1">Q1</SelectItem>
              <SelectItem value="q2">Q2</SelectItem>
              <SelectItem value="q3">Q3</SelectItem>
              <SelectItem value="q4">Q4</SelectItem>
            </SelectContent>
          </Select>
        </Field>
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

function FilingChecklist() {
  return (
    <div className="bg-muted flex flex-col gap-2 rounded-lg p-3 text-sm">
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked /> Data validated against books of accounts
      </label>
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked /> No errors found in preview
      </label>
      <label className="flex items-center gap-2">
        <Checkbox /> I confirm the details are accurate and complete
      </label>
    </div>
  )
}

export function FileGstr1Dialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={UploadCloud}
      iconBg="bg-success-bg text-success-foreground"
      title="File GSTR-1"
      description="Review and file your GSTR-1 return for the selected period."
      primaryLabel="File Now"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Return Period"><Input defaultValue="April 2025" readOnly /></Field>
        <Field label="Total Taxable Value"><Input defaultValue="₹1,07,08,200" readOnly /></Field>
      </div>
      <Field label="Filing Mode">
        <Select defaultValue="dsc">
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="dsc">Digital Signature (DSC)</SelectItem>
            <SelectItem value="evc">Electronic Verification Code (EVC)</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <FilingChecklist />
    </FormDialog>
  )
}

export function FileGstr3BDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={UploadCloud}
      iconBg="bg-success-bg text-success-foreground"
      title="File GSTR-3B"
      description="Review your tax liability and file GSTR-3B for the selected period."
      primaryLabel="File GSTR-3B"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Tax Period"><Input defaultValue="April 2025" readOnly /></Field>
        <Field label="Net Tax Payable"><Input defaultValue="₹8,61,880" readOnly /></Field>
      </div>
      <Field label="Payment Mode">
        <Select defaultValue="cash-itc">
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="cash-itc">Cash Ledger + ITC</SelectItem>
            <SelectItem value="cash">Cash Ledger Only</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <FilingChecklist />
    </FormDialog>
  )
}

export function GenerateEWayBillDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Truck}
      iconBg="bg-info-bg text-info-foreground"
      title="Generate E-Way Bill"
      description="Create a new E-Way Bill for an outward or inward supply."
      primaryLabel="Generate E-Way Bill"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Invoice / Document No.">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select invoice" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="inv-1024">INV-25-26-1024 — ₹45,000</SelectItem>
              <SelectItem value="inv-1023">INV-25-26-1023 — ₹38,500</SelectItem>
              <SelectItem value="inv-1022">INV-25-26-1022 — ₹62,000</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Transport Mode">
          <Select defaultValue="road">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="road">Road</SelectItem>
              <SelectItem value="rail">Rail</SelectItem>
              <SelectItem value="air">Air</SelectItem>
              <SelectItem value="ship">Ship</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Transporter Name"><Input placeholder="e.g. Speed Logistics Pvt. Ltd." /></Field>
        <Field label="Vehicle No."><Input placeholder="e.g. KA01AB1234" className="font-mono" /></Field>
        <Field label="Distance (Kms)"><Input type="number" placeholder="0" /></Field>
        <Field label="Transporter ID (GSTIN)"><Input placeholder="15-digit GSTIN" className="font-mono" /></Field>
      </div>
    </FormDialog>
  )
}

export function GenerateTdsReturnDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={FileBadge2}
      iconBg="bg-info-bg text-info-foreground"
      title="Generate Return"
      description="Prepare a new quarterly TDS return for filing."
      primaryLabel="Generate Return"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Form Type">
          <Select defaultValue="24q">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="24q">24Q — Salary</SelectItem>
              <SelectItem value="26q">26Q — Non-Salary</SelectItem>
              <SelectItem value="27q">27Q — Foreign Payment</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Quarter">
          <Select defaultValue="q2">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="q1">Q1</SelectItem>
              <SelectItem value="q2">Q2</SelectItem>
              <SelectItem value="q3">Q3</SelectItem>
              <SelectItem value="q4">Q4</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Financial Year">
          <Select defaultValue="2025-26">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-26">FY 2025-26</SelectItem>
              <SelectItem value="2024-25">FY 2024-25</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Due Date"><Input type="date" defaultValue="2025-10-31" readOnly /></Field>
      </div>
    </FormDialog>
  )
}

export function GenerateFormDialog({ children, formNo }: { children: ReactNode; formNo: "130" | "131" | "133" }) {
  return (
    <FormDialog
      icon={FileBadge2}
      iconBg="bg-purple-bg text-purple-foreground"
      title={`Generate Form ${formNo}`}
      description={`Generate a Form ${formNo} TDS certificate for the selected quarter.`}
      primaryLabel={`Generate Form ${formNo}`}
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Assessment Year">
          <Select defaultValue="2026-27">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="2026-27">AY 2026-27</SelectItem>
              <SelectItem value="2025-26">AY 2025-26</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Quarter">
          <Select defaultValue="q4">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="q1">Q1</SelectItem>
              <SelectItem value="q2">Q2</SelectItem>
              <SelectItem value="q3">Q3</SelectItem>
              <SelectItem value="q4">Q4</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Employee / Deductee">
        <Select defaultValue="all">
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pending</SelectItem>
            <SelectItem value="single">Select Individually</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </FormDialog>
  )
}

export function FileCorrectionReturnDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={FilePlus2}
      iconBg="bg-warning-bg text-warning-foreground"
      title="File Correction Return"
      description="File a correction against a previously filed TDS return."
      primaryLabel="File Correction Return"
      wide
      trigger={children}
    >
      <Field label="Original Return">
        <Select>
          <SelectTrigger className="w-full"><SelectValue placeholder="Select original return" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="r1">24Q — Q4 FY 2025-26</SelectItem>
            <SelectItem value="r2">26Q — Q3 FY 2025-26</SelectItem>
            <SelectItem value="r3">27Q — Q2 FY 2025-26</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Correction Type">
        <Select defaultValue="200-3">
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="200-3">Correction Return (u/s 200(3))</SelectItem>
            <SelectItem value="200-3a">Correction Return (u/s 200(3A))</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Reason for Correction"><Textarea placeholder="e.g. PAN mismatch, incorrect challan mapping..." rows={2} /></Field>
    </FormDialog>
  )
}

export function VerifyPanDialog({ children }: { children: ReactNode }) {
  const [pan, setPan] = useState("")
  const [result, setResult] = useState<"valid" | "invalid" | null>(null)

  return (
    <FormDialog
      icon={ShieldCheck}
      iconBg="bg-success-bg text-success-foreground"
      title="Verify PAN"
      description="Verify a deductee's PAN details against the Income Tax database."
      primaryLabel="Verify PAN"
      trigger={children}
    >
      <Field label="PAN">
        <Input
          placeholder="e.g. AAGPA1234A"
          className="font-mono uppercase"
          value={pan}
          maxLength={10}
          onChange={(e) => {
            setPan(e.target.value.toUpperCase())
            setResult(null)
          }}
        />
      </Field>
      <Field label="Name (as per PAN)"><Input placeholder="Full name on PAN card" /></Field>
      <button
        type="button"
        onClick={() => setResult(pan.length === 10 ? "valid" : "invalid")}
        className="text-primary self-start text-xs font-medium hover:underline"
      >
        Check status
      </button>
      {result === "valid" && (
        <div className="bg-success-bg text-success-foreground flex items-center gap-2 rounded-lg p-3 text-sm">
          <CheckCircle2 className="size-4 shrink-0" /> PAN is valid and active.
        </div>
      )}
      {result === "invalid" && (
        <Badge variant="danger" className="w-fit">Invalid PAN format — please check and re-enter</Badge>
      )}
    </FormDialog>
  )
}
