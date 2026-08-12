import { Badge } from "@/components/ui/badge"
import { statusVariant } from "@/lib/format"

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant={statusVariant(status)}>{status}</Badge>
}
