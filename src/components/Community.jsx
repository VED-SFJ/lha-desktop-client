import React, { useState } from 'react';
import { CHATS, MESSAGES } from '../data/mockData';
import { Search, Plus, Hash, Mic, Headphones, Send, Paperclip } from 'lucide-react';

const Community = () => {
  const [activeChat, setActiveChat] = useState(CHATS[0]);
  const [input, setInput] = useState("");

  return (
    <div className="flex h-full bg-background">
      {/* Left: Chat List (Guilds & DMs) */}
      <div className="w-72 bg-surface border-r border-white/5 flex flex-col">
        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-textDim" size={16} />
            <input 
              type="text" 
              placeholder="Search comms..." 
              className="w-full bg-background rounded-lg py-2 pl-10 pr-4 text-sm text-white border border-white/5 focus:border-primary outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <div className="text-xs font-bold text-textDim px-3 mb-2 mt-4">GUILDS</div>
          {CHATS.filter(c => c.type === 'guild').map(chat => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${activeChat.id === chat.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-white/10">
                <Hash size={20} className="text-textDim" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-white truncate">{chat.name}</span>
                  {chat.unread > 0 && <span className="bg-primary text-white text-[10px] px-1.5 rounded-full">{chat.unread}</span>}
                </div>
                <p className="text-xs text-textDim truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}

          <div className="text-xs font-bold text-textDim px-3 mb-2 mt-6">DIRECT MESSAGES</div>
          {CHATS.filter(c => c.type === 'direct').map(chat => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${activeChat.id === chat.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <img src={chat.avatar} className="w-10 h-10 rounded-full" />
              <div className="flex-1 min-w-0">
                <span className="font-bold text-white block">{chat.name}</span>
                <p className="text-xs text-textDim truncate">{chat.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Voice Status Area */}
        <div className="p-3 bg-black/40 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-green-500">Voice Connected</span>
          </div>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-white/10 rounded"><Mic size={14} /></button>
            <button className="p-1.5 hover:bg-white/10 rounded"><Headphones size={14} /></button>
          </div>
        </div>
      </div>

      {/* Right: Chat View */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Chat Header */}
        <div className="h-16 border-b border-white/5 flex items-center px-6 justify-between bg-surface/50 backdrop-blur">
          <div className="flex items-center gap-3">
            <Hash size={24} className="text-textDim" />
            <div>
              <h2 className="font-bold text-white">{activeChat.name}</h2>
              <p className="text-xs text-textDim">Topic: General Discussion</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {MESSAGES.map(msg => (
            <div key={msg.id} className={`flex gap-4 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${msg.sender === 'me' ? 'bg-primary' : 'bg-surfaceHighlight'}`}>
                {msg.name[0]}
              </div>
              <div className={`max-w-[70%] ${msg.sender === 'me' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-white text-sm">{msg.name}</span>
                  <span className="text-[10px] text-textDim">{msg.time}</span>
                </div>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'me' ? 'bg-primary text-white rounded-tr-none' : 'bg-surface text-gray-200 rounded-tl-none border border-white/5'}`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background">
          <div className="bg-surface rounded-xl flex items-center p-2 gap-2 border border-white/10 focus-within:border-primary transition-colors">
            <button className="p-2 text-textDim hover:text-white"><Plus size={20} /></button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message #${activeChat.name}`}
              className="bg-transparent flex-1 outline-none text-white font-mono text-sm h-10" 
            />
            <button className="p-2 text-textDim hover:text-white"><Paperclip size={18} /></button>
            <button className="p-2 bg-primary text-white rounded-lg hover:bg-indigo-500 transition-colors">
                <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;