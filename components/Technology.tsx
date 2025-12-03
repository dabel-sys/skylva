
import React, { useRef, useEffect, useState } from 'react';
import { m, useScroll, useTransform, useSpring, useInView, useMotionValue } from 'framer-motion';
import { ArrowRight, Cpu, Activity, Zap, Wifi, Radio, Command, Disc } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useView } from '../contexts/ViewContext';
import { ViewState } from '../types';
import TextReveal from './TextReveal';

const Technology: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const { setView } = useView();
  const isInView = useInView(ref, { margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax for background
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  const handleExplore = () => {
      setView(ViewState.TECHNOLOGY);
      window.scrollTo(0, 0);
  };

  return (
    <section 
        ref={ref} 
        id="technology" 
        className="relative min-h-[120vh] bg-black text-white overflow-hidden gpu-accelerated font-sans"
    >
      
      {/* 
        1. CINEMATIC BACKGROUND 
      */}
      <div className="absolute inset-0 z-0">
         <m.div style={{ y, scale }} className="w-full h-full">
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20 z-10" />
            
            {/* Using a tech-focused image, or the AI core image */}
            <img 
               src="/images/intelligence.png" 
               alt="Skylva Neural Core" 
               className="w-full h-full object-cover"
               loading="lazy" 
            />
         </m.div>
      </div>

      {/* 
        2. HUD GRID OVERLAY (Automotive Style)
      */}
      <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Vertical Scan Line */}
          <m.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-12 md:left-24 w-[1px] bg-white/10"
          />
           <m.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute bottom-32 left-0 h-[1px] bg-white/10"
          />
          
          {/* Top Right System Status */}
          <div className="absolute top-12 right-6 md:right-12 flex items-center gap-4">
              <div className="text-right">
                  <div className="text-[10px] font-mono text-skylva-green uppercase tracking-widest mb-1">System Status</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-white">Online / V4.2</div>
              </div>
              <div className="relative w-2 h-2">
                  <span className="absolute inset-0 bg-skylva-green rounded-full animate-ping opacity-75"></span>
                  <span className="relative block w-2 h-2 bg-skylva-green rounded-full"></span>
              </div>
          </div>
      </div>

      {/* 
        3. MAIN CONTENT LAYER 
      */}
      <div className="relative z-20 max-w-[1920px] mx-auto px-6 md:px-24 h-full flex flex-col justify-center min-h-screen py-24">
         
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            
            {/* LEFT: Headline & Manifesto (Span 7) */}
            <div className="lg:col-span-7">
                <m.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="flex items-center gap-4 mb-8">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-skylva-green">
                            <Cpu size={14} />
                        </span>
                        <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/60">
                            Neural Engine
                        </span>
                    </div>

                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-display font-light leading-[0.85] tracking-tighter mb-10 mix-blend-overlay">
                        <TextReveal mode="chars" stagger={0.02}>{t.technology.title}</TextReveal>
                    </h2>
                    
                    <div className="max-w-xl pl-8 border-l border-white/20">
                        <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
                            {t.technology.body}
                        </p>
                    </div>

                    <m.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-12"
                    >
                        <button 
                            onClick={handleExplore}
                            className="group flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white rounded-full transition-all duration-300 backdrop-blur-md"
                        >
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">Explore Systems</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </m.div>
                </m.div>
            </div>

            {/* RIGHT: Technical Data Stack (Span 5) */}
            <div className="lg:col-span-5 w-full">
                <div className="flex flex-col gap-4">
                    <TechSpecRow 
                        icon={<Activity />}
                        label={t.technology.t1_title}
                        value="Active"
                        subtext={t.technology.t1_desc}
                        delay={0.2}
                    />
                    <TechSpecRow 
                        icon={<Zap />}
                        label={t.technology.t2_title}
                        value="+30%"
                        subtext={t.technology.t2_desc}
                        delay={0.3}
                    />
                    <TechSpecRow 
                        icon={<Wifi />}
                        label={t.technology.t3_title}
                        value="Connected"
                        subtext={t.technology.t3_desc}
                        delay={0.4}
                    />
                    
                    {/* Abstract Data Visualization Box */}
                    <m.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-8 p-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl relative overflow-hidden group"
                    >
                         <div className="absolute inset-0 bg-skylva-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                         
                         <div className="flex justify-between items-start mb-4 relative z-10">
                            <span className="text-[10px] font-mono uppercase text-white/40">Real-time Optimization</span>
                            <Radio size={14} className="text-skylva-green animate-pulse" />
                         </div>
                         
                         {/* Fake Data Stream Animation */}
                         <div className="font-mono text-[10px] text-skylva-green/80 space-y-1 relative z-10">
                            <DataStream />
                         </div>
                    </m.div>
                </div>
            </div>

         </div>

      </div>

    </section>
  );
};

// --- Subcomponents ---

const TechSpecRow = ({ icon, label, value, subtext, delay }: any) => {
    return (
        <m.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: delay, duration: 0.6 }}
            viewport={{ once: true }}
            className="group relative flex items-center gap-6 p-6 border-b border-white/10 hover:bg-white/5 transition-colors cursor-default"
        >
            <div className="text-white/40 group-hover:text-skylva-green transition-colors duration-300">
                {React.cloneElement(icon, { size: 20 })}
            </div>
            
            <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">{label}</h4>
                    <span className="font-display text-xl text-white tracking-tight">{value}</span>
                </div>
                <p className="text-xs font-light text-white/40 font-mono group-hover:text-white/60 transition-colors">
                    {subtext}
                </p>
            </div>

            {/* Scanning Line Effect on Hover */}
            <div className="absolute bottom-0 left-0 h-[1px] bg-skylva-green w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
        </m.div>
    )
}

const DataStream = () => {
    // Simple visual effect to simulate data processing
    return (
        <>
            <div className="flex justify-between">
                <span>INPUT: SOLAR_IRRADIANCE</span>
                <span>892 W/m2</span>
            </div>
            <div className="flex justify-between">
                <span>TEMP_DELTA</span>
                <span>+2.4 C</span>
            </div>
            <div className="flex justify-between">
                <span>GRID_LOAD</span>
                <span>OPTIMAL</span>
            </div>
            <div className="flex justify-between opacity-50">
                <span>SYNC_STATUS</span>
                <span>...OK</span>
            </div>
        </>
    )
}

export default Technology;
