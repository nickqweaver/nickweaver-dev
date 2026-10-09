import { motion } from "framer-motion"
import { useLocation } from "@tanstack/react-router"
import type { ReactNode } from "react"

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useLocation({ select: (location) => location.pathname })

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
