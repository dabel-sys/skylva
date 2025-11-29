
import React, { useState, useRef, useEffect } from 'react';
import { m, useScroll, useTransform, AnimatePresence, useMotionTemplate, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
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

  // Cinematic Darkening Logic
  const bgOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.7], [0, 1, 1, 0]);
  const bgColor = useMotionTemplate`rgba(0, 0, 0, ${bgOpacity})`;
  
  // Text color synchronization
  const textColorValue = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.7], [0, 1, 1, 0]);
  const headerColor = useMotionTemplate`rgba(255, 255, 255, ${textColorValue})`;
  
  const darkTextOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.7], [1, 0, 0, 1]);

  // Glow / Pop effect
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
  };

  // Auto-play Logic
  useEffect(() => {
    if (isInView && !isPaused) {
      const interval = setInterval(() => {
        paginate(1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isInView, isPaused, page]);

  return (
    <section id="structures" ref={targetRef} className="min-h-[100dvh] pt-12 pb-24 md:py-32 flex flex-col justify-center bg-skylva-offwhite text-skylva-charcoal overflow-hidden relative transition-colors duration-0">
      
      {/* Dynamic Background Overlay */}
      <m.div 
        style={{ backgroundColor: bgColor }}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Header Section */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 mb-8 md:mb-12 relative z-10">
         <div className="flex flex-col md:flex-row justify-between items-end pb-4 transition-colors duration-500">
            <m.div style={{ y: yHeader }} className="relative">
              <div className="relative">
                 <m.h2 style={{ opacity: darkTextOpacity }} className="text-4xl md:text-6xl font-display font-light mb-4 absolute top-0 left-0 w-full text-skylva-charcoal">
                    <TextReveal>{t.product.title}</TextReveal>
                 </m.h2>
                 <m.h2 style={{ color: headerColor }} className="text-4xl md:text-6xl font-display font-light mb-4 relative z-10">
                    <TextReveal>{t.product.title}</TextReveal>
                 </m.h2>
              </div>
            </m.div>
         </div>
      </div>

      {/* 
        CAROUSEL CONTAINER 
        Matches Porsche Style:
        - Card based
        - Overlay text
        - Stacked buttons
        - Controls below
      */}
      <div 
        className="relative w-full max-w-[1920px] mx-auto px-6 md:px-12 h-[65vh] md:h-[75vh] z-10 flex flex-col items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <m.div 
            style={{ boxShadow, scale }}
            className="w-full h-full relative rounded-2xl md:rounded-3xl overflow-hidden bg-gray-900 border-[0.8pt] border-white/10"
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
                  const swipe = swipePower(offset.x, velocity.x);
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
                className="absolute inset-0 w-full h-full touch-pan-y cursor-grab active:cursor-grabbing bg-transparent"
              >
                {/* Image Layer */}
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.title}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
                
                {/* Gradient Overlay for Text Readability */}
                <div 
                  draggable={false} 
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent select-none pointer-events-none" 
                />

                {/* Content Overlay (Bottom) */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 pointer-events-none">
                    <div className="pointer-events-auto max-w-lg">
                        {/* Tag (Like the 'Gasoline' tag) */}
                        <div className="inline-block bg-white/20 backdrop-blur-md text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded mb-4">
                            {currentProduct.tag}
                        </div>

                        {/* Title & Description */}
                        <m.h3 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-2xl md:text-4xl font-display font-light text-white mb-2"
                        >
                            {currentProduct.title}
                        </m.h3>
                        
                        <m.p 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-white/80 font-sans font-light text-sm md:text-base leading-relaxed mb-8 line-clamp-2 md:line-clamp-none"
                        >
                            {currentProduct.desc}
                        </m.p>

                        {/* Stacked Buttons (Porsche Style) */}
                        <m.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col gap-3 w-full md:w-auto"
                        >
                            <button className="bg-white text-black w-full md:w-auto px-8 py-3.5 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                                Explore {currentProduct.title}
                            </button>
                            <button className="bg-transparent border border-white text-white w-full md:w-auto px-8 py-3.5 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
                                Build your own
                            </button>
                        </m.div>
                    </div>
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
        </m.div>

        {/* 
          External Controls (Below Card) 
          Matches the reference image's control bar style 
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

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default ProductShowcase;
