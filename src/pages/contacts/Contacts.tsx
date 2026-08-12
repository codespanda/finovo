import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Users, UserCheck, Truck, Briefcase, Layers, Upload, Plus, Search, SlidersHorizontal } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { StatCard } from "@/components/shared/StatCard"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DialogTrigger } from "@/components/ui/dialog"
import { NewContactDialog } from "@/components/shared/EntityDialogs"
import { maskEmail, maskPhone } from "@/lib/format"

const contacts = [
  { id: "CUST-1001", name: "ABC Technologies Pvt. Ltd.", type: "Customer", email: "accounts@abctech.com", phone: "+91 98765 43210", outstanding: 125430, status: "Active", href: null },
  { id: "CUST-1002", name: "Sunrise Industries", type: "Customer", email: "info@sunrisein.com", phone: "+91 91234 56789", outstanding: 85600, status: "Active", href: null },
  { id: "SUP-1001", name: "Global Traders", type: "Supplier", email: "sales@globaltraders.com", phone: "+91 99887 66554", outstanding: -45250, status: "Active", href: "/contacts/suppliers/SUP-1001" },
  { id: "SUP-1002", name: "Office Essentials", type: "Supplier", email: "contact@officeess.com", phone: "+91 97654 32109", outstanding: -12840, status: "Active", href: null },
  { id: "EMP-1001", name: "Deepak Kumar", type: "Employee", email: "deepak.kumar@acme.com", phone: "+91 98765 43210", outstanding: 0, status: "Active", href: null },
  { id: "CUST-1003", name: "Webline Consulting", type: "Customer", email: "hello@webline.in", phone: "+91 99876 54321", outstanding: 32750, status: "Inactive", href: null },
]

const typeColors: Record<string, "info" | "success" | "purple"> = {
  Customer: "success",
  Supplier: "info",
  Employee: "purple",
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

const contactTabs = [
  { value: "all", label: "All Contacts" },
  { value: "customers", label: "Customers" },
  { value: "suppliers", label: "Suppliers" },
  { value: "employees", label: "Employees" },
  { value: "groups", label: "Groups" },
] as const

export function Contacts() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<(typeof contactTabs)[number]["value"]>("all")
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return contacts.filter((c) => {
      const matchesTab =
        tab === "all" ? true :
        tab === "customers" ? c.type === "Customer" :
        tab === "suppliers" ? c.type === "Supplier" :
        tab === "employees" ? c.type === "Employee" :
        true
      const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
      return matchesTab && matchesQuery
    })
  }, [tab, query])

  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Contacts" }]}
        title="Contacts"
        description="Manage customers, suppliers, employees and all your business contacts."
        actions={
          <>
            <Button variant="outline"><Upload className="size-4" /> Import Contacts</Button>
            <NewContactDialog>
              <DialogTrigger asChild>
                <Button><Plus className="size-4" /> New Contact</Button>
              </DialogTrigger>
            </NewContactDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <StatCard icon={Users} label="Total Contacts" value="1,248" delta={{ value: "8.6%" }} color="purple" />
        <StatCard icon={UserCheck} label="Customers" value="842" delta={{ value: "7.3%" }} color="green" />
        <StatCard icon={Truck} label="Suppliers" value="286" delta={{ value: "5.4%" }} color="blue" />
        <StatCard icon={Briefcase} label="Employees" value="98" delta={{ value: "3.2%" }} color="orange" />
        <StatCard icon={Layers} label="Groups" value="22" delta={{ value: "2.1%" }} color="purple" className="col-span-2 lg:col-span-1" />
      </div>

      <Card>
        <CardContent className="pt-5">
          <Tabs
            value={tab}
            onValueChange={(v) => {
              if (v === "groups") navigate("/contacts/groups")
              else setTab(v as typeof tab)
            }}
          >
            <TabsList>
              {contactTabs.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>{t.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="mt-4 mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative max-w-sm flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input placeholder="Search contacts..." className="pl-9" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <Button variant="outline" className="sm:ml-auto"><SlidersHorizontal className="size-4" /> Filters</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Email / Phone</TableHead>
                <TableHead className="text-right">Outstanding</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className={c.href ? "cursor-pointer" : undefined} onClick={() => c.href && navigate(c.href)}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8"><AvatarFallback className="bg-info-bg text-info-foreground">{initials(c.name)}</AvatarFallback></Avatar>
                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="text-muted-foreground text-xs">{c.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant={typeColors[c.type]}>{c.type}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{maskEmail(c.email)} · {maskPhone(c.phone)}</TableCell>
                  <TableCell className={`text-right font-medium ${c.outstanding < 0 ? "text-destructive" : "text-foreground"}`}>
                    {c.outstanding === 0 ? "—" : `₹${Math.abs(c.outstanding).toLocaleString("en-IN")}`}
                  </TableCell>
                  <TableCell><StatusBadge status={c.status} /></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">No contacts found for this filter.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="text-muted-foreground mt-4 text-sm">Showing {filtered.length} of {contacts.length} contacts</div>
        </CardContent>
      </Card>
    </div>
  )
}
