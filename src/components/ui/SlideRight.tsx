'use client'

export default function SlideRight() {
  return (
    <div className="w-full mx-auto px-8">
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 animate-slide-right"
          style={{
            width: '200%',
            background: 'linear-gradient(90deg, transparent, #ef4444, #ef4444, transparent)',
          }}
        />
      </div>
    </div>
  )
}