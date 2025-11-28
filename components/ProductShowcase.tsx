
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const ProductShowcase: React.FC = () => {
  const targetRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  const { t } = useLanguage();
  
  const [[page, direction], setPage] = useState([0, 0]);

  // Parallax for header
  const yHeader = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const products = [
    {
      id: 'p1',
      title: t.product.p1_title,
      desc: t.product.p1_desc,
      image: '/images/product-1.png',
      specs: [t.product.p1_spec1, t.product.p1_spec2, t.product.p1_spec3]
    },
    {
      id: 'p2',
      title: t.product.p2_title,
      desc: t.product.p2_desc,
      image: '/images/product-2.png',
      specs: [t.product.p2_spec1, t.product.p2_spec2, t.product.p2_spec3]
    },
    {
      id: 'c1',
      title: 'C1 Carport',
      desc: 'Protect your vehicle with architectural solar. Fast charging integrated.',
      image: '/images/product-3.png',
      specs: ['22kW EV Charger', '100% Waterproof', 'Integrated Lighting']
    }
  ];

  const imageIndex = Math.abs(page % products.length);
  const currentProduct = products[imageIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section id="structures" ref={targetRef} className="py-32 bg-skylva-offwhite text-skylva-charcoal overflow-hidden relative">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 relative z-10">
         <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-300 pb-8">
            <motion.div style={{ y: yHeader }} className="relative">
              <h2 className="text-4xl md:text-6xl font-display font-light mb-4">
                  <TextReveal>{t.product.title}</TextReveal>
              </h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-gray-500 font-sans tracking-wide"
              >
                  {t.product.subtitle}
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="mt-6 md:mt-0 flex gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
               {/* Desktop Navigation Buttons */}
               <div className="hidden md:flex gap-2">
                 <button 
                   onClick={() => paginate(-1)}
                   className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-skylva-matte hover:text-white transition-all duration-300"
                 >
                   <ChevronLeft size={20} />
                 </button>
                 <button 
                   onClick={() => paginate(1)}
                   className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-skylva-matte hover:text-white transition-all duration-300"
                 >
                   <ChevronRight size={20} />
                 </button>
               </div>
            </motion.div>
         </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-[1920px] mx-auto px-0 md:px-12 h-[70vh] md:h-[80vh]">
        <div className="w-full h-full relative rounded-none md:rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -10000) {
                    paginate(1);
                  } else if (swipe > 10000) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Product Info Card (Floating Glass) */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pointer-events-none flex justify-start items-end">
                   <motion.div 
                      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="bg-black/60 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-2xl max-w-lg w-full shadow-2xl pointer-events-auto"
                   >
                      <h3 className="text-3xl font-display font-light mb-4 text-white">
                        {currentProduct.title}
                      </h3>
                      <p className="text-white/80 font-sans font-light text-sm leading-relaxed mb-8">
                        {currentProduct.desc}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                        {currentProduct.specs.map((spec, idx) => (
                           <div key={idx} className="text-center">
                              <span className="block text-white font-bold text-xs uppercase tracking-widest mb-1">{spec}</span>
                              <span className="block w-1 h-1 bg-skylva-green rounded-full mx-auto mt-2" />
                           </div>
                        ))}
                      </div>

                      <div className="mt-8 flex gap-4">
                         <button className="flex-1 bg-white text-black py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-skylva-sand transition-colors">
                            Order Now
                         </button>
                         <button className="flex-1 border border-white/30 text-white py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:border-white transition-colors">
                            Details
                         </button>
                      </div>
                   </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation Overlays */}
            <div className="absolute inset-y-0 left-0 w-16 z-10 md:hidden flex items-center justify-center" onClick={() => paginate(-1)}>
               <div className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white/80">
                 <ChevronLeft size={24} />
               </div>
            </div>
            <div className="absolute inset-y-0 right-0 w-16 z-10 md:hidden flex items-center justify-center" onClick={() => paginate(1)}>
               <div className="bg-black/20 backdrop-blur-md p-2 rounded-full text-white/80">
                 <ChevronRight size={24} />
               </div>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-6 right-6 md:right-12 z-20 flex gap-2">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPage([idx, idx > imageIndex ? 1 : -1])}
                    className={`h-1 rounded-full transition-all duration-500 ${idx === imageIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/80'}`}
                  />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default ProductShowcase;
