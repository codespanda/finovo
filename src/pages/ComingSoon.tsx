import { Construction } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card } from "@/components/ui/card"

export function ComingSoon({ title, crumbs }: { title: string; crumbs?: { label: string; href?: string }[] }) {
  return (
    <div>
      <PageHeader crumbs={crumbs} title={title} description="This section is being built out." />
      <Card className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <div className="bg-muted flex size-14 items-center justify-center rounded-full">
          <Construction className="text-muted-foreground size-6" />
        </div>
        <div>
          <p className="font-semibold text-foreground">Coming soon</p>
          <p className="text-muted-foreground text-sm">We're still designing this page.</p>
        </div>
      </Card>
    </div>
  )
}
