
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useView } from '../contexts/ViewContext';
import { ViewState } from '../types';
import { NavItem, NavigationColors } from './navigation/types';

import Logo from './navigation/Logo';
import DesktopNav from './navigation/DesktopNav';
import MobileNav from './navigation/MobileNav';

interface NavigationProps {
  onToggleChat: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onToggleChat }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Default to false so it's hidden on initial load (assuming top of page)
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const { t } = useLanguage();
  const { view, setView } = useView();

  // Define pages that have a white/light hero section
  const lightHeroViews = [ViewState.CAREERS, ViewState.PRESS];
  const isLightHero = lightHeroViews.includes(view);
  const useDarkText = isLightHero && !isScrolled;

  // --- Styles Configuration ---
  const colors: NavigationColors = {
    textColorClass: useDarkText ? 'text-skylva-charcoal' : 'text-white',
    navItemClass: useDarkText ? 'text-skylva-charcoal/70 hover:text-skylva-charcoal' : 'text-white/70 hover:text-white',
    underlineClass: useDarkText ? 'bg-skylva-charcoal' : 'bg-white',
    buttonClass: useDarkText ? 'bg-skylva-charcoal text-white hover:bg-black' : 'bg-white text-black hover:bg-skylva-sand',
    dividerClass: useDarkText ? 'border-skylva-charcoal/20' : 'border-white/20',
    langActive: useDarkText ? 'text-skylva-charcoal' : 'text-white',
    langInactive: useDarkText ? 'text-skylva-charcoal/40' : 'text-white/40'
  };

  const navClasses = `
    absolute top-0 left-0 right-0 z-[60] 
    pt-[calc(env(safe-area-inset-top)+2rem)] pb-8 
    md:fixed 
    transition-all duration-500 ease-in-out
    ${isScrolled 
      ? 'md:py-4 md:bg-black/40 md:backdrop-blur-xl md:border-b md:border-white/10 md:shadow-lg' 
      : 'md:py-8 md:bg-transparent md:backdrop-blur-none md:border-b md:border-transparent'}
  `;

  // --- Scroll Logic ---
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      setIsScrolled(currentScrollY > 20);

      const totalScrollable = docHeight - windowHeight;
      const progress = totalScrollable > 0 ? currentScrollY / totalScrollable : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));

      // Show mobile menu only when past the hero section (approx 1 viewport height)
      const heroThreshold = windowHeight - 100; 
      const isPastHero = currentScrollY > heroThreshold;

      if (!isMobileOpen) {
        // Always hide while scrolling for a smoother feel
        setIsButtonVisible(false);
        clearTimeout(scrollTimeout);
        
        // Only schedule the button to show if we are past the hero section
        if (isPastHero) {
            scrollTimeout = setTimeout(() => {
              setIsButtonVisible(true);
            }, 250);
        }
      }
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }
    
    return () => {
      if (typeof window !== 'undefined') {
         window.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(scrollTimeout);
    };
  }, [isMobileOpen]);

  useEffect(() => {
    // Force visible when menu is opened, regardless of scroll position
    if (isMobileOpen) setIsButtonVisible(true);
  }, [isMobileOpen]);

  // --- Data ---
  const desktopNavItems: NavItem[] = [
    { label: t.nav.vision, href: '#vision', type: 'anchor' },
    { label: t.nav.product, href: '#structures', type: 'anchor' },
    { label: t.nav.technology, href: '#technology', type: 'anchor' },
    { label: t.footer.link_about, href: '#about', type: 'page', view: ViewState.ABOUT },
  ];

  const mobileNavItems: NavItem[] = [
    { label: t.nav.home, href: '#', type: 'page', view: ViewState.LANDING },
    { label: t.nav.product, href: '#structures', type: 'anchor' },
    { label: t.nav.technology, href: '#technology', type: 'anchor' },
    { label: t.experience.light_label, href: '#atmosphere', type: 'page', view: ViewState.ATMOSPHERE },
    { label: t.footer.link_about, href: '#about', type: 'page', view: ViewState.ABOUT },
    { label: t.footer.link_sustainability, href: '#sustainability', type: 'page', view: ViewState.SUSTAINABILITY },
    { label: t.footer.link_careers, href: '#careers', type: 'page', view: ViewState.CAREERS },
    { label: t.footer.link_press, href: '#press', type: 'page', view: ViewState.PRESS },
    { label: t.footer.link_contact, href: '#contact', type: 'page', view: ViewState.CONTACT },
  ];

  // --- Handlers ---
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    
    if (item.type === 'page') {
      setIsMobileOpen(false);
      
      if (view === item.view) {
          if ((window as any).lenis) {
              (window as any).lenis.scrollTo(0, { immediate: true });
          } else {
              window.scrollTo(0, 0);
          }
      } else {
          setView(item.view!);
      }
      return;
    }

    const navigateAndScroll = () => {
       const targetId = item.href.replace('#', '');
       const element = document.getElementById(targetId);
       if (element) {
          setIsMobileOpen(false);
          const headerOffset = 50; 
          
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(element, { 
              offset: -headerOffset,
              duration: 1.5,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          } else {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
       }
    };

    if (view !== ViewState.LANDING) {
      setView(ViewState.LANDING);
      setTimeout(navigateAndScroll, 100);
    } else {
      navigateAndScroll();
    }
  };

  const scrollToTop = () => {
    if (view !== ViewState.LANDING) {
      setView(ViewState.LANDING);
    } else {
      if ((window as any).lenis) {
         (window as any).lenis.scrollTo(0, { duration: 1.5 });
      } else {
         window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleConfigureClick = () => {
    const scrollToConfig = () => {
        const el = document.getElementById('configure');
        if (el && (window as any).lenis) (window as any).lenis.scrollTo(el, { offset: -50, duration: 1.5 });
        else if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    if (view !== ViewState.LANDING) {
        setView(ViewState.LANDING);
        setTimeout(scrollToConfig, 100);
    } else {
        scrollToConfig();
    }
  };

  return (
    <>
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Logo 
            isScrolled={isScrolled} 
            textColorClass={colors.textColorClass} 
            onClick={scrollToTop} 
          />
          <DesktopNav 
            navItems={desktopNavItems} 
            handleNavClick={handleNavClick} 
            handleConfigureClick={handleConfigureClick}
            colors={colors}
          />
        </div>
      </nav>

      <MobileNav 
        isOpen={isMobileOpen}
        setIsOpen={setIsMobileOpen}
        navItems={mobileNavItems}
        handleNavClick={handleNavClick}
        scrollProgress={scrollProgress}
        isButtonVisible={isButtonVisible}
        onToggleChat={onToggleChat}
      />
    </>
  );
};

export default Navigation;
