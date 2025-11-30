import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const StructuresPage: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const products = [
    {
      id: 's1',
      title: t.structures_page.s1_title,
      description: t.structures_page.s1_desc,
      image: '/images/product-1.png',
      specs: t.structures_page.s1_specs,
      align: 'left'
    },
    {
      id: 'p1',
      title: t.structures_page.p1_title,
      description: t.structures_page.p1_desc,
      image: '/images/product-2.png',
      specs: t.structures_page.p1_specs,
      align: 'right'
    },
    {
      id: 'c1',
      title: t.structures_page.c1_title,
      description: t.structures_page.c1_desc,
      image: '/images/product-3.png',
      specs: t.structures_page.c1_specs,
      align: 'left'
    }
  ];

  return (
    <div ref={containerRef} className="bg-skylva-matte text-white min-h-screen pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-20 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
         <m.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="max-w-4xl"
         >
           <h1 className="text-5xl md:text-8xl font-display font-light mb-6 leading-[0.9]">
             <TextReveal mode="chars" stagger={0.02}>{t.structures_page.title}</TextReveal>
           </h1>
           <p className="text-xl md:text-2xl text-white/60 font-sans font-light max-w-2xl mx-auto leading-relaxed">
             {t.structures_page.subtitle}
           </p>
         </m.div>

         {/* Decorative Line */}
         <m.div 
           initial={{ height: 0 }}
           animate={{ height: 100 }}
           transition={{ duration: 1, delay: 0.5 }}
           className="w-[1px] bg-gradient-to-b from-skylva-green to-transparent mt-16"
         />
      </section>

      {/* Products List */}
      <div className="flex flex-col gap-32 md:gap-48 px-6 md:px-12 max-w-[1920px] mx-auto pb-32">
        {products.map((product, idx) => (
          <ProductSection key={product.id} product={product} index={idx} btnText={t.structures_page.cta_button} />
        ))}
      </div>

    </div>
  );
};

const ProductSection = ({ product, index, btnText }: { product: any, index: number, btnText: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const isRight = product.align === 'right';

  return (
    <section ref={ref} className={`flex flex-col ${isRight ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>
      
      {/* Image Side */}
      <m.div 
        style={{ y }}
        className="w-full lg:w-3/5"
      >
        <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden rounded-3xl border-[0.8pt] border-white/10 group shadow-2xl shadow-black/20">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          
          {/* Subtle ID watermark */}
          <div className="absolute top-6 right-6 text-[120px] font-display font-bold text-white/5 leading-none pointer-events-none select-none">
            {product.id.toUpperCase()}
          </div>
        </div>
      </m.div>

      {/* Content Side */}
      <div className="w-full lg:w-2/5">
        <m.div
          initial={{ opacity: 0, x: isRight ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className={`flex flex-col ${isRight ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}
        >
          <div className="flex items-center gap-3 mb-6 opacity-60">
             <span className="w-8 h-[1px] bg-skylva-green" />
             <span className="text-xs font-mono uppercase tracking-widest">{product.id.toUpperCase()} Series</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-light mb-6 text-white leading-tight">
            {product.title}
          </h2>
          
          <p className="text-gray-400 font-sans font-light text-lg leading-relaxed mb-10 max-w-lg">
            {product.description}
          </p>

          {/* Specs Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-10 w-full ${isRight ? 'lg:justify-items-end' : ''}`}>
             {product.specs.map((spec: string, i: number) => (
               <div key={i} className={`flex items-center gap-3 ${isRight ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                    <Check size={10} className="text-skylva-green" />
                  </div>
                  <span className="text-sm font-light text-white/80">{spec}</span>
               </div>
             ))}
          </div>

          <button className="group relative bg-white text-black px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] overflow-hidden hover:bg-skylva-sand transition-colors w-fit">
            <span className="relative z-10 flex items-center gap-3">
              {btnText} <ArrowRight size={16} />
            </span>
          </button>

        </m.div>
      </div>

    </section>
  );
}

export default StructuresPage;