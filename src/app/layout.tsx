import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { VimMode } from "@/components/vim-mode"
import { PageTransition } from "@/components/page-transition"
import { CommandMenuProvider } from "@/components/command-menu"
import "./globals.css"

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Nick Weaver",
  description: "Software engineer focused on reliability and performance.",
  metadataBase: new URL("https://nickweaver.dev"),
  openGraph: {
    title: "Nick Weaver",
    description: "Software engineer focused on reliability and performance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nick Weaver",
    description: "Software engineer focused on reliability and performance.",
    creator: "@TheSWEaver",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistMono.variable} font-mono antialiased`}>
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
                    <span>© {new Date().getFullYear()} nick weaver</span>
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
      </body>
    </html>
  )
}
