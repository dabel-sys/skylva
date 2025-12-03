
import React, { useRef } from 'react';
import { m, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Cpu, Zap, Wifi } from 'lucide-react';
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

  // Parallax for background - Gentle and slow
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleExplore = () => {
      setView(ViewState.TECHNOLOGY);
      window.scrollTo(0, 0);
  };

  return (
    <section 
        ref={ref} 
        id="technology" 
        className="relative min-h-[100dvh] bg-black text-white overflow-hidden gpu-accelerated font-sans flex items-center py-24 md:py-0"
    >
      
      {/* 
        1. CINEMATIC BACKGROUND 
        Clean, dark, abstract technology or glass texture.
      */}
      <div className="absolute inset-0 z-0">
         <m.div style={{ y, scale }} className="w-full h-full">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
            
            <img 
               src="/images/intelligence.png" 
               alt="Skylva Neural Core" 
               className="w-full h-full object-cover opacity-80"
               loading="lazy" 
            />
         </m.div>
      </div>

      {/* 
        2. MAIN CONTENT LAYER 
        Editorial layout: Left aligned text, bottom aligned stats.
      */}
      <div className="relative z-20 max-w-[1920px] mx-auto px-6 md:px-24 w-full">
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            
            {/* LEFT: Manifesto */}
            <div className="flex flex-col justify-center">
                <m.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-1.5 h-1.5 bg-skylva-green rounded-full" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/60">
                            Core Architecture
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[0.95] tracking-tight mb-10">
                        <TextReveal mode="chars" stagger={0.02}>{t.technology.title}</TextReveal>
                    </h2>
                    
                    <p className="text-xl font-light text-white/70 leading-relaxed max-w-lg mb-12 border-l border-white/20 pl-8">
                        {t.technology.body}
                    </p>

                    <button 
                        onClick={handleExplore}
                        className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white hover:text-skylva-green transition-colors"
                    >
                        <span>Explore Intelligence</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </m.div>
            </div>

            {/* RIGHT: Elegant Specs Grid */}
            <div className="w-full flex flex-col justify-end">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 border-t border-white/10 pt-12">
                    
                    <StatItem 
                        icon={<Cpu size={20} />}
                        value="Self-Learning"
                        label={t.technology.t1_desc}
                        delay={0.2}
                    />

                    <StatItem 
                        icon={<Zap size={20} />}
                        value="+30% Yield"
                        label={t.technology.t2_desc}
                        delay={0.3}
                    />

                    <StatItem 
                        icon={<Wifi size={20} />}
                        value="Connected"
                        label={t.technology.t3_desc}
                        delay={0.4}
                    />

                </div>
            </div>

         </div>

      </div>

    </section>
  );
};

// --- Subcomponent ---

const StatItem = ({ icon, value, label, delay }: { icon: React.ReactNode, value: string, label: string, delay: number }) => {
    return (
        <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6 }}
            viewport={{ once: true }}
            className="group"
        >
            <div className="text-white/40 mb-4 group-hover:text-skylva-green transition-colors duration-500">
                {icon}
            </div>
            <h4 className="text-xl md:text-2xl font-display font-light text-white mb-2 tracking-tight">
                {value}
            </h4>
            <p className="text-xs font-mono text-white/50 leading-relaxed uppercase tracking-wider">
                {label}
            </p>
        </m.div>
    )
}

export default Technology;
