import React, { useState } from 'react';
import { Settings, Edit, LogOut, Shield, Bell, HardDrive, HelpCircle } from 'lucide-react';
import { CURRENT_USER } from '../../data/mockData';
import BadgeModal from '../../components/modals/BadgeModal'; 
import { DataStorageView, PrivacyView, HelpView } from '../../components/layout/SettingsViews'; 

const Profile = ({ onLogout, onEditProfile }) => {
  const [view, setView] = useState('overview'); // overview, settings, data, privacy, help
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Helper to render the right content based on view state
  const renderSettingsContent = () => {
    switch(view) {
      case 'data': return <DataStorageView />;
      case 'privacy': return <PrivacyView />;
      case 'help': return <HelpView />;
      default: return (
        <div className="space-y-6 animate-in slide-in-from-right">
          <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
          <ToggleRow label="Push Notifications" desc="Receive notifications on this device" checked={true} />
          <ToggleRow label="New Chapter Releases" desc="Get notified when your favorite comics update" checked={true} />
          <ToggleRow label="Community Mentions" desc="When someone replies to your post" checked={false} />
          <ToggleRow label="Marketplace Updates" desc="Price drops and offers" checked={true} />
        </div>
      );
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-background p-8 relative">
      
      {/* Badge Detail Modal */}
      <BadgeModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />

      {/* Header Profile Card */}
      <div className="relative bg-surface rounded-3xl overflow-hidden mb-8 border border-white/5">
        <div className="h-40 bg-gradient-to-r from-primary to-purple-600 opacity-80" />
        <div className="px-8 pb-8 flex items-end -mt-12 gap-6 relative z-10">
          <img src={CURRENT_USER.avatar} className="w-32 h-32 rounded-full border-4 border-surface bg-surface" alt="Avatar"/>
          <div className="flex-1 mb-2">
            <h1 className="text-3xl font-bold text-white">{CURRENT_USER.name}</h1>
            <p className="text-primary font-mono text-sm">@{CURRENT_USER.handle}</p>
          </div>
          <div className="flex gap-3 mb-4">
            <button onClick={onEditProfile} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm font-bold flex items-center gap-2 transition-colors">
              <Edit size={16} /> Edit
            </button>
            <button 
                onClick={() => setView(view === 'overview' ? 'settings' : 'overview')}
                className={`px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2 transition-colors ${view !== 'overview' ? 'bg-primary' : 'bg-white/10 hover:bg-white/20'}`}
            >
              <Settings size={16} /> {view === 'overview' ? 'Settings' : 'Overview'}
            </button>
          </div>
        </div>
      </div>

      {view === 'overview' ? (
        // ... (Existing Overview UI) ...
        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="bg-surface p-6 rounded-2xl border border-white/5">
              <h3 className="text-white font-bold mb-4">Statistics</h3>
              <div className="space-y-4">{CURRENT_USER.stats.map(stat => (<div key={stat.label} className="flex justify-between items-center"><span className="text-textDim text-sm">{stat.label}</span><span className="text-white font-mono font-bold">{stat.value}</span></div>))}</div>
            </div>
            <div className="bg-surface p-6 rounded-2xl border border-white/5"><h3 className="text-white font-bold mb-2">Current Rank</h3><div className="text-center py-4"><div className="text-4xl mb-2">👑</div><div className="text-xl font-bold text-primary">{CURRENT_USER.rank.name}</div><div className="w-full bg-black h-2 rounded-full mt-4 overflow-hidden"><div className="bg-primary h-full w-[75%]" /></div><p className="text-xs text-textDim mt-2">12,309 / 15,000 XP</p></div></div>
          </div>
          <div className="col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Trophy Case</h3>
            <div className="grid grid-cols-3 gap-4">
              {CURRENT_USER.badges.map(badge => (
                <div key={badge.id} onClick={() => setSelectedBadge(badge)} className="bg-surface p-4 rounded-xl border border-white/5 flex flex-col items-center text-center gap-2 hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 group-hover:scale-110 transition-transform ${badge.rarity === 'Primeval' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-gray-700/50 text-gray-400'}`}>
                    <div className="font-bold text-lg">{badge.name[0]}</div>
                  </div>
                  <div><div className="text-sm font-bold text-white">{badge.name}</div><div className="text-[10px] uppercase tracking-wider text-textDim">{badge.rarity}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* --- SETTINGS LAYOUT --- */
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1 bg-surface rounded-2xl p-4 h-fit">
            <h3 className="text-textDim font-bold text-xs uppercase mb-4 px-2">Account</h3>
            
            {/* Dynamic Settings Navigation */}
            <SettingsLink Icon={Bell} label="Notifications" active={view === 'settings'} onClick={() => setView('settings')} />
            <SettingsLink Icon={Shield} label="Privacy & Safety" active={view === 'privacy'} onClick={() => setView('privacy')} />
            <SettingsLink Icon={HardDrive} label="Data & Storage" active={view === 'data'} onClick={() => setView('data')} />
            
            <div className="h-px bg-white/10 my-4" />
            <SettingsLink Icon={HelpCircle} label="Help & Support" active={view === 'help'} onClick={() => setView('help')} />
            
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-danger hover:bg-danger/10 transition-colors">
              <LogOut size={18} /> Log Out
            </button>
          </div>
          
          <div className="col-span-3 bg-surface rounded-2xl p-8">
            {renderSettingsContent()}
          </div>
        </div>
      )}
    </div>
  );
};

const SettingsLink = ({ Icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium mb-1 transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-textDim hover:text-white hover:bg-white/5'}`}>
    <Icon size={18} /> {label}
  </button>
);

const ToggleRow = ({ label, desc, checked }) => (
  <div className="flex justify-between items-center">
    <div><div className="text-white font-bold">{label}</div><div className="text-textDim text-sm">{desc}</div></div>
    <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-primary' : 'bg-gray-700'}`}><div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} /></div>
  </div>
);

export default Profile;