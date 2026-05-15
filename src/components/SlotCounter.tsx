import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SlotCounterProps {
  value: string
  label: string
  delay?: number
  suffix?: string
}

function DigitColumn({ digit, delay }: { digit: string; delay: number }) {
  // If it's not a number (like a comma, plus sign, or period), just render it static
  if (isNaN(parseInt(digit))) {
    return <span className="text-[#D4F87A]">{digit}</span>
  }

  const num = parseInt(digit)
  
  // Create a column of numbers: 0-9, then 0-9 again, then ending on the target number.
  // This forces a long "spin" before landing on the correct digit.
  const numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    ...Array.from({ length: num + 1 }, (_, i) => i)
  ]

  // The final position is the last element in the array
  const targetIndex = numbers.length - 1

  return (
    <div className="relative inline-block h-[1em] overflow-hidden leading-none text-[#D4F87A]">
      <motion.div
        initial={{ y: 0 }}
        whileInView={{ y: `-${targetIndex * 100}%` }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{
          duration: 2.5,
          delay: delay,
          ease: [0.16, 1, 0.3, 1], // Custom cinematic deceleration
        }}
        className="flex flex-col items-center"
      >
        {numbers.map((n, i) => (
          <span key={i} className="h-[1em] block">{n}</span>
        ))}
      </motion.div>
    </div>
  )
}

export default function SlotCounter({ value, label, delay = 0, suffix = '' }: SlotCounterProps) {
  const digits = value.split('')

  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="font-display text-[15vw] md:text-8xl leading-none flex items-end">
        {digits.map((char, index) => (
          <DigitColumn key={index} digit={char} delay={delay + index * 0.1} />
        ))}
        {suffix && (
          <span className="text-[15vw] md:text-8xl text-[#D4F87A]">{suffix}</span>
        )}
      </div>
      <div className="mt-4 font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-[#FAFAFA]/60">
        {label}
      </div>
    </div>
  )
}
