
export interface Platform {
  id: string;
  label: string;
  icon: string;
}

export interface DownloadResult {
  status: boolean;
  title?: string;
  thumbnail?: string;
  duration?: string;
  author?: string;
  videoUrl?: string;
  audioUrl?: string;
  quality?: string;
  formats?: {
    quality: string;
    url: string;
    type: string;
  }[];
  error?: string;
}

export interface HistoryItem {
  id: string;
  url: string;
  platform: string;
  timestamp: number;
  title: string;
  thumbnail: string;
}
