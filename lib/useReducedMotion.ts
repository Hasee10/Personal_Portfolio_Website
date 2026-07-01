'use client'

import { useEffect, useState } from 'react'

/**
 * Subscribes to the `prefers-reduced-motion` media query and returns its
 * current value. Defaults to `false` on the server and on first render
 * (matches the existing pattern used across components).
 * Reactively updates if the user changes their OS motion preference at runtime.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
