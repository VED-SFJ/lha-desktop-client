import React, { useState, useEffect, useRef } from 'react';
import { Search, Clock, Flame, Hash } from 'lucide-react';

const TRENDING_TAGS = ['Solo Leveling', 'Cyberpunk', 'Fantasy', 'Isekai', 'Action'];
const RECENT_SEARCHES = ['The Beginning After The End', 'Omniscient Reader'];

const SearchOverlay = ({ onClose, onSearch }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
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
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-start justify-center pt-[15vh] animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <div className="w-full max-w-2xl bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in slide-in-from-top-4">
        {/* Input Header */}
        <div className="flex items-center gap-4 p-4 border-b border-white/5">
          <Search size={24} className="text-textDim" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search commands, comics, users..." 
            className="flex-1 bg-transparent text-xl text-white outline-none placeholder:text-white/20"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={onClose} className="p-1 bg-white/10 rounded hover:bg-white/20 text-white text-xs px-2">ESC</button>
        </div>

        {/* Content Body */}
        <div className="p-4 bg-surfaceHighlight/30 min-h-[300px]">
          
          {!query && (
            <>
              {/* Recent */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-textDim uppercase mb-2 px-2">Recent</h4>
                {RECENT_SEARCHES.map(term => (
                  <button key={term} className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg text-left text-gray-300 group">
                    <Clock size={16} className="text-textDim group-hover:text-primary" />
                    {term}
                  </button>
                ))}
              </div>

              {/* Trending */}
              <div>
                <h4 className="text-xs font-bold text-textDim uppercase mb-2 px-2">Trending Now</h4>
                <div className="flex flex-wrap gap-2 px-2">
                  {TRENDING_TAGS.map(tag => (
                    <button key={tag} className="flex items-center gap-2 bg-surface border border-white/5 px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:border-primary/50 hover:text-white transition-colors">
                      <Hash size={14} className="text-primary" /> {tag}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {query && (
            <div className="text-center py-10 text-textDim">
                <p>Searching for <span className="text-white">"{query}"</span>...</p>
                <p className="text-xs mt-2">Press Enter to view results</p>
            </div>
          )}

        </div>
        
        {/* Footer */}
        <div className="p-3 border-t border-white/5 bg-surface text-xs text-textDim flex justify-between">
            <span>Protip: Search <span className="text-primary">#tags</span> or <span className="text-primary">@users</span></span>
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