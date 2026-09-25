"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { GlobeFlights } from "@/components/ui/cobe-globe-flights"

const skillGroups = [
  {
    label: "Languages",
    skills: ["Java", "Kotlin", "Python", "C", "C++", "SQL", "TypeScript"],
  },
  {
    label: "Mobile & Architecture",
    skills: ["Android Studio", "Jetpack Compose", "Clean Architecture", "Firebase", "ML Kit", "Room DB"],
  },
  {
    label: "Web & Full-Stack",
    skills: ["Next.js", "React", "Node.js", "Tailwind CSS", "REST APIs", "WebSockets"],
  },
  {
    label: "AI & Engineering Foundations",
    skills: ["AI Automation", "Model Integration", "Data Structures", "Algorithms", "SDLC", "Git / GitHub"],
  },
]

export function Toolkit() {
  const { resolvedTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? (resolvedTheme ?? theme) === "dark" : false

  return (
    <section id="toolkit" className="py-24 border-t border-border bg-background relative overflow-hidden transition-colors duration-300">
      {/* COBE Globe background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 dark:opacity-15"
        aria-hidden="true"
      >
        <div className="w-[min(80vw,680px)] aspect-square">
          {mounted && (
            <GlobeFlights
              dark={isDark ? 1 : 0}
              speed={0.003}
              className="w-full h-full"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1080px] text-center relative z-10">
        <p className="section-label">Skills &amp; Technologies</p>
        <h2 className="section-heading text-foreground">Developer Toolkit</h2>

        <div className="flex flex-col gap-8 max-w-[800px] mx-auto">
          {skillGroups.map((g) => (
            <div key={g.label} className="p-6 rounded-2xl bg-card border border-border backdrop-blur-sm shadow-sm transition-colors">
              <p className="text-[0.72rem] font-mono font-bold tracking-[0.16em] uppercase text-accent mb-3.5 text-center">
                {g.label}
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {g.skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center px-4 py-1.5 rounded-full text-[0.82rem] font-medium bg-background border border-border text-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-all cursor-default"
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
