import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const ProductShowcase: React.FC = () => {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  const { t } = useLanguage();

  // Parallax effect for text elements
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yHeader = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section id="product" ref={targetRef} className="py-32 bg-skylva-offwhite text-skylva-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
         <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-300 pb-8">
            <motion.div 
              style={{ y: yHeader }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-light mb-4">{t.product.title}</h2>
              <p className="text-gray-500 font-sans tracking-wide">{t.product.subtitle}</p>
            </motion.div>
            <motion.div 
              className="mt-6 md:mt-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <a href="#" className="text-xs font-bold tracking-[0.2em] uppercase border-b border-black pb-1 hover:text-skylva-green transition-colors">{t.product.view_specs}</a>
            </motion.div>
         </div>
      </div>

      <div className="flex flex-col gap-32 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Product 1 */}
        <div className="group relative">
          <motion.div 
            className="aspect-[16/9] overflow-hidden bg-gray-200 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <img 
              src="/images/product-1.png" 
              alt="SKYLVA Integrated Solar Skylights" 
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>
          <motion.div style={{ y }} className="md:absolute md:-bottom-12 md:right-12 bg-white shadow-xl max-w-md">
            <motion.div
              className="p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-display font-light mb-2">{t.product.p1_title}</h3>
              <p className="text-gray-500 font-sans font-light text-sm leading-relaxed mb-6">
                {t.product.p1_desc}
              </p>
              <ul className="text-xs font-bold tracking-widest text-gray-400 space-y-2 uppercase">
                <li>{t.product.p1_spec1}</li>
                <li>{t.product.p1_spec2}</li>
                <li>{t.product.p1_spec3}</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Product 2 */}
        <div className="group relative">
           <motion.div 
             className="aspect-[16/9] overflow-hidden bg-gray-200 relative"
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-15%" }}
             transition={{ duration: 1.2, ease: "easeOut" }}
           >
            <img 
              src="/images/product-2.png" 
              alt="SKYLVA Patio Cover" 
              className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
            />
             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>
           <motion.div style={{ y }} className="md:absolute md:-bottom-12 md:left-12 bg-white shadow-xl max-w-md z-10">
            <motion.div
              className="p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <h3 className="text-2xl font-display font-light mb-2">{t.product.p2_title}</h3>
              <p className="text-gray-500 font-sans font-light text-sm leading-relaxed mb-6">
                {t.product.p2_desc}
              </p>
              <ul className="text-xs font-bold tracking-widest text-gray-400 space-y-2 uppercase">
                <li>{t.product.p2_spec1}</li>
                <li>{t.product.p2_spec2}</li>
                <li>{t.product.p2_spec3}</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;