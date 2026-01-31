import * as React from "react"

// Breakpoint constants matching Tailwind defaults
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

type Breakpoint = 'mobile' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const MOBILE_BREAKPOINT = BREAKPOINTS.md // 768px

/**
 * Simple hook to check if viewport is mobile (<768px)
 * For backward compatibility
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

/**
 * Enhanced hook providing granular breakpoint information
 * Returns current breakpoint and boolean helpers for responsive logic
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>('lg')
  const [width, setWidth] = React.useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024)

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const w = window.innerWidth
      setWidth(w)
      
      if (w < BREAKPOINTS.sm) {
        setBreakpoint('mobile')
      } else if (w < BREAKPOINTS.md) {
        setBreakpoint('sm')
      } else if (w < BREAKPOINTS.lg) {
        setBreakpoint('md')
      } else if (w < BREAKPOINTS.xl) {
        setBreakpoint('lg')
      } else if (w < BREAKPOINTS['2xl']) {
        setBreakpoint('xl')
      } else {
        setBreakpoint('2xl')
      }
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return {
    breakpoint,
    width,
    // Boolean helpers for common checks
    isMobile: breakpoint === 'mobile',           // <640px (very small phones)
    isSmall: breakpoint === 'mobile' || breakpoint === 'sm', // <768px (phones)
    isMedium: breakpoint === 'md',               // 768-1023px (tablets)
    isLarge: breakpoint === 'lg',                // 1024-1279px (small laptops)
    isXLarge: breakpoint === 'xl' || breakpoint === '2xl', // 1280px+ (desktops)
    // Compound helpers
    isMobileOrTablet: ['mobile', 'sm', 'md'].includes(breakpoint), // <1024px
    isDesktop: ['lg', 'xl', '2xl'].includes(breakpoint),           // >=1024px
  }
}
