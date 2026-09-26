"use client"

import { useEffect, useState, useMemo } from "react"
import { Flame, GitCommit, Code2, ExternalLink, Trophy, CheckCircle2 } from "lucide-react"

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
  recentSubmissions: { title: string; statusDisplay: string; lang: string }[]
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
    recentSubmissions: [
      { title: "Search in Rotated Sorted Array", statusDisplay: "Accepted", lang: "java" },
      { title: "Sqrt(x)", statusDisplay: "Accepted", lang: "java" },
      { title: "Search Insert Position", statusDisplay: "Accepted", lang: "java" },
    ],
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
            recentSubmissions: (data.recentSubmissions || []).slice(0, 3),
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

  // Organize GitHub days into weeks
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

  // GitHub Cell Colors (Emerald)
  const getGhCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-300 dark:bg-emerald-950/80 border border-emerald-500/40"
      case 2:
        return "bg-emerald-500 dark:bg-emerald-700"
      case 3:
        return "bg-emerald-600 dark:bg-emerald-500"
      case 4:
        return "bg-emerald-700 dark:bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
      default:
        return "bg-[#141414]/10 dark:bg-white/[0.06] border border-[#141414]/5 dark:border-white/[0.04]"
    }
  }

  // LeetCode Cell Colors (Amber/Orange)
  const getLcCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-amber-300 dark:bg-amber-950/80 border border-amber-500/40"
      case 2:
        return "bg-amber-500 dark:bg-amber-700"
      case 3:
        return "bg-amber-600 dark:bg-amber-500"
      case 4:
        return "bg-amber-700 dark:bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
      default:
        return "bg-[#141414]/10 dark:bg-white/[0.06] border border-[#141414]/5 dark:border-white/[0.04]"
    }
  }

  return (
    <section id="activity" className="py-24 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1200px]">
        {/* Section Header with High Contrast */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#e5262c] uppercase font-bold mb-2">
              <Flame size={15} className="animate-pulse text-[#e5262c]" />
              <span>Continuous Output</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#141414] dark:text-[#f6f4f0] font-normal tracking-tight">
              Activity &amp; Contributions
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#141414]/75 dark:text-neutral-400 max-w-md font-mono">
            Live-synced daily commits, problem-solving streaks, and algorithmic milestones.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* GitHub Card */}
          <div className="rounded-2xl border border-[#141414]/15 dark:border-white/10 bg-white dark:bg-[#16161a] p-6 sm:p-8 flex flex-col justify-between shadow-md transition-colors">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#141414]/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] dark:bg-white text-white dark:text-[#141414] flex items-center justify-center font-bold shadow-xs">
                    <GitCommit size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#141414] dark:text-white flex items-center gap-2">
                      GitHub Activity
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </h3>
                    <p className="text-xs text-[#141414]/60 dark:text-neutral-400 font-mono font-medium">@vaibhavjadhav0391-wq</p>
                  </div>
                </div>

                <a
                  href="https://github.com/vaibhavjadhav0391-wq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-full border border-[#141414]/15 dark:border-white/15 text-[#141414] dark:text-neutral-200 hover:border-[#e5262c] hover:text-[#e5262c] transition-all bg-[#141414]/[0.02] dark:bg-white/[0.02]"
                >
                  <span>Profile</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Total Contributions Count */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl sm:text-4xl font-bold font-serif text-[#141414] dark:text-white">
                  {totalGhContributions}
                </span>
                <span className="text-xs sm:text-sm text-[#141414]/75 dark:text-neutral-400 font-mono font-medium">
                  contributions in the last year
                </span>
              </div>

              {/* Heatmap Grid View */}
              <div className="relative overflow-x-auto pb-3 pt-1 scrollbar-thin">
                {loadingGh && ghWeeks.length === 0 ? (
                  <div className="h-28 flex items-center justify-center text-xs font-mono text-[#141414]/50 dark:text-neutral-500">
                    Syncing live GitHub timeline...
                  </div>
                ) : (
                  <div className="flex gap-[3.5px] min-w-[580px]">
                    {ghWeeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[3.5px]">
                        {week.map((day) => (
                          <div
                            key={day.date}
                            className={`w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-all hover:scale-130 ${getGhCellColor(
                              day.level
                            )}`}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect()
                              setActiveTooltip({
                                text: `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`,
                                x: rect.left + rect.width / 2,
                                y: rect.top - 8,
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
              <div className="flex items-center justify-between pt-4 mt-1 border-t border-[#141414]/10 dark:border-white/10 text-[11px] font-mono font-medium text-[#141414]/60 dark:text-neutral-400">
                <span>Annual Commit Cadence</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-[9px] h-[9px] rounded-[2px] bg-[#141414]/10 dark:bg-white/[0.06]" />
                  <div className="w-[9px] h-[9px] rounded-[2px] bg-emerald-300 dark:bg-emerald-950/80" />
                  <div className="w-[9px] h-[9px] rounded-[2px] bg-emerald-500 dark:bg-emerald-700" />
                  <div className="w-[9px] h-[9px] rounded-[2px] bg-emerald-600 dark:bg-emerald-500" />
                  <div className="w-[9px] h-[9px] rounded-[2px] bg-emerald-700 dark:bg-emerald-400" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>

          {/* LeetCode Card (With Matching Heatmap) */}
          <div className="rounded-2xl border border-[#141414]/15 dark:border-white/10 bg-white dark:bg-[#16161a] p-6 sm:p-8 flex flex-col justify-between shadow-md transition-colors">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#141414]/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold shadow-xs">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#141414] dark:text-white flex items-center gap-2">
                      LeetCode Progress
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    </h3>
                    <p className="text-xs text-[#141414]/60 dark:text-neutral-400 font-mono font-medium">@vaibhav032526</p>
                  </div>
                </div>

                <a
                  href="https://leetcode.com/u/vaibhav032526/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-full border border-[#141414]/15 dark:border-white/15 text-[#141414] dark:text-neutral-200 hover:border-amber-500 hover:text-amber-500 transition-all bg-[#141414]/[0.02] dark:bg-white/[0.02]"
                >
                  <span>Profile</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Total Solved & Rank */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl sm:text-4xl font-bold font-serif text-[#141414] dark:text-white">
                    {lcStats.totalSolved}
                  </span>
                  <span className="block text-xs sm:text-sm text-[#141414]/75 dark:text-neutral-400 font-mono font-medium mt-0.5">
                    Problems Solved
                  </span>
                </div>
                <div className="px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs">
                  <Trophy size={14} className="text-amber-500" />
                  <span>Rank ~{Math.round(lcStats.ranking / 1000)}k</span>
                </div>
              </div>

              {/* LeetCode Heatmap Grid View */}
              <div className="relative overflow-x-auto pb-3 pt-1 scrollbar-thin mb-4">
                {loadingLc && lcWeeks.length === 0 ? (
                  <div className="h-28 flex items-center justify-center text-xs font-mono text-[#141414]/50 dark:text-neutral-500">
                    Syncing live LeetCode timeline...
                  </div>
                ) : (
                  <div className="flex gap-[3.5px] min-w-[580px]">
                    {lcWeeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[3.5px]">
                        {week.map((day) => (
                          <div
                            key={day.date}
                            className={`w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-all hover:scale-130 ${getLcCellColor(
                              day.level
                            )}`}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect()
                              setActiveTooltip({
                                text: `${day.count} LeetCode submission${day.count === 1 ? "" : "s"} on ${day.date}`,
                                x: rect.left + rect.width / 2,
                                y: rect.top - 8,
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
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#141414]/10 dark:border-white/10">
                {/* Easy */}
                <div className="p-2.5 rounded-xl bg-[#141414]/[0.03] dark:bg-white/[0.03] border border-[#141414]/5 dark:border-white/5 text-center">
                  <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 block uppercase">Easy</span>
                  <span className="text-lg font-bold font-serif text-[#141414] dark:text-white">{lcStats.easySolved}</span>
                </div>

                {/* Medium */}
                <div className="p-2.5 rounded-xl bg-[#141414]/[0.03] dark:bg-white/[0.03] border border-[#141414]/5 dark:border-white/5 text-center">
                  <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 block uppercase">Medium</span>
                  <span className="text-lg font-bold font-serif text-[#141414] dark:text-white">{lcStats.mediumSolved}</span>
                </div>

                {/* Hard */}
                <div className="p-2.5 rounded-xl bg-[#141414]/[0.03] dark:bg-white/[0.03] border border-[#141414]/5 dark:border-white/5 text-center">
                  <span className="text-[11px] font-mono font-bold text-[#e5262c] block uppercase">Hard</span>
                  <span className="text-lg font-bold font-serif text-[#141414] dark:text-white">{lcStats.hardSolved}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {activeTooltip && (
        <div
          className="fixed pointer-events-none z-50 px-3 py-1.5 text-xs font-mono font-semibold rounded-md bg-[#141414] text-white dark:bg-white dark:text-[#141414] shadow-xl -translate-x-1/2 -translate-y-full border border-white/20 dark:border-black/20"
          style={{ left: `${activeTooltip.x}px`, top: `${activeTooltip.y}px` }}
        >
          {activeTooltip.text}
        </div>
      )}
    </section>
  )
}

export default Activity
