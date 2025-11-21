import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { sendMessageToSkylvaAI } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome. I am the SKYLVA architectural intelligence. How may I assist with your solar integration?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await sendMessageToSkylvaAI(messages, userMsg.text);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (e) {
      // Error handled in service
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-skylva-charcoal text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 flex items-center gap-2 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="w-5 h-5" />
        <span className="text-xs font-medium tracking-wider uppercase hidden md:block">Consult AI</span>
      </button>

      {/* Chat Interface */}
      <div className={`fixed bottom-8 right-8 z-50 w-[90vw] md:w-[400px] bg-white shadow-2xl border border-skylva-stone overflow-hidden transition-all duration-500 ease-in-out transform ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-skylva-charcoal text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs uppercase tracking-widest font-semibold">Skylva Intelligence</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-skylva-stone">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 bg-skylva-white space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-skylva-charcoal text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                  : 'bg-white border border-skylva-stone text-skylva-charcoal rounded-tr-lg rounded-br-lg rounded-bl-lg'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
               <div className="bg-white border border-skylva-stone p-3 rounded-lg flex gap-1">
                 <span className="w-1 h-1 bg-skylva-charcoal rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                 <span className="w-1 h-1 bg-skylva-charcoal rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                 <span className="w-1 h-1 bg-skylva-charcoal rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-skylva-stone flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about energy, design, or materials..."
            className="flex-1 bg-skylva-white px-4 py-2 text-sm text-skylva-charcoal focus:outline-none focus:ring-1 focus:ring-skylva-charcoal"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2 bg-skylva-charcoal text-white hover:bg-black disabled:opacity-50 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};