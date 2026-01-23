import Link from "next/link"
import Script from "next/script"
import { getAllPosts } from "@/lib/api"

const experience = [
  {
    area: "platform",
    title: "Async media pipelines",
    desc: "Batch processing, caching, and on-demand transforms at scale.",
  },
  {
    area: "performance",
    title: "Latency-first editors",
    desc: "Rich text tooling with aggressive caching and smoother rendering.",
  },
  {
    area: "commerce",
    title: "Checkout + risk controls",
    desc: "Payment flows, fraud mitigation, and ecommerce integrations.",
  },
  {
    area: "tooling",
    title: "Design systems + CI",
    desc: "Typed UI libraries and automated release pipelines.",
  },
]

const projects = [
  {
    name: "uploadslate",
    desc: "Developer-first file uploads with CDN transforms and multi-tenant asset management.",
    tags: ["uploads", "transforms", "bun"],
    status: "live",
    link: "https://uploadslate.com",
  },
  {
    name: "dataloader-bench",
    desc: "Benchmarking app showing how DataLoaders reduce N+1 query overhead in GraphQL.",
    tags: ["graphql", "dataloader", "benchmarks"],
    status: "live",
    link: "https://github.com/nickqweaver/graphql-dataloader-example",
  },
  {
    name: "thread-pool",
    desc: "A lightweight worker pool with scheduling, instrumentation, and backpressure.",
    tags: ["threads", "scheduling", "metrics"],
    status: "planned",
  },
  {
    name: "http-server",
    desc: "A from-scratch HTTP server focused on traceability and deterministic behavior.",
    tags: ["http", "tcp", "observability"],
    status: "planned",
  },
]

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    live: "text-dr-green",
    planned: "text-dr-yellow",
    wip: "text-dr-orange",
  }
  return <span className={colors[status] || "text-muted-foreground"}>[{status}]</span>
}

export default function Home() {
  const posts = getAllPosts().slice(0, 4)

  return (
    <>
      <Script
        defer
        data-domain="nickweaver.dev"
        src="https://plausible-analytics-ce-production-0932.up.railway.app/js/script.outbound-links.tagged-events.js"
      />
      <main className="container py-12 md:py-16">
        {/* Hero */}
        <section className="mb-16">
          <div className="mb-6 text-muted-foreground">
            <span className="text-dr-green">❯</span> cat about.txt
          </div>
          <h1 className="text-2xl md:text-3xl text-foreground mb-4">
            Nick Weaver
          </h1>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mb-6">
            Software engineer focused on <span className="text-dr-cyan">reliability</span> and{" "}
            <span className="text-dr-cyan">performance</span>. I&apos;ve shipped web platforms,
            performance-critical editors, and internal tooling. Now going deeper on the
            fundamentals behind resilient infrastructure and runtimes.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href="https://github.com/nickqweaver"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/nicholas-q-weaver/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              linkedin
            </a>
            <a
              href="https://twitter.com/TheSWEaver"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              x.com
            </a>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="mb-16 scroll-mt-20">
          <div className="mb-6 text-muted-foreground">
            <span className="text-dr-green">❯</span> ls experience/
          </div>
          <div className="space-y-4">
            {experience.map((item) => (
              <div key={item.title} className="group">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="text-dr-purple w-28 shrink-0">{item.area}/</span>
                  <span className="text-foreground">{item.title}</span>
                </div>
                <p className="text-muted-foreground text-sm mt-1 sm:ml-32">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/resume"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              → view full resume
            </Link>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-16 scroll-mt-20">
          <div className="mb-6 text-muted-foreground">
            <span className="text-dr-green">❯</span> ls projects/
          </div>
          <div className="space-y-6">
            {projects.map((project) => (
              <div
                key={project.name}
                className="group border-l-2 border-border pl-4 hover:border-primary transition-colors"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {project.name}
                    </a>
                  ) : (
                    <span className="text-foreground">{project.name}</span>
                  )}
                  <StatusBadge status={project.status} />
                </div>
                <p className="text-muted-foreground text-sm mt-1">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs text-dr-cyan">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="https://github.com/nickqweaver"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              → view all on github
            </a>
          </div>
        </section>

        {/* Writing */}
        <section id="writing" className="scroll-mt-20">
          <div className="mb-6 text-muted-foreground">
            <span className="text-dr-green">❯</span> ls posts/
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
                  className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
                >
                  <span className="text-muted-foreground text-sm shrink-0 w-28">{date}</span>
                  <span className="text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </span>
                </Link>
              )
            })}
          </div>
          <div className="mt-6">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              → view all posts
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
