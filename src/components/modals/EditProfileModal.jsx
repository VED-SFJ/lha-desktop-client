import React, { useState } from 'react';
import { X, Camera, Save, User, AtSign, AlignLeft } from 'lucide-react';

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    handle: user.handle,
    bio: user.bio || '',
    avatar: user.avatar
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-surfaceHighlight/30">
          <h3 className="font-bold text-white">Edit Profile</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors"><X size={20} className="text-textDim" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Avatar Edit */}
          <div className="flex justify-center">
            <div className="relative group cursor-pointer">
              <img src={formData.avatar} className="w-24 h-24 rounded-full border-4 border-surfaceHighlight object-cover" />
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div className="relative">
              <User size={16} className="absolute left-3 top-3.5 text-textDim" />
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-background border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-primary outline-none transition-colors"
                placeholder="Display Name"
              />
            </div>

            <div className="relative">
              <AtSign size={16} className="absolute left-3 top-3.5 text-textDim" />
              <input 
                type="text" 
                value={formData.handle}
                onChange={(e) => setFormData({...formData, handle: e.target.value})}
                className="w-full bg-background border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-primary outline-none transition-colors"
                placeholder="Username"
              />
            </div>

            <div className="relative">
              <AlignLeft size={16} className="absolute left-3 top-3.5 text-textDim" />
              <textarea 
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full bg-background border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-primary outline-none transition-colors h-24 resize-none"
                placeholder="Bio"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-textDim hover:bg-white/5 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2">
              <Save size={18} /> Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;