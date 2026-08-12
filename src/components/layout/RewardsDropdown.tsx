import { Gift, Users2, Wallet, Copy, Award } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

const rewards = [
  { icon: Users2, bg: "bg-info-bg text-info-foreground", title: "Refer a business", desc: "Get ₹1,000 credit for every referral that signs up.", tag: "Earn ₹1,000" },
  { icon: Award, bg: "bg-purple-bg text-purple-foreground", title: "Complete your profile", desc: "Add your company logo and GSTIN to unlock a badge.", tag: "50 pts" },
  { icon: Wallet, bg: "bg-success-bg text-success-foreground", title: "Redeem wallet credits", desc: "Use your earned credits toward your next Pro renewal.", tag: "₹250 available" },
]

export function RewardsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden text-muted-foreground lg:inline-flex">
          <Gift className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2.5">
          <p className="text-sm font-semibold text-foreground">Rewards &amp; Referrals</p>
          <Badge variant="success">₹250 credit</Badge>
        </div>
        <DropdownMenuSeparator className="my-0" />
        <div className="flex flex-col">
          {rewards.map((r) => (
            <div key={r.title} className="hover:bg-muted flex items-start gap-3 px-3 py-2.5">
              <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${r.bg}`}>
                <r.icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{r.title}</p>
                <p className="text-muted-foreground text-xs">{r.desc}</p>
              </div>
              <Badge variant="secondary" className="mt-0.5 shrink-0 whitespace-nowrap">{r.tag}</Badge>
            </div>
          ))}
        </div>
        <DropdownMenuSeparator className="my-0" />
        <div className="flex items-center gap-2 px-3 py-2.5">
          <div className="bg-muted text-muted-foreground flex-1 truncate rounded-md px-2 py-1.5 font-mono text-xs">codespanda.finovo.app/r/DEEPAK25</div>
          <Button size="icon-sm" variant="outline"><Copy className="size-3.5" /></Button>
        </div>
        <a href="/settings" className="text-primary block px-3 py-2.5 text-center text-sm font-medium">View all rewards</a>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
