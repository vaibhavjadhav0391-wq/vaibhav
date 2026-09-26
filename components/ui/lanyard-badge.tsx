"use client"

import * as React from "react"

export interface LanyardBadgeProps {
  front?: React.ReactNode
  back?: React.ReactNode
  title?: string
  subtitle?: string
  name?: string
  role?: string
  strapText?: string
  strapLabel?: string
  strapColor?: string
  inkColor?: string
  cardColor?: string
  flipButton?: boolean
  cardWidth?: number
  height?: string
  className?: string
}

export type Pt = { x: number; y: number; px: number; py: number; w: number }
export type Link = [number, number, number]
export type Spin = { a: number; v: number }

export function integrate(pts: Pt[], dt: number, gravity: number, damping: number) {
  for (const p of pts) {
    if (!p.w) continue
    const vx = (p.x - p.px) * damping
    const vy = (p.y - p.py) * damping
    p.px = p.x
    p.py = p.y
    p.x += vx
    p.y += vy + gravity * dt * dt
  }
}

export function solve(pts: Pt[], links: Link[], iterations: number) {
  for (let k = 0; k < iterations; k++) {
    for (const [i, j, rest] of links) {
      const a = pts[i]
      const b = pts[j]
      const ws = a.w + b.w
      if (!ws) continue
      const dx = b.x - a.x
      const dy = b.y - a.y
      const d = Math.hypot(dx, dy) || 1e-6
      const f = (d - rest) / (d * ws)
      a.x += dx * f * a.w
      a.y += dy * f * a.w
      b.x -= dx * f * b.w
      b.y -= dy * f * b.w
    }
  }
}

export function spinStep(s: Spin, target: number, dt: number, drive: number) {
  s.v += (-(s.a - target) * 28 - s.v * 4.5 + drive) * dt
  s.a += s.v * dt
}

export function swingAngle(top: Pt, bottom: Pt) {
  return Math.atan2(bottom.x - top.x, bottom.y - top.y)
}

function drawMandala(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.lineWidth = Math.max(0.8, r * 0.02)
  for (const k of [1, 0.9, 0.62, 0.26]) {
    ctx.beginPath()
    ctx.arc(0, 0, r * k, 0, Math.PI * 2)
    ctx.stroke()
  }
  for (let i = 0; i < 16; i++) {
    ctx.save()
    ctx.rotate((i * Math.PI) / 8)
    ctx.beginPath()
    ctx.arc(r * 0.76, 0, r * 0.04, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
  for (let i = 0; i < 8; i++) {
    ctx.save()
    ctx.rotate((i * Math.PI) / 4)
    ctx.beginPath()
    ctx.ellipse(r * 0.44, 0, r * 0.18, r * 0.08, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }
  ctx.restore()
}

export default function LanyardBadge({
  front,
  back,
  title = "VAIBHAV JADHAV",
  subtitle = "CS ENGINEER · 2026",
  name = "Vaibhav Jadhav",
  role = "Mobile & AI Developer",
  strapText = "VAIBHAV",
  strapLabel = "MIT CSN 2026",
  strapColor = "#141414",
  inkColor = "#e5262c",
  cardColor = "#ffffff",
  flipButton = true,
  cardWidth = 210,
  height = "560px",
  className = "",
}: LanyardBadgeProps) {
  const rootRef = React.useRef<HTMLElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const cardRef = React.useRef<HTMLDivElement>(null)
  const innerRef = React.useRef<HTMLDivElement>(null)
  const flipRef = React.useRef<() => void>(() => {})

  const [showBack, setShowBack] = React.useState(false)
  const backRef = React.useRef(false)
  backRef.current = showBack

  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(q.matches)
    const onQ = (e: MediaQueryListEvent) => setReduced(e.matches)
    q.addEventListener("change", onQ)
    return () => q.removeEventListener("change", onQ)
  }, [])

  const cw = Math.max(160, Math.min(320, cardWidth))
  const ch = Math.round(cw * 1.48)
  const ringR = Math.max(6, Math.round(cw * 0.034))
  const clipH = Math.round(cw * 0.09)

  const look = React.useRef({ strapText, strapLabel, strapColor, inkColor })
  look.current = { strapText, strapLabel, strapColor, inkColor }
  const lookKey = [strapText, strapLabel, strapColor, inkColor].join("|")

  React.useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    const card = cardRef.current
    const inner = innerRef.current
    if (!root || !canvas || !card || !inner) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = 1
    let H = 1
    let strapTex: HTMLCanvasElement | null = null
    let plainTex: HTMLCanvasElement | null = null

    const spin: Spin = { a: 0, v: 0 }
    let spinTarget = backRef.current ? Math.PI : 0
    spin.a = spinTarget

    const pts: Pt[] = []
    const links: Link[] = []
    const left: number[] = []
    const right: number[] = []
    const low: number[] = []
    let iT = 0
    let iC = 0
    let strandRest = 0
    let lowLen = 0

    const add = (x: number, y: number, w: number) => {
      pts.push({ x, y, px: x, py: y, w })
      return pts.length - 1
    }

    // High segment count (14 segments) and generous slack for silky, natural soft fabric curves
    const strand = (from: number, to: number, n: number, slack: number) => {
      const a = pts[from]
      const b = pts[to]
      const rest = (Math.hypot(b.x - a.x, b.y - a.y) * slack) / n
      const list = [from]
      let last = from
      for (let i = 1; i < n; i++) {
        const k = i / n
        const idx = add(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k, 1)
        links.push([last, idx, rest])
        list.push(idx)
        last = idx
      }
      links.push([last, to, rest])
      list.push(to)
      return { list, rest }
    }

    const build = () => {
      const rect = root.getBoundingClientRect()
      W = Math.max(1, Math.round(rect.width))
      H = Math.max(1, Math.round(rect.height))
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)

      pts.length = 0
      links.length = 0
      left.length = 0
      right.length = 0
      low.length = 0

      const anchorSpan = Math.max(cw * 0.8, W * 0.38)
      const aL = add(W / 2 - anchorSpan / 2, -4, 0)
      const aR = add(W / 2 + anchorSpan / 2, -4, 0)

      // Soft natural hang height
      const bY = 55
      const bL = add(W / 2 - cw * 0.04, bY, 0.5)
      const bR = add(W / 2 + cw * 0.04, bY, 0.5)
      const buckleRest = Math.hypot(pts[bR].x - pts[bL].x, pts[bR].y - pts[bL].y)
      links.push([bL, bR, buckleRest])

      // 14 silky smooth segments per strand with 1.08 natural slack
      const sL = strand(aL, bL, 14, 1.08)
      const sR = strand(aR, bR, 14, 1.08)
      left.push(...sL.list)
      right.push(...sR.list)
      strandRest = sL.rest

      const rY = bY + 18
      iT = add(W / 2, rY, 0.8)
      links.push([bL, iT, Math.hypot(pts[iT].x - pts[bL].x, pts[iT].y - pts[bL].y)])
      links.push([bR, iT, Math.hypot(pts[iT].x - pts[bR].x, pts[iT].y - pts[bR].y)])

      iC = add(W / 2, rY + ch * 0.5, 1)
      links.push([iT, iC, ch * 0.5])

      const sLow = strand(bL, iT, 5, 1.02)
      low.push(...sLow.list)
      lowLen = sLow.rest * 5

      const Wt = Math.max(16, Math.round(cw * 0.09)) * dpr
      const Ht = 340 * dpr
      const makePatternCanvas = (withText: boolean) => {
        const c = document.createElement("canvas")
        c.width = Wt
        c.height = Ht
        const x = c.getContext("2d")
        if (!x) return null
        x.fillStyle = look.current.strapColor || "#141414"
        x.fillRect(0, 0, Wt, Ht)

        // Red side rails
        x.fillStyle = look.current.inkColor || "#e5262c"
        x.fillRect(0, 0, Math.max(2, Wt * 0.12), Ht)
        x.fillRect(Wt - Math.max(2, Wt * 0.12), 0, Math.max(2, Wt * 0.12), Ht)

        // Decorative mandalas/emblems
        x.strokeStyle = look.current.inkColor || "#e5262c"
        drawMandala(x, Wt / 2, Ht * 0.15, Wt * 0.34)
        drawMandala(x, Wt / 2, Ht * 0.85, Wt * 0.34)

        if (withText) {
          x.save()
          x.translate(Wt / 2, Ht * 0.5)
          x.rotate(-Math.PI / 2)
          x.fillStyle = "#ffffff"
          x.font = `900 ${Math.round(Wt * 0.38)}px system-ui, sans-serif`
          x.textAlign = "center"
          x.textBaseline = "middle"
          x.fillText(look.current.strapText || "VAIBHAV", 0, 0)
          x.restore()
        }
        return c
      }

      strapTex = makePatternCanvas(true)
      plainTex = makePatternCanvas(false)
    }

    const drawRibbon = (idxList: number[], widthPx: number, tex: HTMLCanvasElement | null, flip: boolean) => {
      if (!tex || idxList.length < 2) return
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const half = (widthPx * dpr) / 2
      let total = 0
      for (let i = 0; i < idxList.length - 1; i++) {
        const a = pts[idxList[i]]
        const b = pts[idxList[i + 1]]
        total += Math.hypot(b.x - a.x, b.y - a.y) * dpr
      }
      let acc = 0
      for (let i = 0; i < idxList.length - 1; i++) {
        const a = pts[idxList[i]]
        const b = pts[idxList[i + 1]]
        const ax = a.x * dpr
        const ay = a.y * dpr
        const bx = b.x * dpr
        const by = b.y * dpr
        const seg = Math.hypot(bx - ax, by - ay)
        const nx = -(by - ay) / (seg || 1)
        const ny = (bx - ax) / (seg || 1)
        const sx0 = 0
        const sx1 = tex.width
        const v0 = ((acc / total) * tex.height) % tex.height
        const v1 = (((acc + seg) / total) * tex.height) % tex.height
        ctx.save()
        ctx.beginPath()
        ctx.moveTo(ax - nx * half, ay - ny * half)
        ctx.lineTo(ax + nx * half, ay + ny * half)
        ctx.lineTo(bx + nx * half, by + ny * half)
        ctx.lineTo(bx - nx * half, by - ny * half)
        ctx.closePath()
        ctx.clip()

        const ang = Math.atan2(by - ay, bx - ax) - Math.PI / 2
        ctx.translate(ax, ay)
        ctx.rotate(ang)
        if (flip) ctx.scale(-1, 1)
        const dw = widthPx * dpr
        const dh = Math.max(1, seg)
        ctx.drawImage(tex, sx0, Math.min(v0, v1), sx1 - sx0, Math.max(2, Math.abs(v1 - v0)), -half, 0, dw, dh)
        ctx.restore()
        acc += seg
      }
    }

    const drawHardware = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const bL = pts[left[left.length - 1]]
      const bR = pts[right[right.length - 1]]
      const T = pts[iT]
      const bx = ((bL.x + bR.x) / 2) * dpr
      const by = ((bL.y + bR.y) / 2) * dpr
      const bw = Math.max(18, cw * 0.11) * dpr
      const bh = Math.max(12, cw * 0.065) * dpr

      // Buckle
      ctx.save()
      ctx.translate(bx, by)
      ctx.fillStyle = "#18181b"
      ctx.strokeStyle = "#3f3f46"
      ctx.lineWidth = 1 * dpr
      ctx.beginPath()
      ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 3 * dpr)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = look.current.inkColor
      ctx.fillRect(-bw * 0.35, -bh * 0.2, bw * 0.7, bh * 0.4)
      ctx.restore()

      // Metal Ring
      const rx = T.x * dpr
      const ry = T.y * dpr
      const rad = ringR * dpr
      ctx.save()
      ctx.translate(rx, ry)
      ctx.lineWidth = Math.max(2, rad * 0.26)
      ctx.strokeStyle = "#d4d4d8"
      ctx.beginPath()
      ctx.arc(0, 0, rad, 0, Math.PI * 2)
      ctx.stroke()
      ctx.lineWidth = Math.max(1, rad * 0.1)
      ctx.strokeStyle = "#71717a"
      ctx.stroke()
      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const sw = Math.max(15, cw * 0.09)
      drawRibbon(left, sw, strapTex, false)
      drawRibbon(right, sw, strapTex, true)
      drawRibbon(low, sw * 0.85, plainTex, false)
      drawHardware()
    }

    const place = () => {
      const T = pts[iT]
      const C = pts[iC]
      if (!T || !C) return
      const ang = swingAngle(T, C)
      card.style.transform = `translate3d(${T.x - cw / 2}px, ${T.y}px, 0) rotate(${ang}rad)`
      const turn = spin.a
      const faceTurn = ((turn % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
      const isBack = faceTurn > Math.PI / 2 && faceTurn < Math.PI * 1.5
      const shine = `${Math.round(50 + Math.sin(turn) * 40)}%`
      const dim = Math.max(0, Math.cos(turn) * 0.15)
      inner.style.setProperty("--lyd-shine", shine)
      inner.style.setProperty("--lyd-dim", String(dim))
      inner.style.transform = `rotateY(${turn}rad)`
      if (isBack !== showBack) {
        setShowBack(isBack)
      }
    }

    const flipTarget = () => {
      const next = !backRef.current
      backRef.current = next
      spinTarget = next ? Math.PI : 0
    }
    flipRef.current = flipTarget

    let drag: { id: number; ox: number; oy: number; tx: number; ty: number; moved: boolean } | null = null
    const onDown = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      drag = { id: e.pointerId, ox: x, oy: y, tx: x, ty: y, moved: false }
      try {
        card.setPointerCapture(e.pointerId)
      } catch {}
      card.style.cursor = "grabbing"
    }

    const onMove = (e: PointerEvent) => {
      if (!drag || drag.id !== e.pointerId) return
      const rect = root.getBoundingClientRect()
      drag.tx = e.clientX - rect.left
      drag.ty = e.clientY - rect.top
      if (Math.hypot(drag.tx - drag.ox, drag.ty - drag.oy) > 8) {
        drag.moved = true
      }
    }

    const onUp = (e: PointerEvent) => {
      if (!drag || drag.id !== e.pointerId) return
      const wasMoved = drag.moved
      drag = null
      try {
        card.releasePointerCapture(e.pointerId)
      } catch {}
      card.style.cursor = "grab"
      // If clicked/tapped without heavy drag, flip the card immediately!
      if (!wasMoved) {
        flipTarget()
      }
    }

    card.addEventListener("pointerdown", onDown)
    card.addEventListener("pointermove", onMove)
    card.addEventListener("pointerup", onUp)
    card.addEventListener("pointercancel", onUp)

    let raf = 0
    let lastT = performance.now()
    let acc = 0
    const STEP = 1 / 120
    const GRAVITY = 1200 // Softer gravity for natural fabric swing
    const ITER = 8 // Softer constraint iterations for flexible ribbon feel
    let t = 0

    const tick = (now: number) => {
      const delta = Math.min(0.05, (now - lastT) / 1000)
      lastT = now
      acc += delta
      let steps = 0
      while (acc >= STEP && steps < 8) {
        acc -= STEP
        steps++
        t += STEP
        if (drag) {
          const T = pts[iT]
          T.px = T.x
          T.py = T.y
          T.x += (drag.tx - T.x) * 0.35
          T.y += (drag.ty - T.y) * 0.35
        }
        const C = pts[iC]
        if (!reduced && !drag) {
          C.x += (14 * Math.sin(t * 0.5) + 6 * Math.sin(t * 1.4)) * STEP * STEP
        }
        integrate(pts, STEP, GRAVITY, 0.994) // Silky smooth damping
        solve(pts, links, ITER)
        const vx = (C.x - C.px) / STEP
        spinStep(spin, spinTarget, STEP, vx * 0.03 + (reduced ? 0 : 0.4 * Math.sin(t * 0.5)))
      }
      draw()
      place()
      raf = requestAnimationFrame(tick)
    }

    build()
    draw()
    place()
    raf = requestAnimationFrame(tick)

    const observer = new ResizeObserver(() => {
      if (Math.abs(root.clientWidth - W) < 1 && Math.abs(root.clientHeight - H) < 1) return
      build()
      draw()
      place()
    })
    observer.observe(root)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      card.removeEventListener("pointerdown", onDown)
      card.removeEventListener("pointermove", onMove)
      card.removeEventListener("pointerup", onUp)
      card.removeEventListener("pointercancel", onUp)
    }
  }, [reduced, cw, ch, ringR, clipH, lookKey])

  const face: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: cw * 0.06,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    boxShadow: "0 22px 50px -10px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.25)",
    cursor: "pointer",
  }

  const shade = (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background:
          "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%) var(--lyd-shine, 50%) 0 / 250% 100% no-repeat, rgba(0,0,0,var(--lyd-dim, 0))",
      }}
    />
  )

  const slot = (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top: cw * 0.045,
        left: "50%",
        width: cw * 0.18,
        height: cw * 0.032,
        transform: "translateX(-50%)",
        borderRadius: 999,
        background: "rgba(0,0,0,0.35)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.6)",
        zIndex: 10,
      }}
    />
  )

  return (
    <section
      ref={rootRef}
      className={"relative w-full select-none " + className}
      style={{ height, minHeight: height }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", pointerEvents: "none" }}
      />
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label="Badge. Drag to swing, click to flip."
        onClick={(e) => {
          e.stopPropagation()
          flipRef.current()
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            flipRef.current()
          }
        }}
        aria-pressed={showBack}
        className="absolute left-0 top-0 outline-none focus-visible:ring-2 focus-visible:ring-accent transition-shadow"
        style={{ width: cw, height: ch + ringR + clipH, transformOrigin: "50% 0", cursor: "grab", touchAction: "none", willChange: "transform" }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: cw * 0.08,
            height: clipH + cw * 0.04,
            transform: "translateX(-50%)",
            borderRadius: cw * 0.02,
            background: "linear-gradient(90deg, #eae4d8, #a8a090 50%, #ece6da)",
            boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
            zIndex: 10,
          }}
        />
        <div
          ref={innerRef}
          style={{ position: "absolute", left: 0, right: 0, top: ringR + clipH * 0.55, height: ch, transformStyle: "preserve-3d" }}
        >
          <div style={face}>
            {front}
            {slot}
            {shade}
          </div>
          <div style={{ ...face, transform: "rotateY(180deg)" }}>
            {back}
            {slot}
            {shade}
          </div>
        </div>
      </div>
      {flipButton && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            flipRef.current()
          }}
          aria-pressed={showBack}
          className="absolute right-2 top-2 z-20 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-3 py-1 text-xs font-mono font-medium text-foreground shadow-sm backdrop-blur transition-all hover:bg-accent/10 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
        >
          <svg viewBox="0 0 24 24" width={13} height={13} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-500 motion-reduce:transition-none" style={{ transform: showBack ? "scaleX(-1)" : "none" }}>
            <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
            <path d="M3 21v-5h5" />
          </svg>
          {showBack ? "Front" : "Flip Pass"}
        </button>
      )}
    </section>
  )
}
