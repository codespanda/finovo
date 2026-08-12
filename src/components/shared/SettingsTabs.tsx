import { useNavigate } from "react-router-dom"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TABS = [
  { value: "org", label: "Organization Settings", href: "/settings" },
  { value: "users", label: "Users & Roles", href: "/settings/users-roles" },
  { value: "prefs", label: "Preferences", href: "/settings/preferences" },
  { value: "security", label: "Security", href: "/settings/security" },
  { value: "financial", label: "Financial Settings", href: "/settings/financial" },
  { value: "payroll", label: "Payroll Settings", href: "/settings/payroll" },
  { value: "audit", label: "Audit Log", href: "/settings/audit-log" },
]

export function SettingsTabs({ active }: { active: (typeof TABS)[number]["value"] }) {
  const navigate = useNavigate()

  return (
    <Tabs value={active} onValueChange={(v) => navigate(TABS.find((t) => t.value === v)!.href)}>
      <TabsList>
        {TABS.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
