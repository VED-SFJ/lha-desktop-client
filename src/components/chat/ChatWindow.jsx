import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Smile, 
  Mic, MicOff, PhoneOff, VideoOff, Maximize2, User 
} from 'lucide-react';

// --- CALL OVERLAY (Internal Component) ---
const CallOverlay = ({ chat, type, onEnd }) => {
  const [status, setStatus] = useState('Calling...');
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    const connectTimer = setTimeout(() => setStatus('Connected'), 2500);
    let interval;
    if (status === 'Connected') {
      interval = setInterval(() => setDuration(prev => prev + 1), 1000);
    }
    return () => { clearTimeout(connectTimer); clearInterval(interval); };
  }, [status]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute inset-0 z-[60] bg-[#0a0a0a] flex flex-col animate-in fade-in duration-300">
      {type === 'video' && (
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
          <div className="absolute top-6 right-6 w-32 h-48 bg-gray-800 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
      {type === 'voice' && (
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a2e] to-[#000000]" />
          <div className="relative z-10 mb-8">
            <div className={`absolute inset-0 bg-[#6366F1] rounded-full blur-2xl opacity-20 ${status === 'Calling...' ? 'animate-pulse' : ''}`}></div>
            <div className="w-32 h-32 rounded-full border-4 border-[#1e1e1e] overflow-hidden shadow-2xl relative">
              {chat.avatar ? <img src={chat.avatar} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[#6366F1] flex items-center justify-center text-4xl font-bold text-white">{chat.name[0]}</div>}
            </div>
          </div>
        </div>
      )}
      <div className="relative z-20 flex flex-col items-center justify-between h-full pt-16 pb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">{chat.name}</h2>
          <p className={`text-sm font-mono ${status === 'Connected' ? 'text-green-400' : 'text-gray-400 animate-pulse'}`}>{status === 'Connected' ? formatTime(duration) : status}</p>
        </div>
        <div className="flex items-center gap-6 bg-[#1e1e1e]/80 backdrop-blur-md px-8 py-6 rounded-3xl border border-white/5 shadow-2xl">
          <button onClick={() => setIsMuted(!isMuted)} className={`p-4 rounded-full transition-all ${isMuted ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>{isMuted ? <MicOff size={24} /> : <Mic size={24} />}</button>
          <button onClick={() => setIsVideoOff(!isVideoOff)} className={`p-4 rounded-full transition-all ${isVideoOff ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>{isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}</button>
          <button onClick={onEnd} className="p-5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-transform hover:scale-110 shadow-lg shadow-red-500/30 mx-4"><PhoneOff size={28} /></button>
          <button className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"><User size={24} /></button>
          <button className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"><Maximize2 size={24} /></button>
        </div>
      </div>
    </div>
  );
};

const ChatWindow = ({ chat, onBack, onViewProfile }) => { // ADDED PROP HERE
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! Are you going to the CyberFest?', sender: 'them', time: '10:00 AM' },
    { id: 2, text: 'Yeah, I just got my ticket!', sender: 'me', time: '10:05 AM' },
    { id: 3, text: 'Awesome! We should meet up at the Neon District.', sender: 'them', time: '10:06 AM' },
  ]);
  const [activeCallType, setActiveCallType] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), text: input, sender: 'me', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setTimeout(() => setMessages(prev => [...prev, { id: Date.now() + 1, text: 'That sounds like a plan! 🔥', sender: 'them', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]), 1500);
  };

  return (
    <div className="flex flex-col h-full bg-background animate-in slide-in-from-right duration-300 relative">
      {activeCallType && <CallOverlay chat={chat} type={activeCallType} onEnd={() => setActiveCallType(null)} />}
      
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-surface/50 backdrop-blur">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"><ArrowLeft size={20} className="text-textDim" /></button>
          
          {/* AVATAR CLICK OPENS PROFILE */}
          <button 
            onClick={() => onViewProfile(chat)} 
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold overflow-hidden hover:opacity-80 transition-opacity"
          >
            {chat.avatar ? <img src={chat.avatar} className="w-full h-full object-cover" alt="avatar"/> : chat.name[0]}
          </button>
          
          <div className="cursor-pointer" onClick={() => onViewProfile(chat)}>
            <h3 className="font-bold text-white text-sm hover:underline">{chat.name}</h3>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /><span className="text-xs text-textDim">Online</span></div>
          </div>
        </div>

        <div className="flex gap-2 text-textDim">
          <button onClick={() => setActiveCallType('voice')} className="p-2 hover:bg-white/10 rounded-full hover:text-white transition-colors"><Phone size={20} /></button>
          <button onClick={() => setActiveCallType('video')} className="p-2 hover:bg-white/10 rounded-full hover:text-white transition-colors"><Video size={20} /></button>
          <button className="p-2 hover:bg-white/10 rounded-full hover:text-white transition-colors"><MoreVertical size={20} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] rounded-2xl p-4 text-sm leading-relaxed relative group ${msg.sender === 'me' ? 'bg-primary text-white rounded-tr-none' : 'bg-surface border border-white/5 text-gray-200 rounded-tl-none'}`}>
              <p>{msg.text}</p>
              <span className={`text-[10px] absolute bottom-1 ${msg.sender === 'me' ? 'left-2 text-white/50' : 'right-2 text-gray-500'}`}>{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-surfaceHighlight/30 border-t border-white/5">
        <form onSubmit={handleSend} className="bg-surface rounded-xl flex items-center px-4 py-2 border border-white/10 focus-within:border-primary transition-colors gap-2">
          <button type="button" className="text-textDim hover:text-white transition-colors"><Paperclip size={20} /></button>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message ${chat.name}...`} className="bg-transparent border-none outline-none text-sm text-white flex-1 h-10" />
          <button type="button" className="text-textDim hover:text-white transition-colors"><Smile size={20} /></button>
          <button type="submit" className={`p-2 rounded-lg transition-all ${input.trim() ? 'bg-primary text-white' : 'bg-white/5 text-textDim'}`}><Send size={18} /></button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;