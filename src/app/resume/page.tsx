import Link from "next/link"
import { getResume } from "@/lib/api"
import { renderMarkdown } from "@/lib/markdown"

export default async function ResumePage() {
  const resume = getResume()
  const html = await renderMarkdown(resume.content)

  const lastUpdated = resume.lastUpdated
    ? new Date(resume.lastUpdated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null

  return (
    <article className="container py-12 md:py-16 overflow-x-hidden">
      <div className="max-w-3xl overflow-x-hidden">
        <div className="mb-2">
          <div className="mb-8 text-muted-foreground">
            <span className="text-dr-green">❯</span> cat resume.md
          </div>
          <h1 className="text-2xl md:text-3xl text-foreground mb-1">
            {resume.title}
          </h1>
          {lastUpdated && (
            <div className="text-sm text-muted-foreground">
              last updated: {lastUpdated}
            </div>
          )}
        </div>

        <div className="divider mb-4" aria-hidden="true" />

        <div className="prose prose-sm max-w-none dark:prose-invert md:prose-base prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-dr-pink prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-dr-cyan prose-pre:bg-card prose-pre:border prose-pre:border-border prose-hr:border-border prose-li:text-muted-foreground prose-ul:marker:text-foreground prose-h3:text-dr-cyan prose-h2:mt-2">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>

        <div className="divider mt-12 mb-8" aria-hidden="true" />

        <div className="flex gap-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← home
          </Link>
        </div>
      </div>
    </article>
  )
}
