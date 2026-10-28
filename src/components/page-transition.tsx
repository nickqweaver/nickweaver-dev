import { useRouterState } from "@tanstack/react-router"
import type { ReactNode } from "react"

export function PageTransition({ children }: { children: ReactNode }) {
  // `location` switches before the next route's loader resolves, which would remount and fade
  // the old page; key on the resolved location so the fade starts when the new page renders.
  const pathname = useRouterState({
    select: (state) => state.resolvedLocation?.pathname ?? state.location.pathname,
  })

  // A CSS fade rather than framer-motion: framer drops its finished animation a frame before
  // committing `opacity: 1`, so every page blinked out for one frame at the end of the fade.
  return (
    <div key={pathname} className="animate-in fade-in duration-200 ease-out">
      {children}
    </div>
  )
}
