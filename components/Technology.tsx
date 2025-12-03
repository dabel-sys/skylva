
import React, { useRef, useState, useEffect } from 'react';
import { m, useSpring, useTransform, useMotionValue, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Cpu, Scan, Wifi, Maximize2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useView } from '../contexts/ViewContext';
import { ViewState } from '../types';
import TextReveal from './TextReveal';

const Technology: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { setView } = useView();
  const isInView = useInView(ref, { margin: "-20%" });
  
  // Mouse / Scanner State
  const mouseX = useMotionValue(0.5); // 0 to 1
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Smooth physics for the scanner movement
  const springConfig = { stiffness: 150, damping: 30, mass: 0.5 };
  const scannerX = useSpring(mouseX, springConfig);

  // Transform scanner X (0-1) to percentage string for clip-path
  const clipPath = useTransform(scannerX, (val) => {
    const percentage = val * 100;
    return `inset(0 0 0 ${percentage}%)`; // Reveals the Tech layer from right to left based on mouse
  });

  // Inverse clip path for the natural layer (optional, but we keep natural layer full and overlay tech)
  // Actually, we want the scanner to "Reveal" the tech layer.
  // Let's say Tech is ON TOP. 
  // If mouse is at 0 (left), Tech should be visible from 0 to something? 
  // Let's make the scanner line follow the mouse.
  // Left side of line = Nature. Right side of line = Tech.
  // So Tech Layer is clipped: inset(0 0 0 X%) -> This hides the left part of the tech layer.
  
  // Mobile Autoplay logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && isInView) {
      // Auto-scan animation for mobile
      const duration = 4000;
      const start = Date.now();
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - start;
        const progress = (Math.sin(elapsed / duration * Math.PI) + 1) / 2; // Oscillate 0-1-0
        mouseX.set(progress);
        requestAnimationFrame(animate);
      };
      const animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
  }, [isMobile, isInView, mouseX]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    mouseX.set(relativeX);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovering(false);
    mouseX.set(0.5); // Reset to center
  };

  const handleExplore = () => {
    setView(ViewState.TECHNOLOGY);
    window.scrollTo(0, 0);
  };

  // Hotspots Configuration
  const hotspots = [
    { 
      id: 1, 
      x: 0.25, 
      y: 0.3, 
      label: "Bifacial Glass", 
      value: "+30% Yield",
      icon: <Zap size={14} />,
      desc: "Captures reflected light from below."
    },
    { 
      id: 2, 
      x: 0.65, 
      y: 0.45, 
      label: "Neural Core", 
      value: "SkylvaOS™", 
      icon: <Cpu size={14} />,
      desc: "Real-time weather adaptation."
    },
    { 
      id: 3, 
      x: 0.8, 
      y: 0.2, 
      label: "Connectivity", 
      value: "Matter Ready", 
      icon: <Wifi size={14} />,
      desc: "Seamless smart home integration."
    }
  ];

  return (
    <section 
      ref={ref}
      id="technology"
      className="relative h-[120vh] md:h-screen w-full bg-black overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 
        LAYER 1: NATURE (Underneath) 
        The "Finished Product" view.
      */}
      <div className="absolute inset-0 z-0">
         <img 
            src="/images/hero.jpg" 
            alt="Skylva Natural View" 
            className="w-full h-full object-cover opacity-60"
         />
         {/* Nature Labels (Fade out when scanner passes?) */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-[10vw] font-display font-light text-white/10 tracking-widest uppercase mix-blend-overlay">
               Architecture
            </h2>
         </div>
      </div>

      {/* 
        LAYER 2: TECH (Overlay) 
        The "X-Ray" view. High contrast, technical, gridded.
      */}
      <m.div 
        style={{ clipPath }}
        className="absolute inset-0 z-10 bg-[#050505]"
      >
         {/* Tech Styled Image */}
         <img 
            src="/images/hero.jpg" 
            alt="Skylva Tech View" 
            className="w-full h-full object-cover opacity-40 grayscale contrast-125 filter hue-rotate-180 invert"
         />
         
         {/* Tech Grid Overlay */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0015_1px,transparent_1px),linear-gradient(to_bottom,#00ff0015_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
         
         {/* Tech Big Label */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-[10vw] font-display font-light text-skylva-green/20 tracking-widest uppercase">
               Intelligence
            </h2>
         </div>

         {/* Hotspots - Only visible in Tech Layer */}
         {hotspots.map((spot) => (
            <Hotspot 
               key={spot.id} 
               spot={spot} 
               scannerX={scannerX}
            />
         ))}

         {/* Technical Data HUD Elements */}
         <div className="absolute bottom-12 right-12 hidden md:block">
            <div className="font-mono text-xs text-skylva-green/60 mb-2">SYSTEM STATUS</div>
            <div className="flex gap-1 mb-1">
               <span className="w-1 h-3 bg-skylva-green animate-pulse" />
               <span className="w-1 h-3 bg-skylva-green animate-pulse delay-75" />
               <span className="w-1 h-3 bg-skylva-green animate-pulse delay-150" />
            </div>
            <div className="font-mono text-xs text-skylva-green">ONLINE</div>
         </div>
      </m.div>

      {/* 
        LAYER 3: THE SCANNER UI 
        The vertical line and handle.
      */}
      <ScannerLine x={scannerX} />

      {/* 
        LAYER 4: STATIC CONTENT UI 
        Title and CTA that sits above everything.
      */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30 flex flex-col justify-between px-6 md:px-12 py-24 md:py-12">
         {/* Header */}
         <div className="max-w-xl pointer-events-auto">
            <m.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
            >
               <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-white rounded-full" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/70">The Invisible Layer</span>
               </div>
               <h2 className="text-4xl md:text-6xl font-display font-light text-white mb-6 leading-[0.9]">
                  <TextReveal mode="chars" stagger={0.02}>{t.technology.title}</TextReveal>
               </h2>
               <p className="text-white/60 font-sans font-light text-lg max-w-sm mb-8">
                  {t.technology.body}
               </p>
               
               <button 
                  onClick={handleExplore}
                  className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white hover:text-skylva-green transition-colors"
               >
                  <span className="border-b border-white/30 pb-1 group-hover:border-skylva-green transition-colors">Deep Dive</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </m.div>
         </div>

         {/* Mobile Hint */}
         <div className="md:hidden absolute bottom-24 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-mono uppercase tracking-widest">
            Scanning System...
         </div>
         
         {/* Desktop Hint */}
         <m.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 text-[10px] font-mono uppercase tracking-widest items-center gap-2"
         >
            <Scan size={14} />
            <span>Move cursor to Scan</span>
         </m.div>
      </div>

    </section>
  );
};

// --- Subcomponents ---

const ScannerLine = ({ x }: { x: any }) => {
   // Map 0-1 to 0-100%
   const left = useTransform(x, (val: number) => `${val * 100}%`);
   
   return (
      <m.div 
         style={{ left }}
         className="absolute top-0 bottom-0 w-[1px] bg-white z-20 pointer-events-none will-change-transform"
      >
         <div className="absolute top-0 bottom-0 -left-[20px] w-[40px] bg-gradient-to-r from-transparent via-skylva-green/20 to-transparent blur-sm" />
         <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 border border-white/50 rounded-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="w-1 h-1 bg-white rounded-full" />
         </div>
      </m.div>
   )
}

const Hotspot = ({ spot, scannerX }: { spot: any, scannerX: any }) => {
   // Only visible if the scanner is to the RIGHT of this spot (meaning Tech layer is revealed at this X)
   // Actually, clipPath clips the LEFT side if we used inset(0 0 0 X%).
   // Wait, inset(0 0 0 50%) clips the left 50%. So only right 50% is visible.
   // If mouse is at 0.5. Scanner is at 50%. Tech layer is visible from 50% to 100%.
   // So a hotspot at 0.25 (25%) would be HIDDEN (clipped).
   // A hotspot at 0.75 (75%) would be VISIBLE.
   // So we assume the Tech Layer is on the RIGHT side of the scanner line.
   
   // We want points to "pop" when revealed.
   
   return (
      <div 
         className="absolute w-64 pointer-events-auto group"
         style={{ left: `${spot.x * 100}%`, top: `${spot.y * 100}%` }}
      >
         {/* The Dot */}
         <div className="relative">
            <div className="w-3 h-3 bg-skylva-green rounded-full shadow-[0_0_10px_#4ade80] animate-pulse" />
            <div className="absolute inset-0 w-3 h-3 border border-skylva-green rounded-full animate-ping opacity-20" />
         </div>
         
         {/* The Line & Label */}
         <div className="absolute top-3 left-3">
             <div className="w-[1px] h-8 bg-skylva-green/50 mb-2 origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
             <div className="w-8 h-[1px] bg-skylva-green/50 mb-2 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100" />
             
             <div className="bg-black/80 backdrop-blur-md border border-skylva-green/30 p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 min-w-[200px] transform translate-y-2 group-hover:translate-y-0">
                 <div className="flex items-center gap-2 text-skylva-green mb-1">
                     {spot.icon}
                     <span className="text-[10px] font-bold uppercase tracking-widest">{spot.label}</span>
                 </div>
                 <div className="text-white text-lg font-display mb-1">{spot.value}</div>
                 <div className="text-white/50 text-xs font-mono leading-relaxed">{spot.desc}</div>
             </div>
         </div>

         {/* Default Label (Always visible when point is revealed) */}
         <div className="absolute left-6 top-0 text-xs font-mono text-skylva-green/70 opacity-100 group-hover:opacity-0 transition-opacity">
            {spot.label}
         </div>
      </div>
   );
};

export default Technology;
    