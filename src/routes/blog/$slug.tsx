import { Link, createFileRoute } from "@tanstack/react-router"
import { getPost } from "@/lib/api"
import { ogPostPath, pageHead } from "@/lib/seo"
import { CodeBlockEnhancer } from "@/components/code-block-enhancer"

export const Route = createFileRoute("/blog/$slug")({
  // getPost throws notFound() for unknown slugs and drafts (drafts are never compiled in).
  loader: ({ params }) => getPost({ data: params.slug }),
  head: ({ params }) =>
    pageHead({
      path: `/blog/${params.slug}`,
      image: ogPostPath(params.slug),
      imageAlt: "Blog Post",
    }),
  component: Post,
})

function Post() {
  const post = Route.useLoaderData()

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })

  return (
    <article className="container py-12 md:py-16 overflow-x-hidden">
      <div className="max-w-3xl overflow-x-hidden">
        <div className="mb-8">
          <div className="mb-6 text-muted-foreground">
            <span className="text-dr-green">❯</span> cat posts/{post.slug}.md
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{post.title}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>{date}</span>
            <span>{post.readingTime}</span>
            <span>by {post.author.name}</span>
          </div>
        </div>

        <div className="divider mb-8" aria-hidden="true" />

        <div className="prose prose-sm max-w-none dark:prose-invert md:prose-base prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-dr-cyan">
          <CodeBlockEnhancer>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </CodeBlockEnhancer>
        </div>

        <div className="divider mt-12 mb-8" aria-hidden="true" />

        <div className="flex gap-6">
          <Link
            to="/blog"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← all posts
          </Link>
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← home
          </Link>
        </div>
      </div>
    </article>
  )
}
