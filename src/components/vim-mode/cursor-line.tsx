"use client"

import { useVimMode } from "./vim-mode-context"

export function CursorLine() {
  const { mode, focusedElement } = useVimMode()

  if (mode !== "NORMAL" || !focusedElement) {
    return null
  }

  const { rect } = focusedElement
  const padding = 4

  return (
    <>
      {/* Full-width line highlight */}
      <div
        className="fixed left-0 right-0 pointer-events-none z-40 bg-vim-cursorline/50"
        style={{
          top: rect.top - padding,
          height: rect.height + padding * 2,
        }}
      />
      {/* Cursor block on the left edge */}
      <div
        className="fixed pointer-events-none z-50 w-1 bg-vim-cursor"
        style={{
          left: rect.left - 8,
          top: rect.top,
          height: rect.height,
        }}
      />
      {/* Subtle border around focused element */}
      <div
        className="fixed pointer-events-none z-40 border border-vim-cursor/50 rounded-sm"
        style={{
          left: rect.left - padding,
          top: rect.top - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2,
        }}
      />
    </>
  )
}
