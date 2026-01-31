
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import DownloaderForm, { DownloaderFormHandle } from './components/DownloaderForm';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';
import FAQ from './components/FAQ';
import DownloadProgressOverlay from './components/DownloadProgressOverlay';
import { DownloadResult, HistoryItem, ActiveDownload } from './types';
import { aiService } from './services/aiService';
import { downloaderService } from './services/downloaderService';

const App: React.FC = () => {
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [activeDownload, setActiveDownload] = useState<ActiveDownload | null>(null);
  
  const formRef = useRef<DownloaderFormHandle>(null);

  useEffect(() => {
    const saved = localStorage.getItem('download_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("History parse fail", e);
      }
    }
  }, []);

  const saveToHistory = (res: DownloadResult, url: string, platform: string) => {
    if (!res.status || !res.title) return;
    
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      platform,
      timestamp: Date.now(),
      title: res.title || "Konten AIVISUALS",
      thumbnail: res.thumbnail || `https://picsum.photos/seed/${platform}/400/225`,
    };

    const updatedHistory = [newItem, ...history.filter(h => h.url !== url)].slice(0, 8);
    setHistory(updatedHistory);
    localStorage.setItem('download_history', JSON.stringify(updatedHistory));
  };

  const handleResult = async (res: DownloadResult, url: string, platform: string) => {
    setResult(res);
    saveToHistory(res, url, platform);

    if (res.status && res.title) {
      setIsAiProcessing(true);
      const aiInsight = await aiService.analyzeMedia(res.title, res.author || 'Anonim', platform);
      if (aiInsight) {
        setResult(prev => prev ? { ...prev, aiAnalysis: aiInsight } : prev);
      }
      setIsAiProcessing(false);
    }
  };

  const handleFileDownload = (url: string, title: string, type: 'video' | 'audio') => {
    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase().substring(0, 30);
    const extension = type === 'video' ? 'mp4' : 'mp3';
    const filename = `aivisuals_${safeTitle}.${extension}`;

    setActiveDownload({
      name: filename,
      progress: 0,
      type: type,
      isActive: true
    });

    downloaderService.downloadFileWithProgress(url, filename, (percent) => {
      setActiveDownload(prev => prev ? { ...prev, progress: percent } : null);
      if (percent === 100) {
        setTimeout(() => setActiveDownload(null), 3000);
      }
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('download_history');
  };

  const handleRetry = () => {
    setResult(null);
    formRef.current?.retry();
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#020617]">
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-cyan-600/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000"></div>
        <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] bg-teal-600/5 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <Header />

      <main className="flex-grow container mx-auto px-6 py-20 max-w-6xl relative">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[11px] font-black uppercase tracking-[0.2em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Ekstraksi Media & Analisis AI
          </div>
          
          <h1 className="text-6xl md:text-8xl font-[900] mb-8 tracking-tighter leading-[0.9] text-white">
            Unduh & <br /><span className="gradient-text text-glow">Analisis Konten.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Alat profesional dengan kecerdasan buatan untuk mengunduh dan memahami konten favorit Anda dalam sekejap.
          </p>
        </div>

        <DownloaderForm 
          ref={formRef}
          onResult={handleResult} 
          onStart={() => { setResult(null); setIsSearching(true); }} 
          onEnd={() => setIsSearching(false)} 
        />

        <div className="mt-20 space-y-24">
          {result && (
            <div id="result-view" className="scroll-mt-24">
              <ResultCard 
                data={result} 
                onRetry={handleRetry} 
                isAiProcessing={isAiProcessing} 
                onDownload={handleFileDownload}
                activeDownload={activeDownload}
              />
            </div>
          )}
          
          {(isSearching && !result) && (
             <div className="animate-pulse glass-panel rounded-[2.5rem] p-16 flex flex-col items-center border border-white/10">
                <div className="w-full max-w-lg aspect-video bg-slate-800/40 rounded-3xl mb-10 overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                </div>
                <div className="w-2/3 h-10 bg-slate-800/40 rounded-xl mb-6"></div>
                <div className="w-1/2 h-4 bg-slate-800/40 rounded-full"></div>
             </div>
          )}

          {!isSearching && !result && history.length > 0 && (
            <HistoryList history={history} onClear={clearHistory} />
          )}

          {!isSearching && !result && history.length === 0 && (
            <div className="text-center py-32 opacity-20">
              <div className="text-8xl mb-8 filter grayscale">📥</div>
              <p className="text-2xl font-black tracking-tight">Menunggu Input Tautan</p>
              <p className="text-sm mt-3 font-bold uppercase tracking-widest text-slate-500">Dukung 10+ Platform & Analisis AI</p>
            </div>
          )}

          <FAQ />
        </div>
      </main>

      <DownloadProgressOverlay activeDownload={activeDownload} />
      <Footer />
    </div>
  );
};

export default App;
