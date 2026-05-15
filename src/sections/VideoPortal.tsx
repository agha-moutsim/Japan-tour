import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function VideoPortal() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── Phase 1 (0 → 50%): DISCOVER text scales up — fly through the O ──────────
  const scale       = useTransform(scrollYProgress, [0, 0.1, 0.5], [1, 1, 150])
  const maskOpacity = useTransform(scrollYProgress, [0.45, 0.65], [1, 0])

  // ── Phase 2 (55% → 80%): full video grid fades + slides in ──────────────────
  const gridOpacity = useTransform(scrollYProgress, [0.55, 0.80], [0, 1])
  const gridY       = useTransform(scrollYProgress, [0.55, 0.80], [60, 0])
  const gridScale   = useTransform(scrollYProgress, [0.55, 0.80], [0.92, 1])

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-[#0A0A0A]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#0A0A0A]">

        {/* ══════════════════════════════════════════════════════════════════════
            PHASE 1 — BACKGROUND: 5-video grid that shows through the text
            The videos sit here always. The black mask above hides them EXCEPT
            where the white DISCOVER letters punch through (mix-blend: multiply).
        ══════════════════════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 w-full h-full grid grid-cols-3 grid-rows-2 gap-0">
          {/* Top-left: wide (2 cols) — Shibuya Crossing */}
          <div className="col-span-2 row-span-1 overflow-hidden relative">
            <video autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/video1_shibuya_crossing.mp4" />
          </div>
          {/* Top-right: Shinjuku Neon */}
          <div className="col-span-1 row-span-1 overflow-hidden relative">
            <video autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/video2_shinjuku_neon.mp4" />
          </div>
          {/* Bottom-left: Bamboo Forest */}
          <div className="col-span-1 row-span-1 overflow-hidden relative">
            <video autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/video3_bamboo_forest.mp4" />
          </div>
          {/* Bottom-center: Sushi Master */}
          <div className="col-span-1 row-span-1 overflow-hidden relative">
            <video autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/video4_sushi_master.mp4" />
          </div>
          {/* Bottom-right: Mt. Fuji */}
          <div className="col-span-1 row-span-1 overflow-hidden relative">
            <video autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="/videos/video5_mt_fuji.mp4" />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            PHASE 1 — MASK: Black screen with white DISCOVER text.
            mix-blend-mode: multiply makes:
              • White text  → transparent  (video shows through)
              • Black bg    → opaque black (hides video outside letters)
            As user scrolls, the whole mask scales up (fly through the O).
            At 45–65% scroll progress, the mask fades out entirely.
        ══════════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black"
          style={{
            scale,
            opacity: maskOpacity,
            mixBlendMode: 'multiply',
            transformOrigin: '50% 50%',
            willChange: 'transform, opacity',
          }}
        >
          <h2
            className="font-display font-black uppercase leading-none tracking-tighter whitespace-nowrap select-none"
            style={{
              fontSize: 'clamp(80px, 18vw, 320px)',
              color: '#FFFFFF',
            }}
          >
            DISCOVER
          </h2>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════════════
            PHASE 2 — GRID: After the mask fades out, a clean cinematic
            video grid fades + slides up into view, driven by scroll.
        ══════════════════════════════════════════════════════════════════════ */}
        <motion.div
          className="absolute inset-0 w-full h-full flex flex-col justify-center px-4 md:px-8 py-4 md:py-8 pointer-events-none"
          style={{
            opacity: gridOpacity,
            y: gridY,
            scale: gridScale,
            willChange: 'transform, opacity',
          }}
        >
          {/* Label */}
          <p
            className="font-mono text-xs tracking-[0.35em] uppercase mb-5"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Japan — A Visual Journey
          </p>

          {/* 3-col / 2-row editorial grid */}
          <div className="grid grid-cols-3 grid-rows-2 gap-2 md:gap-3 h-[76vh]">

            {/* Row 1 — wide hero */}
            <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden relative">
              <video autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="/videos/video1_shibuya_crossing.mp4" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs tracking-widest font-mono uppercase text-white/50">Shibuya · Tokyo</span>
            </div>

            {/* Row 1 — square */}
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative">
              <video autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="/videos/video2_shinjuku_neon.mp4" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs tracking-widest font-mono uppercase text-white/50">Shinjuku Nights</span>
            </div>

            {/* Row 2 — square 1 */}
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative">
              <video autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="/videos/video3_bamboo_forest.mp4" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs tracking-widest font-mono uppercase text-white/50">Arashiyama</span>
            </div>

            {/* Row 2 — square 2 */}
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative">
              <video autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="/videos/video4_sushi_master.mp4" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs tracking-widest font-mono uppercase text-white/50">Omakase</span>
            </div>

            {/* Row 2 — square 3 */}
            <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden relative">
              <video autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="/videos/video5_mt_fuji.mp4" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs tracking-widest font-mono uppercase text-white/50">Mt. Fuji</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

