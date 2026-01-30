
export interface Platform {
  id: string;
  label: string;
  icon: string;
}

export interface AIAnalysis {
  summary: string;
  tags: string[];
  sentiment: string;
  smartCaption: string;
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
  aiAnalysis?: AIAnalysis;
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

export interface ActiveDownload {
  name: string;
  progress: number;
  totalSize?: string;
  type: 'video' | 'audio';
  isActive: boolean;
}
