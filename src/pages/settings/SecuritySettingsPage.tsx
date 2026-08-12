import { Monitor, Smartphone, Laptop } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SettingsField, SettingsToggleRow } from "@/components/shared/SettingsField"
import { SettingsTabs } from "@/components/shared/SettingsTabs"
import { MASKED } from "@/lib/format"

const sessions = [
  { icon: Laptop, device: "MacBook Pro", browser: "Chrome on macOS", location: "Bengaluru, India", current: true, lastActive: "Active now" },
  { icon: Smartphone, device: "iPhone 15", browser: "Safari on iOS", location: "Bengaluru, India", current: false, lastActive: "2 hours ago" },
  { icon: Monitor, device: "Windows PC", browser: "Edge on Windows", location: "Mumbai, India", current: false, lastActive: "3 days ago" },
]

export function SecuritySettingsPage() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Security Settings" }]}
        title="Security Settings"
        description="Manage password policies, 2FA, sessions and other security preferences."
        actions={<Button>Save Changes</Button>}
      />

      <div className="mb-5"><SettingsTabs active="security" /></div>

      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <Card>
          <CardHeader><CardTitle>Change Password</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2">
            <Input type="password" defaultValue={MASKED} placeholder="Current password" />
            <div />
            <Input type="password" placeholder="New password" />
            <Input type="password" placeholder="Confirm new password" />
            <Button variant="outline" className="w-fit sm:col-span-2">Update Password</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Authentication</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y pb-5">
            <SettingsToggleRow label="Two-Factor Authentication" hint="Require a verification code at login" />
            <SettingsToggleRow label="Login Alerts" hint="Email me when a new device logs in" />
            <SettingsToggleRow label="Enforce Strong Passwords" hint="Require uppercase, number and symbol" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Password Policy</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y pb-5">
            <SettingsField label="Minimum Password Length">
              <span className="text-sm font-medium text-foreground">8 characters</span>
            </SettingsField>
            <SettingsField label="Password Expiry">
              <span className="text-sm font-medium text-foreground">90 days</span>
            </SettingsField>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Active Sessions</CardTitle></CardHeader>
          <CardContent className="flex flex-col divide-y pb-5">
            {sessions.map((s) => (
              <div key={s.device} className="flex items-center gap-3 py-3">
                <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg text-foreground"><s.icon className="size-4.5" /></div>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                    {s.device} {s.current && <span className="text-success-foreground text-xs font-normal">(This device)</span>}
                  </p>
                  <p className="text-muted-foreground text-xs">{s.browser} · {s.location} · {s.lastActive}</p>
                </div>
                {!s.current && <Button size="sm" variant="outline">Revoke</Button>}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
