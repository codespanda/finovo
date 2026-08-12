import { Info, Folder, FileText, Users2, Download, Eye, Search, ChevronDown, List, LayoutGrid, Upload, FolderPlus, Archive, Database } from "lucide-react"

import { PageHeader } from "@/components/shared/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DonutChart } from "@/components/shared/charts"
import { DialogTrigger } from "@/components/ui/dialog"
import { UploadFilesDialog } from "@/components/shared/TaxFilingDialogs"
import { cn } from "@/lib/utils"

const stats = [
  { icon: Folder, label: "Total Files", value: "428", sub: "Across all folders", color: "blue" as const },
  { icon: FileText, label: "Total Size", value: "12.45 GB", sub: "Used storage", color: "green" as const },
  { icon: Users2, label: "Shared Files", value: "156", sub: "Shared with team", color: "orange" as const },
  { icon: Download, label: "Downloads", value: "1,245", sub: "This month", color: "purple" as const },
  { icon: Eye, label: "Viewed", value: "3,876", sub: "This month", color: "info" as const },
]

const colorMap: Record<string, string> = {
  blue: "bg-info-bg text-info-foreground",
  green: "bg-success-bg text-success-foreground",
  orange: "bg-warning-bg text-warning-foreground",
  purple: "bg-purple-bg text-purple-foreground",
  info: "bg-info-bg text-info-foreground",
}

const folders = [
  { name: "Project Root", count: 10, active: true },
  { name: "01. Planning & Research", count: 5 },
  { name: "02. Design", count: 8 },
  { name: "03. Development", count: 12 },
  { name: "04. Testing", count: 6 },
  { name: "05. Deployment", count: 4 },
  { name: "Assets", count: 18 },
  { name: "Contracts", count: 6 },
  { name: "Meeting Notes", count: 7 },
  { name: "Reports", count: 3 },
  { name: "Invoices", count: 2 },
  { name: "Archived", count: 1 },
]

const fileIcon: Record<string, { emoji: string; bg: string }> = {
  folder: { emoji: "📁", bg: "bg-warning-bg" },
  docx: { emoji: "📄", bg: "bg-info-bg" },
  pdf: { emoji: "📕", bg: "bg-danger-bg" },
  fig: { emoji: "🎨", bg: "bg-purple-bg" },
  pptx: { emoji: "📊", bg: "bg-danger-bg" },
  md: { emoji: "📝", bg: "bg-muted" },
  xlsx: { emoji: "📈", bg: "bg-success-bg" },
}

const files = [
  { name: "01. Planning & Research", sub: "Folder", type: "folder", modified: "14 May 2025 10:30 AM", by: "Rohit Sharma", role: "Project Manager", size: "–" },
  { name: "Project Brief.docx", sub: "01. Planning & Research", type: "docx", modified: "14 May 2025 09:15 AM", by: "Priya Nair", role: "UI/UX Designer", size: "2.4 MB" },
  { name: "Requirements Specification.pdf", sub: "01. Planning & Research", type: "pdf", modified: "13 May 2025 04:45 PM", by: "Amit Verma", role: "Business Analyst", size: "1.8 MB" },
  { name: "Wireframes.fig", sub: "02. Design", type: "fig", modified: "12 May 2025 11:20 AM", by: "Sneha Iyer", role: "UI/UX Designer", size: "24.6 MB" },
  { name: "Design Assets", sub: "02. Design", type: "folder", modified: "12 May 2025 11:20 AM", by: "Sneha Iyer", role: "UI/UX Designer", size: "–" },
  { name: "Design Presentation.pptx", sub: "02. Design", type: "pptx", modified: "11 May 2025 03:30 PM", by: "Karan Mehta", role: "Frontend Developer", size: "5.7 MB" },
  { name: "03. Development", sub: "Folder", type: "folder", modified: "10 May 2025 02:15 PM", by: "Vikram Singh", role: "Tech Lead", size: "–" },
  { name: "API Documentation.md", sub: "03. Development", type: "md", modified: "09 May 2025 11:45 AM", by: "Rahul Das", role: "Backend Developer", size: "3.2 MB" },
  { name: "Database Schema.xlsx", sub: "03. Development", type: "xlsx", modified: "08 May 2025 10:05 AM", by: "Rahul Das", role: "Backend Developer", size: "980 KB" },
  { name: "04. Testing", sub: "Folder", type: "folder", modified: "07 May 2025 05:20 PM", by: "Neha Joshi", role: "QA Engineer", size: "–" },
]

const storage = [
  { name: "Documents", value: 6.45, color: "var(--color-chart-2)" },
  { name: "Images", value: 3.2, color: "var(--color-chart-1)" },
  { name: "Videos", value: 1.25, color: "var(--color-chart-4)" },
  { name: "Others", value: 1.55, color: "var(--color-muted-foreground)" },
]

const recentFiles = [
  { name: "Project Timeline.xlsx", sub: "03. Development", time: "2 hours ago", type: "xlsx" },
  { name: "Login Screen.png", sub: "02. Design", time: "Yesterday", type: "fig" },
  { name: "Test Cases.xlsx", sub: "04. Testing", time: "2 days ago", type: "xlsx" },
  { name: "Deployment Checklist.pdf", sub: "05. Deployment", time: "3 days ago", type: "pdf" },
  { name: "Meeting Notes.docx", sub: "Meeting Notes", time: "4 days ago", type: "docx" },
]

const quickActions = [
  { icon: Upload, label: "Upload Files" },
  { icon: FolderPlus, label: "New Folder" },
  { icon: Download, label: "Request Files" },
  { icon: Users2, label: "Shared Files" },
  { icon: Archive, label: "Trash" },
]

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

export function FilesDocuments() {
  return (
    <div>
      <PageHeader
        crumbs={[{ label: "Projects", href: "/projects" }, { label: "Website Redesign" }, { label: "Files & Documents" }]}
        title={<span className="flex items-center gap-2">Files &amp; Documents <Info className="text-muted-foreground size-4" /></span>}
        description="Organize, manage and share project files with your team."
        actions={
          <>
            <Button variant="outline" size="icon"><List className="size-4" /></Button>
            <Button variant="outline">Filters</Button>
            <UploadFilesDialog>
              <DialogTrigger asChild>
                <Button><Upload className="size-4" /> Upload</Button>
              </DialogTrigger>
            </UploadFilesDialog>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Card key={s.label} className="gap-2 p-4">
            <div className="flex items-center gap-3">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${colorMap[s.color]}`}>
                <s.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-muted-foreground truncate text-xs font-medium">{s.label}</p>
                <p className="truncate text-lg font-bold text-foreground">{s.value}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs">{s.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <Card className="xl:col-span-1">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Folders</CardTitle>
            <Button variant="ghost" size="sm" className="text-primary gap-1"><FolderPlus className="size-3.5" /> New Folder</Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-0.5 pb-5">
            {folders.map((f) => (
              <button
                key={f.name}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",
                  f.active ? "bg-accent text-primary font-medium" : "hover:bg-muted text-foreground"
                )}
              >
                <Folder className="size-4 shrink-0" />
                <span className="flex-1 truncate">{f.name}</span>
                <span className="text-muted-foreground text-xs">{f.count}</span>
              </button>
            ))}

            <div className="mt-3 border-t pt-3">
              <div className="mb-1.5 flex justify-between text-xs">
                <span className="text-muted-foreground">Storage Used</span>
                <span className="text-foreground font-medium">12.45 GB of 50 GB</span>
              </div>
              <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                <div className="bg-success h-full rounded-full" style={{ width: "24%" }} />
              </div>
              <p className="text-muted-foreground mt-1 text-xs">24%</p>
              <Button variant="outline" className="mt-2 w-full gap-1.5"><Database className="size-3.5" /> Manage Storage</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="xl:col-span-3">
          <CardContent className="pt-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative max-w-sm flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input placeholder="Search files and folders..." className="pl-9" />
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Button variant="outline">Sort by: Newest <ChevronDown className="size-3.5" /></Button>
                <Button variant="outline" size="icon"><List className="size-4" /></Button>
                <Button variant="outline" size="icon"><LayoutGrid className="size-4" /></Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted-foreground border-b text-left text-xs">
                    <th className="pb-2 font-medium">Name</th>
                    <th className="pb-2 font-medium">Modified</th>
                    <th className="pb-2 font-medium">Modified By</th>
                    <th className="pb-2 text-right font-medium">Size</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((f, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-base ${fileIcon[f.type].bg}`}>{fileIcon[f.type].emoji}</div>
                          <div>
                            <p className="font-medium whitespace-nowrap text-foreground">{f.name}</p>
                            <p className="text-muted-foreground text-xs">{f.sub}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted-foreground py-3 whitespace-nowrap">{f.modified}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-6"><AvatarFallback className="bg-purple-bg text-purple-foreground text-[10px]">{initials(f.by)}</AvatarFallback></Avatar>
                          <div>
                            <p className="text-xs whitespace-nowrap text-foreground">{f.by}</p>
                            <p className="text-muted-foreground text-xs whitespace-nowrap">{f.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-right whitespace-nowrap text-foreground">{f.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-muted-foreground mt-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
              <span>Showing 1 to 10 of 428 files</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <Button key={p} size="sm" variant={p === 1 ? "default" : "outline"} className="size-8 p-0">{p}</Button>
                  ))}
                  <span className="text-muted-foreground px-1">…</span>
                  <Button size="sm" variant="outline" className="size-8 p-0">43</Button>
                </div>
                <Button variant="outline" size="sm" className="gap-1">10 <ChevronDown className="size-3.5" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-5 xl:col-span-1">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Storage Overview</CardTitle>
              <a href="/settings" className="text-primary text-xs font-medium">View Details</a>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3 pb-5">
              <DonutChart data={storage} total="12.45 GB" totalLabel="Used" size={130} />
              <ul className="flex w-full flex-col gap-2 text-sm">
                {storage.map((s) => (
                  <li key={s.name} className="flex items-center gap-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground flex-1 truncate">{s.name}</span>
                    <span className="font-medium whitespace-nowrap text-foreground">{s.value} GB</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Recent Files</CardTitle>
              <a href="/projects/files" className="text-primary text-xs font-medium">View all</a>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-5">
              {recentFiles.map((f) => (
                <div key={f.name} className="flex items-center gap-2.5">
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-sm ${fileIcon[f.type].bg}`}>{fileIcon[f.type].emoji}</div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{f.name}</p>
                    <p className="text-muted-foreground text-xs">{f.sub}</p>
                  </div>
                  <span className="text-muted-foreground shrink-0 text-xs whitespace-nowrap">{f.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
            <CardContent className="flex flex-col pb-3">
              {quickActions.map((a) => (
                <button key={a.label} className="hover:bg-muted -mx-1 flex items-center gap-3 rounded-lg px-1 py-2.5 text-left text-sm font-medium text-foreground transition-colors">
                  <a.icon className="size-4" /> {a.label}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
