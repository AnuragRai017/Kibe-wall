import { useRef, useEffect } from 'react';
import { Wallpaper } from '@/lib/api';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye, Heart, Calendar, Download, Sparkles } from 'lucide-react';

interface WallpaperGridProps {
  wallpapers: Wallpaper[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function WallpaperGrid({ wallpapers, loading, hasMore, onLoadMore }: WallpaperGridProps) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore, onLoadMore]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wallpapers.map((wallpaper) => (
          <Dialog key={wallpaper.id}>
            <DialogTrigger asChild>
              <Card className="group overflow-hidden cursor-pointer transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] will-change-transform bg-gradient-to-br from-background/50 to-background border-opacity-50 backdrop-blur-sm">
                <CardContent className="p-0 relative">
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10 backdrop-blur-[2px]">
                    <div className="text-white space-y-3 text-center scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex items-center justify-center space-x-6">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center hover:text-primary transition-colors hover:scale-110 transform duration-300">
                                <Eye className="w-4 h-4 mr-1.5" />
                                <span>{wallpaper.views}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p className="flex items-center"><Eye className="w-3 h-3 mr-1" /> Total Views</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center hover:text-primary transition-colors hover:scale-110 transform duration-300">
                                <Heart className="w-4 h-4 mr-1.5" />
                                <span>{wallpaper.favorites}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p className="flex items-center"><Heart className="w-3 h-3 mr-1" /> Total Favorites</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="flex items-center justify-center hover:text-primary transition-colors hover:scale-110 transform duration-300">
                              <Calendar className="w-4 h-4 mr-1.5" />
                              <span>{formatDate(wallpaper.created_at)}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> Upload Date</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="relative overflow-hidden group">
                    <img
                      src={wallpaper.thumbs.large}
                      alt={`Wallpaper ${wallpaper.id}`}
                      className="w-full h-52 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out will-change-transform"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </CardContent>
                <CardFooter className="p-3 text-sm bg-card/50 backdrop-blur-sm border-t border-border/50">
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium flex items-center">
                        <Sparkles className="w-3 h-3 mr-1 text-primary" />
                        {wallpaper.resolution}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="capitalize text-muted-foreground hover:text-foreground transition-colors duration-300">
                        {wallpaper.category}
                      </span>
                    </div>
                    <div className="flex space-x-1.5">
                      {wallpaper.colors.slice(0, 3).map((color) => (
                        <TooltipProvider key={color}>
                          <Tooltip>
                            <TooltipTrigger>
                              <div
                                className="w-4 h-4 rounded-full transform hover:scale-125 transition-transform duration-300 ring-1 ring-white/10 shadow-lg hover:ring-2 hover:ring-primary/50"
                                style={{ backgroundColor: color }}
                              />
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                              <p className="flex items-center font-mono text-xs">{color}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle className="sr-only">
                  Wallpaper Details - {wallpaper.category} {wallpaper.resolution}
                </DialogTitle>
              </DialogHeader>
              <div className="relative aspect-video bg-black/10 rounded-lg overflow-hidden">
                <img
                  src={wallpaper.path}
                  alt={`Wallpaper ${wallpaper.id}`}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                  <div className="flex justify-between items-center text-white">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center hover:text-primary transition-colors duration-300">
                        <Eye className="w-5 h-5 mr-2" />
                        <span>{wallpaper.views.toLocaleString()} views</span>
                      </div>
                      <div className="flex items-center hover:text-primary transition-colors duration-300">
                        <Heart className="w-5 h-5 mr-2" />
                        <span>{wallpaper.favorites.toLocaleString()} favorites</span>
                      </div>
                      <div className="flex items-center hover:text-primary transition-colors duration-300">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{formatDate(wallpaper.created_at)}</span>
                      </div>
                    </div>
                    <a
                      href={wallpaper.path}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 group"
                    >
                      <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                      Download
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center space-x-2 flex-wrap">
                  <span className="font-medium">Resolution:</span>
                  <span>{wallpaper.resolution}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-medium">Category:</span>
                  <span className="capitalize">{wallpaper.category}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-medium">Size:</span>
                  <span>{Math.round(wallpaper.file_size / 1024 / 1024 * 100) / 100} MB</span>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="font-medium">Colors:</span>
                  {wallpaper.colors.map((color) => (
                    <div
                      key={color}
                      className="w-6 h-6 rounded-full ring-1 ring-border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
      {(loading || hasMore) && (
        <div 
          ref={observerTarget} 
          className="h-10 flex items-center justify-center"
        >
          {loading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          )}
        </div>
      )}
    </>
  );
}