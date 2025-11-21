import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  return (
    <section id="vision" className="py-32 bg-skylva-matte relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-sm text-skylva-green tracking-[0.3em] uppercase mb-6 font-semibold"
          >
            Philosophy
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-display font-light text-white leading-snug mb-8"
          >
            Energy is not an add-on.<br/>
            It is <span className="text-gray-500">architecture.</span>
          </motion.div>
          <motion.p 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-10%" }}
             transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
             className="text-lg font-sans font-light text-white/60 leading-relaxed max-w-md"
          >
            We are a design-first, AI-first solar architecture company. 
            We strip away the unnecessary to reveal the essential. 
            SKYLVA systems are not just power generators; they are sculptural elements that define your outdoor living space.
          </motion.p>
        </div>

        <div className="relative h-[600px] overflow-hidden">
           <motion.img 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-10%" }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             src="https://picsum.photos/seed/skylva_modern_solar_carport_wood/800/1000"
             alt="Scandinavian Solar Carport Detail"
             className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 transition-opacity duration-700"
           />
           <div className="absolute bottom-8 left-8 right-8 bg-black/50 backdrop-blur-md p-6 border border-white/10">
              <p className="text-white/90 font-display text-xl font-light">"Power, without disturbance."</p>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Philosophy;