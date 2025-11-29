
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionTemplate } from 'framer-motion';
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
  const { t } = useLanguage();
  
  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Cinematic Darkening Logic - "Snap" Effect
  // Instead of a slow fade, we use a tight range around the center (0.5).
  // The effect kicks in at 0.4, peaks at 0.5, and is gone by 0.6.
  const bgOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
  const bgColor = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;
  
  // Text color synchronization with the background
  const textColorValue = useTransform(scrollYProgress, [0.42, 0.5, 0.58], [0, 1, 0]);
  const headerColor = useMotionTemplate`rgba(255, 255, 255, ${textColorValue})`;
  
  // Fade out dark text quickly as background goes black
  const darkTextOpacity = useTransform(scrollYProgress, [0.42, 0.5, 0.58], [1, 0, 1]);

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
    <section id="structures" ref={targetRef} className="min-h-screen py-24 md:py-32 flex flex-col justify-center bg-skylva-offwhite text-skylva-charcoal overflow-hidden relative transition-colors duration-0">
      
      {/* Dynamic Background Overlay */}
      <motion.div 
        style={{ backgroundColor: bgColor }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Header Section */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 mb-8 md:mb-12 relative z-10">
         <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-300/20 pb-8 transition-colors duration-500">
            <motion.div style={{ y: yHeader }} className="relative">
              {/* Dual-layer text for smooth color transition */}
              <div className="relative">
                 {/* Base Dark Layer */}
                 <motion.h2 style={{ opacity: darkTextOpacity }} className="text-4xl md:text-6xl font-display font-light mb-4 absolute top-0 left-0 w-full text-skylva-charcoal">
                    <TextReveal>{t.product.title}</TextReveal>
                 </motion.h2>
                 {/* Overlay White Layer */}
                 <motion.h2 style={{ color: headerColor }} className="text-4xl md:text-6xl font-display font-light mb-4 relative z-10">
                    <TextReveal>{t.product.title}</TextReveal>
                 </motion.h2>
              </div>

              <motion.p 
                style={{ color: headerColor }}
                className="text-gray-500 font-sans tracking-wide mix-blend-screen"
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
                   className="w-12 h-12 rounded-full border border-white/10 md:border-black/10 flex items-center justify-center hover:bg-skylva-matte hover:text-white transition-all duration-300 relative overflow-hidden group"
                 >
                    {/* Invert colors based on background darkness */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   <ChevronLeft size={20} className="relative z-10 group-hover:text-black transition-colors" />
                 </button>
                 <button 
                   onClick={() => paginate(1)}
                   className="w-12 h-12 rounded-full border border-white/10 md:border-black/10 flex items-center justify-center hover:bg-skylva-matte hover:text-white transition-all duration-300 relative overflow-hidden group"
                 >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   <ChevronRight size={20} className="relative z-10 group-hover:text-black transition-colors" />
                 </button>
               </div>
            </motion.div>
         </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full max-w-[1920px] mx-auto px-6 md:px-12 h-[65vh] md:h-[80vh] z-10">
        <div className="w-full h-full relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-gray-200 border-[0.8pt] border-black/5 md:border-white/10">
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
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 pointer-events-none flex justify-start items-end">
                   <motion.div 
                      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="bg-black/60 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-xl md:rounded-2xl max-w-lg w-full shadow-2xl pointer-events-auto"
                   >
                      <h3 className="text-2xl md:text-3xl font-display font-light mb-2 md:mb-4 text-white">
                        {currentProduct.title}
                      </h3>
                      <p className="text-white/80 font-sans font-light text-xs md:text-sm leading-relaxed mb-6 md:mb-8 line-clamp-2 md:line-clamp-none">
                        {currentProduct.desc}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2 md:gap-4 border-t border-white/10 pt-4 md:pt-6">
                        {currentProduct.specs.map((spec, idx) => (
                           <div key={idx} className="text-center">
                              <span className="block text-white font-bold text-[10px] md:text-xs uppercase tracking-widest mb-1 truncate">{spec}</span>
                              <span className="block w-1 h-1 bg-skylva-green rounded-full mx-auto mt-2" />
                           </div>
                        ))}
                      </div>

                      <div className="mt-6 md:mt-8 flex gap-3 md:gap-4">
                         <button className="flex-1 bg-white text-black py-2 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-skylva-sand transition-colors">
                            Order Now
                         </button>
                         <button className="flex-1 border border-white/30 text-white py-2 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:border-white transition-colors">
                            Details
                         </button>
                      </div>
                   </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Navigation Overlays */}
            <div className="absolute inset-y-0 left-0 w-12 z-10 md:hidden flex items-center justify-center" onClick={() => paginate(-1)}>
               <div className="bg-black/20 backdrop-blur-md p-1.5 rounded-full text-white/80 ml-2">
                 <ChevronLeft size={20} />
               </div>
            </div>
            <div className="absolute inset-y-0 right-0 w-12 z-10 md:hidden flex items-center justify-center" onClick={() => paginate(1)}>
               <div className="bg-black/20 backdrop-blur-md p-1.5 rounded-full text-white/80 mr-2">
                 <ChevronRight size={20} />
               </div>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-12 z-20 flex gap-2">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPage([idx, idx > imageIndex ? 1 : -1])}
                    className={`h-1 rounded-full transition-all duration-500 ${idx === imageIndex ? 'w-6 md:w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/80'}`}
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
