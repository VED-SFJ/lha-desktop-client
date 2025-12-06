import React, { useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { COMICS } from '../data/mockData';

const Library = ({ onNavigate }) => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="p-8 h-full bg-background overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">The Archives</h2>
        
        <div className="flex gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-2.5 text-textDim group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search database..." 
              className="bg-surfaceHighlight border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:border-primary outline-none w-64 transition-all" 
            />
          </div>
          <button className="bg-surfaceHighlight border border-white/5 p-2 rounded-full hover:bg-white/10 text-textDim hover:text-white transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Manhwa', 'Manga', 'Comics', 'Anime'].map((f) => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${
              filter === f 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-textDim border-white/10 hover:border-white/50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
        {COMICS.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onNavigate('reader', item)}
            className="group relative bg-surface rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all hover:-translate-y-1 cursor-pointer shadow-lg"
          >
            {/* Image Aspect Ratio Container */}
            <div className="aspect-[2/3] w-full relative overflow-hidden">
              <img 
                src={item.cover} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur px-2 py-1 rounded flex items-center gap-1 border border-white/10">
                <Star size={10} className="text-yellow-400 fill-yellow-400" />
                <span className="text-[10px] font-bold text-white">4.9</span>
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-full transform scale-90 group-hover:scale-100 transition-transform">Read</span>
              </div>
            </div>
            
            <div className="p-4">
              <span className="text-[10px] text-accent font-mono mb-1 block uppercase tracking-wider">{item.status}</span>
              <h3 className="font-bold text-white truncate group-hover:text-primary transition-colors">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;