
import React, { useState, useRef, useEffect } from 'react';
import { m, useScroll, useTransform, AnimatePresence, useMotionTemplate, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
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
  const isInView = useInView(targetRef, { margin: "-20%" });
  const [isPaused, setIsPaused] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // Mobile card state
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);
  
  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // Cinematic Darkening Logic - "Snap & Hold" Effect
  // Adjusted end range to [0.65, 0.7] to fade out sooner as user scrolls to next section
  const bgOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.7], [0, 1, 1, 0]);
  const bgColor = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;
  
  // Text color synchronization with the background
  const textColorValue = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.7], [0, 1, 1, 0]);
  const headerColor = useMotionTemplate`rgba(255, 255, 255, ${textColorValue})`;
  
  // Dynamic Button Colors
  const buttonColor = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.7], ["#2A2A2A", "#FFFFFF", "#FFFFFF", "#2A2A2A"]);
  const buttonBorderColor = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.7], ["rgba(0,0,0,0.1)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0.2)", "rgba(0,0,0,0.1)"]);
  
  // Fade out dark text quickly as background goes black
  const darkTextOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.7], [1, 0, 0, 1]);

  // Glow / Pop effect for the carousel container
  const glowOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.7], [0, 0.3, 0.3, 0]);
  const blackShadowOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.7], [0.3, 0, 0, 0.3]);
  const boxShadow = useMotionTemplate`0 25px 50px -12px rgba(0, 0, 0, ${blackShadowOpacity}), 0 0 60px rgba(255, 255, 255, ${glowOpacity})`;
  const scale = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.7], [1, 1.02, 1.02, 1]);

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
    setIsExpanded(false); // Reset mobile expansion on slide change
  };

  // Auto-play Logic
  useEffect(() => {
    if (isInView && !isPaused && !isExpanded) { // Don't auto-play if user is reading expanded details
      const interval = setInterval(() => {
        paginate(1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isInView, isPaused, page, isExpanded]);

  // Swipe Hint Timer
  useEffect(() => {
    if (isInView) {
      setShowSwipeHint(true);
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section id="structures" ref={targetRef} className="min-h-[100dvh] py-24 md:py-32 flex flex-col justify-center bg-skylva-offwhite text-skylva-charcoal overflow-hidden relative transition-colors duration-0">
      
      {/* Dynamic Background Overlay */}
      <m.div 
        style={{ backgroundColor: bgColor }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Header Section */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 mb-8 md:mb-12 relative z-10">
         <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-300/20 pb-8 transition-colors duration-500">
            <m.div style={{ y: yHeader }} className="relative">
              {/* Dual-layer text for smooth color transition */}
              <div className="relative">
                 {/* Base Dark Layer */}
                 <m.h2 style={{ opacity: darkTextOpacity }} className="text-4xl md:text-6xl font-display font-light mb-4 absolute top-0 left-0 w-full text-skylva-charcoal">
                    <TextReveal>{t.product.title}</TextReveal>
                 </m.h2>
                 {/* Overlay White Layer */}
                 <m.h2 style={{ color: headerColor }} className="text-4xl md:text-6xl font-display font-light mb-4 relative z-10">
                    <TextReveal>{t.product.title}</TextReveal>
                 </m.h2>
              </div>

              <m.p 
                style={{ color: headerColor }}
                className="text-gray-500 font-sans tracking-wide mix-blend-screen"
              >
                  {t.product.subtitle}
              </m.p>
            </m.div>
            
            <m.div 
              className="mt-6 md:mt-0 flex gap-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
               {/* Desktop Navigation Buttons */}
               <div className="hidden md:flex gap-2">
                 <m.button 
                   onClick={() => paginate(-1)}
                   style={{ borderColor: buttonBorderColor, color: buttonColor }}
                   className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
                 >
                   <ChevronLeft size={20} className="relative z-10" />
                 </m.button>
                 <m.button 
                   onClick={() => paginate(1)}
                   style={{ borderColor: buttonBorderColor, color: buttonColor }}
                   className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
                 >
                   <ChevronRight size={20} className="relative z-10" />
                 </m.button>
               </div>
            </m.div>
         </div>
      </div>

      {/* Carousel Container */}
      <div 
        className="relative w-full max-w-[1920px] mx-auto px-6 md:px-12 h-[65vh] md:h-[80vh] z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <m.div 
            style={{ boxShadow, scale }}
            className="w-full h-full relative rounded-2xl md:rounded-3xl overflow-hidden bg-gray-200 border-[0.8pt] border-black/5 md:border-white/10"
        >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <m.div
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Product Info Card (Collapsible Glass Drawer) */}
                <div className="absolute bottom-0 left-0 w-full p-2 md:p-12 pointer-events-none flex justify-start items-end z-30">
                   <m.div 
                      layout
                      onClick={() => !isDesktop && setIsExpanded(!isExpanded)}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ layout: { duration: 0.4, type: "spring", stiffness: 300, damping: 30 } }}
                      className={`
                        bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl pointer-events-auto
                        ${isDesktop ? 'p-10 rounded-2xl max-w-lg w-full' : 'p-4 rounded-xl w-full cursor-pointer active:scale-95 transition-transform'}
                      `}
                   >
                      <div className="flex justify-between items-center">
                          <m.h3 layout className="text-xl md:text-3xl font-display font-light text-white">
                            {currentProduct.title}
                          </m.h3>
                          
                          {/* Mobile Toggle Button */}
                          {!isDesktop && (
                             <div className="bg-white/10 rounded-full p-2 text-white">
                                {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
                             </div>
                          )}
                      </div>

                      <AnimatePresence>
                        {(isExpanded || isDesktop) && (
                          <m.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                              <m.p className="text-white/80 font-sans font-light text-xs md:text-sm leading-relaxed mb-6 md:mb-8 mt-4">
                                {currentProduct.desc}
                              </m.p>
                              
                              <div className="grid grid-cols-3 gap-2 md:gap-4 border-t border-white/10 pt-4 md:pt-6">
                                {currentProduct.specs.map((spec, idx) => (
                                  <div key={idx} className="text-center">
                                      <span className="block text-white font-bold text-[10px] md:text-xs uppercase tracking-widest mb-1 truncate">{spec}</span>
                                      <span className="block w-1 h-1 bg-skylva-green rounded-full mx-auto mt-2" />
                                  </div>
                                ))}
                              </div>

                              <div className="mt-6 md:mt-8 flex gap-3 md:gap-4">
                                <button className="flex-1 bg-white text-black py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-skylva-sand transition-colors">
                                    Order Now
                                </button>
                                <button className="flex-1 border border-white/30 text-white py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:border-white transition-colors">
                                    Details
                                </button>
                              </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                   </m.div>
                </div>
              </m.div>
            </AnimatePresence>

            {/* Mobile Swipe Hint (Minimalistic Pulsing Arrows) */}
            <AnimatePresence>
                {showSwipeHint && (
                    <m.div 
                        key="swipe-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-y-0 right-4 z-20 md:hidden flex items-center justify-center pointer-events-none"
                    >
                         <m.div 
                             animate={{ x: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                             transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                         >
                            <ChevronRight size={32} strokeWidth={1.5} className="text-white drop-shadow-md" />
                         </m.div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* Pagination Indicators */}
            <div className="absolute top-4 right-4 md:bottom-6 md:right-12 z-20 flex gap-2">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPage([idx, idx > imageIndex ? 1 : -1])}
                    className={`h-1 rounded-full transition-all duration-500 ${idx === imageIndex ? 'w-6 md:w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/80'}`}
                  />
                ))}
            </div>
        </m.div>
      </div>
    </section>
  );
};

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default ProductShowcase;
