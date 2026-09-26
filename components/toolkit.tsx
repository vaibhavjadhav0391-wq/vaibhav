"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { GlobeFlights } from "@/components/ui/cobe-globe-flights"
import {
  Code2,
  Database,
  Layers,
  Flame,
  Brain,
  Cpu,
  Boxes,
  Network,
  Radio,
  Sparkles,
  GitBranch,
  Repeat,
  Binary,
  Workflow
} from "lucide-react"

// Tech Logo Components (Crisp SVG + Brand Colors)
const TechIcon = ({ name }: { name: string }) => {
  const iconClass = "w-4 h-4 shrink-0 transition-transform group-hover:scale-110"

  switch (name) {
    // --- LANGUAGES ---
    case "Java":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor">
          <path d="M7 19c4 1 9 1 11-1M6 21c6 2 12 1 13-1" stroke="#e5262c" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 3c-2 3-3 6 0 8 2 2 1 4-1 6" stroke="#f58220" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 5c-2 2-2 4 0 6 2 1 1 3-1 5" stroke="#5382a1" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case "Kotlin":
      return (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <polygon points="2,2 22,2 12,12" fill="#7F52FF" />
          <polygon points="2,2 12,12 2,22" fill="#C711E1" />
          <polygon points="2,22 12,12 22,22" fill="#E4485D" />
        </svg>
      )
    case "Python":
      return (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <path d="M11.9 2C8.6 2 8.8 3.4 8.8 3.4L8.8 5.2H12.1V5.7H5.2S2 5.3 2 9.6C2 13.9 4.8 13.7 4.8 13.7H6.5V11.2C6.5 8.3 8.9 8.3 8.9 8.3H12.3C14.7 8.3 14.8 6.2 14.8 6.2V3.4S15.2 2 11.9 2ZM10.4 3.2C10.8 3.2 11.1 3.5 11.1 3.9C11.1 4.3 10.8 4.6 10.4 4.6C10 4.6 9.7 4.3 9.7 3.9C9.7 3.5 10 3.2 10.4 3.2Z" fill="#3776AB" />
          <path d="M12.1 22C15.4 22 15.2 20.6 15.2 20.6L15.2 18.8H11.9V18.3H18.8S22 18.7 22 14.4C22 10.1 19.2 10.3 19.2 10.3H17.5V12.8C17.5 15.7 15.1 15.7 15.1 15.7H11.7C9.3 15.7 9.2 17.8 9.2 17.8V20.6S8.8 22 12.1 22ZM13.6 20.8C13.2 20.8 12.9 20.5 12.9 20.1C12.9 19.7 13.2 19.4 13.6 19.4C14 19.4 14.3 19.7 14.3 20.1C14.3 20.5 14 20.8 13.6 20.8Z" fill="#FFD43B" />
        </svg>
      )
    case "C":
      return (
        <span className="w-4 h-4 rounded-full bg-[#00599C]/15 text-[#00599C] font-mono font-bold text-[10px] flex items-center justify-center border border-[#00599C]/30">
          C
        </span>
      )
    case "C++":
      return (
        <span className="w-4 h-4 rounded-full bg-[#004482]/15 text-[#004482] dark:text-[#659ad2] font-mono font-bold text-[9px] flex items-center justify-center border border-[#004482]/30">
          C++
        </span>
      )
    case "SQL":
      return <Database className={`${iconClass} text-sky-500`} />
    case "TypeScript":
      return (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <rect width="24" height="24" rx="4" fill="#3178C6" />
          <path d="M5.5 10H11.5M8.5 10V18M13 16.5C13.5 17.5 14.8 18 16 18C17.5 18 18.5 17.2 18.5 16C18.5 14.5 17 14 15.5 13.5C14 13 13 12.5 13 11.2C13 10 14 9.2 15.5 9.2C16.8 9.2 17.8 9.8 18.2 10.8" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    // --- MOBILE & ARCHITECTURE ---
    case "Android Studio":
      return (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zM15.53 2.16l1.3-1.3a.5.5 0 00-.7-.7l-1.46 1.46C13.71 1.23 12.88 1 12 1s-1.71.23-2.67.62L7.87.16a.5.5 0 00-.7.7l1.3 1.3C6.73 3.32 5.5 5.3 5.5 7.5H18.5c0-2.2-1.23-4.18-2.97-5.34zM9 5a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2z" fill="#3DDC84" />
        </svg>
      )
    case "Jetpack Compose":
      return (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <polygon points="12,2 22,7.5 22,16.5 12,22 2,16.5 2,7.5" fill="#4285F4" opacity="0.85" />
          <polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5" fill="#34A853" />
        </svg>
      )
    case "Clean Architecture":
      return <Layers className={`${iconClass} text-indigo-500`} />
    case "Firebase":
      return (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <path d="M4.5 17.5L7.2 3.8C7.3 3.3 8 3.1 8.3 3.5L10.8 7.8 4.5 17.5z" fill="#FFA000" />
          <path d="M4.5 17.5L12 21.8C12.4 22 12.8 22 13.2 21.8L19.5 17.5 12.2 4.2C12 3.8 11.4 3.8 11.2 4.2L4.5 17.5z" fill="#F57C00" />
          <path d="M19.5 17.5L14.2 8.5 12 4.2 19.5 17.5z" fill="#FFCA28" />
        </svg>
      )
    case "ML Kit":
      return <Brain className={`${iconClass} text-amber-500`} />
    case "Room DB":
      return <Boxes className={`${iconClass} text-emerald-500`} />

    // --- WEB & FULL-STACK ---
    case "Next.js":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
          <circle cx="12" cy="12" r="11" fill="currentColor" className="text-[#141414] dark:text-white" />
          <path d="M15.5 8v8M9 8v8l7.5-9" stroke="#ffffff" className="dark:stroke-[#141414]" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case "React":
      return (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" fill="none" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" fill="none" stroke="#61DAFB" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      )
    case "Node.js":
      return (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <polygon points="12,2 21,7.2 21,16.8 12,22 3,16.8 3,7.2" fill="#339933" />
          <path d="M12 6.5v11M7.5 9l9 6" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" className={iconClass} fill="#06B6D4">
          <path d="M12 6c-2.7 0-4.3 1.3-5 4 .9-1.3 2.1-1.9 3.5-1.6 1 .2 1.8 1 2.6 1.8 1.4 1.4 3 3 6.9 3 2.7 0 4.3-1.3 5-4-.9 1.3-2.1 1.9-3.5 1.6-1-.2-1.8-1-2.6-1.8-1.4-1.4-3-3-6.9-3zM5 12c-2.7 0-4.3 1.3-5 4 .9-1.3 2.1-1.9 3.5-1.6 1 .2 1.8 1 2.6 1.8 1.4 1.4 3 3 6.9 3 2.7 0 4.3-1.3 5-4-.9 1.3-2.1 1.9-3.5 1.6-1-.2-1.8-1-2.6-1.8-1.4-1.4-3-3-6.9-3z" />
        </svg>
      )
    case "REST APIs":
      return <Network className={`${iconClass} text-violet-500`} />
    case "WebSockets":
      return <Radio className={`${iconClass} text-rose-500 animate-pulse`} />

    // --- AI & ENGINEERING FOUNDATIONS ---
    case "AI Automation":
      return <Sparkles className={`${iconClass} text-amber-500`} />
    case "Model Integration":
      return <Cpu className={`${iconClass} text-cyan-500`} />
    case "Data Structures":
      return <Binary className={`${iconClass} text-blue-500`} />
    case "Algorithms":
      return <Workflow className={`${iconClass} text-emerald-500`} />
    case "SDLC":
      return <Repeat className={`${iconClass} text-indigo-500`} />
    case "Git / GitHub":
      return <GitBranch className={`${iconClass} text-[#F05032]`} />

    default:
      return <Code2 className={`${iconClass} text-muted-foreground`} />
  }
}

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

        <div className="flex flex-col gap-8 max-w-[840px] mx-auto">
          {skillGroups.map((g) => (
            <div
              key={g.label}
              className="p-6 sm:p-7 rounded-2xl bg-card border border-border backdrop-blur-sm shadow-sm transition-colors hover:shadow-md"
            >
              <p className="text-[0.74rem] font-mono font-bold tracking-[0.16em] uppercase text-accent mb-4 text-center">
                {g.label}
              </p>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {g.skills.map((skill) => (
                  <div
                    key={skill}
                    className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[0.82rem] font-medium bg-background border border-border text-foreground hover:border-accent hover:text-accent hover:bg-accent/5 transition-all shadow-2xs cursor-default"
                  >
                    <TechIcon name={skill} />
                    <span className="font-sans font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Toolkit
