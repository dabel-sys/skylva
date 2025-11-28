import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message based on language
  useEffect(() => {
    setMessages([
        { role: 'model', text: t.chat.welcome }
    ]);
  }, [t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    // Mobile: Bottom-Left (left-6). Desktop: Bottom-Right (md:right-6 md:left-auto).
    // Added mb-[env(safe-area-inset-bottom)] to ensure the widget clears the home indicator on iOS
    <div className="fixed bottom-6 left-6 md:left-auto md:right-6 z-50 flex flex-col items-start md:items-end mb-[env(safe-area-inset-bottom)]">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-skylva-matte/95 backdrop-blur-xl border border-white/10 shadow-2xl text-white flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 rounded-2xl origin-bottom-left md:origin-bottom-right">
          {/* Header */}
          <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center space-x-2">
                <Sparkles size={14} className="text-skylva-sand" />
                <span className="text-xs font-bold tracking-widest uppercase">Skylva AI</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <X size={18} />
            </button>
          </div>

          {/* Chat Area */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
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
                    className="text-skylva-sand hover:text-white transition-colors disabled:opacity-50"
                >
                    <Send size={18} />
                </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-skylva-matte text-white p-4 rounded-full shadow-lg hover:bg-skylva-charcoal transition-all duration-300 hover:scale-105 border border-white/10"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;