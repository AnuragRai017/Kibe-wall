import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSortingChange: (sorting: string) => void;
}

export function Header({ onSearch, onCategoryChange, onSortingChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-3 group">
            <div className="relative w-8 h-8 overflow-hidden rounded-full">
              <Image
                src="/icon.jpg"
                alt="Kibewall Logo"
                width={32}
                height={32}
                className="object-cover transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300 group-hover:animate-pulse">
              Kibewall
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Categories</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onCategoryChange('general')}>
                  General
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCategoryChange('anime')}>
                  Anime
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCategoryChange('people')}>
                  People
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">Sort By</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onSortingChange('date_added')}>
                  Date Added
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortingChange('relevance')}>
                  Relevance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortingChange('random')}>
                  Random
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortingChange('views')}>
                  Views
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortingChange('favorites')}>
                  Favorites
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <form onSubmit={handleSearch} className="flex-1 md:flex-none">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search wallpapers..."
                className="h-9 md:w-[300px] lg:w-[400px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                size="sm"
                className="absolute right-0 top-0 h-9"
              >
                Search
              </Button>
            </div>
          </form>
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
} 