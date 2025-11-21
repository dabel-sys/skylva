import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-skylva-charcoal text-skylva-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Placeholder for architectural nature shot */}
        <img 
          src="https://picsum.photos/seed/skylva_solar_nordic/1920/1080" 
          alt="Skylva Pergola in Forest" 
          className="w-full h-full object-cover opacity-60 grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] mb-6 text-skylva-stone/80">
            Scandinavian Design. Solar Innovation.
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 leading-[1.1]">
            Where architecture <br /> meets intelligence.
          </h1>
          <p className="text-lg md:text-xl text-skylva-stone/70 font-light mb-12 max-w-xl mx-auto leading-relaxed">
            Effortless living powered by light. Designed for those who don't need to explain.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
             <button className="group px-8 py-4 bg-skylva-white text-skylva-charcoal text-sm uppercase tracking-widest font-medium hover:bg-white transition-all duration-300">
                Discover Skylva
             </button>
             <button className="group flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-sm uppercase tracking-widest font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                Configure System
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};