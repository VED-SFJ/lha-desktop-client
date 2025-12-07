import React from 'react';
import { X, Play, Heart, Share2, Star, ShoppingBag, Calendar, Users, MessageSquare, ShieldCheck, MapPin, UserPlus } from 'lucide-react';

const DetailsModal = ({ item, type, onClose, onAction }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="bg-surface w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden border border-white/10 flex flex-col relative shadow-2xl z-10">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full hover:bg-white hover:text-black transition-colors">
          <X size={24} />
        </button>

        {/* --- FRIEND PROFILE (NEW) --- */}
        {type === 'user' && (
          <div className="flex flex-col h-full relative">
            {/* Banner */}
            <div className="h-48 bg-gradient-to-r from-blue-900 to-slate-900 relative">
                {item.banner && <img src={item.banner} className="w-full h-full object-cover opacity-50" />}
                <div className="absolute -bottom-12 left-8 p-1 bg-surface rounded-full">
                    <img src={item.avatar || `https://ui-avatars.com/api/?name=${item.name}`} className="w-24 h-24 rounded-full border-4 border-surface bg-gray-800" />
                </div>
            </div>
            
            <div className="pt-16 px-8 pb-8 flex-1 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                            {item.name} 
                            <span className="w-3 h-3 bg-green-500 rounded-full border-2 border-surface shadow-sm" title="Online"/>
                        </h1>
                        <p className="text-primary font-mono text-sm">@{item.handle || item.name.toLowerCase().replace(' ', '_')}</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2 bg-primary text-white rounded-full font-bold text-sm hover:bg-indigo-500 flex items-center gap-2">
                            <MessageSquare size={16} /> Message
                        </button>
                        <button className="p-2 border border-white/20 rounded-full text-white hover:bg-white/10">
                            <UserPlus size={18} />
                        </button>
                    </div>
                </div>

                <p className="text-gray-300 mb-8 max-w-xl">{item.bio || "Level 99 Mage in real life. 🧙‍♀️ Code by day, Mana cultivation by night."}</p>

                <h3 className="font-bold text-white mb-4">Stats</h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { label: 'Reads', value: '1.2K' },
                        { label: 'Rank', value: '#45' },
                        { label: 'Guild', value: 'Apex' }
                    ].map(stat => (
                        <div key={stat.label} className="bg-background p-4 rounded-xl border border-white/5 text-center">
                            <h4 className="text-textDim text-xs uppercase mb-1">{stat.label}</h4>
                            <p className="text-white font-bold text-lg">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        )}

        {/* --- COMIC --- */}
        {type === 'comic' && (
          <div className="flex h-full flex-col md:flex-row">
            <div className="w-full md:w-1/3 relative h-64 md:h-full">
              <img src={item.cover} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="flex gap-2 mb-4">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">{item.status}</span>
                <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Star size={12} fill="currentColor" className="text-yellow-400"/> 4.9</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">{item.title}</h1>
              <p className="text-textDim text-sm mb-6">Author: Unknown • {item.views || '2.5M'} Views</p>
              
              <div className="flex gap-3 mb-8">
                <button onClick={() => onAction('read', item)} className="flex-1 bg-primary hover:bg-indigo-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                  <Play size={20} fill="currentColor" /> Start Reading
                </button>
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white"><Heart size={20} /></button>
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white"><Share2 size={20} /></button>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">Synopsis</h3>
              <p className="text-gray-400 leading-relaxed mb-8 text-sm">
                In a world where hunters, humans who possess magical abilities, must battle deadly monsters to protect the human race from certain annihilation, a notoriously weak hunter named Sung Jinwoo finds himself in a seemingly endless struggle for survival.
              </p>

              <h3 className="text-lg font-bold text-white mb-4">Chapters</h3>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-background rounded-lg hover:bg-white/5 cursor-pointer group transition-colors">
                    <span className="text-gray-300 font-mono group-hover:text-primary">Chapter {15 - i}</span>
                    <span className="text-textDim text-xs">2 days ago</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- MARKET --- */}
        {type === 'market' && (
          <div className="flex h-full flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-black flex items-center justify-center p-8">
              <img src={item.image} className="max-w-full max-h-full rounded-xl shadow-lg" />
            </div>
            <div className="w-full md:w-1/2 p-8 bg-surface flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-secondary font-mono text-xs border border-secondary/30 px-2 py-1 rounded">RARE ITEM</span>
                <span className="text-3xl font-bold text-white">{item.price}</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-6">{item.title}</h1>
              
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl mb-6 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => onAction('view_profile', { name: item.seller })}>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">{item.seller[0]}</div>
                <div>
                  <div className="text-white font-bold">@{item.seller}</div>
                  <div className="text-textDim text-xs">Verified Seller • 98% Rating</div>
                </div>
                <button className="ml-auto text-primary text-sm font-bold hover:underline">View Profile</button>
              </div>

              <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl mb-6 flex items-center gap-3">
                <ShieldCheck className="text-primary" size={24} />
                <div>
                    <h4 className="text-white font-bold text-sm">Buyer Protection</h4>
                    <p className="text-textDim text-xs">Funds held until item is received.</p>
                </div>
              </div>

              <button className="w-full bg-secondary hover:bg-green-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 mt-auto shadow-lg shadow-secondary/20 transition-all">
                <ShoppingBag size={20} /> Purchase Now
              </button>
            </div>
          </div>
        )}

        {/* --- GUILD --- */}
        {type === 'guild' && (
          <div className="flex flex-col h-full">
            <div className="h-40 bg-gradient-to-r from-primary to-purple-900 relative shrink-0">
              <div className="absolute -bottom-10 left-8 flex items-end gap-4">
                <div className="w-24 h-24 bg-surface rounded-2xl flex items-center justify-center border-4 border-surface text-primary shadow-xl">
                  <Users size={40} />
                </div>
                <div className="mb-3">
                  <h1 className="text-3xl font-bold text-white">{item.name}</h1>
                  <p className="text-white/80 text-sm">{item.members} Members</p>
                </div>
              </div>
            </div>
            <div className="flex-1 p-8 pt-16 overflow-y-auto">
              <p className="text-xl text-gray-300 mb-8 max-w-2xl font-light">{item.desc} Join us to participate in weekly raids, code reviews, and community events.</p>
              
              <h3 className="font-bold text-white mb-4">Realm Stats</h3>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-background p-4 rounded-xl border border-white/5 text-center">
                  <h4 className="text-textDim text-xs uppercase mb-1">Activity</h4>
                  <p className="text-secondary font-bold">Very High</p>
                </div>
                <div className="bg-background p-4 rounded-xl border border-white/5 text-center">
                  <h4 className="text-textDim text-xs uppercase mb-1">Region</h4>
                  <p className="text-white font-bold">Global</p>
                </div>
                <div className="bg-background p-4 rounded-xl border border-white/5 text-center">
                  <h4 className="text-textDim text-xs uppercase mb-1">Language</h4>
                  <p className="text-white font-bold">English</p>
                </div>
              </div>

              <div className="mt-auto flex gap-4">
                <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-indigo-500 transition-colors">Join Guild</button>
                <button className="px-6 py-3 border border-white/20 text-white rounded-xl font-bold hover:bg-white/5 transition-colors">Message Admin</button>
              </div>
            </div>
          </div>
        )}

        {/* --- EVENT --- */}
        {type === 'event' && (
          <div className="flex h-full relative group">
            <img src={item.image} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[20s]" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent" />
            <div className="relative z-10 w-full md:w-2/3 p-10 flex flex-col justify-center h-full">
              <div className="bg-red-500 text-white w-fit px-3 py-1 rounded-full text-xs font-bold mb-6 shadow-lg shadow-red-500/20">UPCOMING EVENT</div>
              <h1 className="text-6xl font-black text-white mb-6 leading-none tracking-tight">{item.title}</h1>
              
              <div className="flex flex-col gap-4 text-gray-300 mb-8">
                <div className="flex items-center gap-3 text-lg"><Calendar size={24} className="text-primary"/> {item.date}</div>
                <div className="flex items-center gap-3 text-lg"><MapPin size={24} className="text-primary"/> {item.location}</div>
              </div>
              
              <p className="text-gray-400 mb-10 text-lg max-w-md">
                Join us for the biggest event of the season. Exclusive rewards, cosplay contests, and developer Q&As await!
              </p>
              
              <button className="bg-white text-black py-4 px-10 rounded-full font-bold w-fit hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Calendar size={20} /> RSVP Now
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DetailsModal;