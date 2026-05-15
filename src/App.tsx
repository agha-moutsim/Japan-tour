import { useEffect } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useSpring } from 'framer-motion'
import Navigation from './components/Navigation'
import CustomCursor from './components/CustomCursor'
import Hero from './sections/Hero'
import Marquee from './components/Marquee'
import Statistics from './sections/Statistics'
import Journey from './sections/Journey'
import SpotlightGallery from './sections/SpotlightGallery'
import VideoPortal from './sections/VideoPortal'
import Included from './sections/Included'
import Testimonials from './sections/Testimonials'
import FAQ from './sections/FAQ'
import UltimateCTA from './sections/UltimateCTA'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Packages from './sections/Packages'
import Preloader from './components/Preloader'
import FilmGrain from './components/FilmGrain'
import SakuraPetals from './components/SakuraCanvas'

// ─── Lenis smooth scroll config (Task 6 & 7) ──────────────────────────────────────
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      // Exponential easing: buttery deceleration
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
}

// ─── Scroll Progress Bar (Task 7) ─────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  // Smooth spring so it doesn't feel jittery at velocity peaks
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #FFB8C5 0%, #F5C76E 100%)',
        transformOrigin: 'left center',
        zIndex: 100,
        willChange: 'transform',
      }}
    />
  )
}

export default function App() {
  useLenis()

  return (
    <>
      <Preloader />
      <FilmGrain />
      <SakuraPetals />

      {/* Task 7: Scroll progress bar */}
      <ScrollProgressBar />

      {/* Task 9: Custom cursor */}
      <CustomCursor />

      <Navigation />

      <main>
        <Hero />
        <Marquee text="TOKYO • KYOTO • OSAKA • FUJI • " />
        <Statistics />
        <Journey />
        <SpotlightGallery />
        <Testimonials />
        <VideoPortal />
        <Included />
        <Packages />
        <FAQ />
        
        {/* The Impossible Final Section */}
        <UltimateCTA />
        
        <Contact />
        <Footer />
      </main>
    </>
  )
}
