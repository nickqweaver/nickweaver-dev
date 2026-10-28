import { createRouter } from "@tanstack/react-router"
import { NotFound } from "@/components/not-found"
import { routeTree } from "./routeTree.gen"

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultNotFoundComponent: NotFound,
    scrollRestoration: true,
    // `scroll-smooth` on <html> would otherwise animate the scroll reset on every route change,
    // gliding the new page up from the old scroll position. Hash links still scroll smoothly.
    scrollRestorationBehavior: "instant",
  })
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
