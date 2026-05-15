import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  
  const [isHovering, setIsHovering] = useState(false)
  const isHoveringRef = useRef(false)
  
  const [isVisible, setIsVisible] = useState(false)
  const isVisibleRef = useRef(false)

  // Raw target position (snaps immediately)
  const mousePos = useRef({ x: -100, y: -100 })
  // Smoothly lerped position for the ring only
  const ringPos = useRef({ x: -100, y: -100 })

  const setHoverState = (state: boolean) => {
    if (isHoveringRef.current !== state) {
      isHoveringRef.current = state
      setIsHovering(state)
    }
  }

  const setVisibleState = (state: boolean) => {
    if (isVisibleRef.current !== state) {
      isVisibleRef.current = state
      setIsVisible(state)
    }
  }

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice =
      window.matchMedia('(max-width: 768px)').matches ||
      'ontouchstart' in window

    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      setVisibleState(true)
    }

    const handleMouseEnter = () => setVisibleState(true)
    const handleMouseLeave = () => setVisibleState(false)

    // Event delegation for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target?.closest?.('a, button, [data-cursor="hover"], input, textarea, .polaroid-card, .glass-card')) {
        setHoverState(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target?.closest?.('a, button, [data-cursor="hover"], input, textarea, .polaroid-card, .glass-card')) {
        setHoverState(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    let rafId: number

    const tick = () => {
      const { x: mx, y: my } = mousePos.current

      // Dot snaps immediately to cursor
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`
      }

      // Ring lerps behind cursor for a trailing feel
      ringPos.current.x += (mx - ringPos.current.x) * 0.12
      ringPos.current.y += (my - ringPos.current.y) * 0.12

      if (ringRef.current) {
        const size = isHoveringRef.current ? 32 : 0
        const half = size / 2
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - half}px, ${ringPos.current.y - half}px, 0)`
        ringRef.current.style.width = `${size}px`
        ringRef.current.style.height = `${size}px`
        ringRef.current.style.opacity = isHoveringRef.current ? '1' : '0'
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(rafId)
    }
  }, []) // Empty dependency array ensures we only bind events once

  if (!isVisible) return null

  return (
    <>
      {/* Dot — snaps to cursor, mix-blend-mode: difference */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#FAFAFA',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          opacity: isHovering ? 0 : 1,
          transition: 'opacity 150ms ease',
        }}
      />

      {/* Ring — expands on hover, trails cursor */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.85)',
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform, width, height, opacity',
          backfaceVisibility: 'hidden',
          transition: 'width 300ms cubic-bezier(0.16,1,0.3,1), height 300ms cubic-bezier(0.16,1,0.3,1), opacity 200ms ease',
        }}
      />
    </>
  )
}
