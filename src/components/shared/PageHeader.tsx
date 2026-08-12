import { Fragment, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

interface Crumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  crumbs?: Crumb[]
  title: ReactNode
  description?: string
  actions?: ReactNode
}

export function PageHeader({ crumbs, title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {crumbs && crumbs.length > 0 && (
          <div className="text-muted-foreground mb-1.5 flex flex-wrap items-center gap-1 text-sm">
            {crumbs.map((c, i) => (
              <Fragment key={i}>
                {i > 0 && <ChevronRight className="size-3.5" />}
                {c.href ? (
                  <Link to={c.href} className="hover:text-foreground">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{c.label}</span>
                )}
              </Fragment>
            ))}
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-[26px]">{title}</h1>
        {description && <p className="text-muted-foreground mt-1 text-sm">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}
