const entries = [
  {
    date: "2024 — Ongoing",
    title: "Software Engineering Intern",
    org: "Connect Soft Infotech, Pune",
    bullets: [
      "Collaborated with senior developers to apply professional software development ethics and best practices.",
      "Translated theoretical knowledge into real-world professional applications in a team environment.",
      "Demonstrated high discipline and cooperation in a fast-paced development environment.",
    ],
  },
  {
    date: "2024",
    title: "Virtual Intern",
    org: "Deloitte Virtual Program",
    bullets: [
      "Completed modules in coding, software development, and data model reconciliation.",
      "Prepared professional software development proposals and solved complex logic problems.",
    ],
  },
  {
    date: "2023 — Pursuing (3rd Year)",
    title: "B.Tech in AIDS",
    org: "Maharashtra Institute of Technology, CSN · CGPA 9.45",
    bullets: [
      "Consistently top-performing student in the department.",
      "Actively engaged in coding challenges and emerging AI technologies.",
    ],
  },
  {
    date: "Completed",
    title: "Diploma in Computer Science",
    org: "MSBTE Board · Result: Distinction",
    bullets: ["Awarded Distinction — Academic Excellence recognition from the board."],
  },
  {
    date: "2024 — Ongoing",
    title: "Advanced Programming Specialization",
    org: "Udemy Certification",
    bullets: [
      "Intensive coursework on advanced technical skill-building and program logic.",
      "Currently exploring and implementing AI models for modern automation tasks.",
    ],
  },
]

export function Journey() {
  return (
    <section id="journey" className="py-28 border-t border-border">
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1080px] text-center">
        <p className="section-label reveal">Experience &amp; Education</p>
        <h2 className="section-heading reveal delay-100">The Journey</h2>

        <div className="max-w-[620px] mx-auto text-left relative pl-9">
          {/* Vertical line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

          {entries.map((e, i) => (
            <div
              key={e.title}
              className={`relative pb-12 last:pb-0 reveal delay-${Math.min((i + 1) * 100, 400)}`}
            >
              {/* Dot */}
              <div className="absolute -left-9 top-[0.42rem] w-2.5 h-2.5 rounded-full bg-accent -ml-[4.5px]" />

              <div className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-accent mb-1">
                {e.date}
              </div>
              <div className="font-serif text-[1.15rem] font-normal mb-0.5">{e.title}</div>
              <div className="text-[0.85rem] text-muted-foreground mb-3">{e.org}</div>
              <div className="flex flex-col gap-1.5">
                {e.bullets.map((b) => (
                  <div key={b} className="text-[0.85rem] text-muted-foreground flex gap-2.5">
                    <span className="text-accent flex-shrink-0">—</span>
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
