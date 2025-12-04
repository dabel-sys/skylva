
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onToggle }) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // State for hiding button on scroll
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  // Initialize welcome message based on language
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
          { role: 'model', text: t.chat.welcome }
      ]);
    }
  }, [t, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle scroll visibility
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      // Don't hide if the chat window is actually open
      if (!isOpen) {
        setIsButtonVisible(false);
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
          setIsButtonVisible(true);
        }, 250); // 250ms debounce
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const aiResponseText = await sendMessageToGemini(messages, userMsg.text);
    
    setMessages(prev => [...prev, { role: 'model', text: aiResponseText }]);
    setIsLoading(false);
  };

  return (
    // Mobile: Widget is full screen-ish or positioned differently? 
    // We keep the widget fixed position, but hide the TOGGLE button on mobile since it's in the menu.
    <m.div 
      className="fixed bottom-6 left-6 md:left-auto md:right-6 z-[80] flex flex-col items-start md:items-end mb-[env(safe-area-inset-bottom)] pointer-events-none"
      animate={{
        y: isButtonVisible || isOpen ? 0 : 150, // Slide down off-screen
        opacity: isButtonVisible || isOpen ? 1 : 0
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <AnimatePresence>
        {isOpen && (
          <m.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-[calc(100vw-3rem)] md:w-96 bg-skylva-matte/95 backdrop-blur-xl border border-white/10 shadow-2xl text-white flex flex-col overflow-hidden rounded-2xl origin-bottom-left md:origin-bottom-right pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center space-x-2">
                  <Sparkles size={14} className="text-skylva-sand" />
                  <span className="text-xs font-bold tracking-widest uppercase">Skylva AI</span>
              </div>
              <button onClick={() => onToggle(false)} className="text-white/50 hover:text-white p-2">
                  <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="h-80 md:h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 text-sm font-light leading-relaxed rounded-xl ${
                          msg.role === 'user' 
                          ? 'bg-white text-black' 
                          : 'bg-white/5 text-white/90 border border-white/5'
                      }`}>
                          {msg.text}
                      </div>
                  </div>
              ))}
              {isLoading && (
                  <div className="flex justify-start">
                      <div className="bg-white/5 p-3 text-xs text-white/50 animate-pulse rounded-xl">
                          {t.chat.thinking}
                      </div>
                  </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-black/20">
              <div className="flex items-center space-x-2">
                  <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder={t.chat.placeholder}
                      className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-light placeholder-white/30 text-white outline-none"
                  />
                  <button 
                      onClick={handleSend}
                      disabled={isLoading}
                      className="text-skylva-sand hover:text-white transition-colors disabled:opacity-50 p-2"
                  >
                      <Send size={18} />
                  </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button - HIDDEN ON MOBILE (md:flex) because it is now in the Mobile Menu */}
      <button 
        onClick={() => onToggle(!isOpen)}
        className="hidden md:flex pointer-events-auto bg-skylva-matte text-white p-4 rounded-full shadow-lg hover:bg-skylva-charcoal transition-all duration-300 hover:scale-105 border border-white/10"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </m.div>
  );
};

export default ChatWidget;
