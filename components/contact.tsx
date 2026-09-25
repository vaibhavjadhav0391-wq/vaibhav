export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-border bg-background transition-colors duration-300">
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1080px] text-center">
        <p className="section-label">Get in Touch</p>
        <h2 className="section-heading text-foreground">Let&apos;s Build Something Great</h2>

        <div className="my-6">
          <a
            href="mailto:vaibhavjadhav0301@gmail.com"
            className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-foreground underline decoration-accent underline-offset-[8px] hover:text-accent transition-colors"
          >
            vaibhavjadhav0301@gmail.com
          </a>
        </div>

        <div className="flex justify-center gap-6 md:gap-10 mt-12 flex-wrap">
          {[
            { label: "Phone", value: "+91 8767008142", href: "tel:+918767008142" },
            { label: "Location", value: "Chhatrapati Sambhajinagar, MH", href: null },
            { label: "Status", value: "Available for full-time & projects ✨", href: null, highlight: true },
          ].map((f) => (
            <div key={f.label} className="p-4 rounded-xl bg-card border border-border shadow-sm min-w-[200px] transition-colors">
              <div className="text-[0.68rem] font-mono font-bold tracking-[0.14em] uppercase text-accent mb-1">
                {f.label}
              </div>
              {f.href ? (
                <a href={f.href} className="text-[0.92rem] font-medium text-foreground hover:text-accent">
                  {f.value}
                </a>
              ) : (
                <div className={`text-[0.92rem] font-medium ${f.highlight ? "text-accent font-semibold" : "text-foreground"}`}>
                  {f.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
