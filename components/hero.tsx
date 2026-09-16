"use client"

import { useEffect, useRef } from "react"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(2)
      const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(2)
      section.style.setProperty("--mx", `${x}%`)
      section.style.setProperty("--my", `${y}%`)
    }
    section.addEventListener("mousemove", onMove)
    return () => section.removeEventListener("mousemove", onMove)
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-14 hero-glow"
      aria-label="Hero"
    >
      {/* Kicker */}
      <div className="flex items-center gap-2 text-[0.78rem] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-6 reveal">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
        Available for work &nbsp;·&nbsp; Chhatrapati Sambhajinagar, MH
      </div>

      {/* Name */}
      <h1 className="font-serif text-[clamp(3.2rem,9vw,7.5rem)] font-light leading-[1.04] tracking-[-0.02em] mb-5 reveal delay-100">
        Vaibhav
        <br />
        <em className="text-accent not-italic font-normal" style={{ fontStyle: "italic" }}>
          Jadhav
        </em>
      </h1>

      {/* Tagline */}
      <p className="text-[clamp(0.92rem,2vw,1.05rem)] text-muted-foreground max-w-[460px] leading-[1.7] mb-9 reveal delay-200">
        CS Engineer who builds purposeful Android apps, explores AI at every edge,
        and ships things that actually work.
      </p>

      {/* CTAs */}
      <div className="flex gap-3.5 flex-wrap justify-center reveal delay-300">
        <a
          href="#work"
          className="inline-flex items-center px-6 py-2.5 rounded-full text-[0.88rem] font-medium bg-accent text-[#0A0A0B] border border-accent hover:brightness-110 transition-all"
        >
          See the work
        </a>
        <a
          href="mailto:vaibhavjadhav0301@gmail.com"
          className="inline-flex items-center px-6 py-2.5 rounded-full text-[0.88rem] font-medium bg-transparent text-foreground border border-border hover:border-accent hover:text-accent transition-all"
        >
          Say hello
        </a>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground animate-bob"
        aria-hidden="true"
      >
        <span>Scroll</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
