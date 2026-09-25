"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

const projects = [
  {
    id: "sarkarsathi",
    title: "SarkarSathi App",
    year: "2026",
    url: "https://github.com/vaibhavjadhav",
    desc: "A centralized platform empowering citizens to effortlessly discover and apply for government schemes and entitlements through a modern, frictionless UI.",
    tags: ["Android", "Kotlin", "Firebase", "Clean Architecture"],
  },
  {
    id: "rescuenet",
    title: "RescueNet — Disaster Management App",
    year: "2026",
    url: "https://github.com/vaibhavjadhav",
    desc: "A mission-critical disaster management system coordinating rescue operations, real-time SOS alerts, and verified emergency broadcast channels.",
    tags: ["Android", "Kotlin", "Real-time DB", "Location Services"],
  },
  {
    id: "transitpulse",
    title: "TransitPulse — College Bus Tracker",
    year: "2026",
    url: "https://github.com/vaibhavjadhav",
    desc: "Real-time campus transit tracking web application featuring ML-powered arrival predictions (ETA) with full offline-first PWA caching support.",
    tags: ["Next.js", "ML / ETA", "PWA", "Tailwind CSS"],
  },
  {
    id: "quicktransfer",
    title: "QuickTransfer — Scan. Send. Done.",
    year: "2026",
    url: "https://github.com/vaibhavjadhav",
    desc: "Blazing fast peer-to-peer file transfer between mobile and desktop via instantaneous QR code pairing on the local network with zero cloud lag.",
    tags: ["React", "Node.js", "WebSockets", "Local Networking"],
  },
  {
    id: "translator",
    title: "Advanced Translator App",
    year: "2025",
    url: "https://github.com/vaibhavjadhav",
    desc: "Multi-language Android translation application combining real-time speech-to-text, neural translation, and high-clarity voice playback.",
    tags: ["Android", "Kotlin", "ML Kit", "Audio Processing"],
  },
  {
    id: "securelogin",
    title: "Android Secure Login System",
    year: "2026",
    url: "https://github.com/vaibhavjadhav",
    desc: "Enterprise-grade biometric and multi-factor Android authentication suite with silent intruder photo capture on unauthorized access attempts.",
    tags: ["Android", "Firebase Auth", "Biometrics", "Security"],
  },
]

export function Work() {
  const [openId, setOpenId] = useState<string | null>("sarkarsathi")

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section id="work" className="py-24 border-t border-border bg-background transition-colors duration-300">
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1080px] text-center">
        <p className="section-label">Selected Work</p>
        <h2 className="section-heading text-foreground">Engineered Projects</h2>

        <div className="max-w-[820px] mx-auto text-left space-y-3.5">
          {projects.map((p) => {
            const isOpen = openId === p.id
            return (
              <div
                key={p.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-card border-accent/40 shadow-lg shadow-accent/5"
                    : "bg-card/70 border-border hover:border-accent/30"
                }`}
              >
                {/* Header row */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => toggle(p.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(p.id)}
                  className="flex items-center gap-4 px-6 py-5 cursor-pointer group"
                >
                  <span className={`w-2 h-2 rounded-full transition-colors ${isOpen ? "bg-accent" : "bg-muted-foreground/40 group-hover:bg-accent"}`} />
                  <span className="font-serif text-[1.22rem] font-bold text-foreground flex-1 transition-colors group-hover:text-accent">
                    {p.title}
                  </span>
                  <span className="text-[0.78rem] font-mono font-bold text-accent px-2.5 py-0.5 rounded-full bg-accent/10 flex-shrink-0">
                    {p.year}
                  </span>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-colors flex-shrink-0"
                  >
                    <GithubIcon size={14} />
                  </a>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </div>

                {/* Accordion body */}
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    isOpen ? "max-h-60" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6 pt-1 border-t border-border/50">
                    <p className="text-[0.94rem] text-muted-foreground leading-[1.75] mb-4">
                      {p.desc}
                    </p>
                    <div className="flex gap-2 flex-wrap items-center">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center px-3 py-1 rounded-full text-[0.72rem] font-mono font-medium bg-accent/10 text-accent border border-accent/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
