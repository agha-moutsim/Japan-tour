import { motion } from 'framer-motion'

export default function BentoGrid() {
  return (
    <section className="relative py-32 px-6 md:px-12 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-xs tracking-[0.4em] text-[#FAFAFA]/40 uppercase mb-4">
            The Experience
          </p>
          <h2 className="font-display font-light uppercase text-5xl md:text-7xl leading-[0.9] text-[#FAFAFA]">
            Curated<br/>
            <span className="text-[#F5C76E]">Perfection</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 md:h-[800px]">
          
          {/* Card 1: Large Featured (Culture) */}
          <motion.div 
            className="group relative md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden bg-[#111] h-[400px] md:h-full cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0 }}
          >
            <img 
              src="/images/japan-3.jpg" 
              alt="Kyoto Temple" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
            
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <span className="text-[#F5C76E] font-mono text-xs tracking-widest uppercase mb-4">Culture</span>
              <h3 className="text-3xl md:text-5xl font-editorial text-white mb-4">Ancient Traditions</h3>
              <p className="text-white/60 text-sm md:text-base max-w-md transform transition-transform duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                Private tea ceremonies in 400-year-old gardens, exclusive temple access, and guided historical walks through Kyoto's most guarded secrets.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Small Square (Culinary) */}
          <motion.div 
            className="group relative md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden bg-[#111] h-[300px] md:h-full cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <img 
              src="/images/japan-2.jpg" 
              alt="Sushi" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              <span className="text-[#D4F87A] font-mono text-[10px] tracking-widest uppercase mb-2">Culinary</span>
              <h3 className="text-2xl font-editorial text-white">Michelin Dining</h3>
            </div>
          </motion.div>

          {/* Card 3: Small Square (Ryokan) */}
          <motion.div 
            className="group relative md:col-span-1 md:row-span-1 rounded-3xl overflow-hidden bg-[#111] h-[300px] md:h-full cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="/images/hero-mountains.jpg" 
              alt="Onsen" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              <span className="text-[#FFB8C5] font-mono text-[10px] tracking-widest uppercase mb-2">Rest</span>
              <h3 className="text-2xl font-editorial text-white">Luxury Ryokans</h3>
            </div>
          </motion.div>

          {/* Card 4: Wide Rectangle (Transport) */}
          <motion.div 
            className="group relative md:col-span-2 md:row-span-1 rounded-3xl overflow-hidden bg-[#111] h-[300px] md:h-full cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img 
              src="/images/japan-1.jpg" 
              alt="Bullet Train" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              style={{ objectPosition: 'center 70%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
            
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end md:justify-center md:items-start">
              <span className="text-[#FAFAFA]/60 font-mono text-[10px] tracking-widest uppercase mb-2">Transit</span>
              <h3 className="text-3xl md:text-4xl font-editorial text-white mb-2">Green Car Shinkansen</h3>
              <p className="text-white/60 text-sm max-w-sm transform transition-transform duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                Glide between cities at 320km/h in first-class comfort. Seamless luggage transfers mean you travel with only what you need.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
