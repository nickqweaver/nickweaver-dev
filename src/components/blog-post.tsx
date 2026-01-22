import { Post } from "@/lib/api"
import { Icon } from "@iconify/react"
import Link from "next/link"

export function BlogPost({ title, excerpt, date, slug, githubRepo }: Post) {
  const truncated = excerpt.length > 160 ? `${excerpt.slice(0, 160)}...` : excerpt
  const dateLabel = new Date(date).toLocaleDateString()

  return (
    <article className="rounded-lg border border-border bg-card/40 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
        <span>Log entry</span>
        <div className="flex items-center gap-4">
          <span>{dateLabel}</span>
          {githubRepo ? (
            <a
              href={githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-foreground"
            >
              <Icon icon="octicon:mark-github-24" className="h-4 w-4" />
              Repo
            </a>
          ) : null}
        </div>
      </div>
      <h3 className="mt-3 text-xl font-semibold">
        <Link href={`/blog/${slug}`} className="hover:text-primary">
          {title}
        </Link>
      </h3>
      <p className="mt-3 text-sm text-muted-foreground">{truncated}</p>
      <Link
        href={`/blog/${slug}`}
        className="mt-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-primary"
      >
        Read more
        <Icon icon="lucide:arrow-right" className="h-3 w-3" />
      </Link>
    </article>
  )
}
