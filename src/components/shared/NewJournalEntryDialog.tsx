import { useMemo, useState } from "react"
import { Plus, Trash2, CheckCircle2, AlertTriangle, BookText } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { inr } from "@/lib/format"

const accounts = [
  "Cash",
  "Bank Account",
  "Accounts Receivable",
  "Accounts Payable",
  "Sales Revenue",
  "Salaries & Wages",
  "Rent Expense",
  "Depreciation Expense",
  "Prepaid Expenses",
  "Bank Charges",
  "GST Input Credit",
  "GST Output Payable",
]

let lineId = 0
function newLine() {
  lineId += 1
  return { id: lineId, account: "", description: "", debit: "", credit: "" }
}

export function NewJournalEntryDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState([newLine(), newLine()])

  const totals = useMemo(() => {
    const debit = lines.reduce((s, l) => s + (parseFloat(l.debit) || 0), 0)
    const credit = lines.reduce((s, l) => s + (parseFloat(l.credit) || 0), 0)
    return { debit, credit, diff: debit - credit }
  }, [lines])

  const balanced = totals.debit > 0 && totals.diff === 0

  function updateLine(id: number, patch: Partial<(typeof lines)[number]>) {
    setLines((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)))
  }

  function removeLine(id: number) {
    setLines((ls) => (ls.length > 2 ? ls.filter((l) => l.id !== id) : ls))
  }

  function reset() {
    setLines([newLine(), newLine()])
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (!o) reset()
      }}
    >
      {children}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-info-bg text-info-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
              <BookText className="size-4.5" />
            </div>
            <div>
              <DialogTitle>New Journal Entry</DialogTitle>
              <DialogDescription>Record a manual double-entry transaction for your books.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="text-muted-foreground mb-1.5 block text-xs font-medium">Journal No.</label>
            <Input defaultValue="JE-2025-0343" readOnly className="font-mono text-sm" />
          </div>
          <div>
            <label className="text-muted-foreground mb-1.5 block text-xs font-medium">Date</label>
            <Input type="date" defaultValue="2025-05-31" />
          </div>
          <div>
            <label className="text-muted-foreground mb-1.5 block text-xs font-medium">Reference</label>
            <Input placeholder="e.g. Depreciation, Accrual..." />
          </div>
        </div>

        <div>
          <label className="text-muted-foreground mb-1.5 block text-xs font-medium">Narration</label>
          <Textarea placeholder="Describe the purpose of this journal entry..." rows={2} />
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
                  <th className="px-3 py-2 font-medium">Account</th>
                  <th className="px-3 py-2 font-medium">Description</th>
                  <th className="w-32 px-3 py-2 text-right font-medium">Debit (₹)</th>
                  <th className="w-32 px-3 py-2 text-right font-medium">Credit (₹)</th>
                  <th className="w-10 px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {lines.map((l) => (
                  <tr key={l.id} className="border-b last:border-0">
                    <td className="p-2">
                      <Select value={l.account} onValueChange={(v) => updateLine(l.id, { account: v })}>
                        <SelectTrigger className="h-9 w-full"><SelectValue placeholder="Select account" /></SelectTrigger>
                        <SelectContent>
                          {accounts.map((a) => (
                            <SelectItem key={a} value={a}>{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-2">
                      <Input placeholder="Line description" value={l.description} onChange={(e) => updateLine(l.id, { description: e.target.value })} />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="text-right"
                        value={l.debit}
                        onChange={(e) => updateLine(l.id, { debit: e.target.value, credit: e.target.value ? "" : l.credit })}
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="text-right"
                        value={l.credit}
                        onChange={(e) => updateLine(l.id, { credit: e.target.value, debit: e.target.value ? "" : l.debit })}
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => removeLine(l.id)}
                        disabled={lines.length <= 2}
                        className="text-muted-foreground hover:text-destructive disabled:opacity-30"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted font-semibold text-foreground">
                  <td className="px-3 py-2" colSpan={2}>Total</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{inr(totals.debit, { decimals: true })}</td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">{inr(totals.credit, { decimals: true })}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="mt-2">
            {balanced ? (
              <Badge variant="success" className="gap-1.5"><CheckCircle2 className="size-3.5" /> Entry is balanced</Badge>
            ) : (
              <Badge variant="warning" className="gap-1.5">
                <AlertTriangle className="size-3.5" /> Entry is not balanced — difference of {inr(Math.abs(totals.diff), { decimals: true })}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>Save as Draft</Button>
          <Button disabled={!balanced} onClick={() => setOpen(false)}>Post Entry</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
