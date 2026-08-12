import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

const groups = [
  {
    title: "Sales & Payments",
    items: [
      { label: "Invoice Payments Received", email: true, app: true },
      { label: "Payment Reminders Sent", email: true, app: false },
      { label: "Estimate Accepted / Declined", email: false, app: true },
    ],
  },
  {
    title: "Purchases & Bills",
    items: [
      { label: "Bill Due Reminders", email: true, app: true },
      { label: "Purchase Order Approved", email: false, app: true },
    ],
  },
  {
    title: "Payroll & Inventory",
    items: [
      { label: "Payroll Run Completed", email: true, app: true },
      { label: "Low Stock Alerts", email: true, app: true },
    ],
  },
  {
    title: "Tax & System",
    items: [
      { label: "Tax Filing Deadlines", email: true, app: true },
      { label: "System Updates & Maintenance", email: false, app: true },
    ],
  },
]

export function NotificationSettings() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Notification Settings" }]}
        title="Notification Settings"
        description="Configure email and in-app notification preferences."
        actions={<Button>Save Changes</Button>}
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        {groups.map((g) => (
          <Card key={g.title}>
            <CardHeader><CardTitle>{g.title}</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <div className="text-muted-foreground mb-2 grid grid-cols-[1fr_60px_60px] gap-4 text-xs font-medium">
                <span />
                <span className="text-center">Email</span>
                <span className="text-center">In-App</span>
              </div>
              <div className="flex flex-col divide-y">
                {g.items.map((i) => (
                  <div key={i.label} className="grid grid-cols-[1fr_60px_60px] items-center gap-4 py-2.5">
                    <span className="text-sm text-foreground">{i.label}</span>
                    <span className="flex justify-center"><Switch defaultChecked={i.email} /></span>
                    <span className="flex justify-center"><Switch defaultChecked={i.app} /></span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
