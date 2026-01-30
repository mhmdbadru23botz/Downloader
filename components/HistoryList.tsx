
import React from 'react';
import { HistoryItem } from '../types';

interface Props {
  history: HistoryItem[];
  onClear: () => void;
}

const HistoryList: React.FC<Props> = ({ history, onClear }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold">Aktivitas Terkini</h2>
          <p className="text-slate-400 text-sm">Terakhir {history.length} unduhan tersimpan secara lokal di browser Anda.</p>
        </div>
        <button
          onClick={onClear}
          className="text-xs font-semibold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest"
        >
          Hapus Riwayat
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {history.map((item) => (
          <div
            key={item.id}
            className="glass-panel p-4 rounded-2xl flex items-center gap-4 hover:border-white/20 transition-all cursor-pointer group border border-white/5"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
               <img src={item.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
               <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
               </div>
            </div>
            <div className="flex-grow min-w-0">
               <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded uppercase font-bold border border-cyan-500/10">
                    {item.platform}
                  </span>
                  <span className="text-slate-600 text-[10px]">{new Date(item.timestamp).toLocaleDateString('id-ID')}</span>
               </div>
               <h4 className="font-semibold text-slate-200 truncate pr-2 leading-tight">{item.title}</h4>
               <p className="text-[10px] text-slate-500 truncate mt-1 italic">{item.url}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
