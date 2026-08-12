import { useMemo, useState } from "react"
import { Search, Sparkles, PlugZap } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  { value: "all", label: "All Integrations" },
  { value: "Accounting", label: "Accounting & Finance" },
  { value: "Payments", label: "Payments" },
  { value: "Productivity", label: "Productivity" },
  { value: "E-commerce", label: "E-commerce" },
] as const

const apps = [
  { name: "Xero", desc: "Sync your financial data, invoices, bank transactions and more.", cat: "Accounting", color: "bg-info-bg text-info-foreground" },
  { name: "QuickBooks Online", desc: "Import sales, expenses, customers and vendors seamlessly.", cat: "Accounting", color: "bg-success-bg text-success-foreground" },
  { name: "Zoho Books", desc: "Sync invoices, expenses, contacts and chart of accounts.", cat: "Accounting", color: "bg-danger-bg text-danger-foreground" },
  { name: "Razorpay", desc: "Accept payments and auto-reconcile transactions.", cat: "Payments", color: "bg-info-bg text-info-foreground" },
  { name: "Stripe", desc: "Process online payments and manage subscriptions.", cat: "Payments", color: "bg-purple-bg text-purple-foreground" },
  { name: "Google Sheets", desc: "Sync data to Google Sheets and keep it always updated.", cat: "Productivity", color: "bg-success-bg text-success-foreground" },
  { name: "Slack", desc: "Get real-time notifications and alerts in Slack.", cat: "Productivity", color: "bg-purple-bg text-purple-foreground" },
  { name: "MS Excel", desc: "Import and export your data seamlessly with Excel.", cat: "Productivity", color: "bg-success-bg text-success-foreground" },
  { name: "Shopify", desc: "Sync orders, customers and payouts with Shopify.", cat: "E-commerce", color: "bg-success-bg text-success-foreground" },
]

const connected = [
  { name: "Xero", date: "28 May 2025" },
  { name: "Razorpay", date: "20 May 2025" },
  { name: "Google Sheets", date: "15 May 2025" },
  { name: "Slack", date: "10 May 2025" },
]

export function Integrations() {
  const [tab, setTab] = useState<(typeof categories)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const apps_ = useMemo(() => {
    const q = query.trim().toLowerCase()
    return apps.filter((a) => (tab === "all" || a.cat === tab) && (!q || a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q)))
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Integrations" }]}
        title="Integrations"
        description="Connect Finovo with your favorite apps and services to automate workflows and sync data."
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <Card className="from-primary/10 to-primary/[0.02] bg-gradient-to-br">
            <CardContent className="flex items-center gap-3 py-5">
              <Sparkles className="text-primary size-6 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Connect. Sync. Automate.</p>
                <p className="text-muted-foreground text-sm">Integrate Finovo with the tools you use every day.</p>
              </div>
            </CardContent>
          </Card>

          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList>
              {categories.map((c) => (
                <TabsTrigger key={c.value} value={c.value}>{c.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative max-w-sm">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input placeholder="Search integrations..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          {apps_.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {apps_.map((a) => (
                <Card key={a.name}>
                  <CardContent className="pt-5">
                    <div className="mb-2 flex items-center gap-3">
                      <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg font-bold ${a.color}`}>{a.name[0]}</div>
                      <p className="font-semibold text-foreground">{a.name}</p>
                    </div>
                    <p className="text-muted-foreground mb-3 text-sm">{a.desc}</p>
                    <Badge variant="secondary" className="mb-3">{a.cat}</Badge>
                    <Button variant="outline" className="w-full">Connect</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center gap-2 py-12 text-center">
                <div className="bg-muted flex size-12 items-center justify-center rounded-full text-foreground"><PlugZap className="size-5" /></div>
                <p className="text-sm font-medium text-foreground">No integrations found</p>
                <p className="text-muted-foreground text-xs">Try a different category or search term.</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Connected Integrations</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {connected.map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.name}</p>
                    <p className="text-muted-foreground text-xs">Connected on {c.date}</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Need Help?</CardTitle></CardHeader>
            <CardContent className="pb-5">
              <p className="text-muted-foreground mb-3 text-sm">
                Check our integration guides or contact our support team.
              </p>
              <Button variant="outline" className="w-full">Contact Support</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
