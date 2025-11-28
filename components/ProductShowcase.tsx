import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const ProductShowcase: React.FC = () => {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  const { t } = useLanguage();

  // Deeper Parallax for text elements
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yHeader = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="structures" ref={targetRef} className="py-32 bg-skylva-offwhite text-skylva-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 relative z-10">
         <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-300 pb-8">
            <motion.div 
              style={{ y: yHeader }}
              className="relative"
            >
              <h2 className="text-4xl md:text-6xl font-display font-light mb-4">
                  <TextReveal>{t.product.title}</TextReveal>
              </h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-gray-500 font-sans tracking-wide"
              >
                  {t.product.subtitle}
              </motion.p>
            </motion.div>
            <motion.div 
              className="mt-6 md:mt-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <a href="#" className="relative group text-xs font-bold tracking-[0.2em] uppercase pb-2 overflow-hidden block">
                  <span className="relative z-10 group-hover:text-skylva-green transition-colors">{t.product.view_specs}</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black group-hover:bg-skylva-green transform origin-left transition-transform duration-300 group-hover:scale-x-100 scale-x-50" />
              </a>
            </motion.div>
         </div>
      </div>

      <div className="flex flex-col gap-40 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Product 1 */}
        <div className="group relative perspective-1000">
          <motion.div 
            className="aspect-[16/9] overflow-hidden bg-gray-200 relative rounded-2xl border-[0.8pt] border-black/5 shadow-xl"
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
          >
            <img 
              src="product-1.png" 
              alt="SKYLVA Integrated Solar Skylights" 
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 will-change-transform"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>
          <motion.div style={{ y }} className="md:absolute md:-bottom-20 md:right-12 bg-black/60 backdrop-blur-3xl border border-white/10 shadow-2xl max-w-md rounded-2xl overflow-hidden z-20">
            <motion.div
              className="p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-3xl font-display font-light mb-4 text-white">{t.product.p1_title}</h3>
              <p className="text-white/80 font-sans font-light text-sm leading-relaxed mb-8">
                {t.product.p1_desc}
              </p>
              <ul className="text-xs font-bold tracking-widest text-white/60 space-y-3 uppercase border-t border-white/10 pt-6">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-skylva-green rounded-full mr-3" />{t.product.p1_spec1}</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-skylva-green rounded-full mr-3" />{t.product.p1_spec2}</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-skylva-green rounded-full mr-3" />{t.product.p1_spec3}</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Product 2 */}
        <div className="group relative perspective-1000">
           <motion.div 
             className="aspect-[16/9] overflow-hidden bg-gray-200 relative rounded-2xl border-[0.8pt] border-black/5 shadow-xl"
             initial={{ opacity: 0, scale: 0.95, y: 50 }}
             whileInView={{ opacity: 1, scale: 1, y: 0 }}
             viewport={{ once: true, margin: "-15%" }}
             transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
           >
            <img 
              src="product-2.png" 
              alt="SKYLVA Patio Cover" 
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 will-change-transform"
            />
             <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>
           <motion.div style={{ y }} className="md:absolute md:-bottom-20 md:left-12 bg-black/60 backdrop-blur-3xl border border-white/10 shadow-2xl max-w-md z-10 rounded-2xl overflow-hidden">
            <motion.div
              className="p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-3xl font-display font-light mb-4 text-white">{t.product.p2_title}</h3>
              <p className="text-white/80 font-sans font-light text-sm leading-relaxed mb-8">
                {t.product.p2_desc}
              </p>
              <ul className="text-xs font-bold tracking-widest text-white/60 space-y-3 uppercase border-t border-white/10 pt-6">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-skylva-green rounded-full mr-3" />{t.product.p2_spec1}</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-skylva-green rounded-full mr-3" />{t.product.p2_spec2}</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-skylva-green rounded-full mr-3" />{t.product.p2_spec3}</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
        
         {/* Product 3 (Carport) */}
         <div className="group relative perspective-1000">
           <motion.div 
             className="aspect-[16/9] overflow-hidden bg-gray-200 relative rounded-2xl border-[0.8pt] border-black/5 shadow-xl"
             initial={{ opacity: 0, scale: 0.95, y: 50 }}
             whileInView={{ opacity: 1, scale: 1, y: 0 }}
             viewport={{ once: true, margin: "-15%" }}
             transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
           >
            <img 
              src="product-3.png" 
              alt="SKYLVA Carport" 
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 will-change-transform"
            />
             <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>
           <motion.div style={{ y }} className="md:absolute md:-bottom-20 md:right-12 bg-black/60 backdrop-blur-3xl border border-white/10 shadow-2xl max-w-md z-10 rounded-2xl overflow-hidden">
            <motion.div
              className="p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h3 className="text-3xl font-display font-light mb-4 text-white">C1 Carport</h3>
              <p className="text-white/80 font-sans font-light text-sm leading-relaxed mb-8">
                Protect your vehicle with architectural solar. Fast charging integrated.
              </p>
              <ul className="text-xs font-bold tracking-widest text-white/60 space-y-3 uppercase border-t border-white/10 pt-6">
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-skylva-green rounded-full mr-3" />22kW EV Charger</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-skylva-green rounded-full mr-3" />100% Waterproof</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 bg-skylva-green rounded-full mr-3" />Integrated Lighting</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;