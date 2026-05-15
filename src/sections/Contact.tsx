import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dates: '',
    message: ''
  })
  const [isHovered, setIsHovered] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Normally would send data here
    alert("Thank you! We have received your journey request.")
    setFormData({ name: '', email: '', dates: '', message: '' })
  }

  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 bg-[#0A0A0A] overflow-hidden border-t border-white/5">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4F87A]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FFB8C5]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 relative z-10">
        
        {/* Left: Copy & Details */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading text="START YOUR JOURNEY" align="left" />
            
            <h3 className="font-display font-light text-4xl lg:text-6xl text-[#FAFAFA] mt-8 leading-[1.1]">
              Ready to experience <br />
              <span className="text-[#D4F87A] italic">the extraordinary?</span>
            </h3>
            
            <p className="mt-6 text-[#FAFAFA]/60 font-body text-lg leading-relaxed max-w-md">
              Every detail of your Japan tour is meticulously crafted. Leave your details, and our concierges will reach out to finalize your itinerary.
            </p>

            <div className="mt-12 space-y-6 font-mono text-sm tracking-widest text-[#FAFAFA]/40 uppercase">
              <div className="flex items-center gap-4">
                <span className="w-1.5 h-1.5 bg-[#D4F87A] rounded-full" />
                info@japantours.luxury
              </div>
              <div className="flex items-center gap-4">
                <span className="w-1.5 h-1.5 bg-[#FFB8C5] rounded-full" />
                +81 3 1234 5678
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: The Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-[#FAFAFA]/50 tracking-[0.2em] uppercase pl-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-[#FAFAFA] focus:outline-none focus:border-[#D4F87A]/50 transition-colors duration-300 placeholder:text-white/20"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-[#FAFAFA]/50 tracking-[0.2em] uppercase pl-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-[#FAFAFA] focus:outline-none focus:border-[#D4F87A]/50 transition-colors duration-300 placeholder:text-white/20"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-[#FAFAFA]/50 tracking-[0.2em] uppercase pl-2">Preferred Dates</label>
                <input 
                  type="text" 
                  name="dates"
                  value={formData.dates}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-[#FAFAFA] focus:outline-none focus:border-[#D4F87A]/50 transition-colors duration-300 placeholder:text-white/20"
                  placeholder="e.g., April 2024"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-[#FAFAFA]/50 tracking-[0.2em] uppercase pl-2">Special Requests</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-[#FAFAFA] focus:outline-none focus:border-[#D4F87A]/50 transition-colors duration-300 placeholder:text-white/20 resize-none"
                  placeholder="Tell us what you're dreaming of..."
                />
              </div>

              <motion.button
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="mt-4 relative overflow-hidden w-full py-5 rounded-xl font-mono text-sm tracking-[0.3em] uppercase font-bold text-[#0A0A0A] bg-[#FAFAFA] transition-all duration-500"
              >
                <motion.div
                  className="absolute inset-0 bg-[#D4F87A] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="relative z-10">Request Booking</span>
              </motion.button>
              
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
