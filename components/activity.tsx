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

  // Organize GitHub days into weeks (52-53 columns, 7 rows)
  const weeks = useMemo(() => {
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

  // Color mapping based on level (matching portfolio emerald & theme)
  const getCellColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-950/40 dark:bg-emerald-950/60 border border-emerald-800/40"
      case 2:
        return "bg-emerald-700 dark:bg-emerald-700"
      case 3:
        return "bg-emerald-500 dark:bg-emerald-500"
      case 4:
        return "bg-emerald-400 dark:bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]"
      default:
        return "bg-[#141414]/5 dark:bg-white/[0.04] border border-[#141414]/5 dark:border-white/[0.03]"
    }
  }

  return (
    <section id="activity" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-[max(4vw,1.5rem)] max-w-[1200px]">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#e5262c] uppercase font-semibold mb-2">
              <Flame size={14} className="animate-pulse" />
              <span>Continuous Output</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#141414] dark:text-white font-normal">
              Activity &amp; Contributions
            </h2>
          </div>
          <p className="text-sm text-[#141414]/60 dark:text-neutral-400 max-w-md font-mono text-xs">
            Live-synced daily commits, problem-solving streaks, and algorithmic milestones.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* GitHub Card (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-[#141414]/10 dark:border-white/10 bg-[#f6f4f0]/60 dark:bg-[#16161a]/60 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between shadow-sm">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#141414]/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#141414] dark:bg-white text-white dark:text-[#141414] flex items-center justify-center font-bold">
                    <GitCommit size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-[#141414] dark:text-white flex items-center gap-2">
                      GitHub Activity
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    </h3>
                    <p className="text-xs text-[#141414]/50 dark:text-neutral-400 font-mono">@vaibhavjadhav0391-wq</p>
                  </div>
                </div>

                <a
                  href="https://github.com/vaibhavjadhav0391-wq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#141414]/70 dark:text-neutral-300 hover:text-[#e5262c] dark:hover:text-[#e5262c] transition-colors"
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
                <span className="text-xs sm:text-sm text-[#141414]/60 dark:text-neutral-400 font-mono">
                  contributions in the last year
                </span>
              </div>

              {/* Heatmap Grid View */}
              <div className="relative overflow-x-auto pb-2 scrollbar-thin">
                {loadingGh && weeks.length === 0 ? (
                  <div className="h-28 flex items-center justify-center text-xs font-mono text-[#141414]/40 dark:text-neutral-500">
                    Syncing live GitHub timeline...
                  </div>
                ) : (
                  <div className="flex gap-[3.5px] min-w-[620px]">
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-[3.5px]">
                        {week.map((day) => (
                          <div
                            key={day.date}
                            className={`w-[10px] h-[10px] rounded-[2px] cursor-pointer transition-all hover:scale-125 ${getCellColor(
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

              {/* Heatmap Legend */}
              <div className="flex items-center justify-between pt-4 mt-2 text-[11px] font-mono text-[#141414]/50 dark:text-neutral-400">
                <span>Learn how contributions are counted</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-[9px] h-[9px] rounded-[2px] bg-[#141414]/5 dark:bg-white/[0.04]" />
                  <div className="w-[9px] h-[9px] rounded-[2px] bg-emerald-950/40 dark:bg-emerald-950/60" />
                  <div className="w-[9px] h-[9px] rounded-[2px] bg-emerald-700" />
                  <div className="w-[9px] h-[9px] rounded-[2px] bg-emerald-500" />
                  <div className="w-[9px] h-[9px] rounded-[2px] bg-emerald-400" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>

          {/* LeetCode Card (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-[#141414]/10 dark:border-white/10 bg-[#f6f4f0]/60 dark:bg-[#16161a]/60 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between shadow-sm">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#141414]/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center font-bold">
                    <Code2 size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-[#141414] dark:text-white flex items-center gap-2">
                      LeetCode Progress
                    </h3>
                    <p className="text-xs text-[#141414]/50 dark:text-neutral-400 font-mono">@vaibhav032526</p>
                  </div>
                </div>

                <a
                  href="https://leetcode.com/u/vaibhav032526/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#141414]/70 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                >
                  <span>Profile</span>
                  <ExternalLink size={13} />
                </a>
              </div>

              {/* Total Solved Metric */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-3xl sm:text-4xl font-bold font-serif text-[#141414] dark:text-white">
                    {lcStats.totalSolved}
                  </span>
                  <span className="block text-xs text-[#141414]/60 dark:text-neutral-400 font-mono mt-0.5">
                    Problems Solved
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400 text-xs font-mono font-semibold flex items-center gap-1.5">
                  <Trophy size={13} />
                  <span>Rank ~{Math.round(lcStats.ranking / 1000)}k</span>
                </div>
              </div>

              {/* Problem Breakdown Bars */}
              <div className="space-y-3 mb-6">
                {/* Easy */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Easy</span>
                    <span className="text-[#141414]/70 dark:text-neutral-300">{lcStats.easySolved}</span>
                  </div>
                  <div className="h-2 w-full bg-[#141414]/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (lcStats.easySolved / 70) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Medium */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-amber-600 dark:text-amber-400 font-semibold">Medium</span>
                    <span className="text-[#141414]/70 dark:text-neutral-300">{lcStats.mediumSolved}</span>
                  </div>
                  <div className="h-2 w-full bg-[#141414]/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (lcStats.mediumSolved / 50) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Hard */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#e5262c] font-semibold">Hard</span>
                    <span className="text-[#141414]/70 dark:text-neutral-300">{lcStats.hardSolved}</span>
                  </div>
                  <div className="h-2 w-full bg-[#141414]/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#e5262c] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (lcStats.hardSolved / 15) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Recent Solved Highlights */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-[#141414]/40 dark:text-neutral-500 mb-2 font-semibold">
                  Recent Submissions
                </p>
                <div className="space-y-1.5">
                  {lcStats.recentSubmissions.map((sub, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/40 dark:bg-white/[0.02] border border-[#141414]/5 dark:border-white/[0.04]"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span className="truncate text-[#141414]/90 dark:text-neutral-200">{sub.title}</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#141414]/5 dark:bg-white/5 text-[#141414]/60 dark:text-neutral-400">
                        {sub.lang}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Tooltip */}
      {activeTooltip && (
        <div
          className="fixed pointer-events-none z-50 px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-[#141414] text-white dark:bg-white dark:text-[#141414] shadow-lg -translate-x-1/2 -translate-y-full"
          style={{ left: `${activeTooltip.x}px`, top: `${activeTooltip.y}px` }}
        >
          {activeTooltip.text}
        </div>
      )}
    </section>
  )
}

export default Activity
