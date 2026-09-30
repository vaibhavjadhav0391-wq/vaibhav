"use client"

import { useEffect, useState, useMemo } from "react"
import { Flame, GitCommit, Code2, ExternalLink, Trophy, RefreshCw } from "lucide-react"

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface LeetCodeStats {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking: number
  submissionCalendar: Record<string, number>
}

// Initial high-fidelity cached activity for instant, zero-delay rendering with recent 2026 activity
const INITIAL_LEETCODE_CALENDAR: Record<string, number> = {
  "1783468800": 14, "1783555200": 3, "1783641600": 3, "1783728000": 2, "1783814400": 2,
  "1783900800": 2, "1783987200": 2, "1784073600": 1, "1784160000": 1, "1784246400": 2,
  "1784332800": 1, "1784419200": 2, "1784505600": 1, "1784592000": 1, "1784678400": 1,
  "1784764800": 1, "1784851200": 1, "1784937600": 1, "1785024000": 1, "1785110400": 1,
  "1785196800": 1, "1785283200": 2, "1785456000": 2, "1785542400": 1, "1785628800": 3,
  "1785715200": 1, "1785801600": 2, "1785888000": 1, "1785974400": 1, "1786060800": 1,
  "1786147200": 1, "1786233600": 2, "1786320000": 2, "1786406400": 2, "1786492800": 1,
  "1786579200": 1, "1786665600": 1, "1786752000": 1, "1786838400": 1, "1786924800": 2,
  "1787011200": 1, "1787097600": 2, "1787184000": 2, "1787270400": 1, "1787356800": 2,
  "1787443200": 1, "1787529600": 2, "1787616000": 6, "1787702400": 1, "1787788800": 2,
  "1787875200": 2, "1787961600": 3, "1788048000": 2, "1788134400": 1, "1788220800": 2,
  "1788307200": 1, "1788393600": 2, "1788480000": 1, "1788566400": 1, "1788652800": 1,
  "1788739200": 1, "1788825600": 1, "1788912000": 1, "1788998400": 1, "1789084800": 1,
  "1789171200": 1, "1789257600": 1, "1789344000": 1, "1789430400": 1, "1789516800": 3,
  "1789603200": 2, "1789689600": 1, "1789862400": 1, "1789948800": 1, "1790035200": 2,
  "1790121600": 1, "1790208000": 1, "1790294400": 1, "1790380800": 1, "1790467200": 2,
  "1790553600": 1, "1790640000": 1, "1790726400": 1
}

export function Activity() {
  const [ghContributions, setGhContributions] = useState<ContributionDay[]>([])
  const [totalGhContributions, setTotalGhContributions] = useState<number>(322)
  const [loadingGh, setLoadingGh] = useState<boolean>(true)

  const [lcStats, setLcStats] = useState<LeetCodeStats>({
    totalSolved: 99,
    easySolved: 51,
    mediumSolved: 42,
    hardSolved: 6,
    ranking: 1727531,
    submissionCalendar: INITIAL_LEETCODE_CALENDAR,
  })
  const [loadingLc, setLoadingLc] = useState<boolean>(true)
  const [activeTooltip, setActiveTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  // Fetch live GitHub contributions
  useEffect(() => {
    async function fetchGithub() {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/vaibhavjadhav0391-wq?y=last", {
          cache: "no-store",
        })
        if (res.ok) {
          const data = await res.json()
          if (data.contributions && Array.isArray(data.contributions)) {
            setGhContributions(data.contributions)
            if (data.total?.lastYear) {
              setTotalGhContributions(data.total.lastYear)
            }
          }
        }
      } catch (err) {
        console.warn("Using cached GitHub stats:", err)
      } finally {
        setLoadingGh(false)
      }
    }
    fetchGithub()
  }, [])

  // Fetch live LeetCode stats via Next.js internal API route with multi-mirror client fallback
  useEffect(() => {
    async function fetchLeetCode() {
      setLoadingLc(true)

      // Step 1: Query internal API route (direct official LeetCode GraphQL with automatic server caching)
      try {
        const res = await fetch("/api/leetcode", { cache: "no-store" })
        if (res.ok) {
          const data = await res.json()
          if (data && (data.totalSolved || data.submissionCalendar)) {
            setLcStats({
              totalSolved: data.totalSolved ?? 99,
              easySolved: data.easySolved ?? 51,
              mediumSolved: data.mediumSolved ?? 42,
              hardSolved: data.hardSolved ?? 6,
              ranking: data.ranking ?? 1727531,
              submissionCalendar: data.submissionCalendar || INITIAL_LEETCODE_CALENDAR,
            })
            setLoadingLc(false)
            return
          }
        }
      } catch (err) {
        console.warn("Internal /api/leetcode endpoint skipped, attempting client mirrors:", err)
      }

      // Step 2: High-speed Vercel mirror fallback
      try {
        const res = await fetch("https://leetcode-api-faisalshohag.vercel.app/vaibhav032526")
        if (res.ok) {
          const data = await res.json()
          const statsList: Array<{ difficulty: string; count: number }> = data?.matchedUserStats?.acSubmissionNum || []
          const total = data.totalSolved || statsList.find((s) => s.difficulty === "All")?.count || 99
          const easy = data.easySolved ?? statsList.find((s) => s.difficulty === "Easy")?.count ?? 51
          const medium = data.mediumSolved ?? statsList.find((s) => s.difficulty === "Medium")?.count ?? 42
          const hard = data.hardSolved ?? statsList.find((s) => s.difficulty === "Hard")?.count ?? 6
          const ranking = data.ranking ?? 1727531

          let calendar = data.submissionCalendar
          if (typeof calendar === "string") {
            try {
              calendar = JSON.parse(calendar)
            } catch {}
          }

          setLcStats({
            totalSolved: total,
            easySolved: easy,
            mediumSolved: medium,
            hardSolved: hard,
            ranking: ranking,
            submissionCalendar: calendar && typeof calendar === "object" ? calendar : INITIAL_LEETCODE_CALENDAR,
          })
          setLoadingLc(false)
          return
        }
      } catch (err) {
        console.warn("Vercel mirror fallback skipped:", err)
      }

      // Step 3: Alfa LeetCode Render mirror fallback
      try {
        const res = await fetch("https://alfa-leetcode-api.onrender.com/userProfile/vaibhav032526")
        if (res.ok) {
          const data = await res.json()
          const statsList: Array<{ difficulty: string; count: number }> = data?.matchedUserStats?.acSubmissionNum || []
          const total = data.totalSolved || statsList.find((s) => s.difficulty === "All")?.count || 99
          const easy = data.easySolved ?? statsList.find((s) => s.difficulty === "Easy")?.count ?? 51
          const medium = data.mediumSolved ?? statsList.find((s) => s.difficulty === "Medium")?.count ?? 42
          const hard = data.hardSolved ?? statsList.find((s) => s.difficulty === "Hard")?.count ?? 6

          let calendar = data.submissionCalendar
          if (typeof calendar === "string") {
            try {
              calendar = JSON.parse(calendar)
            } catch {}
          }

          setLcStats({
            totalSolved: total,
            easySolved: easy,
            mediumSolved: medium,
            hardSolved: hard,
            ranking: data.ranking ?? 1727531,
            submissionCalendar: calendar && typeof calendar === "object" ? calendar : INITIAL_LEETCODE_CALENDAR,
          })
        }
      } catch (err) {
        console.warn("Using cached LeetCode stats:", err)
      } finally {
        setLoadingLc(false)
      }
    }

    fetchLeetCode()
  }, [])

  // Organize GitHub days into weeks (latest 26 weeks for 100% full-width view)
  const ghWeeks = useMemo(() => {
    if (ghContributions.length === 0) return []
    const cols: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []

    ghContributions.forEach((day, index) => {
      currentWeek.push(day)
      if (currentWeek.length === 7 || index === ghContributions.length - 1) {
        cols.push(currentWeek)
        currentWeek = []
      }
    })
    return cols.slice(-26)
  }, [ghContributions])

  // Build LeetCode heatmap grid from timestamps (supports timezone mapping)
  const lcWeeks = useMemo(() => {
    // 1. Build date string map from UTC timestamps
    const dateMap: Record<string, number> = {}
    let calendar = lcStats.submissionCalendar
    if (typeof calendar === "string") {
      try {
        calendar = JSON.parse(calendar)
      } catch {}
    }

    if (calendar && typeof calendar === "object") {
      Object.entries(calendar).forEach(([tsStr, count]) => {
        const ts = parseInt(tsStr, 10)
        if (!isNaN(ts)) {
          const d = new Date(ts * 1000)
          const utcKey = d.toISOString().split("T")[0]
          const localYear = d.getFullYear()
          const localMonth = String(d.getMonth() + 1).padStart(2, "0")
          const localDay = String(d.getDate()).padStart(2, "0")
          const localKey = `${localYear}-${localMonth}-${localDay}`

          const c = Number(count)
          dateMap[utcKey] = Math.max(dateMap[utcKey] || 0, c)
          dateMap[localKey] = Math.max(dateMap[localKey] || 0, c)
        }
      })
    }

    // 2. Generate the last 182 days (26 weeks) up to today
    const days: ContributionDay[] = []
    const today = new Date()

    for (let i = 181; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, "0")
      const dayNum = String(d.getDate()).padStart(2, "0")
      const dateStr = `${year}-${month}-${dayNum}`
      const utcStr = d.toISOString().split("T")[0]

      const count = dateMap[dateStr] || dateMap[utcStr] || 0

      let level = 0
      if (count >= 5) level = 4
      else if (count >= 3) level = 3
      else if (count >= 2) level = 2
      else if (count >= 1) level = 1

      days.push({ date: dateStr, count, level })
    }

    const cols: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []
    days.forEach((day, index) => {
      currentWeek.push(day)
      if (currentWeek.length === 7 || index === days.length - 1) {
        cols.push(currentWeek)
        currentWeek = []
      }
    })
    return cols
  }, [lcStats.submissionCalendar])

  // GitHub Cell Colors (Emerald)
  const getGhCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-800 border border-emerald-600/50"
      case 2:
        return "bg-emerald-600 border border-emerald-500/60"
      case 3:
        return "bg-emerald-400 border border-emerald-300"
      case 4:
        return "bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.9)] border border-white"
      default:
        return "bg-white/[0.08] border border-white/[0.04]"
    }
  }

  // LeetCode Cell Colors (Amber/Gold with High Visibility)
  const getLcCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-amber-800 border border-amber-600/50"
      case 2:
        return "bg-amber-600 border border-amber-500/60"
      case 3:
        return "bg-amber-400 border border-amber-300"
      case 4:
        return "bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.9)] border border-white"
      default:
        return "bg-white/[0.08] border border-white/[0.04]"
    }
  }

  return (
    <section id="activity" className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1200px]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#e5262c] uppercase font-bold mb-2">
              <Flame size={16} className="animate-pulse text-[#e5262c]" />
              <span>Continuous Output</span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: "var(--foreground)" }}
            >
              Activity &amp; Contributions
            </h2>
          </div>
          <p
            className="text-xs sm:text-sm max-w-md font-mono font-medium leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            Live-synced daily commits, problem-solving streaks, and algorithmic milestones.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* GitHub Card */}
          <div className="rounded-3xl border border-neutral-800/90 bg-[#121215] text-white p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-white text-[#121215] flex items-center justify-center font-bold shadow-md">
                    <GitCommit size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                      GitHub Activity
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono font-medium mt-0.5">@vaibhavjadhav0391-wq</p>
                  </div>
                </div>

                <a
                  href="https://github.com/vaibhavjadhav0391-wq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#121215] border border-white/15 transition-all shadow-sm"
                >
                  <span>Profile</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Total Contributions */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-4xl sm:text-5xl font-bold font-serif text-white tracking-tight">
                    {totalGhContributions}
                  </span>
                  <span className="block text-xs sm:text-sm text-neutral-300 font-mono font-medium mt-1">
                    Contributions in the last year
                  </span>
                </div>
                <div className="px-4 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Live Sync</span>
                </div>
              </div>

              {/* GitHub Heatmap Grid View */}
              <div className="w-full pb-3 pt-1">
                {loadingGh && ghWeeks.length === 0 ? (
                  <div className="h-[96px] flex items-center justify-center text-xs font-mono text-neutral-400">
                    Loading GitHub heatmap...
                  </div>
                ) : (
                  <div className="flex justify-between gap-[3px] sm:gap-[4px] w-full">
                    {ghWeeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[3px] sm:gap-[4px] flex-1">
                        {week.map((day) => (
                          <div
                            key={day.date}
                            className={`aspect-square w-full rounded-[2.5px] cursor-pointer transition-all hover:scale-135 ${getGhCellColor(
                              day.level
                            )}`}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect()
                              setActiveTooltip({
                                text: `${day.count} GitHub contribution${day.count === 1 ? "" : "s"} on ${day.date}`,
                                x: rect.left + rect.width / 2,
                                y: rect.top - 10,
                              })
                            }}
                            onMouseLeave={() => setActiveTooltip(null)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10 text-xs font-mono font-medium text-neutral-300">
                <span className="text-neutral-300 font-semibold">Annual Commit Cadence</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400 text-[11px]">Less</span>
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-white/[0.08]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-800" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-600" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-400" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-300" />
                  <span className="text-neutral-400 text-[11px]">More</span>
                </div>
              </div>
            </div>
          </div>

          {/* LeetCode Card */}
          <div className="rounded-3xl border border-neutral-800/90 bg-[#121215] text-white p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold shadow-md">
                    <Code2 size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                      LeetCode Progress
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    </h3>
                    <p className="text-xs text-neutral-400 font-mono font-medium mt-0.5">@vaibhav032526</p>
                  </div>
                </div>

                <a
                  href="https://leetcode.com/u/vaibhav032526/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-full bg-white/10 hover:bg-amber-500 text-white hover:text-[#121215] border border-white/15 transition-all shadow-sm"
                >
                  <span>Profile</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Total Solved & Rank */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-4xl sm:text-5xl font-bold font-serif text-white tracking-tight">
                    {lcStats.totalSolved}
                  </span>
                  <span className="block text-xs sm:text-sm text-neutral-300 font-mono font-medium mt-1">
                    Problems Solved
                  </span>
                </div>
                <div className="px-4 py-2 rounded-full border border-amber-500/40 bg-amber-500/15 text-amber-300 text-xs font-mono font-bold flex items-center gap-2 shadow-sm">
                  <Trophy size={15} className="text-amber-400" />
                  <span>Rank ~{Math.round(lcStats.ranking / 1000)}k</span>
                </div>
              </div>

              {/* LeetCode Heatmap Grid View - Full Width */}
              <div className="w-full pb-3 pt-1">
                <div className="flex justify-between gap-[3px] sm:gap-[4px] w-full">
                  {lcWeeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px] sm:gap-[4px] flex-1">
                      {week.map((day) => (
                        <div
                          key={day.date}
                          className={`aspect-square w-full rounded-[2.5px] cursor-pointer transition-all hover:scale-135 ${getLcCellColor(
                            day.level
                          )}`}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            setActiveTooltip({
                              text: `${day.count} LeetCode submission${day.count === 1 ? "" : "s"} on ${day.date}`,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 10,
                            })
                          }}
                          onMouseLeave={() => setActiveTooltip(null)}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* LeetCode Legend & Cadence Footer */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10 text-xs font-mono font-medium text-neutral-300 mb-4">
                <span className="text-neutral-300 font-semibold">Active Submissions</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400 text-[11px]">Less</span>
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-white/[0.08]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-amber-800" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-amber-600" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-amber-400" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-amber-300" />
                  <span className="text-neutral-400 text-[11px]">More</span>
                </div>
              </div>

              {/* Problem Breakdown Meter */}
              <div className="grid grid-cols-3 gap-3.5 pt-4 border-t border-white/10">
                {/* Easy */}
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="text-xs font-mono font-bold text-emerald-400 block uppercase tracking-wider">Easy</span>
                  <span className="text-xl font-bold font-serif text-white mt-0.5 block">{lcStats.easySolved}</span>
                </div>

                {/* Medium */}
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="text-xs font-mono font-bold text-amber-400 block uppercase tracking-wider">Medium</span>
                  <span className="text-xl font-bold font-serif text-white mt-0.5 block">{lcStats.mediumSolved}</span>
                </div>

                {/* Hard */}
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-center">
                  <span className="text-xs font-mono font-bold text-[#e5262c] block uppercase tracking-wider">Hard</span>
                  <span className="text-xl font-bold font-serif text-white mt-0.5 block">{lcStats.hardSolved}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tooltip with High Contrast */}
      {activeTooltip && (
        <div
          className="fixed pointer-events-none z-50 px-3.5 py-2 text-xs font-mono font-bold rounded-lg bg-white text-[#121215] shadow-2xl -translate-x-1/2 -translate-y-full border border-neutral-300"
          style={{ left: `${activeTooltip.x}px`, top: `${activeTooltip.y}px` }}
        >
          {activeTooltip.text}
        </div>
      )}
    </section>
  )
}

export default Activity
