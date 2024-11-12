'use client'

import { useRef, useEffect } from 'react'
import { setupParticleBackground } from '../hooks/useParticleBackground'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = setupParticleBackground(canvasRef.current)
      return () => {
        cleanup()
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particle-background"
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  )
}