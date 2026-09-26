"use client"

import Image from "next/image"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import LanyardBadge from "@/components/ui/lanyard-badge"

export function StudentBadge({
  height = "560px",
  cardWidth = 210,
}: {
  height?: string
  cardWidth?: number
}) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const currentTheme = mounted ? (resolvedTheme ?? theme) : "light"
  const isDark = currentTheme === "dark"

  const frontBg = isDark
    ? "linear-gradient(145deg, #18181b 0%, #121214 55%, #09090b 100%)"
    : "linear-gradient(145deg, #ffffff 0%, #faf8f5 55%, #f4efe6 100%)"

  const backBg = isDark
    ? "linear-gradient(145deg, #141416 0%, #0f0f11 60%, #08080a 100%)"
    : "linear-gradient(145deg, #ffffff 0%, #f7f5f0 60%, #eeeae2 100%)"

  const textColor = isDark ? "#ffffff" : "#141414"
  const mutedColor = isDark ? "#a1a1aa" : "#52525b"
  const borderColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(20, 20, 20, 0.14)"
  const innerBorder = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(20, 20, 20, 0.08)"
  const redAccent = "#e5262c"
  const chipBg = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(20, 20, 20, 0.04)"
  const chipBorder = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(20, 20, 20, 0.08)"

  const frontCard = (
    <div
      className="relative h-full w-full flex flex-col justify-between p-4 text-center select-none overflow-hidden"
      style={{
        background: frontBg,
        color: textColor,
        border: `1.5px solid ${borderColor}`,
        boxShadow: "0 12px 35px -8px rgba(229, 38, 44, 0.18)",
      }}
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.035] overflow-hidden">
        <span className="font-serif text-[130px] font-black tracking-tighter select-none rotate-12">
          MIT
        </span>
      </div>

      {/* Top Header */}
      <div className="relative z-10 pt-1.5 flex items-center justify-between pb-2" style={{ borderBottom: `1px solid ${innerBorder}` }}>
        <div className="text-left">
          <span className="text-[9px] font-mono tracking-widest font-bold uppercase block text-[#e5262c]">
            MIT CSN · ID PASS
          </span>
          <span className="text-[7.5px] tracking-wider font-mono font-medium" style={{ color: mutedColor }}>
            B.TECH CS &amp; AI · 2026
          </span>
        </div>
        <div
          className="flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{ background: "rgba(229, 38, 44, 0.1)", border: `1px solid ${borderColor}` }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5262c] animate-pulse" />
          <span className="text-[7.5px] font-mono font-bold text-[#e5262c]">ACTIVE</span>
        </div>
      </div>

      {/* Profile Photo & Primary Info */}
      <div className="relative z-10 flex flex-col items-center my-auto py-1 text-center">
        {/* Profile Image with Red Ring */}
        <div className="relative mb-2 group cursor-pointer">
          <div
            className="absolute -inset-1 rounded-full opacity-70 blur-[2px]"
            style={{ background: `linear-gradient(to right, ${redAccent}, #ff7b80, ${redAccent})` }}
          />
          <div
            className="relative w-20 h-20 rounded-full overflow-hidden shadow-xl"
            style={{ border: `2.5px solid ${redAccent}`, backgroundColor: isDark ? "#18181b" : "#ffffff" }}
          >
            <Image
              src="/vaibhav.png"
              alt="Vaibhav Jadhav"
              width={100}
              height={100}
              priority
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div
            className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center text-[9px] shadow font-bold"
            style={{ backgroundColor: "#ffffff", border: `1.5px solid ${redAccent}`, color: redAccent }}
          >
            ★
          </div>
        </div>

        <h3 className="font-serif text-[17px] font-bold tracking-tight leading-tight" style={{ color: textColor }}>
          Vaibhav Jadhav
        </h3>
        <p className="text-[9.5px] font-bold tracking-wider uppercase mt-0.5 text-[#e5262c]">
          Mobile &amp; AI Developer
        </p>

        <div
          className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[8px] font-mono"
          style={{ background: chipBg, border: `1px solid ${chipBorder}`, color: textColor }}
        >
          <span>CGPA <strong className="text-[#e5262c] font-bold">9.45</strong></span>
          <span className="opacity-40">|</span>
          <span className="font-semibold">Distinction</span>
        </div>
      </div>

      {/* Bottom Barcode / Flip Cue */}
      <div className="relative z-10 pt-1.5 flex items-center justify-between" style={{ borderTop: `1px solid ${innerBorder}` }}>
        {/* Decorative Barcode */}
        <div className="flex items-center gap-[1.5px] opacity-80">
          {[2, 1, 3, 1, 2, 4, 1, 2, 3, 1].map((w, idx) => (
            <span
              key={idx}
              className="h-4 inline-block"
              style={{ width: `${w}px`, backgroundColor: idx % 3 === 0 ? redAccent : textColor }}
            />
          ))}
        </div>
        <span className="text-[7.5px] font-mono font-semibold tracking-wider flex items-center gap-1 text-[#e5262c]">
          Click to flip ↻
        </span>
      </div>
    </div>
  )

  const backCard = (
    <div
      className="relative h-full w-full flex flex-col justify-between p-4 text-left select-none overflow-hidden"
      style={{
        background: backBg,
        color: textColor,
        border: `1.5px solid ${borderColor}`,
        boxShadow: "0 12px 35px -8px rgba(229, 38, 44, 0.18)",
      }}
    >
      {/* Top Header */}
      <div className="relative z-10 pt-1.5 flex items-center justify-between pb-2" style={{ borderBottom: `1px solid ${innerBorder}` }}>
        <div>
          <span className="text-[9px] font-mono tracking-widest font-bold uppercase block text-[#e5262c]">
            DEVELOPER CREDENTIALS
          </span>
          <span className="text-[7.5px] tracking-wider font-mono font-medium" style={{ color: mutedColor }}>
            CONNECT &amp; VERIFICATION
          </span>
        </div>
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white bg-[#e5262c]"
        >
          ✓
        </div>
      </div>

      {/* Core Specs */}
      <div className="relative z-10 flex flex-col gap-2 my-auto py-1">
        <div>
          <span className="text-[7.5px] font-mono font-bold uppercase tracking-wider block mb-1 text-[#e5262c]">
            CORE DOMAINS
          </span>
          <div className="flex flex-wrap gap-1">
            {["Android Kotlin", "Jetpack Compose", "Next.js", "AI", "Firebase"].map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded text-[7px] font-mono font-medium"
                style={{ background: chipBg, border: `1px solid ${chipBorder}`, color: textColor }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1 text-[8px] font-mono" style={{ color: textColor }}>
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
            <span className="truncate max-w-[120px] font-medium text-[#e5262c]">vaibhavjadhav0301@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Security Seal & Return Flip Button */}
      <div className="relative z-10 pt-1.5 flex items-center justify-between" style={{ borderTop: `1px solid ${innerBorder}` }}>
        <span className="text-[7.5px] font-mono font-bold text-[#e5262c] flex items-center gap-1">
          ✓ VERIFIED PASS
        </span>
        <span className="text-[7.5px] font-mono font-bold text-[#141414] dark:text-neutral-200 hover:underline cursor-pointer flex items-center gap-1">
          Back to Front ↻
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
