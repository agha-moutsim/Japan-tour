import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Elena Rostova',
    role: 'Creative Director',
    quote: 'The attention to detail was staggering. Kyoto in the morning mist will stay with me forever. A true masterclass in curation.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    role: 'Architect',
    quote: 'An absolute masterclass in curated travel. We didn’t just see Japan; we felt its heartbeat. The Fuji ryokan was a dream.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 3,
    name: 'Sophia Laurent',
    role: 'Photographer',
    quote: 'Seamless, elegant, and profoundly moving. Every location felt like stepping into a cinematic masterpiece. Flawless execution.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800',
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 md:py-48 px-6 md:px-12 bg-black text-white relative z-10 overflow-hidden">
      <SectionHeading text="VOICES OF THE JOURNEY" align="center" />
      
      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {TESTIMONIALS.map((testimonial, index) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
        ))}
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index }: { testimonial: any; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between h-full border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer"
      whileHover={{ y: -10 }}
      style={{ willChange: 'transform, opacity' }} // Performance optimization
    >
      {/* Background Image Reveal on Hover */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 ease-out"
        style={{
          backgroundImage: `url(${testimonial.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%)',
          willChange: 'opacity', // Performance optimization
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <svg className="w-8 h-8 mb-8 text-white/20 group-hover:text-white/60 transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
        
        <p className="text-lg md:text-xl font-light leading-relaxed mb-12 text-white/80 group-hover:text-white transition-colors duration-500">
          "{testimonial.quote}"
        </p>
        
        <div className="mt-auto flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 grayscale group-hover:grayscale-0 transition-all duration-500 will-change-transform">
            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <h4 className="text-sm font-medium tracking-wider uppercase">{testimonial.name}</h4>
            <p className="text-xs text-white/50 uppercase tracking-widest mt-1">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
