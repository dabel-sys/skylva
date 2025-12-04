
import React, { useState } from 'react';
import { m } from 'framer-motion';
import { NavItem, NavigationColors } from './types';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../../contexts/LanguageContext';

interface DesktopNavProps {
  navItems: NavItem[];
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => void;
  handleConfigureClick: () => void;
  colors: NavigationColors;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ 
  navItems, 
  handleNavClick, 
  handleConfigureClick, 
  colors 
}) => {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
      {navItems.map((item, idx) => (
        <a
          key={item.label}
          href={item.href}
          onClick={(e) => handleNavClick(e, item)}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={`relative text-sm font-sans tracking-widest transition-colors uppercase py-2 ${colors.navItemClass}`}
        >
          {item.label}
          {hoveredIndex === idx && (
            <m.div
              layoutId="desktop-nav-underline"
              className={`absolute bottom-0 left-0 right-0 h-[1px] ${colors.underlineClass}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </a>
      ))}
      
      <button 
          onClick={handleConfigureClick}
          className={`rounded-full px-6 py-2 text-xs tracking-widest uppercase transition-colors ${colors.buttonClass}`}
      >
        {t.nav.configure}
      </button>
      
      <div className={`flex space-x-3 text-[10px] font-bold uppercase tracking-widest border-l pl-6 ml-2 ${colors.dividerClass}`}>
        <LanguageSwitcher activeClass={colors.langActive} inactiveClass={colors.langInactive} />
      </div>
    </div>
  );
};

export default DesktopNav;
