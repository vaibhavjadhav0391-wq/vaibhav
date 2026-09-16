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
    desc: "Helps users easily find government schemes and services in one place with a simple, user-friendly interface — reducing the friction of navigating fragmented official portals.",
    tags: ["Android", "Kotlin", "Firebase"],
  },
  {
    id: "rescuenet",
    title: "RescueNet — Disaster Management App",
    year: "2026",
    url: "https://github.com/vaibhavjadhav",
    desc: "A disaster management system that coordinates rescue operations and shares essential information in emergency situations, keeping communities connected when it matters most.",
    tags: ["Android", "Kotlin", "Real-time DB"],
  },
  {
    id: "transitpulse",
    title: "TransitPulse — College Bus Tracker",
    year: "2026",
    url: "https://github.com/vaibhavjadhav",
    desc: "Real-time college bus tracking web app with ML-based ETA predictions — keeps working even offline using smart caching and an offline-first design approach.",
    tags: ["Next.js", "ML / ETA", "PWA"],
  },
  {
    id: "quicktransfer",
    title: "QuickTransfer — Scan. Send. Done.",
    year: "2026",
    url: "https://github.com/vaibhavjadhav",
    desc: "Instant file transfer between phone and PC via QR code scan — no login, no third-party app required. Uses the local network for fast, private transfers.",
    tags: ["React", "Node.js", "WebSockets"],
  },
  {
    id: "translator",
    title: "Advanced Translator App",
    year: "2025",
    url: "https://github.com/vaibhavjadhav",
    desc: "Multi-language Android translation app with speech-to-text and text-to-speech features — built to bridge communication gaps for everyday users across India and beyond.",
    tags: ["Android", "Kotlin", "ML Kit"],
  },
  {
    id: "securelogin",
    title: "Android Secure Login System",
    year: "2026",
    url: "https://github.com/vaibhavjadhav",
    desc: "A secure login system for Android with authentication, database integration, and intruder detection — prevents unauthorized access using photo capture on failed attempts.",
    tags: ["Android", "Firebase Auth"],
  },
]

export function Work() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section id="work" className="py-28 border-t border-border">
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1080px] text-center">
        <p className="section-label reveal">Selected Work</p>
        <h2 className="section-heading reveal delay-100">Projects</h2>

        <div className="max-w-[780px] mx-auto text-left reveal delay-200">
          {projects.map((p) => {
            const isOpen = openId === p.id
            return (
              <div key={p.id} className="border-t border-border last:border-b">
                {/* Header row */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  onClick={() => toggle(p.id)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggle(p.id)}
                  className="flex items-center gap-4 py-5 cursor-pointer group"
                >
                  <span className="font-serif text-[1.2rem] font-normal flex-1 transition-colors group-hover:text-accent">
                    {p.title}
                  </span>
                  <span className="text-[0.76rem] text-muted-foreground font-medium tracking-wide ml-2 flex-shrink-0">
                    {p.year}
                  </span>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    onClick={(e) => e.stopPropagation()}
                    className="w-[34px] h-[34px] rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-colors flex-shrink-0"
                  >
                    <GithubIcon size={13} />
                  </a>
                  <ChevronDown
                    size={18}
                    className={`text-muted-foreground flex-shrink-0 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </div>

                {/* Accordion body */}
                <div
                  className={`overflow-hidden transition-[max-height] duration-400 ease-in-out ${
                    isOpen ? "max-h-48" : "max-h-0"
                  }`}
                >
                  <div className="pb-5">
                    <p className="text-[0.9rem] text-muted-foreground leading-[1.7] mb-3">{p.desc}</p>
                    <div className="flex gap-2 flex-wrap">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center px-3 py-1 rounded-full text-[0.72rem] font-medium bg-accent/10 text-accent border border-accent/20"
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
