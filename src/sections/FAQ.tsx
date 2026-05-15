import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

const faqs = [
  {
    id: 1,
    question: "When is the best time to visit Japan?",
    answer: "Spring (March to May) for cherry blossoms, and Autumn (September to November) for vibrant red maple leaves. These seasons offer the perfect balance of weather and stunning natural beauty.",
    image: "/images/japan-1.jpg",
  },
  {
    id: 2,
    question: "Do I need a visa to enter Japan?",
    answer: "Citizens of 68 countries, including the US, UK, Canada, and Australia, can enter Japan visa-free for up to 90 days for tourism. We provide full guidance upon booking.",
    image: "/images/japan-2.jpg",
  },
  {
    id: 3,
    question: "Is it difficult to navigate if I don't speak Japanese?",
    answer: "Not at all. Major cities have English signage, and our packages include either private transport or detailed, step-by-step navigation guides. Plus, the locals are incredibly helpful.",
    image: "/images/japan-3.jpg",
  },
  {
    id: 4,
    question: "How much luggage can I bring?",
    answer: "We recommend traveling light (one main suitcase and one carry-on) due to bullet train regulations. We utilize Japan's excellent 'Takkyubin' luggage forwarding service between cities.",
    image: "/images/japan-4.jpg",
  }
]

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)
  
  // High-performance cursor tracking using Framer Motion values (bypasses React state for 60fps)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Add smooth spring physics to the image trailing behind the cursor
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the image width/height so it centers on cursor
      mouseX.set(e.clientX - 150) 
      mouseY.set(e.clientY - 200)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="relative py-20 md:py-32 px-6 md:px-12 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-xs tracking-[0.4em] text-[#FAFAFA]/40 uppercase mb-4">
            Curiosity
          </p>
          <h2 className="font-display font-light uppercase text-5xl md:text-7xl leading-[0.9] text-[#FAFAFA]">
            Frequently Asked<br/>
            <span className="text-[#D4F87A]">Questions</span>
          </h2>
        </motion.div>

        {/* Accordion List */}
        <div className="border-t border-white/10">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id

            return (
              <div 
                key={faq.id}
                className="border-b border-white/10"
                onMouseEnter={() => setHoveredImage(faq.image)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full py-8 md:py-12 flex items-center justify-between text-left group"
                >
                  <span className="font-editorial text-2xl md:text-4xl text-[#FAFAFA] group-hover:text-[#D4F87A] transition-colors duration-500">
                    {faq.question}
                  </span>
                  <span className="text-2xl text-[#FAFAFA]/40 ml-8 font-light">
                    {isOpen ? '—' : '+'}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-12 text-[#FAFAFA]/60 font-body text-base md:text-lg leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating Image Reveal (Portal-like behavior, fixed to viewport) */}
      <motion.div
        className="fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-50 rounded-2xl overflow-hidden shadow-2xl hidden md:block"
        style={{
          x: springX,
          y: springY,
          opacity: hoveredImage ? 1 : 0,
          scale: hoveredImage ? 1 : 0.8,
          // Hardware acceleration
          willChange: 'transform, opacity',
        }}
        transition={{ 
          opacity: { duration: 0.3 }, 
          scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
        }}
      >
        <AnimatePresence mode="wait">
          {hoveredImage && (
            <motion.img
              key={hoveredImage}
              src={hoveredImage}
              alt="FAQ Context"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
