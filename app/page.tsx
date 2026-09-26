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
      <main className="min-h-screen">
        <Hero />
        <About />
        <Work />
        <Toolkit />
        <Journey />
        <Contact />
      </main>
      <footer className="border-t border-[#141414]/10 dark:border-white/10 py-8 text-center text-[0.8rem] font-mono text-[#141414]/60 dark:text-neutral-400 bg-[#f6f4f0] dark:bg-[#121214] transition-colors">
        <p>
          Designed &amp; built by <span className="text-[#e5262c] font-bold">Vaibhav Jadhav</span>
          &nbsp;·&nbsp; © 2026 &nbsp;·&nbsp; All rights reserved.
        </p>
      </footer>
    </>
  )
}
