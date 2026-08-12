import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SettingsField } from "@/components/shared/SettingsField"

export function BusinessDetails() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Business Details" }]}
        title="Business Details"
        description="Manage your business type, industry, registration details and financial year."
        actions={<Button>Save Changes</Button>}
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <Card>
          <CardHeader><CardTitle>Business Classification</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y pb-5">
            <SettingsField label="Business Type">
              <Select defaultValue="pvt-ltd">
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pvt-ltd">Private Limited Company</SelectItem>
                  <SelectItem value="llp">LLP</SelectItem>
                  <SelectItem value="proprietorship">Sole Proprietorship</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Industry">
              <Select defaultValue="it">
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT &amp; Software Services</SelectItem>
                  <SelectItem value="retail">Retail &amp; E-commerce</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Date of Incorporation">
              <Input type="date" defaultValue="2015-06-12" className="w-56" />
            </SettingsField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Registration Details</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2">
            <div>
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium">Registration Number</label>
              <Input defaultValue="U72900KA2015PTC123456" />
            </div>
            <div>
              <label className="text-muted-foreground mb-1.5 block text-xs font-medium">Registered With</label>
              <Input defaultValue="Registrar of Companies, Bengaluru" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Financial Year</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y pb-5">
            <SettingsField label="Financial Year Start" hint="Used across accounting, tax and payroll modules">
              <Select defaultValue="apr">
                <SelectTrigger className="w-56"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="apr">1 April</SelectItem>
                  <SelectItem value="jan">1 January</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Current Financial Year">
              <span className="text-sm font-medium text-foreground">FY 2025-26</span>
            </SettingsField>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
