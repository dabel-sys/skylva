import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProductShowcase: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Parallax effect for text
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="product" className="py-32 bg-skylva-offwhite text-skylva-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
         <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-300 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-light mb-4">The Collection</h2>
              <p className="text-gray-500 font-sans tracking-wide">Engineered for silence. Designed for life.</p>
            </div>
            <div className="mt-6 md:mt-0">
              <a href="#" className="text-xs font-bold tracking-[0.2em] uppercase border-b border-black pb-1 hover:text-skylva-green transition-colors">View All Specifications</a>
            </div>
         </div>
      </div>

      <div className="flex flex-col gap-32 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Product 1 */}
        <div className="group relative">
          <div className="aspect-[16/9] overflow-hidden bg-gray-200 relative">
            <img 
              src="https://picsum.photos/seed/skylva_pergola_1/1600/900" 
              alt="SKYLVA Solar Structure" 
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>
          <motion.div style={{ y }} className="md:absolute md:-bottom-12 md:right-12 bg-white p-8 md:p-12 shadow-xl max-w-md">
            <h3 className="text-2xl font-display font-light mb-2">S1 Pergola</h3>
            <p className="text-gray-500 font-sans font-light text-sm leading-relaxed mb-6">
              Integrated glass-glass solar modules. Nordic Pine or Aircraft Aluminum finish. 
              Zero visible wiring.
            </p>
            <ul className="text-xs font-bold tracking-widest text-gray-400 space-y-2 uppercase">
              <li>4.2 kWp Capacity</li>
              <li>Auto-adjusting Louvers</li>
              <li>Integrated LED</li>
            </ul>
          </motion.div>
        </div>

        {/* Product 2 */}
        <div className="group relative">
           <div className="aspect-[16/9] overflow-hidden bg-gray-200 relative">
            <img 
              src="https://picsum.photos/seed/skylva_patio/1600/900" 
              alt="SKYLVA Patio Cover" 
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>
           <motion.div style={{ y }} className="md:absolute md:-bottom-12 md:left-12 bg-white p-8 md:p-12 shadow-xl max-w-md z-10">
            <h3 className="text-2xl font-display font-light mb-2">A2 Architectural Skin</h3>
            <p className="text-gray-500 font-sans font-light text-sm leading-relaxed mb-6">
              Seamless solar integration for existing structures. 
              Matte finish for zero glare. High-efficiency output.
            </p>
            <ul className="text-xs font-bold tracking-widest text-gray-400 space-y-2 uppercase">
              <li>Modular Grid System</li>
              <li>Matte Black Finish</li>
              <li>Self-cleaning coating</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;