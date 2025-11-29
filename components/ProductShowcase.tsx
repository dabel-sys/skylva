
import React, { useState, useRef, useEffect } from 'react';
import { m, useScroll, useTransform, AnimatePresence, useMotionTemplate, useInView, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Plus, Minus, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1, // Keep opacity 1 for a solid slide effect like Porsche
    scale: 0.95
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 1,
    scale: 0.95
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

  // Cinematic Darkening Logic - SMOOTHED
  // 1. Define the raw target opacity based on scroll position
  // Widen transitions slightly for softness: 0.3->0.45 (Fade In), 0.6->0.75 (Fade Out)
  const targetOpacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.75], [0, 1, 1, 0]);
  
  // 2. Apply spring physics to creating a fluid, non-linear transition (Shock absorber)
  const smoothOpacity = useSpring(targetOpacity, { stiffness: 50, damping: 20, restDelta: 0.001 });

  // 3. Drive all visual changes from this single smooth value
  const bgColor = useMotionTemplate`rgba(0, 0, 0, ${smoothOpacity})`;
  
  // Text color synchronization
  const headerColor = useMotionTemplate`rgba(255, 255, 255, ${smoothOpacity})`;
  const darkTextOpacity = useTransform(smoothOpacity, [0, 1], [1, 0]);

  // Dynamic Button Colors - Interpolate based on the smooth opacity
  const buttonColor = useTransform(smoothOpacity, [0, 0.5, 1], ["#2A2A2A", "#FFFFFF", "#FFFFFF"]);
  const buttonBorderColor = useTransform(smoothOpacity, [0, 0.5, 1], ["rgba(0,0,0,0.1)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0.2)"]);
  
  // Glow / Pop effect
  const glowOpacity = useTransform(smoothOpacity, [0, 1], [0, 0.3]);
  const blackShadowOpacity = useTransform(smoothOpacity, [0, 1], [0.3, 0]);
  const boxShadow = useMotionTemplate`0 25px 50px -12px rgba(0, 0, 0, ${blackShadowOpacity}), 0 0 60px rgba(255, 255, 255, ${glowOpacity})`;
  const scale = useTransform(smoothOpacity, [0, 1], [1, 1.02]);

  const [[page, direction], setPage] = useState([0, 0]);

  // Parallax for header
  const yHeader = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const products = [
    {
      id: 'p1',
      title: t.product.p1_title,
      desc: t.product.p1_desc,
      image: '/images/product-1.png',
      tag: t.product.p1_spec1, // Using first spec as the "Tag" (e.g. Gasoline in reference)
      link: '#configure'
    },
    {
      id: 'p2',
      title: t.product.p2_title,
      desc: t.product.p2_desc,
      image: '/images/product-2.png',
      tag: t.product.p2_spec1,
      link: '#configure'
    },
    {
      id: 'c1',
      title: 'C1 Carport',
      desc: 'Protect your vehicle with architectural solar. Fast charging integrated.',
      image: '/images/product-3.png',
      tag: 'Fast Charging',
      link: '#configure'
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
    <section id="structures" ref={targetRef} className="min-h-[100dvh] pt-12 pb-24 md:py-32 flex flex-col justify-center bg-skylva-offwhite text-skylva-charcoal overflow-hidden relative transition-colors duration-0 transform-gpu">
      
      {/* Dynamic Background Overlay */}
      <m.div 
        style={{ backgroundColor: bgColor }}
        className="absolute inset-0 z-0 pointer-events-none will-change-transform"
      />

      {/* Header Section */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 mb-8 md:mb-12 relative z-10">
         <div className="flex flex-col md:flex-row justify-between items-end pb-4 transition-colors duration-500">
            <m.div style={{ y: yHeader }} className="relative will-change-transform">
              <div className="relative">
                 <m.h2 style={{ opacity: darkTextOpacity }} className="text-4xl md:text-6xl font-display font-light mb-4 absolute top-0 left-0 w-full text-skylva-charcoal will-change-transform">
                    <TextReveal>{t.product.title}</TextReveal>
                 </m.h2>
                 <m.h2 style={{ color: headerColor }} className="text-4xl md:text-6xl font-display font-light mb-4 relative z-10 will-change-transform">
                    <TextReveal>{t.product.title}</TextReveal>
                 </m.h2>
              </div>
            </m.div>
         </div>
      </div>

      {/* 
        CAROUSEL CONTAINER 
      */}
      <div 
        className="relative w-full max-w-[1920px] mx-auto px-6 md:px-12 h-[65vh] md:h-[75vh] z-10 flex flex-col items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <m.div 
            style={{ boxShadow, scale }}
            className="w-full h-full relative rounded-2xl md:rounded-3xl overflow-hidden bg-gray-900 border-[0.8pt] border-white/10 will-change-transform transform-gpu"
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
                dragMomentum={false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -5000 || offset.x < -10) {
                    paginate(1);
                  } else if (swipe > 5000 || offset.x > 10) {
                    paginate(-1);
                  }
                }}
                style={{ 
                   touchAction: 'pan-y',
                   WebkitTouchCallout: 'none',
                   WebkitUserSelect: 'none',
                   userSelect: 'none'
                }}
                className="absolute inset-0 w-full h-full touch-pan-y cursor-grab active:cursor-grabbing bg-transparent will-change-transform"
              >
                {/* Image Layer */}
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.title}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  decoding="async"
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div 
                  draggable={false} 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent select-none pointer-events-none" 
                />

                {/* Content Overlay (Bottom) */}
                <div className="absolute bottom-0 left-0 w-full p-2 md:p-12 z-20 pointer-events-none flex justify-start items-end">
                    {/* Glass Drawer Container */}
                    <m.div 
                      layout
                      onClick={() => !isDesktop && setIsExpanded(!isExpanded)}
                      className={`
                        bg-transparent md:bg-transparent pointer-events-auto
                        ${isDesktop ? 'max-w-lg w-full' : 'w-full cursor-pointer'}
                      `}
                    >
                        {/* Mobile: Minimal View (Just Title + Toggle) */}
                        <div className={`
                            ${!isDesktop ? 'bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl transition-all duration-300' : ''}
                        `}>
                            <div className="flex justify-between items-center mb-2 md:mb-4">
                                <div>
                                    <div className="inline-block bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-2 md:mb-4">
                                        {currentProduct.tag}
                                    </div>
                                    <m.h3 layout className="text-xl md:text-4xl font-display font-light text-white leading-tight">
                                        {currentProduct.title}
                                    </m.h3>
                                </div>
                                
                                {/* Mobile Toggle Icon */}
                                {!isDesktop && (
                                    <div className="bg-white/10 rounded-full p-2 text-white ml-4 flex-shrink-0">
                                        {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
                                    </div>
                                )}
                            </div>

                            {/* Expandable Content */}
                            <AnimatePresence>
                                {(isExpanded || isDesktop) && (
                                    <m.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <m.p className="text-white/80 font-sans font-light text-sm md:text-base leading-relaxed mb-6 line-clamp-2 md:line-clamp-none">
                                            {currentProduct.desc}
                                        </m.p>

                                        <div className="flex flex-col gap-3 w-full md:w-auto">
                                            <button className="bg-white text-black w-full md:w-auto px-8 py-3.5 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                                                Explore {currentProduct.title}
                                            </button>
                                            <button className="bg-transparent border border-white text-white w-full md:w-auto px-8 py-3.5 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                                                Build your own
                                            </button>
                                        </div>
                                    </m.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </m.div>
                </div>
              </m.div>
            </AnimatePresence>

            {/* Desktop Navigation Arrows (Overlay) */}
            <div className="hidden md:flex absolute inset-y-0 left-4 items-center justify-center z-20 pointer-events-auto">
               <button 
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all"
               >
                 <ChevronLeft size={20} />
               </button>
            </div>
            <div className="hidden md:flex absolute inset-y-0 right-4 items-center justify-center z-20 pointer-events-auto">
               <button 
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-white/20 transition-all"
               >
                 <ChevronRight size={20} />
               </button>
            </div>
            
            {/* Mobile Navigation Buttons (Minimalistic) */}
            <div className="md:hidden absolute inset-y-0 left-4 z-30 flex items-center justify-center pointer-events-none">
               <button 
                  onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                  className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white pointer-events-auto active:bg-black/40 transition-colors"
               >
                 <ChevronLeft size={16} />
               </button>
            </div>
            <div className="md:hidden absolute inset-y-0 right-4 z-30 flex items-center justify-center pointer-events-none">
               <button 
                  onClick={(e) => { e.stopPropagation(); paginate(1); }}
                  className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white pointer-events-auto active:bg-black/40 transition-colors"
               >
                 <ChevronRight size={16} />
               </button>
            </div>
        </m.div>

        {/* 
          External Controls (Below Card) 
        */}
        <div className="flex items-center gap-4 mt-6 z-20">
             {/* Pagination Dots */}
            <div className="flex gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPage([idx, idx > imageIndex ? 1 : -1])}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === imageIndex ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'}`}
                  />
                ))}
            </div>

            {/* Pause/Play Button */}
            <button 
                onClick={() => setIsPaused(!isPaused)}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
            >
                {isPaused ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
            </button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
