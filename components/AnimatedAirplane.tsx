'use client'

import { useEffect, useState } from 'react'

interface AnimatedAirplaneProps {
  delay?: number
  duration?: number
  size?: number
  startY?: number
  direction?: 'left' | 'right'
}

export function AnimatedAirplane({ 
  delay = 0, 
  duration = 20, 
  size = 80,
  startY = 20,
  direction = 'left'
}: AnimatedAirplaneProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div
      className={`absolute ${direction === 'left' ? 'left-0' : 'right-0'} transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        top: `${startY}%`,
        animation: `fly${direction === 'left' ? 'Left' : 'Right'} ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <svg
        className="w-full h-full text-white/40 drop-shadow-lg"
        fill="currentColor"
        viewBox="0 0 24 24"
        style={{
          filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))',
        }}
      >
        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
    </div>
  )
}






