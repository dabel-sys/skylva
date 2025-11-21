import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Philosophy: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="vision" className="py-24 md:py-40 bg-skylva-white text-skylva-charcoal px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
           <h3 className="text-sm uppercase tracking-widest text-skylva-concrete mb-4">The Philosophy</h3>
           <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
             Energy is not an add-on. <br/>It is architecture.
           </h2>
           <div className="w-12 h-[1px] bg-skylva-charcoal mb-8"></div>
           <p className="text-lg font-light text-skylva-charcoal/80 leading-relaxed mb-6">
             We believe that true luxury lies in silence and autonomy. SKYLVA is not a solar company. We are a design house that uses light as a raw material.
           </p>
           <p className="text-lg font-light text-skylva-charcoal/80 leading-relaxed">
             Our AI-first structures learn from the environment, optimizing shade and energy generation without you ever noticing. It is power, without disturbance.
           </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-[600px] w-full overflow-hidden"
        >
           <motion.div style={{ y }} className="absolute w-full h-[120%] -top-[10%]">
             <img 
              src="https://picsum.photos/seed/skylva_minimal/800/1000" 
              alt="Minimalist Detail" 
              className="w-full h-full object-cover grayscale-[30%]"
             />
           </motion.div>
           <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur p-6 max-w-xs z-10">
              <p className="text-xs font-mono uppercase text-skylva-concrete mb-2">Materiality</p>
              <p className="text-sm font-medium text-skylva-charcoal">Anodized Aluminium & Tempered Solar Glass</p>
           </div>
        </motion.div>

      </div>
    </section>
  );
};