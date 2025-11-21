import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Move the background image down slightly as the user scrolls down
  // creating a depth effect where the background moves slower than the foreground.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-skylva-matte">
      {/* Background Image with Overlay - Simulating a high-end architectural render */}
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y }} className="absolute inset-0">
          <img 
            src="/images/hero.jpg" 
            alt="Premium Scandinavian solar canopy with wood accents in a forest setting" 
            className="w-full h-full object-cover opacity-80 grayscale-[0.1]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-skylva-matte" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-wide text-white mb-8 leading-tight"
        >
          Where architecture meets <br/> <span className="text-skylva-sand">solar intelligence.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl font-sans font-light text-white/90 tracking-widest mb-12 max-w-2xl mx-auto drop-shadow-lg"
        >
          Scandinavian design. Solar innovation. Effortless living.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button className="bg-white text-skylva-matte px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase hover:bg-skylva-sand transition-all duration-300 w-64 md:w-auto shadow-lg shadow-white/10">
            Discover SKYLVA
          </button>
          <button className="border border-white/30 text-white px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/10 backdrop-blur-sm transition-all duration-300 w-64 md:w-auto">
            Configure System
          </button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ChevronDown size={32} strokeWidth={0.5} />
      </motion.div>
    </section>
  );
};

export default Hero;