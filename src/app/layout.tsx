import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { VimMode } from "@/components/vim-mode"
import "./globals.css"

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Nick Weaver",
  description: "Software engineer focused on reliability and performance.",
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
          <VimMode>
            <div className="flex min-h-screen flex-col bg-background text-foreground">
              <Header />
              <div className="flex-1">{children}</div>
              <footer className="border-t border-border pb-8">
                <div className="container py-6">
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
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
                    <span>© {new Date().getFullYear()} nick weaver</span>
                  </div>
                </div>
              </footer>
            </div>
          </VimMode>
        </ThemeProvider>
      </body>
    </html>
  )
}
