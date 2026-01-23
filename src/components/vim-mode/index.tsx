"use client"

import { VimModeProvider } from "./vim-mode-context"
import { StatusLine } from "./status-line"
import { CursorLine } from "./cursor-line"

export function VimMode({ children }: { children: React.ReactNode }) {
  return (
    <VimModeProvider>
      {children}
      <StatusLine />
      <CursorLine />
    </VimModeProvider>
  )
}

export { useVimMode } from "./vim-mode-context"
