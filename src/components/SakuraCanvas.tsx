import { useEffect, useRef } from 'react'

const PETAL_COUNT = 50

interface PetalData {
  id: number
  left: string
  animationDuration: string
  animationDelay: string
  size: string
  opacity: number
}

function generatePetals(): PetalData[] {
  return Array.from({ length: PETAL_COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${6 + Math.random() * 8}s`,
    animationDelay: `${Math.random() * 10}s`,
    size: `${6 + Math.random() * 8}px`,
    opacity: 0.4 + Math.random() * 0.4,
  }))
}

const petals = generatePetals()

export default function SakuraPetals() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse repulsion using CSS custom properties
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMove = (e: MouseEvent) => {
      // We just update a CSS variable — zero DOM reads, fully GPU
      container.style.setProperty('--mx', `${e.clientX}px`)
      container.style.setProperty('--my', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      <style>{`
        @keyframes sakura-fall {
          0% {
            transform: translateY(-20px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 0.8; }
          100% {
            transform: translateY(100vh) translateX(80px) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes sakura-sway {
          0%, 100% { margin-left: 0; }
          25% { margin-left: 20px; }
          75% { margin-left: -20px; }
        }
        .sakura-petal {
          position: fixed;
          top: -20px;
          border-radius: 150% 0 150% 0;
          background: linear-gradient(135deg, #FFB8C5 0%, #FFC8D4 50%, #FF9BB0 100%);
          /* Removed box-shadow: animating 50 shadows destroys scroll FPS */
          pointer-events: none;
          animation-name: sakura-fall, sakura-sway;
          animation-timing-function: linear, ease-in-out;
          animation-iteration-count: infinite, infinite;
          will-change: transform, opacity;
        }
      `}</style>
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 4,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {petals.map((p) => (
          <div
            key={p.id}
            className="sakura-petal"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: `${p.animationDuration}, ${parseFloat(p.animationDuration) * 0.7}s`,
              animationDelay: `${p.animationDelay}, ${p.animationDelay}`,
            }}
          />
        ))}
      </div>
    </>
  )
}
