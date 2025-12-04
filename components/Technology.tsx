
import React, { useRef, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowRight, Wind, Zap, Cpu, Leaf, Droplets, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useView } from '../contexts/ViewContext';
import { ViewState } from '../types';

const Technology: React.FC = () => {
  const { t } = useLanguage();
  const { setView } = useView();
  const [activeTab, setActiveTab] = useState<'glass' | 'wood' | 'core'>('glass');

  const handleExplore = () => {
    setView(ViewState.TECHNOLOGY);
    // Explicitly reset scroll via Lenis if available to prevent starting mid-page
    if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
        window.scrollTo(0, 0);
    }
  };

  const features = {
    glass: {
      title: "Invisible Energy",
      subtitle: "Bifacial Solar Glass",
      description: "We don't put panels on roofs. We make the roof the panel. Our frameless glass captures light from above and reflected light from below, merging total transparency with high-efficiency generation.",
      stat: "+30%",
      statLabel: "Yield Efficiency",
      icon: <Sun className="w-5 h-5" />,
      image: "https://picsum.photos/seed/skylva_glass_forest/1600/900"
    },
    wood: {
      title: "Living Structure",
      subtitle: "Nordic Timber & Aluminum",
      description: "The warmth of nature meets the resilience of aerospace engineering. Our FSC-certified Nordic pine is thermally treated for longevity, housed within a recycled aluminum chassis that withstands 120km/h winds.",
      stat: "100%",
      statLabel: "Sustainable Core",
      icon: <Leaf className="w-5 h-5" />,
      image: "https://picsum.photos/seed/skylva_wood_texture/1600/900"
    },
    core: {
      title: "Silent Intelligence",
      subtitle: "SkylvaOS Neural Net",
      description: "Technology that disappears. The onboard AI analyzes weather patterns in real-time, adjusting shading and energy storage automatically. It feels less like a machine and more like a living organism.",
      stat: "10ms",
      statLabel: "Response Latency",
      icon: <Cpu className="w-5 h-5" />,
      image: "https://picsum.photos/seed/skylva_neural_network/1600/900"
    }
  };

  const activeFeature = features[activeTab];

  return (
    <section id="technology" className="relative min-h-[110vh] md:h-screen bg-skylva-offwhite text-skylva-charcoal overflow-hidden flex items-center justify-center py-20 md:py-0">
      
      {/* 
        BACKGROUND LAYER 
        Smooth cross-dissolve between images based on active tab
      */}
      <div className="absolute inset-0 z-0">
         <AnimatePresence mode="popLayout">
            <m.div 
               key={activeTab}
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 1.2, ease: "easeInOut" }}
               className="absolute inset-0 w-full h-full"
            >
               <img 
                 src={activeFeature.image} 
                 alt={activeFeature.title} 
                 className="w-full h-full object-cover"
               />
               {/* Soft, premium overlay to ensure text readability without killing the vibe */}
               <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
               <div className="absolute inset-0 bg-black/20" /> 
            </m.div>
         </AnimatePresence>
      </div>

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 w-full relative z-10 h-full flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-center">
           
           {/* LEFT CONTENT: The "Controller" */}
           <div className="lg:col-span-5 flex flex-col justify-center h-full">
              
              <m.div
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-3xl shadow-2xl text-white relative overflow-hidden group"
              >
                 {/* Decorative Glow */}
                 <div className="absolute -top-20 -right-20 w-64 h-64 bg-skylva-green/20 rounded-full blur-[80px] pointer-events-none" />

                 <span className="text-xs font-bold uppercase tracking-[0.2em] text-skylva-green mb-6 block">The Fusion</span>
                 
                 {/* Animated Content Switcher */}
                 <div className="relative min-h-[280px] md:min-h-[240px]">
                    <AnimatePresence mode="wait">
                       <m.div
                          key={activeTab}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.4 }}
                       >
                          <h2 className="text-4xl md:text-5xl font-display font-light mb-2">{activeFeature.title}</h2>
                          <h3 className="text-lg font-sans font-medium text-white/50 mb-6">{activeFeature.subtitle}</h3>
                          <p className="text-lg text-white/80 font-light leading-relaxed mb-8">
                             {activeFeature.description}
                          </p>
                          
                          <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                             <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white">
                                {activeFeature.icon}
                             </div>
                             <div>
                                <div className="text-2xl font-display font-light">{activeFeature.stat}</div>
                                <div className="text-xs font-mono uppercase text-white/50 tracking-widest">{activeFeature.statLabel}</div>
                             </div>
                          </div>
                       </m.div>
                    </AnimatePresence>
                 </div>

                 {/* Explore Button */}
                 <div className="mt-12">
                    <button 
                       onClick={handleExplore}
                       className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white hover:text-skylva-green transition-colors group/btn"
                    >
                       Deep Dive <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </m.div>

           </div>

           {/* RIGHT CONTENT: The "Tabs" / Visual Anchors */}
           <div className="lg:col-span-7 flex flex-col lg:items-end justify-center lg:pl-24 mt-12 lg:mt-0">
              <div className="flex flex-col gap-4 w-full max-w-md">
                 <TabButton 
                    id="glass" 
                    label="Glass" 
                    sub="Transparency" 
                    isActive={activeTab === 'glass'} 
                    onClick={() => setActiveTab('glass')} 
                 />
                 <TabButton 
                    id="wood" 
                    label="Material" 
                    sub="Nature & Metal" 
                    isActive={activeTab === 'wood'} 
                    onClick={() => setActiveTab('wood')} 
                 />
                 <TabButton 
                    id="core" 
                    label="Core" 
                    sub="Intelligence" 
                    isActive={activeTab === 'core'} 
                    onClick={() => setActiveTab('core')} 
                 />
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

// --- Subcomponent: Tab Button ---
const TabButton = ({ id, label, sub, isActive, onClick }: any) => {
   return (
      <button 
         onClick={onClick}
         className={`
            group relative w-full text-left p-6 rounded-2xl transition-all duration-500 overflow-hidden
            ${isActive ? 'bg-white text-skylva-charcoal shadow-xl scale-105' : 'bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm border border-white/10'}
         `}
      >
         <div className="flex items-center justify-between relative z-10">
            <div>
               <span className={`text-2xl font-display font-light block mb-1 ${isActive ? 'text-black' : 'text-white'}`}>
                  {label}
               </span>
               <span className={`text-xs font-mono uppercase tracking-widest block ${isActive ? 'text-gray-500' : 'text-white/40'}`}>
                  {sub}
               </span>
            </div>
            
            {/* Active Indicator Arrow */}
            <div className={`
               w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500
               ${isActive ? 'bg-skylva-green text-white rotate-0' : 'bg-white/10 text-white/50 -rotate-45'}
            `}>
               <ArrowRight size={14} />
            </div>
         </div>
      </button>
   )
}

export default Technology;
