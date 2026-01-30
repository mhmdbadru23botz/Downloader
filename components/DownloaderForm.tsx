
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { platforms } from '../lib/platforms';
import { downloaderService } from '../services/downloaderService';
import { DownloadResult } from '../types';

export interface DownloaderFormHandle {
  retry: () => void;
}

interface Props {
  onResult: (res: DownloadResult, url: string, platform: string) => void;
  onStart: () => void;
  onEnd: () => void;
}

const statusMessages = [
  "Inisialisasi koneksi...",
  "Menganalisis tautan media...",
  "Mengambil metadata stream...",
  "Memproses kualitas HD...",
  "Menyiapkan jalur unduhan...",
  "Sinkronisasi data berhasil..."
];

const DownloaderForm = forwardRef<DownloaderFormHandle, Props>(({ onResult, onStart, onEnd }, ref) => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('tiktok');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [error, setError] = useState('');
  
  const progressIntervalRef = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    retry: () => {
      if (!loading && url) {
        handleDownload();
      }
    }
  }));

  useEffect(() => {
    if (loading) {
      setProgress(0);
      setStatusIdx(0);
      progressIntervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return prev;
          return prev + (Math.random() * 8);
        });
        setStatusIdx(prev => (prev + 1) % statusMessages.length);
      }, 700);
    } else {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    }
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [loading]);

  const handleDownload = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url || !url.includes('http')) {
      setError('Mohon masukkan URL yang valid (menggunakan http/https).');
      return;
    }

    setError('');
    setLoading(true);
    onStart();

    try {
      const result = await downloaderService.fetchMedia(platform, url);
      setProgress(100);
      setTimeout(() => {
        onResult(result, url, platform);
        setLoading(false);
        onEnd();
      }, 600);
    } catch (err: any) {
      setError(err.message || 'Gagal mengekstrak media. Mohon coba beberapa saat lagi.');
      setLoading(false);
      onEnd();
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        // Smart platform detection
        const lText = text.toLowerCase();
        if (lText.includes('tiktok.com')) setPlatform('tiktok');
        else if (lText.includes('instagram.com')) setPlatform('instagram');
        else if (lText.includes('youtube.com') || lText.includes('youtu.be')) setPlatform('ytmp4');
        else if (lText.includes('facebook.com')) setPlatform('facebook');
        else if (lText.includes('twitter.com') || lText.includes('x.com')) setPlatform('twitter');
        else if (lText.includes('spotify.com')) setPlatform('spotify');
      }
    } catch (err) {
      console.error('Clipboard error', err);
    }
  };

  return (
    <div id="platform" className="glass-panel rounded-[2rem] p-6 md:p-10 shadow-2xl border border-white/10 transition-all duration-500 hover:border-cyan-500/20">
      <form onSubmit={handleDownload} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-cyan-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.803a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.103-1.103" />
              </svg>
            </div>
            <input
              type="text"
              disabled={loading}
              className="w-full bg-slate-950/50 border-2 border-slate-800/50 text-white rounded-2xl py-5 pl-14 pr-14 focus:outline-none focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 transition-all placeholder:text-slate-600 font-medium disabled:opacity-50"
              placeholder="Tempel tautan video atau audio di sini..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="button"
              onClick={handlePaste}
              disabled={loading}
              className="absolute inset-y-0 right-5 flex items-center text-slate-500 hover:text-cyan-400 transition-colors disabled:opacity-0"
              title="Tempel Link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </button>
          </div>

          <div className="md:w-64 relative">
            <select
              disabled={loading}
              className="w-full h-full bg-slate-950/50 border-2 border-slate-800/50 text-white rounded-2xl py-5 px-6 appearance-none focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 cursor-pointer font-bold disabled:opacity-50"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              {platforms.map(p => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-sm">{p.icon} &nbsp; {p.label}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-slate-500">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
               </svg>
            </div>
          </div>
        </div>

        {!loading ? (
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-cyan-500/10 transition-all transform active:scale-[0.97] flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Mulai Ekstraksi Media
          </button>
        ) : (
          <div className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
                  {statusMessages[statusIdx]}
                </span>
                <span className="text-white font-black text-2xl tracking-tight">Mohon Tunggu...</span>
              </div>
              <span className="text-slate-400 font-mono text-2xl font-black">{Math.round(progress)}%</span>
            </div>
            
            <div className="w-full h-4 bg-slate-900/80 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-600 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[progress-bar-stripes_1s_linear_infinite]"></div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-5 bg-red-500/10 border-l-4 border-red-500 text-red-400 rounded-xl text-sm font-medium flex items-center gap-4 animate-in shake duration-500">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
               </svg>
            </div>
            {error}
          </div>
        )}
      </form>
    </div>
  );
});

export default DownloaderForm;
