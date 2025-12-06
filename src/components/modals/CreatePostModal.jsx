import React, { useState } from 'react';
import { X, Image as ImageIcon, Link, Smile, Send } from 'lucide-react';

const CreatePostModal = ({ onClose, onPost }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onPost({ text, image: null });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        <div className="p-4 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-bold text-white">Start a Discussion</h3>
          <button onClick={onClose}><X size={20} className="text-textDim hover:text-white" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">A</div>
            <textarea 
              className="flex-1 bg-transparent text-white outline-none resize-none h-32 placeholder:text-textDim"
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
            <div className="flex gap-2 text-primary">
              <button type="button" className="p-2 hover:bg-white/5 rounded-full"><ImageIcon size={20} /></button>
              <button type="button" className="p-2 hover:bg-white/5 rounded-full"><Link size={20} /></button>
              <button type="button" className="p-2 hover:bg-white/5 rounded-full"><Smile size={20} /></button>
            </div>
            <button 
              type="submit" 
              disabled={!text.trim()}
              className="bg-primary text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;