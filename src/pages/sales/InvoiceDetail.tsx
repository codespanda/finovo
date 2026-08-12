import { useParams } from "react-router-dom"
import { Printer, Send, Download, MoreHorizontal, User, Mail, Phone, CheckCircle2, FileEdit } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DonutChart } from "@/components/shared/charts"
import { inr, MASKED, maskEmail, maskPhone } from "@/lib/format"

const items = [
  { desc: "Consulting Services", sub: "Business process consultation and advisory", hsn: "998313", qty: 10, rate: 5000, amount: 50000 },
  { desc: "Implementation", sub: "Software implementation and integration", hsn: "998314", qty: 15, rate: 1500, amount: 22500 },
  { desc: "Training", sub: "User training and documentation", hsn: "998315", qty: 5, rate: 500, amount: 2500 },
]

const activity = [
  { icon: CheckCircle2, title: "Paid", desc: "Payment of ₹75,000 received via HDFC Bank", time: "22 May 2025, 10:30 AM", color: "text-success-foreground" },
  { icon: Send, title: "Sent", desc: "Invoice sent to john.doe@acmecorp.com", time: "20 May 2025, 04:15 PM", color: "text-info-foreground" },
  { icon: FileEdit, title: "Created", desc: "Invoice created by John Doe", time: "20 May 2025, 11:20 AM", color: "text-purple-foreground" },
]

export function InvoiceDetail() {
  const { id } = useParams()

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Sales", href: "/sales" }, { label: "Invoices", href: "/sales/invoices" }, { label: id ?? "INV-1024" }]}
        title={
          <span className="flex items-center gap-2.5">
            Invoice {id ?? "INV-1024"} <StatusBadge status="Paid" />
          </span>
        }
        description="This invoice was paid on 22 May 2025."
        actions={
          <>
            <Button variant="outline"><Printer className="size-4" /> Print</Button>
            <Button variant="outline"><Send className="size-4" /> Send</Button>
            <Button variant="outline"><Download className="size-4" /> Download</Button>
            <Button variant="outline" size="icon"><MoreHorizontal className="size-4" /></Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <Card>
            <CardContent className="pt-5">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                <div>
                  <p className="text-muted-foreground text-xs">Invoice Date</p>
                  <p className="font-semibold text-foreground">28 May 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Due Date</p>
                  <p className="font-semibold text-foreground">30 May 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Total Amount</p>
                  <p className="font-semibold text-foreground">{inr(75000)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Balance Due</p>
                  <p className="text-success-foreground font-semibold">{inr(0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bill To</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 pb-5 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-foreground">Acme Corporation</p>
                <p className="text-muted-foreground text-sm">A-23, Sector 62, Noida, Uttar Pradesh - 201301</p>
                <p className="text-muted-foreground text-sm">India</p>
                <p className="text-primary mt-2 text-sm">accounts@acmecorp.com</p>
                <p className="text-muted-foreground text-sm">+91 98765 43210</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">GSTIN</p>
                <p className="mb-3 font-medium text-foreground">{MASKED}</p>
                <p className="text-muted-foreground text-xs">Payment Terms</p>
                <p className="font-medium text-foreground">Net 30 Days</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoice Items</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto pb-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">#</th>
                    <th className="pb-2 font-medium">Item &amp; Description</th>
                    <th className="pb-2 font-medium">HSN/SAC</th>
                    <th className="pb-2 text-right font-medium">Qty</th>
                    <th className="pb-2 text-right font-medium">Rate</th>
                    <th className="pb-2 text-right font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, i) => (
                    <tr key={it.desc} className="border-b">
                      <td className="text-muted-foreground py-3">{i + 1}</td>
                      <td className="py-3">
                        <p className="font-medium text-foreground">{it.desc}</p>
                        <p className="text-muted-foreground text-xs">{it.sub}</p>
                      </td>
                      <td className="text-muted-foreground py-3">{it.hsn}</td>
                      <td className="py-3 text-right">{it.qty.toFixed(2)}</td>
                      <td className="py-3 text-right">{it.rate.toFixed(2)}</td>
                      <td className="py-3 text-right font-medium text-foreground">{it.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 ml-auto flex max-w-xs flex-col gap-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Sub Total</span><span className="text-foreground">{inr(75000, { decimals: true })}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">CGST (9%)</span><span className="text-foreground">{inr(0, { decimals: true })}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">SGST (9%)</span><span className="text-foreground">{inr(0, { decimals: true })}</span></div>
                <div className="mt-1 flex justify-between border-t pt-1.5 font-semibold text-foreground"><span>Total</span><span>{inr(75000, { decimals: true })}</span></div>
                <div className="flex justify-between text-foreground"><span>Amount Paid</span><span>{inr(75000, { decimals: true })}</span></div>
                <div className="bg-success-bg text-success-foreground mt-1 flex justify-between rounded-md px-3 py-2 font-semibold"><span>Balance Due</span><span>{inr(0, { decimals: true })}</span></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Customer</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="bg-info-bg text-info-foreground flex size-9 items-center justify-center rounded-lg font-semibold">AC</div>
                <p className="font-semibold text-foreground">Acme Corporation</p>
              </div>
              <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
                <li className="flex items-center gap-2"><User className="size-3.5" /> John Doe</li>
                <li className="flex items-center gap-2"><Mail className="size-3.5" /> {maskEmail("john.doe@acmecorp.com")}</li>
                <li className="flex items-center gap-2"><Phone className="size-3.5" /> {maskPhone("+91 98765 43210")}</li>
              </ul>
              <Button variant="outline" className="mt-4 w-full">View Customer</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Payment Summary</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart
                data={[{ name: "Paid", value: 75000, color: "var(--color-chart-2)" }]}
                total={inr(75000)}
                totalLabel="Paid"
                size={110}
              />
              <div className="text-sm">
                <p className="text-muted-foreground">Paid</p>
                <p className="mb-2 font-semibold text-foreground">{inr(75000)}</p>
                <p className="text-muted-foreground">Outstanding</p>
                <p className="font-semibold text-foreground">{inr(0)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Invoice Activity</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <ul className="flex flex-col gap-4">
                {activity.map((a) => (
                  <li key={a.title} className="flex gap-3">
                    <a.icon className={`size-4 shrink-0 ${a.color}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      <p className="text-muted-foreground text-xs">{a.desc}</p>
                      <p className="text-muted-foreground text-xs">{a.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
