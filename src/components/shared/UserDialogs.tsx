import { useState, type ReactNode } from "react"
import { User, SlidersHorizontal, Upload, Moon, Sun, Monitor } from "lucide-react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Field } from "@/components/shared/FormDialog"
import { useTheme } from "@/components/layout/ThemeProvider"
import { maskEmail, maskPhone } from "@/lib/format"

export function UserProfileDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-info-bg text-info-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
              <User className="size-4.5" />
            </div>
            <div>
              <DialogTitle>My Profile</DialogTitle>
              <DialogDescription>View and update your personal information.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarFallback className="bg-primary/10 text-primary text-lg">JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1.5">
            <Button variant="outline" size="sm" className="w-fit"><Upload className="size-3.5" /> Upload Photo</Button>
            <p className="text-muted-foreground text-xs">PNG or JPG, up to 2MB, square recommended.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Full Name"><Input defaultValue="John Doe" /></Field>
          <Field label="Job Title"><Input defaultValue="Finance Manager" /></Field>
          <Field label="Email"><Input type="email" value={maskEmail("john.doe@acme.com")} readOnly /></Field>
          <Field label="Phone"><Input type="tel" value={maskPhone("+91 98765 43210")} readOnly /></Field>
          <Field label="Department">
            <Select defaultValue="finance">
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Role">
            <Select defaultValue="owner">
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="owner">Owner</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="accountant">Accountant</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field label="Bio"><Textarea placeholder="A short description about yourself..." rows={2} /></Field>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function UserSettingsDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="bg-purple-bg text-purple-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
              <SlidersHorizontal className="size-4.5" />
            </div>
            <div>
              <DialogTitle>Account Settings</DialogTitle>
              <DialogDescription>Manage your preferences, notifications and security.</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">Appearance</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => theme !== "light" && toggleTheme()}
              className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-colors ${theme === "light" ? "border-primary bg-accent text-primary" : "text-muted-foreground hover:bg-muted"}`}
            >
              <Sun className="size-4" /> Light
            </button>
            <button
              type="button"
              onClick={() => theme !== "dark" && toggleTheme()}
              className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-colors ${theme === "dark" ? "border-primary bg-accent text-primary" : "text-muted-foreground hover:bg-muted"}`}
            >
              <Moon className="size-4" /> Dark
            </button>
            <button
              type="button"
              className="text-muted-foreground hover:bg-muted flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-colors"
            >
              <Monitor className="size-4" /> System
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Language">
            <Select defaultValue="en">
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Timezone">
            <Select defaultValue="ist">
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border p-3">
          <p className="text-sm font-semibold text-foreground">Notifications</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Email Notifications</p>
              <p className="text-muted-foreground text-xs">Receive updates about invoices, bills and approvals.</p>
            </div>
            <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Push Notifications</p>
              <p className="text-muted-foreground text-xs">Get real-time alerts in your browser.</p>
            </div>
            <Switch checked={pushNotifs} onCheckedChange={setPushNotifs} />
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border p-3">
          <p className="text-sm font-semibold text-foreground">Security</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Two-Factor Authentication</p>
              <p className="text-muted-foreground text-xs">Add an extra layer of security to your account.</p>
            </div>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>
          <button type="button" className="text-primary self-start text-xs font-medium hover:underline">Change Password</button>
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Save Settings</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
