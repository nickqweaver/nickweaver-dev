"use client"

import { useEffect, useRef } from "react"

export function CodeBlockEnhancer({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const preElements = containerRef.current.querySelectorAll("pre")

    preElements.forEach((pre) => {
      // Skip if already enhanced
      if (pre.parentElement?.classList.contains("code-block-wrapper")) return

      const code = pre.querySelector("code")
      if (!code) return

      // Extract language from class (e.g., "language-typescript")
      const langClass = Array.from(code.classList).find((c) => c.startsWith("language-"))
      const language = langClass ? langClass.replace("language-", "") : "text"

      // Create wrapper
      const wrapper = document.createElement("div")
      wrapper.className = "code-block-wrapper border border-border rounded-none overflow-hidden my-4"

      // Create header
      const header = document.createElement("div")
      header.className =
        "flex items-center justify-between px-4 py-2 bg-card border-b border-border text-xs"

      // Language label
      const langLabel = document.createElement("span")
      langLabel.className = "text-muted-foreground"
      langLabel.textContent = language

      // Copy button
      const copyBtn = document.createElement("button")
      copyBtn.className = "text-muted-foreground hover:text-dr-green transition-colors"
      copyBtn.textContent = "[copy]"
      copyBtn.onclick = async () => {
        const text = code.textContent || ""
        await navigator.clipboard.writeText(text)
        copyBtn.textContent = "[copied]"
        copyBtn.classList.add("text-dr-green")
        setTimeout(() => {
          copyBtn.textContent = "[copy]"
          copyBtn.classList.remove("text-dr-green")
        }, 2000)
      }

      header.appendChild(langLabel)
      header.appendChild(copyBtn)

      // Remove existing border/margin from pre since wrapper handles it
      pre.style.margin = "0"
      pre.style.border = "none"
      pre.style.borderRadius = "0"

      // Wrap the pre element
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(header)
      wrapper.appendChild(pre)
    })
  }, [])

  return <div ref={containerRef}>{children}</div>
}
