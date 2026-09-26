"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, FileDown } from "lucide-react"
import { useEffect, useState } from "react"

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#activity", label: "Activity" },
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
            isDark
              ? "bg-[#18181c]/95 border border-white/15 text-white shadow-xl shadow-black/40 backdrop-blur-md"
              : "bg-white/90 border border-neutral-300/80 text-[#141414] shadow-lg shadow-black/5 backdrop-blur-md"
          }`}
        >
          {/* Logo / Name */}
          <a
            href="#hero"
            className="flex items-center gap-2 group tracking-tight"
            aria-label="Home"
          >
            <span
              className={`font-serif font-bold text-base sm:text-lg transition-colors ${
                isDark ? "text-white" : "text-[#141414]"
              }`}
            >
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
                className={`text-xs uppercase tracking-[0.14em] font-semibold transition-colors ${
                  isDark
                    ? "text-neutral-300 hover:text-[#e5262c]"
                    : "text-neutral-700 hover:text-[#e5262c]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action / Resume / Theme Toggle */}
          <div className="flex items-center gap-2.5">
            <a
              href="/Vaibhav_Jadhav_Resume.docx"
              download="Vaibhav_Jadhav_Resume.docx"
              className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full border transition-all shadow-2xs group ${
                isDark
                  ? "bg-white/10 border-white/20 text-white hover:border-[#e5262c] hover:bg-[#e5262c]/10 hover:text-[#e5262c]"
                  : "bg-neutral-100 border-neutral-300 text-[#141414] hover:border-[#e5262c] hover:bg-[#e5262c]/10 hover:text-[#e5262c]"
              }`}
            >
              <FileDown size={14} className="text-[#e5262c] group-hover:-translate-y-0.5 transition-transform" />
              <span>Resume</span>
            </a>

            <a
              href="mailto:vaibhavjadhav0391@gmail.com"
              className="hidden sm:inline-flex text-xs font-semibold px-3.5 py-1.5 rounded-full bg-[#e5262c] text-white hover:bg-[#c91e24] transition-colors shadow-xs"
            >
              Get in touch
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isDark
                  ? "border-white/20 bg-white/10 text-white hover:border-[#e5262c] hover:text-[#e5262c]"
                  : "border-neutral-300 bg-neutral-100 text-[#141414] hover:border-[#e5262c] hover:text-[#e5262c]"
              }`}
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
