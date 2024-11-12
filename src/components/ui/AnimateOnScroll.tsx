
'use client'

import { useEffect, useRef } from 'react'

interface AnimateOnScrollProps {
  children: React.ReactNode
}

export default function AnimateOnScroll({ children }: AnimateOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={elementRef}
      className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
    >
      {children}
    </div>
  )
}