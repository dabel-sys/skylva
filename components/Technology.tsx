
import React, { useRef, useState, useEffect } from 'react';
import { m, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Wind, ArrowRight, Activity, Layers, Scan } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useView } from '../contexts/ViewContext';
import { ViewState } from '../types';
import TextReveal from './TextReveal';

const Technology: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { setView } = useView();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll Progress for the sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  // Transforms for the scanner
  const scanLineY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  // The Schematic Layer (Top) is clipped by the scan line
  const schematicClipPath = useTransform(scanLineY, (v) => `inset(${v} 0% 0% 0%)`);
  
  // The Real Layer (Bottom) is revealed
  const realClipPath = useTransform(scanLineY, (v) => `inset(0% 0% ${100 - parseFloat(v)}% 0%)`);

  const handleExplore = () => {
    setView(ViewState.TECHNOLOGY);
    window.scrollTo(0, 0);
  };

  return (
    <section 
      id="technology" 
      ref={containerRef} 
      className="relative bg-black text-white selection:bg-skylva-green selection:text-white"
    >
      {/* 
        DESKTOP LAYOUT: CAD DIAGNOSTIC INTERFACE 
      */}
      {!isMobile ? (
        <div className="h-[300vh] relative">
          
          <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
             
             {/* HEADER HUD */}
             <div className="absolute top-0 left-0 w-full z-30 p-8 flex justify-between items-start pointer-events-none mix-blend-difference">
                <div className="flex flex-col">
                   <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-skylva-green rounded-full animate-pulse" />
                      <span className="text-xs font-mono font-bold tracking-widest uppercase">System Diagnostic</span>
                   </div>
                   <h2 className="text-4xl font-display font-light">Skylva S1</h2>
                </div>
                <div className="text-right font-mono text-xs opacity-60">
                   <div>STATUS: ONLINE</div>
                   <div>GRID: SYNCHRONIZED</div>
                   <div>TEMP: 21°C</div>
                </div>
             </div>

             {/* MAIN VISUAL STAGE */}
             <div className="relative flex-1 w-full overflow-hidden bg-[#0A0A0A]">
                
                {/* 1. REAL LAYER (Bottom - Revealed by scan) */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <img 
                      src="/images/product-1.png" 
                      alt="Real View" 
                      className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
                   />
                </div>

                {/* 2. SCHEMATIC LAYER (Top - Hidden by scan) */}
                <m.div 
                   style={{ clipPath: schematicClipPath }}
                   className="absolute inset-0 flex items-center justify-center bg-[#050505] z-10"
                >
                   {/* Wireframe effect using CSS filters on the same image */}
                   <img 
                      src="/images/product-1.png" 
                      alt="Schematic View" 
                      className="w-full h-full object-cover opacity-30 invert grayscale contrast-150 brightness-150"
                   />
                   <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.08]" />
                </m.div>

                {/* 3. SCANNER LINE */}
                <m.div 
                   style={{ top: scanLineY }}
                   className="absolute left-0 w-full h-[2px] bg-skylva-green shadow-[0_0_20px_rgba(74,222,128,0.8)] z-20"
                >
                   <div className="absolute right-12 -top-3 text-[10px] font-mono font-bold text-skylva-green bg-black/80 px-2 py-0.5 rounded uppercase">
                      Scanning...
                   </div>
                </m.div>

                {/* 4. DATA NODES (Reveal based on scroll progress) */}
                <DataNode 
                   x="20%" y="30%" 
                   progress={smoothProgress} 
                   triggerAt={0.15} 
                   title="Solar Glass"
                   value="+30%"
                   unit="Efficiency"
                   icon={<Zap size={14} />}
                />
                <DataNode 
                   x="70%" y="45%" 
                   progress={smoothProgress} 
                   triggerAt={0.4} 
                   title="Wind Load"
                   value="120"
                   unit="km/h"
                   icon={<Wind size={14} />}
                   align="right"
                />
                <DataNode 
                   x="30%" y="70%" 
                   progress={smoothProgress} 
                   triggerAt={0.7} 
                   title="Neural Core"
                   value="10ms"
                   unit="Latency"
                   icon={<Cpu size={14} />}
                />

             </div>

             {/* FOOTER TELEMETRY TICKER */}
             <div className="h-16 bg-black border-t border-white/10 flex items-center overflow-hidden z-30 relative">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
                
                <m.div 
                   animate={{ x: ["0%", "-50%"] }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   className="flex items-center gap-16 whitespace-nowrap pl-12 text-xs font-mono text-white/40"
                >
                   {[...Array(2)].map((_, i) => (
                      <React.Fragment key={i}>
                         <span className="flex items-center gap-2"><Activity size={12} className="text-skylva-green" /> LIVE_YIELD: 4.2kW</span>
                         <span>///</span>
                         <span>BATTERY: 98%</span>
                         <span>///</span>
                         <span>NETWORK: SECURE</span>
                         <span>///</span>
                         <span>LOAD: OPTIMAL</span>
                         <span>///</span>
                         <span>FIRMWARE: v4.2.1</span>
                         <span>///</span>
                      </React.Fragment>
                   ))}
                </m.div>

                <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20">
                   <button 
                      onClick={handleExplore}
                      className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-skylva-green transition-colors flex items-center gap-2"
                   >
                      Deep Dive <ArrowRight size={12} />
                   </button>
                </div>
             </div>

          </div>
        </div>
      ) : (
        /* MOBILE LAYOUT */
        <div className="py-24 px-6 bg-black">
           <div className="flex items-center gap-2 mb-8 text-skylva-green">
              <Scan size={20} />
              <span className="text-xs font-bold uppercase tracking-widest">Technology</span>
           </div>
           
           <h2 className="text-4xl font-display font-light mb-12 text-white">Engineering Invisible Power.</h2>
           
           <div className="space-y-16">
              <MobileTechCard 
                 title="Solar Matrix"
                 desc="Bifacial glass captures light from both sides, increasing yield by up to 30%."
                 stat="+30%"
                 label="Efficiency"
                 image="/images/product-1.png"
              />
              <MobileTechCard 
                 title="Structural"
                 desc="Aerospace-grade aluminum chassis tested for 120km/h wind loads."
                 stat="120"
                 label="km/h Wind"
                 image="/images/product-2.png"
              />
              <MobileTechCard 
                 title="Intelligence"
                 desc="Onboard AI optimizes energy distribution in real-time."
                 stat="10ms"
                 label="Latency"
                 image="/images/product-3.png"
              />
           </div>

           <button 
              onClick={handleExplore}
              className="w-full mt-16 bg-white text-black py-4 rounded-full text-xs font-bold uppercase tracking-widest"
           >
              Full Specifications
           </button>
        </div>
      )}
    </section>
  );
};

// --- Subcomponents ---

const DataNode = ({ x, y, progress, triggerAt, title, value, unit, icon, align = 'left' }: any) => {
   // Determine visibility based on progress passing the trigger point
   const opacity = useTransform(progress, [triggerAt - 0.05, triggerAt, triggerAt + 0.3], [0, 1, 1]);
   const scale = useTransform(progress, [triggerAt - 0.05, triggerAt], [0.5, 1]);
   
   return (
      <m.div 
         style={{ left: x, top: y, opacity, scale }}
         className={`absolute z-40 flex items-center gap-4 ${align === 'right' ? 'flex-row-reverse' : ''}`}
      >
         {/* The Dot */}
         <div className="relative">
            <div className="w-3 h-3 bg-skylva-green rounded-full shadow-[0_0_10px_#4ade80] relative z-10" />
            <div className="absolute inset-0 w-3 h-3 bg-skylva-green rounded-full animate-ping opacity-75" />
            
            {/* Connecting Line */}
            <div className={`absolute top-1/2 w-12 h-[1px] bg-white/30 ${align === 'right' ? 'right-full mr-2' : 'left-full ml-2'}`} />
         </div>

         {/* The Card */}
         <div className={`bg-black/80 backdrop-blur-md border border-white/20 p-4 rounded-lg shadow-2xl ${align === 'right' ? 'mr-12' : 'ml-12'}`}>
            <div className="flex items-center gap-2 text-skylva-green mb-2">
               {icon}
               <span className="text-[10px] font-bold uppercase tracking-widest">{title}</span>
            </div>
            <div className="text-3xl font-display font-light leading-none mb-1">
               {value}
            </div>
            <div className="text-[10px] font-mono text-white/50 uppercase">
               {unit}
            </div>
         </div>
      </m.div>
   )
}

const MobileTechCard = ({ title, desc, stat, label, image }: any) => (
   <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden">
      <div className="h-48 relative">
         <img src={image} className="w-full h-full object-cover opacity-60" alt={title} />
         <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded border border-white/10 text-[10px] font-mono uppercase text-white/70">
            {label}
         </div>
      </div>
      <div className="p-6">
         <h3 className="text-2xl font-display font-light mb-2 text-white">{title}</h3>
         <p className="text-white/60 font-light text-sm leading-relaxed mb-6">
            {desc}
         </p>
         <div className="flex items-baseline gap-2 pt-4 border-t border-white/10">
            <span className="text-3xl font-display text-skylva-green">{stat}</span>
         </div>
      </div>
   </div>
)

export default Technology;
