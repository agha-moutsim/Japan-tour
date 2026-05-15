import React, { useRef } from 'react'
import { MotionValue, motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'

// ─── Torii Gate SVG ────────────────────────────────────────────────────────────
// Redesigned with THIN pillars so the gate is a slim red frame, not a solid block.
// 200×300 viewBox (portrait) — most pixels are transparent; only thin red lines show.
const ToriiGateSVG = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
    style={{ filter: 'drop-shadow(0 0 12px rgba(255,42,42,0.9))' }}
  >
    {/* ─ Top curved roof ─ */}
    <path d="M 5 90  Q 100 55 195 90  L 195 100 Q 100 65 5 100 Z" fill="#FF3333" />
    {/* ─ Second cross-beam (narrower) ─ */}
    <rect x="38" y="120" width="124" height="7" rx="2" fill="#FF3333" />
    {/* ─ Left pillar — thin (12 units of 200 = 6%) ─ */}
    <rect x="44"  y="85" width="12" height="215" fill="#FF3333" />
    {/* ─ Right pillar — thin ─ */}
    <rect x="144" y="85" width="12" height="215" fill="#FF3333" />
    {/* ─ Center crown ─ */}
    <rect x="95" y="120" width="10" height="18" fill="#FF3333" />
    {/* ─ Pillar bases ─ */}
    <rect x="40"  y="290" width="20" height="10" rx="2" fill="#991111" />
    <rect x="140" y="290" width="20" height="10" rx="2" fill="#991111" />
  </svg>
)

// ─── GateItem — own component so hooks are valid ───────────────────────────────
function GateItem({
  scrollYProgress,
  index,
  total,
}: {
  scrollYProgress: MotionValue<number>
  index: number
  total: number
}) {
  const RAW_START = (index / total) * 1.2 - 0.5   // -0.5 → +0.7
  const RAW_END   = RAW_START + 0.40

  // Clamp to [0,1] — WAAPI requires monotonically non-decreasing values
  const START = Math.max(0, Math.min(1, RAW_START))
  const END   = Math.max(START + 0.02, Math.min(1, RAW_END))

  // Gates that should already be visible at scroll=0 start at their mid-progress scale
  const t0         = RAW_START < 0 ? Math.min(1, -RAW_START / (RAW_END - RAW_START)) : 0
  const INIT_SCALE = 0.05 + t0 * (5.0 - 0.05)
  const INIT_VIS   = RAW_START < 0 && RAW_END > 0

  // Scale caps at 5x — large enough to feel immersive, small enough pillars stay off-screen
  const scale   = useTransform(scrollYProgress, [START, END], [INIT_SCALE, 5.0])
  const opacity = useTransform(scrollYProgress, [START, END], [INIT_VIS ? 1 : 0, 0])

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        scale,
        opacity,
        zIndex: total - index,
        // 50% 40% keeps the gate ARCH (the walkthrough hole) centered on screen
        // so at max scale the thin pillars slide off left/right — clipped by overflow-hidden
        transformOrigin: '50% 40%',
      }}
    >
      {/* Gate sized so pillars are just 6% of total width — at max scale they clip off-screen */}
      <ToriiGateSVG className="w-[60vw] md:w-[45vw] max-w-[500px]" />
    </motion.div>
  )
}

// ─── Holographic Ticket ────────────────────────────────────────────────────────
function HolographicTicket() {
  const ref = useRef<HTMLDivElement>(null)
  const x   = useMotionValue(0)
  const y   = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), { stiffness: 140, damping: 18 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), { stiffness: 140, damping: 18 })

  const bgX = useTransform(x, [-0.5, 0.5], [0, 100])
  const bgY = useTransform(y, [-0.5, 0.5], [0, 100])
  const backgroundPosition = useTransform(
    [bgX, bgY] as [MotionValue<number>, MotionValue<number>],
    ([lx, ly]: number[]) => `${lx}% ${ly}%`
  )

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width  - 0.5)
    y.set((e.clientY - r.top)  / r.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="relative w-[calc(100vw-48px)] max-w-[440px] rounded-3xl cursor-pointer group"
      style={{
        aspectRatio: '3/4',
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glass body */}
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col p-7"
        style={{
          background: 'rgba(8, 8, 12, 0.80)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          transform: 'translateZ(20px)',
        }}
      >
        {/* Holographic foil */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity duration-700"
          style={{
            mixBlendMode: 'color-dodge',
            backgroundImage:
              'linear-gradient(120deg, transparent 15%, rgba(255,184,197,0.9) 32%, rgba(245,199,110,0.9) 44%, transparent 55%, rgba(135,206,235,0.8) 66%, transparent 78%)',
            backgroundSize: '350% 350%',
            backgroundPosition,
          }}
        />

        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
          <div>
            <p className="font-mono text-[9px] tracking-[0.4em] text-white/35 uppercase mb-1">Japan Tours · First Class</p>
            <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tighter">BOARDING PASS</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-base">✈️</div>
        </div>

        {/* Route */}
        <div className="flex items-center justify-between my-5">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-display font-bold text-white leading-none">YOU</p>
            <p className="font-mono text-[9px] text-white/35 uppercase tracking-widest mt-1">Origin</p>
          </div>
          <div className="flex-1 flex items-center px-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="mx-2 text-sm text-white/30">✈</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-display font-bold text-[#FFB8C5] leading-none">JPN</p>
            <p className="font-mono text-[9px] text-[#FFB8C5]/40 uppercase tracking-widest mt-1">Tokyo</p>
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 space-y-3 border-t border-white/8 pt-4">
          {[
            ['Flight',   'AW-2026'],
            ['Gate',     'TORII-∞'],
            ['Class',    'First'],
            ['Departs',  'NOW'],
          ].map(([lbl, val]) => (
            <div key={lbl} className="flex justify-between items-center">
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">{lbl}</span>
              <span className="font-mono text-xs text-white/80">{val}</span>
            </div>
          ))}
        </div>

        {/* Divider with circles (perforated ticket look) */}
        <div className="relative flex items-center my-4">
          <div className="absolute -left-7 w-5 h-5 rounded-full bg-black" />
          <div className="flex-1 border-t border-dashed border-white/10" />
          <div className="absolute -right-7 w-5 h-5 rounded-full bg-black" />
        </div>

        {/* CTA */}
        <button className="w-full py-3 rounded-xl bg-white text-black font-mono text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-[#FFB8C5] hover:shadow-[0_0_30px_rgba(255,184,197,0.35)] transition-all duration-300 relative z-10">
          Confirm Booking →
        </button>
      </div>
    </motion.div>
  )
}

// ─── Main Section ──────────────────────────────────────────────────────────────
const TOTAL_GATES = 22

export default function UltimateCTA() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const gatesOpacity  = useTransform(scrollYProgress, [0.68, 0.82], [1, 0])
  const ticketOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1])
  const ticketScale   = useTransform(scrollYProgress, [0.72, 0.90], [0.86, 1])
  const ticketY       = useTransform(scrollYProgress, [0.72, 0.90], [50, 0])

  return (
    // 300vh — just enough for the full tunnel + ticket, Footer appears quickly after
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">

        {/* Red ambient glow at center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,42,42,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Torii gate tunnel */}
        <motion.div className="absolute inset-0" style={{ opacity: gatesOpacity }}>
          {Array.from({ length: TOTAL_GATES }).map((_, i) => (
            <GateItem
              key={i}
              scrollYProgress={scrollYProgress}
              index={i}
              total={TOTAL_GATES}
            />
          ))}
        </motion.div>

        {/* Holographic boarding pass */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-50"
          style={{ opacity: ticketOpacity, scale: ticketScale, y: ticketY }}
        >
          <HolographicTicket />
        </motion.div>

        {/* Subtle label at the start */}
        <motion.p
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.4em] uppercase text-white/25"
          style={{ opacity: gatesOpacity }}
        >
          Scroll to enter · Japan Tours
        </motion.p>
      </div>
    </section>
  )
}
