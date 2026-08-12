import { Building2, Upload } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MASKED } from "@/lib/format"

function Field({ label, defaultValue, masked }: { label: string; defaultValue?: string; masked?: boolean }) {
  return (
    <div>
      <label className="text-muted-foreground mb-1.5 block text-xs font-medium">{label}</label>
      <Input defaultValue={masked ? MASKED : defaultValue} readOnly={masked} />
    </div>
  )
}

export function CompanyProfile() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Settings", href: "/settings" }, { label: "Company Profile" }]}
        title="Company Profile"
        description="View and update your company information, address, and contact details."
        actions={<Button>Save Changes</Button>}
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <Card>
            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2">
              <Field label="Company Name" defaultValue="Demo Company" />
              <Field label="Legal Name" defaultValue="Demo Consulting Pvt. Ltd." />
              <Field label="CIN" masked />
              <Field label="GSTIN" masked />
              <Field label="PAN" masked />
              <Field label="Constitution of Business" defaultValue="Private Limited Company" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Address</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2">
              <Field label="Address Line" defaultValue="123 Business Street" />
              <Field label="City" defaultValue="Bengaluru" />
              <Field label="State" defaultValue="Karnataka" />
              <Field label="Pincode" defaultValue="560001" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Contact Details</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2">
              <Field label="Phone" masked />
              <Field label="Email" defaultValue="hello@codespanda.com" />
              <Field label="Website" defaultValue="www.codespanda.com" />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader><CardTitle>Company Logo</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <Avatar className="size-20">
                <AvatarFallback className="bg-info-bg text-info-foreground"><Building2 className="size-8" /></AvatarFallback>
              </Avatar>
              <Button variant="outline" className="w-full"><Upload className="size-4" /> Upload Logo</Button>
              <p className="text-muted-foreground text-center text-xs">PNG or JPG, up to 2MB, square recommended.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Status</CardTitle></CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Verification Status</span>
                <Badge variant="success">Verified</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Account Status</span>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Created On</span>
                <span className="font-medium text-foreground">12 Jan 2024</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
