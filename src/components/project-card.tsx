import { Icon } from "@iconify/react"

interface ProjectCardProps {
  title: string
  summary: string
  focus: string
  status: string
  tags: string[]
  link?: string
}

export function ProjectCard({ title, summary, focus, status, tags, link }: ProjectCardProps) {
  return (
    <div className="group rounded-lg border border-border bg-card/40 p-6 transition hover:border-primary/40">
      <div className="flex items-center justify-between gap-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        <span>{focus}</span>
        <span>{status}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm text-muted-foreground">{summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border/60 bg-background/60 px-2.5 py-1 text-xs font-mono text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary"
        >
          View
          <Icon icon="lucide:arrow-up-right" className="h-3 w-3" />
        </a>
      ) : (
        <p className="mt-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          Details soon
        </p>
      )}
    </div>
  )
}
