import { Bell, CheckCircle2, FileWarning, IndianRupee, Users2, CalendarClock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

const notifications = [
  { icon: IndianRupee, bg: "bg-success-bg text-success-foreground", title: "Payment received", desc: "INV-25-26-1024 paid by Global Enterprises · ₹45,000", time: "5 min ago", unread: true },
  { icon: FileWarning, bg: "bg-danger-bg text-danger-foreground", title: "GSTR-3B overdue", desc: "GSTR-3B for Mar 2025 is overdue for filing.", time: "1 hour ago", unread: true },
  { icon: CalendarClock, bg: "bg-warning-bg text-warning-foreground", title: "Bill due tomorrow", desc: "BILL/25-26/1054 to Shakti Enterprises · ₹73,160", time: "3 hours ago", unread: true },
  { icon: Users2, bg: "bg-info-bg text-info-foreground", title: "New user invited", desc: "Sunil Reddy was invited as a Viewer.", time: "Yesterday", unread: false },
  { icon: CheckCircle2, bg: "bg-success-bg text-success-foreground", title: "Payroll run completed", desc: "May 2025 payroll processed for 128 employees.", time: "2 days ago", unread: false },
]

export function NotificationsDropdown() {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2.5">
          <p className="text-sm font-semibold text-foreground">Notifications</p>
          <button className="text-primary text-xs font-medium">Mark all as read</button>
        </div>
        <DropdownMenuSeparator className="my-0" />
        <div className="flex max-h-80 flex-col overflow-y-auto">
          {notifications.map((n, i) => (
            <div key={i} className="hover:bg-muted flex items-start gap-3 px-3 py-2.5">
              <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${n.bg}`}>
                <n.icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                <p className="text-muted-foreground line-clamp-2 text-xs">{n.desc}</p>
                <p className="text-muted-foreground mt-0.5 text-[11px]">{n.time}</p>
              </div>
              {n.unread && <span className="bg-primary mt-1.5 size-2 shrink-0 rounded-full" />}
            </div>
          ))}
        </div>
        <DropdownMenuSeparator className="my-0" />
        <a href="/settings" className="text-primary block px-3 py-2.5 text-center text-sm font-medium">View all notifications</a>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
