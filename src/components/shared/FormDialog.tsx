import { useState, type ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function FormDialog({
  icon: Icon,
  iconBg,
  title,
  description,
  primaryLabel,
  secondaryLabel,
  wide,
  children,
  trigger,
}: {
  icon: LucideIcon
  iconBg: string
  title: string
  description: string
  primaryLabel: string
  secondaryLabel?: string
  wide?: boolean
  children: ReactNode
  trigger: ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger}
      <DialogContent className={wide ? "max-w-xl" : "max-w-md"}>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
              <Icon className="size-4.5" />
            </div>
            <div>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4">{children}</div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          {secondaryLabel && <Button variant="outline" onClick={() => setOpen(false)}>{secondaryLabel}</Button>}
          <Button onClick={() => setOpen(false)}>{primaryLabel}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="text-muted-foreground mb-1.5 block text-xs font-medium">{label}</label>
      {children}
    </div>
  )
}
