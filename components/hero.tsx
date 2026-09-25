"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing"

export function Hero() {
  const { resolvedTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? (resolvedTheme ?? theme) === "dark" : false

  return (
    <section id="hero" className="relative w-full overflow-hidden" aria-label="Hero">
      <WavingPortfolioLanding
        name="Vaibhav Jadhav"
        year="2026"
        roles={["Mobile Developer", "AI Engineer"]}
        lettersLeft={["P", "F"]}
        giantLetter="O"
        lettersRight={["RT", "LIO"]}
        title="Vaibhav Jadhav Portfolio"
        signature="VAIBHAV/JADHAV"
        greeting="Hi there!"
        accent="#e5262c"
        paper={isDark ? "#121214" : "#f6f4f0"}
        ink={isDark ? "#f4f4f5" : "#141414"}
        intro={true}
        height="100vh"
      />
    </section>
  )
}
