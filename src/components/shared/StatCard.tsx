import type { LucideIcon } from "lucide-react"
import { ArrowUp, ArrowDown } from "lucide-react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  delta?: { value: string; positive?: boolean; label?: string }
  color?: "blue" | "green" | "orange" | "red" | "purple" | "pink"
  className?: string
}

const colorMap: Record<NonNullable<StatCardProps["color"]>, string> = {
  blue: "bg-info-bg text-info-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  red: "bg-danger-bg text-danger-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  pink: "bg-purple-bg text-purple-foreground",
}

export function StatCard({ icon: Icon, label, value, delta, color = "blue", className }: StatCardProps) {
  return (
    <Card className={cn("gap-2 p-4", className)}>
      <div className="flex items-center gap-3">
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg", colorMap[color])}>
          <Icon className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="text-muted-foreground truncate text-xs font-medium">{label}</p>
          <p className="truncate text-lg font-bold text-foreground">{value}</p>
        </div>
      </div>
      {delta && (
        <p
          className={cn(
            "flex items-center gap-0.5 text-xs font-medium",
            delta.positive === false ? "text-destructive" : "text-success-foreground"
          )}
        >
          {delta.positive === false ? (
            <ArrowDown className="size-3" />
          ) : (
            <ArrowUp className="size-3" />
          )}
          {delta.value} {delta.label ?? "from last period"}
        </p>
      )}
    </Card>
  )
}
