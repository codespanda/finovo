import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SettingsField, SettingsToggleRow } from "@/components/shared/SettingsField"
import { SettingsTabs } from "@/components/shared/SettingsTabs"

export function FinancialSettingsPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Financial Settings" }]}
        title="Financial Settings"
        description="Configure currency, accounting method, invoicing and payment defaults."
        actions={<Button>Save Changes</Button>}
      />

      <div className="mb-5"><SettingsTabs active="financial" /></div>

      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <Card>
          <CardHeader><CardTitle>Accounting</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y pb-5">
            <SettingsField label="Base Currency">
              <Select defaultValue="inr">
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">INR (₹)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Accounting Method">
              <Select defaultValue="accrual">
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="accrual">Accrual</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsToggleRow label="Multi-Currency" hint="Allow invoices and bills in foreign currencies" defaultChecked={false} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Invoicing &amp; Payments</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y pb-5">
            <SettingsField label="Invoice Rounding">
              <Select defaultValue="nearest">
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nearest">Round to Nearest</SelectItem>
                  <SelectItem value="up">Round Up</SelectItem>
                  <SelectItem value="none">No Rounding</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Default Payment Terms">
              <Select defaultValue="net30">
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="net15">Net 15</SelectItem>
                  <SelectItem value="net30">Net 30</SelectItem>
                  <SelectItem value="net45">Net 45</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Late Payment Fee">
              <div className="flex items-center gap-2">
                <Input defaultValue="1.5" className="w-20 text-right" />
                <span className="text-muted-foreground text-sm">% per month</span>
              </div>
            </SettingsField>
            <SettingsToggleRow label="Auto-post Bank Charges" hint="Automatically record bank fee transactions" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
