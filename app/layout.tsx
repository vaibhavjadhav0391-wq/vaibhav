import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollReveal } from "@/components/scroll-reveal"

export const metadata: Metadata = {
  title: "Vaibhav Jadhav — CS Engineer & Mobile Developer",
  description:
    "Portfolio of Vaibhav Jadhav — Computer Science Engineer, Mobile App Developer, and AI Enthusiast based in Chhatrapati Sambhajinagar, MH.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="vj-theme"
        >
          {children}
          <ScrollReveal />
        </ThemeProvider>
      </body>
    </html>
  )
}
