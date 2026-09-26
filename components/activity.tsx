"use client"

import { useEffect, useState, useMemo } from "react"
import { Flame, GitCommit, Code2, ExternalLink, Trophy } from "lucide-react"

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

export function Activity() {
  const [ghContributions, setGhContributions] = useState<ContributionDay[]>([])
  const [totalGhContributions, setTotalGhContributions] = useState<number>(293)
  const [loadingGh, setLoadingGh] = useState<boolean>(true)

  const [lcStats, setLcStats] = useState<LeetCodeStats>({
    totalSolved: 95,
    easySolved: 51,
    mediumSolved: 39,
    hardSolved: 5,
    ranking: 1750404,
    submissionCalendar: {},
  })
  const [loadingLc, setLoadingLc] = useState<boolean>(true)
  const [activeTooltip, setActiveTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  // Fetch live GitHub contributions
  useEffect(() => {
    async function fetchGithub() {
      try {
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/vaibhavjadhav0391-wq?y=last")
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

  // Fetch live LeetCode stats
  useEffect(() => {
    async function fetchLeetCode() {
      try {
        const res = await fetch("https://alfa-leetcode-api.onrender.com/userProfile/vaibhav032526")
        if (res.ok) {
          const data = await res.json()
          setLcStats({
            totalSolved: (data.easySolved || 0) + (data.mediumSolved || 0) + (data.hardSolved || 0) || 95,
            easySolved: data.easySolved ?? 51,
            mediumSolved: data.mediumSolved ?? 39,
            hardSolved: data.hardSolved ?? 5,
            ranking: data.ranking ?? 1750404,
            submissionCalendar: data.submissionCalendar || {},
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

  // Organize GitHub days into weeks (52-53 columns, 7 rows)
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
    return cols
  }, [ghContributions])

  // Build LeetCode 52-week heatmap grid from submissionCalendar
  const lcWeeks = useMemo(() => {
    const calendar = lcStats.submissionCalendar
    const days: ContributionDay[] = []
    const today = new Date()

    for (let i = 370; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split("T")[0]
      const timestamp = Math.floor(new Date(dateStr).getTime() / 1000).toString()
      const count = calendar[timestamp] || 0

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

  // GitHub Cell Colors
  const getGhCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-800 border border-emerald-600/50"
      case 2:
        return "bg-emerald-600 border border-emerald-500/60"
      case 3:
        return "bg-emerald-400 border border-emerald-300"
      case 4:
        return "bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)] border border-white"
      default:
        return "bg-white/[0.07] border border-white/[0.04]"
    }
  }

  // LeetCode Cell Colors
  const getLcCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-amber-800 border border-amber-600/50"
      case 2:
        return "bg-amber-600 border border-amber-500/60"
      case 3:
        return "bg-amber-400 border border-amber-300"
      case 4:
        return "bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)] border border-white"
      default:
        return "bg-white/[0.07] border border-white/[0.04]"
    }
  }

  return (
    <section id="activity" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1200px]">
        {/* Section Header with 100% Solid Visible Colors */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#e5262c] uppercase font-bold mb-2">
              <Flame size={16} className="animate-pulse text-[#e5262c]" />
              <span>Continuous Output</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#141414] dark:text-white font-bold tracking-tight">
              Activity &amp; Contributions
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#141414]/80 dark:text-neutral-300 max-w-md font-mono font-medium leading-relaxed">
            Live-synced daily commits, problem-solving streaks, and algorithmic milestones.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* GitHub Card */}
          <div className="rounded-3xl border border-neutral-800/80 bg-[#121215] text-white p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Ambient subtle glow */}
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
                  className="flex items-center gap-2 text-xs font-mono font-bold px-4 py-2 rounded-full bg-white/10 hover:bg-[#e5262c] text-white hover:text-white border border-white/15 transition-all shadow-sm"
                >
                  <span>Profile</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Total Contributions Metric */}
              <div className="flex items-baseline gap-2.5 mb-6">
                <span className="text-4xl sm:text-5xl font-bold font-serif text-white tracking-tight">
                  {totalGhContributions}
                </span>
                <span className="text-xs sm:text-sm text-neutral-300 font-mono font-medium">
                  contributions in the last year
                </span>
              </div>

              {/* Heatmap Grid View (Scrollbar Hidden for Clean Look) */}
              <div className="relative overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {loadingGh && ghWeeks.length === 0 ? (
                  <div className="h-28 flex items-center justify-center text-xs font-mono text-neutral-400">
                    Syncing live GitHub timeline...
                  </div>
                ) : (
                  <div className="flex gap-[4px] min-w-[580px]">
                    {ghWeeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[4px]">
                        {week.map((day) => (
                          <div
                            key={day.date}
                            className={`w-[10.5px] h-[10.5px] rounded-[3px] cursor-pointer transition-all hover:scale-135 ${getGhCellColor(
                              day.level
                            )}`}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect()
                              setActiveTooltip({
                                text: `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`,
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

              {/* Legend & Cadence Footer */}
              <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/10 text-xs font-mono font-medium text-neutral-300">
                <span className="text-neutral-300 font-semibold">Annual Commit Cadence</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400 text-[11px]">Less</span>
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-white/[0.07]" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-800" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-600" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-400" />
                  <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-300" />
                  <span className="text-neutral-400 text-[11px]">More</span>
                </div>
              </div>
            </div>
          </div>

          {/* LeetCode Card (With Matching Heatmap) */}
          <div className="rounded-3xl border border-neutral-800/80 bg-[#121215] text-white p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Ambient subtle glow */}
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

              {/* LeetCode Heatmap Grid View (Scrollbar Hidden) */}
              <div className="relative overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden mb-4">
                {loadingLc && lcWeeks.length === 0 ? (
                  <div className="h-28 flex items-center justify-center text-xs font-mono text-neutral-400">
                    Syncing live LeetCode timeline...
                  </div>
                ) : (
                  <div className="flex gap-[4px] min-w-[580px]">
                    {lcWeeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[4px]">
                        {week.map((day) => (
                          <div
                            key={day.date}
                            className={`w-[10.5px] h-[10.5px] rounded-[3px] cursor-pointer transition-all hover:scale-135 ${getLcCellColor(
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
                )}
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
