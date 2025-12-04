
import React from 'react';
import { m } from 'framer-motion';

interface LogoProps {
  isScrolled: boolean;
  textColorClass: string;
  onClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ isScrolled, textColorClass, onClick }) => {
  return (
    <div 
      className={`text-2xl font-qurova font-light tracking-[0.2em] uppercase z-50 cursor-pointer flex items-center select-none ${textColorClass}`}
      onClick={onClick}
    >
      <span>S</span>
      <m.div
        initial={{ width: "auto", opacity: 1, x: 0 }}
        animate={{ 
          width: isScrolled ? 0 : "auto", 
          opacity: isScrolled ? 0 : 1,
          x: isScrolled ? -5 : 0
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden flex whitespace-nowrap"
      >
        KYLVA
      </m.div>
    </div>
  );
};

export default Logo;
