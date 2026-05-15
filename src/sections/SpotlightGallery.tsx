import { useState, useRef, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import ScrambleText from '../components/ScrambleText'

export default function SpotlightGallery() {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  
  // Smooth spring for the spotlight position
  const x = useSpring(0, { stiffness: 100, damping: 20 })
  const y = useSpring(0, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      x.set(e.clientX - rect.left)
      y.set(e.clientY - rect.top)
    }

    const el = ref.current
    if (el) {
      el.addEventListener('mousemove', handleMouseMove)
    }
    return () => {
      if (el) el.removeEventListener('mousemove', handleMouseMove)
    }
  }, [x, y])

  // Map motion values to CSS variables for performant masking
  const xPx = useTransform(x, v => `${v}px`)
  const yPx = useTransform(y, v => `${v}px`)

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!ref.current || e.touches.length === 0) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.touches[0].clientX - rect.left)
    y.set(e.touches[0].clientY - rect.top)
    setIsHovered(true) // Treat touch as hover
  }

  const handleTouchEnd = () => {
    setIsHovered(false)
  }

  return (
    <section 
      ref={ref} 
      className="relative w-full h-[120vh] bg-[#050505] overflow-hidden border-t border-white/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      
      {/* Background layer: Dark Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-[0.03]">
         <h2 className="font-display font-light uppercase text-[20vw] leading-[0.8] text-[#FAFAFA] whitespace-nowrap">
           <ScrambleText text="HIDDEN" />
         </h2>
         <h2 className="font-display font-light uppercase text-[20vw] leading-[0.8] text-[#FAFAFA] whitespace-nowrap">
           <ScrambleText text="BEAUTY" />
         </h2>
      </div>

      {/* Instructional text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-700" style={{ opacity: isHovered ? 0 : 1 }}>
         <span className="font-mono text-sm tracking-[0.4em] text-[#FAFAFA]/50 uppercase text-center px-4">Hover or touch to reveal</span>
      </div>

      {/* Foreground layer: Image Grid revealed by Spotlight */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          '--x': xPx,
          '--y': yPx,
          // When hovered (or touched), the mask is large, when not it disappears
          maskImage: isHovered ? 'radial-gradient(circle 350px at var(--x) var(--y), black 30%, transparent 100%)' : 'radial-gradient(circle 0px at var(--x) var(--y), black 0%, transparent 0%)',
          WebkitMaskImage: isHovered ? 'radial-gradient(circle 350px at var(--x) var(--y), black 30%, transparent 100%)' : 'radial-gradient(circle 0px at var(--x) var(--y), black 0%, transparent 0%)',
          transition: 'mask-image 0.5s ease-out, -webkit-mask-image 0.5s ease-out',
        } as any}
      >
        <div className="w-full h-full grid grid-cols-3 grid-rows-2 gap-4 p-4">
          <div className="relative overflow-hidden rounded-lg">
            <img src="/images/hero-mountains.jpg" className="w-full h-full object-cover scale-105" loading="lazy" alt="" />
            <div className="absolute inset-0 bg-[#D4F87A] mix-blend-color opacity-40" />
          </div>
          <div className="relative overflow-hidden rounded-lg row-span-2">
            <LazyVideo src="/videos/polaroid-shrine.mp4" />
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <LazyVideo src="/videos/polaroid-neon.mp4" />
          </div>
          <div className="relative overflow-hidden rounded-lg col-span-2">
            <img src="/images/hero-mountains.jpg" className="w-full h-full object-cover scale-105" loading="lazy" alt="" />
            <div className="absolute inset-0 bg-[#FFB8C5] mix-blend-color opacity-30" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// Lazy video: only downloads + plays when scrolled into view
function LazyVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().catch(() => {})
        } else {
          vid.pause()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(vid)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      className="w-full h-full object-cover scale-105"
    />
  )
}
