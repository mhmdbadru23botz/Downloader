
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-[100] glass-panel border-b border-white/5 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:rotate-6 transition-all duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
             </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none">
              AIVISUALS<span className="text-cyan-400">.</span>
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Generator</span>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-10 text-[13px] font-bold uppercase tracking-wider text-slate-400">
          <a href="#" className="hover:text-cyan-400 transition-colors">Beranda</a>
          <a href="#platform" className="hover:text-cyan-400 transition-colors">Platform</a>
          <a href="#faq" className="hover:text-cyan-400 transition-colors">Bantuan</a>
          <a href="mailto:muhamadbadruwasih8@gmail.com" className="hover:text-cyan-400 transition-colors">Kontak</a>
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-900/40 rounded-full border border-white/5">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[11px] text-slate-300 font-mono tracking-tighter">System Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
