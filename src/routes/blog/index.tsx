import { Link, createFileRoute } from "@tanstack/react-router"
import { getAllPosts } from "@/lib/api"
import { homeHead } from "@/lib/seo"

export const Route = createFileRoute("/blog/")({
  loader: () => getAllPosts(),
  head: () => homeHead("/blog"),
  component: BlogPage,
})

function BlogPage() {
  const posts = Route.useLoaderData()

  return (
    <main className="container py-12 md:py-16">
      <div className="mb-8">
        <div className="mb-6 text-muted-foreground">
          <span className="text-dr-green">❯</span> ls posts/ --all
        </div>
        <h1 className="text-2xl md:text-3xl text-foreground mb-4">Writing</h1>
        <p className="text-muted-foreground max-w-2xl">
          Notes on engineering decisions, performance, and how things work.
        </p>
      </div>

      <div className="space-y-4">
        {posts.map((post) => {
          const date = new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "UTC",
          })
          return (
            <article
              key={post.slug}
              className="group border-l-2 border-border pl-4 hover:border-primary transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className="text-muted-foreground text-sm shrink-0 w-28">{date}</span>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </div>
              <p className="text-muted-foreground text-sm mt-1 sm:ml-32 line-clamp-2">
                {post.excerpt}
              </p>
            </article>
          )
        })}
      </div>

      <div className="mt-8">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          ← back home
        </Link>
      </div>
    </main>
  )
}
