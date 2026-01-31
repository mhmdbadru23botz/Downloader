
import React, { useState } from 'react';
import { DownloadResult, ActiveDownload } from '../types';

interface Props {
  data: DownloadResult;
  onRetry?: () => void;
  isAiProcessing?: boolean;
  onDownload?: (url: string, title: string, type: 'video' | 'audio') => void;
  activeDownload?: ActiveDownload | null;
}

const ResultCard: React.FC<Props> = ({ data, onRetry, isAiProcessing, onDownload, activeDownload }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (url: string, type: string) => {
    navigator.clipboard.writeText(url);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleAction = (url: string, type: 'video' | 'audio') => {
    if (onDownload) {
      onDownload(url, data.title || 'media', type);
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!data.status) {
    return (
      <div className="glass-panel border-red-500/20 rounded-[2.5rem] p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
           <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping opacity-25"></div>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
           </svg>
        </div>
        <h3 className="text-3xl font-black mb-4 text-white">Ekstraksi Gagal</h3>
        <p className="text-slate-400 mb-10 max-w-md mx-auto leading-relaxed font-medium">
          {data.error || "Tautan yang Anda masukkan tidak dapat diproses oleh sistem saat ini. Silakan periksa kembali tautan Anda."}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 text-white font-black py-5 px-14 rounded-2xl transition-all active:scale-95 shadow-xl shadow-red-500/20 border border-white/10 flex items-center justify-center gap-3 uppercase tracking-widest text-sm mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retry Download
          </button>
        )}
      </div>
    );
  }

  // Check if current active download matches this result (based on title extension)
  const isCurrentlyDownloading = activeDownload?.isActive && activeDownload.name.includes(data.title?.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 10) || "");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="glass-panel rounded-[2.5rem] overflow-hidden border border-white/10 group/card shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]">
        <div className="flex flex-col lg:flex-row">
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

          <div className="flex-grow p-8 lg:p-12 flex flex-col justify-between bg-gradient-to-br from-slate-900/50 to-transparent">
            <div>
              <div className="flex items-center gap-3 mb-6">
                 <div className={`w-3 h-3 rounded-full ${isCurrentlyDownloading ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]'} animate-pulse`}></div>
                 <span className="text-slate-500 text-xs font-black tracking-[0.3em] uppercase">
                   {isCurrentlyDownloading ? 'Status: Mengunduh File...' : 'Status: Siap Diunduh'}
                 </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-black mb-4 line-clamp-3 leading-tight text-white">
                {data.title}
              </h3>
              <p className="text-slate-400 text-sm font-medium mb-8 flex items-center gap-2">
                 Oleh <span className="text-indigo-400 font-black">{data.author || 'Penyaji Konten'}</span>
              </p>
            </div>

            <div className="space-y-8">
              {isCurrentlyDownloading ? (
                <div className="bg-slate-950/40 p-6 rounded-2xl border border-white/5 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-end mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">Penyimpanan Perangkat</span>
                      <span className="text-white font-black text-xl tracking-tight">Menyimpan {activeDownload.type}...</span>
                    </div>
                    <span className="text-cyan-400 font-mono text-2xl font-black">{activeDownload.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-indigo-600 transition-all duration-300"
                      style={{ width: `${activeDownload.progress}%` }}
                    >
                      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:15px_15px] animate-[progress-bar-stripes_1s_linear_infinite]"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {data.videoUrl && (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handleAction(data.videoUrl!, 'video')}
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
                        onClick={() => handleAction(data.audioUrl!, 'audio')}
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
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`glass-panel rounded-[2rem] p-8 border-2 ${isAiProcessing ? 'ai-pulse' : 'border-white/5'} transition-all duration-500 overflow-hidden relative`}>
        {isAiProcessing ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mb-4"></div>
            <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.3em] animate-pulse">Menjalankan Analisis AI Gemini...</p>
          </div>
        ) : data.aiAnalysis ? (
          <div className="animate-in fade-in duration-700">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-black text-white leading-none">Insight Media AI</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Dianalisis oleh Gemini Pro</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Sentimen: {data.aiAnalysis.sentiment}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-slate-200 text-sm leading-relaxed font-medium">
                  {data.aiAnalysis.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.aiAnalysis.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-bold text-cyan-400 bg-cyan-500/5 px-3 py-1 rounded-full border border-cyan-500/10">
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950/50 rounded-2xl p-6 border border-white/5 group/caption relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50"></div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-3">Smart Caption</p>
                <p className="text-slate-300 text-sm italic leading-relaxed">
                  "{data.aiAnalysis.smartCaption}"
                </p>
                <button 
                  onClick={() => handleCopy(data.aiAnalysis!.smartCaption, 'caption')}
                  className="mt-4 text-[10px] font-black text-cyan-500 uppercase tracking-widest hover:text-cyan-400 transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-7 8h3m-3 4h2" />
                  </svg>
                  {copied === 'caption' ? 'TERSALIN' : 'SALIN CAPTION'}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ResultCard;
