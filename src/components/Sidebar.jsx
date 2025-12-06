import React from 'react';
import { LayoutDashboard, BookOpen, Globe, MonitorPlay } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, user }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Mainframe' },
    { id: 'library', icon: BookOpen, label: 'Archives' },
    { id: 'community', icon: Globe, label: 'Hub' }, // Changed Icon to Globe for "Hub"
    { id: 'theater', icon: MonitorPlay, label: 'Theater' },
  ];

  return (
    <div className="w-20 bg-surface border-r border-white/5 flex flex-col items-center py-6 h-full select-none z-50">
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg mb-10 flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
        LH
      </div>

      <div className="flex-1 flex flex-col gap-6 w-full">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`relative group flex items-center justify-center w-full h-12 transition-all duration-300 ${activeTab === item.id ? 'text-primary' : 'text-textDim hover:text-white'}`}
          >
            {activeTab === item.id && (
              <div className="absolute left-0 h-8 w-1 bg-primary rounded-r-full shadow-[0_0_10px_#6366F1]" />
            )}
            <item.icon size={24} />
            {/* Tooltip */}
            <div className="absolute left-14 bg-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 pointer-events-none whitespace-nowrap z-50">
              {item.label}
            </div>
          </button>
        ))}
      </div>

      <button onClick={() => setActiveTab('profile')} className="mb-6 cursor-pointer relative group">
        <img src={user.avatar} className={`w-10 h-10 rounded-full border-2 transition-colors ${activeTab === 'profile' ? 'border-primary' : 'border-surfaceHighlight group-hover:border-white'}`} />
      </button>
    </div>
  );
};

export default Sidebar;