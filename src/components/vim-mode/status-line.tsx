"use client"

import { useVimMode } from "./vim-mode-context"

export function StatusLine() {
  const { mode } = useVimMode()

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono text-sm select-none">
      {mode === "NORMAL" ? (
        <span className="px-2 py-1 bg-dr-green/20 text-dr-green">
          -- NORMAL --
        </span>
      ) : (
        <span className="px-2 py-1 bg-muted text-muted-foreground">
          Press Esc
        </span>
      )}
    </div>
  )
}
