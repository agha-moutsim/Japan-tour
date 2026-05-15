import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import ScrambleText from '../components/ScrambleText'

export default function Journey() {
  const targetRef = useRef<HTMLDivElement>(null)
  
  // The section needs height to allow scrolling (400vh gives a long scroll distance)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // We want to translate the horizontal container from 0 to -X%
  // The total width is approximately 300vw, so we move it by -66% to reach the end
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%'])
  
  // The glowing line path drawing itself
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#0A0A0A] border-t border-white/5">
      {/* Sticky container holds the horizontal scroll view */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Section Heading */}
        <div className="absolute top-24 left-[10vw] z-50">
          <h2 className="font-display font-light uppercase text-[#FAFAFA] text-4xl md:text-6xl tracking-widest">
            <ScrambleText text="THE ITINERARY" />
          </h2>
          <div className="w-12 h-px bg-[#D4F87A] mt-4" />
        </div>

        {/* Horizontal Track */}
        <motion.div style={{ x, willChange: 'transform' }} className="flex items-center gap-[20vw] px-[10vw] pt-20">
           
           {/* SVG Connecting Line (Absolute to track) */}
           <svg 
             className="absolute left-[20vw] top-1/2 -translate-y-1/2 w-[180vw] h-[200px] pointer-events-none z-0" 
             viewBox="0 0 2000 200" 
             preserveAspectRatio="none"
           >
             <path 
               d="M 0 100 Q 500 0 1000 100 T 2000 100" 
               fill="none" 
               stroke="rgba(255,255,255,0.1)" 
               strokeWidth="2" 
               strokeDasharray="10 10"
             />
             <motion.path 
               d="M 0 100 Q 500 0 1000 100 T 2000 100" 
               fill="none" 
               stroke="#D4F87A" 
               strokeWidth="4" 
               style={{ pathLength }}
               className="drop-shadow-[0_0_15px_rgba(212,248,122,0.5)]"
             />
           </svg>

           {/* Cards */}
           <JourneyCard 
             title="TOKYO" 
             desc="Neon streets & Future tech" 
             video="/videos/polaroid-neon.mp4" 
             day="DAY 1-3"
           />
           <JourneyCard 
             title="KYOTO" 
             desc="Ancient shrines & Gardens" 
             video="/videos/polaroid-shrine.mp4" 
             day="DAY 4-6"
           />
           <JourneyCard 
             title="OSAKA" 
             desc="Street food & Nightlife" 
             video="/videos/polaroid-ramen.mp4" 
             day="DAY 7-9"
           />
           <JourneyCard 
             title="MT. FUJI" 
             desc="The iconic peak" 
             video="/videos/polaroid-pagoda.mp4" 
             day="DAY 10"
           />
           
           {/* Spacer to allow scrolling past the last item */}
           <div className="w-[10vw] flex-shrink-0" />
        </motion.div>
      </div>
    </section>
  )
}

function JourneyCard({ title, desc, video, day }: { title: string, desc: string, video: string, day: string }) {
  return (
    <div className="relative z-10 flex-shrink-0 flex flex-col items-center group cursor-pointer" data-cursor="hover">
      <div className="text-[#D4F87A] font-mono text-sm tracking-[0.3em] mb-4 opacity-70">
        {day}
      </div>
      <div className="w-[280px] md:w-[400px] aspect-[4/5] relative overflow-hidden rounded-sm transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:-translate-y-4">
        <video 
          src={video} 
          muted 
          loop 
          autoPlay 
          playsInline 
          className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100" 
        />
        {/* Glow */}
        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none" />
      </div>
      <h3 className="mt-8 font-display font-light text-4xl md:text-5xl text-[#FAFAFA] tracking-widest uppercase">
        {title}
      </h3>
      <p className="mt-2 font-body text-[#888] tracking-wide text-sm md:text-base">
        {desc}
      </p>
    </div>
  )
}
