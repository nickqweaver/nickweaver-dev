"use client"

import { useVimMode } from "./vim-mode-context"
import { usePathname } from "next/navigation"

export function StatusLine() {
  const { mode } = useVimMode()
  const pathname = usePathname()

  const pathDisplay = pathname === "/" ? "~" : `~${pathname}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card text-xs font-mono">
      <div className="flex h-7 items-center justify-between px-4">
        <span className="text-muted-foreground">{pathDisplay}</span>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground hidden sm:inline">
            ⌘K <span className="text-muted-foreground/50">menu</span>
            <span className="mx-2 text-border">·</span>
          </span>
          {mode === "NORMAL" ? (
            <>
              <span className="text-muted-foreground hidden sm:inline">
                j/k <span className="text-muted-foreground/50">nav</span>
                <span className="mx-2 text-border">·</span>
                enter <span className="text-muted-foreground/50">select</span>
                <span className="mx-2 text-border">·</span>
                g/G <span className="text-muted-foreground/50">top/end</span>
                <span className="mx-2 text-border">·</span>
                q <span className="text-muted-foreground/50">quit</span>
              </span>
              <span className="text-muted-foreground sm:hidden">
                ⌘K · j/k · enter · q
              </span>
              <span className="bg-dr-green text-background px-2 py-0.5 font-bold">NORMAL</span>
            </>
          ) : (
            <>
              <span className="text-muted-foreground hidden sm:inline">
                esc <span className="text-muted-foreground/50">vim mode</span>
              </span>
              <span className="text-muted-foreground sm:hidden">
                ⌘K · esc
              </span>
              <span className="bg-muted text-muted-foreground px-2 py-0.5">BROWSE</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
