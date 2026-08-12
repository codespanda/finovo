import { type ReactNode } from "react"
import { Warehouse, ArrowLeftRight, ClipboardCheck, SlidersHorizontal, Barcode } from "lucide-react"

import { FormDialog, Field } from "@/components/shared/FormDialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const warehouses = ["Main Warehouse", "Warehouse 2", "Warehouse 3", "Warehouse 4"]
const stockItems = ["Wireless Headphones", "Ergonomic Chair", "Laptop Stand", "Wireless Mouse", "Mechanical Keyboard"]

export function NewWarehouseDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Warehouse}
      iconBg="bg-info-bg text-info-foreground"
      title="New Warehouse"
      description="Add a new warehouse or storage location."
      primaryLabel="Save Warehouse"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Warehouse Name"><Input placeholder="e.g. Warehouse 5" /></Field>
        <Field label="Type">
          <Select defaultValue="storage">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="storage">Storage</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="transit">Transit Hub</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Manager">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select manager" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="manish">Manish Gupta</SelectItem>
              <SelectItem value="vikram">Vikram Singh</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Contact Phone"><Input type="tel" placeholder="+91 98765 43210" /></Field>
      </div>
      <Field label="Address"><Textarea placeholder="Street, city, state, PIN code..." rows={2} /></Field>
    </FormDialog>
  )
}

export function NewTransferDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={ArrowLeftRight}
      iconBg="bg-purple-bg text-purple-foreground"
      title="New Stock Transfer"
      description="Move stock between warehouses."
      primaryLabel="Create Transfer"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Item">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select item" /></SelectTrigger>
            <SelectContent>
              {stockItems.map((i) => (
                <SelectItem key={i} value={i}>{i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Quantity"><Input type="number" placeholder="0" /></Field>
        <Field label="From Warehouse">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Source warehouse" /></SelectTrigger>
            <SelectContent>
              {warehouses.map((w) => (
                <SelectItem key={w} value={w}>{w}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="To Warehouse">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Destination warehouse" /></SelectTrigger>
            <SelectContent>
              {warehouses.map((w) => (
                <SelectItem key={w} value={w}>{w}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Transfer Date"><Input type="date" defaultValue="2025-05-31" /></Field>
      </div>
      <Field label="Notes"><Textarea placeholder="Reason for transfer (optional)..." rows={2} /></Field>
    </FormDialog>
  )
}

export function NewStockCountDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={ClipboardCheck}
      iconBg="bg-success-bg text-success-foreground"
      title="New Stock Count"
      description="Start a physical stock count to verify inventory levels."
      primaryLabel="Start Count"
      trigger={children}
    >
      <Field label="Warehouse">
        <Select>
          <SelectTrigger className="w-full"><SelectValue placeholder="Select warehouse" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Warehouses</SelectItem>
            {warehouses.map((w) => (
              <SelectItem key={w} value={w}>{w}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Count Type">
          <Select defaultValue="full">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full Count</SelectItem>
              <SelectItem value="partial">Partial / Category-wise</SelectItem>
              <SelectItem value="cycle">Cycle Count</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Count Date"><Input type="date" defaultValue="2025-05-31" /></Field>
      </div>
      <Field label="Notes"><Textarea placeholder="Add notes (optional)..." rows={2} /></Field>
    </FormDialog>
  )
}

export function NewStockAdjustmentDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={SlidersHorizontal}
      iconBg="bg-warning-bg text-warning-foreground"
      title="New Stock Adjustment"
      description="Adjust stock levels for damage, loss, or correction."
      primaryLabel="Save Adjustment"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Item">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select item" /></SelectTrigger>
            <SelectContent>
              {stockItems.map((i) => (
                <SelectItem key={i} value={i}>{i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Warehouse">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select warehouse" /></SelectTrigger>
            <SelectContent>
              {warehouses.map((w) => (
                <SelectItem key={w} value={w}>{w}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Adjustment Type">
          <Select defaultValue="decrease">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="increase">Increase</SelectItem>
              <SelectItem value="decrease">Decrease</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Quantity"><Input type="number" placeholder="0" /></Field>
        <Field label="Reason">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select reason" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="damage">Damaged Goods</SelectItem>
              <SelectItem value="theft">Theft / Loss</SelectItem>
              <SelectItem value="count">Physical Count Correction</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Date"><Input type="date" defaultValue="2025-05-31" /></Field>
      </div>
      <Field label="Notes"><Textarea placeholder="Add notes (optional)..." rows={2} /></Field>
    </FormDialog>
  )
}

export function NewBatchSerialDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Barcode}
      iconBg="bg-info-bg text-info-foreground"
      title="New Batch / Serial Number"
      description="Track a new batch or serial number for an item."
      primaryLabel="Save"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Item">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select item" /></SelectTrigger>
            <SelectContent>
              {stockItems.map((i) => (
                <SelectItem key={i} value={i}>{i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Tracking Type">
          <Select defaultValue="batch">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="batch">Batch Number</SelectItem>
              <SelectItem value="serial">Serial Number</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Batch / Serial No."><Input placeholder="e.g. BATCH-2025-042" className="font-mono" /></Field>
        <Field label="Quantity"><Input type="number" placeholder="0" /></Field>
        <Field label="Manufacture Date"><Input type="date" /></Field>
        <Field label="Expiry Date (optional)"><Input type="date" /></Field>
      </div>
    </FormDialog>
  )
}
