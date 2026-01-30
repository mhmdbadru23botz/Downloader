
import { DownloadResult } from '../types';

/**
 * Service to handle media downloading logic.
 * Menggunakan GIMITA API dengan API key dari environment variables.
 */

const BASE_URL = "https://api.gimita.id/api/downloader";
const GIMITA_API_KEY = process.env.GIMITA_API_KEY;

export const downloaderService = {
  fetchMedia: async (platform: string, url: string): Promise<DownloadResult> => {
    if (!GIMITA_API_KEY) {
      throw new Error("GIMITA_API_KEY belum dikonfigurasi.");
    }

    try {
      const apiUrl = new URL(`${BASE_URL}/${platform}`);
      apiUrl.searchParams.set("url", url);

      const response = await fetch(apiUrl.toString(), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${GIMITA_API_KEY}`,
          'Accept': 'application/json'
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("API Key tidak valid atau telah kedaluwarsa.");
        }
        throw new Error(`Server error (${response.status}). Coba lagi nanti.`);
      }

      const data = await response.json();
      
      if (data && data.status) {
        const res = data.result || data;
        
        // --- LOGIKA EKSTRAKSI TINGKAT LANJUT ---
        
        // 1. Ekstraksi Video (Mencari HD lalu SD)
        let videoUrl = res.video_url || res.url || res.hd_url || res.sd_url || res.video;
        
        // Jika ada array links (biasanya YouTube/FB), cari yang video
        if (!videoUrl && res.links && Array.isArray(res.links)) {
          const hdVideo = res.links.find((l: any) => l.quality?.includes('720') || l.quality?.includes('1080') || l.quality === 'hd');
          const sdVideo = res.links.find((l: any) => l.type === 'video');
          videoUrl = hdVideo?.url || sdVideo?.url;
        }

        // 2. Ekstraksi Audio
        let audioUrl = res.music_url || res.mp3_url || res.audio || res.music;
        if (!audioUrl && res.links && Array.isArray(res.links)) {
          const audioLink = res.links.find((l: any) => l.type === 'audio' || l.quality === 'audio' || l.quality?.includes('kbps'));
          audioUrl = audioLink?.url;
        }

        // 3. Normalisasi Formats (Mirror Links)
        let formats = res.formats || [];
        if (formats.length === 0 && res.links && Array.isArray(res.links)) {
          formats = res.links.map((l: any) => ({
            quality: l.quality || (l.type === 'audio' ? 'Audio' : 'Video'),
            url: l.url,
            type: l.type || (l.quality === 'audio' ? 'audio' : 'video')
          }));
        }
        
        return {
          status: true,
          title: res.title || res.desc || "Media AIVISUALS",
          thumbnail: res.thumbnail || res.thumb || res.cover || `https://picsum.photos/seed/${platform}/600/400`,
          duration: res.duration || res.timestamp || "",
          author: res.author?.nickname || res.author?.unique_id || res.author || "Kreator Konten",
          videoUrl: videoUrl,
          audioUrl: audioUrl,
          quality: res.quality || (res.hd_url ? 'HD' : 'SD'),
          formats: formats
        };
      } else {
        return { 
          status: false, 
          error: data.message || "Gagal mengekstrak media. Pastikan tautan publik." 
        };
      }
    } catch (error: any) {
      console.error("Downloader Error:", error);
      throw new Error(error.message || "Gagal terhubung ke layanan ekstraksi.");
    }
  }
};
