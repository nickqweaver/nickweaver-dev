"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"

type Mode = "BROWSE" | "NORMAL"

interface FocusedElement {
  element: HTMLElement
  rect: DOMRect
}

interface VimModeContextType {
  mode: Mode
  focusedElement: FocusedElement | null
}

const VimModeContext = createContext<VimModeContextType | null>(null)

const INTERACTIVE_SELECTOR = 'a[href], button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"]), h1, h2, h3, h4, h5, h6'
const MAX_ELEMENT_HEIGHT = 60 // Skip elements taller than this (e.g., card links)

export function useVimMode() {
  const context = useContext(VimModeContext)
  if (!context) {
    throw new Error("useVimMode must be used within VimModeProvider")
  }
  return context
}

export function VimModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("BROWSE")
  const [focusedElement, setFocusedElement] = useState<FocusedElement | null>(null)
  const currentIndexRef = useRef(0)
  const elementsRef = useRef<HTMLElement[]>([])
  const pathname = usePathname()

  const getInteractiveElements = useCallback(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR)
    ).filter((el) => {
      // Filter out hidden elements and elements that are too large
      const style = window.getComputedStyle(el)
      const rect = el.getBoundingClientRect()
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        style.opacity !== "0" &&
        rect.width > 0 &&
        rect.height > 0 &&
        rect.height <= MAX_ELEMENT_HEIGHT
      )
    })

    // Sort by vertical position, then horizontal
    elements.sort((a, b) => {
      const rectA = a.getBoundingClientRect()
      const rectB = b.getBoundingClientRect()
      const yDiff = rectA.top - rectB.top
      if (Math.abs(yDiff) > 10) return yDiff
      return rectA.left - rectB.left
    })

    return elements
  }, [])

  const updateFocusedElement = useCallback((elements: HTMLElement[], index: number) => {
    const element = elements[index]
    if (element) {
      const rect = element.getBoundingClientRect()
      setFocusedElement({ element, rect })

      // Scroll into view if needed
      const viewportTop = 100 // account for header
      const viewportBottom = window.innerHeight - 100

      if (rect.top < viewportTop) {
        window.scrollBy({ top: rect.top - viewportTop, behavior: "instant" })
      } else if (rect.bottom > viewportBottom) {
        window.scrollBy({ top: rect.bottom - viewportBottom, behavior: "instant" })
      }
    }
  }, [])

  const enterNormalMode = useCallback(() => {
    const elements = getInteractiveElements()
    elementsRef.current = elements

    if (elements.length === 0) {
      setMode("NORMAL")
      setFocusedElement(null)
      return
    }

    // Find the first element in or near the viewport
    const viewportMiddle = window.innerHeight / 2
    let closestIndex = 0
    let closestDistance = Infinity

    elements.forEach((el, i) => {
      const rect = el.getBoundingClientRect()
      const distance = Math.abs(rect.top - viewportMiddle)
      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = i
      }
    })

    currentIndexRef.current = closestIndex
    updateFocusedElement(elements, closestIndex)
    setMode("NORMAL")
  }, [getInteractiveElements, updateFocusedElement])

  const exitNormalMode = useCallback(() => {
    setMode("BROWSE")
    setFocusedElement(null)
  }, [])

  const moveFocus = useCallback((direction: "up" | "down") => {
    const elements = elementsRef.current
    if (elements.length === 0) return

    const newIndex =
      direction === "down"
        ? Math.min(currentIndexRef.current + 1, elements.length - 1)
        : Math.max(currentIndexRef.current - 1, 0)

    currentIndexRef.current = newIndex
    updateFocusedElement(elements, newIndex)
  }, [updateFocusedElement])

  const activateFocused = useCallback(() => {
    if (!focusedElement?.element) return

    const el = focusedElement.element
    const tagName = el.tagName.toLowerCase()

    // For headings, scroll to top of viewport
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
      const rect = el.getBoundingClientRect()
      window.scrollBy({ top: rect.top - 100, behavior: "instant" })
    } else {
      el.click()
    }
  }, [focusedElement])

  // Update rects on scroll/resize
  useEffect(() => {
    if (mode !== "NORMAL") return

    const updateRect = () => {
      const elements = elementsRef.current
      const index = currentIndexRef.current
      if (elements[index]) {
        const rect = elements[index].getBoundingClientRect()
        setFocusedElement({ element: elements[index], rect })
      }
    }

    window.addEventListener("scroll", updateRect, { passive: true })
    window.addEventListener("resize", updateRect, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateRect)
      window.removeEventListener("resize", updateRect)
    }
  }, [mode])

  // Exit NORMAL mode on route change
  useEffect(() => {
    exitNormalMode()
  }, [pathname, exitNormalMode])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture keys when focused on input elements
      const target = e.target as HTMLElement
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return
      }

      if (mode === "BROWSE") {
        if (e.key === "Escape") {
          e.preventDefault()
          enterNormalMode()
        }
      } else {
        switch (e.key) {
          case "i":
          case "Escape":
            e.preventDefault()
            exitNormalMode()
            break
          case "j":
            e.preventDefault()
            moveFocus("down")
            break
          case "k":
            e.preventDefault()
            moveFocus("up")
            break
          case "Enter":
            e.preventDefault()
            activateFocused()
            break
          case "g":
            e.preventDefault()
            if (elementsRef.current.length > 0) {
              currentIndexRef.current = 0
              updateFocusedElement(elementsRef.current, 0)
              window.scrollTo({ top: 0, behavior: "instant" })
            }
            break
          case "G":
            e.preventDefault()
            if (elementsRef.current.length > 0) {
              currentIndexRef.current = elementsRef.current.length - 1
              updateFocusedElement(elementsRef.current, elementsRef.current.length - 1)
            }
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mode, enterNormalMode, exitNormalMode, moveFocus, activateFocused, updateFocusedElement])

  return (
    <VimModeContext.Provider value={{ mode, focusedElement }}>
      {children}
    </VimModeContext.Provider>
  )
}
