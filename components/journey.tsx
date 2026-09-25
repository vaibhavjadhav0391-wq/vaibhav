const entries = [
  {
    date: "2024 — Ongoing",
    title: "Software Engineering Intern",
    org: "Connect Soft Infotech, Pune",
    badge: "Industry Experience",
    bullets: [
      "Collaborated with senior engineers adhering to production software engineering standards and agile workflows.",
      "Engineered real-world application modules, optimizing state flows and backend response times.",
      "Demonstrated high problem-solving velocity and discipline within a cross-functional team.",
    ],
  },
  {
    date: "2024",
    title: "Virtual Engineering Program",
    org: "Deloitte Virtual Experience",
    badge: "Enterprise Training",
    bullets: [
      "Completed modules in system architecture, software development, and data reconciliation.",
      "Authored professional architectural proposals and tackled complex algorithmic logic problems.",
    ],
  },
  {
    date: "2023 — 2026 (3rd Year)",
    title: "B.Tech in Computer Science & AI",
    org: "Maharashtra Institute of Technology, CSN · CGPA 9.45",
    badge: "Department Top Ranker",
    bullets: [
      "Top-performing student in the department with an outstanding 9.45 CGPA.",
      "Spearheaded technical development for key departmental software initiatives.",
    ],
  },
  {
    date: "Completed",
    title: "Diploma in Computer Science",
    org: "MSBTE Board · Result: Distinction",
    badge: "Board Distinction",
    bullets: [
      "Awarded Distinction for exceptional academic excellence across all semesters.",
    ],
  },
]

export function Journey() {
  return (
    <section id="journey" className="py-24 border-t border-border bg-background transition-colors duration-300">
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1080px] text-center">
        <p className="section-label">Experience &amp; Education</p>
        <h2 className="section-heading text-foreground">Career Journey</h2>

        <div className="max-w-[700px] mx-auto text-left relative pl-8">
          {/* Vertical line with accent */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-gradient-to-b from-accent via-border to-accent" />

          {entries.map((e) => (
            <div
              key={e.title}
              className="relative pb-10 last:pb-0"
            >
              {/* Dot */}
              <div className="absolute -left-8 top-[0.35rem] w-3 h-3 rounded-full bg-accent ring-4 ring-background -ml-[5px]" />

              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[0.74rem] font-mono font-bold uppercase text-accent">
                  {e.date}
                </span>
                <span className="text-[0.68rem] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                  {e.badge}
                </span>
              </div>

              <h3 className="font-serif text-[1.25rem] font-bold text-foreground mb-0.5">
                {e.title}
              </h3>
              <p className="text-[0.88rem] font-medium text-muted-foreground mb-3">
                {e.org}
              </p>

              <div className="space-y-1.5 p-4 rounded-xl bg-card border border-border shadow-sm">
                {e.bullets.map((b) => (
                  <div key={b} className="text-[0.88rem] text-foreground/80 flex gap-2.5 items-start">
                    <span className="text-accent font-bold flex-shrink-0">›</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
