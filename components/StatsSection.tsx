'use client'

import { useEffect, useState } from 'react'

const stats = [
  { label: 'Projects Completed', value: 5000, suffix: '+', key: 'projects' },
  { label: 'Years Experience', value: 20, suffix: '+', key: 'years' },
  { label: 'Satisfied Clients', value: 1000, suffix: '+', key: 'clients' },
  { label: 'Parts in Inventory', value: 50000, suffix: '+', key: 'parts' },
]

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({ projects: 0, years: 0, clients: 0, parts: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('stats-section')
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    stats.forEach((stat) => {
      let current = 0
      const increment = stat.value / steps
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          setCounts((prev) => ({ ...prev, [stat.key]: stat.value }))
          clearInterval(timer)
        } else {
          setCounts((prev) => ({ ...prev, [stat.key]: Math.floor(current) }))
        }
      }, interval)
    })
  }, [isVisible])

  return (
    <section id="stats-section" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm uppercase tracking-wider text-white/70 mb-4">OUR ACHIEVEMENTS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by Aviation Industry Leaders
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className={`text-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500 hover:scale-110 hover:border-blue-400/50 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                {counts[stat.key as keyof typeof counts].toLocaleString()}{stat.suffix}
              </div>
              <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}





