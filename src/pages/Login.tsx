import { useState } from "react"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  PieChart,
  Landmark,
  FileText,
  BarChart3,
  ShieldCheck,
  Globe,
  ShieldQuestion,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { GoogleIcon, MicrosoftIcon } from "@/components/shared/BrandIcons"

const features = [
  {
    icon: PieChart,
    color: "bg-info-bg text-info-foreground",
    title: "Real-time Dashboard",
    desc: "Get a clear overview of your business financials.",
  },
  {
    icon: Landmark,
    color: "bg-success-bg text-success-foreground",
    title: "Bank Reconciliation",
    desc: "Automatically reconcile transactions and save time.",
  },
  {
    icon: FileText,
    color: "bg-purple-bg text-purple-foreground",
    title: "Invoice & Payments",
    desc: "Create invoices, track payments and get paid faster.",
  },
  {
    icon: BarChart3,
    color: "bg-warning-bg text-warning-foreground",
    title: "Powerful Reports",
    desc: "Make data-driven decisions with smart financial reports.",
  },
]

function FinovoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2 C22 2 27 7 27 13 C27 18 23 21 19 21 C22 21 24 23.5 24 27 C24 29.5 22 31 19.5 31 C16.5 31 15 28.5 15 26"
        stroke="url(#lg)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="9" cy="24" r="4" fill="url(#lg2)" />
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="lg2" x1="0" y1="0" x2="16" y2="16">
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2.5">
            <FinovoMark />
            <div>
              <p className="text-xl font-bold leading-tight text-foreground">Finovo</p>
              <p className="text-muted-foreground text-xs">Smart Accounting for Modern Businesses</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground">Welcome Back 👋</h1>
          <p className="text-muted-foreground mt-1 mb-7 text-sm">
            Sign in to continue to your Finovo account
          </p>

          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email address</label>
              <div className="relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input type="email" placeholder="Enter your email address" className="h-11 pl-9" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-11 px-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-muted-foreground absolute top-1/2 right-3 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <Checkbox /> Remember me
              </label>
              <a href="#" className="text-primary font-medium hover:underline">
                Forgot password?
              </a>
            </div>

            <Button size="lg" className="mt-1 h-11 w-full text-[15px]">
              Sign in
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-muted-foreground text-xs">or continue with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg" className="h-11">
              <GoogleIcon className="size-4.5" /> Google
            </Button>
            <Button variant="outline" size="lg" className="h-11">
              <MicrosoftIcon className="size-4.5" /> Microsoft
            </Button>
          </div>

          <p className="text-muted-foreground mt-5 flex items-center justify-center gap-1.5 text-xs">
            <ShieldQuestion className="size-3.5" /> Need help signing in? <a href="/help" className="text-primary font-medium hover:underline">Contact support</a>
          </p>

          <p className="text-muted-foreground mt-7 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-primary font-medium hover:underline">
              Sign up
            </a>
          </p>

          <div className="text-muted-foreground mt-10 flex flex-col items-center gap-3 text-xs sm:flex-row sm:justify-between">
            <span>© 2026 Finovo. All rights reserved.</span>
            <span className="flex gap-4">
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
            </span>
          </div>
        </div>
      </div>

      <div className="from-primary/[0.06] to-primary/15 relative hidden overflow-hidden bg-gradient-to-br via-transparent lg:flex lg:flex-col lg:justify-center lg:px-16 xl:px-20">
        <div className="absolute top-6 right-8">
          <Badge variant="outline" className="gap-1.5 bg-card">
            <Globe className="size-3.5" /> English
          </Badge>
        </div>

        <div className="max-w-lg">
          <h2 className="text-4xl leading-tight font-bold text-foreground xl:text-[42px]">
            All your accounting, <span className="text-primary">Simplified.</span>
          </h2>
          <p className="text-muted-foreground mt-4 text-base">
            Finovo helps you manage your finances, get paid faster, and grow your business with
            clarity.
          </p>

          <ul className="mt-8 flex flex-col gap-5">
            {features.map((f) => (
              <li key={f.title} className="flex gap-3.5">
                <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${f.color}`}>
                  <f.icon className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{f.title}</p>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-card mt-8 flex items-center gap-3 rounded-xl border p-4">
            <ShieldCheck className="text-success-foreground size-6 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Secure &amp; Reliable</p>
              <p className="text-muted-foreground text-xs">
                Your data is encrypted and secure with enterprise-grade protection.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-primary/20 absolute -right-24 -bottom-24 size-72 rounded-full blur-3xl" />
        <div className="bg-primary/10 absolute top-10 -left-16 size-56 rounded-full blur-3xl" />
      </div>
    </div>
  )
}
