import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { language, setLanguage, t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      const totalHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight,
        document.body.offsetHeight, 
        document.documentElement.offsetHeight,
        document.body.clientHeight, 
        document.documentElement.clientHeight
      ) - window.innerHeight;
      
      const progress = totalHeight > 0 ? currentScrollY / totalHeight : 0;
      
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `
    absolute top-0 left-0 right-0 z-40 
    pt-[calc(env(safe-area-inset-top)+2rem)] pb-8 
    md:fixed 
    transition-all duration-500 ease-in-out
    ${isScrolled 
      ? 'md:py-4 md:bg-black/40 md:backdrop-blur-xl md:border-b md:border-white/10 md:shadow-lg' 
      : 'md:py-8 md:bg-transparent md:backdrop-blur-none md:border-b md:border-transparent'}
  `;

  const navItems = [
    { label: t.nav.vision, href: '#vision' },
    { label: t.nav.product, href: '#structures' },
    { label: t.nav.technology, href: '#technology' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 50; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  // Animation Variants
  const menuVariants = {
    initial: { y: "100%" },
    animate: { 
      y: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    },
    exit: { 
      y: "100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    }
  };

  const containerVariants = {
    initial: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    animate: { 
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    },
    exit: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    initial: { y: 100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    },
    exit: { y: 100, opacity: 0 }
  };

  return (
    <>
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Animated Logo */}
          <div 
            className="text-2xl font-display font-light tracking-[0.2em] text-white uppercase z-50 cursor-pointer flex items-center select-none"
            onClick={scrollToTop}
          >
            <span>S</span>
            <motion.div
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
            </motion.div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navItems.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative text-sm font-sans tracking-widest text-white/70 hover:text-white transition-colors uppercase py-2"
              >
                {item.label}
                {hoveredIndex === idx && (
                  <motion.div
                    layoutId="desktop-nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            ))}
            <button className="rounded-full bg-white text-black px-6 py-2 text-xs tracking-widest uppercase hover:bg-skylva-sand transition-colors">
              {t.nav.configure}
            </button>
            
            <div className="flex space-x-3 text-[10px] font-bold uppercase tracking-widest border-l border-white/20 pl-6 ml-2">
              {(['en', 'nl', 'de'] as const).map((lang) => (
                 <button 
                    key={lang}
                    onClick={() => setLanguage(lang)} 
                    className={`transition-colors hover:text-white ${language === lang ? 'text-white' : 'text-white/40'}`}
                  >
                   {lang}
                 </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden flex items-center justify-center mb-[env(safe-area-inset-bottom)]">
        {/* Progress Ring */}
        <div className="absolute w-[72px] h-[72px] pointer-events-none mix-blend-difference z-0">
             <svg className="w-full h-full -rotate-90 origin-center" viewBox="0 0 72 72">
                 <circle cx="36" cy="36" r={radius} stroke="white" strokeOpacity="0.3" strokeWidth="3" fill="transparent" />
                 <circle
                   cx="36"
                   cy="36"
                   r={radius}
                   stroke="white"
                   strokeWidth="3"
                   fill="transparent"
                   strokeDasharray={circumference}
                   strokeDashoffset={strokeDashoffset}
                   strokeLinecap="round"
                   className="transition-all duration-100 ease-out"
                 />
             </svg>
        </div>

        {/* Toggle Button */}
        <button 
          className="bg-skylva-matte text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative z-10 border border-white/10 overflow-hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isMobileOpen ? 180 : 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] as const }}
          >
             {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-skylva-matte z-40 flex flex-col justify-between pt-[calc(env(safe-area-inset-top)+6rem)] pb-[calc(env(safe-area-inset-bottom)+2rem)] px-6 overflow-hidden"
          >
             {/* Navigation Links */}
             <motion.div 
               variants={containerVariants}
               initial="initial"
               animate="animate"
               exit="exit"
               className="flex flex-col space-y-2"
             >
                {navItems.map((item, idx) => (
                  <div key={item.label} className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      variants={itemVariants}
                      className="block text-5xl font-display font-light tracking-tight text-white hover:text-skylva-green transition-colors uppercase leading-[1.1]"
                    >
                      {item.label}
                    </motion.a>
                  </div>
                ))}
             </motion.div>

             {/* Footer Info inside Menu */}
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.8 } }}
                exit={{ opacity: 0 }}
                className="w-full"
             >
                <div className="w-full h-[1px] bg-white/10 mb-8" />
                <div className="flex justify-between items-end">
                  <div className="flex space-x-6">
                    {(['en', 'nl', 'de'] as const).map((lang) => (
                      <button 
                          key={lang}
                          onClick={() => { setLanguage(lang); }} 
                          className={`text-sm font-bold uppercase tracking-widest ${language === lang ? 'text-white' : 'text-white/40'}`}
                        >
                        {lang}
                      </button>
                    ))}
                  </div>
                  <div className="text-right text-white/40 text-xs font-sans font-light">
                     <p>Oslo, Norway</p>
                     <p>Est. 2024</p>
                  </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;