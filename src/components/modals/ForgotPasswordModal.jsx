import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle, X } from 'lucide-react';

const ForgotPasswordModal = ({ onClose }) => {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-surface w-full max-w-sm p-8 rounded-3xl border border-white/10 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-textDim hover:text-white"><X size={20}/></button>

        {!sent ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
            <p className="text-textDim text-sm mb-6">Enter your agent email to receive a recovery link.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="relative group mb-6">
                <Mail size={18} className="absolute left-4 top-3.5 text-textDim group-focus-within:text-primary" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-background border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                Send Link <ArrowRight size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Check your inbox</h3>
            <p className="text-textDim text-sm mb-6">We sent a recovery link to <span className="text-white">{email}</span></p>
            <button onClick={onClose} className="text-primary font-bold hover:underline">Back to Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;