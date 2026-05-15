import { useState, useEffect } from 'react'
import { GlobeIcon, InstagramIcon, FacebookIcon, TelegramIcon } from './SocialIcons'
import MagneticButton from './MagneticButton'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    setIsMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled || isMenuOpen ? 'rgba(10,10,10,0.85)' : 'transparent',
          backdropFilter: scrolled || isMenuOpen ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled || isMenuOpen ? 'blur(12px)' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5 md:py-6">
          {/* Wordmark */}
          <div className="flex items-center gap-2 z-50 relative">
            <GlobeIcon className="text-[#FAFAFA]" />
            <span className="text-small-caps text-[#FAFAFA]">JAPAN TOURS</span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo('about')} className="text-small-caps text-[#FAFAFA] link-underline">
              About
            </button>
            <button onClick={() => scrollTo('included')} className="text-small-caps text-[#FAFAFA] link-underline">
              Included
            </button>
            <button onClick={() => scrollTo('contact')} className="text-small-caps text-[#FAFAFA] link-underline">
              Contacts
            </button>
          </nav>

          {/* Desktop Book button & Mobile Hamburger */}
          <div className="flex items-center gap-6 z-50 relative">
            <MagneticButton
              onClick={() => scrollTo('contact')}
              className="hidden md:block text-small-caps text-[#FAFAFA] border border-[#F5E8D3] rounded-full px-5 py-2 hover:bg-[rgba(245,232,211,0.15)] transition-all duration-300"
            >
              Book
            </MagneticButton>
            
            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className={`block w-6 h-[2px] bg-[#FAFAFA] transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
              <span className={`block w-6 h-[2px] bg-[#FAFAFA] transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-[2px] bg-[#FAFAFA] transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button onClick={() => scrollTo('about')} className="text-2xl font-editorial text-[#FAFAFA]">
              About
            </button>
            <button onClick={() => scrollTo('included')} className="text-2xl font-editorial text-[#FAFAFA]">
              Included
            </button>
            <button onClick={() => scrollTo('contact')} className="text-2xl font-editorial text-[#FAFAFA]">
              Contacts
            </button>
            <button 
              onClick={() => scrollTo('contact')}
              className="mt-4 text-small-caps text-[#0A0A0A] bg-[#FAFAFA] border border-[#F5E8D3] rounded-full px-8 py-3 transition-all duration-300"
            >
              Book Journey
            </button>
            
            <div className="flex gap-6 mt-8">
              <a href="#" className="text-[#FAFAFA]/60 hover:text-[#FAFAFA]"><InstagramIcon /></a>
              <a href="#" className="text-[#FAFAFA]/60 hover:text-[#FAFAFA]"><FacebookIcon /></a>
              <a href="#" className="text-[#FAFAFA]/60 hover:text-[#FAFAFA]"><TelegramIcon /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Icons — Vertical on Desktop */}
      <div className="hidden md:flex fixed right-12 top-1/2 -translate-y-1/2 flex-col gap-8 z-40">
        <a href="#" className="text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.8)] transition-colors duration-200">
          <InstagramIcon />
        </a>
        <a href="#" className="text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.8)] transition-colors duration-200">
          <FacebookIcon />
        </a>
        <a href="#" className="text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.8)] transition-colors duration-200">
          <TelegramIcon />
        </a>
      </div>
    </>
  )
}
