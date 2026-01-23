"use client"

import { useVimMode } from "./vim-mode-context"

export function StatusLine() {
  const { mode } = useVimMode()

  return (
    <div className="fixed bottom-4 right-4 z-50 font-mono text-sm select-none">
      <span
        className={`px-2 py-1 ${
          mode === "NORMAL"
            ? "bg-dr-green/20 text-dr-green"
            : "bg-muted text-muted-foreground"
        }`}
      >
        -- {mode} --
      </span>
    </div>
  )
}
