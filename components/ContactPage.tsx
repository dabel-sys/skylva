import React, { useState } from 'react';
import { m } from 'framer-motion';
import { MapPin, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import TextReveal from './TextReveal';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct mailto link
    const subject = `New Inquiry from ${formState.name}`;
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;
    const mailtoLink = `mailto:info@skylva.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;

    // Show success message in UI
    setIsSent(true);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section className="min-h-screen bg-skylva-matte text-white pt-32 pb-20 px-6 flex flex-col justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-skylva-green/5 blur-[120px] rounded-full mix-blend-screen" />
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D8D4CD]/5 blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column: Info */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
             <div className="mb-12">
               <span className="w-2 h-2 bg-skylva-green rounded-full inline-block mr-3 mb-1 animate-pulse" />
               <span className="text-xs font-mono text-skylva-green tracking-widest uppercase">{t.footer.link_contact}</span>
               <h1 className="text-5xl md:text-7xl font-display font-light mt-6 mb-6 leading-[0.9]">
                 <TextReveal mode="chars" stagger={0.02}>{t.contact_page.title}</TextReveal>
               </h1>
               <p className="text-lg text-white/60 font-sans font-light max-w-md">
                 {t.contact_page.subtitle}
               </p>
             </div>

             <div className="space-y-12 mt-20">
               <div>
                  <div className="flex items-center gap-3 mb-4 text-skylva-sand/80">
                    <MapPin size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">{t.contact_page.info_address}</span>
                  </div>
                  <address className="not-italic text-xl font-display font-light leading-relaxed pl-8 border-l border-white/10">
                    SKYLVA BV<br />
                    Schuttersweg 8<br />
                    1217 PZ HILVERSUM
                  </address>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-4 text-skylva-sand/80">
                    <Mail size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest">{t.contact_page.info_email}</span>
                  </div>
                  <a href="mailto:info@skylva.com" className="block text-xl font-display font-light pl-8 border-l border-white/10 hover:text-skylva-sand transition-colors">
                    info@skylva.com
                  </a>
               </div>
             </div>
          </m.div>

          {/* Right Column: Form */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12"
          >
             {isSent ? (
               <div className="h-full flex flex-col items-center justify-center text-center py-20">
                 <m.div 
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className="w-16 h-16 rounded-full bg-skylva-green text-white flex items-center justify-center mb-6"
                 >
                   <ArrowRight size={24} />
                 </m.div>
                 <h3 className="text-2xl font-display mb-2">Request Received</h3>
                 <p className="text-white/60">{t.contact_page.sent_success}</p>
                 <button 
                   onClick={() => setIsSent(false)} 
                   className="mt-8 text-xs font-bold uppercase tracking-widest underline decoration-white/30 hover:decoration-white underline-offset-4"
                 >
                   Send another
                 </button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 ml-1">{t.contact_page.form_name}</label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white placeholder-white/20 focus:outline-none focus:border-skylva-sand transition-colors font-light text-lg"
                      placeholder="Jane Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 ml-1">{t.contact_page.form_email}</label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white placeholder-white/20 focus:outline-none focus:border-skylva-sand transition-colors font-light text-lg"
                      placeholder="jane@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/60 ml-1">{t.contact_page.form_message}</label>
                    <textarea 
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                      className="w-full bg-transparent border-b border-white/20 py-4 px-2 text-white placeholder-white/20 focus:outline-none focus:border-skylva-sand transition-colors font-light text-lg resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-white text-black py-5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-skylva-sand transition-colors mt-8"
                  >
                    {t.contact_page.form_submit}
                  </button>
               </form>
             )}
          </m.div>

        </div>
      </div>
    </section>
  );
};

export default ContactPage;