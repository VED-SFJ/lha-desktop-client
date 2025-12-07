import React, { useState } from 'react';
import { UserPlus, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

const Register = ({ onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Mock API call
      onRegister(formData);
    }, 1500);
  };

  return (
    <div className="h-screen w-full bg-background flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>

      <div className="w-96 bg-surface border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10 backdrop-blur-xl animate-fade-in">
        <button onClick={onBackToLogin} className="absolute top-4 left-4 text-textDim hover:text-white"><ArrowLeft size={20}/></button>
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center border border-secondary/50 shadow-[0_0_15px_#2ecc71]">
            <UserPlus size={32} className="text-secondary" />
          </div>
        </div>

        <h2 className="text-2xl font-mono text-center text-white mb-2 tracking-wider">NEW AGENT</h2>
        <p className="text-center text-textDim text-xs font-mono mb-8">{'>'} INITIALIZE REGISTRATION SEQUENCE</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <UserPlus size={16} className="absolute left-4 top-4 text-textDim group-focus-within:text-secondary" />
            <input 
              type="text" 
              placeholder="Codename (Name)"
              className="w-full bg-background border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-secondary transition-colors font-mono"
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="relative group">
            <Mail size={16} className="absolute left-4 top-4 text-textDim group-focus-within:text-secondary" />
            <input 
              type="email" 
              placeholder="Comms Link (Email)"
              className="w-full bg-background border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-secondary transition-colors font-mono"
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="relative group">
            <Lock size={16} className="absolute left-4 top-4 text-textDim group-focus-within:text-secondary" />
            <input 
              type="password" 
              placeholder="Passphrase"
              className="w-full bg-background border border-white/10 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-secondary transition-colors font-mono"
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-all flex items-center justify-center gap-2 mt-6"
          >
            {loading ? 'CREATING IDENTITY...' : 'REGISTER'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;