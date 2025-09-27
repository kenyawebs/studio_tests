import * as React from "react"

/**
 * The pixel width at which the layout switches from mobile to desktop.
 * @type {number}
 */
const MOBILE_BREAKPOINT = 768

/**
 * A custom hook to determine if the current viewport is a mobile device.
 * It listens for changes in the window size and returns `true` if the width
 * is less than the `MOBILE_BREAKPOINT`.
 *
 * @returns {boolean} `true` if the viewport is mobile, otherwise `false`.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
