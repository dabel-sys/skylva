import React, { useState, useEffect } from 'react';
import { Menu, X, Wind } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-skylva-white/80 backdrop-blur-md py-4 border-b border-skylva-charcoal/5' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
            <Wind className={`w-6 h-6 transition-colors duration-300 ${isScrolled ? 'text-skylva-charcoal' : 'text-skylva-charcoal'}`} strokeWidth={1.5} />
            <span className={`text-xl font-semibold tracking-[0.2em] uppercase ${isScrolled ? 'text-skylva-charcoal' : 'text-skylva-charcoal'}`}>
                Skylva
            </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-12">
          {['Vision', 'Product', 'Technology', 'Sustainability'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium uppercase tracking-widest text-skylva-charcoal/70 hover:text-skylva-charcoal transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button className="px-6 py-2 border border-skylva-charcoal text-skylva-charcoal text-xs uppercase tracking-widest hover:bg-skylva-charcoal hover:text-white transition-all duration-300">
            Configure
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6 text-skylva-charcoal" /> : <Menu className="w-6 h-6 text-skylva-charcoal" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-skylva-white h-screen flex flex-col items-center pt-20 gap-8 md:hidden">
          {['Vision', 'Product', 'Technology', 'Sustainability'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-light uppercase tracking-widest text-skylva-charcoal"
            >
              {item}
            </a>
          ))}
          <button className="mt-8 px-10 py-4 border border-skylva-charcoal text-skylva-charcoal text-sm uppercase tracking-widest">
            Configure System
          </button>
        </div>
      )}
    </nav>
  );
};