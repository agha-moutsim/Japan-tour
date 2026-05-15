import { useRef, useState, useEffect, useCallback, memo } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useVelocity,
  MotionValue,
} from 'framer-motion'
import { useIsMobile } from '../hooks/use-mobile'
import MagneticButton from '../components/MagneticButton'

// ─── Polaroid data ─────────────────────────────────────────────────────────────
const polaroids = [
  { video: '/videos/polaroid-pagoda.mp4', label: '3 cities in Japan', rotate: -4 },
  { video: '/videos/polaroid-rice-fields.mp4', label: '10 days', rotate: 2 },
  { video: '/videos/polaroid-shrine.mp4', label: 'gigabytes of photos', rotate: -2 },
  { video: '/videos/polaroid-ramen.mp4', label: 'eat ramen', rotate: 3 },
  { video: '/videos/polaroid-neon.mp4', label: 'enjoy the vibe', rotate: -1 },
]

const SPRING = { stiffness: 40, damping: 20, mass: 0.3 }

// ─── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  // ── Section-scoped scroll (Task 2) ────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // ── Scroll velocity (Task 8) ──────────────────────────────────────────────
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const clampedVelocity = useTransform(scrollVelocity, [-3000, 0, 3000], [-1, 0, 1])

  // Per-layer parallax transforms (Task 2)
  // Sky: translateY 0→15%, scale 1→1.08, blur 0→2px
  const skyY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const skyScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const skyFilter = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(2px)'])

  // Mountain back: 0→25%, scale 1→1.04
  const mountainBackY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const mountainBackScale = useTransform(scrollYProgress, [0, 1], [1, 1.04])

  // Mountain front mask layer: 0→35%
  const mountainFrontY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])

  // JAPAN text: 0→45%, opacity 1→0.7, scale 1→0.96
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.7])
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.96])

  // Velocity-reactive hero scale & blur (Task 8)
  const heroScale = useTransform(clampedVelocity, [-1, 0, 1], [1.015, 1, 1.015])
  const textScaleY = useTransform(clampedVelocity, [-1, 0, 1], [1.04, 1, 1.04])
  const velocityBlur = useTransform(clampedVelocity, [-1, 0, 1], ['blur(3px)', 'blur(0px)', 'blur(3px)'])

  // ── Mouse parallax (Task 3, desktop only) ─────────────────────────────────
  const rawMouseX = useMotionValue(0)
  const rawMouseY = useMotionValue(0)
  const mouseX = useSpring(rawMouseX, SPRING)
  const mouseY = useSpring(rawMouseY, SPRING)

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      const { innerWidth, innerHeight } = window
      // Normalize to -0.5 → +0.5
      const nx = clientX / innerWidth - 0.5
      const ny = clientY / innerHeight - 0.5
      rawMouseX.set(nx)
      rawMouseY.set(ny)
    },
    [rawMouseX, rawMouseY]
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      handlePointerMove(e.clientX, e.clientY)
    },
    [handlePointerMove]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    },
    [handlePointerMove]
  )

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [handleMouseMove, handleTouchMove])

  // Derived mouse transforms per layer (Task 3)
  const japanMouseX = useTransform(mouseX, (v) => v * 8)
  const japanMouseY = useTransform(mouseY, (v) => v * 4)
  const mountainMouseX = useTransform(mouseX, (v) => v * 4)
  const kimonoMouseX = useTransform(mouseX, (v) => v * 12)
  const kimonoMouseY = useTransform(mouseY, (v) => v * 8)
  const polaroidMouseX = useTransform(mouseX, (v) => v * 14)
  const polaroidMouseRotate = useTransform(mouseX, (v) => v * 2)

  // ── Scroll to contact ─────────────────────────────────────────────────────
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '700px' }}
    >
      {/* ── LAYER 1: Sky Background (lowest) (Task 1 & 2) ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          y: skyY,
          scale: skyScale,
          filter: skyFilter,
          willChange: 'transform, filter',
        }}
      >
        <img
          src="/images/hero-mountains.jpg"
          alt="Misty Japanese mountains at dawn"
          className="w-full h-full object-cover"
          style={{ transform: 'translate3d(0,0,0)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]/20" />
      </motion.div>

      {/* ── LAYER 1.5: Mountain Back (Task 2) ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          y: mountainBackY,
          scale: mountainBackScale,
          x: mountainMouseX,
          // Removed willChange: transform because mask-image + will-change causes massive scroll lag
          maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 20%, black 40%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 20%, black 40%, black 100%)',
        }}
      >
        <img
          src="/images/hero-mountains.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ transform: 'translate3d(0,0,0)' }}
        />
      </motion.div>

      {/* ── LAYER 2: JAPAN Typography (behind mountain peaks) (Task 1 & 8) ────────────── */}
      <motion.div
        className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none"
        style={{
          y: textY,
          scale: textScale,
          x: japanMouseX,
          willChange: 'transform',
        }}
      >
        <motion.h1
          className="font-display font-extralight uppercase text-[#FAFAFA] text-center select-none"
          style={{
            fontSize: 'clamp(100px, 18vw, 280px)',
            letterSpacing: '-0.02em',
            lineHeight: 0.85,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)', // Dramatically reduced blur radius to fix scroll lag
            marginTop: '-5vh',
            opacity: textOpacity,
            scale: heroScale,
            scaleY: textScaleY,
            filter: velocityBlur,
            y: japanMouseY,
            willChange: 'transform', // Removed filter from willChange to save GPU memory
            backfaceVisibility: 'hidden',
          }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          JAPAN
        </motion.h1>
      </motion.div>

      {/* ── LAYER 3: Mountain front mask (OVER text, creates depth) (Task 1) ──────── */}
      <motion.div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          y: mountainFrontY,
          x: mountainMouseX,
          // Removed willChange: transform to fix massive scroll lag with mask-image
          maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 45%, black 50%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 45%, black 50%, black 100%)',
        }}
      >
        <img
          src="/images/hero-mountains.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ transform: 'translate3d(0,0,0)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-transparent" />
      </motion.div>

      {/* ── LAYER 4: Kimono Figure (highest, visually anchored) (Task 2 & 3) ───────────── */}
      <motion.div
        className="absolute bottom-0 right-[5%] md:right-[8%] z-[4] pointer-events-none"
        style={{
          width: 'clamp(200px, 25vw, 400px)',
          x: kimonoMouseX,
          y: kimonoMouseY,
          willChange: 'transform',
        }}
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      >
        <motion.img
          src="/images/hero-kimono-figure.png"
          alt="Woman in vibrant floral kimono gazing into the valley"
          className="w-full h-auto object-contain"
          style={{ maxHeight: '75vh', willChange: 'transform' }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* ── LAYER 5: Polaroid Strip (z-[10]) ─────────────────────────────── */}
      <motion.div
        className="absolute bottom-20 md:bottom-24 left-6 md:left-12 z-[10] flex gap-3 md:gap-4"
        style={{
          // Task 2: translateX 0 -> -180px, rotate 0 -> -3deg
          x: useTransform(scrollYProgress, [0, 1], [0, -180]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, -3]),
          willChange: 'transform',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {polaroids.map((item, i) => (
          <PolaroidCard
            key={i}
            index={i}
            video={item.video}
            label={item.label}
            rotate={item.rotate}
            delay={i * 0.1}
            mouseX={polaroidMouseRotate}
            progress={scrollYProgress}
          />
        ))}
      </motion.div>

      {/* ── Desktop Book Button ────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-28 md:bottom-32 right-[20%] md:right-[30%] z-[10] hidden md:block"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <MagneticButton
          onClick={scrollToContact}
          className="bg-[#F5E8D3] text-[#0A0A0A] text-small-caps rounded-full px-8 md:px-10 py-4 backdrop-blur-sm hover:bg-[#D4F87A] transition-colors duration-300"
        >
          Book
        </MagneticButton>
      </motion.div>

      {/* ── Mobile Book Button ────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-48 left-6 z-[10] md:hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <button
          onClick={scrollToContact}
          className="bg-[#F5E8D3] text-[#0A0A0A] font-mono text-[10px] tracking-[0.2em] uppercase font-bold rounded-full px-8 py-3 hover:bg-[#D4F87A] transition-colors duration-300"
        >
          Book Journey
        </button>
      </motion.div>
    </section>
  )
}

// ─── PolaroidCard ──────────────────────────────────────────────────────────────
const PolaroidCard = memo(function PolaroidCard({
  index,
  video,
  label,
  rotate,
  delay,
  mouseX,
  progress,
}: {
  index: number
  video: string
  label: string
  rotate: number
  delay: number
  mouseX?: MotionValue<number>
  progress: MotionValue<number>
}) {
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Task 2: each card should drift differently
  const driftY = useTransform(progress, [0, 1], [0, index * -15])

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(() => {})
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [isHovered])

  return (
    <motion.div
      className="polaroid-card flex-shrink-0"
      style={{
        width: 'clamp(90px, 10vw, 120px)',
        rotate: mouseX ? undefined : rotate,
        y: driftY,
        willChange: 'transform',
      }}
      initial={{ opacity: 0, y: 24, rotate: rotate - 5 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{ duration: 0.7, delay: 0.8 + delay, ease: [0.16, 1, 0.3, 1] }}
      // Task 10: whileHover with sakura glow
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(255,184,197,0.22)',
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="hover"
    >
      <div className="aspect-[4/5] relative overflow-hidden rounded-t-lg">
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          preload="metadata"
        />
        {/* Subtle image scale on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="p-2">
        <span className="text-[11px] text-[#888888] font-body">{label}</span>
      </div>
    </motion.div>
  )
})

