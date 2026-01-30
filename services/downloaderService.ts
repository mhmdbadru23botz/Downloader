
import { DownloadResult } from '../types';

/**
 * Service to handle media downloading logic.
 * Resilient implementation: Tries direct fetch first, falls back to multiple proxy strategies.
 */

const BASE_URL = "https://api.gimita.id/api/downloader";
const ALLORIGINS_PROXY = "https://api.allorigins.win/get?url=";

export const downloaderService = {
  /**
   * Fetches media metadata from the downloader API.
   * Requires process.env.GIMITA_API_KEY to be configured.
   */
  fetchMedia: async (platform: string, url: string): Promise<DownloadResult> => {
    // Priority check for the Gimita-specific API key.
    const apiKey = process.env.GIMITA_API_KEY;

    if (!apiKey) {
      throw new Error("Konfigurasi Sistem Gagal: GIMITA_API_KEY tidak ditemukan di environment variables. Silakan hubungi administrator.");
    }

    const targetUrl = new URL(`${BASE_URL}/${platform}`);
    targetUrl.searchParams.set("url", url);
    targetUrl.searchParams.set("key", apiKey);

    let jsonData: any = null;

    try {
      // MODE 1: Direct Fetch (Fastest)
      const directResponse = await fetch(targetUrl.toString(), { 
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (directResponse.ok) {
        jsonData = await directResponse.json();
      } else {
        throw new Error(`Direct fetch failed with status: ${directResponse.status}`);
      }
    } catch (directError: any) {
      console.warn("Direct fetch failed, attempting proxy fallback...", directError);
      try {
        // MODE 2: AllOrigins Proxy (To bypass potential CORS or local network restrictions)
        const proxiedUrl = `${ALLORIGINS_PROXY}${encodeURIComponent(targetUrl.toString())}`;
        const proxyResponse = await fetch(proxiedUrl);
        if (!proxyResponse.ok) throw new Error("Proxy connection unreachable.");
        const proxyData = await proxyResponse.json();
        if (proxyData.contents) {
          jsonData = JSON.parse(proxyData.contents);
        } else {
          throw new Error("Proxy returned empty content.");
        }
      } catch (proxyError: any) {
        console.error("Downloader Service: Critical failure in both direct and proxy attempts.", proxyError);
        throw new Error("Sistem ekstraksi sedang sibuk atau mengalami kendala jaringan. Silakan coba lagi dalam beberapa saat.");
      }
    }

    // Process and normalize the extracted JSON data for the UI
    if (jsonData && (jsonData.status || jsonData.result)) {
      const res = jsonData.result || jsonData;
      
      let videoUrl = res.video_url || res.url || res.hd_url || res.sd_url || res.video;
      if (!videoUrl && res.links && Array.isArray(res.links)) {
        const hd = res.links.find((l: any) => l.quality?.includes('720') || l.quality?.includes('1080') || l.quality?.toLowerCase().includes('hd'));
        videoUrl = hd?.url || res.links[0]?.url;
      }

      let audioUrl = res.music_url || res.mp3_url || res.audio || res.music;
      if (!audioUrl && res.links && Array.isArray(res.links)) {
        const audio = res.links.find((l: any) => l.type === 'audio' || l.url?.includes('.mp3'));
        audioUrl = audio?.url;
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
        formats: res.formats || (res.links ? res.links.map((l: any) => ({
          quality: l.quality || 'Download',
          url: l.url,
          type: l.type || 'media'
        })) : [])
      };
    } else {
      return { 
        status: false, 
        error: jsonData?.message || "Tautan tidak valid atau konten tidak dapat ditemukan." 
      };
    }
  },

  /**
   * Downloads a file and reports real progress using the Fetch API.
   */
  downloadFileWithProgress: async (
    url: string, 
    filename: string, 
    onProgress: (percent: number) => void
  ) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Gagal mengunduh file dari sumber.");

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      let loaded = 0;

      const reader = response.body?.getReader();
      if (!reader) throw new Error("Gagal menginisialisasi pembaca aliran data.");

      const chunks = [];
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        
        if (total > 0) {
          onProgress(Math.round((loaded / total) * 100));
        } else {
          // Fallback simulation for unknown file sizes
          onProgress(Math.min(99, Math.round((loaded / (loaded + 5000000)) * 100)));
        }
      }

      const blob = new Blob(chunks);
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      onProgress(100);
    } catch (error) {
      console.error("Downloader Service Download Failure:", error);
      // Fallback: Attempt simple redirect if streaming fails
      window.open(url, '_blank');
      onProgress(100);
    }
  }
};
