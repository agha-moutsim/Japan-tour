import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    // Simulate cinematic loading progress - SPED UP
    const duration = 1200 // 1.2 seconds total
    const interval = 20
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      // Linear ease for faster feel
      const p = currentStep / steps
      setProgress(Math.min(Math.floor(p * 100), 100))

      if (currentStep >= steps) {
        clearInterval(timer)
        setTimeout(() => {
          setIsLoading(false)
          document.body.style.overflow = ''
        }, 150) // shorter pause
      }
    }, interval)

    return () => {
      clearInterval(timer)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[999999] bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-auto"
          initial={{ clipPath: 'inset(0% 0 0% 0)' }}
          exit={{ 
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          {/* Central Animated Kanji / Text */}
          <div className="relative h-[80px] overflow-hidden mb-8">
             <motion.div
               className="font-display font-light text-[#FAFAFA] text-center"
               style={{ fontSize: 'clamp(40px, 8vw, 80px)', lineHeight: 1, letterSpacing: '0.05em' }}
               animate={{ y: ['0%', '-50%'] }}
               transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
             >
                {/* Frame 1: Kanji */}
                <div className="h-[80px] flex items-center justify-center font-serif">日本</div>
                {/* Frame 2: English */}
                <div className="h-[80px] flex items-center justify-center uppercase tracking-widest text-[#D4F87A]">JAPAN</div>
             </motion.div>
          </div>

          {/* Progress Counter */}
          <div className="absolute bottom-10 right-10 md:bottom-12 md:right-12 font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/50">
            LOADING {progress.toString().padStart(3, '0')}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
