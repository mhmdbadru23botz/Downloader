
import React, { useState } from 'react';
import { DownloadResult } from '../types';

interface Props {
  data: DownloadResult;
  onRetry?: () => void;
}

const ResultCard: React.FC<Props> = ({ data, onRetry }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (url: string, type: string) => {
    navigator.clipboard.writeText(url);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const triggerDownload = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!data.status) {
    return (
      <div className="glass-panel border-red-500/20 rounded-[2.5rem] p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
           </svg>
        </div>
        <h3 className="text-3xl font-black mb-4">Akses Gagal</h3>
        <p className="text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
          {data.error || "Tautan yang Anda masukkan tidak dapat diproses oleh sistem. Pastikan tautan berasal dari akun publik."}
        </p>
        
        <button
          onClick={onRetry}
          className="bg-slate-800 hover:bg-slate-700 text-white font-black py-4 px-12 rounded-2xl transition-all active:scale-95 shadow-lg border border-white/5"
        >
          Coba Tautan Lain
        </button>
      </div>
    );
  }

  const safeTitle = data.title?.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'media';

  return (
    <div className="glass-panel rounded-[2.5rem] overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 border border-white/10 group/card shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col lg:flex-row">
        {/* Media Preview Section */}
        <div className="lg:w-[45%] relative overflow-hidden bg-black aspect-video lg:aspect-auto min-h-[300px]">
          <img
            src={data.thumbnail || "https://picsum.photos/seed/video/800/600"}
            alt={data.title}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-[2s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <span className="px-4 py-1.5 bg-cyan-500 text-slate-950 text-[11px] font-black uppercase rounded-full shadow-xl shadow-cyan-500/30 tracking-widest">
              {data.quality || 'HIGH QUALITY'}
            </span>
          </div>

          {data.duration && (
            <span className="absolute bottom-6 right-6 bg-slate-900/80 backdrop-blur-xl px-4 py-2 rounded-xl text-xs font-mono text-white tracking-widest border border-white/10 shadow-2xl">
              {data.duration}
            </span>
          )}
        </div>

        {/* Action & Info Section */}
        <div className="flex-grow p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-slate-900/50 to-transparent">
          <div>
            <div className="flex items-center gap-3 mb-6">
               <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
               <span className="text-slate-500 text-xs font-black tracking-[0.3em] uppercase">Status: Siap Diunduh</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-black mb-4 line-clamp-3 leading-tight text-white">
              {data.title || "Konten Media Terenkripsi"}
            </h3>
            <p className="text-slate-400 text-sm font-medium mb-8 flex items-center gap-2">
               Oleh <span className="text-indigo-400 font-black">{data.author || 'Penyaji Konten'}</span>
            </p>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.videoUrl && (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => triggerDownload(data.videoUrl!)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] text-white px-8 py-5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-3 group/btn active:scale-95 uppercase tracking-widest"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover/btn:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                    </svg>
                    SIMPAN VIDEO
                  </button>
                  <button 
                    onClick={() => handleCopy(data.videoUrl!, 'video')}
                    className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 hover:text-cyan-400 text-center py-2 transition-colors"
                  >
                    {copied === 'video' ? '✓ DISALIN' : 'SALIN URL VIDEO'}
                  </button>
                </div>
              )}
              
              {data.audioUrl && (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => triggerDownload(data.audioUrl!)}
                    className="w-full bg-slate-800 hover:bg-slate-750 text-white px-8 py-5 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-3 border border-white/5 shadow-xl group/btn active:scale-95 uppercase tracking-widest"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover/btn:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    SIMPAN AUDIO
                  </button>
                  <button 
                    onClick={() => handleCopy(data.audioUrl!, 'audio')}
                    className="text-[10px] uppercase tracking-[0.4em] font-black text-slate-500 hover:text-cyan-400 text-center py-2 transition-colors"
                  >
                    {copied === 'audio' ? '✓ DISALIN' : 'SALIN URL AUDIO'}
                  </button>
                </div>
              )}
            </div>

            {data.formats && data.formats.length > 0 && (
              <div className="pt-8 border-t border-white/5">
                <div className="flex items-center gap-4 mb-5">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.4em]">Multi-Kualitas</p>
                  <div className="h-px flex-grow bg-slate-800"></div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {data.formats.map((f, i) => (
                    <button
                      key={`${i}-${f.quality}`}
                      onClick={() => triggerDownload(f.url)}
                      className="px-5 py-3 bg-slate-950/80 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-xl text-[10px] font-black border border-white/5 transition-all active:scale-90 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      {f.quality} <span className="opacity-40">{f.type.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
