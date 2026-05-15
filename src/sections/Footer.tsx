import { GlobeIcon, InstagramIcon, FacebookIcon, TelegramIcon } from '../components/SocialIcons'

export default function Footer() {
  const scrollTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="w-full bg-[#0A0A0A] py-12 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Hairline */}
        <div className="hairline-dark mb-8" />

        {/* Content Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Wordmark */}
          <div className="flex items-center gap-2">
            <GlobeIcon className="text-[#FAFAFA]" />
            <span className="text-small-caps text-[#FAFAFA]">JAPAN TOURS</span>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
            <button onClick={() => scrollTo('home')} className="text-small-caps text-[#FAFAFA] link-underline">
              Home
            </button>
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

          {/* Social + Book */}
          <div className="flex items-center gap-5">
            <a href="#" className="text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.8)] transition-colors duration-200">
              <InstagramIcon />
            </a>
            <a href="#" className="text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.8)] transition-colors duration-200">
              <FacebookIcon />
            </a>
            <a href="#" className="text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.8)] transition-colors duration-200">
              <TelegramIcon />
            </a>
            <button
              onClick={() => scrollTo('contact')}
              className="text-small-caps text-[#FAFAFA] border border-[#F5E8D3] rounded-full px-5 py-2 hover:bg-[rgba(245,232,211,0.15)] transition-all duration-300 ml-2"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
