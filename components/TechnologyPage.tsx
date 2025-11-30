
import React, { useRef } from 'react';
import { m, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { Layers, Cpu, Database, Zap, Shield, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const TechnologyPage: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animations for various sections
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen relative overflow-hidden">
      
      {/* Background Grid/Blueprint Effect */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <m.div 
            style={{ scale: heroScale, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
        >
             {/* Abstract Technology Background */}
             <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
             <img src="/images/intelligence.png" alt="Tech Background" className="w-full h-full object-cover opacity-30" />
        </m.div>

        <div className="relative z-20 max-w-4xl">
           <m.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="mb-6 flex items-center justify-center gap-3"
           >
             <span className="w-1.5 h-1.5 bg-skylva-green rounded-full animate-pulse" />
             <span className="text-xs font-mono text-skylva-green tracking-widest uppercase">System Architecture V.2.4</span>
           </m.div>
           
           <h1 className="text-5xl md:text-8xl font-display font-light mb-8 leading-[0.9]">
             <TextReveal mode="chars" stagger={0.02}>{t.technology_page.title}</TextReveal>
           </h1>
           <p className="text-xl text-white/60 font-sans font-light max-w-2xl mx-auto leading-relaxed">
             {t.technology_page.subtitle}
           </p>
        </div>
      </section>

      {/* Section 1: Glass Technology */}
      <TechSection 
        id="glass"
        title={t.technology_page.section_glass_title}
        body={t.technology_page.section_glass_body}
        image="/images/tech-glass.png"
        align="left"
        specs={[
          { label: t.technology_page.spec_transparency, value: "18-40%" },
          { label: t.technology_page.spec_yield, value: "+30%" },
          { label: t.technology_page.spec_load, value: "5400 Pa" }
        ]}
        icon={<Layers size={24} className="text-skylva-green" />}
      />

      {/* Section 2: AI Core */}
      <TechSection 
        id="ai"
        title={t.technology_page.section_ai_title}
        body={t.technology_page.section_ai_body}
        image="/images/tech-ai.png" // Abstract data viz image
        align="right"
        specs={[
            { label: "Update Freq", value: "10ms" },
            { label: "Data Points", value: "1M+/day" },
            { label: "Prediction", value: "99.2%" }
        ]}
        icon={<Cpu size={24} className="text-skylva-green" />}
        isDarker
      />

      {/* Section 3: Material Science */}
      <TechSection 
        id="material"
        title={t.technology_page.section_mat_title}
        body={t.technology_page.section_mat_body}
        image="/images/tech-alloy.png" // Macro shot of aluminum texture
        align="left"
        specs={[
            { label: "Alloy", value: "6060 T6" },
            { label: "Recycled", value: ">75%" },
            { label: "CO2/kg", value: "2.3kg" }
        ]}
        icon={<Shield size={24} className="text-skylva-green" />}
      />

      {/* Footer CTA area inside page */}
      <div className="py-32 flex flex-col items-center justify-center text-center px-6">
        <h3 className="text-2xl font-display mb-8 text-white/80">Ready to engineer your environment?</h3>
        <div className="flex gap-4">
             <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center">
                <Sun size={20} className="mb-2 text-skylva-sand" />
                <span className="text-xs font-mono text-white/60">Solar Study</span>
             </div>
             <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center">
                <Zap size={20} className="mb-2 text-skylva-sand" />
                <span className="text-xs font-mono text-white/60">Energy Audit</span>
             </div>
             <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center">
                <Database size={20} className="mb-2 text-skylva-sand" />
                <span className="text-xs font-mono text-white/60">ROI Calc</span>
             </div>
        </div>
      </div>

    </div>
  );
};

interface TechSectionProps {
    id: string;
    title: string;
    body: string;
    image: string;
    align: 'left' | 'right';
    specs: { label: string; value: string }[];
    icon: React.ReactNode;
    isDarker?: boolean;
}

const TechSection: React.FC<TechSectionProps> = ({ title, body, align, specs, icon, isDarker }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });
    
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const x = useTransform(scrollYProgress, [0, 0.5], [align === 'left' ? -50 : 50, 0]);

    return (
        <section ref={ref} className={`py-32 px-6 md:px-12 relative ${isDarker ? 'bg-white/5' : ''} border-t border-white/5`}>
            <div className={`max-w-7xl mx-auto flex flex-col ${align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
                
                {/* Visual Side (Placeholder for tech diagram/image) */}
                <m.div 
                    style={{ opacity, x }}
                    className="w-full lg:w-1/2"
                >
                    <div className="aspect-square lg:aspect-[4/3] bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 relative overflow-hidden group">
                        {/* Placeholder Content for Image */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-full relative">
                                {/* Grid Line Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]" />
                                
                                {/* Animated Circle pulse representing tech */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-skylva-green/30 animate-pulse" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-skylva-green/10" />
                                
                                {/* Placeholder Text */}
                                <div className="absolute bottom-6 left-6 font-mono text-[10px] text-skylva-green">
                                    FIG. 2.1 // {title.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                </m.div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                    <m.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-8 border border-white/10">
                            {icon}
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl font-display font-light mb-6 text-white leading-tight">
                            {title}
                        </h2>
                        <p className="text-white/60 font-sans font-light text-lg leading-relaxed mb-10 border-l border-white/10 pl-6">
                            {body}
                        </p>

                        <div className="grid grid-cols-3 gap-6">
                            {specs.map((spec, i) => (
                                <div key={i} className="flex flex-col">
                                    <span className="text-2xl md:text-3xl font-display text-white mb-1">{spec.value}</span>
                                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">{spec.label}</span>
                                </div>
                            ))}
                        </div>
                    </m.div>
                </div>

            </div>
        </section>
    )
}

export default TechnologyPage;
