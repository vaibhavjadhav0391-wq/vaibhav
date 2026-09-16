import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Work } from "@/components/work"
import { Toolkit } from "@/components/toolkit"
import { Journey } from "@/components/journey"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Toolkit />
        <Journey />
        <Contact />
      </main>
      <footer className="border-t border-border py-8 text-center text-[0.75rem] text-muted-foreground tracking-[0.04em]">
        <p>
          Designed &amp; built by <span className="text-accent">Vaibhav Jadhav</span>
          &nbsp;·&nbsp; © 2026 &nbsp;·&nbsp; All rights reserved.
        </p>
      </footer>
    </>
  )
}
