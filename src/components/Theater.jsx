import React from 'react';
import { ArrowLeft, Send, Users, Mic, Maximize } from 'lucide-react';

const Theater = () => {
  return (
    <div className="flex h-full bg-black">
      {/* LEFT: Video Player Area (75%) */}
      <div className="flex-1 flex flex-col relative">
        
        {/* Mock Video Player */}
        <div className="flex-1 bg-gray-900 flex items-center justify-center relative group">
          {/* Background Image simulating video */}
          <img 
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          
          {/* Play Button Overlay */}
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform cursor-pointer hover:bg-primary hover:border-primary">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
            </div>
            <h2 className="text-2xl font-bold text-white drop-shadow-lg">Cyberpunk: Edgerunners</h2>
            <p className="text-gray-300 text-sm font-mono mt-2 bg-black/50 inline-block px-3 py-1 rounded">EPISODE 4 • 14:20 / 24:00</p>
          </div>
          
          {/* Player Controls (Appear on Hover) */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-full bg-gray-700 h-1.5 rounded-full mb-4 cursor-pointer overflow-hidden">
              <div className="bg-primary h-full w-[45%] relative">
                 <div className="absolute right-0 -top-1 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
              </div>
            </div>
            <div className="flex justify-between items-center text-white">
               <div className="flex gap-4 text-sm font-bold">
                 <button>Play</button>
                 <button>Volume</button>
                 <span className="text-gray-400 font-normal">14:20 / 24:00</span>
               </div>
               <button><Maximize size={20} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Chat Sidebar (25%) */}
      <div className="w-80 flex flex-col bg-surface border-l border-white/5">
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-surfaceHighlight/50">
          <h3 className="font-bold text-white text-sm tracking-wide">WATCH PARTY</h3>
          <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
            <Users size={12} /> 24 Live
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs">K</div>
                <div>
                    <span className="text-xs font-bold text-primary">Kirito</span>
                    <p className="text-sm text-gray-300 leading-tight">No way he just did that...</p>
                </div>
            </div>
             <div className="flex gap-3">
                <div className="w-8 h-8 bg-pink-600 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs">A</div>
                <div>
                    <span className="text-xs font-bold text-pink-400">Asuna</span>
                    <p className="text-sm text-gray-300 leading-tight">I'm literally crying T_T this scene...</p>
                </div>
            </div>
             <div className="flex gap-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-xs">P</div>
                <div>
                    <span className="text-xs font-bold text-accent">PixelMaster</span>
                    <p className="text-sm text-gray-300 leading-tight">Wait for the drop!</p>
                </div>
            </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-surfaceHighlight/30">
            <div className="bg-background rounded-xl flex items-center px-4 py-2.5 border border-white/10 focus-within:border-primary transition-colors">
                <input type="text" placeholder="Type message..." className="bg-transparent border-none outline-none text-sm text-white flex-1" />
                <Send size={16} className="text-textDim hover:text-primary cursor-pointer transition-colors" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Theater;