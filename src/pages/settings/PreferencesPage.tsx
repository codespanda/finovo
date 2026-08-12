import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SettingsField, SettingsToggleRow } from "@/components/shared/SettingsField"
import { SettingsTabs } from "@/components/shared/SettingsTabs"

export function PreferencesPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Preferences" }]}
        title="Preferences"
        description="Manage date format, currency, timezone and other preferences."
        actions={<Button>Save Changes</Button>}
      />

      <div className="mb-5"><SettingsTabs active="prefs" /></div>

      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <Card>
          <CardHeader><CardTitle>Regional</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y pb-5">
            <SettingsField label="Date Format">
              <Select defaultValue="dd-mm-yyyy">
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Currency">
              <Select defaultValue="inr">
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">INR (₹)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Number Format">
              <Select defaultValue="indian">
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="indian">Indian (1,23,456)</SelectItem>
                  <SelectItem value="international">International (123,456)</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Timezone">
              <Select defaultValue="ist">
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ist">(GMT+5:30) India Standard Time</SelectItem>
                  <SelectItem value="utc">(GMT+0:00) UTC</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsField label="Language">
              <Select defaultValue="en">
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y pb-5">
            <SettingsField label="Theme">
              <Select defaultValue="system">
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </SettingsField>
            <SettingsToggleRow label="Compact Sidebar" hint="Reduce sidebar width to fit more content" defaultChecked={false} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
