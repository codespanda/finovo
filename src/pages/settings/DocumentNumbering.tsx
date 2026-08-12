import { FileDigit } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const docs = [
  { type: "Invoice", prefix: "INV-", next: "1025", format: "INV-{YY}-{YY}-{####}", reset: "Yearly" },
  { type: "Bill", prefix: "BILL-", next: "1057", format: "BILL-{YY}-{YY}-{####}", reset: "Yearly" },
  { type: "Purchase Order", prefix: "PO-", next: "458", format: "PO-{YY}-{YY}-{###}", reset: "Yearly" },
  { type: "Credit Note", prefix: "CN-", next: "213", format: "CN-{YY}-{YY}-{###}", reset: "Yearly" },
  { type: "Debit Note", prefix: "DBN-", next: "39", format: "DBN-{YY}-{YY}-{###}", reset: "Yearly" },
  { type: "Payment Receipt", prefix: "PMT-", next: "892", format: "PMT-{YY}-{YY}-{####}", reset: "Yearly" },
  { type: "Expense Claim", prefix: "EXP-", next: "341", format: "EXP-{YY}-{YY}-{###}", reset: "Yearly" },
  { type: "Estimate", prefix: "EST-", next: "176", format: "EST-{YY}-{YY}-{###}", reset: "Yearly" },
]

export function DocumentNumbering() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Document Numbering" }]}
        title="Document Numbering"
        description="Set prefixes, number formats and sequences for invoices and other documents."
        actions={<Button>Save Changes</Button>}
      />

      <Card>
        <CardContent className="overflow-x-auto pt-5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b text-left text-xs">
                <th className="pb-2 font-medium">Document Type</th>
                <th className="pb-2 font-medium">Prefix</th>
                <th className="pb-2 font-medium">Next Number</th>
                <th className="pb-2 font-medium">Number Format</th>
                <th className="pb-2 font-medium">Reset Frequency</th>
                <th className="pb-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d.type} className="border-b last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-info-bg text-info-foreground flex size-8 shrink-0 items-center justify-center rounded-lg"><FileDigit className="size-4" /></div>
                      <span className="font-medium whitespace-nowrap text-foreground">{d.type}</span>
                    </div>
                  </td>
                  <td className="py-3 font-mono text-xs whitespace-nowrap text-foreground">{d.prefix}</td>
                  <td className="text-muted-foreground py-3 whitespace-nowrap">{d.next}</td>
                  <td className="text-muted-foreground py-3 font-mono text-xs whitespace-nowrap">{d.format}</td>
                  <td className="text-muted-foreground py-3 whitespace-nowrap">{d.reset}</td>
                  <td className="py-3"><Button size="sm" variant="outline">Edit</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
