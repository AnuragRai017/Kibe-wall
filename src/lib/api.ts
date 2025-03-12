import axios from 'axios';

export interface WallpaperResponse {
  data: Wallpaper[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    query?: string | null;
    seed?: string | null;
  };
}

export interface Wallpaper {
  id: string;
  url: string;
  short_url: string;
  views: number;
  favorites: number;
  source: string;
  purity: string;
  category: string;
  dimension_x: number;
  dimension_y: number;
  resolution: string;
  ratio: string;
  file_size: number;
  file_type: string;
  created_at: string;
  colors: string[];
  path: string;
  thumbs: {
    large: string;
    original: string;
    small: string;
  };
}

export interface Tag {
  id: number;
  name: string;
  alias: string;
  category_id: number;
  category: string;
  purity: string;
  created_at: string;
}

export interface SearchParams {
  q?: string;
  categories?: string;
  purity?: string;
  sorting?: string;
  order?: 'desc' | 'asc';
  topRange?: string;
  atleast?: string;
  resolutions?: string;
  ratios?: string;
  colors?: string;
  page?: number;
  seed?: string;
  apikey?: string;
}

export const api = {
  search: async (params: SearchParams): Promise<WallpaperResponse> => {
    const response = await axios.get('/api/wallhaven', { params });
    return response.data;
  },

  getWallpaper: async (id: string, apiKey?: string): Promise<{ data: Wallpaper }> => {
    const params = apiKey ? { apikey: apiKey } : {};
    const response = await axios.get(`/api/wallhaven/wallpaper/${id}`, { params });
    return response.data;
  },

  getTag: async (id: number): Promise<{ data: Tag }> => {
    const response = await axios.get(`/api/wallhaven/tag/${id}`);
    return response.data;
  },
}; 