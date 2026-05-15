import { useRef, useState, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'

// ─── Package data ──────────────────────────────────────────────────────────────
const packages = [
  {
    id: 'classic',
    tier: 'Classic',
    kanji: '古典',
    price: '$2,400',
    duration: '7 Days',
    tagline: 'The Essential Japan',
    description: 'The perfect first encounter with Japan. Explore Tokyo\'s electric energy, glide through bamboo groves in Kyoto, and witness Mt. Fuji at dawn.',
    features: ['Tokyo city deep-dive', 'Kyoto temple circuit', 'Mt. Fuji sunrise hike', 'Bullet train pass', 'Boutique hotel stays', 'Local guide — 3 days'],
    glareColor: 'from-[#D4F87A]/20 via-transparent to-[#F5C76E]/20',
    borderColor: 'rgba(212, 248, 122, 0.15)',
    accentColor: '#D4F87A',
    badge: null,
  },
  {
    id: 'premium',
    tier: 'Premium',
    kanji: '上質',
    price: '$4,200',
    duration: '10 Days',
    tagline: 'The Full Immersion',
    description: 'Go deeper. Add Osaka\'s legendary food scene, a night in a mountain onsen ryokan, and a private tea ceremony in a 400-year-old garden.',
    features: ['Everything in Classic', 'Osaka food marathon', 'Private onsen ryokan', 'Tea ceremony — private', 'Nara deer sanctuary', 'Local guide — full trip', 'Airport transfers'],
    glareColor: 'from-[#FFB8C5]/25 via-[#D4F87A]/10 to-[#F5C76E]/25',
    borderColor: 'rgba(255, 184, 197, 0.25)',
    accentColor: '#FFB8C5',
    badge: 'Most Popular',
  },
  {
    id: 'luxury',
    tier: 'Luxury',
    kanji: '贅沢',
    price: '$7,800',
    duration: '14 Days',
    tagline: 'The Masterpiece',
    description: 'An exclusive, fully bespoke journey. Private access, Michelin experiences, helicopter over Fuji, and doors that money cannot normally open.',
    features: ['Everything in Premium', 'Michelin 3-star dinner', 'Helicopter over Mt. Fuji', 'Private Shinkansen car', 'Sumo backstage pass', 'Dedicated concierge 24/7', 'Private villa — 3 nights'],
    glareColor: 'from-[#F5C76E]/30 via-transparent to-[#FFB8C5]/30',
    borderColor: 'rgba(245, 199, 110, 0.3)',
    accentColor: '#F5C76E',
    badge: 'Exclusive',
  },
]

// ─── Reusable spring config ────────────────────────────────────────────────────
const SPRING = { stiffness: 200, damping: 20, mass: 0.5 }

// ─── Single Tilt Card ──────────────────────────────────────────────────────────
function TiltCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })

  const rotateX = useSpring(0, SPRING)
  const rotateY = useSpring(0, SPRING)
  const scale = useSpring(1, SPRING)

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current
    if (!card) return

    // Read rect once per move — cheap
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    // Normalize: -1 to +1
    const nx = (clientX - cx) / (rect.width / 2)
    const ny = (clientY - cy) / (rect.height / 2)

    // Tilt max ±15 degrees
    rotateX.set(-ny * 15)
    rotateY.set(nx * 15)

    // Update glare position as a percentage
    setGlarePos({
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    })
  }, [rotateX, rotateY])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerMove(e.clientX, e.clientY)
  }, [handlePointerMove])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY)
    }
  }, [handlePointerMove])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    scale.set(1.03)
  }, [scale])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }, [rotateX, rotateY, scale])

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
        onTouchCancel={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="relative rounded-2xl overflow-hidden cursor-pointer"
      >
        {/* ── Card background ── */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'rgba(10, 10, 10, 0.8)',
            border: `1px solid ${pkg.borderColor}`,
            backdropFilter: 'blur(12px)',
          }}
        />

        {/* ── Holographic glare sheen ── */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 200px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.12) 0%, transparent 70%)`,
          }}
        />

        {/* ── Corner gradient accent ── */}
        <div
          className={`absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br ${pkg.glareColor}`}
        />

        {/* ── Content ── */}
        <div className="relative z-10 p-8 flex flex-col h-full">

          {/* Badge */}
          {pkg.badge && (
            <div
              className="self-start mb-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase"
              style={{ background: pkg.accentColor, color: '#0A0A0A' }}
            >
              {pkg.badge}
            </div>
          )}

          {/* Kanji watermark */}
          <div
            className="absolute top-6 right-8 font-display text-[5rem] leading-none pointer-events-none select-none"
            style={{ color: pkg.accentColor, opacity: 0.08 }}
          >
            {pkg.kanji}
          </div>

          {/* Tier + Duration */}
          <div className="flex items-start justify-between mb-2">
            <span
              className="font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: pkg.accentColor }}
            >
              {pkg.tier}
            </span>
            <span className="font-mono text-xs text-[#FAFAFA]/40 tracking-widest">
              {pkg.duration}
            </span>
          </div>

          {/* Price */}
          <div className="mb-1">
            <span className="font-display text-5xl md:text-6xl font-light text-[#FAFAFA] tracking-tight">
              {pkg.price}
            </span>
            <span className="text-[#FAFAFA]/40 text-sm ml-2">/ person</span>
          </div>

          {/* Tagline */}
          <p className="font-editorial italic text-xl text-[#FAFAFA]/60 mb-4">
            {pkg.tagline}
          </p>

          {/* Divider */}
          <div className="h-px mb-5" style={{ background: `${pkg.accentColor}30` }} />

          {/* Description */}
          <p className="text-sm text-[#FAFAFA]/50 leading-relaxed mb-6">
            {pkg.description}
          </p>

          {/* Feature list */}
          <ul className="space-y-2 mb-8 flex-1">
            {pkg.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-[#FAFAFA]/70">
                <span style={{ color: pkg.accentColor }} className="text-xs">✦</span>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            className="w-full py-3.5 rounded-xl font-mono text-sm tracking-[0.2em] uppercase font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: isHovered ? pkg.accentColor : 'transparent',
              color: isHovered ? '#0A0A0A' : pkg.accentColor,
              border: `1px solid ${pkg.accentColor}`,
            }}
          >
            Reserve This Journey
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function Packages() {
  return (
    <section className="relative py-32 px-6 bg-[#0A0A0A] overflow-hidden">

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,248,122,0.04) 0%, transparent 70%)' }}
      />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,184,197,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs tracking-[0.4em] text-[#FAFAFA]/40 uppercase mb-4">
            Choose Your Journey
          </p>
          <h2 className="font-display font-light uppercase text-[8vw] md:text-7xl leading-[0.9] text-[#FAFAFA] mb-6">
            Your Japan,<br />
            <span className="text-[#D4F87A]">Your Way</span>
          </h2>
          <p className="font-editorial italic text-xl text-[#FAFAFA]/50 max-w-xl mx-auto">
            Three meticulously crafted journeys. Each one unforgettable.
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <TiltCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center mt-12 font-mono text-xs text-[#FAFAFA]/25 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          All packages include travel insurance · Prices from per person, double occupancy
        </motion.p>
      </div>
    </section>
  )
}
