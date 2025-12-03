
import React, { useState, useRef } from 'react';
import { m, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Leaf, Zap, Anchor, Cpu, Heart, ArrowRight, Activity, Wind, Fingerprint } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const Values: React.FC = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default to first open
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax for the section background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const valuesList = [
    {
      id: 'nature',
      icon: <Leaf className="w-5 h-5" />,
      title: t.about_page.values.nature.title,
      desc: t.about_page.values.nature.desc,
      techSpec: 'Biophilic Integration',
      natureSpec: 'Organic Growth',
      visual: 'organic'
    },
    {
      id: 'innovation',
      icon: <Cpu className="w-5 h-5" />,
      title: t.about_page.values.innovation.title,
      desc: t.about_page.values.innovation.desc,
      techSpec: 'Neural Network V4',
      natureSpec: 'Adaptive Learning',
      visual: 'tech'
    },
    {
      id: 'design',
      icon: <Fingerprint className="w-5 h-5" />,
      title: t.about_page.values.design.title,
      desc: t.about_page.values.design.desc,
      techSpec: '0.5mm Tolerance',
      natureSpec: 'Golden Ratio',
      visual: 'geometry'
    },
    {
      id: 'energy',
      icon: <Zap className="w-5 h-5" />,
      title: t.about_page.values.energy.title,
      desc: t.about_page.values.energy.desc,
      techSpec: 'Bifacial Gain',
      natureSpec: 'Photosynthesis',
      visual: 'energy'
    },
    {
      id: 'humanity',
      icon: <Heart className="w-5 h-5" />,
      title: t.about_page.values.humanity.title,
      desc: t.about_page.values.humanity.desc,
      techSpec: 'Haptic Feedback',
      natureSpec: 'Human Scale',
      visual: 'human'
    }
  ];

  return (
    <section ref={containerRef} className="relative bg-[#050505] text-white py-32 overflow-hidden selection:bg-white selection:text-black">
      
      {/* 
        Background Duality 
        Left: Organic Noise (Nature). Right: Grid (Tech).
      */}
      <div className="absolute inset-0 flex pointer-events-none opacity-20">
         <div className="w-1/2 h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay opacity-50" />
         <div className="w-1/2 h-full border-l border-white/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Center Axis Line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 hidden md:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Manifesto */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
           <m.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="flex items-center justify-center gap-4 mb-6"
           >
              <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em]">Sky</span>
              <span className="w-16 h-[1px] bg-gradient-to-r from-transparent via-skylva-green to-transparent" />
              <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em]">Sylva</span>
           </m.div>
           
           <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-light leading-[0.9] tracking-tighter mix-blend-difference mb-8">
              Where <span className="text-gray-500 italic font-serif">nature</span> meets <br />
              <span className="text-white">technology.</span>
           </h2>
           
           <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
             One identity. Two worlds. We exist in the balance between the organic chaos of the forest and the absolute precision of engineering.
           </p>
        </div>

        {/* 
          Interactive Duality List 
        */}
        <div className="flex flex-col border-t border-white/10">
           {valuesList.map((item, index) => (
              <ValueItem 
                key={item.id} 
                item={item} 
                isActive={activeIndex === index} 
                onClick={() => setActiveIndex(index)}
                index={index}
              />
           ))}
        </div>

      </div>
    </section>
  );
};

// --- Subcomponents ---

const ValueItem = ({ item, isActive, onClick, index }: any) => {
  return (
    <div 
      onClick={onClick}
      className={`
        group relative border-b border-white/10 cursor-pointer transition-all duration-700
        ${isActive ? 'py-12 md:py-16 bg-white/5' : 'py-8 hover:bg-white/[0.02]'}
      `}
    >
       {/* Background Hover Effect */}
       <div className={`absolute inset-0 bg-gradient-to-r from-skylva-green/5 via-transparent to-blue-500/5 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

       <div className="max-w-[1920px] mx-auto px-4 md:px-0 flex flex-col md:flex-row items-center justify-between relative z-10 gap-8 md:gap-0">
          
          {/* LEFT: Nature Spec (Hidden unless active) */}
          <div className="hidden md:flex w-1/3 justify-start pl-8 opacity-0 transition-opacity duration-700 delay-100" style={{ opacity: isActive ? 1 : 0 }}>
             <div className="text-left">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Organic Origin</span>
                <span className="text-xl font-serif italic text-white/80">{item.natureSpec}</span>
             </div>
          </div>

          {/* CENTER: Title & Desc */}
          <div className="flex flex-col items-center text-center w-full md:w-1/3 z-20">
             <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-mono transition-colors duration-500 ${isActive ? 'text-skylva-green' : 'text-gray-600'}`}>0{index + 1}</span>
                <div className={`transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                   {item.icon}
                </div>
             </div>
             
             <h3 className={`text-4xl md:text-6xl font-display font-light transition-all duration-500 ${isActive ? 'text-white scale-110' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {item.title}
             </h3>

             <AnimatePresence>
                {isActive && (
                  <m.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                     <p className="mt-4 text-white/60 font-light max-w-sm mx-auto leading-relaxed">
                        {item.desc}
                     </p>
                     
                     {/* Mobile Only Specs */}
                     <div className="md:hidden flex justify-center gap-8 mt-6 pt-6 border-t border-white/10 w-full">
                        <div>
                           <span className="block text-[10px] text-gray-500 uppercase">Nature</span>
                           <span className="text-sm text-white">{item.natureSpec}</span>
                        </div>
                        <div>
                           <span className="block text-[10px] text-gray-500 uppercase">Tech</span>
                           <span className="text-sm text-white">{item.techSpec}</span>
                        </div>
                     </div>
                  </m.div>
                )}
             </AnimatePresence>
          </div>

          {/* RIGHT: Tech Spec (Hidden unless active) */}
          <div className="hidden md:flex w-1/3 justify-end pr-8 opacity-0 transition-opacity duration-700 delay-100" style={{ opacity: isActive ? 1 : 0 }}>
             <div className="text-right">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Technical Execution</span>
                <span className="text-xl font-mono text-white/80">{item.techSpec}</span>
             </div>
          </div>

       </div>

       {/* 
         Visual Abstract Representations 
         These float in the background when active
       */}
       {isActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
             {/* Left Organic Pattern */}
             <m.div 
               initial={{ x: -100, opacity: 0 }}
               animate={{ x: 0, opacity: 0.05 }}
               transition={{ duration: 1 }}
               className="absolute left-0 top-0 bottom-0 w-1/3 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
             />
             
             {/* Right Tech Pattern (Grid) */}
             <m.div 
               initial={{ x: 100, opacity: 0 }}
               animate={{ x: 0, opacity: 0.1 }}
               transition={{ duration: 1 }}
               className="absolute right-0 top-0 bottom-0 w-1/3"
             >
                <div className="w-full h-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
             </m.div>

             {/* Center Glow */}
             <m.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 0.4, scale: 1 }}
               transition={{ duration: 1 }}
               className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-skylva-green/10 blur-[100px] rounded-full mix-blend-screen"
             />
          </div>
       )}

    </div>
  )
}

export default Values;
