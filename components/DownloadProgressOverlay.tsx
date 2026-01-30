
import React from 'react';
import { ActiveDownload } from '../types';

interface Props {
  activeDownload: ActiveDownload | null;
}

const DownloadProgressOverlay: React.FC<Props> = ({ activeDownload }) => {
  if (!activeDownload) return null;

  return (
    <div className="fixed bottom-10 right-10 z-[200] animate-in slide-in-from-right-10 fade-in duration-500">
      <div className="glass-panel p-6 rounded-[2rem] w-80 shadow-2xl border-2 border-cyan-500/30 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-slate-900">
          <div 
            className="h-full bg-cyan-400 transition-all duration-300"
            style={{ width: `${activeDownload.progress}%` }}
          ></div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center border border-white/5 relative">
            {activeDownload.type === 'video' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
              </svg>
            )}
            {activeDownload.progress === 100 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-grow">
            <h5 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-1">
              {activeDownload.progress === 100 ? 'Selesai' : 'Sedang Mengunduh'}
            </h5>
            <p className="text-white text-xs font-bold truncate leading-none">
              {activeDownload.name}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Progress</span>
            <span className="text-2xl font-black text-white leading-none tracking-tighter">
              {activeDownload.progress}<span className="text-cyan-400">%</span>
            </span>
          </div>
          {activeDownload.progress < 100 && (
            <div className="flex gap-1 items-end">
              <div className="w-1 h-3 bg-cyan-500/30 rounded-full"></div>
              <div className="w-1 h-5 bg-cyan-500/50 rounded-full"></div>
              <div className="w-1 h-4 bg-cyan-500/70 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadProgressOverlay;
