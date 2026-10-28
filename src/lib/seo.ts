export const SITE_URL = "https://nickweaver.dev"

export const SITE_TITLE = "Nick Weaver"
export const SITE_DESCRIPTION = "Software engineer focused on reliability and performance."

// Open Graph images are rendered at build time by `plugins/og-images.ts`.
export const OG_HOME_PATH = "/og/home.png"

export function ogPostPath(slug: string) {
  return `/og/blog/${slug}.png`
}

/** Per-route Open Graph / Twitter image tags plus canonical URL, mirroring the old Next metadata. */
export function pageHead({
  path,
  image,
  imageAlt,
}: {
  path: string
  image: string
  imageAlt: string
}) {
  const url = `${SITE_URL}${path}`
  const imageUrl = `${SITE_URL}${image}`

  return {
    meta: [
      { property: "og:url", content: url },
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: imageAlt },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: imageAlt },
      { name: "twitter:image:type", content: "image/png" },
      { name: "twitter:image:width", content: "1200" },
      { name: "twitter:image:height", content: "630" },
    ],
    links: [{ rel: "canonical", href: url }],
  }
}

export function homeHead(path: string) {
  return pageHead({ path, image: OG_HOME_PATH, imageAlt: "Nick Weaver - Software Engineer" })
}
