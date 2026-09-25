"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { StudentBadge } from "@/components/student-badge"

interface BadgeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BadgeModal({ isOpen, onClose }: BadgeModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-md transition-all animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Student ID Badge Preview"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-[500px] h-[650px] max-h-[90vh] mx-4 rounded-3xl bg-gradient-to-b from-zinc-900/95 to-zinc-950/95 border border-white/10 shadow-2xl flex flex-col items-center justify-between p-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Badge Modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-white/10 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center pt-2 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-[11px] font-semibold text-accent uppercase tracking-wider">
            <span>Interactive Student Pass</span>
          </div>
        </div>

        {/* Interactive 3D Lanyard Badge */}
        <div className="w-full flex-1 flex items-center justify-center">
          <StudentBadge height="520px" cardWidth={230} />
        </div>

        {/* Footer Hint */}
        <div className="text-center pb-2 text-[11px] text-zinc-400 font-mono tracking-wide z-10">
          Drag to swing • Tap / Click card to flip • Press ESC to exit
        </div>
      </div>
    </div>
  )
}
