import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import ProductShowcase from './components/ProductShowcase';
import Technology from './components/Technology';
import ConfiguratorCTA from './components/ConfiguratorCTA';
import Values from './components/Values';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <div className="bg-skylva-offwhite text-skylva-charcoal font-sans selection:bg-skylva-green selection:text-white">
      <Navigation />
      <main>
        <Hero />
        <Philosophy />
        <ProductShowcase />
        <Technology />
        <ConfiguratorCTA />
        <Values />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;