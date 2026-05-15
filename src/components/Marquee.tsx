import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame } from 'framer-motion'

interface MarqueeProps {
  text: string
  baseVelocity?: number
}

// Seamless modulo wrap
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function Marquee({ text, baseVelocity = -10 }: MarqueeProps) {
  const baseX = useSpring(0, { stiffness: 400, damping: 90 })
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false })

  // We wrap between 0 and -50% assuming we have 2 exact identical sets of text
  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`)

  const directionFactor = useRef<number>(1)

  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    moveBy += directionFactor.current * moveBy * Math.abs(velocityFactor.get())
    baseX.set(baseX.get() + moveBy)
  })

  // Skew effect based on velocity
  const skewX = useTransform(smoothVelocity, [-1500, 0, 1500], [8, 0, -8])

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap py-10 border-y border-white/5 relative z-10 bg-[#0A0A0A]">
      <motion.div 
        className="flex whitespace-nowrap flex-nowrap font-display uppercase tracking-wide text-[#FAFAFA]"
        style={{ x, skewX, fontSize: 'clamp(60px, 10vw, 150px)', lineHeight: 0.9 }}
      >
        {/* Set 1 */}
        <span className="block px-8">{text}</span>
        <span className="block px-8 text-transparent" style={{ WebkitTextStroke: '1px #FAFAFA' }}>{text}</span>
        <span className="block px-8">{text}</span>
        <span className="block px-8 text-transparent" style={{ WebkitTextStroke: '1px #FAFAFA' }}>{text}</span>
        
        {/* Set 2 (Exact duplicate for seamless wrap) */}
        <span className="block px-8">{text}</span>
        <span className="block px-8 text-transparent" style={{ WebkitTextStroke: '1px #FAFAFA' }}>{text}</span>
        <span className="block px-8">{text}</span>
        <span className="block px-8 text-transparent" style={{ WebkitTextStroke: '1px #FAFAFA' }}>{text}</span>
      </motion.div>
    </div>
  )
}
