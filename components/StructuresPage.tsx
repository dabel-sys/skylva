
import React, { useRef } from 'react';
import { m, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { ArrowRight, Plus, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const StructuresPage: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: 's1',
      modelCode: 'S1-PERGOLA',
      title: t.structures_page.s1_title,
      description: t.structures_page.s1_desc,
      image: '/images/product-1.png', // Ensure this image is dark/cinematic for best effect if used in hero
      specs: t.structures_page.s1_specs,
      theme: 'light',
      align: 'left'
    },
    {
      id: 'p1',
      modelCode: 'P1-COVER',
      title: t.structures_page.p1_title,
      description: t.structures_page.p1_desc,
      image: '/images/product-2.png',
      specs: t.structures_page.p1_specs,
      theme: 'dark',
      align: 'right'
    },
    {
      id: 'c1',
      modelCode: 'C1-CARPORT',
      title: t.structures_page.c1_title,
      description: t.structures_page.c1_desc,
      image: '/images/product-3.png',
      specs: t.structures_page.c1_specs,
      theme: 'light',
      align: 'left'
    }
  ];

  return (
    <div ref={containerRef} className="bg-black min-h-screen w-full font-sans selection:bg-skylva-green selection:text-white">
      
      {/* 
        HERO SECTION 
        Dark background ensures the white Navigation is visible.
      */}
      <HeroSection 
        title={t.structures_page.title} 
        subtitle={t.structures_page.subtitle}
      />

      {/* 
        INTRO TEXT 
        Transition to White
      */}
      <div className="bg-white pt-24 pb-12 px-6 md:px-12 rounded-t-[3rem] -mt-12 relative z-10">
         <div className="max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row gap-12 items-end">
                <div className="md:w-2/3">
                    <p className="text-3xl md:text-5xl font-light leading-tight text-black">
                       "We build shadows that generate power. Architecture that pays for itself."
                    </p>
                </div>
                <div className="md:w-1/3 flex justify-end">
                    <div className="text-right">
                       <div className="text-xs font-bold uppercase tracking-widest text-black mb-2">Model Year 2025</div>
                       <div className="h-[2px] w-full bg-black" />
                    </div>
                </div>
             </div>
         </div>
      </div>

      {/* 
        PRODUCT SECTIONS 
      */}
      <div className="flex flex-col w-full bg-white pb-24">
        {products.map((product, idx) => (
          <ProductSection 
            key={product.id} 
            product={product} 
            index={idx} 
            cta={t.structures_page.cta_button} 
          />
        ))}
      </div>

    </div>
  );
};

// --- Subcomponents ---

const HeroSection = ({ title, subtitle }: { title: string, subtitle: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
       {/* Background Video */}
       <m.div style={{ y, scale, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-80"
            poster="/images/hero.jpg"
          >
             {/* Moody abstract nature shadow video to fit the theme */}
             <source src="/images/structures.mp4" type="video/mp4" />
          </video>
       </m.div>

       {/* Content */}
       <div className="relative z-20 text-center px-6 max-w-5xl">
          <m.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
             <h1 className="text-7xl md:text-[10rem] font-display font-light text-white mb-6 leading-[0.8] tracking-tighter mix-blend-overlay">
               {title}
             </h1>
             <p className="text-xl md:text-2xl font-light text-white/80 tracking-wide max-w-2xl mx-auto">
               {subtitle}
             </p>
          </m.div>
       </div>

       {/* Scroll Hint */}
       <m.div 
         initial={{ opacity: 0 }} 
         animate={{ opacity: 1 }} 
         transition={{ delay: 1, duration: 1 }}
         className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 z-20"
       >
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to Explore</span>
          <ChevronDown className="animate-bounce" size={16} />
       </m.div>
    </section>
  )
}

const ProductSection = ({ product, index, cta }: { product: any, index: number, cta: string }) => {
  const isDark = product.theme === 'dark';
  const isRight = product.align === 'right';
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section 
      ref={ref}
      className={`
        relative py-24 md:py-32 px-6 md:px-12 w-full transition-colors duration-700 overflow-hidden
        ${isDark ? 'bg-[#121212] text-white rounded-[3rem] my-12' : 'bg-white text-black'}
      `}
    >
      <div className={`max-w-[1920px] mx-auto flex flex-col ${isRight ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-32 items-center relative z-10`}>
        
        {/* Cinematic Image Area */}
        <div className="w-full lg:w-3/5 group perspective-1000">
           <m.div 
             style={{ y: yParallax }}
             className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl"
           >
              <m.img 
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay for Dark Mode consistency */}
              {isDark && <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />}
           </m.div>
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-2/5">
           <m.div
             initial={{ opacity: 0, x: isRight ? -50 : 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
           >
              {/* Header Tag */}
              <div className="flex items-center gap-4 mb-8">
                 <span className={`text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 border rounded-full ${isDark ? 'border-white/20 text-white/60' : 'border-black/20 text-black/60'}`}>
                    {product.modelCode}
                 </span>
              </div>

              {/* Title */}
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-light mb-8 leading-[0.9] tracking-tight">
                {product.title}
              </h2>

              {/* Description */}
              <p className={`text-lg md:text-xl font-light leading-relaxed mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {product.description}
              </p>

              {/* Specs Grid */}
              <div className={`grid grid-cols-1 gap-4 mb-12`}>
                 {product.specs.map((spec: string, i: number) => (
                    <div 
                      key={i} 
                      className={`
                        flex items-center gap-4 py-3 border-b text-sm font-light group/spec
                        ${isDark ? 'border-white/10 text-white/80' : 'border-black/10 text-black/80'}
                      `}
                    >
                       <span className={`flex items-center justify-center w-5 h-5 rounded-full border ${isDark ? 'border-white/30 text-white/50' : 'border-black/30 text-black/50'} group-hover/spec:bg-skylva-green group-hover/spec:border-skylva-green group-hover/spec:text-white transition-all`}>
                          <Check size={10} />
                       </span>
                       <span>{spec}</span>
                    </div>
                 ))}
              </div>

              {/* CTA Button */}
              <div>
                 <button className={`
                    group relative px-10 py-5 rounded-full text-xs font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 shadow-lg
                    ${isDark 
                       ? 'bg-white text-black hover:bg-gray-200' 
                       : 'bg-black text-white hover:bg-gray-800'}
                 `}>
                    <span className="relative z-10 flex items-center gap-3">
                       {cta} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                 </button>
              </div>

           </m.div>
        </div>

      </div>
    </section>
  );
};

export default StructuresPage;
