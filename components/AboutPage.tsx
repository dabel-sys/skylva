
import React, { useRef } from 'react';
import { m, useScroll, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';
import { Leaf, Cpu, PenTool, Zap, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const contentY = useTransform(smoothProgress, [0, 0.3], [0, 100]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  return (
    <div ref={containerRef} className="bg-skylva-offwhite text-skylva-charcoal min-h-screen font-sans">
      
      {/* 
        HERO SECTION
        Updated Tagline: "Where nature meets technology."
      */}
      <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-6 md:px-12 overflow-hidden bg-black">
         <div className="absolute inset-0 z-0">
            <m.div style={{ scale: imageScale }} className="w-full h-full">
               <div className="absolute inset-0 bg-black/40 z-10" />
               <img 
                 src="https://picsum.photos/seed/skylva_about_nordic/1920/1080" 
                 alt="Nordic Landscape" 
                 className="w-full h-full object-cover opacity-80"
               />
            </m.div>
         </div>

         <m.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-20 max-w-5xl">
            <h1 className="text-6xl md:text-9xl font-display font-light text-white mb-8 tracking-tight leading-[0.9]">
               <TextReveal mode="chars" stagger={0.02}>{t.about_page.title}</TextReveal>
            </h1>
            <div className="flex flex-col items-center">
                <div className="w-16 h-[1px] bg-white/50 mb-6" />
                <p className="text-xl md:text-3xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
                   {t.about_page.subtitle}
                </p>
            </div>
         </m.div>
      </section>

      {/* 
        SECTION 1: ETYMOLOGY (Sky + Sylva)
      */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white">
         <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <m.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, ease: "easeOut" }}
               viewport={{ once: true }}
            >
               <span className="text-xs font-bold uppercase tracking-[0.3em] text-skylva-green mb-6 block">Origin</span>
               <h2 className="text-4xl md:text-6xl font-display font-light mb-8 leading-tight">
                  Sky <span className="text-gray-300">+</span> Sylva
               </h2>
               <p className="text-lg md:text-xl font-light text-gray-600 leading-relaxed border-l border-gray-300 pl-8 max-w-lg">
                  {t.about_page.essence_body}
               </p>
            </m.div>

            <div className="relative h-[600px] w-full overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full">
                    <img src="https://picsum.photos/seed/skylva_sky_clean/600/800" className="w-full h-full object-cover" alt="Sky" />
                    <div className="absolute bottom-8 left-8 text-white font-display text-4xl">Sky</div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full">
                    <img src="https://picsum.photos/seed/skylva_forest_detail/600/800" className="w-full h-full object-cover" alt="Sylva" />
                    <div className="absolute bottom-8 right-8 text-white font-display text-4xl">Sylva</div>
                </div>
            </div>
         </div>
      </section>

      {/* 
        SECTION 2: PHILOSOPHY QUOTE
      */}
      <section className="bg-skylva-matte text-white py-40 px-6 md:px-12 relative overflow-hidden flex items-center justify-center">
         <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
         <m.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="max-w-6xl mx-auto text-center relative z-10"
         >
            <p className="text-4xl md:text-7xl lg:text-8xl font-display font-light leading-[0.95]">
               {t.about_page.philosophy_quote}
            </p>
         </m.div>
      </section>

      {/* 
        SECTION 3: CORE VALUES
      */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-skylva-offwhite">
         <div className="max-w-7xl mx-auto">
             <div className="text-center mb-20">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4 block">Core Values</span>
                <h2 className="text-4xl md:text-5xl font-display font-light">Foundations of Balance</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                 <ValueCard icon={<Leaf />} title={t.about_page.values.nature.title} desc={t.about_page.values.nature.desc} delay={0} />
                 <ValueCard icon={<Cpu />} title={t.about_page.values.innovation.title} desc={t.about_page.values.innovation.desc} delay={0.1} />
                 <ValueCard icon={<PenTool />} title={t.about_page.values.design.title} desc={t.about_page.values.design.desc} delay={0.2} />
                 <ValueCard icon={<Zap />} title={t.about_page.values.energy.title} desc={t.about_page.values.energy.desc} delay={0.3} />
                 <ValueCard icon={<Heart />} title={t.about_page.values.humanity.title} desc={t.about_page.values.humanity.desc} delay={0.4} />
             </div>
         </div>
      </section>

      {/* 
        SECTION 4: VISION & MISSION
      */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-gray-100">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
             <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-skylva-green mb-6 block">{t.about_page.vision_title}</span>
                <p className="text-2xl md:text-3xl font-light text-skylva-charcoal leading-relaxed">
                   {t.about_page.vision_body}
                </p>
             </div>
             <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-skylva-green mb-6 block">{t.about_page.mission_title}</span>
                <p className="text-2xl md:text-3xl font-light text-skylva-charcoal leading-relaxed opacity-60">
                   {t.about_page.mission_body}
                </p>
             </div>
         </div>
      </section>

      {/* 
        SECTION 5: THE ECOSYSTEM (Sub-brands)
      */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#121212] text-white">
          <div className="max-w-7xl mx-auto">
             <div className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
                <h2 className="text-4xl md:text-6xl font-display font-light">{t.about_page.ecosystem_title}</h2>
                <div className="text-right hidden md:block">
                   <div className="text-xs font-mono text-white/40">SKYLVA GROUP</div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                 <SubBrand title={t.about_page.sub_1} desc={t.about_page.sub_1_desc} />
                 <SubBrand title={t.about_page.sub_2} desc={t.about_page.sub_2_desc} />
                 <SubBrand title={t.about_page.sub_3} desc={t.about_page.sub_3_desc} />
                 <SubBrand title={t.about_page.sub_4} desc={t.about_page.sub_4_desc} />
             </div>
          </div>
      </section>

    </div>
  );
};

const ValueCard = ({ icon, title, desc, delay }: any) => (
    <m.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.6 }}
      className="flex flex-col items-center text-center p-6 rounded-2xl bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
    >
        <div className="mb-6 p-4 bg-gray-50 rounded-full text-skylva-charcoal">{icon}</div>
        <h3 className="text-lg font-bold uppercase tracking-widest mb-3">{title}</h3>
        <p className="text-sm font-light text-gray-500 leading-relaxed">{desc}</p>
    </m.div>
);

const SubBrand = ({ title, desc }: any) => (
    <div className="group border-b border-white/5 pb-8 hover:border-white/20 transition-colors">
       <h3 className="text-3xl font-display font-light mb-2 group-hover:text-skylva-green transition-colors">{title}</h3>
       <p className="text-white/50 font-sans font-light text-lg">{desc}</p>
    </div>
);

export default AboutPage;
