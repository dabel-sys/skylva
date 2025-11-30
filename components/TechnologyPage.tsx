
import React, { useRef } from 'react';
import { m, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Cpu, Layers, Shield, Zap, Wind, Thermometer, ArrowDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const TechnologyPage: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax for the hero image
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen selection:bg-white selection:text-black font-sans">
      
      {/* 
        HERO SECTION: Cinematic Entry 
        - Feels like a car reveal. Dark, moody, high-end.
      */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-24 px-6 md:px-12">
        {/* Background Image with Slow Zoom */}
        <div className="absolute inset-0 z-0">
           <m.div 
             style={{ scale: useTransform(scrollYProgress, [0, 0.2], [1.1, 1.2]) }}
             className="w-full h-full"
           >
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
             <div className="absolute inset-0 bg-black/40 z-10" /> 
             <img 
               src="/images/intelligence.png" 
               alt="Skylva Engineering" 
               className="w-full h-full object-cover" 
             />
           </m.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1920px] w-full mx-auto">
           <m.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
           >
             <div className="flex items-center gap-4 mb-6">
                <span className="h-[1px] w-12 bg-white/50" />
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/80">Engineering</span>
             </div>
             <h1 className="text-6xl md:text-9xl font-display font-light tracking-tight leading-[0.9] mb-8 mix-blend-overlay text-white opacity-90">
               {t.technology_page.title}
             </h1>
             <p className="text-xl md:text-2xl font-light text-white/70 max-w-xl leading-relaxed">
               {t.technology_page.subtitle}
             </p>
           </m.div>
        </div>
      </section>

      {/* 
        INTRO: Minimalist Typography 
        - Large statement text on black.
      */}
      <section className="py-32 px-6 md:px-12 bg-black flex justify-center">
         <div className="max-w-4xl text-center">
            <p className="text-2xl md:text-4xl font-light leading-relaxed text-white/80">
              "True luxury is the absence of friction. We engineer our structures to vanish into the experience of living, leaving only <span className="text-white font-normal">silence, light, and power.</span>"
            </p>
         </div>
      </section>

      {/* 
        FEATURE 1: The Glass (Performance)
        - Split layout with technical overlay.
      */}
      <TechSection 
         id="glass"
         title={t.technology_page.section_glass_title}
         description={t.technology_page.section_glass_body}
         image="/images/product-1.png"
         specs={[
            { label: t.technology_page.spec_transparency, value: "18-40%", unit: "Transmission" },
            { label: t.technology_page.spec_yield, value: "+30%", unit: "Bifacial Gain" },
            { label: t.technology_page.spec_load, value: "5400", unit: "Pa Snow Load" }
         ]}
         align="left"
      />

      {/* 
        FEATURE 2: The Core (AI)
        - Darker, more abstract visuals.
      */}
      <TechSection 
         id="ai"
         title={t.technology_page.section_ai_title}
         description={t.technology_page.section_ai_body}
         image="/images/product-3.png"
         specs={[
            { label: "Update Rate", value: "10", unit: "ms Latency" },
            { label: "Data Points", value: "1M+", unit: "Daily Processing" },
            { label: "Prediction", value: "99.2%", unit: "Accuracy" }
         ]}
         align="right"
      />

       {/* 
        FEATURE 3: Material (Chassis)
        - Focus on raw material quality.
      */}
      <TechSection 
         id="material"
         title={t.technology_page.section_mat_title}
         description={t.technology_page.section_mat_body}
         image="/images/product-2.png"
         specs={[
            { label: "Alloy Grade", value: "6060", unit: "T6 Temper" },
            { label: "Recycled Content", value: "75%", unit: "Post-Consumer" },
            { label: "Lifespan", value: "50+", unit: "Years" }
         ]}
         align="left"
      />

      {/* 
        TECHNICAL DATA SHEET
        - A stark, table-like grid for the 'nerds'.
      */}
      <section className="py-32 px-6 md:px-12 bg-[#050505] border-t border-white/10">
         <div className="max-w-7xl mx-auto">
             <div className="mb-16">
               <h3 className="text-4xl font-display font-light mb-2">Technical Specifications</h3>
               <p className="text-white/40 font-mono text-sm">MODEL: S1-PERGOLA-GEN2</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <SpecCard icon={<Zap />} title="Electrical" data={['420W Output/Module', '98% Inverter Eff.', 'IP68 Connectors']} />
               <SpecCard icon={<Shield />} title="Structural" data={['Eurocode 9 Compliant', 'Wind Load: 120km/h', 'Anodized 25µm']} />
               <SpecCard icon={<Thermometer />} title="Thermal" data={['-40°C to +85°C', 'Thermal Break Profiles', 'Ventilated Glazing']} />
               <SpecCard icon={<Cpu />} title="Connectivity" data={['4G/LTE + WiFi', 'Matter / Thread Ready', 'OTA Updates']} />
            </div>
         </div>
      </section>

    </div>
  );
};

// --- Subcomponents ---

const TechSection = ({ id, title, description, image, specs, align }: any) => {
   const ref = useRef(null);
   const isLeft = align === 'left';
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
   });

   // Parallax for image
   const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
   const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

   return (
      <section ref={ref} className="py-20 md:py-32 px-6 md:px-12 border-t border-white/5 relative">
         <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            
            {/* Image Container */}
            <m.div 
               className={`relative h-[60vh] lg:h-[80vh] w-full overflow-hidden ${isLeft ? 'order-1' : 'order-1 lg:order-2'}`}
            >
               <div className="absolute inset-0 bg-white/5 z-0" /> {/* Placeholder background */}
               <m.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
                  <img 
                     src={image} 
                     alt={title} 
                     className="w-full h-full object-cover opacity-80" 
                  />
               </m.div>
               {/* Technical Overlay Lines */}
               <div className="absolute inset-0 border border-white/10 z-10 p-8 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest">
                     <span>FIG. 0{id === 'glass' ? '1' : id === 'ai' ? '2' : '3'}</span>
                     <span>{title.toUpperCase()}</span>
                  </div>
                  <div className="w-full h-[1px] bg-white/10 relative">
                     <div className="absolute right-0 top-0 w-[1px] h-4 bg-white/30" />
                     <div className="absolute left-0 top-0 w-[1px] h-4 bg-white/30" />
                  </div>
               </div>
            </m.div>

            {/* Text Content */}
            <div className={`${isLeft ? 'order-2' : 'order-2 lg:order-1'}`}>
               <m.div style={{ opacity }}>
                  <div className="mb-10">
                     <span className="text-skylva-green text-xs font-bold tracking-[0.2em] uppercase mb-4 block">System Component</span>
                     <h2 className="text-4xl md:text-6xl font-display font-light mb-6 leading-tight">{title}</h2>
                     <p className="text-lg text-white/60 font-light leading-relaxed max-w-lg">
                        {description}
                     </p>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
                     {specs.map((spec: any, idx: number) => (
                        <div key={idx}>
                           <div className="text-3xl font-display font-light text-white mb-1">{spec.value}</div>
                           <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">{spec.label}</div>
                           <div className="text-[10px] font-mono text-white/30">{spec.unit}</div>
                        </div>
                     ))}
                  </div>
               </m.div>
            </div>

         </div>
      </section>
   );
};

const SpecCard = ({ icon, title, data }: any) => {
   return (
      <div className="bg-white/5 border border-white/5 p-8 group hover:bg-white/10 transition-colors duration-500">
         <div className="text-white/50 mb-6 group-hover:text-skylva-green transition-colors">{icon}</div>
         <h4 className="text-lg font-bold uppercase tracking-widest text-white mb-6">{title}</h4>
         <ul className="space-y-3">
            {data.map((item: string, idx: number) => (
               <li key={idx} className="text-sm font-mono text-white/60 flex items-center gap-3">
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  {item}
               </li>
            ))}
         </ul>
      </div>
   )
}

export default TechnologyPage;
