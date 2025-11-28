import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    isScrolled ? 'bg-skylva-matte/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'
  }`;

  const navItems = [
    { label: t.nav.vision, href: '#vision' },
    { label: t.nav.product, href: '#product' },
    { label: t.nav.technology, href: '#technology' },
    { label: t.nav.studio, href: '#studio' },
  ];

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="text-2xl font-display font-light tracking-[0.2em] text-white uppercase z-50">
          Skylva
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-sans tracking-widest text-white/70 hover:text-white transition-colors uppercase"
            >
              {item.label}
            </a>
          ))}
          <button className="bg-white text-black px-6 py-2 text-xs tracking-widest uppercase hover:bg-skylva-sand transition-colors">
            {t.nav.configure}
          </button>
          
          {/* Language Selector */}
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

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white z-50"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8">
             {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="text-2xl font-display font-light tracking-widest text-white hover:text-gray-400 transition-colors uppercase"
            >
              {item.label}
            </a>
          ))}
          <div className="flex space-x-6 pt-8">
             {(['en', 'nl', 'de'] as const).map((lang) => (
               <button 
                  key={lang}
                  onClick={() => { setLanguage(lang); setIsMobileOpen(false); }} 
                  className={`text-sm font-bold uppercase tracking-widest ${language === lang ? 'text-white' : 'text-white/40'}`}
                >
                 {lang}
               </button>
            ))}
          </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;