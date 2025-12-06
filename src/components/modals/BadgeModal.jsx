import React from 'react';
import { X, Trophy, Calendar } from 'lucide-react';

const BadgeModal = ({ badge, onClose }) => {
  if (!badge) return null;

  // Rarity Colors logic
  const getRarityColor = (r) => {
    if (r === 'Primeval') return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
    if (r === 'Rare') return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
    return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in zoom-in duration-200" onClick={onClose}>
      <div className="bg-surface w-80 rounded-3xl border border-white/10 p-6 flex flex-col items-center text-center relative shadow-2xl" onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} className="absolute top-4 right-4 text-textDim hover:text-white"><X size={20}/></button>

        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 border-2 ${badge.rarity === 'Primeval' ? 'border-purple-500 text-purple-500 bg-purple-500/10' : 'border-gray-600 text-gray-400 bg-gray-800'}`}>
           {/* Placeholder for icon rendering logic */}
           <Trophy size={40} />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">{badge.name}</h2>
        
        <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase border mb-4 ${getRarityColor(badge.rarity)}`}>
          {badge.rarity}
        </div>

        <p className="text-textDim text-sm mb-6 leading-relaxed">
          Awarded for completing specific milestones in the system. Keep reading to unlock more!
        </p>

        <div className="flex items-center gap-2 text-xs text-textDim bg-white/5 px-4 py-2 rounded-lg">
          <Calendar size={14} /> Unlocked: Jan 21, 2024
        </div>

      </div>
    </div>
  );
};

export default BadgeModal;