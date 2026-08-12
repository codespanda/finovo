import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SettingsField, SettingsToggleRow } from "@/components/shared/SettingsField"
import { MASKED } from "@/lib/format"

export function TaxComplianceSettings() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Tax & Compliance" }]}
        title="Tax & Compliance"
        description="Configure GST, TDS, PF, ESI and other tax compliance settings."
        actions={<Button>Save Changes</Button>}
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <Card>
          <CardHeader><CardTitle>GST Settings</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y pb-5">
            <SettingsToggleRow label="Enable GST" hint="Apply GST on invoices, bills and returns" />
            <SettingsField label="Registration Type">
              <Select defaultValue="regular">
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="regular">Regular</SelectItem>
                  <SelectItem value="composition">Composition</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Default GST Rate">
              <Select defaultValue="18">
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0%</SelectItem>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="12">12%</SelectItem>
                  <SelectItem value="18">18%</SelectItem>
                  <SelectItem value="28">28%</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>TDS Settings</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y pb-5">
            <SettingsToggleRow label="Enable TDS" hint="Deduct TDS on eligible vendor payments" />
            <SettingsField label="TAN">
              <Input defaultValue={MASKED} readOnly className="w-56" />
            </SettingsField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Payroll Compliance</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y pb-5">
            <SettingsToggleRow label="Enable PF" hint="Deduct Provident Fund from employee salaries" />
            <SettingsField label="PF Establishment ID">
              <Input defaultValue={MASKED} readOnly className="w-56" />
            </SettingsField>
            <SettingsToggleRow label="Enable ESI" hint="Deduct ESI for eligible employees" />
            <SettingsField label="ESI Number">
              <Input defaultValue={MASKED} readOnly className="w-56" />
            </SettingsField>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
