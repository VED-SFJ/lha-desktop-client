import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, Flame, Hash, ChevronRight } from 'lucide-react';

const TRENDING_TAGS = ['Solo Leveling', 'Cyberpunk', 'Fantasy', 'Isekai', 'Action'];
const RECENT_SEARCHES = ['The Beginning After The End', 'Omniscient Reader'];

const SearchOverlay = ({ onClose, onSearch }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus input automatically when opened
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
      onClose();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="w-full max-w-2xl bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-slide-down">
        
        {/* Input Header */}
        <div className="flex items-center gap-4 p-4 border-b border-white/5">
          <Search size={24} className="text-gray-400" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search comics, users, or commands..." 
            className="flex-1 bg-transparent text-xl text-white outline-none placeholder:text-white/20 font-sans"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex gap-2">
            <span className="bg-white/10 text-gray-400 text-[10px] px-2 py-1 rounded border border-white/5">ESC</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-2 min-h-[300px]">
          {!query ? (
            <div className="p-4 space-y-6">
              {/* Recent */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 px-2 tracking-wider">Recent</h4>
                <div className="space-y-1">
                  {RECENT_SEARCHES.map(term => (
                    <button key={term} className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl text-left text-gray-300 group transition-colors">
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-gray-500 group-hover:text-[#6366F1]" />
                        <span className="group-hover:text-white">{term}</span>
                      </div>
                      <ChevronRight size={14} className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 px-2 tracking-wider">Trending Now</h4>
                <div className="flex flex-wrap gap-2 px-2">
                  {TRENDING_TAGS.map(tag => (
                    <button key={tag} className="flex items-center gap-2 bg-[#1e1e1e] border border-white/5 px-4 py-2 rounded-full text-sm text-gray-300 hover:border-[#6366F1] hover:text-white hover:bg-[#6366F1]/10 transition-all">
                      <Hash size={14} className="text-[#6366F1]" /> {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
                <Search size={48} className="mb-4 opacity-20" />
                <p>Searching for <span className="text-white font-bold">"{query}"</span>...</p>
                <p className="text-xs mt-2 opacity-50">Press Enter to view results</p>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-3 border-t border-white/5 bg-[#0a0a0a] text-xs text-gray-500 flex justify-between px-6">
            <span>Search <span className="text-[#6366F1]">#tags</span> or <span className="text-[#6366F1]">@users</span></span>
            <div className="flex gap-4">
                <span className="flex items-center gap-1"><Flame size={12} /> Popular</span>
                <span className="flex items-center gap-1"><Clock size={12} /> History</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;