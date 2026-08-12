import { useState } from "react"
import { Check, Sparkles, Star } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/month",
    desc: "For individuals just getting started.",
    features: ["Up to 10 invoices/month", "1 bank account", "Basic reports", "Single user"],
    cta: "Current Plan",
    current: true,
  },
  {
    name: "Pro",
    price: "₹1,499",
    period: "/month",
    desc: "For growing businesses that need more.",
    features: [
      "Unlimited invoices & bills",
      "Unlimited bank accounts",
      "GST, TDS & advanced tax reports",
      "Up to 10 users",
      "Payroll & inventory management",
      "Priority email & chat support",
    ],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large teams with custom needs.",
    features: [
      "Everything in Pro",
      "Unlimited users",
      "Custom roles & permissions",
      "Dedicated account manager",
      "API access & custom integrations",
      "99.9% uptime SLA",
    ],
    cta: "Contact Sales",
  },
]

export function UpgradeDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="max-w-3xl">
        <DialogHeader className="items-center text-center sm:items-center sm:text-center">
          <div className="bg-primary/10 mb-1 flex size-11 items-center justify-center rounded-full">
            <Sparkles className="text-primary size-5" />
          </div>
          <DialogTitle className="text-xl">Upgrade your plan</DialogTitle>
          <DialogDescription>Unlock advanced reports, more users and automation built for growing teams.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={cn(
                "relative flex flex-col rounded-xl border p-4",
                p.highlight ? "border-primary shadow-sm ring-1 ring-primary" : "border-border"
              )}
            >
              {p.highlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
                  <Star className="size-3" /> Most Popular
                </Badge>
              )}
              <p className="font-semibold text-foreground">{p.name}</p>
              <p className="mt-1 flex items-baseline gap-0.5">
                <span className="text-2xl font-bold text-foreground">{p.price}</span>
                {p.period && <span className="text-muted-foreground text-sm">{p.period}</span>}
              </p>
              <p className="text-muted-foreground mt-1 mb-4 text-xs">{p.desc}</p>
              <ul className="mb-5 flex flex-1 flex-col gap-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="text-success-foreground mt-0.5 size-3.5 shrink-0" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={p.current ? "outline" : p.highlight ? "default" : "outline"}
                disabled={p.current}
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {p.cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground text-center text-xs">
          All plans include a 14-day money-back guarantee. Prices exclude applicable GST.
        </p>
      </DialogContent>
    </Dialog>
  )
}
