
import React, { useRef, useState } from 'react';
import { m, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Recycle, Zap, TreeDeciduous, Car, Battery, Home as HomeIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const SustainabilityPage: React.FC = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Hero Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // State for the interactive graph
  const [activeYear, setActiveYear] = useState('2025');

  // Graph Data Configurations
  const graphData: any = {
    '2020': {
      line: "M0,450 C250,450 500,448 750,445 1000,440",
      area: "M0,450 C250,450 500,448 750,445 1000,440 V500 H0 Z",
      stat: "0.1 GW",
      label: "Prototype Impact",
      description: "Initial R&D phase with minimal environmental footprint."
    },
    '2023': {
      line: "M0,450 C250,445 500,430 750,380 1000,300",
      area: "M0,450 C250,445 500,430 750,380 1000,300 V500 H0 Z",
      stat: "2.4 GW",
      label: "Market Entry",
      description: "Scaling production reduces unit carbon cost significantly."
    },
    '2025': {
      line: "M0,450 C150,445 300,420 450,350 C600,280 800,100 1000,50",
      area: "M0,450 C150,445 300,420 450,350 C600,280 800,100 1000,50 V500 H0 Z",
      stat: "6.7 GW",
      label: "Grid Independence",
      description: "SkylvaOS integration optimizes fleet-wide energy distribution."
    },
    '2030': {
      line: "M0,450 C100,450 250,400 400,250 C600,100 800,20 1000,0",
      area: "M0,450 C100,450 250,400 400,250 C600,100 800,20 1000,0 V500 H0 Z",
      stat: "25.0 GW",
      label: "Net Positive",
      description: "Total carbon sequestered exceeds manufacturing footprint."
    }
  };

  const currentData = graphData[activeYear];

  return (
    <div ref={containerRef} className="bg-black text-white min-h-screen font-sans selection:bg-skylva-green selection:text-white">
      
      {/* 
        HERO SECTION 
        Full screen, cinematic, parallax.
      */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
         {/* Background Layer */}
         <m.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/30 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
            <img 
              src="https://picsum.photos/seed/skylva_forest_canopy/1920/1080" 
              alt="Nature Background" 
              className="w-full h-full object-cover opacity-80" 
            />
         </m.div>

         {/* Hero Content */}
         <div className="relative z-20 text-center px-6 max-w-5xl">
            <m.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
               <span className="inline-block text-skylva-green text-xs font-bold tracking-[0.3em] uppercase mb-8 border border-skylva-green/30 px-4 py-2 rounded-full backdrop-blur-md">
                  Eco-Logic
               </span>
               <h1 className="text-6xl md:text-[9rem] font-display font-light text-white mb-6 leading-[0.85] tracking-tighter mix-blend-overlay">
                 <TextReveal mode="chars" stagger={0.02}>{t.sustainability_page.title}</TextReveal>
               </h1>
               <p className="text-xl md:text-2xl font-light text-white/90 tracking-wide max-w-2xl mx-auto drop-shadow-lg">
                 {t.sustainability_page.subtitle}
               </p>
            </m.div>
         </div>

         {/* Scroll Hint */}
         <m.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           transition={{ delay: 1, duration: 1 }}
           className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2 z-20"
         >
            <span className="text-[10px] font-mono uppercase tracking-widest">Scroll for Impact</span>
            <ChevronDown className="animate-bounce" size={16} />
         </m.div>
      </section>

      {/* Impact Dashboard Section */}
      <section className="relative z-10 w-full bg-[#050505] border-t border-white/10 pt-24 pb-32">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 md:mb-32 text-center relative">
               {[
                 { val: t.sustainability_page.stat_1, label: t.sustainability_page.stat_1_desc },
                 { val: t.sustainability_page.stat_2, label: t.sustainability_page.stat_2_desc },
                 { val: "100%", label: "Recyclable" },
               ].map((stat, idx) => (
                 <m.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="flex flex-col items-center"
                 >
                    <span className="text-5xl md:text-7xl font-display font-light text-white mb-2 tracking-tight">{stat.val}</span>
                    <span className="text-sm md:text-base font-sans font-medium text-white/50 leading-tight max-w-[150px]">{stat.label}</span>
                 </m.div>
               ))}
               {/* Vertical Dividers for Desktop */}
               <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-[1px] bg-white/10" />
               <div className="hidden md:block absolute right-1/3 top-0 bottom-0 w-[1px] bg-white/10" />
            </div>

            {/* Dynamic Graph Area */}
            <div className="relative w-full h-[50vh] min-h-[400px] mb-12">
               <ImpactGraph data={currentData} activeYear={activeYear} />
            </div>

            {/* Timeline Milestones (Interactive Tabs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pt-8 border-t border-white/20">
               <TimelineItem 
                  year="2020" 
                  title="The Beginning" 
                  desc="Development of the first prototype bifacial pergola."
                  isActive={activeYear === '2020'}
                  onClick={() => setActiveYear('2020')}
               />
               <TimelineItem 
                  year="2023" 
                  title="Mass Production" 
                  desc="Launch of the S1 system and opening of the Hilversum studio."
                  isActive={activeYear === '2023'}
                  onClick={() => setActiveYear('2023')}
               />
               <TimelineItem 
                  year="2025" 
                  title="Grid Independence" 
                  desc="Integration of SkylvaOS Neural Net for autonomous energy management."
                  isActive={activeYear === '2025'}
                  onClick={() => setActiveYear('2025')}
               />
               <TimelineItem 
                  year="2030" 
                  title="Net Positive" 
                  desc="Projected carbon negative status for all deployed fleet structures."
                  isActive={activeYear === '2030'}
                  onClick={() => setActiveYear('2030')}
               />
            </div>

         </div>
      </section>

      {/* 
        SECTION 3: The Infinite Loop (Bento Grid)
        Visualizing the circular material economy.
      */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0A0A0A] border-t border-white/5">
         <div className="max-w-7xl mx-auto">
             <div className="mb-20">
                 <span className="text-skylva-green text-xs font-bold tracking-[0.2em] uppercase block mb-4">Supply Chain</span>
                 <h2 className="text-4xl md:text-6xl font-display font-light text-white mb-8">{t.sustainability_page.loop_title}</h2>
                 <p className="text-white/60 font-sans font-light text-lg leading-relaxed max-w-2xl">
                     {t.sustainability_page.section_lifecycle_body}
                 </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Box 1: Aluminum */}
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
                     <div className="w-12 h-12 bg-skylva-green/20 rounded-full flex items-center justify-center text-skylva-green mb-6 group-hover:scale-110 transition-transform">
                        <Recycle size={24} />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-4">{t.sustainability_page.loop_aluminum_title}</h3>
                     <p className="text-white/50 font-light leading-relaxed">{t.sustainability_page.loop_aluminum_body}</p>
                 </div>

                 {/* Box 2: Timber */}
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
                     <div className="w-12 h-12 bg-skylva-green/20 rounded-full flex items-center justify-center text-skylva-green mb-6 group-hover:scale-110 transition-transform">
                        <TreeDeciduous size={24} />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-4">{t.sustainability_page.loop_timber_title}</h3>
                     <p className="text-white/50 font-light leading-relaxed">{t.sustainability_page.loop_timber_body}</p>
                 </div>

                 {/* Box 3: End of Life */}
                 <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group">
                     <div className="w-12 h-12 bg-skylva-green/20 rounded-full flex items-center justify-center text-skylva-green mb-6 group-hover:scale-110 transition-transform">
                        <Zap size={24} />
                     </div>
                     <h3 className="text-xl font-bold text-white mb-4">{t.sustainability_page.loop_eol_title}</h3>
                     <p className="text-white/50 font-light leading-relaxed">{t.sustainability_page.loop_eol_body}</p>
                 </div>
             </div>
         </div>
      </section>

      {/* 
        SECTION 4: The Ecosystem (Schematic Visualization)
        Showcasing integration with home/grid/EV.
      */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-black border-t border-white/5 relative overflow-hidden">
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
         
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
             <div>
                <span className="text-skylva-green text-xs font-bold tracking-[0.2em] uppercase block mb-4">Integration</span>
                <h2 className="text-4xl md:text-6xl font-display font-light text-white mb-6 leading-tight">{t.sustainability_page.eco_title}</h2>
                <p className="text-white/60 font-sans font-light text-lg leading-relaxed mb-12">
                   {t.sustainability_page.eco_body}
                </p>
                
                <ul className="space-y-6">
                    <li className="flex items-center gap-4 text-white/80 font-light">
                        <span className="w-2 h-2 bg-skylva-green rounded-full shadow-[0_0_10px_#4A5D53]" />
                        Direct EV Charging via S1 Carport
                    </li>
                    <li className="flex items-center gap-4 text-white/80 font-light">
                        <span className="w-2 h-2 bg-skylva-green rounded-full shadow-[0_0_10px_#4A5D53]" />
                        Battery Storage Optimization
                    </li>
                    <li className="flex items-center gap-4 text-white/80 font-light">
                        <span className="w-2 h-2 bg-skylva-green rounded-full shadow-[0_0_10px_#4A5D53]" />
                        Grid Load Balancing
                    </li>
                </ul>
             </div>

             {/* Diagram Animation */}
             <div className="bg-[#121212] border border-white/10 rounded-3xl p-8 aspect-square flex items-center justify-center relative shadow-2xl">
                 <EnergyFlowDiagram />
             </div>
         </div>
      </section>

      {/* 
        SECTION 5: Carbon ROI (Split Panel)
        Big numbers comparing structure to real world impact.
      */}
      <section className="py-32 px-6 md:px-12 bg-[#050505] text-white">
         <div className="max-w-6xl mx-auto text-center">
             <h2 className="text-4xl md:text-5xl font-display font-light mb-4">{t.sustainability_page.roi_title}</h2>
             <p className="text-white/50 mb-16">{t.sustainability_page.roi_subtitle}</p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                 {/* Left: Trees */}
                 <div className="flex flex-col items-center justify-center p-8 md:border-r border-white/10">
                     <TreeDeciduous size={48} className="text-skylva-green mb-6 opacity-80" />
                     <span className="text-7xl md:text-9xl font-display font-light tracking-tighter mb-4">1,250</span>
                     <span className="text-xs font-bold uppercase tracking-widest text-white/40">{t.sustainability_page.roi_trees}</span>
                 </div>

                 {/* Right: Miles */}
                 <div className="flex flex-col items-center justify-center p-8">
                     <Car size={48} className="text-white mb-6 opacity-80" />
                     <span className="text-7xl md:text-9xl font-display font-light tracking-tighter mb-4">320k</span>
                     <span className="text-xs font-bold uppercase tracking-widest text-white/40">{t.sustainability_page.roi_miles}</span>
                 </div>
             </div>
         </div>
      </section>

    </div>
  );
};

// --- Subcomponents ---

const EnergyFlowDiagram = () => {
   return (
      <div className="relative w-full h-full">
         {/* Center Node (Skylva Structure) */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
             <div className="w-20 h-20 bg-skylva-green rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(74,93,83,0.5)] z-20">
                <Zap className="text-white" size={32} />
             </div>
             <span className="mt-3 text-xs font-bold uppercase tracking-widest text-white">Skylva S1</span>
         </div>

         {/* Orbit Nodes */}
         <FlowLine angle={0} label="Grid" icon={<HomeIcon size={16} />} />
         <FlowLine angle={120} label="EV" icon={<Car size={16} />} />
         <FlowLine angle={240} label="Battery" icon={<Battery size={16} />} />
      </div>
   )
}

const FlowLine = ({ angle, label, icon }: { angle: number, label: string, icon: React.ReactNode }) => {
    return (
        <div 
           className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
           style={{ transform: `translate(-50%, -50%) rotate(${angle}deg)` }}
        >
            {/* The Line */}
            <div className="absolute top-0 left-1/2 w-[1px] h-[50%] bg-gradient-to-t from-skylva-green to-transparent opacity-30 origin-bottom" />
            
            {/* Moving Particle */}
            <m.div 
               animate={{ y: ["0%", "200%"], opacity: [0, 1, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
               className="absolute top-0 left-1/2 w-1 h-6 bg-white rounded-full -translate-x-1/2"
            />

            {/* The End Node Icon (Counter-rotated to stay upright) */}
            <div 
               className="absolute top-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
               style={{ transform: `translateX(-50%) rotate(-${angle}deg)` }}
            >
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/70 backdrop-blur-md">
                    {icon}
                </div>
                <span className="text-[10px] font-mono uppercase text-white/40">{label}</span>
            </div>
        </div>
    )
}


const TimelineItem = ({ year, title, desc, isActive, onClick }: any) => (
   <m.button 
      onClick={onClick}
      className={`relative pt-6 group text-left w-full focus:outline-none transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
   >
      {/* Active Indicator Line */}
      <div className={`absolute top-0 left-0 h-[2px] transition-all duration-500 ease-out ${isActive ? 'bg-white w-full' : 'bg-white/30 w-12 group-hover:w-24 group-hover:bg-white/60'}`} />
      
      <div className={`text-lg font-bold font-display mb-2 transition-colors ${isActive ? 'text-white' : 'text-white/80'}`}>
        {year} – {title}
      </div>
      <p className="text-sm font-light text-white/50 leading-relaxed">{desc}</p>
   </m.button>
);

const ImpactGraph = ({ data, activeYear }: { data: any, activeYear: string }) => {
   return (
      <div className="w-full h-full relative">
         {/* Y-Axis Label */}
         <div className="absolute top-0 left-0 text-xs font-mono text-skylva-green/80 uppercase tracking-widest bg-white/5 border border-white/5 px-2 py-1 rounded">
            Cumulative Impact (CO2e Saved)
         </div>

         {/* X-Axis Label */}
         <div className="absolute bottom-4 right-0 text-xs font-mono text-white/30 uppercase tracking-widest">
            Timeline
         </div>

         {/* SVG Graph */}
         <svg viewBox="0 0 1000 500" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
               <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2A3832" /> {/* Dark Green */}
                  <stop offset="50%" stopColor="#4A5D53" /> {/* Skylva Green */}
                  <stop offset="100%" stopColor="#4ADE80" /> {/* Bright Green/Cyan */}
               </linearGradient>
               <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#4ADE80" stopOpacity="0" />
               </linearGradient>
               <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
            </defs>

            {/* Grid Lines (Subtle) */}
            <line x1="0" y1="450" x2="1000" y2="450" stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" />
            <line x1="0" y1="250" x2="1000" y2="250" stroke="white" strokeOpacity="0.05" strokeDasharray="4 4" />

            {/* Vertical Milestone Lines */}
            <g className="text-white/20 text-[10px] font-mono">
               <line x1="50" y1="0" x2="50" y2="500" stroke="currentColor" strokeDasharray="2 4" strokeOpacity={activeYear === '2020' ? 1 : 0.3} /> 
               <line x1="300" y1="100" x2="300" y2="500" stroke="currentColor" strokeDasharray="2 4" strokeOpacity={activeYear === '2023' ? 1 : 0.3} /> 
               <line x1="550" y1="0" x2="550" y2="500" stroke="currentColor" strokeDasharray="2 4" strokeOpacity={activeYear === '2025' ? 1 : 0.3} />
               <line x1="950" y1="0" x2="950" y2="500" stroke="currentColor" strokeDasharray="2 4" strokeOpacity={activeYear === '2030' ? 1 : 0.3} />
            </g>

            {/* 
                ANIMATED CURVES 
            */}
            
            {/* 1. Filled Area */}
            <m.path 
               animate={{ d: data.area }}
               transition={{ duration: 0.8, ease: "easeInOut" }}
               fill="url(#areaGradient)"
            />

            {/* 2. Stroke Line */}
            <m.path
               animate={{ d: data.line }}
               transition={{ duration: 0.8, ease: "easeInOut" }}
               fill="none"
               stroke="url(#lineGradient)"
               strokeWidth="4"
               strokeLinecap="round"
               filter="url(#glow)"
            />
            
            {/* Active Data Point Dot */}
             <m.circle 
                animate={{ 
                    cx: activeYear === '2020' ? 50 : activeYear === '2023' ? 300 : activeYear === '2025' ? 550 : 950,
                    cy: activeYear === '2020' ? 450 : activeYear === '2023' ? 430 : activeYear === '2025' ? 275 : 10
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                r="6" 
                fill="white" 
                filter="url(#glow)"
            />

         </svg>

         {/* Floating Labels on Graph */}
         <AnimatePresence mode="wait">
            <m.div 
               key={activeYear}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.4 }}
               className="absolute top-[35%] right-[5%] text-right pointer-events-none"
            >
               <div className="text-4xl md:text-7xl font-display font-light text-white mb-1">
                  {data.stat}
               </div>
               <div className="text-skylva-green text-sm font-bold uppercase tracking-widest">
                  {data.label}
               </div>
               <div className="text-white/40 text-xs font-mono mt-2 max-w-[200px] ml-auto">
                   {data.description}
               </div>
            </m.div>
         </AnimatePresence>

      </div>
   );
};

export default SustainabilityPage;
