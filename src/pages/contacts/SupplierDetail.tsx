import { useParams } from "react-router-dom"
import { Pencil, Mail, Phone, MapPin, Send } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { DonutChart } from "@/components/shared/charts"
import { inr, MASKED, maskEmail, maskPhone } from "@/lib/format"

const recentTx = [
  { ref: "PO-10045", label: "Purchase Order", amount: 25000, date: "30 May 2025" },
  { ref: "INV-10078", label: "Invoice", amount: 45250, date: "28 May 2025", overdue: true },
  { ref: "PAY-10023", label: "Payment Sent", amount: -30000, date: "20 May 2025" },
]

export function SupplierDetail() {
  const { id } = useParams()

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Contacts", href: "/contacts" }, { label: "Suppliers", href: "/purchases/suppliers" }, { label: "Global Traders" }]}
        title={
          <span className="flex items-center gap-2.5">Global Traders <StatusBadge status="Active" /></span>
        }
        description={`Supplier • ${id ?? "SUP-1001"} • Since 15 Jan 2024`}
        actions={
          <>
            <Button variant="outline"><Pencil className="size-4" /> Edit</Button>
            <Button><Send className="size-4" /> Send Email</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <Card>
            <CardContent className="grid grid-cols-2 gap-6 pt-5 sm:grid-cols-4">
              <div><p className="text-muted-foreground text-xs">Outstanding</p><p className="text-destructive font-semibold">{inr(45250)}</p></div>
              <div><p className="text-muted-foreground text-xs">Total Purchases (YTD)</p><p className="font-semibold text-foreground">{inr(875300)}</p></div>
              <div><p className="text-muted-foreground text-xs">Overdue Amount</p><p className="text-destructive font-semibold">{inr(18750)}</p></div>
              <div><p className="text-muted-foreground text-xs">Payment Terms</p><p className="font-semibold text-foreground">Net 30 Days</p></div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="invoices">Invoices</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">Contact Information</p>
                      <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
                        <li className="flex items-center gap-2"><Mail className="size-3.5" /> {maskEmail("rajesh@globaltraders.com")}</li>
                        <li className="flex items-center gap-2"><Phone className="size-3.5" /> {maskPhone("+91 99887 66554")}</li>
                        <li className="flex items-center gap-2"><MapPin className="size-3.5" /> 123 Industrial Area, Gurugram, Haryana</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">Tax Details</p>
                      <p className="text-muted-foreground text-sm">GSTIN <span className="ml-2 font-medium text-foreground">{MASKED}</span></p>
                      <p className="text-muted-foreground text-sm">PAN <span className="ml-2 font-medium text-foreground">{MASKED}</span></p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="transactions" className="text-muted-foreground mt-4 text-sm">All transactions with this supplier.</TabsContent>
                <TabsContent value="invoices" className="text-muted-foreground mt-4 text-sm">Invoices raised by this supplier.</TabsContent>
                <TabsContent value="payments" className="text-muted-foreground mt-4 text-sm">Payments made to this supplier.</TabsContent>
                <TabsContent value="documents" className="text-muted-foreground mt-4 text-sm">Documents on file for this supplier.</TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Payment Summary</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4 pb-5">
              <DonutChart
                data={[
                  { name: "Paid", value: 630050, color: "var(--color-chart-2)" },
                  { name: "Outstanding", value: 45250, color: "var(--color-chart-3)" },
                  { name: "Overdue", value: 18750, color: "var(--color-chart-5)" },
                ]}
                total={inr(45250)}
                totalLabel="Outstanding"
                size={110}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {recentTx.map((t) => (
                <div key={t.ref} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-primary font-medium">{t.ref}</p>
                    <p className="text-muted-foreground text-xs">{t.label} • {t.date}</p>
                  </div>
                  <span className={`font-medium ${t.amount < 0 ? "text-success-foreground" : "text-foreground"}`}>
                    {t.amount < 0 ? "-" : ""}{inr(Math.abs(t.amount))}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
