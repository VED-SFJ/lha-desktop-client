import React from 'react';
import { HardDrive, Trash2, Shield, Lock, Eye, HelpCircle, Mail, ExternalLink } from 'lucide-react';

export const DataStorageView = () => (
  <div className="space-y-6 animate-in slide-in-from-right">
    <div className="bg-surfaceHighlight/30 p-6 rounded-2xl border border-white/5">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2"><HardDrive size={20} className="text-secondary"/> Storage Usage</h3>
      <div className="flex h-4 rounded-full overflow-hidden bg-black mb-4">
        <div className="w-[40%] bg-secondary h-full" />
        <div className="w-[15%] bg-primary h-full" />
        <div className="w-[5%] bg-gray-500 h-full" />
      </div>
      <div className="flex justify-between text-xs text-textDim">
        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-secondary"/> Downloads (450 MB)</span>
        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary"/> App Data (120 MB)</span>
        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-500"/> Cache (56 MB)</span>
      </div>
    </div>

    <div className="space-y-2">
      <button className="w-full flex items-center justify-between p-4 bg-surfaceHighlight/30 rounded-xl hover:bg-white/5 transition-colors group">
        <span className="text-white font-medium">Manage Downloads</span>
        <span className="text-textDim text-sm group-hover:text-white">View</span>
      </button>
      <button className="w-full flex items-center justify-between p-4 bg-surfaceHighlight/30 rounded-xl hover:bg-red-500/10 transition-colors group border border-transparent hover:border-red-500/50">
        <span className="text-white font-medium group-hover:text-red-500">Clear Cache</span>
        <Trash2 size={18} className="text-textDim group-hover:text-red-500" />
      </button>
    </div>
  </div>
);

export const PrivacyView = () => (
  <div className="space-y-6 animate-in slide-in-from-right">
    <div className="bg-surfaceHighlight/30 p-6 rounded-2xl border border-white/5 text-center">
      <Shield size={48} className="text-primary mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">Secure Account</h3>
      <p className="text-textDim text-sm">Two-Factor Authentication is currently <span className="text-red-400 font-bold">DISABLED</span>.</p>
      <button className="mt-4 bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-500">Enable 2FA</button>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-surfaceHighlight/30 rounded-xl">
        <div className="flex items-center gap-3">
          <Lock size={20} className="text-textDim" />
          <div className="text-white">Change Password</div>
        </div>
        <button className="text-primary text-sm font-bold hover:underline">Update</button>
      </div>
      <div className="flex items-center justify-between p-4 bg-surfaceHighlight/30 rounded-xl">
        <div className="flex items-center gap-3">
          <Eye size={20} className="text-textDim" />
          <div className="text-white">Blocked Users</div>
        </div>
        <span className="text-textDim text-sm">0 Users</span>
      </div>
    </div>
  </div>
);

export const HelpView = () => (
  <div className="space-y-4 animate-in slide-in-from-right">
    {['How to reset password?', 'Can I read offline?', 'Ranking System Guide'].map((q, i) => (
      <div key={i} className="p-4 bg-surfaceHighlight/30 rounded-xl border border-white/5 hover:border-white/20 cursor-pointer transition-colors">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-bold">{q}</span>
          <HelpCircle size={16} className="text-textDim" />
        </div>
        <p className="text-textDim text-sm line-clamp-1">Click to view the detailed answer in our knowledge base.</p>
      </div>
    ))}
    
    <div className="grid grid-cols-2 gap-4 mt-6">
      <button className="p-4 bg-surfaceHighlight/30 rounded-xl flex flex-col items-center gap-2 hover:bg-white/5 transition-colors">
        <Mail size={24} className="text-secondary" />
        <span className="text-white font-bold text-sm">Contact Support</span>
      </button>
      <button className="p-4 bg-surfaceHighlight/30 rounded-xl flex flex-col items-center gap-2 hover:bg-white/5 transition-colors">
        <ExternalLink size={24} className="text-primary" />
        <span className="text-white font-bold text-sm">Join Discord</span>
      </button>
    </div>
  </div>
);