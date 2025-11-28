
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = [
      { ...stepsData[0], ...t.process.steps[0], image: '/images/process-1.jpg' },
      { ...stepsData[1], ...t.process.steps[1], image: '/images/process-2.jpeg' },
      { ...stepsData[2], ...t.process.steps[2], image: '/images/process-3.jpg' }
  ];

  return (
    <section ref={containerRef} className="bg-white min-h-screen py-20 md:py-0 flex flex-col justify-center border-b border-gray-100 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative w-full">
        
        {/* Vertical Draw Line (Desktop) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-100 hidden md:block -translate-x-1/2">
            <motion.div 
                style={{ scaleY: scrollYProgress }}
                className="w-full bg-skylva-green origin-top h-full"
            />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 text-center relative z-10 bg-white p-8 inline-block left-1/2 -translate-x-1/2"
        >
          <span className="text-skylva-green text-xs font-bold tracking-[0.2em] uppercase block mb-4">The Process</span>
          <h2 className="text-3xl md:text-5xl font-display font-light text-skylva-matte">
              <TextReveal>{t.process.title}</TextReveal>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="group relative flex flex-col h-full bg-white z-10 pt-8"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-8 w-full rounded-2xl border-[0.8pt] border-black/5 transform transition-transform duration-700 group-hover:-translate-y-2 shadow-sm group-hover:shadow-2xl">
                 <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 z-10" />
                 <img 
                   src={step.image} 
                   alt={step.title}
                   className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                 />
                 
                 {/* Number Overlay */}
                 <div className="absolute top-6 left-6 z-20 overflow-hidden">
                    <motion.span 
                      initial={{ y: "100%" }}
                      whileInView={{ y: 0 }}
                      transition={{ delay: 0.5 + (index * 0.2), duration: 0.8, ease: "easeOut" }}
                      className="block text-6xl font-display font-thin text-white/90 drop-shadow-md"
                    >
                      {step.id}
                    </motion.span>
                 </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col px-2">
                <div className="flex items-baseline space-x-4 mb-4">
                   <h3 className="text-2xl font-display font-light text-skylva-matte group-hover:text-skylva-green transition-colors duration-300">
                     {step.title}
                   </h3>
                   <span className="text-xs font-sans text-gray-400 uppercase tracking-widest">{step.subtitle}</span>
                </div>
                
                <p className="text-gray-600 font-sans font-light text-sm leading-relaxed mb-8 border-l border-gray-200 pl-4 group-hover:border-skylva-green/50 transition-colors duration-500">
                  {step.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center group-hover:border-gray-200 transition-colors duration-500">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-skylva-matte transition-colors duration-300">
                    {step.action}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-skylva-matte group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;
