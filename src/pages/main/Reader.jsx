import React, { useMemo, useState } from 'react';
import { 
  ArrowLeft, MessageSquare, Settings, ChevronRight, Share2, X, 
  Sun, Moon, Monitor, Smartphone, Type, Send, ThumbsUp 
} from 'lucide-react';

const MOCK_COMMENTS = [
  { id: 1, user: 'Kirito', color: 'bg-blue-600', text: 'This chapter was insane! The art style changed slightly?', time: '2m ago', likes: 24 },
  { id: 2, user: 'Asuna', color: 'bg-pink-500', text: 'Finally some progress on the main plot. I was waiting for this.', time: '5m ago', likes: 12 },
  { id: 3, user: 'Klein', color: 'bg-red-500', text: 'Lol that face he made on page 4 😂', time: '12m ago', likes: 45 },
  { id: 4, user: 'Agil', color: 'bg-yellow-600', text: 'Can we talk about the cliffhanger??', time: '1h ago', likes: 8 },
];

const Reader = ({ comic, onBack }) => {
  const [showComments, setShowComments] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [readingMode, setReadingMode] = useState('webtoon'); // webtoon, page

  // Memoize pages to prevent re-renders
  const pages = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => 
      `https://via.placeholder.com/800x1200.png?text=${encodeURIComponent(comic.title)}+Page+${i + 1}`
    );
  }, [comic]);

  return (
    <div className="flex h-full bg-black relative overflow-hidden">
      
      {/* --- TOP BAR --- */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/90 to-transparent flex items-center justify-between px-6 z-50 transition-opacity duration-300">
        
        {/* Back & Title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-black transition-colors backdrop-blur-md text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white shadow-lg">{comic.title}</span>
            <span className="text-xs text-gray-400 font-mono">Chapter {comic.lastChapter || 1}</span>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex gap-3">
          <button className="p-2 bg-white/10 rounded-full text-white hover:bg-white hover:text-black transition-colors backdrop-blur-md">
            <Share2 size={18} />
          </button>
          
          <button 
            onClick={() => { setShowComments(!showComments); setShowSettings(false); }}
            className={`p-2 rounded-full transition-colors backdrop-blur-md ${showComments ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <MessageSquare size={18} />
          </button>
          
          <button 
            onClick={() => { setShowSettings(!showSettings); setShowComments(false); }}
            className={`p-2 rounded-full transition-colors backdrop-blur-md ${showSettings ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* --- READER SETTINGS PANEL --- */}
      {showSettings && (
        <div className="absolute top-20 right-6 w-72 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl z-40 p-4 animate-in fade-in slide-in-from-top-2">
          <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider text-gray-500">Display Settings</h3>
          
          {/* Reading Mode */}
          <div className="mb-6">
            <label className="text-xs text-gray-400 mb-2 block">Reading Mode</label>
            <div className="flex bg-black/50 p-1 rounded-lg">
              <button 
                onClick={() => setReadingMode('webtoon')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-colors ${readingMode === 'webtoon' ? 'bg-[#6366F1] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Smartphone size={14} /> Webtoon
              </button>
              <button 
                onClick={() => setReadingMode('page')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-colors ${readingMode === 'page' ? 'bg-[#6366F1] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                <Monitor size={14} /> Page by Page
              </button>
            </div>
          </div>

          {/* Brightness */}
          <div className="mb-6">
            <label className="text-xs text-gray-400 mb-2 block">Brightness</label>
            <div className="flex items-center gap-3">
              <Moon size={16} className="text-gray-500" />
              <input type="range" className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#6366F1]" />
              <Sun size={16} className="text-white" />
            </div>
          </div>

          {/* Page Width */}
          <div>
            <label className="text-xs text-gray-400 mb-2 block">Page Width</label>
            <div className="flex gap-2">
              <button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-white text-xs">Fit Width</button>
              <button className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded text-white text-xs">Original</button>
            </div>
          </div>
        </div>
      )}

      {/* --- COMMENTS SIDEBAR --- */}
      <div 
        className={`absolute top-0 right-0 h-full w-96 bg-[#121212] border-l border-white/10 z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${showComments ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          <h3 className="font-bold text-white">Discussion <span className="text-gray-500 text-xs ml-2">(45 Comments)</span></h3>
          <button onClick={() => setShowComments(false)} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {MOCK_COMMENTS.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${comment.color}`}>
                {comment.user[0]}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm font-bold text-gray-200">{comment.user}</span>
                  <span className="text-[10px] text-gray-500">{comment.time}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mb-2">{comment.text}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-[#6366F1] transition-colors">
                    <ThumbsUp size={12} /> {comment.likes}
                  </button>
                  <button className="text-[10px] text-gray-500 hover:text-white transition-colors">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-white/5 bg-[#1a1a1a]">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Join the discussion..." 
              className="w-full bg-black border border-white/10 rounded-xl py-3 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-[#6366F1] transition-colors"
            />
            <button className="absolute right-3 top-3 text-gray-400 hover:text-[#6366F1]">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* --- READER CONTENT --- */}
      <div 
        className="flex-1 overflow-y-auto scrollbar-hide flex flex-col items-center py-20"
        onClick={() => { setShowComments(false); setShowSettings(false); }} // Click outside closes panels
      >
        {pages.map((src, index) => (
          <img 
            key={index} 
            src={src} 
            alt={`Page ${index}`} 
            className="w-full max-w-3xl shadow-2xl mb-2 transition-all duration-300" 
            style={{ 
              maxWidth: readingMode === 'webtoon' ? '48rem' : '100%', 
              height: readingMode === 'page' ? '90vh' : 'auto',
              objectFit: readingMode === 'page' ? 'contain' : 'cover'
            }}
          />
        ))}
        
        {/* Next Chapter Button */}
        <div className="w-full max-w-3xl py-10 flex justify-center">
          <button className="bg-[#6366F1] hover:bg-indigo-500 text-white font-bold py-4 px-12 rounded-xl flex items-center gap-2 transition-transform hover:scale-105">
            Next Chapter <ChevronRight />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Reader;