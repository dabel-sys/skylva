import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ProductShowcase from './components/ProductShowcase';
import ProcessFlow from './components/ProcessFlow';
import Experience from './components/Experience';
import Technology from './components/Technology';
import ConfiguratorCTA from './components/ConfiguratorCTA';
import Values from './components/Values';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ScrollGauge from './components/ScrollGauge';

function App() {
  return (
    <LanguageProvider>
      <div className="bg-skylva-offwhite text-skylva-charcoal font-sans selection:bg-skylva-green selection:text-white relative">
        <ScrollGauge />
        <Navigation />
        <main>
          <Hero />
          <Philosophy />
          <ProductShowcase />
          <ProcessFlow />
          <Experience />
          <Technology />
          <ConfiguratorCTA />
          <Values />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </LanguageProvider>
  );
}

export default App;