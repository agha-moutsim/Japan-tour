import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

const paragraph = "Japan is not just a destination. It is a feeling. A place where ancient traditions seamlessly blend with ultra-modern technology. Where every meal is a masterpiece and every landscape is a painting. This is your journey."

function Word({ children, progress, range }: { children: string, progress: MotionValue<number>, range: [number, number] }) {
  // Map the scroll progress to opacity.
  // When progress hits the start of the range, opacity is 0.15.
  // When it hits the end of the range, opacity is 1.
  const opacity = useTransform(progress, range, [0.15, 1])
  
  return (
    <span className="relative mr-[1.5vw] mt-[1vw] inline-block">
      <span className="absolute opacity-0">{children}</span>
      <motion.span style={{ opacity }} className="text-[#FAFAFA] will-change-[opacity]">
        {children}
      </motion.span>
    </span>
  )
}

export default function EditorialReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Track scroll progress within this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start tracking when the top of the section hits the bottom of the viewport (0)
    // Stop tracking when the bottom of the section hits the center of the viewport (1)
    // This ensures the text finishes revealing before it leaves the screen.
    offset: ["start 80%", "end center"]
  })

  const words = paragraph.split(" ")

  return (
    <section 
      ref={containerRef}
      className="py-40 px-6 md:px-12 bg-[#0A0A0A] flex items-center justify-center min-h-[120vh]"
    >
      <div className="max-w-[1200px] mx-auto w-full">
        
        <p className="font-mono text-xs tracking-[0.4em] text-[#D4F87A] uppercase mb-12 text-center">
          The Philosophy
        </p>

        <h2 className="font-editorial text-[8vw] md:text-7xl leading-[1.2] text-center flex flex-wrap justify-center">
          {words.map((word, i) => {
            // Calculate the range for this specific word
            const start = i / words.length
            const end = start + (1 / words.length)
            
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            )
          })}
        </h2>

      </div>
    </section>
  )
}
