
import React from 'react';
import { m, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollGauge: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map the 0-1 progress to the available travel distance in pixels
  // Track height (h-24 = 96px) - Thumb height (h-8 = 32px) = 64px travel
  const y = useTransform(smoothProgress, [0, 1], [0, 64]);

  return (
    <div className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center mix-blend-difference pointer-events-none">
      {/* The Track */}
      <div className="relative w-[1px] h-24 bg-white/20 rounded-full overflow-hidden">
        {/* The Thumb */}
        <m.div 
          style={{ y }}
          className="absolute top-0 left-0 w-full h-8 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        />
      </div>
    </div>
  );
};

export default ScrollGauge;