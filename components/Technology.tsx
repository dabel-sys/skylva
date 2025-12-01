
import React, { useRef } from 'react';
import { m, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Cpu, Zap, Wifi, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useView } from '../contexts/ViewContext';
import { ViewState } from '../types';
import TextReveal from './TextReveal';

const Technology: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { setView } = useView();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  
  const handleExplore = () => {
      setView(ViewState.TECHNOLOGY);
      window.scrollTo(0, 0);
  };

  return (
    <section ref={ref} id="technology" className="relative min-h-screen flex flex-col justify-end pb-24 md:pb-32 bg-black overflow-hidden gpu-accelerated">
      
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
         <m.div style={{ y, scale: 1.1 }} className="w-full h-full">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />
            <img 
               src="/images/intelligence.png" 
               alt="Skylva AI Core" 
               className="w-full h-full object-cover opacity-70"
               loading="lazy" 
            />
         </m.div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-[1920px] mx-auto px-6 md:px-12 w-full">
         
         {/* Floating Badge (Top Left) */}
         <div className="absolute top-0 left-6 md:left-12 -translate-y-[80vh] md:-translate-y-[60vh]">
             <m.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1 }}
               className="flex items-center gap-3 text-white/80 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
             >
                 <Activity size={16} className="text-skylva-green" />
                 <span className="text-xs font-mono tracking-widest uppercase">System Active</span>
                 <span className="w-1.5 h-1.5 bg-skylva-green rounded-full animate-pulse" />
             </m.div>
         </div>

         {/* Main Headline */}
         <div className="mb-24 md:mb-32 max-w-5xl">
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-display font-light text-white leading-[0.85] tracking-tighter mb-8">
               <TextReveal mode="chars" stagger={0.02}>{t.technology.title}</TextReveal>
            </h2>
            <m.p 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4, duration: 1 }}
               className="text-xl md:text-3xl text-white/70 font-light max-w-2xl leading-relaxed"
            >
               {t.technology.body}
            </m.p>
         </div>

         {/* Stats Row + CTA */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 items-end border-t border-white/20 pt-10">
            
            {/* Stat 1 */}
            <m.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
            >
               <div className="text-4xl md:text-6xl font-display font-light text-white mb-2">
                  10<span className="text-lg md:text-xl text-white/50 align-top ml-1">ms</span>
               </div>
               <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                  {t.technology.t1_title}
               </div>
            </m.div>

            {/* Stat 2 */}
            <m.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
            >
               <div className="text-4xl md:text-6xl font-display font-light text-white mb-2">
                  +30<span className="text-lg md:text-xl text-white/50 align-top ml-1">%</span>
               </div>
               <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                  {t.technology.t2_title}
               </div>
            </m.div>

             {/* Stat 3 */}
             <m.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
            >
               <div className="text-4xl md:text-6xl font-display font-light text-white mb-2 flex items-center gap-3">
                  <Wifi size={40} className="text-white" />
               </div>
               <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                  {t.technology.t3_title}
               </div>
            </m.div>

            {/* CTA Button */}
            <m.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 }}
               className="col-span-2 md:col-span-1 md:justify-self-end w-full"
            >
                <button 
                  onClick={handleExplore}
                  className="group w-full md:w-auto px-10 py-5 border border-white text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-4"
                >
                   Explore Tech
                   <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </m.div>

         </div>
      </div>

    </section>
  );
};

export default Technology;
