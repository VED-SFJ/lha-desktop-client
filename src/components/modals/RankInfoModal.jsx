import React from 'react';
import { X, Shield } from 'lucide-react';

const RANKS = [
  { name: 'Mortal', minXp: 0, color: 'text-gray-400' },
  { name: 'Spirit Apprentice', minXp: 250, color: 'text-amber-700' },
  { name: 'Soul Forger', minXp: 500, color: 'text-orange-500' },
  { name: 'Divine Monarch', minXp: 20000, color: 'text-cyan-400', current: true },
  { name: 'World Creator', minXp: 1000000, color: 'text-green-400' },
];

const RankInfoModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in zoom-in duration-200" onClick={onClose}>
      <div className="bg-surface w-96 rounded-3xl border border-white/10 p-6 shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-textDim hover:text-white"><X size={20}/></button>
        
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-surfaceHighlight rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            <Shield size={40} className="text-cyan-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Rank Progression</h2>
          <p className="text-textDim text-xs">Earn XP to ascend the realms.</p>
        </div>

        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {RANKS.map((rank, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${rank.current ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-surfaceHighlight/30 border-transparent opacity-60'}`}>
              <div className="flex items-center gap-3">
                <span className={`font-bold text-sm ${rank.color}`}>{rank.name}</span>
              </div>
              <span className="text-xs font-mono text-textDim">{rank.minXp.toLocaleString()} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankInfoModal;