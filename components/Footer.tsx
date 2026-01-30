
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-32 border-t border-white/5 bg-slate-950 pt-16 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                 <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                 </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">AIVISUALS</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Teknologi downloader generasi terbaru. Didesain dengan pemrosesan berkecepatan tinggi dan validasi cerdas untuk keandalan maksimal.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/Mhmdbadru23botz" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all border border-white/5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>
              <a href="https://wa.me/6282258041628" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-green-500/20 hover:text-green-500 transition-all border border-white/5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-[10px] tracking-[0.2em]">Layanan Utama</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">TikTok MP4 HD</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">YouTube MP3 HQ</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Instagram Reels</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Twitter/X Video</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white uppercase text-[10px] tracking-[0.2em]">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="https://facebook.com/Mhmdbadru23" className="hover:text-cyan-400 transition-colors">Facebook Page</a></li>
              <li><a href="https://t.me/Mhmdbadru23" className="hover:text-cyan-400 transition-colors">Dukungan Telegram</a></li>
              <li><a href="mailto:muhamadbadruwasih8@gmail.com" className="hover:text-cyan-400 transition-colors">Email Bisnis</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          <p>© 2024 AIVISUALS Generator. Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-2">Dikembangkan oleh <span className="text-cyan-500 font-black">Muhamad Badru Wasih</span></p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Ketentuan Layanan</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
