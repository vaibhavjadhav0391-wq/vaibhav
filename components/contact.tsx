export function Contact() {
  return (
    <section id="contact" className="py-28 border-t border-border">
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1080px] text-center">
        <p className="section-label reveal">Contact</p>
        <h2 className="section-heading reveal delay-100">Want to build something together?</h2>

        <div className="reveal delay-200">
          <a
            href="mailto:vaibhavjadhav0301@gmail.com"
            className="font-serif text-[clamp(1.3rem,3.5vw,2.1rem)] font-normal text-foreground underline decoration-accent underline-offset-[5px] hover:text-accent transition-colors"
          >
            vaibhavjadhav0301@gmail.com
          </a>
        </div>

        <div className="flex justify-center gap-12 mt-12 flex-wrap reveal delay-300">
          {[
            { label: "Phone", value: "+91 8767008142", accent: false },
            { label: "Location", value: "Chhatrapati Sambhajinagar, MH", accent: false },
            { label: "Availability", value: "Open to opportunities ✦", accent: true },
          ].map((f) => (
            <div key={f.label}>
              <div className="text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-accent mb-1.5">
                {f.label}
              </div>
              <div className={`text-[0.9rem] ${f.accent ? "text-accent" : "text-muted-foreground"}`}>
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
