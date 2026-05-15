import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

const CHARS = '日本ガイドツアー東京京都大阪富士山桜神社新幹線侍芸者抹茶アニメ'

interface ScrambleTextProps {
  text: string
  className?: string
}

export default function ScrambleText({ text, className = '' }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  
  // Initially show blanks or random chars if we want, but blank avoids layout shift
  const [displayText, setDisplayText] = useState(text.replace(/./g, '\u00A0'))
  
  useEffect(() => {
    if (!isInView) return

    let frame = 0
    let rafId: number
    const duration = 60 // frames for the entire effect (~1 second)
    const length = text.length

    const tick = () => {
      let output = ''
      let complete = 0

      for (let i = 0; i < length; i++) {
        // Calculate when this specific character should resolve
        // Characters resolve left to right
        const resolveFrame = (i / length) * (duration * 0.7)
        
        if (text[i] === ' ') {
          output += ' '
          complete++
          continue
        }

        if (frame >= resolveFrame) {
          output += text[i]
          complete++
        } else {
          output += CHARS[Math.floor(Math.random() * CHARS.length)]
        }
      }

      setDisplayText(output)

      if (complete >= length) {
        setDisplayText(text) // ensure exact match at the end
        cancelAnimationFrame(rafId)
      } else {
        frame++
        // Slow down the scramble slightly for better readability
        if (frame % 2 === 0) {
          rafId = requestAnimationFrame(tick)
        } else {
          rafId = requestAnimationFrame(() => {
            rafId = requestAnimationFrame(tick)
          })
        }
      }
    }

    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [isInView, text])

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block', minWidth: `${text.length}ch` }}>
      {displayText}
    </span>
  )
}
