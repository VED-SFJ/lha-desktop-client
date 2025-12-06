import React, { useState } from 'react';
import { Fingerprint, Lock, ChevronRight, AlertCircle } from 'lucide-react';
import ForgotPasswordModal from './modals/ForgotPasswordModal'; // Import

const Login = ({ onLogin, onGoRegister }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('loli.hunter@example.com');
  const [password, setPassword] = useState('password123');
  const [showForgot, setShowForgot] = useState(false); // State

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    setTimeout(() => {
      if (email && password) {
        onLogin();
      } else {
        setError('Invalid credentials.');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>

      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}

      <div className="w-96 bg-[#121212] border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10 backdrop-blur-xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/50 shadow-[0_0_15px_#6366F1]">
            <Fingerprint size={32} className="text-primary" />
          </div>
        </div>

        <h2 className="text-2xl font-mono text-center text-white mb-1 tracking-wider">IDENTITY VERIFY</h2>
        <p className="text-center text-gray-500 text-xs font-mono mb-8">{'>'} SECURE CONNECTION REQUIRED</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 font-mono ml-1">AGENT ID (EMAIL)</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors font-mono mt-1"
            />
          </div>
          
          <div>
            <div className="flex justify-between">
                <label className="text-xs text-gray-500 font-mono ml-1">PASSPHRASE</label>
                <button type="button" onClick={() => setShowForgot(true)} className="text-xs text-primary hover:underline">Forgot?</button>
            </div>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors font-mono mt-1"
              />
              <Lock size={14} className="absolute right-4 top-5 text-gray-600" />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-xs bg-red-500/10 p-2 rounded">
              <AlertCircle size={12} /> {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 mt-6 group disabled:opacity-50"
          >
            {loading ? 'ESTABLISHING HANDSHAKE...' : 'CONNECT TO MAINFRAME'}
            {!loading && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="text-center text-xs text-textDim mt-6">
          NEW AGENT? <button onClick={onGoRegister} className="text-primary hover:underline font-bold ml-1 tracking-wide">INITIALIZE IDENTITY</button>
        </p>
      </div>
    </div>
  );
};

export default Login;