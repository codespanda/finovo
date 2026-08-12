import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Menu,
  Search,
  Plus,
  ChevronDown,
  Building2,
  Moon,
  Sun,
  FileText,
  FileClock,
  ArrowDownToLine,
  ShoppingBag,
  ClipboardList,
  ArrowUpFromLine,
  Landmark,
  Receipt,
  Route,
  UserPlus,
  Truck,
  Package,
  FolderKanban,
  Users,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMobileContent } from "@/components/layout/Sidebar"
import { useTheme } from "@/components/layout/ThemeProvider"
import { NotificationsDropdown } from "@/components/layout/NotificationsDropdown"
import { MessagesDropdown } from "@/components/layout/MessagesDropdown"
import { RewardsDropdown } from "@/components/layout/RewardsDropdown"
import { UserProfileDialog, UserSettingsDialog } from "@/components/shared/UserDialogs"

const createGroups = [
  {
    label: "Sales",
    items: [
      { icon: FileText, label: "Invoice", sub: "Bill a customer", href: "/sales/invoices", color: "bg-info-bg text-info-foreground" },
      { icon: FileClock, label: "Estimate", sub: "Send a quote", href: "/sales/estimates", color: "bg-purple-bg text-purple-foreground" },
      { icon: ArrowDownToLine, label: "Payment Received", sub: "Record a receipt", href: "/sales/payments", color: "bg-success-bg text-success-foreground" },
    ],
  },
  {
    label: "Purchases",
    items: [
      { icon: ShoppingBag, label: "Bill", sub: "Record a vendor bill", href: "/purchases/bills", color: "bg-danger-bg text-danger-foreground" },
      { icon: ClipboardList, label: "Purchase Order", sub: "Order from a vendor", href: "/purchases/purchase-orders", color: "bg-warning-bg text-warning-foreground" },
      { icon: ArrowUpFromLine, label: "Vendor Payment", sub: "Pay a bill", href: "/purchases/payments", color: "bg-info-bg text-info-foreground" },
    ],
  },
  {
    label: "Banking & Expenses",
    items: [
      { icon: Landmark, label: "Bank Reconcile", sub: "Match transactions", href: "/banking/reconciliation", color: "bg-info-bg text-info-foreground" },
      { icon: Receipt, label: "Expense", sub: "Log a business expense", href: "/expenses", color: "bg-purple-bg text-purple-foreground" },
      { icon: Route, label: "Mileage", sub: "Track travel expense", href: "/expenses/mileage", color: "bg-success-bg text-success-foreground" },
    ],
  },
  {
    label: "People & Inventory",
    items: [
      { icon: UserPlus, label: "Customer", sub: "Add a new customer", href: "/sales/customers", color: "bg-info-bg text-info-foreground" },
      { icon: Truck, label: "Vendor", sub: "Add a new vendor", href: "/purchases/suppliers", color: "bg-warning-bg text-warning-foreground" },
      { icon: Package, label: "Item", sub: "Add a product or service", href: "/inventory/items", color: "bg-success-bg text-success-foreground" },
    ],
  },
  {
    label: "Team & Projects",
    items: [
      { icon: Wallet, label: "Payroll Run", sub: "Run payroll for this cycle", href: "/payroll/runs", color: "bg-purple-bg text-purple-foreground" },
      { icon: FolderKanban, label: "Project", sub: "Start a new project", href: "/projects", color: "bg-info-bg text-info-foreground" },
      { icon: Users, label: "Task", sub: "Assign a task", href: "/projects/tasks", color: "bg-success-bg text-success-foreground" },
    ],
  },
]

export function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="bg-background/80 sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b px-4 backdrop-blur supports-backdrop-filter:bg-background/60 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="size-5" />
      </Button>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0">
          <SidebarMobileContent onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <input
          placeholder="Search transactions, invoices, contacts..."
          className="border-input bg-muted/50 h-9 w-full rounded-lg border pr-14 pl-9 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
        />
        <kbd className="text-muted-foreground bg-card absolute top-1/2 right-2 -translate-y-1/2 rounded border px-1.5 py-0.5 text-[10px] font-medium">
          ⌘K
        </kbd>
      </div>

      <Button size="icon" variant="ghost" className="md:hidden ml-auto">
        <Search className="size-5" />
      </Button>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="hidden sm:inline-flex">
              <Plus className="size-4" />
              Create
              <ChevronDown className="size-3.5 opacity-80" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[21rem] max-h-[80vh] overflow-y-auto">
            {createGroups.map((group, i) => (
              <div key={group.label}>
                {i > 0 && <DropdownMenuSeparator />}
                <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                {group.items.map((item) => (
                  <DropdownMenuItem key={item.label} onClick={() => navigate(item.href)} className="gap-3 py-2">
                    <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                      <item.icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-muted-foreground text-xs">{item.sub}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button size="icon" className="sm:hidden">
          <Plus className="size-4" />
        </Button>

        <Button variant="ghost" size="icon" className="hidden text-muted-foreground sm:inline-flex" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>

        <RewardsDropdown />

        <NotificationsDropdown />
        <MessagesDropdown />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden items-center gap-2 md:flex">
              <Building2 className="size-4 text-muted-foreground" />
              Demo Company
              <ChevronDown className="size-3.5 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Switch Company</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Demo Company</DropdownMenuItem>
            <DropdownMenuItem>Demo Consulting</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>+ Add Company</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative shrink-0">
              <Avatar className="size-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary">DK</AvatarFallback>
              </Avatar>
              <span className="border-background absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 bg-success" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Deepak Kumar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <UserProfileDialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Profile</DropdownMenuItem>
              </DialogTrigger>
            </UserProfileDialog>
            <UserSettingsDialog>
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Settings</DropdownMenuItem>
              </DialogTrigger>
            </UserSettingsDialog>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
