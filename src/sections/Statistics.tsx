import SlotCounter from '../components/SlotCounter'

export default function Statistics() {
  return (
    <section className="relative py-24 md:py-40 bg-[#0A0A0A] overflow-hidden border-t border-white/5">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#D4F87A]/5 blur-[120px] pointer-events-none rounded-[100%]" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          
          <div className="flex justify-center md:justify-start">
            <SlotCounter 
              value="1250" 
              suffix="+" 
              label="Travelers Guided" 
              delay={0} 
            />
          </div>

          <div className="flex justify-center md:justify-center">
            <SlotCounter 
              value="400" 
              suffix="+" 
              label="Temples Explored" 
              delay={0.2} 
            />
          </div>

          <div className="flex justify-center md:justify-end">
            <SlotCounter 
              value="4.9" 
              suffix="★" 
              label="Average Rating" 
              delay={0.4} 
            />
          </div>

        </div>
      </div>
    </section>
  )
}
