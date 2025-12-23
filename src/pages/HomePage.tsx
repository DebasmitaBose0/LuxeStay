import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, ArrowRight, MapPin } from 'lucide-react';

// Simple hook for scroll animation
function useOnScreen(options: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Only trigger once
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
}

const FadeInSection = ({ children, delay = '0s', direction = 'up' }: { children: React.ReactNode, delay?: string, direction?: 'up' | 'left' | 'right' }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  const getTransform = () => {
    if (!isVisible) {
      if (direction === 'up') return 'translateY(20px)';
      if (direction === 'left') return 'translateX(-20px)';
      if (direction === 'right') return 'translateX(20px)';
    }
    return 'none';
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s ease-out ${delay}, transform 0.8s ease-out ${delay}`,
      }}
    >
      {children}
    </div>
  );
};

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showEntrance, setShowEntrance] = useState(true);
  const [entranceParticles] = useState(Array.from({ length: 12 }).map((_, i) => ({ id: i, delay: i * 0.1 })));

  const heroImages = [
    "https://i.pinimg.com/736x/b2/5f/05/b25f05a8d262ac223f724448c50b9494.jpg",
    "https://i.pinimg.com/1200x/7b/92/1e/7b921e0498c320f9f685de711b455a6a.jpg",
    "https://i.pinimg.com/736x/c1/e1/e1/c1e1e1572f3b92cbde98d1acab7a6c66.jpg",
    "https://i.pinimg.com/1200x/d2/89/37/d28937dee19c14d8e3331e6ab1621d7c.jpg",
    "https://i.pinimg.com/736x/bb/ca/35/bbca35002b9f22742e292ce78fc1639c.jpg",
    "https://i.pinimg.com/736x/87/88/b9/8788b95c2188807b986e484e86a106a3.jpg",
    "https://i.pinimg.com/1200x/91/b5/e3/91b5e3d317fb870bbaf70bd31c9e0079.jpg",
    "https://i.pinimg.com/736x/36/d0/35/36d035545ba4d8b9f8943447f27f4c6e.jpg",
    "https://i.pinimg.com/736x/9c/b2/6b/9cb26b950497366c866e36d9a445d677.jpg",
    "https://i.pinimg.com/736x/f8/10/fa/f810fad30bd16be64802d12739d2d5f2.jpg"
  ];

  // Preload images to prevent flickering
  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll progress handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation - hide after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEntrance(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = () => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }
    
    if (checkInDate && checkOutDate) {
      sessionStorage.setItem('bookingDraft', JSON.stringify({
        nights: Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)),
        total: 0,
      }));
      navigate('/hotels');
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-950">
      {/* Scroll Progress Bar - Tricolor */}
      <div className="fixed top-0 left-0 h-1 w-full z-50 bg-transparent scroll-progress" style={{
        backgroundImage: `linear-gradient(90deg, #f97316 0%, #ffffff 50%, #16a34a 100%)`,
        width: `${scrollProgress}%`,
        transition: 'width 0.1s ease-out',
        boxShadow: '0 0 12px rgba(249, 115, 22, 0.6), inset 0 0 8px rgba(255, 255, 255, 0.4)'
      }}></div>

      {/* Celebratory Entrance Animation */}
      {showEntrance && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
          {/* Tricolor wave */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="none">
            <defs>
              <linearGradient id="entranceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 0.8 }} />
                <stop offset="33%" style={{ stopColor: '#f97316', stopOpacity: 0.8 }} />
                <stop offset="33%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
                <stop offset="66%" style={{ stopColor: '#ffffff', stopOpacity: 0.8 }} />
                <stop offset="66%" style={{ stopColor: '#16a34a', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#16a34a', stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>
            <path
              d="M 0,400 Q 480,200 960,400 T 1920,400 L 1920,1080 L 0,1080 Z"
              fill="url(#entranceGradient)"
              className="entrance-wave"
            />
          </svg>

          {/* Smoke/fog effect */}
          {entranceParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute entrance-smoke"
              style={{
                width: `${120 + Math.random() * 80}px`,
                height: `${120 + Math.random() * 80}px`,
                left: `${Math.random() * 100}%`,
                top: `${20 + Math.random() * 40}%`,
                background: `radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(249,115,22,0) 70%)`,
                borderRadius: '50%',
                filter: 'blur(40px)',
                animationDelay: `${particle.delay}s`,
              }}
            />
          ))}

          {/* Light particles */}
          {entranceParticles.map((particle) => (
            <div
              key={`light-${particle.id}`}
              className="absolute entrance-particle"
              style={{
                width: '4px',
                height: '4px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, #fff 0%, rgba(255,255,255,0) 70%)`,
                borderRadius: '50%',
                boxShadow: '0 0 12px rgba(249, 115, 22, 0.8)',
                '--tx': `${(Math.random() - 0.5) * 200}px`,
                animationDelay: `${particle.delay * 0.5}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes flagWave {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 0%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        @keyframes waveFlow {
          0% { transform: translateX(-50%) skewY(2deg); }
          25% { transform: translateX(-25%) skewY(1deg); }
          50% { transform: translateX(0%) skewY(-2deg); }
          75% { transform: translateX(25%) skewY(-1deg); }
          100% { transform: translateX(50%) skewY(2deg); }
        }
        @keyframes tricolorGlow {
          0% { opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { opacity: 0.3; }
        }
        .flag-wave {
          animation: flagWave 6s ease-in-out infinite;
          background-size: 200% 100%;
        }
        .wave-flow {
          animation: waveFlow 8s ease-in-out infinite;
        }
        .tricolor-glow {
          animation: tricolorGlow 5s ease-in-out infinite;
        }
        .hero-text-shadow {
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        @keyframes progressGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.4)); }
          50% { filter: drop-shadow(0 0 16px rgba(249, 115, 22, 0.8)); }
        }
        .scroll-progress {
          animation: progressGlow 3s ease-in-out infinite;
        }
        @keyframes particleFloat {
          0% { opacity: 0; transform: translateY(20px) translateX(0); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-100px) translateX(var(--tx)); }
        }
        @keyframes tricolorWave {
          0% { transform: translateX(-100%) scaleY(0.8); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(100%) scaleY(0.5); opacity: 0; }
        }
        @keyframes smokeFlow {
          0% { opacity: 0.3; transform: translateY(20px) translateX(0) scale(0.8); }
          50% { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(-100px) translateX(80px) scale(1.5); }
        }
        .entrance-particle {
          animation: particleFloat 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .entrance-wave {
          animation: tricolorWave 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .entrance-smoke {
          animation: smokeFlow 2.5s ease-out forwards;
        }
        @keyframes borderWave {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .tricolor-border-wave {
          animation: borderWave 4s ease-in-out infinite;
          background-size: 200% 200%;
        }
      `}</style>

      {/* Hero - Indian Aesthetics with Tricolor */}
      <section id="hero" className="relative pt-32 pb-24 lg:pb-32 px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-orange-50 via-white to-white dark:from-orange-950/20 dark:via-slate-950 dark:to-slate-950">
        {/* Tricolor accent bar with wave animation */}
        <div className="absolute top-0 left-0 right-0 h-1.5 flag-wave" style={{ backgroundImage: 'linear-gradient(90deg, #f97316 0%, #f97316 33%, #ffffff 33%, #ffffff 66%, #16a34a 66%, #16a34a 100%)' }}></div>
        
        {/* Decorative Indian patterns */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-10 left-20 w-72 h-72 bg-orange-400 dark:bg-orange-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-green-300 dark:bg-green-800/20 rounded-full blur-3xl"></div>
        </div>


        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div>
              <div style={{ animation: 'slideInLeft 0.6s ease-out' }}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight mb-6 hero-text-shadow" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}>
                  अतिथि देवो भवः
                  <br />
                  <span className="text-orange-600 dark:text-orange-400">Your Guest is God</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-8 max-w-lg">
                  Find your perfect stay
                </p>
              </div>

              {/* Quick features list - Indian style */}
              <div style={{ animation: 'slideInLeft 0.6s ease-out 0.1s both' }} className="mb-12 space-y-3">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                  <span>Experience luxury stays in Kalka & Shimla Hills</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                  <span>Authentic Indian hospitality with world-class service</span>
                </div>
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                  <span>Round-the-clock multilingual customer support</span>
                </div>
              </div>

              {/* CTA */}
              <div style={{ animation: 'slideInLeft 0.6s ease-out 0.2s both' }} className="flex flex-wrap gap-3">
                {user ? (
                  <Link to="/hotels">
                    <Button size="lg" className="bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-600 text-white font-bold rounded-lg text-lg py-6 px-8">
                      Search Hotels
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button size="lg" className="bg-orange-600 dark:bg-orange-500 hover:bg-orange-700 dark:hover:bg-orange-600 text-white font-bold rounded-lg text-lg py-6 px-8">
                      Get Started
                    </Button>
                  </Link>
                )}
                <Button size="lg" variant="outline" className="dark:border-orange-600 dark:text-orange-400 dark:hover:bg-orange-950 rounded-lg text-lg py-6 px-8" onClick={() => {
                  document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  How It Works
                </Button>
              </div>
            </div>

            {/* Right: Floating elements - Indian travel vibes */}
            <div style={{ animation: 'slideInRight 0.6s ease-out' }} className="hidden lg:block relative h-96 md:h-full">
              {/* Floating card 1 */}
              <div className="absolute top-20 right-0 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl max-w-xs hover:shadow-3xl transition-all duration-300 hover:scale-105 border-2 border-orange-200 dark:border-orange-800">
                <div className="text-4xl mb-3">🏨</div>
                <p className="text-sm text-orange-600 dark:text-orange-400 mb-2 font-semibold">Kalka Pride</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">Kalka Heritage</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Himachal Pradesh • 4.9★</p>
              </div>

              {/* Floating card 2 */}
              <div className="absolute bottom-20 left-0 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl max-w-xs hover:shadow-3xl transition-all duration-300 hover:scale-105 border-2 border-green-200 dark:border-green-800" style={{ animation: 'float 4s ease-in-out infinite' }}>
                <div className="text-4xl mb-3">🏔️</div>
                <p className="text-sm text-green-600 dark:text-green-400 mb-2 font-semibold">Mountain Bliss</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">Starting at ₹1,999</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Shimla Hill Station</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar - Indian tricolor themed with wave animation */}
      <section className="bg-gradient-to-b from-orange-50 via-white to-green-50 dark:from-orange-950/20 dark:via-slate-950 dark:to-green-950/20 px-4 md:px-8 pb-20 relative">
        <div className="max-w-6xl mx-auto -mt-16 relative z-20">
          <FadeInSection delay="0.2s">
            <div className="bg-white dark:bg-slate-900 shadow-2xl dark:shadow-slate-900/50 rounded-2xl p-6 md:p-10 relative tricolor-border-wave" style={{
              border: '3px solid transparent',
              backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #f97316 0%, #f97316 33%, #ffffff 33%, #ffffff 66%, #16a34a 66%, #16a34a 100%)',
              backgroundOrigin: 'padding-box, border-box',
              backgroundClip: 'padding-box, border-box'
            }}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Find Your Perfect Stay in India</h3>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 mb-6">
                {/* Check-in */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Check-in</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900"
                  />
                </div>

                {/* Check-out */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Check-out</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 border border-orange-300 dark:border-orange-600 dark:bg-slate-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} Guest{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search button */}
                <div className="flex items-end col-span-1 md:col-span-2">
                  <Button
                    onClick={handleSearch}
                    className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 text-white font-bold rounded-lg py-3 text-base"
                  >
                    Search
                  </Button>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                Best price guaranteed • Free cancellation • Instant confirmation
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Featured Stays - Indian Destinations */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="mb-16">
              <p className="text-orange-600 dark:text-orange-400 font-bold text-sm uppercase tracking-wider mb-3">
                🇮🇳 Popular Destinations
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-lg dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#1e293b' }} className="dark:text-white">
                Discover India's Most
                <br />
                Beautiful Places
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                From Kalka to Shimla hill stations, luxury stays nestled in the lap of the Himalayas.
              </p>
            </div>
          </FadeInSection>

          {/* 3 Featured destinations - Indian style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Kalka Heritage',
                location: 'Kalka, Himachal Pradesh',
                price: '₹2,499',
                rating: 4.9,
                reviews: 312,
                emoji: '🏡',
                color: 'bg-gradient-to-br from-orange-100 via-white to-orange-50 dark:from-orange-900/30 dark:via-slate-900 dark:to-slate-950',
                borderColor: 'border-orange-300 dark:border-orange-700',
                glowColor: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]',
                accentColor: 'text-orange-700 dark:text-orange-400',
                delay: '0.05s',
              },
              {
                title: 'Shimla Queen',
                location: 'Shimla, Himachal Pradesh',
                price: '₹1,999',
                rating: 4.8,
                reviews: 521,
                emoji: '🏔️',
                color: 'bg-gradient-to-br from-green-100 via-white to-green-50 dark:from-green-900/30 dark:via-slate-900 dark:to-slate-950',
                borderColor: 'border-green-300 dark:border-green-700',
                glowColor: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]',
                accentColor: 'text-green-700 dark:text-green-400',
                delay: '0.1s',
              },
              {
                title: 'Mountain Palace',
                location: 'Manali, Himachal Pradesh',
                price: '₹3,499',
                rating: 4.9,
                reviews: 428,
                emoji: '❄️',
                color: 'bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-800/30 dark:via-slate-900 dark:to-slate-950',
                borderColor: 'border-slate-300 dark:border-slate-700',
                glowColor: 'hover:shadow-[0_0_30px_rgba(100,116,139,0.4)]',
                accentColor: 'text-slate-700 dark:text-slate-400',
                delay: '0.15s',
              },
            ].map((dest, idx) => (
              <FadeInSection key={idx} delay={dest.delay} direction="up">
                <div className="group cursor-pointer">
                  <div className={`${dest.color} rounded-3xl p-8 min-h-96 flex flex-col justify-between transition-all duration-300 border-2 ${dest.borderColor} hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_60px_rgba(22,163,74,0.4)]`}>
                    <div>
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {dest.emoji}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 group-hover:opacity-80 transition-opacity">
                        {dest.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1 mb-4">
                        <MapPin className="w-4 h-4" />
                        {dest.location}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(dest.rating) ? 'fill-orange-400 text-orange-400' : 'text-slate-300 dark:text-slate-600'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {dest.rating} ({dest.reviews} reviews)
                        </p>
                      </div>
                    </div>

                    <div className={`border-t ${dest.borderColor} pt-4 flex items-center justify-between`}>
                      <div>
                        <p className="text-xs text-slate-600 dark:text-slate-400">from</p>
                        <p className={`text-3xl font-bold ${dest.accentColor}`}>{dest.price}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section - Tricolor themed with transparent glow effect */}
      <section id="why-us" className="py-20 md:py-32 px-4 md:px-8 relative bg-white dark:bg-slate-950 overflow-hidden">
        {/* Tricolor glowing background elements */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-r from-orange-400 via-transparent to-green-400 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInSection>
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] dark:text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#1e293b' }}>What Makes Us Different</h2>
              <p className="text-lg text-slate-700 dark:text-slate-300 drop-shadow-md">Rooted in the tradition of Indian hospitality and guest care</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: '🏠',
                title: 'Handpicked Selection',
                desc: 'Every hotel is personally verified to ensure you get the very best experience.',
                delay: '0s',
              },
              {
                icon: '🗣️',
                title: 'Indian Language Support',
                desc: '24/7 assistance in Hindi, English, and regional languages.',
                delay: '0.1s',
              },
              {
                icon: '⭐',
                title: 'Authentic Reviews',
                desc: 'Real experiences shared by real travelers who have stayed with us.',
                delay: '0.2s',
              },
              {
                icon: '💰',
                title: 'Transparent Pricing',
                desc: 'What you see is what you pay. No hidden fees or surprises.',
                delay: '0.3s',
              },
            ].map((benefit, idx) => (
              <FadeInSection key={idx} delay={benefit.delay} direction="left">
                <div className="group bg-white/50 dark:bg-slate-800/40 hover:bg-white/70 dark:hover:bg-slate-800/60 p-8 rounded-2xl border-2 border-orange-300 dark:border-orange-700 shadow-lg dark:shadow-orange-900/20 hover:shadow-xl transition-all duration-300 cursor-default backdrop-blur-sm">
                  <div className="text-5xl mb-6 group-hover:scale-105 transition-transform duration-300 origin-left">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors drop-shadow-sm">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors leading-relaxed drop-shadow-sm">
                    {benefit.desc}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Indian travelers */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] dark:text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#1e293b' }}>
                Indian Travelers Love Us
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Hear from our guests in their own words
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: 'My family had the most wonderful time in Kalka. The warmth and care from the hotel staff was exceptional. We felt truly welcomed!',
                name: 'Raj Kumar',
                role: 'From Delhi',
                rating: 5,
                delay: '0s',
              },
              {
                quote: 'Never experienced such excellent service on a Shimla trip. Everything was absolutely perfect! Highly recommended for everyone.',
                name: 'Priya Sharma',
                role: 'From Mumbai',
                rating: 5,
                delay: '0.1s',
              },
              {
                quote: 'I had an issue with my booking but their Hindi support team resolved it instantly. Fantastic customer service!',
                name: 'Amit Patel',
                role: 'From Gujarat',
                rating: 5,
                delay: '0.2s',
              },
              {
                quote: 'Never found such peace in the lap of the Himalayas. Everyone should experience this at least once in their lifetime.',
                name: 'Seema Gupta',
                role: 'From Bangalore',
                rating: 5,
                delay: '0.3s',
              },
            ].map((test, idx) => (
              <FadeInSection key={idx} delay={test.delay} direction="right">
                <div className="group border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-8 hover:shadow-lg dark:hover:shadow-slate-900/50 hover:border-orange-400 dark:hover:border-orange-600 transition-all duration-300 cursor-default">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 group-hover:text-slate-900 dark:group-hover:text-white transition-colors italic leading-relaxed">
                    "{test.quote}"
                  </p>
                  <div className="border-t border-orange-200 dark:border-orange-800 pt-4">
                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {test.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">{test.role}</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Tricolor gradient background */}
      <section className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden min-h-[600px] flex items-center justify-center bg-gradient-to-r from-orange-700 via-white to-green-700 dark:from-orange-950 dark:via-slate-900 dark:to-green-950">
        {/* Slideshow Background */}
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt={`Indian hotel ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay for text visibility */}
            <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
          </div>
        ))}

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>
              Ready for Your Next Stay?
            </h2>
            <p className="text-lg md:text-xl text-orange-100 mb-12 max-w-2xl mx-auto drop-shadow-md">
              Experience the beauty of India's finest hotels. Your perfect getaway awaits.
            </p>

            {user ? (
              <Link to="/hotels">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500 text-white font-bold text-lg py-6 px-10 rounded-lg hover:scale-110 transition-all duration-300 shadow-xl"
                >
                  Explore Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-400 dark:hover:bg-orange-500 text-white font-bold text-lg py-6 px-10 rounded-lg hover:scale-110 transition-all duration-300"
                >
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
