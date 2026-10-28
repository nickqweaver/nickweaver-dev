import { createElement as h, type CSSProperties, type ReactNode } from "react"
import type { Post } from "../src/lib/api.ts"

// Ports of the former Next.js `opengraph-image.tsx` files (home and blog post). Kept as plain
// `createElement` calls so the Vite config can load them without a JSX transform.

export const OG_SIZE = { width: 1200, height: 630 }

function div(style: CSSProperties, ...children: ReactNode[]) {
  return h("div", { style }, ...children)
}

function span(style: CSSProperties, ...children: ReactNode[]) {
  return h("span", { style }, ...children)
}

function dot(background: string) {
  return div({ width: "12px", height: "12px", borderRadius: "50%", background })
}

function terminal({ path, command, body }: { path: string; command: string; body: ReactNode[] }) {
  return div(
    {
      background: "#000000",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      padding: "60px",
      // next/og laid this out border-box; current satori defaults to content-box.
      boxSizing: "border-box",
      fontFamily: "monospace",
    },
    // Terminal header
    div(
      { display: "flex", alignItems: "center", gap: "8px", marginBottom: "40px" },
      dot("#ff5555"),
      dot("#f1fa8c"),
      dot("#50fa7b"),
      span({ color: "#6272a4", marginLeft: "16px", fontSize: "20px" }, path),
    ),
    // Command
    div(
      { display: "flex", marginBottom: "24px" },
      span({ color: "#50fa7b", fontSize: "28px" }, "❯"),
      span({ color: "#f8f8f2", fontSize: "28px", marginLeft: "12px" }, command),
    ),
    ...body,
    // Footer
    div(
      { display: "flex", gap: "24px", color: "#8be9fd", fontSize: "24px" },
      span({}, "nickweaver.dev"),
    ),
  )
}

export function homeImage() {
  return terminal({
    path: "~/nick.weaver",
    command: "cat about.txt",
    body: [
      div(
        { color: "#f8f8f2", fontSize: "72px", fontWeight: "bold", marginBottom: "24px" },
        "Nick Weaver",
      ),
      div(
        { color: "#6272a4", fontSize: "32px", marginBottom: "auto" },
        "Software engineer focused on reliability and performance.",
      ),
    ],
  })
}

export function postImage(post: Pick<Post, "slug" | "title" | "date" | "readingTime">) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  })

  return terminal({
    path: "~/nick.weaver/blog",
    command: `cat posts/${post.slug}.md`,
    body: [
      div(
        {
          color: "#f8f8f2",
          fontSize: "56px",
          fontWeight: "bold",
          marginBottom: "24px",
          // The Next version also set lineHeight: 1.2, but next/og ignored it and rendered the
          // font's normal line height. Omitted so wrapped titles keep the same spacing.
        },
        post.title,
      ),
      div(
        {
          display: "flex",
          gap: "24px",
          color: "#6272a4",
          fontSize: "24px",
          marginBottom: "auto",
        },
        span({}, date),
        span({}, "·"),
        span({}, post.readingTime),
      ),
    ],
  })
}
