import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Users, Maximize, Play, Volume2, Settings, MessageSquare } from 'lucide-react';

const INITIAL_MESSAGES = [
  { id: 1, user: 'Kirito', color: 'bg-blue-600', text: 'No way he just did that...' },
  { id: 2, user: 'Asuna', color: 'bg-pink-600', text: 'I\'m literally crying T_T this scene...' },
  { id: 3, user: 'PixelMaster', color: 'bg-purple-600', text: 'Wait for the drop!' },
];

const Theater = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { 
      id: Date.now(), 
      user: 'You', 
      color: 'bg-primary', 
      text: input 
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInput('');
  };

  return (
    <div className="flex h-full bg-black animate-in fade-in duration-500">
      
      {/* LEFT: Video Player Area (Flexible Width) */}
      <div className="flex-1 flex flex-col relative group overflow-hidden">
        
        {/* Background Image simulating video */}
        <img 
          src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-40"
          alt="Video Stream"
        />
        
        {/* Top Overlay Info */}
        <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div>
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">Cyberpunk: Edgerunners</h2>
            <p className="text-gray-300 text-sm font-mono mt-1">EPISODE 4 • 14:20 / 24:00</p>
          </div>
          <button className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors backdrop-blur-md text-white">
            <Settings size={20} />
          </button>
        </div>

        {/* Center Play/Pause Indicator (Clicking video) */}
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying && (
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:scale-110 transition-transform hover:bg-primary hover:border-primary group/play">
              <div className="w-0 h-0 border-t-[16px] border-t-transparent border-l-[32px] border-l-white border-b-[16px] border-b-transparent ml-2 group-hover/play:border-l-white"></div>
            </div>
          )}
        </div>
        
        {/* Bottom Controls (Appear on Hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Progress Bar */}
          <div className="w-full bg-white/20 h-1.5 rounded-full mb-4 cursor-pointer overflow-hidden relative group/bar">
            <div className="bg-primary h-full w-[45%] relative">
               <div className="absolute right-0 -top-1.5 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover/bar:scale-100 transition-transform" />
            </div>
          </div>

          <div className="flex justify-between items-center text-white">
             <div className="flex items-center gap-6">
               <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-primary transition-colors">
                 <Play size={24} fill={isPlaying ? "currentColor" : "none"} />
               </button>
               <div className="flex items-center gap-2 group/vol">
                 <Volume2 size={24} />
                 <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300">
                   <div className="w-20 h-1 bg-white/50 rounded-full ml-2">
                     <div className="w-[70%] h-full bg-white rounded-full" />
                   </div>
                 </div>
               </div>
               <span className="text-gray-400 font-mono text-sm">14:20 / 24:00</span>
             </div>
             
             <div className="flex gap-4">
                <button className="hover:text-primary transition-colors"><MessageSquare size={24} /></button>
                <button className="hover:text-primary transition-colors"><Maximize size={24} /></button>
             </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Chat Sidebar (Fixed Width) */}
      <div className="w-80 flex flex-col bg-surface border-l border-white/5 z-10">
        
        {/* Sidebar Header */}
        <div className="h-16 flex justify-between items-center px-6 border-b border-white/5 bg-surfaceHighlight/30 backdrop-blur-md">
          <div>
            <h3 className="font-bold text-white text-sm tracking-wide">WATCH PARTY</h3>
            <span className="text-[10px] text-textDim">Room ID: #8821</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
            <Users size={12} /> 24 Live
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 animate-in slide-in-from-right duration-300 ${msg.user === 'You' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs text-white shadow-lg ${msg.color}`}>
                      {msg.user[0]}
                  </div>
                  <div className={`flex-1 max-w-[80%] ${msg.user === 'You' ? 'items-end' : ''}`}>
                      <div className={`flex justify-between items-baseline mb-1 ${msg.user === 'You' ? 'flex-row-reverse gap-2' : ''}`}>
                          <span className={`text-xs font-bold ${msg.user === 'You' ? 'text-primary' : 'text-gray-300'}`}>{msg.user}</span>
                      </div>
                      <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.user === 'You' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-surfaceHighlight text-gray-300 rounded-tl-none border border-white/5'
                      }`}>
                        {msg.text}
                      </div>
                  </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-surface border-t border-white/5">
            <form 
              onSubmit={handleSend}
              className="bg-background rounded-xl flex items-center px-4 py-3 border border-white/10 focus-within:border-primary transition-all shadow-inner"
            >
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..." 
                  className="bg-transparent border-none outline-none text-sm text-white flex-1 placeholder:text-textDim" 
                />
                <button type="submit" className={`ml-2 transition-colors ${input.trim() ? 'text-primary' : 'text-textDim hover:text-white'}`}>
                  <Send size={18} />
                </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Theater;