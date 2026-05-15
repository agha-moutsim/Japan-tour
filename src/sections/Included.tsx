import { useRef } from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { GuidesIcon, FlightsIcon, TransfersIcon, HotelsIcon } from '../components/SocialIcons'

const cards = [
  {
    icon: GuidesIcon,
    title: 'Guides',
    description: '2 awesome guides who know everything about Japan!',
  },
  {
    icon: FlightsIcon,
    title: 'Flights',
    description: 'Routes: Moscow — Osaka, Tokyo — Moscow',
  },
  {
    icon: TransfersIcon,
    title: 'Transfers',
    description: 'From the airport to the hotels',
  },
  {
    icon: HotelsIcon,
    title: 'Hotels',
    description: 'Comfortable accommodation, 2 people per room (breakfasts included)',
  },
]

const CARD_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateY: 8,
    clipPath: 'inset(0 100% 0 0)',
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateY: 0,
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: 1.1,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
}

export default function Included() {
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: true, amount: 0.2 })

  return (
    <section
      id="included"
      className="relative w-full bg-[#0A0A0A] py-24 md:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeading text="WHAT'S INCLUDED" align="left" />

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: '1000px' }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              className="glass-card group"
              variants={CARD_VARIANTS}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={index}
              whileHover={{
                y: -6,
                borderColor: '#D4F87A',
                boxShadow: '0 8px 32px rgba(212, 248, 122, 0.1)',
                transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
              data-cursor="hover"
            >
              {/* Icon */}
              <div className="mb-6">
                <card.icon className="text-[#D4F87A] transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Title */}
              <h3 className="text-small-caps text-[#FAFAFA] mb-3">{card.title}</h3>

              {/* Description */}
              <p className="font-body text-sm text-[rgba(255,255,255,0.7)] leading-relaxed">
                {card.description}
              </p>

              {/* Decorative cloud pattern */}
              <div className="absolute bottom-4 right-4 opacity-[0.05] pointer-events-none">
                <svg width="60" height="40" viewBox="0 0 60 40" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M10 25c0-5 4-9 9-9 2 0 4 1 5 2 2-4 6-7 11-7 7 0 12 5 12 12 0 1 0 2-.1 3h3c3 0 5 2 5 5s-2 5-5 5H15c-3 0-5-2-5-5z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
