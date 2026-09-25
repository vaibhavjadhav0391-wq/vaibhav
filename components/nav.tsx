"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"
import { BadgeModal } from "@/components/badge-modal"

const links = [
  { href: "#work", label: "Work" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
]

export function Nav() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [badgeOpen, setBadgeOpen] = useState(false)

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center h-14 px-[max(4vw,1.5rem)] transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        {/* Wordmark */}
        <a
          href="#hero"
          className="font-serif text-[1.05rem] font-normal text-foreground flex-shrink-0 hover:opacity-80 transition-opacity"
          aria-label="Home"
        >
          <span className="text-accent">V</span>J
        </a>

        {/* Nav links */}
        <div className="hidden sm:flex gap-8 ml-auto mr-6 items-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.82rem] font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </div>
        {/* Mobile: only Contact */}
        <div className="flex sm:hidden gap-4 ml-auto mr-3 items-center">
          <a
            href="#contact"
            className="text-[0.82rem] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Controls: Profile Avatar & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          {/* Profile Avatar button -> opens 3D Lanyard Student Badge */}
          <button
            onClick={() => setBadgeOpen(true)}
            title="View Student Pass"
            aria-label="Open interactive Student ID Badge"
            className="relative w-[34px] h-[34px] rounded-full overflow-hidden border-2 border-accent/60 hover:border-accent hover:scale-105 active:scale-95 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent flex-shrink-0 bg-zinc-800"
          >
            <Image
              src="/vaibhav.png"
              alt="Vaibhav Jadhav"
              fill
              sizes="34px"
              className="object-cover object-top"
              priority
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-background" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle light/dark mode"
            className="w-[34px] h-[34px] rounded-full border border-border bg-transparent flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-colors flex-shrink-0"
          >
            {mounted ? (
              theme === "dark" ? <Sun size={15} /> : <Moon size={15} />
            ) : (
              <Sun size={15} />
            )}
          </button>
        </div>
      </nav>

      {/* 3D Student Badge Modal */}
      <BadgeModal isOpen={badgeOpen} onClose={() => setBadgeOpen(false)} />
    </>
  )
}
