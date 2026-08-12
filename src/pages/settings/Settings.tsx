import { Link } from "react-router-dom"
import {
  Building2,
  Percent,
  Bell,
  FileDigit,
  SlidersHorizontal,
  Landmark,
  UsersRound,
  History,
  ShieldCheck,
  ChevronRight,
} from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SettingsTabs } from "@/components/shared/SettingsTabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MASKED } from "@/lib/format"

const orgSettings = [
  { icon: Building2, color: "info", title: "Company Profile", desc: "View and update your company information, address, and contact details.", href: "/settings/company-profile" },
  { icon: UsersRound, color: "purple", title: "Users & Roles", desc: "Manage users, roles, permissions and access levels.", href: "/settings/users-roles" },
  { icon: Landmark, color: "success", title: "Business Details", desc: "Manage your business type, industry, registration details and financial year.", href: "/settings/business-details" },
  { icon: ShieldCheck, color: "success", title: "Security Settings", desc: "Manage password policies, 2FA, sessions and other security preferences.", href: "/settings/security" },
  { icon: Percent, color: "warning", title: "Tax & Compliance", desc: "Configure GST, TDS, PF, ESI and other tax compliance settings.", href: "/settings/tax-compliance" },
  { icon: Bell, color: "purple", title: "Notification Settings", desc: "Configure email and in-app notification preferences.", href: "/settings/notifications" },
  { icon: FileDigit, color: "info", title: "Document Numbering", desc: "Set prefixes, number formats and sequences for invoices and other documents.", href: "/settings/document-numbering" },
  { icon: SlidersHorizontal, color: "warning", title: "Preferences", desc: "Manage date format, currency, timezone and other preferences.", href: "/settings/preferences" },
] as const

const colorMap: Record<string, string> = {
  info: "bg-info-bg text-info-foreground",
  success: "bg-success-bg text-success-foreground",
  warning: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
}

export function Settings() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings" }, { label: "Organization Settings" }]}
        title="Settings"
        description="Manage your organization, preferences and system configurations."
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card>
            <CardContent className="pt-5">
              <SettingsTabs active="org" />

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {orgSettings.map((s) => (
                  <Link key={s.title} to={s.href} className="hover:bg-muted flex items-start gap-3 rounded-lg border p-4 text-left transition-colors">
                    <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${colorMap[s.color]}`}>
                      <s.icon className="size-4.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">{s.title}</p>
                      <p className="text-muted-foreground text-xs">{s.desc}</p>
                    </div>
                    <ChevronRight className="text-muted-foreground size-4 shrink-0" />
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">Audit & Activity</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Link to="/settings/audit-log" className="hover:bg-muted flex items-start gap-3 rounded-lg border p-4 text-left transition-colors">
                    <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg text-foreground"><History className="size-4.5" /></div>
                    <div>
                      <p className="font-medium text-foreground">Audit Log</p>
                      <p className="text-muted-foreground text-xs">View all system activities, changes and user actions.</p>
                    </div>
                  </Link>
                  <Link to="/settings/login-history" className="hover:bg-muted flex items-start gap-3 rounded-lg border p-4 text-left transition-colors">
                    <div className="bg-success-bg text-success-foreground flex size-9 shrink-0 items-center justify-center rounded-lg"><ShieldCheck className="size-4.5" /></div>
                    <div>
                      <p className="font-medium text-foreground">Login History</p>
                      <p className="text-muted-foreground text-xs">View login history and user access sessions.</p>
                    </div>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Company Profile</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="bg-info-bg text-info-foreground flex size-11 items-center justify-center rounded-lg"><Building2 className="size-5" /></div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">Demo Company</p>
                    <Badge variant="success">Active</Badge>
                  </div>
                  <p className="text-muted-foreground text-xs">CIN: {MASKED}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">GSTIN: {MASKED}</p>
              <p className="text-muted-foreground mb-4 text-sm">123 Business Street, Bengaluru, Karnataka - 560001</p>
              <Button variant="outline" className="w-full">Edit Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Storage Usage</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <div className="bg-muted mb-2 h-2 w-full overflow-hidden rounded-full">
                <div className="bg-primary h-full" style={{ width: "34%" }} />
              </div>
              <p className="text-muted-foreground text-xs">3.45 GB / 10 GB Used</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Subscription</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-semibold text-foreground">Finovo Pro Plan</p>
                <Badge variant="success">Active</Badge>
              </div>
              <p className="text-muted-foreground mb-3 text-sm">Valid till 31 Dec 2026</p>
              <Button variant="outline" className="w-full">View Plan Details</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
