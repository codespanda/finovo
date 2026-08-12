import { useMemo, useState, type ReactNode } from "react"
import { FolderKanban, ListTodo, Flag, UserPlus2, CalendarPlus, Clock } from "lucide-react"

import { FormDialog, Field } from "@/components/shared/FormDialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const projects = ["Website Revamp", "Client Onboarding", "Mobile App Launch", "Q3 Marketing Campaign"]

function hoursBetween(start: string, end: string) {
  if (!start || !end) return 0
  const [sh, sm] = start.split(":").map(Number)
  const [eh, em] = end.split(":").map(Number)
  const mins = (eh * 60 + em) - (sh * 60 + sm)
  return mins > 0 ? mins / 60 : 0
}

function formatHours(h: number) {
  const hrs = Math.floor(h)
  const mins = Math.round((h - hrs) * 60)
  return `${hrs}h ${mins.toString().padStart(2, "0")}m`
}

export function NewProjectDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={FolderKanban}
      iconBg="bg-info-bg text-info-foreground"
      title="New Project"
      description="Set up a new project to track tasks, time and budget."
      primaryLabel="Create Project"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Project Name"><Input placeholder="e.g. Website Revamp" /></Field>
        <Field label="Client / Customer">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select customer" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global Enterprises</SelectItem>
              <SelectItem value="techno">Techno Solutions Pvt. Ltd.</SelectItem>
              <SelectItem value="internal">Internal</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Start Date"><Input type="date" defaultValue="2025-06-01" /></Field>
        <Field label="Due Date"><Input type="date" /></Field>
        <Field label="Team Lead">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select team lead" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rahul">Rahul Kapoor</SelectItem>
              <SelectItem value="anjali">Anjali Sharma</SelectItem>
              <SelectItem value="manish">Manish Gupta</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Budget"><Input type="number" placeholder="0.00" /></Field>
      </div>
      <Field label="Description"><Textarea placeholder="What is this project about?" rows={2} /></Field>
    </FormDialog>
  )
}

export function NewTaskDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={ListTodo}
      iconBg="bg-purple-bg text-purple-foreground"
      title="New Task"
      description="Create and assign a task to a team member."
      primaryLabel="Create Task"
      wide
      trigger={children}
    >
      <Field label="Task Title"><Input placeholder="e.g. Design homepage mockup" /></Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Project">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select project" /></SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Assignee">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Assign to" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rahul">Rahul Kapoor</SelectItem>
              <SelectItem value="anjali">Anjali Sharma</SelectItem>
              <SelectItem value="priya">Priya Mehta</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Due Date"><Input type="date" /></Field>
        <Field label="Priority">
          <Select defaultValue="medium">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field label="Description"><Textarea placeholder="Task details (optional)..." rows={2} /></Field>
    </FormDialog>
  )
}

export function NewMilestoneDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={Flag}
      iconBg="bg-warning-bg text-warning-foreground"
      title="New Milestone"
      description="Mark a key deliverable or checkpoint for a project."
      primaryLabel="Create Milestone"
      trigger={children}
    >
      <Field label="Milestone Name"><Input placeholder="e.g. Design Approval" /></Field>
      <Field label="Project">
        <Select>
          <SelectTrigger className="w-full"><SelectValue placeholder="Select project" /></SelectTrigger>
          <SelectContent>
            {projects.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field label="Due Date"><Input type="date" /></Field>
      <Field label="Description"><Textarea placeholder="What defines this milestone as complete?" rows={2} /></Field>
    </FormDialog>
  )
}

export function AddTeamMemberDialog({ children }: { children: ReactNode }) {
  const [inviteExisting, setInviteExisting] = useState(true)
  return (
    <FormDialog
      icon={UserPlus2}
      iconBg="bg-success-bg text-success-foreground"
      title="Add Team Member"
      description="Add a team member and assign them to projects."
      primaryLabel="Add Member"
      trigger={children}
    >
      <Field label="Source">
        <Select value={inviteExisting ? "existing" : "new"} onValueChange={(v) => setInviteExisting(v === "existing")}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="existing">Existing Employee</SelectItem>
            <SelectItem value="new">Invite by Email</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      {inviteExisting ? (
        <Field label="Employee">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select employee" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rahul">Rahul Kapoor — Engineering</SelectItem>
              <SelectItem value="anjali">Anjali Sharma — Marketing</SelectItem>
              <SelectItem value="priya">Priya Mehta — Finance</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      ) : (
        <Field label="Email Address"><Input type="email" placeholder="name@codespanda.com" /></Field>
      )}
      <Field label="Role on Project">
        <Select defaultValue="contributor">
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="lead">Project Lead</SelectItem>
            <SelectItem value="contributor">Contributor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </Field>
    </FormDialog>
  )
}

export function NewEventDialog({ children }: { children: ReactNode }) {
  return (
    <FormDialog
      icon={CalendarPlus}
      iconBg="bg-purple-bg text-purple-foreground"
      title="New Event"
      description="Schedule a meeting, deadline or reminder."
      primaryLabel="Create Event"
      trigger={children}
    >
      <Field label="Event Title"><Input placeholder="e.g. Client Review Call" /></Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Date"><Input type="date" defaultValue="2025-06-01" /></Field>
        <Field label="Time"><Input type="time" defaultValue="10:00" /></Field>
      </div>
      <Field label="Event Type">
        <Select defaultValue="meeting">
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="meeting">Meeting</SelectItem>
            <SelectItem value="deadline">Deadline</SelectItem>
            <SelectItem value="reminder">Reminder</SelectItem>
            <SelectItem value="holiday">Holiday</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label="Description"><Textarea placeholder="Add notes (optional)..." rows={2} /></Field>
    </FormDialog>
  )
}

export function LogTimeDialog({ children }: { children: ReactNode }) {
  const [start, setStart] = useState("09:00")
  const [end, setEnd] = useState("11:00")
  const hours = useMemo(() => hoursBetween(start, end), [start, end])

  return (
    <FormDialog
      icon={Clock}
      iconBg="bg-success-bg text-success-foreground"
      title="Log Time"
      description="Record time spent on a project task."
      primaryLabel="Log Time"
      wide
      trigger={children}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Project">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select project" /></SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Task (optional)">
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select task" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="design">Design homepage mockup</SelectItem>
              <SelectItem value="dev">Frontend development</SelectItem>
              <SelectItem value="qa">QA testing</SelectItem>
              <SelectItem value="meeting">Client meeting</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Date"><Input type="date" defaultValue="2025-06-01" /></Field>
        <Field label="Billable">
          <Select defaultValue="billable">
            <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="billable">Billable</SelectItem>
              <SelectItem value="non-billable">Non-Billable</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Start Time">
          <Input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
        </Field>
        <Field label="End Time">
          <Input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
        </Field>
      </div>
      <Field label="Description"><Textarea placeholder="What did you work on?" rows={2} /></Field>
      <div className="bg-muted flex items-center justify-between rounded-lg p-3 text-sm">
        <span className="text-muted-foreground">Total Duration</span>
        <span className="font-semibold text-foreground">{formatHours(hours)}</span>
      </div>
    </FormDialog>
  )
}
