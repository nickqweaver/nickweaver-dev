import Link from "next/link"
import { getAllPosts } from "@/lib/api"

export default function BlogPage() {
  const posts = getAllPosts()

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
          })
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border-l-2 border-border pl-4 hover:border-primary transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <span className="text-muted-foreground text-sm shrink-0 w-28">{date}</span>
                <span className="text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mt-1 sm:ml-32 line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          )
        })}
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← back home
        </Link>
      </div>
    </main>
  )
}
