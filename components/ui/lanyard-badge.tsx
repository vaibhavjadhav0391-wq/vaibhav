"use client"

import * as React from "react"

/**
 * Lanyard Badge - an event badge hanging from a patterned lanyard.
 *
 * Two strands come down from above the frame and meet at a side-release
 * buckle; a short strap and a ring hold the card. The strap is a verlet rope
 * drawn as a textured ribbon on a 2D canvas. The card is real HTML turned in 3D with
 * CSS, so both faces can hold anything.
 */

export interface LanyardBadgeProps {
  /** Card front. Replaces the built-in front entirely. */
  front?: React.ReactNode
  /** Card back. Replaces the built-in back entirely. */
  back?: React.ReactNode
  /** Built-in front: the event title. */
  title?: string
  /** Built-in front: the line under the title. */
  subtitle?: string
  /** Built-in back: the wearer's name. */
  name?: string
  /** Built-in back: the wearer's role. */
  role?: string
  /** Script line printed along the strap. */
  strapText?: string
  /** Condensed label printed along the strap, between the script lines. */
  strapLabel?: string
  /** Strap colour, #rrggbb. */
  strapColor?: string
  /** Ornament and print colour, on the strap and the built-in card. */
  inkColor?: string
  /** Built-in card stock colour. */
  cardColor?: string
  /** Show the "Show back / Show front" button in the top corner. */
  flipButton?: boolean
  /** Card width in px. Height follows at 3:2, strap width at a tenth. */
  cardWidth?: number
  /** Root height. A definite length - never a percentage. */
  height?: string
  /** Extra root class names. */
  className?: string
}

// #region physics
export type Pt = { x: number; y: number; px: number; py: number; w: number }
export type Link = [number, number, number]
export type Spin = { a: number; v: number }

/** Verlet step. `w` is inverse mass; 0 pins a point in place. */
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

/** Relax distance constraints, heavier points moving less. */
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

/**
 * The card's turn on the ring.
 */
export function spinStep(s: Spin, target: number, dt: number, drive: number) {
  s.v += (-(s.a - target) * 22 - s.v * 3.8 + drive) * dt
  s.a += s.v * dt
}

/** How far the card swings from hanging straight down, in radians. Right is positive. */
export function swingAngle(top: Pt, bottom: Pt) {
  return Math.atan2(bottom.x - top.x, bottom.y - top.y)
}
// #endregion

const DISPLAY = '"Oswald", "Bebas Neue", "Arial Narrow", Impact, sans-serif'
const SCRIPT = '"Segoe Script", "Brush Script MT", "Snell Roundhand", cursive'

/** A mandala: rings, petals, a bead circle and a flower in the middle. */
function drawMandala(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.lineWidth = Math.max(0.8, r * 0.018)
  for (const k of [1, 0.9, 0.62, 0.26]) {
    ctx.beginPath()
    ctx.arc(0, 0, r * k, 0, Math.PI * 2)
    ctx.stroke()
  }
  for (let i = 0; i < 16; i++) {
    ctx.save()
    ctx.rotate((i * Math.PI) / 8)
    ctx.beginPath()
    ctx.arc(r * 0.76, 0, r * 0.035, 0, Math.PI * 2)
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

/** Vector ornament for the card face. */
function Ornament({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} style={style}>
      <circle cx={100} cy={100} r={95} strokeWidth={1} strokeDasharray="3 3" />
      <circle cx={100} cy={100} r={80} strokeWidth={2} />
      <circle cx={100} cy={100} r={55} strokeWidth={1} />
      <circle cx={100} cy={100} r={30} strokeWidth={1.5} />
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1={100 + Math.cos((i * Math.PI) / 6) * 55}
          y1={100 + Math.sin((i * Math.PI) / 6) * 55}
          x2={100 + Math.cos((i * Math.PI) / 6) * 80}
          y2={100 + Math.sin((i * Math.PI) / 6) * 80}
          strokeWidth={1}
        />
      ))}
      <circle cx={100} cy={100} r={8} fill="currentColor" />
    </svg>
  )
}

/** Directional arrow graphic for badge edges. */
function Arrow({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 20 200" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} style={style}>
      <path d="M10 0v190M3 180l7 15 7-15" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function LanyardBadge({
  front,
  back,
  title = "VAIBHAV JADHAV",
  subtitle = "CS ENGINEER · 2026",
  name = "Vaibhav Jadhav",
  role = "Mobile & AI Developer",
  strapText = "vaibhav jadhav · portfolio",
  strapLabel = "MIT CSN 2026",
  strapColor = "#141414",
  inkColor = "#e5262c",
  cardColor = "#ffffff",
  flipButton = true,
  cardWidth = 230,
  height = "580px",
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

  const cw = Math.max(160, Math.min(360, cardWidth))
  const ch = Math.round(cardWidth * 1.5)
  const ringR = Math.max(7, Math.round(cw * 0.036))
  const clipH = Math.round(cw * 0.1)

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

      const anchorSpan = Math.max(cw * 0.9, W * 0.38)
      const aL = add(W / 2 - anchorSpan / 2, -10, 0)
      const aR = add(W / 2 + anchorSpan / 2, -10, 0)
      
      // bY & rY tuned so the card sits perfectly centered with full visibility of top and bottom
      const bY = Math.min(H * 0.15, Math.max(45, ch * 0.20))
      const bL = add(W / 2 - cw * 0.045, bY, 0.4)
      const bR = add(W / 2 + cw * 0.045, bY, 0.4)
      const buckleRest = Math.hypot(pts[bR].x - pts[bL].x, pts[bR].y - pts[bL].y)
      links.push([bL, bR, buckleRest])

      const sL = strand(aL, bL, 9, 1.04)
      const sR = strand(aR, bR, 9, 1.04)
      left.push(...sL.list)
      right.push(...sR.list)
      strandRest = sL.rest

      const rY = bY + Math.max(18, ch * 0.11)
      iT = add(W / 2, rY, 0.8)
      links.push([bL, iT, Math.hypot(pts[iT].x - pts[bL].x, pts[iT].y - pts[bL].y)])
      links.push([bR, iT, Math.hypot(pts[iT].x - pts[bR].x, pts[iT].y - pts[bR].y)])

      iC = add(W / 2, rY + ch * 0.6, 1)
      links.push([iT, iC, ch * 0.6])

      const sLow = strand(bL, iT, 4, 1.0)
      low.push(...sLow.list)
      lowLen = sLow.rest * 4

      const Wt = Math.max(16, Math.round(cw * 0.09)) * dpr
      const Ht = 360 * dpr
      const makePatternCanvas = (withText: boolean) => {
        const c = document.createElement("canvas")
        c.width = Wt
        c.height = Ht
        const x = c.getContext("2d")
        if (!x) return null
        x.fillStyle = look.current.strapColor
        x.fillRect(0, 0, Wt, Ht)
        x.fillStyle = look.current.inkColor
        x.strokeStyle = look.current.inkColor
        x.lineWidth = Math.max(1, dpr)
        x.strokeRect(Wt * 0.08, 0, Wt * 0.84, Ht)
        drawMandala(x, Wt / 2, Ht * 0.2, Wt * 0.38)
        drawMandala(x, Wt / 2, Ht * 0.7, Wt * 0.38)
        if (withText) {
          x.save()
          x.translate(Wt / 2, Ht * 0.45)
          x.rotate(-Math.PI / 2)
          x.font = `700 ${Math.round(Wt * 0.36)}px ${SCRIPT}`
          x.textAlign = "center"
          x.textBaseline = "middle"
          x.fillText(look.current.strapText, 0, 0)
          x.restore()
        }
        return c
      }

      strapTex = makePatternCanvas(true)
      plainTex = makePatternCanvas(false)
    }

    const ribbon = (chain: number[], tex: HTMLCanvasElement, rest: number, light: number) => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const Wt = tex.width
      const k = Wt / (Math.max(16, Math.round(cw * 0.09)) * dpr)
      let v = 0
      for (let i = 0; i < chain.length - 1; i++) {
        const a = pts[chain[i]]
        const b = pts[chain[i + 1]]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const segLen = Math.hypot(dx, dy)
        if (segLen < 1e-3) continue
        const nx = -dy / segLen
        const ny = dx / segLen
        const tx = dx / segLen
        const ty = dy / segLen
        const v0 = (v * dpr) % tex.height
        const dv = rest * dpr
        v += rest
        ctx.save()
        ctx.setTransform(nx, ny, tx * k, ty * k, a.x * dpr - (nx * Wt) / 2 - tx * k * v0, a.y * dpr - (ny * Wt) / 2 - ty * k * v0)
        const src = Math.min(dv + 1.5, tex.height - v0)
        if (src > 0) ctx.drawImage(tex, 0, v0, Wt, src, 0, v0, Wt, src)
        const shade = 0.22 * (1 - Math.max(0, nx * light))
        ctx.fillStyle = "rgba(0,0,0," + shade.toFixed(3) + ")"
        ctx.fillRect(0, v0, Wt, src)
        ctx.restore()
      }
    }

    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (!strapTex || !plainTex) return
      ctx.imageSmoothingEnabled = true
      ribbon(left, strapTex, strandRest, -1)
      ribbon(right, strapTex, strandRest, 1)
      ribbon(low, plainTex, (lowLen * 1) / 3, 0)

      // Ring
      const T = pts[iT]
      ctx.save()
      ctx.setTransform(dpr, 0, 0, dpr, T.x * dpr, T.y * dpr)
      ctx.lineWidth = Math.max(2, ringR * 0.25)
      ctx.strokeStyle = "#e5ded2"
      ctx.beginPath()
      ctx.arc(0, 0, ringR, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }

    const place = () => {
      const T = pts[iT]
      const C = pts[iC]
      const swing = swingAngle(T, C)
      card.style.transform =
        "translate3d(" + (T.x - cw / 2).toFixed(2) + "px," + (T.y + ringR).toFixed(2) + "px,0) rotate(" + (-swing).toFixed(4) + "rad)"
      inner.style.transform = "perspective(1100px) rotateY(" + spin.a.toFixed(4) + "rad)"
      const edge = 1 - Math.abs(Math.cos(spin.a))
      inner.style.setProperty("--lyd-dim", (edge * 0.5).toFixed(3))
      inner.style.setProperty("--lyd-shine", (50 + Math.sin(spin.a) * 70 + swing * 90).toFixed(1) + "%")
    }

    // ---- interaction -----------------------------------------------------
    type Drag = {
      id: number
      ox: number
      oy: number
      tx: number
      ty: number
      sx: number
      sy: number
      startTime: number
      moved: boolean
    }
    let drag: Drag | null = null
    let lastFlipTime = 0

    const local = (e: PointerEvent) => {
      const r = root.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top]
    }

    const flip = () => {
      const now = performance.now()
      if (now - lastFlipTime < 180) return
      lastFlipTime = now
      spinTarget = spinTarget === 0 ? Math.PI : 0
      setShowBack(spinTarget !== 0)
    }
    flipRef.current = flip

    const onDown = (e: PointerEvent) => {
      if (e.button > 0) return
      const [x, y] = local(e)
      const T = pts[iT]
      drag = {
        id: e.pointerId,
        ox: T.x - x,
        oy: T.y - y,
        tx: T.x,
        ty: T.y,
        sx: x,
        sy: y,
        startTime: performance.now(),
        moved: false,
      }
      pts[iT].w = 0
      try {
        card.setPointerCapture(e.pointerId)
      } catch {
        // ignore
      }
      card.style.cursor = "grabbing"
    }

    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const [x, y] = local(e)
      drag.tx = x + drag.ox
      drag.ty = y + drag.oy
      if (Math.hypot(x - drag.sx, y - drag.sy) > 12) {
        drag.moved = true
      }
    }

    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const elapsed = performance.now() - drag.startTime
      if (!drag.moved || elapsed < 250) {
        flip()
      }
      drag = null
      pts[iT].w = 0.8
      card.style.cursor = "grab"
    }

    card.addEventListener("pointerdown", onDown)
    card.addEventListener("pointermove", onMove)
    card.addEventListener("pointerup", onUp)
    card.addEventListener("pointercancel", onUp)

    // ---- loop --------------------------------------------------------------
    let raf = 0
    let last = performance.now()
    let acc = 0
    let t = 0
    const STEP = 1 / 120
    const GRAVITY = 980
    const ITER = 8

    const tick = (now: number) => {
      dt = Math.min(0.05, (now - last) / 1000)
      acc += dt
      last = now
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
          C.x += (20 * Math.sin(t * 0.7) + 10 * Math.sin(t * 1.9)) * STEP * STEP
        }
        integrate(pts, STEP, GRAVITY, 0.992)
        solve(pts, links, ITER)
        const vx = (C.x - C.px) / STEP
        spinStep(spin, spinTarget, STEP, vx * 0.03 + (reduced ? 0 : 0.6 * Math.sin(t * 0.5)))
      }
      draw()
      place()
      raf = requestAnimationFrame(tick)
    }
    let dt = 0
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
        top: cw * 0.05,
        left: "50%",
        width: cw * 0.2,
        height: cw * 0.035,
        transform: "translateX(-50%)",
        borderRadius: 999,
        background: "rgba(0,0,0,0.35)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.6)",
        zIndex: 10,
      }}
    />
  )

  const s = cw / 240

  const defaultFront = (
    <div className="relative h-full w-full" style={{ background: cardColor, color: inkColor }}>
      <Ornament className="absolute" style={{ width: 300 * s, right: -130 * s, top: 100 * s, maxWidth: "none" }} />
      <Ornament className="absolute" style={{ width: 210 * s, left: -40 * s, bottom: -70 * s, maxWidth: "none", opacity: 0.8 }} />
      <Arrow className="absolute" style={{ width: 14 * s, height: 250 * s, left: 26 * s, top: 110 * s, transform: "rotate(-14deg)", maxWidth: "none" }} />
      <div className="absolute" style={{ left: 22 * s, top: 34 * s, right: 22 * s }}>
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 25 * s, lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.01em" }}>
          {title}
        </div>
        <div style={{ fontSize: 6.5 * s, marginTop: 6 * s, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.85 }}>
          {subtitle}
        </div>
      </div>
    </div>
  )

  const defaultBack = (
    <div className="relative h-full w-full" style={{ background: cardColor }}>
      <Ornament className="absolute" style={{ width: 150 * s, right: -30 * s, top: 30 * s, color: inkColor, opacity: 0.6, maxWidth: "none" }} />
      <div className="absolute" style={{ left: 22 * s, top: 70 * s, color: strapColor }}>
        <Ornament style={{ width: 26 * s, color: inkColor }} />
        <div style={{ width: 16 * s, height: 2 * s, background: strapColor, margin: (14 * s) + "px 0 " + (8 * s) + "px" }} />
        <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 17 * s, lineHeight: 1.05, textTransform: "uppercase" }}>{name}</div>
        <div style={{ fontSize: 7 * s, marginTop: 3 * s, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.7 }}>{role}</div>
      </div>
      <div className="absolute overflow-hidden" style={{ left: 0, right: 0, bottom: 0, height: "44%", background: strapColor, borderTopLeftRadius: 40 * s, color: cardColor }}>
        <Ornament className="absolute" style={{ width: 230 * s, left: -20 * s, top: -40 * s, opacity: 0.85, maxWidth: "none" }} />
        <Arrow className="absolute" style={{ width: 12 * s, height: 220 * s, left: 150 * s, top: -40 * s, transform: "rotate(62deg)", maxWidth: "none" }} />
      </div>
    </div>
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
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", maxWidth: "none", display: "block", pointerEvents: "none" }}
      />
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label="Badge. Drag to swing, press to flip."
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
        {/* badge clip: hooks the ring, bites the card */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            width: cw * 0.08,
            height: clipH + cw * 0.05,
            transform: "translateX(-50%)",
            borderRadius: cw * 0.02,
            background: "linear-gradient(90deg, #eae4d8, #a8a090 50%, #ece6da)",
            boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
            zIndex: 10,
          }}
        />
        <div
          ref={innerRef}
          style={{ position: "absolute", left: 0, right: 0, top: ringR + clipH * 0.6, height: ch, transformStyle: "preserve-3d" }}
        >
          <div style={face}>
            {front ?? defaultFront}
            {slot}
            {shade}
          </div>
          <div style={{ ...face, transform: "rotateY(180deg)" }}>
            {back ?? defaultBack}
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
          className="absolute right-2 top-2 z-20 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-3 py-1 text-xs font-mono font-medium text-foreground shadow-sm backdrop-blur transition-all hover:bg-accent/10 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
