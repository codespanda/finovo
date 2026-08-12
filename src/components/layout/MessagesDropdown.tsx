import { MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

const messages = [
  { name: "Priya Sharma", initials: "PS", bg: "bg-info-bg text-info-foreground", text: "Can you review the Q1 GST reconciliation?", time: "10 min ago", unread: true },
  { name: "Rahul Mehta", initials: "RM", bg: "bg-success-bg text-success-foreground", text: "Payroll for May is ready for approval.", time: "1 hour ago", unread: true },
  { name: "Neha Kapoor", initials: "NK", bg: "bg-purple-bg text-purple-foreground", text: "Sent the updated vendor contract, please check.", time: "Yesterday", unread: false },
]

export function MessagesDropdown() {
  const unreadCount = messages.filter((m) => m.unread).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hidden text-muted-foreground sm:inline-flex">
          <MessageSquare className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2.5">
          <p className="text-sm font-semibold text-foreground">Messages</p>
          <button className="text-primary text-xs font-medium">Mark all as read</button>
        </div>
        <DropdownMenuSeparator className="my-0" />
        <div className="flex max-h-80 flex-col overflow-y-auto">
          {messages.map((m) => (
            <div key={m.name} className="hover:bg-muted flex items-start gap-3 px-3 py-2.5">
              <Avatar className="size-8 shrink-0"><AvatarFallback className={`text-xs ${m.bg}`}>{m.initials}</AvatarFallback></Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{m.name}</p>
                <p className="text-muted-foreground line-clamp-1 text-xs">{m.text}</p>
                <p className="text-muted-foreground mt-0.5 text-[11px]">{m.time}</p>
              </div>
              {m.unread && <span className="bg-primary mt-1.5 size-2 shrink-0 rounded-full" />}
            </div>
          ))}
        </div>
        <DropdownMenuSeparator className="my-0" />
        <a href="/settings" className="text-primary block px-3 py-2.5 text-center text-sm font-medium">View all messages</a>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
