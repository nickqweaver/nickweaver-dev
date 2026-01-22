import Link from "next/link"
import Script from "next/script"
import { Icon } from "@iconify/react"
import { BlogPost } from "@/components/blog-post"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/api"

const experienceAreas = [
  {
    label: "Platform scale",
    title: "Async media pipelines",
    description: "Built batch processing, caching, and on-demand transforms at scale.",
  },
  {
    label: "Performance UX",
    title: "Latency-first editors",
    description: "Rebuilt rich text tooling with aggressive caching and smoother rendering.",
  },
  {
    label: "Commerce systems",
    title: "Checkout + risk controls",
    description: "Shipped payment flows, fraud mitigation, and ecommerce integrations.",
  },
  {
    label: "Tooling",
    title: "Design systems + CI",
    description: "Published typed UI libraries and automated release pipelines.",
  },
]

const systemMetrics = [
  { label: "mode", value: "build + learn" },
  { label: "focus", value: "product + infra" },
  { label: "queue", value: "04 active" },
  { label: "uptime", value: "99.99%" },
]

const systemLog = ["boot: workspace synced", "log: experiments queued", "sync: notes ready"]

const projects = [
  {
    id: "Q-001",
    title: "UploadSlate",
    summary:
      "Developer-first file uploads with CDN image transforms, metadata tracking, and multi-tenant asset management.",
    focus: "Media platform",
    status: "Live",
    tags: ["Uploads", "Transforms", "Bun"],
    link: "https://uploadslate.com",
  },
  {
    id: "Q-002",
    title: "GraphQL DataLoader Benchmark",
    summary: "Benchmarking app showing how DataLoaders reduce N+1 query overhead in GraphQL.",
    focus: "Benchmarking",
    status: "Live",
    tags: ["GraphQL", "DataLoader", "Benchmarks"],
    link: "https://github.com/nickqweaver/graphql-dataloader-example",
  },
  {
    id: "Q-003",
    title: "Thread Pool",
    summary: "A lightweight worker pool with scheduling, instrumentation, and backpressure.",
    focus: "Concurrency",
    status: "Planned",
    tags: ["Threads", "Scheduling", "Metrics"],
  },
  {
    id: "Q-004",
    title: "HTTP Server",
    summary: "A from-scratch HTTP server focused on traceability and deterministic behavior.",
    focus: "Networking",
    status: "Planned",
    tags: ["HTTP", "TCP", "Observability"],
  },
]

const links = [
  {
    label: "GitHub",
    href: "https://github.com/nickqweaver",
    description: "Systems experiments, prototypes, and proof-of-concepts.",
    icon: "octicon:mark-github-24",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nicholas-q-weaver/",
    description: "Work history, experience notes, and collaborations.",
    icon: "simple-icons:linkedin",
  },
  {
    label: "X",
    href: "https://twitter.com/TheSWEaver",
    description: "Short updates and ongoing systems build logs.",
    icon: "simple-icons:x",
  },
]

export default function Home() {
  const posts = getAllPosts().slice(0, 3)
  const projectSlots = String(projects.length).padStart(2, "0")
  const postCount = String(posts.length).padStart(2, "0")
  const linkCount = String(links.length).padStart(2, "0")

  return (
    <>
      <Script
        defer
        data-domain="nickweaver.dev"
        src="https://plausible-analytics-ce-production-0932.up.railway.app/js/script.outbound-links.tagged-events.js"
      />
      <main className="relative">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-terminal-grid opacity-40" />
          <div className="pointer-events-none absolute inset-0 bg-terminal-glow" />
          <div className="container relative pt-28 pb-20 md:pt-32">
            <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Ops console</span>
                  <span className="h-px w-8 bg-border/70" />
                  <span>Node NW-01</span>
                </div>
                <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                  Software engineer
                  <span className="block text-primary">Reliability + performance.</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  I&apos;ve shipped web platforms, performance-critical editors, and internal
                  tooling across modern stacks. With that breadth in place, I&apos;m now going
                  deeper on the fundamentals behind resilient infrastructure and runtimes.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="#projects">View projects</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="#writing">Read writing</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-3 text-xs font-mono uppercase text-muted-foreground">
                  {["Reliability", "Performance", "Platform", "Tooling"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/60 bg-background/60 px-3 py-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card/60 p-6 backdrop-blur">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                  <span>System status</span>
                  <span className="text-primary">Online</span>
                </div>
                <div className="mt-6 divide-y divide-border/40">
                  {systemMetrics.map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between py-3">
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        {metric.label}
                      </span>
                      <span className="text-sm font-mono text-foreground">{metric.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-lg border border-border/60 bg-background/60 p-4">
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    Recent log
                  </p>
                  <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                    {systemLog.map((entry) => (
                      <li key={entry} className="flex items-center gap-2 font-mono">
                        <span className="text-primary">●</span>
                        {entry}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 border-t border-border bg-background">
          <div className="container py-16">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                <span>Module 01</span>
                <span className="text-foreground">Experience</span>
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                status: shipped
              </span>
            </div>
            <div className="mt-8 grid gap-10 md:grid-cols-[1fr,2fr]">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">What I&apos;ve shipped</h2>
                <p className="text-sm text-muted-foreground">
                  Highlights across platform, performance, and tooling work.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {experienceAreas.map((area) => (
                  <div key={area.title} className="rounded-lg border border-border bg-card/40 p-4">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                      {area.label}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold">{area.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{area.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 border-t border-border bg-background">
          <div className="container py-16">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Module 02</span>
                  <span className="text-foreground">Projects</span>
                </div>
                <h2 className="text-2xl font-semibold md:text-3xl">Current build queue</h2>
                <p className="max-w-xl text-sm text-muted-foreground">
                  Early-stage builds and experiments. Links coming soon.
                </p>
              </div>
              <Button asChild variant="outline">
                <a href="https://github.com/nickqweaver" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
            </div>
            <div className="mt-8 rounded-xl border border-border bg-card/20">
              <div className="flex items-center justify-between border-b border-border/60 px-5 py-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <span>queue: build</span>
                <span>slots: {projectSlots}</span>
              </div>
              <div className="grid gap-4 p-5 md:grid-cols-2">
                {projects.map((project) => (
                  <ProjectCard key={project.title} {...project} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="writing" className="scroll-mt-24 border-t border-border bg-background">
          <div className="container py-16">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                  <span>Module 03</span>
                  <span className="text-foreground">Writing</span>
                </div>
                <h2 className="text-2xl font-semibold md:text-3xl">Field notes</h2>
                <p className="max-w-xl text-sm text-muted-foreground">
                  Notes on engineering decisions, performance, and how things work.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/blog">All posts</Link>
              </Button>
            </div>
            <div className="mt-8 rounded-xl border border-border bg-card/20">
              <div className="flex items-center justify-between border-b border-border/60 px-5 py-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <span>logbook</span>
                <span>entries: {postCount}</span>
              </div>
              <div className="grid gap-4 p-5 md:grid-cols-2">
                {posts.map((post) => (
                  <BlogPost key={post.slug} {...post} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="links" className="scroll-mt-24 border-t border-border bg-background">
          <div className="container py-16">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                <span>Module 04</span>
                <span className="text-foreground">Links</span>
              </div>
              <h2 className="text-2xl font-semibold md:text-3xl">Find me online</h2>
              <p className="text-sm text-muted-foreground">Places I share work and updates.</p>
            </div>
            <div className="mt-8 rounded-xl border border-border bg-card/20">
              <div className="flex items-center justify-between border-b border-border/60 px-5 py-3 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <span>endpoints</span>
                <span>active: {linkCount}</span>
              </div>
              <div className="grid gap-4 p-5 md:grid-cols-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-lg border border-border bg-card/40 p-5 transition hover:border-primary/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                        {link.label}
                      </span>
                      <Icon icon={link.icon} className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground group-hover:text-foreground">
                      {link.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
