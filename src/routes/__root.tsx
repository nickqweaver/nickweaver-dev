import type React from "react"
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { VimMode } from "@/components/vim-mode"
import { PageTransition } from "@/components/page-transition"
import { CommandMenuProvider } from "@/components/command-menu"
import { NotFound } from "@/components/not-found"
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo"
import geistMonoUrl from "@/styles/fonts/GeistMonoVF.woff?url"
import globalsCss from "@/styles/globals.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE_TITLE },
      { name: "description", content: SITE_DESCRIPTION },
      { property: "og:title", content: SITE_TITLE },
      { property: "og:description", content: SITE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:creator", content: "@TheSWEaver" },
      { name: "twitter:title", content: SITE_TITLE },
      { name: "twitter:description", content: SITE_DESCRIPTION },
    ],
    links: [
      { rel: "stylesheet", href: globalsCss },
      {
        rel: "preload",
        href: geistMonoUrl,
        as: "font",
        type: "font/woff",
        crossOrigin: "anonymous",
      },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml", sizes: "any" },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="font-mono antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CommandMenuProvider>
            <VimMode>
              <div className="flex min-h-screen flex-col bg-background text-foreground">
                <Header />
                <div className="flex-1">
                  <PageTransition>{children}</PageTransition>
                </div>
                <footer className="border-t border-border pb-8">
                  <div className="container py-6">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span suppressHydrationWarning>© {new Date().getFullYear()} nick weaver</span>
                      <div className="flex items-center gap-6">
                        <a
                          href="https://github.com/nickqweaver"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          github
                        </a>
                        <a
                          href="https://www.linkedin.com/in/nicholas-q-weaver/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          linkedin
                        </a>
                        <a
                          href="https://twitter.com/TheSWEaver"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          x.com
                        </a>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </VimMode>
          </CommandMenuProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
