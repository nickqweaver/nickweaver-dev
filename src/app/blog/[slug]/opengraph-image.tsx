import { ImageResponse } from "next/og"
import { getPost } from "@/lib/api"

export const alt = "Blog Post"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px",
          fontFamily: "monospace",
        }}
      >
        {/* Terminal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#ff5555",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#f1fa8c",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#50fa7b",
            }}
          />
          <span style={{ color: "#6272a4", marginLeft: "16px", fontSize: "20px" }}>
            ~/nick.weaver/blog
          </span>
        </div>

        {/* Command */}
        <div style={{ display: "flex", marginBottom: "24px" }}>
          <span style={{ color: "#50fa7b", fontSize: "28px" }}>❯</span>
          <span style={{ color: "#f8f8f2", fontSize: "28px", marginLeft: "12px" }}>
            cat posts/{params.slug}.md
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            color: "#f8f8f2",
            fontSize: "56px",
            fontWeight: "bold",
            marginBottom: "24px",
            lineHeight: 1.2,
          }}
        >
          {post.title}
        </div>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            color: "#6272a4",
            fontSize: "24px",
            marginBottom: "auto",
          }}
        >
          <span>{date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            color: "#8be9fd",
            fontSize: "24px",
          }}
        >
          <span>nickweaver.dev</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
