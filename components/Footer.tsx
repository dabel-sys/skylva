import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-skylva-matte text-white/60 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <h4 className="text-white font-display text-xl tracking-widest uppercase mb-6">Skylva</h4>
            <p className="text-sm font-sans font-light">
              Oslo, Norway<br />
              Designed for the future.
            </p>
          </div>
          
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Explore</h5>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#" className="hover:text-white transition-colors">Structures</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Materials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Technology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Studio</a></li>
            </ul>
          </div>

          <div>
             <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Company</h5>
            <ul className="space-y-4 text-sm font-light">
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Newsletter</h5>
            <div className="flex border-b border-white/20 pb-2">
              <input type="email" placeholder="Email Address" className="bg-transparent border-none focus:ring-0 text-white w-full font-light text-sm" />
              <button className="text-xs uppercase font-bold text-white hover:text-skylva-sand">Join</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-xs font-light text-white/30">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SKYLVA Systems AS. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;