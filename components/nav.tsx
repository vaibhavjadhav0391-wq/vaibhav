"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

const links = [
  { href: "#about", label: "About & ID" },
  { href: "#work", label: "Work" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
]

export function Nav() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const currentTheme = mounted ? (resolvedTheme ?? theme) : "light"
  const isDark = currentTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f6f4f0]/95 dark:bg-[#121214]/95 backdrop-blur-md border-b border-[#141414]/10 dark:border-white/10 shadow-sm"
          : "bg-[#f6f4f0]/80 dark:bg-[#121214]/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1200px] h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="font-serif text-[1.15rem] font-bold text-[#141414] dark:text-white flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          aria-label="Home"
        >
          <span>Vaibhav Jadhav</span>
          <span className="w-2 h-2 rounded-full bg-[#e5262c]" />
        </a>

        {/* Center / Right Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.86rem] font-medium text-[#141414]/80 dark:text-neutral-300 hover:text-[#e5262c] dark:hover:text-[#e5262c] transition-colors tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: Mobile quick links + Theme Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex md:hidden gap-3 items-center mr-1">
            <a
              href="#about"
              className="text-[0.82rem] font-semibold text-[#141414] dark:text-neutral-200 hover:text-[#e5262c]"
            >
              ID Pass
            </a>
            <a
              href="#contact"
              className="text-[0.82rem] font-semibold text-[#e5262c]"
            >
              Contact
            </a>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#141414]/15 dark:border-white/20 bg-white/60 dark:bg-[#1c1c20] text-[#141414] dark:text-neutral-200 hover:border-[#e5262c] hover:text-[#e5262c] transition-all shadow-sm"
          >
            {mounted ? (
              isDark ? (
                <>
                  <Sun size={15} className="text-amber-400" />
                  <span className="text-xs font-mono font-medium hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon size={15} className="text-[#141414]" />
                  <span className="text-xs font-mono font-medium hidden sm:inline">Dark</span>
                </>
              )
            ) : (
              <Moon size={15} />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
