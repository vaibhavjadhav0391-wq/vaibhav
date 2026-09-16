"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { GlobeFlights } from "@/components/ui/cobe-globe-flights"

const skillGroups = [
  {
    label: "Languages",
    skills: ["Java", "Kotlin", "Python", "C", "C++", "SQL"],
  },
  {
    label: "Mobile",
    skills: ["Android Studio", "UI/UX Design", "App Architecture", "Firebase", "ML Kit"],
  },
  {
    label: "Web",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Vercel"],
  },
  {
    label: "AI & Foundations",
    skills: ["AI Model Implementation", "Automation Solutions", "Data Structures", "Algorithms", "Problem Solving", "SDLC"],
  },
  {
    label: "Soft Skills",
    skills: ["Professional Ethics", "Teamwork", "Time Management", "Agile"],
  },
]

export function Toolkit() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? (resolvedTheme ?? theme) === "dark" : true

  return (
    <section id="toolkit" className="py-28 border-t border-border relative overflow-hidden">
      {/* ── COBE Globe — full-section background ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-[min(80vw,700px)] aspect-square opacity-20 dark:opacity-[0.18]"
          style={{ pointerEvents: "none" }}
        >
          {mounted && (
            <GlobeFlights
              dark={isDark ? 1 : 0}
              speed={0.004}
              className="w-full h-full"
            />
          )}
        </div>
      </div>

      {/* ── Content on top ── */}
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1080px] text-center relative z-10">
        <p className="section-label reveal">Skills</p>
        <h2 className="section-heading reveal delay-100">Toolkit</h2>

        <div className="flex flex-col gap-10 max-w-[780px] mx-auto">
          {skillGroups.map((g, i) => (
            <div key={g.label} className={`reveal delay-${Math.min((i + 1) * 100, 400)}`}>
              <p className="text-[0.7rem] font-semibold tracking-[0.14em] uppercase text-muted-foreground mb-4 text-center">
                {g.label}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.8rem] font-medium border border-border text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-all cursor-default backdrop-blur-sm bg-background/40"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
