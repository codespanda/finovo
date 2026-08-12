import { useMemo, useState, type ReactNode } from "react"
import { Plus, Trash2, FileText, FileClock, ShoppingBag, ClipboardList, FileMinus2, FileX2, Repeat, type LucideIcon } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { inr } from "@/lib/format"

let lineId = 0
function newLine() {
  lineId += 1
  return { id: lineId, item: "", qty: "1", rate: "" }
}

interface DocConfig {
  icon: LucideIcon
  iconBg: string
  title: string
  description: string
  docNo: string
  partyLabel: string
  partyPlaceholder: string
  parties: string[]
  dateLabel: string
  defaultDate: string
  secondDateLabel: string
  defaultSecondDate: string
  secondFieldType?: "date" | "text"
  secondFieldPlaceholder?: string
  itemOptions: string[]
  itemColLabel: string
  taxRate: number
  draftLabel: string
  primaryLabel: string
  extraLabel?: string
  extraOptions?: string[]
}

function GenericDocumentDialog({ config, children }: { config: DocConfig; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState([newLine()])

  const totals = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + (parseFloat(l.qty) || 0) * (parseFloat(l.rate) || 0), 0)
    const tax = subtotal * config.taxRate
    return { subtotal, tax, total: subtotal + tax }
  }, [lines, config.taxRate])

  function updateLine(id: number, patch: Partial<(typeof lines)[number]>) {
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)))
  }

  function removeLine(id: number) {
    setLines((ls) => (ls.length > 1 ? ls.filter((l) => l.id !== id) : ls))
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o) setLines([newLine()])
      }}
    >
      {children}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${config.iconBg}`}>
              <config.icon className="size-4.5" />
            </div>
            <div>
              <DialogTitle>{config.title}</DialogTitle>
              <DialogDescription>{config.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-muted-foreground mb-1.5 block text-xs font-medium">{config.partyLabel}</label>
            <Select>
              <SelectTrigger className="w-full"><SelectValue placeholder={config.partyPlaceholder} /></SelectTrigger>
              <SelectContent>
                {config.parties.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-muted-foreground mb-1.5 block text-xs font-medium">{config.docNo}</label>
            <Input defaultValue={config.docNo === "Reference" ? "" : `${config.docNo}`} readOnly={config.docNo !== "Reference"} className="font-mono text-sm" />
          </div>
          <div>
            <label className="text-muted-foreground mb-1.5 block text-xs font-medium">{config.dateLabel}</label>
            <Input type="date" defaultValue={config.defaultDate} />
          </div>
          <div>
            <label className="text-muted-foreground mb-1.5 block text-xs font-medium">{config.secondDateLabel}</label>
            {config.secondFieldType === "text" ? (
              <Input placeholder={config.secondFieldPlaceholder} defaultValue={config.defaultSecondDate} />
            ) : (
              <Input type="date" defaultValue={config.defaultSecondDate} />
            )}
          </div>
          {config.extraOptions && (
            <div className="sm:col-span-2">
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium">{config.extraLabel}</label>
              <Select>
                <SelectTrigger className="w-full"><SelectValue placeholder={`Select ${config.extraLabel?.toLowerCase()}`} /></SelectTrigger>
                <SelectContent>
                  {config.extraOptions.map((o) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Line Items</label>
            <Button variant="outline" size="sm" onClick={() => setLines((ls) => [...ls, newLine()])}>
              <Plus className="size-3.5" /> Add Line
            </Button>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground bg-muted border-b text-left text-xs">
                  <th className="px-3 py-2 font-medium">{config.itemColLabel}</th>
                  <th className="w-20 px-3 py-2 text-right font-medium">Qty</th>
                  <th className="w-28 px-3 py-2 text-right font-medium">Rate (₹)</th>
                  <th className="w-28 px-3 py-2 text-right font-medium">Amount (₹)</th>
                  <th className="w-10 px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l) => (
                  <tr key={l.id} className="border-b last:border-0">
                    <td className="p-2">
                      <Select value={l.item} onValueChange={(v) => updateLine(l.id, { item: v })}>
                        <SelectTrigger className="h-9 w-full"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          {config.itemOptions.map((o) => (
                            <SelectItem key={o} value={o}>{o}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2">
                      <Input type="number" className="text-right" value={l.qty} onChange={(e) => updateLine(l.id, { qty: e.target.value })} />
                    </td>
                    <td className="p-2">
                      <Input type="number" placeholder="0.00" className="text-right" value={l.rate} onChange={(e) => updateLine(l.id, { rate: e.target.value })} />
                    </td>
                    <td className="p-2 text-right whitespace-nowrap text-foreground">
                      {inr((parseFloat(l.qty) || 0) * (parseFloat(l.rate) || 0), { decimals: true })}
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={() => removeLine(l.id)} disabled={lines.length <= 1} className="text-muted-foreground hover:text-destructive disabled:opacity-30">
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-muted-foreground mb-1.5 block text-xs font-medium">Notes</label>
            <Textarea placeholder="Add a note (optional)..." rows={2} />
          </div>
          <div className="flex flex-col justify-end gap-1.5 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">{inr(totals.subtotal, { decimals: true })}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">GST ({Math.round(config.taxRate * 100)}%)</span><span className="text-foreground">{inr(totals.tax, { decimals: true })}</span></div>
            <div className="flex justify-between border-t pt-1.5 font-semibold text-foreground"><span>Total</span><span>{inr(totals.total, { decimals: true })}</span></div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>{config.draftLabel}</Button>
          <Button onClick={() => setOpen(false)}>{config.primaryLabel}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const customers = ["Global Enterprises", "Techno Solutions Pvt. Ltd.", "Sunrise Traders", "Krishna Retailers", "ABC Supermart", "Acme Corporation"]
const vendors = ["Global Supplies Co.", "Mahesh Traders", "Shakti Enterprises", "Vishal Hardware", "Ankit Distributors", "S.K. Industries"]
const items = ["Website Development", "Software License", "Consulting Services", "Web Hosting (Monthly)", "Office Supplies", "Raw Materials", "Annual Maintenance"]

export function NewInvoiceDialog({ children }: { children: ReactNode }) {
  return (
    <GenericDocumentDialog
      config={{
        icon: FileText,
        iconBg: "bg-info-bg text-info-foreground",
        title: "New Invoice",
        description: "Bill a customer for products or services delivered.",
        docNo: "INV-25-26-1025",
        partyLabel: "Customer",
        partyPlaceholder: "Select a customer",
        parties: customers,
        dateLabel: "Invoice Date",
        defaultDate: "2025-05-31",
        secondDateLabel: "Due Date",
        defaultSecondDate: "2025-06-30",
        itemOptions: items,
        itemColLabel: "Item / Service",
        taxRate: 0.18,
        draftLabel: "Save as Draft",
        primaryLabel: "Save & Send",
      }}
    >
      {children}
    </GenericDocumentDialog>
  )
}

export function NewEstimateDialog({ children }: { children: ReactNode }) {
  return (
    <GenericDocumentDialog
      config={{
        icon: FileClock,
        iconBg: "bg-purple-bg text-purple-foreground",
        title: "New Estimate",
        description: "Send a price quote to a prospective or existing customer.",
        docNo: "EST-25-26-0177",
        partyLabel: "Customer",
        partyPlaceholder: "Select a customer",
        parties: customers,
        dateLabel: "Estimate Date",
        defaultDate: "2025-05-31",
        secondDateLabel: "Expiry Date",
        defaultSecondDate: "2025-06-14",
        itemOptions: items,
        itemColLabel: "Item / Service",
        taxRate: 0.18,
        draftLabel: "Save as Draft",
        primaryLabel: "Send Estimate",
      }}
    >
      {children}
    </GenericDocumentDialog>
  )
}

export function NewBillDialog({ children }: { children: ReactNode }) {
  return (
    <GenericDocumentDialog
      config={{
        icon: ShoppingBag,
        iconBg: "bg-danger-bg text-danger-foreground",
        title: "New Bill",
        description: "Record a bill received from a vendor.",
        docNo: "BILL/25-26/1057",
        partyLabel: "Vendor",
        partyPlaceholder: "Select a vendor",
        parties: vendors,
        dateLabel: "Bill Date",
        defaultDate: "2025-05-31",
        secondDateLabel: "Due Date",
        defaultSecondDate: "2025-06-15",
        itemOptions: items,
        itemColLabel: "Item / Expense",
        taxRate: 0.18,
        draftLabel: "Save as Draft",
        primaryLabel: "Save Bill",
      }}
    >
      {children}
    </GenericDocumentDialog>
  )
}

export function NewPurchaseOrderDialog({ children }: { children: ReactNode }) {
  return (
    <GenericDocumentDialog
      config={{
        icon: ClipboardList,
        iconBg: "bg-warning-bg text-warning-foreground",
        title: "New Purchase Order",
        description: "Create a purchase order to send to a vendor.",
        docNo: "PO-459",
        partyLabel: "Vendor",
        partyPlaceholder: "Select a vendor",
        parties: vendors,
        dateLabel: "PO Date",
        defaultDate: "2025-05-31",
        secondDateLabel: "Expected Delivery",
        defaultSecondDate: "2025-06-10",
        itemOptions: items,
        itemColLabel: "Item",
        taxRate: 0.18,
        draftLabel: "Save as Draft",
        primaryLabel: "Send to Vendor",
      }}
    >
      {children}
    </GenericDocumentDialog>
  )
}

const creditReasons = ["Sales Return", "Price Adjustment", "Damaged Goods", "Discount Correction", "Order Cancellation"]
const debitReasons = ["Purchase Return", "Price Adjustment", "Damaged Goods Received", "Overbilling Correction", "Order Cancellation"]
const frequencies = ["Weekly", "Monthly", "Quarterly", "Half-Yearly", "Yearly"]

export function NewCreditNoteDialog({ children }: { children: ReactNode }) {
  return (
    <GenericDocumentDialog
      config={{
        icon: FileMinus2,
        iconBg: "bg-purple-bg text-purple-foreground",
        title: "New Credit Note",
        description: "Issue a credit note against a customer invoice.",
        docNo: "CN-25-26-0214",
        partyLabel: "Customer",
        partyPlaceholder: "Select a customer",
        parties: customers,
        dateLabel: "Credit Note Date",
        defaultDate: "2025-05-31",
        secondDateLabel: "Against Invoice",
        defaultSecondDate: "",
        secondFieldType: "text",
        secondFieldPlaceholder: "e.g. INV-25-26-1024",
        itemOptions: items,
        itemColLabel: "Item / Service",
        taxRate: 0.18,
        draftLabel: "Save as Draft",
        primaryLabel: "Issue Credit Note",
        extraLabel: "Reason",
        extraOptions: creditReasons,
      }}
    >
      {children}
    </GenericDocumentDialog>
  )
}

export function NewDebitNoteDialog({ children }: { children: ReactNode }) {
  return (
    <GenericDocumentDialog
      config={{
        icon: FileX2,
        iconBg: "bg-danger-bg text-danger-foreground",
        title: "New Debit Note",
        description: "Issue a debit note against a vendor bill.",
        docNo: "DBN/25-26/0039",
        partyLabel: "Vendor",
        partyPlaceholder: "Select a vendor",
        parties: vendors,
        dateLabel: "Debit Note Date",
        defaultDate: "2025-05-31",
        secondDateLabel: "Against Bill",
        defaultSecondDate: "",
        secondFieldType: "text",
        secondFieldPlaceholder: "e.g. BILL/25-26/1054",
        itemOptions: items,
        itemColLabel: "Item / Expense",
        taxRate: 0.18,
        draftLabel: "Save as Draft",
        primaryLabel: "Issue Debit Note",
        extraLabel: "Reason",
        extraOptions: debitReasons,
      }}
    >
      {children}
    </GenericDocumentDialog>
  )
}

export function NewRecurringBillDialog({ children }: { children: ReactNode }) {
  return (
    <GenericDocumentDialog
      config={{
        icon: Repeat,
        iconBg: "bg-info-bg text-info-foreground",
        title: "New Recurring Bill",
        description: "Set up a bill that repeats automatically on a schedule.",
        docNo: "RB-00032",
        partyLabel: "Vendor",
        partyPlaceholder: "Select a vendor",
        parties: vendors,
        dateLabel: "Start Date",
        defaultDate: "2025-06-01",
        secondDateLabel: "End Date (optional)",
        defaultSecondDate: "",
        itemOptions: items,
        itemColLabel: "Item / Expense",
        taxRate: 0.18,
        draftLabel: "Save as Draft",
        primaryLabel: "Activate Recurring Bill",
        extraLabel: "Frequency",
        extraOptions: frequencies,
      }}
    >
      {children}
    </GenericDocumentDialog>
  )
}
