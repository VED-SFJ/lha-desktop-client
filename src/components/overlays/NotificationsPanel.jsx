import React from 'react';
import { Bell, ShoppingBag, Users, Info, X } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'guild', title: 'Guild Invitation', msg: 'Dragon Slayers invited you to join.', time: '2m ago', unread: true },
  { id: 2, type: 'market', title: 'Offer Received', msg: 'Someone offered 1200g for your Sword.', time: '1h ago', unread: true },
  { id: 3, type: 'system', title: 'System Update', msg: 'Maintenance at 00:00 UTC.', time: '5h ago', unread: false },
];

const NotificationsPanel = ({ onClose }) => {
  return (
    <div className="absolute top-14 right-4 w-96 bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top-2">
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-surfaceHighlight/50">
        <h3 className="font-bold text-white">Notifications</h3>
        <div className="flex gap-3 text-xs">
          <button className="text-primary hover:underline">Mark all read</button>
          <button onClick={onClose}><X size={16} className="text-textDim hover:text-white"/></button>
        </div>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        {MOCK_NOTIFICATIONS.length > 0 ? (
          MOCK_NOTIFICATIONS.map(notif => (
            <div key={notif.id} className={`p-4 border-b border-white/5 flex gap-4 hover:bg-white/5 transition-colors ${notif.unread ? 'bg-primary/5' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                notif.type === 'guild' ? 'bg-primary/20 text-primary' :
                notif.type === 'market' ? 'bg-green-500/20 text-green-500' :
                'bg-gray-700/50 text-gray-400'
              }`}>
                {notif.type === 'guild' && <Users size={18} />}
                {notif.type === 'market' && <ShoppingBag size={18} />}
                {notif.type === 'system' && <Info size={18} />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className={`text-sm font-bold ${notif.unread ? 'text-white' : 'text-gray-400'}`}>{notif.title}</span>
                  <span className="text-[10px] text-textDim">{notif.time}</span>
                </div>
                <p className="text-xs text-textDim leading-relaxed">{notif.msg}</p>
              </div>
              {notif.unread && <div className="w-2 h-2 rounded-full bg-secondary mt-2" />}
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-textDim">
            <Bell size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;