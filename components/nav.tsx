"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#journey", label: "Journey" },
  { href: "#contact", label: "Contact" },
]

export function Nav() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
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
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-4">
        <div
          className={`pointer-events-auto flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#f6f4f0]/85 dark:bg-[#121214]/85 backdrop-blur-md border border-[#141414]/10 dark:border-white/10 shadow-sm"
              : "bg-[#f6f4f0]/50 dark:bg-[#121214]/50 backdrop-blur-sm border border-transparent"
          }`}
        >
          {/* Logo / Name */}
          <a
            href="#hero"
            className="flex items-center gap-2 group tracking-tight"
            aria-label="Home"
          >
            <span className="font-serif font-bold text-base sm:text-lg text-[#141414] dark:text-[#f6f4f0] transition-colors">
              Vaibhav Jadhav
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e5262c] group-hover:scale-125 transition-transform" />
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-[0.14em] font-medium text-[#141414]/70 dark:text-[#f6f4f0]/70 hover:text-[#e5262c] dark:hover:text-[#e5262c] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action / Theme Toggle */}
          <div className="flex items-center gap-2.5">
            <a
              href="mailto:vaibhavjadhav0301@gmail.com"
              className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-full bg-[#e5262c] text-white hover:bg-[#c91e24] transition-colors shadow-xs"
            >
              Get in touch
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="p-2 rounded-full border border-[#141414]/10 dark:border-white/10 bg-white/50 dark:bg-white/5 text-[#141414] dark:text-[#f6f4f0] hover:border-[#e5262c] hover:text-[#e5262c] transition-all"
            >
              {mounted ? (
                isDark ? (
                  <Sun size={15} className="text-amber-400" />
                ) : (
                  <Moon size={15} className="text-[#141414]" />
                )
              ) : (
                <div className="w-[15px] h-[15px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Nav
