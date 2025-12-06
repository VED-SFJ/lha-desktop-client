import React from 'react';
import { Play, Clock, TrendingUp, Trophy } from 'lucide-react';
import { COMICS, CURRENT_USER } from '../data/mockData';

const Dashboard = ({ onNavigate }) => {
  return (
    <div className="p-8 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Welcome Back, <span className="text-primary">{CURRENT_USER.name}</span>
          </h1>
          <div className="flex items-center gap-2 text-sm text-textDim font-mono">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"/>
            SYSTEM ONLINE // RANK: {CURRENT_USER.rank.name}
          </div>
        </div>
        
        {/* XP Bar Widget */}
        <div className="bg-surfaceHighlight px-4 py-3 rounded-xl border border-white/5 w-64">
          <div className="flex justify-between text-xs text-textDim mb-2">
            <span>XP Progress</span>
            <span className="text-primary">{CURRENT_USER.xp.toLocaleString()}</span>
          </div>
          <div className="w-full bg-black h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-purple-500 h-full w-[70%]" />
          </div>
        </div>
      </div>

      {/* Featured Hero */}
      <div className="relative w-full h-[350px] rounded-3xl overflow-hidden mb-12 group cursor-pointer border border-white/5 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <img src={COMICS[1].cover} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
        
        <div className="absolute bottom-0 left-0 p-10 z-20 w-full max-w-2xl">
          <div className="flex gap-2 mb-4">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">TRENDING</span>
            <span className="bg-surface/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">ACTION</span>
          </div>
          <h2 className="text-5xl font-black italic text-white mb-4 tracking-tight drop-shadow-lg">SOLO LEVELING</h2>
          <p className="text-gray-300 mb-6 line-clamp-2">The weakest hunter of all mankind discovers a system that allows him to level up beyond all limits.</p>
          <button 
            onClick={() => onNavigate('reader', COMICS[1])}
            className="bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all flex items-center gap-2"
          >
            <Play size={20} fill="currentColor" /> Read Now
          </button>
        </div>
      </div>

      {/* Jump Back In */}
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Clock size={20} className="text-accent" /> Jump Back In
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {COMICS.map((comic) => (
          <div key={comic.id} className="bg-surface p-4 rounded-2xl border border-white/5 hover:border-primary/50 transition-all cursor-pointer flex gap-4 group">
            <div className="w-20 h-28 shrink-0 rounded-lg overflow-hidden relative">
              <img src={comic.cover} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{comic.title}</h4>
              <p className="text-xs text-textDim mb-3">{comic.lastChapter ? `Chapter ${comic.lastChapter}` : 'Start Reading'}</p>
              <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full transition-all duration-500" style={{ width: `${comic.progress * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trophies / Stats Row */}
      <div className="grid grid-cols-4 gap-6">
        {CURRENT_USER.badges.map((badge) => (
          <div key={badge.id} className="bg-surface/50 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-surface transition-colors">
            <Trophy size={24} className={badge.rarity === 'Primeval' ? 'text-purple-500' : 'text-gray-400'} />
            <span className="text-sm font-bold text-gray-300">{badge.name}</span>
            <span className="text-[10px] uppercase tracking-wider text-textDim">{badge.rarity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;