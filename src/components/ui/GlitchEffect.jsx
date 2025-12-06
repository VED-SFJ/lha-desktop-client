import React, { useEffect, useState } from 'react';

const GlitchEffect = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      // Random glitch movement every 200ms
      setOffset({
        x: Math.random() * 4 - 2,
        y: Math.random() * 4 - 2,
      });
      // Reset quickly
      setTimeout(() => setOffset({ x: 0, y: 0 }), 50);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 mix-blend-overlay"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20 animate-scanline" />
    </div>
  );
};

export default GlitchEffect;