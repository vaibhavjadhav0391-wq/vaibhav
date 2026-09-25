"use client"

import { StudentBadge } from "@/components/student-badge"

export function About() {
  return (
    <section id="about" className="py-24 border-t border-[#141414]/10 dark:border-white/10 bg-background transition-colors duration-300">
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1200px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="section-label">Identity &amp; Credentials</p>
          <h2 className="section-heading">About Me &amp; Official Pass</h2>
        </div>

        {/* 2-Column Layout: Left = Bio & Stats, Right = 3D Lanyard ID Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio, Academic Distinction & Highlights */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e5262c]/10 border border-[#e5262c]/20 text-[0.8rem] font-mono font-bold text-[#e5262c] w-fit">
              <span className="w-2 h-2 rounded-full bg-[#e5262c] animate-pulse" />
              B.Tech Computer Science &amp; AI · MIT CSN 2026
            </div>

            <p className="text-[1.08rem] text-foreground/85 leading-[1.8]">
              I&apos;m <strong className="text-foreground font-bold">Vaibhav Jadhav</strong>, a 3rd-year Computer Science &amp; AI Engineer at Maharashtra Institute of Technology, CSN with a department top-rank standing of <strong className="text-[#e5262c] font-bold">9.45 CGPA</strong>. Prior to my degree, I completed my Diploma in Computer Science with <strong className="text-foreground font-semibold">Distinction</strong> under the MSBTE board.
            </p>

            <p className="text-[0.98rem] text-muted-foreground leading-[1.8]">
              I focus on crafting purposeful Android applications, exploring modern AI automation, and shipping production-ready software. Having completed an engineering internship at <strong className="text-foreground font-medium">Connect Soft Infotech</strong> and software simulations at <strong className="text-foreground font-medium">Deloitte</strong>, I have designed and delivered 6+ end-to-end projects.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              {[
                { num: "9.45", label: "B.Tech CGPA", highlight: true },
                { num: "6+", label: "Projects Shipped", highlight: false },
                { num: "Dist.", label: "Diploma Result", highlight: false },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-xl bg-card border border-border shadow-sm text-center transition-colors">
                  <div className={`font-serif text-[clamp(1.9rem,3vw,2.5rem)] font-bold leading-none mb-1 ${s.highlight ? "text-[#e5262c]" : "text-foreground"}`}>
                    {s.num}
                  </div>
                  <div className="text-[0.7rem] font-mono font-bold tracking-wider uppercase text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hanging 3D Lanyard Student ID Pass */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full">
            <div className="text-center mb-2">
              <span className="text-[0.76rem] font-mono font-bold text-[#e5262c] tracking-wider uppercase flex items-center justify-center gap-1">
                <span>⚡</span> 3D Interactive Student Pass
              </span>
              <p className="text-[0.74rem] text-muted-foreground font-mono">
                Drag to swing · Click portrait to flip
              </p>
            </div>

            <div className="w-full max-w-[360px] h-[580px] flex items-center justify-center">
              <StudentBadge height="580px" cardWidth={230} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
