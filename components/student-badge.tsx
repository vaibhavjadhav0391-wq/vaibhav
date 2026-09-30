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
    ? "linear-gradient(145deg, #1a1a1e 0%, #121215 55%, #0a0a0c 100%)"
    : "linear-gradient(145deg, #ffffff 0%, #faf8f5 55%, #f2ede4 100%)"

  const backBg = isDark
    ? "linear-gradient(145deg, #161618 0%, #101012 60%, #08080a 100%)"
    : "linear-gradient(145deg, #ffffff 0%, #f8f6f2 60%, #ece7dd 100%)"

  const textColor = isDark ? "#ffffff" : "#141414"
  const mutedColor = isDark ? "#a1a1aa" : "#52525b"
  const borderColor = isDark ? "rgba(255, 255, 255, 0.14)" : "rgba(20, 20, 20, 0.12)"
  const innerBorder = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(20, 20, 20, 0.08)"
  const redAccent = "#e5262c"
  const chipBg = isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(20, 20, 20, 0.04)"
  const chipBorder = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(20, 20, 20, 0.09)"

  const frontCard = (
    <div
      className="relative h-full w-full flex flex-col justify-between p-4 text-center select-none overflow-hidden"
      style={{
        background: frontBg,
        color: textColor,
        border: `1.5px solid ${borderColor}`,
        boxShadow: isDark
          ? "0 18px 45px -10px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.1)"
          : "0 18px 45px -10px rgba(229, 38, 44, 0.12), 0 0 1px 1px rgba(20, 20, 20, 0.06)",
      }}
    >
      {/* Background Tech Watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] overflow-hidden">
        <span className="font-serif text-[120px] font-black tracking-tighter select-none rotate-12">
          MIT
        </span>
      </div>

      {/* Top Header */}
      <div className="relative z-10 pt-1 flex items-center justify-between pb-2" style={{ borderBottom: `1px solid ${innerBorder}` }}>
        <div className="text-left">
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-mono tracking-widest font-bold uppercase text-[#e5262c]">
              MIT CSN
            </span>
            <span className="text-[7.5px] font-mono text-neutral-400 font-semibold">• ID PASS</span>
          </div>
          <span className="text-[7.5px] tracking-wider font-mono font-medium block mt-0.5" style={{ color: mutedColor }}>
            B.TECH CS &amp; AI • 2026
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
          style={{ background: "rgba(229, 38, 44, 0.1)", border: `1px solid ${borderColor}` }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5262c] animate-pulse" />
          <span className="text-[7.5px] font-mono font-bold text-[#e5262c] tracking-wider">ACTIVE</span>
        </div>
      </div>

      {/* Profile Photo & Primary Info */}
      <div className="relative z-10 flex flex-col items-center my-auto py-1 text-center">
        {/* Crystal Clear High-Definition Photo Container */}
        <div className="relative my-2 group cursor-pointer">
          <div
            className="relative w-24 h-24 rounded-full overflow-hidden shadow-2xl ring-2 ring-[#e5262c] ring-offset-2 transition-transform duration-300 hover:scale-105"
            style={{
              backgroundColor: isDark ? "#18181b" : "#ffffff",
              boxShadow: isDark
                ? "0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 12px rgba(229, 38, 44, 0.25)"
                : "0 10px 25px -5px rgba(229, 38, 44, 0.2)",
            }}
          >
            <Image
              src="/vaibhav.png"
              alt="Profile Photo"
              width={180}
              height={180}
              unoptimized
              priority
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Professional Title & Role (Clean Pro Pass Style) */}
        <div className="mt-1 flex flex-col items-center">
          <div
            className="text-[12.5px] font-mono font-extrabold tracking-wider uppercase leading-tight"
            style={{ color: textColor }}
          >
            SOFTWARE ENGINEER
          </div>
          <div className="text-[9px] font-mono font-bold tracking-widest text-[#e5262c] uppercase mt-0.5">
            MOBILE &amp; AI SYSTEMS
          </div>

          <div
            className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[8px] font-mono shadow-xs"
            style={{ background: chipBg, border: `1px solid ${chipBorder}`, color: textColor }}
          >
            <span>CGPA <strong className="text-[#e5262c] font-bold">9.45</strong></span>
            <span className="opacity-30">|</span>
            <span className="font-semibold tracking-wider">DISTINCTION</span>
          </div>
        </div>
      </div>

      {/* Bottom Barcode / RFID Access Strip */}
      <div className="relative z-10 pt-2 flex items-center justify-between" style={{ borderTop: `1px solid ${innerBorder}` }}>
        <div className="flex items-center gap-[1.5px] opacity-75">
          {[2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 1].map((w, idx) => (
            <span
              key={idx}
              className="h-3.5 inline-block rounded-xs"
              style={{ width: `${w}px`, backgroundColor: idx % 4 === 0 ? redAccent : textColor }}
            />
          ))}
        </div>
        <div className="flex items-center gap-1 text-[7.5px] font-mono font-bold text-[#e5262c] tracking-wider">
          <span>RFID PASS</span>
          <span className="opacity-50 font-normal">• FLIP ↻</span>
        </div>
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
        boxShadow: isDark
          ? "0 18px 45px -10px rgba(0, 0, 0, 0.6)"
          : "0 18px 45px -10px rgba(229, 38, 44, 0.12)",
      }}
    >
      {/* Top Header */}
      <div className="relative z-10 pt-1 flex items-center justify-between pb-2" style={{ borderBottom: `1px solid ${innerBorder}` }}>
        <div>
          <span className="text-[9px] font-mono tracking-widest font-bold uppercase block text-[#e5262c]">
            ENGINEERING CREDENTIALS
          </span>
          <span className="text-[7.5px] tracking-wider font-mono font-medium" style={{ color: mutedColor }}>
            VERIFICATION &amp; ACCESS
          </span>
        </div>
        <div
          className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white bg-[#e5262c] shadow-xs"
        >
          ✓
        </div>
      </div>

      {/* Core Specs */}
      <div className="relative z-10 flex flex-col gap-2 my-auto py-1">
        <div>
          <span className="text-[7.5px] font-mono font-bold uppercase tracking-wider block mb-1 text-[#e5262c]">
            SPECIALIZATIONS
          </span>
          <div className="flex flex-wrap gap-1">
            {["Android Kotlin", "Jetpack Compose", "Next.js", "AI / ML", "Firebase"].map((tech) => (
              <span
                key={tech}
                className="px-1.5 py-0.5 rounded text-[7px] font-mono font-medium shadow-2xs"
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
            <span className="truncate max-w-[120px] font-medium text-[#e5262c]">vaibhavjadhav0391@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Security Seal & Return Flip Button */}
      <div className="relative z-10 pt-2 flex items-center justify-between" style={{ borderTop: `1px solid ${innerBorder}` }}>
        <span className="text-[7.5px] font-mono font-bold text-[#e5262c] flex items-center gap-1">
          ✓ VERIFIED PASS
        </span>
        <span className="text-[7.5px] font-mono font-bold text-[#141414] dark:text-neutral-200 hover:underline cursor-pointer flex items-center gap-1">
          Flip Back ↻
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
        subtitle="Software Engineer • MIT CSN • 2026"
        name="Software Engineer"
        role="Mobile & AI Systems"
        strapText="vaibhav jadhav • portfolio"
        strapLabel="MIT CSN 2026"
        strapColor="#141414"
        inkColor="#e5262c"
        cardColor="#ffffff"
        flipButton={true}
      />
    </div>
  )
}

export default StudentBadge
