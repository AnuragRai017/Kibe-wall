'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { WallpaperGrid } from '@/components/WallpaperGrid';
import { api, Wallpaper, SearchParams } from '@/lib/api';

export default function Home() {
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    categories: '010', // Default to anime category
    purity: '100', // Default to SFW
    sorting: 'date_added',
    order: 'desc',
    page: 1,
  });

  const fetchWallpapers = useCallback(async (params: SearchParams, append: boolean = false) => {
    try {
      setLoading(true);
      const response = await api.search(params);
      
      // Update hasMore based on pagination info
      setHasMore(response.meta.current_page < response.meta.last_page);

      // Deduplicate wallpapers when appending
      if (append) {
        setWallpapers(prev => {
          const existingIds = new Set(prev.map(w => w.id));
          const newWallpapers = response.data.filter(w => !existingIds.has(w.id));
          return [...prev, ...newWallpapers];
        });
      } else {
        // For new searches, just use the new data
        setWallpapers(response.data);
      }
    } catch (error) {
      console.error('Error fetching wallpapers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallpapers(searchParams, false);
  }, [fetchWallpapers, searchParams.categories, searchParams.sorting, searchParams.q]);

  const handleSearch = (query: string) => {
    setSearchParams(prev => ({
      ...prev,
      q: query,
      page: 1,
    }));
    setHasMore(true);
  };

  const handleCategoryChange = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      general: '100',
      anime: '010',
      people: '001',
    };

    setSearchParams(prev => ({
      ...prev,
      categories: categoryMap[category],
      page: 1,
    }));
    setHasMore(true);
  };

  const handleSortingChange = (sorting: string) => {
    setSearchParams(prev => ({
      ...prev,
      sorting,
      page: 1,
    }));
    setHasMore(true);
  };

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      setSearchParams(prev => {
        const newParams = {
          ...prev,
          page: (prev.page || 1) + 1,
        };
        fetchWallpapers(newParams, true);
        return newParams;
      });
    }
  }, [fetchWallpapers, loading, hasMore]);

  return (
    <main className="min-h-screen bg-background">
      <Header
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onSortingChange={handleSortingChange}
      />
      <div className="container mx-auto">
        <WallpaperGrid 
          wallpapers={wallpapers} 
          loading={loading}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
      </div>
    </main>
  );
}
