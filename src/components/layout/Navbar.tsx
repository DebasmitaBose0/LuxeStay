import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Calendar, SunMoon, Search, Moon, Sun } from 'lucide-react';
import { usePrefetchOnHover } from '@/hooks/usePrefetchOnHover';
import { useCommandPaletteShortcut } from '@/hooks/useCommandPaletteShortcut';

type StickyMode = 'transparent' | 'solid' | 'compact';

const getGenderEmoji = (gender?: string): string => {
  switch (gender) {
    case 'boy':
      return '👦🏻';
    case 'girl':
      return '👧🏻';
    default:
      return '👤';
  }
};

interface BookingDraft {
  nights: number;
  total: number;
  policy?: string;
}

export default function Navbar(): JSX.Element {
  const { user, logout } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const navigate = useNavigate();
  const [mode, setMode] = useState<StickyMode>('transparent');
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const { setIsOpen: setCommandPaletteOpen } = useCommandPaletteShortcut();

  // Sync booking draft from sessionStorage
  useEffect(() => {
    const raw = sessionStorage.getItem('bookingDraft');
    if (raw) {
      try {
        setDraft(JSON.parse(raw));
      } catch (e) {
        setDraft(null);
      }
    }

    // Listen for external updates (other tabs)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'bookingDraft') {
        setDraft(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Smart sticky: prefer IntersectionObserver on #hero, fallback to scrollY
  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (heroEl && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          const ent = entries[0];
          setMode(ent.isIntersecting ? 'transparent' : 'solid');
        },
        { threshold: 0.05 }
      );
      io.observe(heroEl);
      return () => io.disconnect();
    }

    // Fallback to scroll-based
    const onScroll = () => setMode(window.scrollY > 40 ? 'solid' : 'transparent');
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Prefetch hooks for Hotels and My Bookings
  const hotelsHandlers = usePrefetchOnHover('hotels', async () => {
    const res = await fetch('/api/hotels?limit=6');
    if (!res.ok) return null;
    return res.json();
  });

  const bookingsHandlers = usePrefetchOnHover('bookings', async () => {
    const res = await fetch('/api/bookings?active=true');
    if (!res.ok) return null;
    return res.json();
  });

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 border-b text-slate-900 dark:text-white ${
        mode === 'transparent' 
          ? 'bg-transparent border-transparent' 
          : 'bg-white dark:bg-slate-950 border-gray-200 dark:border-slate-800 shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo + primary nav */}
        <div className="flex items-center gap-4">
          <Link to="/" aria-label="Home" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight">LuxeStay</span>
          </Link>

          <Link
            to="/hotels"
            {...hotelsHandlers}
            className="hidden md:inline-block text-sm font-bold transition-all duration-300 px-3 py-1.5 rounded-lg text-slate-900 dark:text-white hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 dark:hover:from-orange-900/40 dark:hover:to-green-900/40 hover:text-slate-900 dark:hover:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.3),0_0_20px_rgba(34,197,94,0.3)]"
          >
            Hotels
          </Link>
        </div>

        {/* Right-side nav items */}
        <div className="flex items-center gap-2 md:gap-3">

          {/* Mini cart / live booking summary */}
          <div className="hidden md:flex items-center gap-2 border rounded-lg px-3 py-1.5 transition-all duration-300 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 dark:hover:from-orange-900/40 dark:hover:to-green-900/40 hover:border-orange-400 dark:hover:border-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3),0_0_20px_rgba(34,197,94,0.3)]">
            {draft ? (
              <>
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{draft.nights} nights</div>
                <div className="font-bold text-slate-900 dark:text-white">₹{draft.total.toFixed(0)}</div>
                {draft.policy && (
                  <div className="ml-2 text-[10px] px-2 py-1 rounded text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-semibold">
                    {draft.policy}
                  </div>
                )}
                <Link to="/booking/draft" className="ml-2 text-sm font-semibold underline text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300">
                  Resume
                </Link>
              </>
            ) : (
              <Link to="/hotels" className="text-sm font-semibold text-slate-900 dark:text-white hover:text-orange-700 dark:hover:text-orange-300">
                Start booking
              </Link>
            )}
          </div>

          {/* My Bookings with prefetch */}
          <Link to="/dashboard" {...bookingsHandlers} className="hidden md:inline-block">
            <Button 
              className="gap-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-semibold border border-slate-300 dark:border-slate-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 dark:hover:from-orange-900/40 dark:hover:to-green-900/40 hover:border-orange-400 dark:hover:border-orange-500 hover:text-slate-900 dark:hover:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.3),0_0_20px_rgba(34,197,94,0.3)]"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">My Bookings</span>
            </Button>
          </Link>

          {/* Theme toggle + Profile dropdown */}
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-9 w-9 transition-all duration-300 text-slate-900 dark:text-white hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 dark:hover:from-orange-900/40 dark:hover:to-green-900/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.3),0_0_20px_rgba(34,197,94,0.3)] rounded-lg" 
                  title="Toggle theme"
                >
                  {resolvedTheme === 'dark' ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                className="bg-white dark:bg-slate-950 border-gray-200 dark:border-slate-800"
              >
                <DropdownMenuItem 
                  onClick={() => setTheme('light')}
                  className="text-slate-900 dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme('dark')}
                  className="text-slate-900 dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setTheme('system')}
                  className="text-slate-900 dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <SunMoon className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-9 w-9 rounded-full transition-all duration-300 text-slate-900 dark:text-white hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 dark:hover:from-orange-900/40 dark:hover:to-green-900/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.3),0_0_20px_rgba(34,197,94,0.3)] text-xl flex items-center justify-center"
                  >
                    {getGenderEmoji(user.gender)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 bg-white dark:bg-slate-950 border-gray-200 dark:border-slate-800" 
                  align="end" 
                  forceMount
                >
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-xs leading-none text-slate-600 dark:text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuItem 
                    onClick={() => navigate('/dashboard')}
                    className="text-slate-900 dark:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>My Bookings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button 
                    className="text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-100 hover:to-green-100 dark:hover:from-orange-900/40 dark:hover:to-green-900/40 hover:border-orange-400 dark:hover:border-orange-500 hover:text-slate-900 dark:hover:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.3),0_0_20px_rgba(34,197,94,0.3)]"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold transition-all duration-300 hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border border-orange-600"
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
