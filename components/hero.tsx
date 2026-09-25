"use client"

import { useEffect, useRef } from "react"
import { StudentBadge } from "@/components/student-badge"

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
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20 pb-12 hero-glow"
      aria-label="Hero"
    >
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Introduction & CTA */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            {/* Kicker */}
            <div className="inline-flex items-center gap-2 text-[0.78rem] font-medium tracking-[0.1em] uppercase text-muted-foreground mb-6 reveal">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
              Available for work &nbsp;·&nbsp; Chhatrapati Sambhajinagar, MH
            </div>

            {/* Name */}
            <h1 className="font-serif text-[clamp(2.8rem,7vw,6.5rem)] font-light leading-[1.05] tracking-[-0.02em] mb-5 reveal delay-100">
              Vaibhav
              <br />
              <em className="text-accent not-italic font-normal" style={{ fontStyle: "italic" }}>
                Jadhav
              </em>
            </h1>

            {/* Tagline */}
            <p className="text-[clamp(0.92rem,2vw,1.08rem)] text-muted-foreground max-w-[500px] leading-[1.75] mb-8 reveal delay-200">
              CS Engineer who builds purposeful Android apps, explores AI at every edge,
              and ships things that actually work.
            </p>

            {/* CTAs */}
            <div className="flex gap-3.5 flex-wrap justify-center lg:justify-start reveal delay-300 mb-6">
              <a
                href="#work"
                className="inline-flex items-center px-6 py-2.5 rounded-full text-[0.88rem] font-medium bg-accent text-[#0A0A0B] border border-accent hover:brightness-110 transition-all shadow-md shadow-accent/20"
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

            <p className="text-[0.78rem] text-muted-foreground/80 tracking-wide font-mono">
              ✦ Interactive pass: Drag to swing • Click to flip
            </p>
          </div>

          {/* Right Column: Hanging 3D Lanyard Student Badge directly in Hero */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative reveal delay-200 w-full">
            <div className="w-full max-w-[360px] h-[520px] sm:h-[560px] flex items-center justify-center">
              <StudentBadge height="100%" cardWidth={230} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-[0.7rem] tracking-[0.18em] uppercase text-muted-foreground animate-bob"
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
