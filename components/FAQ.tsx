
import React from 'react';

const faqs = [
  {
    q: "Bagaimana cara kerja AIVISUALS Downloader?",
    a: "Sistem kami menggunakan algoritma parsing cerdas untuk mendeteksi stream media asli dari platform sumber. Kami mengekstrak link unduhan langsung dari server penyedia konten tanpa melalui pihak ketiga yang berisiko."
  },
  {
    q: "Apakah kualitas video akan berkurang?",
    a: "Tidak. Kami selalu berusaha memberikan kualitas tertinggi yang tersedia di server asal, mulai dari 720p, 1080p, hingga 4K jika tersedia."
  },
  {
    q: "Kenapa unduhan YouTube saya hanya berupa suara (MP3)?",
    a: "Jika Anda menggunakan platform 'YouTube MP3', sistem hanya akan mengambil jalur audionya. Gunakan platform 'YouTube MP4' untuk mendapatkan file video lengkap."
  },
  {
    q: "Apakah aman mengunduh dari sini?",
    a: "Sangat aman. Situs kami menggunakan enkripsi SSL tingkat tinggi dan tidak menyimpan riwayat file atau data pribadi Anda di server kami (semua riwayat hanya disimpan di browser lokal Anda)."
  },
  {
    q: "Mengapa link dari Instagram sering gagal?",
    a: "Pastikan postingan tersebut berasal dari akun publik. Konten dari akun yang bersifat 'Private' tidak dapat diakses oleh server kami demi menghormati privasi pengguna."
  },
  {
    q: "Platform apa yang paling stabil saat ini?",
    a: "Saat ini pemrosesan untuk TikTok dan Instagram memiliki tingkat keberhasilan tertinggi (99%), diikuti oleh YouTube dan Facebook."
  }
];

const FAQ: React.FC = () => {
  return (
    <section id="faq" className="mt-32 mb-16 px-4">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 mb-4 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-widest">
          Pusat Bantuan & Edukasi
        </div>
        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Sering Ditanyakan</h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">Informasi lengkap mengenai penggunaan layanan AIVISUALS Generator.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
        {faqs.map((faq, i) => (
          <div key={i} className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent -mr-12 -mt-12 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all"></div>
            <h4 className="text-lg font-black mb-4 text-white group-hover:text-cyan-400 transition-colors flex items-start gap-4">
              <span className="text-cyan-500 font-mono text-sm">0{i+1}</span>
              {faq.q}
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed pl-9 font-medium">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
