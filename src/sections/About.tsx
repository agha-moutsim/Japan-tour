import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

const timelineData = [
  {
    days: 'Days 1–3',
    city: 'Osaka',
    photos: [
      { src: '/images/osaka-castle.jpg', alt: 'Osaka Castle', rotate: -3 },
      { src: '/images/osaka-skyline.jpg', alt: 'Osaka skyline', rotate: 2 },
    ],
  },
  {
    days: 'Days 4–6',
    city: 'Kyoto',
    photos: [
      { src: '/images/kyoto-pagoda.jpg', alt: 'Kyoto pagoda', rotate: 3 },
      { src: '/images/kyoto-shrine.jpg', alt: 'Fushimi Inari shrine', rotate: -2 },
    ],
  },
  {
    days: 'Days 7–10',
    city: 'Tokyo',
    photos: [
      { src: '/images/tokyo-shibuya.jpg', alt: 'Shibuya Crossing', rotate: -2 },
      { src: '/images/tokyo-street.jpg', alt: 'Tokyo street', rotate: 3 },
    ],
  },
]

// Stagger delays per city: Osaka 0ms, Kyoto 200ms, Tokyo 400ms
const CITY_DELAYS = [0, 0.2, 0.4]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-[#0A0A0A] py-24 md:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <SectionHeading text="ABOUT THE TOUR" align="center" />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column: Text */}
          <div className="lg:w-[45%] space-y-8">
            <motion.p
              className="font-body text-base md:text-lg leading-relaxed text-[#FAFAFA] max-w-[420px]"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              We&apos;ve planned a simple and convenient 10-day itinerary for your trip to Japan. You&apos;ll visit three cities:{' '}
              <span className="text-[#D4F87A]">Osaka, Kyoto, and Tokyo</span>.
            </motion.p>

            <motion.p
              className="font-body text-base md:text-lg leading-relaxed text-[#FAFAFA] max-w-[420px]"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              No need to worry about routes, schedules, or finding places — everything is already organized. We&apos;ll show you where to go, what to see, and where to eat, so you can simply{' '}
              <span className="text-[#D4F87A]">enjoy the journey</span>.
            </motion.p>
          </div>

          {/* Right Column: Timeline */}
          <div className="lg:w-[55%] relative">
            {/* Vertical Line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.2)]" />

            <div className="space-y-16 md:space-y-[180px] pl-8 md:pl-12">
              {timelineData.map((item, index) => (
                <TimelineNode
                  key={item.city}
                  data={item}
                  index={index}
                  staggerDelay={CITY_DELAYS[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineNode({
  data,
  index,
  staggerDelay,
}: {
  data: typeof timelineData[0]
  index: number
  staggerDelay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  // threshold: 0.3, once: true — as specified
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: staggerDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
    >
      {/* Node Dot */}
      <motion.div
        className="absolute -left-[calc(2rem+5px)] md:-left-[calc(3rem+5px)] top-1 w-[10px] h-[10px] rounded-full bg-[#D4F87A]"
        animate={isInView ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: staggerDelay }}
      />

      {/* Label */}
      <div className="mb-4">
        <span className="text-small-caps text-[#888888] block mb-1">{data.days}</span>
        <span className="font-body font-medium text-lg uppercase tracking-widest text-[#FAFAFA]">
          {data.city}
        </span>
      </div>

      {/* Photo Cluster */}
      <div
        className="relative flex gap-3 md:gap-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="hover"
      >
        {data.photos.map((photo, i) => (
          <motion.div
            key={i}
            className="relative flex-shrink-0 overflow-hidden"
            style={{
              width: 'clamp(140px, 15vw, 180px)',
              aspectRatio: '3/2',
              willChange: 'transform, clip-path',
            }}
            initial={{ 
              rotate: photo.rotate, 
              x: 0, 
              scale: 1.15,
              clipPath: 'inset(15%)'
            }}
            animate={{
              rotate: isHovered
                ? photo.rotate + (i === 0 ? -4 : 4)
                : photo.rotate,
              x: isHovered ? (i === 0 ? -8 : 8) : 0,
              scale: isInView ? (isHovered ? 1.03 : 1) : 1.15,
              clipPath: isInView ? 'inset(0%)' : 'inset(15%)'
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              style={{
                border: '4px solid #FAFAFA',
                borderRadius: '2px',
                boxShadow: isHovered
                  ? '0 12px 40px rgba(0,0,0,0.6)'
                  : '0 4px 20px rgba(0,0,0,0.4)',
              }}
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
