import type { ReactNode } from "react"

import { Switch } from "@/components/ui/switch"

export function SettingsField({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:items-center sm:gap-4">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
      </div>
      <div className="sm:justify-self-end">{children}</div>
    </div>
  )
}

export function SettingsToggleRow({
  label,
  hint,
  defaultChecked = true,
}: {
  label: string
  hint?: string
  defaultChecked?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="text-muted-foreground text-xs">{hint}</p>}
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  )
}
