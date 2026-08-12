import {
  Search,
  Rocket,
  Calculator,
  Users,
  Percent,
  Puzzle,
  BarChart3,
  FileText,
  Wrench,
  MessageCircle,
  Mail,
  Phone,
  Headset,
} from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { MASKED } from "@/lib/format"

const topics = [
  { icon: Rocket, color: "info", title: "Getting Started", desc: "New to Finovo? Learn the basics and set up your organization.", count: 12 },
  { icon: Calculator, color: "success", title: "Accounting", desc: "Learn about accounts, journals, reconciliations and more.", count: 28 },
  { icon: Users, color: "purple", title: "Payroll", desc: "Set up payroll, run pay cycles and manage employees.", count: 18 },
  { icon: Percent, color: "warning", title: "GST & Tax", desc: "GST setup, returns, TDS and other tax related help.", count: 22 },
  { icon: Puzzle, color: "success", title: "Integrations", desc: "Connect and sync with banks, apps and third-party services.", count: 16 },
  { icon: BarChart3, color: "danger", title: "Reports", desc: "Generate and customize reports for your business.", count: 14 },
  { icon: FileText, color: "info", title: "Billing & Invoicing", desc: "Create invoices, quotes and manage payments.", count: 20 },
  { icon: Wrench, color: "purple", title: "Troubleshooting", desc: "Fix common issues and errors in Finovo.", count: 15 },
] as const

const colorMap: Record<string, string> = {
  info: "bg-info-bg text-info-foreground",
  success: "bg-success-bg text-success-foreground",
  warning: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  danger: "bg-danger-bg text-danger-foreground",
}

const requests = [
  { id: "#SR-12548", title: "Payroll calculation mismatch", status: "Resolved", date: "Resolved on 28 May 2025" },
  { id: "#SR-12521", title: "Unable to import bank statement", status: "In Progress", date: "Updated on 27 May 2025" },
  { id: "#SR-12489", title: "GST return filing error", status: "Closed", date: "Closed on 23 May 2025" },
]

export function HelpSupport() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Help & Support" }]}
        title="Help & Support"
        description="We're here to help you succeed. Find answers, get in touch, or track your support requests."
      />

      <Card className="mb-5">
        <CardContent className="pt-6 pb-6">
          <h2 className="text-xl font-bold text-foreground">How can we help you today?</h2>
          <p className="text-muted-foreground mb-4 text-sm">Search our knowledge base or browse topics to find the answers you need.</p>
          <div className="flex max-w-lg gap-2">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input placeholder="Search for articles, topics or keywords..." className="pl-9" />
            </div>
            <Button>Search</Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Payroll setup", "GST Filing", "Bank Reconciliation", "Xero Integration"].map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <Card>
            <CardHeader><CardTitle>Browse Help Topics</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-3 pb-5 sm:grid-cols-2">
              {topics.map((t) => (
                <button key={t.title} className="hover:bg-muted flex flex-col gap-2 rounded-lg border p-4 text-left transition-colors">
                  <div className={`flex size-9 items-center justify-center rounded-lg ${colorMap[t.color]}`}>
                    <t.icon className="size-4.5" />
                  </div>
                  <p className="font-medium text-foreground">{t.title}</p>
                  <p className="text-muted-foreground text-xs">{t.desc}</p>
                  <span className="text-primary text-xs font-medium">{t.count} articles →</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Contact Support</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <MessageCircle className="text-info-foreground size-5 shrink-0" />
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">Live Chat <Badge variant="success">Online</Badge></p>
                  <p className="text-muted-foreground text-xs">Chat with our support team in real time.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Mail className="text-info-foreground size-5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email Support</p>
                  <p className="text-muted-foreground text-xs">{MASKED}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Phone className="text-info-foreground size-5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Phone Support</p>
                  <p className="text-muted-foreground text-xs">{MASKED}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Headset className="text-info-foreground size-5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Request a Callback</p>
                  <p className="text-muted-foreground text-xs">Share your number and we'll call you.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Your Support Requests</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {requests.map((r) => (
                <div key={r.id} className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-muted-foreground text-xs">{r.id}</p>
                    <p className="truncate text-sm font-medium text-foreground">{r.title}</p>
                    <p className="text-muted-foreground text-xs">{r.date}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
