
import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useView } from '../contexts/ViewContext';
import { ViewState } from '../types';
import TextReveal from './TextReveal';

const stepsData = [
  {
    id: '01',
    imageKey: 'skylva_dream_nature',
  },
  {
    id: '02',
    imageKey: 'skylva_blueprint_arch',
  },
  {
    id: '03',
    imageKey: 'skylva_modern_house',
  }
];

const ProcessFlow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { setView } = useView();
  
  // Horizontal Scroll Logic for Desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-50%"]);

  const steps = [
      { ...stepsData[0], ...t.process.steps[0], image: '/images/process-1.png' },
      { ...stepsData[1], ...t.process.steps[1], image: '/images/process-2.png' },
      { ...stepsData[2], ...t.process.steps[2], image: '/images/process-3.png' }
  ];

  const handleStepClick = (index: number) => {
    if (index === 2) { // Step 3: Install -> Contact Us
      setView(ViewState.CONTACT);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="bg-white text-skylva-charcoal min-h-[100dvh] py-20 md:py-32 flex flex-col justify-center relative overflow-hidden gpu-accelerated">
      
      {/* Light Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white pointer-events-none" />
      
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
            <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <span className="w-1.5 h-1.5 bg-skylva-charcoal rounded-full" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">The Journey</span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-light leading-tight">
                    <TextReveal mode="chars" stagger={0.03}>{t.process.title}</TextReveal>
                </h2>
            </div>
            
            <m.button 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="hidden md:flex items-center gap-3 group mt-8 md:mt-0"
            >
                <span className="text-sm font-bold uppercase tracking-widest text-skylva-charcoal group-hover:text-black transition-colors">Start Configuration</span>
                <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                    <ArrowRight size={16} />
                </div>
            </m.button>
        </div>

        {/* Desktop: Horizontal Parallax Cards / Mobile: Vertical Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => (
                <m.div
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="group relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-xl bg-gray-100 cursor-pointer border-[0.8pt] border-black/5 will-change-transform transform-gpu"
                >
                    {/* Image Layer with Zoom Effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img 
                            src={step.image} 
                            alt={step.title}
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                            loading="lazy"
                            decoding="async"
                        />
                        {/* Gradient Overlay for text readability inside the card */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    </div>

                    {/* Content Layer (Overlay) - Text remains white as it sits on image */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end items-start text-white">
                        
                        {/* Step Number Tag */}
                        <div className="absolute top-8 left-8 bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest text-white mb-auto">
                            {step.subtitle}
                        </div>

                        {/* Text Content */}
                        <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                            <h3 className="text-3xl md:text-4xl font-display font-light mb-4 text-white">
                                {step.title}
                            </h3>
                            
                            <p className="text-gray-300 font-sans font-light text-sm leading-relaxed max-w-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 h-0 group-hover:h-auto overflow-hidden">
                                {step.description}
                            </p>

                            <div className="flex items-center gap-2 text-white border-b border-white pb-1 w-fit group-hover:border-transparent transition-colors">
                                <span className="text-xs font-bold uppercase tracking-widest">{step.action}</span>
                                <ChevronRight size={14} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Hover Glow Border */}
                    <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 rounded-xl transition-colors duration-500 pointer-events-none" />
                </m.div>
            ))}
        </div>

        {/* Mobile-only bottom button */}
        <div className="mt-12 md:hidden">
            <button className="w-full bg-skylva-charcoal text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                Start Configuration <ArrowRight size={14} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default ProcessFlow;
