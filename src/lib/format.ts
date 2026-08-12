// Confidential identifiers (PAN, GSTIN, bank account, Aadhaar) are never shown
// in full — always render this mask in their place instead of the real value.
export const MASKED = "XXXXXXXXX"

// Contact details (email, phone) are partially masked in list views to protect
// personal information — keep just enough visible for the row to stay identifiable.
export function maskEmail(email: string) {
  const [local, domain] = email.split("@")
  if (!domain) return MASKED
  const visible = local.slice(0, 1)
  return `${visible}${"•".repeat(Math.max(local.length - 1, 3))}@${domain}`
}

export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "")
  const last2 = digits.slice(-2)
  const prefix = phone.match(/^\+?\d{1,3}/)?.[0] ?? ""
  return `${prefix} ••••• ••${last2}`
}

export function inr(value: number, opts: { decimals?: boolean } = {}) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: opts.decimals ? 2 : 0,
    minimumFractionDigits: opts.decimals ? 2 : 0,
  }).format(value)
}

export type StatusKind = "success" | "warning" | "info" | "danger" | "purple" | "secondary"

const STATUS_MAP: Record<string, StatusKind> = {
  paid: "success",
  completed: "success",
  active: "success",
  approved: "success",
  reconciled: "success",
  generated: "success",
  matched: "success",
  reviewed: "success",
  filed: "success",
  good: "success",
  verified: "success",
  mapped: "success",
  deposited: "success",
  "filed successfully": "success",

  pending: "warning",
  "in progress": "warning",
  "on leave": "warning",
  "to reimburse": "warning",
  "awaiting approval": "warning",
  "due soon": "warning",
  upcoming: "warning",
  draft: "secondary",
  unmatched: "warning",
  processing: "warning",
  partial: "warning",
  "partially mapped": "warning",
  "partially deposited": "warning",
  "pending generation": "warning",
  scheduled: "warning",
  "part paid": "info",

  sent: "info",
  open: "info",
  "not due": "info",
  issued: "info",
  "processed by cpc": "info",
  submitted: "info",
  refunded: "purple",

  overdue: "danger",
  rejected: "danger",
  resigned: "danger",
  failed: "danger",
  "not verified": "danger",
  unmapped: "danger",
  "correction required": "danger",
  "failed / rejected": "danger",
  closed: "secondary",
  inactive: "secondary",
}

export function statusVariant(status: string): StatusKind {
  return STATUS_MAP[status.toLowerCase()] ?? "secondary"
}
