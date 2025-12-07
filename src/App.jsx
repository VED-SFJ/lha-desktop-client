import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';

// Layout & Overlays
import Sidebar from './components/layout/Sidebar';
import NotificationsPanel from './components/overlays/NotificationsPanel';
import SearchOverlay from './components/overlays/SearchOverlay';
import DetailsModal from './components/modals/DetailsModal';
import EditProfileModal from './components/modals/EditProfileModal';

// Pages - Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Pages - Main
import Dashboard from './pages/main/Dashboard';
import Reader from './pages/main/Reader';
import Hub from './pages/main/Hub';
import Library from './pages/main/Library';
import Theater from './pages/main/Theater';
import Profile from './pages/main/Profile';

// Data
import { CURRENT_USER } from './data/mockData';

function App() {
  const [authMode, setAuthMode] = useState('login'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [readerComic, setReaderComic] = useState(null);
  const [user, setUser] = useState(CURRENT_USER);

  const [modalData, setModalData] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleLogin = () => setAuthMode('app');
  
  const handleRegister = (data) => {
    console.log("Registered:", data);
    setAuthMode('app');
  };

  const openModal = (type, item) => setModalData({ type, item });
  const closeModal = () => setModalData(null);

  const handleModalAction = (action, item) => {
    if (action === 'read') {
      closeModal();
      setReaderComic(item);
      setActiveTab('reader');
    }
    if (action === 'view_profile') {
      openModal('user', item);
    }
  };

  const handleLogout = () => {
    setAuthMode('login');
    setActiveTab('dashboard');
  };

  const handleSaveProfile = (newData) => {
    setUser({ ...user, ...newData });
  };

  if (authMode === 'login') return <Login onLogin={handleLogin} onGoRegister={() => setAuthMode('register')} />;
  if (authMode === 'register') return <Register onRegister={handleRegister} onBackToLogin={() => setAuthMode('login')} />;

  return (
    <div className="flex h-screen bg-background text-white overflow-hidden font-sans">
      
      {activeTab !== 'reader' && (
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
      )}

      <div className="flex-1 flex flex-col h-full relative">
        <div className="titlebar h-8 bg-background flex justify-between items-center px-4 select-none border-b border-white/5 z-50">
          <span className="text-[10px] font-mono text-textDim uppercase tracking-widest">
            LHA_MAINFRAME_V2.0 // STATUS: ONLINE
          </span>
          <div className="no-drag flex items-center gap-4 mr-4">
             <button onClick={() => setShowSearch(true)} className="hover:text-white text-textDim transition-colors">
                <Search size={14} />
             </button>
             <button onClick={() => setShowNotifications(!showNotifications)} className={`hover:text-white transition-colors relative ${showNotifications ? 'text-white' : 'text-textDim'}`}>
                <Bell size={14} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full" />
             </button>
          </div>
          <div className="flex gap-2 no-drag">
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 hover:bg-yellow-500 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 hover:bg-green-500 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-red-500/20 hover:bg-red-500 cursor-pointer" onClick={() => window.close()} />
          </div>
        </div>

        {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
        {showEditProfile && <EditProfileModal user={user} onClose={() => setShowEditProfile(false)} onSave={handleSaveProfile} />}
        {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} onSearch={(q) => console.log('Searching', q)} />}
        
        {modalData && (
          <DetailsModal item={modalData.item} type={modalData.type} onClose={closeModal} onAction={handleModalAction} />
        )}

        <div className="flex-1 overflow-hidden relative bg-background">
          {activeTab === 'dashboard' && <Dashboard onNavigate={(type, item) => { if (type === 'reader') { setReaderComic(item); setActiveTab('reader'); } else { openModal(type, item); } }} />}
          {activeTab === 'library' && <Library onNavigate={(type, item) => openModal('comic', item)} />}
          {activeTab === 'community' && <Hub onOpenDetail={(type, item) => openModal(type, item)} />}
          {activeTab === 'theater' && <Theater />}
          {activeTab === 'profile' && <Profile onLogout={handleLogout} onEditProfile={() => setShowEditProfile(true)} />}
          {activeTab === 'reader' && readerComic && <Reader comic={readerComic} onBack={() => setActiveTab('dashboard')} />}
        </div>
      </div>
    </div>
  );
}

export default App;