"use client"

import Image from "next/image"
import { Sparkles, QrCode, Mail, GraduationCap, Award } from "lucide-react"
import LanyardBadge from "@/components/ui/lanyard-badge"

function GitHubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

interface StudentBadgeProps {
  height?: string
  cardWidth?: number
}

export function StudentBadge({ height = "520px", cardWidth = 230 }: StudentBadgeProps) {
  return (
    <div className="relative w-full flex items-center justify-center select-none">
      <LanyardBadge
        height={height}
        cardWidth={cardWidth}
        strapText="VAIBHAV JADHAV · B.TECH CS"
        strapLabel="MIT CSN 2026"
        strapColor="#0F1015"
        inkColor="#8FA6FF"
        cardColor="#14151B"
        flipButton={true}
        front={
          <div className="relative h-full w-full p-4 flex flex-col justify-between text-white bg-gradient-to-b from-[#181920] to-[#0F1015] border border-white/10 rounded-[14px] shadow-2xl overflow-hidden font-sans">
            {/* Hologram / Accent gradient top right */}
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#8FA6FF]/15 rounded-full blur-2xl pointer-events-none" />
            
            {/* Header / Institution info */}
            <div className="flex items-center justify-between z-10 pt-2">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#8FA6FF]" />
                <span className="text-[9px] font-bold tracking-wider uppercase text-zinc-300">
                  MIT CSN
                </span>
              </div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#8FA6FF]/10 border border-[#8FA6FF]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8FA6FF] animate-pulse" />
                <span className="text-[8px] font-semibold text-[#8FA6FF] uppercase tracking-wide">STUDENT PASS</span>
              </div>
            </div>

            {/* Profile Image & Name */}
            <div className="flex flex-col items-center text-center my-auto z-10">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#8FA6FF]/40 mb-2.5 bg-zinc-800/80 shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
                <Image
                  src="/vaibhav.png"
                  alt="Vaibhav Jadhav"
                  fill
                  sizes="100px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <h3 className="text-base font-bold tracking-tight text-zinc-100">
                Vaibhav Jadhav
              </h3>
              <p className="text-[11px] font-medium text-[#8FA6FF] mt-0.5">
                B.Tech Computer Science
              </p>
              <div className="mt-1.5 inline-flex items-center gap-1 text-[9.5px] px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
                <Award className="w-3 h-3 text-amber-400" />
                <span>CGPA: <strong>9.45</strong> / Distinction</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="flex justify-between items-center text-[9px] text-zinc-400 pt-2 border-t border-white/10 z-10">
              <span className="font-mono">ID: MIT-2026-VJ</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> VERIFIED
              </span>
            </div>
          </div>
        }
        back={
          <div className="relative h-full w-full p-4 flex flex-col justify-between text-white bg-gradient-to-b from-[#0F1015] to-[#0A0A0C] border border-white/10 rounded-[14px] shadow-2xl font-sans">
            <div className="text-center pt-2">
              <h4 className="text-[12px] font-bold text-zinc-200 tracking-wide uppercase">Connect & Explore</h4>
              <p className="text-[9px] text-zinc-400 mt-0.5">Scan or visit portfolio</p>
            </div>

            <div className="flex justify-center my-auto">
              <div className="p-2.5 bg-white rounded-xl shadow-lg flex flex-col items-center">
                <QrCode className="w-20 h-20 text-black" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 pt-1 border-t border-white/10">
              <div className="flex justify-center gap-4 text-zinc-400">
                <a
                  href="https://github.com/vaibhavjadhav0391-wq"
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded hover:text-[#8FA6FF] transition-colors"
                >
                  <GitHubIcon className="w-4 h-4" />
                </a>
                <a
                  href="mailto:vaibhavjadhav0301@gmail.com"
                  className="p-1 rounded hover:text-[#8FA6FF] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
              <span className="text-[8px] text-zinc-500 font-mono tracking-wider">TAP CARD TO FLIP</span>
            </div>
          </div>
        }
      />
    </div>
  )
}
