"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import LanyardBadge from "@/components/ui/lanyard-badge"

interface StudentBadgeProps {
  height?: string
  cardWidth?: number
}

export function StudentBadge({ height = "580px", cardWidth = 230 }: StudentBadgeProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted ? resolvedTheme === "dark" : false

  // Poster Red & Paper White palette
  const cardBg = isDark
    ? "linear-gradient(145deg, #1c1c20 0%, #141416 60%, #18181c 100%)"
    : "linear-gradient(145deg, #ffffff 0%, #faf8f5 60%, #f4f0e8 100%)"

  const backBg = isDark
    ? "linear-gradient(145deg, #18181c 0%, #121214 60%, #1a1a1e 100%)"
    : "linear-gradient(145deg, #ffffff 0%, #fbfaf8 60%, #eeebe4 100%)"

  const textColor = isDark ? "#f4f4f5" : "#141414"
  const mutedColor = isDark ? "#a1a1aa" : "#666666"
  const redAccent = "#e5262c"
  const borderColor = isDark ? "rgba(229, 38, 44, 0.4)" : "rgba(229, 38, 44, 0.35)"
  const innerBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(20, 20, 20, 0.1)"
  const chipBg = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(229, 38, 44, 0.06)"
  const chipBorder = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(229, 38, 44, 0.18)"

  const frontCard = (
    <div
      className="relative h-full w-full flex flex-col justify-between p-5 text-left select-none overflow-hidden"
      style={{
        background: cardBg,
        color: textColor,
        border: `1.5px solid ${borderColor}`,
        boxShadow: "0 10px 30px -10px rgba(229, 38, 44, 0.15)",
      }}
    >
      {/* Decorative Red Corner Rule */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-12 h-1 bg-[#e5262c]" />
        <div className="absolute top-0 right-0 w-1 h-12 bg-[#e5262c]" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 pt-3 flex items-center justify-between pb-2.5" style={{ borderBottom: `1px solid ${innerBorder}` }}>
        <div>
          <span className="text-[9.5px] font-mono tracking-widest font-bold uppercase block text-[#e5262c]">
            MIT CSN · ID PASS
          </span>
          <span className="text-[7.5px] tracking-wider font-mono font-medium" style={{ color: mutedColor }}>
            B.TECH CS &amp; AI · 2026
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
          style={{ background: "rgba(229, 38, 44, 0.1)", border: `1px solid ${borderColor}` }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5262c] animate-pulse" />
          <span className="text-[7.5px] font-mono font-bold text-[#e5262c]">ACTIVE</span>
        </div>
      </div>

      {/* Profile Photo & Primary Info */}
      <div className="relative z-10 flex flex-col items-center my-auto py-1 text-center">
        {/* Profile Image with Red Ring & Glow */}
        <div className="relative mb-3 group cursor-pointer">
          <div
            className="absolute -inset-1 rounded-full opacity-70 blur-[3px]"
            style={{ background: `linear-gradient(to right, ${redAccent}, #ff7b80, ${redAccent})` }}
          />
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden shadow-xl"
            style={{ border: `2.5px solid ${redAccent}`, backgroundColor: isDark ? "#18181b" : "#ffffff" }}
          >
            <Image
              src="/vaibhav.png"
              alt="Vaibhav Jadhav"
              width={120}
              height={120}
              priority
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* Smart Chip Icon */}
          <div
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow"
            style={{ backgroundColor: "#ffffff", border: `1.5px solid ${redAccent}`, color: redAccent }}
          >
            ⚡
          </div>
        </div>

        <h3 className="font-serif text-[18px] font-bold tracking-tight leading-tight" style={{ color: textColor }}>
          Vaibhav Jadhav
        </h3>
        <p className="text-[10px] font-bold tracking-wider uppercase mt-0.5 text-[#e5262c]">
          Mobile &amp; AI Developer
        </p>

        <div
          className="mt-2.5 inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[8.5px] font-mono"
          style={{ background: chipBg, border: `1px solid ${chipBorder}`, color: textColor }}
        >
          <span>CGPA <strong className="text-[#e5262c] font-bold">9.45</strong></span>
          <span className="opacity-40">|</span>
          <span className="font-semibold text-[#141414] dark:text-neutral-200">Distinction</span>
        </div>
      </div>

      {/* Bottom Barcode / Flip Cue */}
      <div className="relative z-10 pt-2 flex items-center justify-between" style={{ borderTop: `1px solid ${innerBorder}` }}>
        {/* Decorative Barcode */}
        <div className="flex items-center gap-[2px] opacity-80">
          {[2, 1, 3, 1, 2, 4, 1, 2, 3, 1].map((w, idx) => (
            <span
              key={idx}
              className="h-5 inline-block"
              style={{ width: `${w}px`, backgroundColor: idx % 3 === 0 ? redAccent : textColor }}
            />
          ))}
        </div>
        <span className="text-[8px] font-mono font-semibold tracking-wider flex items-center gap-1 text-[#e5262c] hover:opacity-80">
          Click to flip ↻
        </span>
      </div>
    </div>
  )

  const backCard = (
    <div
      className="relative h-full w-full flex flex-col justify-between p-5 text-left select-none overflow-hidden"
      style={{
        background: backBg,
        color: textColor,
        border: `1.5px solid ${borderColor}`,
        boxShadow: "0 10px 30px -10px rgba(229, 38, 44, 0.15)",
      }}
    >
      {/* Top Header */}
      <div className="relative z-10 pt-3 flex items-center justify-between pb-2.5" style={{ borderBottom: `1px solid ${innerBorder}` }}>
        <div>
          <span className="text-[9.5px] font-mono tracking-widest font-bold uppercase block text-[#e5262c]">
            DEVELOPER CREDENTIALS
          </span>
          <span className="text-[7.5px] tracking-wider font-mono font-medium" style={{ color: mutedColor }}>
            CONNECT &amp; VERIFICATION
          </span>
        </div>
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-[#e5262c]"
        >
          ✓
        </div>
      </div>

      {/* Core Specs / Highlights */}
      <div className="relative z-10 flex flex-col gap-2.5 my-auto py-1">
        <div>
          <span className="text-[8px] font-mono font-bold uppercase tracking-wider block mb-1 text-[#e5262c]">
            CORE DOMAINS
          </span>
          <div className="flex flex-wrap gap-1">
            {["Android Kotlin", "Jetpack Compose", "Next.js", "AI Automation", "Firebase"].map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded text-[7.5px] font-mono font-medium"
                style={{ background: chipBg, border: `1px solid ${chipBorder}`, color: textColor }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1 text-[8.5px] font-mono" style={{ color: textColor }}>
          <div className="flex items-center justify-between py-0.5" style={{ borderBottom: `1px solid ${innerBorder}` }}>
            <span style={{ color: mutedColor }}>Internship</span>
            <span className="font-semibold">Connect Soft Infotech</span>
          </div>
          <div className="flex items-center justify-between py-0.5" style={{ borderBottom: `1px solid ${innerBorder}` }}>
            <span style={{ color: mutedColor }}>Virtual Exp</span>
            <span className="font-semibold">Deloitte Program</span>
          </div>
          <div className="flex items-center justify-between py-0.5" style={{ borderBottom: `1px solid ${innerBorder}` }}>
            <span style={{ color: mutedColor }}>Location</span>
            <span className="font-medium">Sambhajinagar, MH</span>
          </div>
          <div className="flex items-center justify-between py-0.5">
            <span style={{ color: mutedColor }}>Contact</span>
            <span className="truncate max-w-[130px] font-medium text-[#e5262c]">vaibhavjadhav0301@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Security Seal & Return Flip Button */}
      <div className="relative z-10 pt-2 flex items-center justify-between" style={{ borderTop: `1px solid ${innerBorder}` }}>
        <span className="text-[8px] font-mono font-bold text-[#e5262c] flex items-center gap-1">
          ● VERIFIED PASS
        </span>
        <span className="text-[8px] font-mono font-bold text-[#141414] dark:text-neutral-200 hover:underline cursor-pointer flex items-center gap-1">
          Back to Front ↺
        </span>
      </div>
    </div>
  )

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <LanyardBadge
        height={height}
        cardWidth={cardWidth}
        front={frontCard}
        back={backCard}
        title="Vaibhav Jadhav"
        subtitle="CS Engineer · MIT CSN · 2026"
        name="Vaibhav Jadhav"
        role="Mobile & AI Developer"
        strapText="vaibhav jadhav · portfolio"
        strapLabel="MIT CSN 2026"
        strapColor="#141414"
        inkColor="#e5262c"
        cardColor="#ffffff"
        flipButton={true}
      />
    </div>
  )
}
