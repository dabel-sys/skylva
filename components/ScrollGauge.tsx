import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollGauge: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center h-[50vh] w-12 pointer-events-none mix-blend-difference text-white">
      {/* Top Label */}
      <span className="text-[10px] font-sans tracking-widest text-white/50 mb-4 writing-vertical-lr rotate-180">
        ELEV. MAX
      </span>

      {/* Track */}
      <div className="relative flex-1 w-[1px] bg-white/20">
        {/* Progress Fill */}
        <motion.div 
          style={{ scaleY, originY: 0 }}
          className="absolute top-0 left-0 w-full bg-white origin-top"
        />

        {/* Moving Marker & Counter */}
        <motion.div 
          className="absolute left-1/2 -translate-x-1/2 w-max"
          style={{ top: useTransform(scrollYProgress, value => `${value * 100}%`) }}
        >
          <div className="flex items-center absolute top-0 right-2 -translate-y-1/2">
             <span className="text-[10px] font-mono tabular-nums tracking-widest text-white opacity-80 mr-2">
               {percentage.toString().padStart(3, '0')}
             </span>
             <div className="w-2 h-[1px] bg-white" />
          </div>
          
          {/* Crosshair Marker */}
          <div className="relative -ml-[0.5px]">
            <div className="w-3 h-[1px] bg-white absolute top-0 left-1/2 -translate-x-1/2" />
            <div className="h-3 w-[1px] bg-white absolute top-1/2 left-0 -translate-y-1/2" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Label */}
      <span className="text-[10px] font-sans tracking-widest text-white/50 mt-4 writing-vertical-lr rotate-180">
        GRND. LVL
      </span>
    </div>
  );
};

export default ScrollGauge;