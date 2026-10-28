import { motion } from "framer-motion"
import { useRouterState } from "@tanstack/react-router"
import type { ReactNode } from "react"

export function PageTransition({ children }: { children: ReactNode }) {
  // `location` switches before the next route's loader resolves, which would remount and fade
  // the old page; key on the resolved location so the fade starts when the new page renders.
  const pathname = useRouterState({
    select: (state) => state.resolvedLocation?.pathname ?? state.location.pathname,
  })

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
