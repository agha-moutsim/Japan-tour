import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SectionHeadingProps {
  text: string
  align?: 'center' | 'left'
  className?: string
}

const WORD_VARIANTS = {
  hidden: { y: 120, rotateX: 35, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    rotateX: 0,
    opacity: 1,
    transition: {
      duration: 1.0,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function SectionHeading({ text, align = 'center', className = '' }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const words = text.split(' ')

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 md:gap-6 mb-16 md:mb-20 ${align === 'center' ? 'justify-center' : 'justify-start'
        } ${className}`}
      style={{ perspective: '800px' }}
    >
      {align === 'center' && (
        <motion.div
          className="hairline flex-1 origin-right"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      {align === 'left' && (
        <motion.div
          className="w-12 md:w-20 hairline origin-left"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {/* Word-split heading */}
      <h2
        className={`font-display font-light uppercase text-[#FAFAFA] flex flex-wrap ${align === 'center' ? 'justify-center' : 'justify-start'}`}
        style={{
          fontSize: 'clamp(28px, 5vw, 80px)',
          letterSpacing: '0.04em',
          lineHeight: 1.1,
          rowGap: '0.2em'
        }}
        aria-label={text}
      >
        {words.map((word, i) => (
          <span key={i} className="word-clip" style={{ marginRight: i < words.length - 1 ? '0.25em' : 0 }}>
            <motion.span
              style={{ display: 'inline-block', willChange: 'transform', backfaceVisibility: 'hidden' }}
              variants={WORD_VARIANTS}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.div
        className="hairline flex-1"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}
