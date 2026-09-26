"use client"

import { FileDown, Mail, Phone, MapPin, Sparkles } from "lucide-react"

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

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 my-8 flex-wrap">
          <a
            href="/Vaibhav_Jadhav_Resume.docx"
            download="Vaibhav_Jadhav_Resume.docx"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-mono text-xs font-bold hover:bg-[#c91e24] transition-all shadow-md group"
          >
            <FileDown size={17} className="group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Official Resume</span>
          </a>
          <a
            href="mailto:vaibhavjadhav0301@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card text-foreground font-mono text-xs font-semibold hover:border-accent hover:text-accent transition-all shadow-2xs"
          >
            <Mail size={16} />
            <span>Send Direct Email</span>
          </a>
        </div>

        <div className="flex justify-center gap-6 md:gap-8 mt-12 flex-wrap">
          {[
            { icon: <Phone size={16} />, label: "Phone", value: "+91 8767008142", href: "tel:+918767008142" },
            { icon: <MapPin size={16} />, label: "Location", value: "Chhatrapati Sambhajinagar, MH", href: null },
            { icon: <Sparkles size={16} />, label: "Status", value: "Available for full-time & projects", href: null, highlight: true },
          ].map((f) => (
            <div key={f.label} className="p-4 rounded-xl bg-card border border-border shadow-sm min-w-[210px] transition-colors text-left flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0 mt-0.5">
                {f.icon}
              </div>
              <div>
                <div className="text-[0.68rem] font-mono font-bold tracking-[0.14em] uppercase text-accent mb-0.5">
                  {f.label}
                </div>
                {f.href ? (
                  <a href={f.href} className="text-[0.88rem] font-medium text-foreground hover:text-accent">
                    {f.value}
                  </a>
                ) : (
                  <div className={`text-[0.88rem] font-medium ${f.highlight ? "text-accent font-semibold" : "text-foreground"}`}>
                    {f.value}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
