import { type ReactNode } from "react"
import { Receipt, Link2, UserPlus2, Users2, FileText, Plug, ArrowLeftRight } from "lucide-react"

import { FormDialog, Field } from "@/components/shared/FormDialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MASKED } from "@/lib/format"

const tdsSections = ["194C - Contract", "194J - Professional Fees", "194I - Rent", "192 - Salary", "194Q - Purchase of Goods"]

export function NewChallanDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Receipt}
      iconBg="bg-info-bg text-info-foreground"
      title="New TDS Challan"
      description="Record a TDS challan payment made to the government."
      primaryLabel="Save Challan"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Challan No."><Input placeholder="e.g. 0510025202505001" className="font-mono" /></Field>
        <Field label="BSR Code"><Input placeholder="7-digit BSR code" className="font-mono" /></Field>
        <Field label="Deposit Date"><Input type="date" defaultValue="2025-05-31" /></Field>
        <Field label="Section">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select section" /></SelectTrigger>
            <SelectContent>
              {tdsSections.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Amount"><Input type="number" placeholder="0.00" /></Field>
        <Field label="Payment Mode">
          <Select defaultValue="online">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online (e-Payment)</SelectItem>
              <SelectItem value="bank">Bank Counter</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
    </FormDialog>
  )
}

export function NewChallanMappingDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Link2}
      iconBg="bg-purple-bg text-purple-foreground"
      title="New Challan Mapping"
      description="Map a deposited challan against a deductee transaction."
      primaryLabel="Save Mapping"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Challan">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select challan" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="c1">0510025202505001 — ₹18,550</SelectItem>
              <SelectItem value="c2">0510025202505032 — ₹24,500</SelectItem>
              <SelectItem value="c3">0510025202505067 — ₹11,000</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Deductee">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select deductee" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rajesh">Rajesh Agarwal</SelectItem>
              <SelectItem value="innovative">Innovative Infotech Pvt. Ltd.</SelectItem>
              <SelectItem value="global">Global Solutions Ltd.</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Section">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select section" /></SelectTrigger>
            <SelectContent>
              {tdsSections.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Amount to Map"><Input type="number" placeholder="0.00" /></Field>
      </div>
    </FormDialog>
  )
}

export function NewDeductorDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Users2}
      iconBg="bg-success-bg text-success-foreground"
      title="New Deductor"
      description="Add a TDS deductor entity."
      primaryLabel="Save Deductor"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Deductor Name"><Input placeholder="Entity name" /></Field>
        <Field label="TAN"><Input placeholder="e.g. BLRC12345D" className="font-mono" /></Field>
        <Field label="PAN"><Input defaultValue={MASKED} readOnly className="font-mono" /></Field>
        <Field label="State">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select state" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ka">Karnataka</SelectItem>
              <SelectItem value="mh">Maharashtra</SelectItem>
              <SelectItem value="dl">Delhi</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Address"><Textarea placeholder="Registered address..." rows={2} /></Field>
    </FormDialog>
  )
}

export function NewDeducteeDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={UserPlus2}
      iconBg="bg-purple-bg text-purple-foreground"
      title="New Deductee"
      description="Add a TDS deductee to deduct and track tax against."
      primaryLabel="Save Deductee"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Deductee Name"><Input placeholder="Individual or entity name" /></Field>
        <Field label="PAN"><Input placeholder="e.g. AAGPA1234A" className="font-mono" /></Field>
        <Field label="TDS Category">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              {tdsSections.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="State">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select state" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ka">Karnataka</SelectItem>
              <SelectItem value="mh">Maharashtra</SelectItem>
              <SelectItem value="dl">Delhi</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
    </FormDialog>
  )
}

export function NewGstReturnDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={FileText}
      iconBg="bg-info-bg text-info-foreground"
      title="New GST Return"
      description="Prepare a new GST return for the selected period."
      primaryLabel="Prepare Return"
      trigger={children}
    >
      <Field label="Return Type">
        <Select defaultValue="gstr-1">
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="gstr-1">GSTR-1</SelectItem>
            <SelectItem value="gstr-3b">GSTR-3B</SelectItem>
            <SelectItem value="gstr-9">GSTR-9 (Annual)</SelectItem>
            <SelectItem value="gstr-4">GSTR-4 (Composition)</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Tax Period">
          <Select defaultValue="may-2025">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="may-2025">May 2025</SelectItem>
              <SelectItem value="jun-2025">June 2025</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Due Date"><Input type="date" defaultValue="2025-06-20" readOnly /></Field>
      </div>
    </FormDialog>
  )
}

export function NewIntegrationDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Plug}
      iconBg="bg-purple-bg text-purple-foreground"
      title="New TRACES Integration"
      description="Connect a TRACES account for TDS compliance automation."
      primaryLabel="Connect"
      trigger={children}
    >
      <Field label="Integration Name"><Input placeholder="e.g. Primary TRACES Account" /></Field>
      <Field label="Connection Type">
        <Select defaultValue="api">
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="api">API Integration</SelectItem>
            <SelectItem value="web">Web Login</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="TAN"><Input placeholder="e.g. BLRC12345D" className="font-mono" /></Field>
        <Field label="User ID"><Input placeholder="TRACES user ID" /></Field>
      </div>
    </FormDialog>
  )
}

export function NewTdsTransactionDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={ArrowLeftRight}
      iconBg="bg-info-bg text-info-foreground"
      title="New TDS Transaction"
      description="Record a payment with TDS deduction against a deductee."
      primaryLabel="Save Transaction"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Deductee">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select deductee" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rajesh">Rajesh Agarwal</SelectItem>
              <SelectItem value="innovative">Innovative Infotech Pvt. Ltd.</SelectItem>
              <SelectItem value="global">Global Solutions Ltd.</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Section">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select section" /></SelectTrigger>
            <SelectContent>
              {tdsSections.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Payment Date"><Input type="date" defaultValue="2025-05-31" /></Field>
        <Field label="Payment Amount"><Input type="number" placeholder="0.00" /></Field>
        <Field label="TDS Rate (%)"><Input type="number" placeholder="10" /></Field>
        <Field label="TDS Amount"><Input type="number" placeholder="0.00" /></Field>
      </div>
    </FormDialog>
  )
}
