"use client"

import { StudentBadge } from "@/components/student-badge"

export function About() {
  return (
    <section id="about" className="py-24 border-t border-border overflow-hidden">
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1100px]">
        <div className="text-center mb-12">
          <p className="section-label reveal">About</p>
          <h2 className="section-heading reveal delay-100">A bit about me</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Bio & Info */}
          <div className="lg:col-span-7 text-muted-foreground text-base leading-[1.8] reveal delay-200">
            <p>
              I&apos;m a <strong className="text-foreground font-medium">B.Tech Computer Science</strong> student
              at Maharashtra Institute of Technology, CSN — 3rd year, CGPA{" "}
              <strong className="text-foreground font-medium">9.45</strong>. Before that I earned a Diploma in CS with{" "}
              <strong className="text-foreground font-medium">Distinction</strong> from the MSBTE board.
              I&apos;ve always been drawn to the intersection of clean architecture and real-world usefulness.
            </p>
            <p className="mt-5">
              Outside of coursework I&apos;ve interned at{" "}
              <strong className="text-foreground font-medium">Connect Soft Infotech</strong> and done a virtual
              stint at <strong className="text-foreground font-medium">Deloitte</strong>, built six full-stack
              projects ranging from a Kotlin Android suite to a QR-based file-transfer tool, and I&apos;m actively
              exploring <strong className="text-foreground font-medium">AI automation</strong> to make the boring
              parts of software disappear.
            </p>

            {/* Stats */}
            <div className="flex justify-start gap-12 sm:gap-16 mt-12 flex-wrap">
              {[
                { num: "9.45", label: "B.Tech CGPA" },
                { num: "6+", label: "Projects Shipped" },
                { num: "Dist.", label: "Diploma Result" },
              ].map((s, i) => (
                <div key={s.label} className={`reveal delay-${(i + 1) * 100}`}>
                  <div className="font-serif text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-none mb-1.5 text-foreground">
                    {s.num}
                  </div>
                  <div className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive 3D Lanyard Student Badge */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center reveal delay-300">
            <div className="w-full max-w-[340px] rounded-2xl bg-[#0A0A0C]/50 border border-border/40 p-2 shadow-xl backdrop-blur-sm">
              <StudentBadge height="480px" cardWidth={220} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
