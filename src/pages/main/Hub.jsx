import React, { useState } from 'react';
import { Search, ShoppingBag, Calendar, Users, MessageSquare, Plus } from 'lucide-react';
import { CHATS, MARKET_ITEMS, EVENTS, GUILDS } from '../../data/mockData';
import ChatWindow from '../../components/chat/ChatWindow';
import CreatePostModal from '../../components/modals/CreatePostModal';

const Hub = ({ onOpenDetail }) => {
  const [activeTab, setActiveTab] = useState('chat'); // chat, market, events, guilds
  const [selectedChat, setSelectedChat] = useState(null);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // If a chat is selected, show the full chat window instead of the list
  if (selectedChat) {
    return (
      <ChatWindow 
        chat={selectedChat} 
        onBack={() => setSelectedChat(null)} 
        // THIS IS THE KEY: When profile is clicked in chat, tell App.jsx to open the User Modal
        onViewProfile={(user) => onOpenDetail('user', user)} 
      />
    );
  }

  return (
    <div className="flex h-full bg-background relative">
      {showCreatePost && (
        <CreatePostModal onClose={() => setShowCreatePost(false)} onPost={(data) => console.log("Posted:", data)} />
      )}

      {/* Sidebar */}
      <div className="w-64 bg-surface border-r border-white/5 flex flex-col pt-4">
        <div className="px-4 mb-6">
          <h2 className="text-xl font-bold text-white mb-1">Community Hub</h2>
          <p className="text-xs text-textDim">Global Network</p>
        </div>
        <nav className="flex-1 px-2 space-y-1">
          <NavBtn Icon={MessageSquare} label="Discussions" active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
          <NavBtn Icon={ShoppingBag} label="Marketplace" active={activeTab === 'market'} onClick={() => setActiveTab('market')} />
          <NavBtn Icon={Calendar} label="Events" active={activeTab === 'events'} onClick={() => setActiveTab('events')} />
          <NavBtn Icon={Users} label="Guilds" active={activeTab === 'guilds'} onClick={() => setActiveTab('guilds')} />
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-300">
        <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-surface/50 backdrop-blur">
          <h3 className="text-lg font-bold text-white capitalize">{activeTab}</h3>
          <div className="flex gap-3">
            {activeTab === 'chat' && (
              <button onClick={() => setShowCreatePost(true)} className="flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                <Plus size={16} /> New Post
              </button>
            )}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-textDim" size={16} />
              <input type="text" placeholder="Search..." className="bg-background border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white w-64 focus:border-primary outline-none"/>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'chat' && (
            <div className="space-y-2">
              {CHATS.map(chat => (
                <div key={chat.id} onClick={() => setSelectedChat(chat)} className="bg-surface p-4 rounded-xl flex items-center gap-4 border border-white/5 hover:border-primary/50 cursor-pointer transition-all hover:bg-white/5">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${chat.type === 'guild' ? 'bg-primary text-white' : 'bg-gray-700'}`}>
                    {chat.avatar ? <img src={chat.avatar} className="w-full h-full rounded-full" alt={chat.name}/> : chat.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between"><span className="font-bold text-white">{chat.name}</span><span className="text-xs text-textDim">{chat.time}</span></div>
                    <p className="text-sm text-textDim truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-white">{chat.unread}</div>}
                </div>
              ))}
            </div>
          )}
          {activeTab === 'market' && (
            <div className="grid grid-cols-3 gap-6">
                {MARKET_ITEMS.map(item => (
                <div key={item.id} onClick={() => onOpenDetail('market', item)} className="bg-surface rounded-2xl overflow-hidden border border-white/5 group hover:-translate-y-1 transition-transform cursor-pointer">
                    <div className="h-40 overflow-hidden relative"><img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.title}/><div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-bold text-secondary">{item.price}</div></div>
                    <div className="p-4"><h4 className="font-bold text-white truncate">{item.title}</h4><span className="text-xs text-textDim">@{item.seller}</span></div>
                </div>
                ))}
            </div>
          )}
          {activeTab === 'events' && (
            <div className="grid grid-cols-2 gap-6">
                {EVENTS.map(event => (
                <div key={event.id} onClick={() => onOpenDetail('event', event)} className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer border border-white/5">
                    <img src={event.image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt={event.title}/><div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" /><div className="absolute bottom-0 p-6"><div className="bg-primary w-fit px-3 py-1 rounded text-xs font-bold text-white mb-2">{event.date}</div><h3 className="text-2xl font-bold text-white">{event.title}</h3><p className="text-sm text-gray-300">{event.location}</p></div>
                </div>
                ))}
            </div>
          )}
          {activeTab === 'guilds' && (
            <div className="grid grid-cols-3 gap-6">
                {GUILDS.map(guild => (
                <div key={guild.id} onClick={() => onOpenDetail('guild', guild)} className="bg-surface p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{backgroundColor: guild.color + '20'}}><Users size={32} style={{color: guild.color}} /></div>
                    <h4 className="font-bold text-white text-lg">{guild.name}</h4><p className="text-sm text-textDim mb-4">{guild.members} Members</p><button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-bold text-white transition-colors">View Realm</button>
                </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NavBtn = ({ Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-textDim hover:bg-white/5 hover:text-white'}`}>
    <Icon size={18} /> {label}
  </button>
);

export default Hub;