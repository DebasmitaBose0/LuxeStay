import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, ArrowRight, MapPin } from 'lucide-react';
import { sendReviewEmail, storeReview, getStoredReviews } from '@/lib/emailService';

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

  const handleSearch = () => {
    if (checkInDate && checkOutDate) {
      sessionStorage.setItem('bookingDraft', JSON.stringify({
        nights: Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)),
        total: 0,
      }));
      navigate('/hotels');
    }
  };

  return (
    <div className="w-full bg-[#FFFBF5] dark:bg-[#1A1F3A]">
      {/* Premium page background texture - subtle paper grain for luxury feel */}
      <div className="fixed inset-0 opacity-[0.04] dark:opacity-[0.06] pointer-events-none z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' seed='1'/%3E%3C/filter%3E%3Crect width='200' height='200' fill='%23000000' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
        backgroundAttachment: 'fixed'
      }}></div>
      
      {/* Subtle jaali-inspired geometric pattern - Indian heritage touch */}
      <div className="fixed inset-0 opacity-[0.015] dark:opacity-[0.02] pointer-events-none z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='150' height='150' viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23D4A574' stroke-width='0.5'%3E%3Cpath d='M75 0 L150 75 L75 150 L0 75 Z'/%3E%3Cpath d='M0 0 L150 150 M150 0 L0 150'/%3E%3Ccircle cx='75' cy='75' r='25'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '150px 150px',
        backgroundAttachment: 'fixed'
      }}></div>

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
        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        .typewriter {
          overflow: hidden;
          border-right: 3px solid #f97316;
          white-space: nowrap;
          animation: typewriter 0.1s steps(1, end);
        }
        
        /* Elegant floating animations */
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes floatSlowReverse {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(30px) scale(1.02); }
        }
        @keyframes subtleRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes softPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes gradientShift {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .float-blob-1 {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .float-blob-2 {
          animation: floatSlowReverse 7s ease-in-out infinite;
        }
        .float-blob-3 {
          animation: floatSlow 9s ease-in-out infinite;
        }
        .rotate-subtle {
          animation: subtleRotate 25s linear infinite;
        }
        .pulse-soft {
          animation: softPulse 4s ease-in-out infinite;
        }
        .gradient-shift {
          animation: gradientShift 5s ease-in-out infinite;
        }
      `}</style>

      {/* Hero - Premium Indian Luxury Aesthetic */}
      <section id="hero" className="relative pt-32 pb-24 lg:pb-32 px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-br from-[#FFFBF5] via-[#FAF8F3] to-[#E8DCC8] dark:from-[#1A1F3A] dark:via-[#2C2416] dark:to-[#1A1F3A]">
        {/* Premium warm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBF5] via-[#FAF8F3] to-[#E8DCC8] dark:from-[#1A1F3A] dark:via-[#2C2416] dark:to-[#1A1F3A]"></div>
        
        {/* Tricolor accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5" style={{ backgroundImage: 'linear-gradient(90deg, #f97316 0%, #f97316 33%, #ffffff 33%, #ffffff 66%, #16a34a 66%, #16a34a 100%)' }}></div>
        
        {/* Soft gradient blobs for depth - using luxury accent colors */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#D4A574]/25 to-transparent dark:from-[#D4A574]/15 rounded-full blur-3xl float-blob-1"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[#2F5233]/20 to-transparent dark:from-[#2F5233]/12 rounded-full blur-3xl float-blob-2"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#8B3A3A]/15 to-transparent dark:from-[#8B3A3A]/8 rounded-full blur-3xl float-blob-3"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Content */}
            <div>
              <div style={{ animation: 'slideInLeft 0.6s ease-out' }}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2C2416] dark:text-white leading-tight mb-6 hero-text-shadow" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}>
                  अतिथि देवो भवः
                  <br />
                  <span className="text-orange-600 dark:text-orange-400">Your Guest is God</span>
                </h1>
                <p className="text-lg md:text-xl text-[#5C5550] dark:text-slate-300 leading-relaxed mb-8 max-w-lg">
                  Find your perfect stay
                </p>
              </div>

              {/* Quick features list - Indian style */}
              <div style={{ animation: 'slideInLeft 0.6s ease-out 0.1s both' }} className="mb-12 space-y-3">
                <div className="flex items-center gap-3 text-[#5C5550] dark:text-slate-300">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                  <span>Experience luxury stays in Kalka & Shimla Hills</span>
                </div>
                <div className="flex items-center gap-3 text-[#5C5550] dark:text-slate-300">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">✓</span>
                  <span>Round-the-clock multilingual customer support</span>
                </div>
              </div>

              {/* CTA */}
              <div style={{ animation: 'slideInLeft 0.6s ease-out 0.2s both' }} className="flex flex-wrap gap-3">
                <Link to="/hotels">
                  <Button size="lg" className="bg-[#8B3A3A] dark:bg-[#D4A574] hover:bg-[#A24A4A] dark:hover:bg-[#E0B587] text-white dark:text-[#1A1F3A] font-bold rounded-lg text-lg py-6 px-8">
                    Search Hotels
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="dark:border-[#D4A574] dark:text-[#D4A574] dark:hover:bg-[#D4A574]/10 rounded-lg text-lg py-6 px-8" onClick={() => {
                  document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  How It Works
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar - Premium Indian Luxury with Tricolor Accent */}
      <section className="bg-gradient-to-b from-[#FFFBF5] via-white to-[#F5F1ED] dark:from-[#1A1F3A]/20 dark:via-[#2C2416] dark:to-[#1A1F3A]/20 px-4 md:px-8 pb-20 relative">
        <div className="max-w-6xl mx-auto -mt-16 relative z-20">
          <FadeInSection delay="0.2s">
            <div className="bg-white dark:bg-[#2C2416] shadow-2xl dark:shadow-black/50 rounded-2xl p-6 md:p-10 relative" style={{
              border: '3px solid transparent',
              backgroundImage: 'linear-gradient(rgb(var(--search-card-solid)), rgb(var(--search-card-solid))), linear-gradient(135deg, #D4A574 0%, #8B3A3A 50%, #2F5233 100%)',
              backgroundOrigin: 'padding-box, border-box',
              backgroundClip: 'padding-box, border-box',
              boxShadow: '0 0 40px rgba(212,165,116,0.2), -30px 0 60px rgba(212,165,116,0.1), 30px 0 60px rgba(47,82,51,0.1), inset 0 0 60px rgba(212,165,116,0.05)'
            }}>
              <h3 className="text-3xl font-black text-[#2C2416] dark:text-white mb-8" style={{fontWeight: 900, letterSpacing: '0.5px'}}>Find Your Perfect Stay in India</h3>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 mb-6">
                {/* Check-in */}
                <div>
                  <label className="block text-sm font-bold text-[#2C2416] dark:text-white mb-2">Check-in</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-4 py-3 border border-[#D4A574]/40 dark:border-[#D4A574]/60 dark:bg-[#2C2416] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A] dark:focus:ring-[#D4A574] text-[#2C2416] dark:text-white placeholder-[#9c8f7f] dark:placeholder-[#e6dfd6]"
                  />
                </div>

                {/* Check-out */}
                <div>
                  <label className="block text-sm font-bold text-[#2C2416] dark:text-white mb-2">Check-out</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-4 py-3 border border-[#D4A574]/40 dark:border-[#D4A574]/60 dark:bg-[#2C2416] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A] dark:focus:ring-[#D4A574] text-[#2C2416] dark:text-white placeholder-[#9c8f7f] dark:placeholder-[#e6dfd6]"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-bold text-[#2C2416] dark:text-white mb-2">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 border border-[#D4A574]/40 dark:border-[#D4A574]/60 dark:bg-[#2C2416] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A] dark:focus:ring-[#D4A574] text-[#2C2416] dark:text-white placeholder-[#9c8f7f] dark:placeholder-[#e6dfd6]"
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
                    className="w-full bg-[#8B3A3A] hover:bg-[#A24A4A] dark:bg-[#D4A574] dark:hover:bg-[#E0B587] text-white dark:text-[#1A1F3A] font-bold rounded-lg py-3 text-base"
                  >
                    Search
                  </Button>
                </div>
              </div>

              <p className="text-sm font-medium text-[#2C2416] dark:text-slate-200">
                Best price guaranteed • Free cancellation • Instant confirmation
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Featured Stays - Premium Minimal Aesthetic */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 bg-gradient-to-br from-[#FFFBF5] via-white to-[#FAF8F3] dark:from-[#2C2416]/30 dark:via-[#1A1F3A] dark:to-[#2C2416]/30">
        {/* Soft accent gradient on left */}
        <div className="absolute left-0 top-1/4 w-96 h-96 bg-orange-100/40 dark:bg-orange-900/10 rounded-full blur-3xl pointer-events-none float-blob-2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInSection>
            <div className="mb-16">
              <p className="text-orange-600 dark:text-orange-400 font-bold text-sm uppercase tracking-wider mb-3">
                🇮🇳 Popular Destinations
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight drop-shadow-lg dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-[#2C2416] dark:text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}>
                Discover India's Most
                <br />
                Beautiful Places
              </h2>
              <p className="text-lg text-[#7A7270] dark:text-slate-400 max-w-2xl">
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
                      <h3 className="text-2xl md:text-3xl font-bold text-[#2C2416] dark:text-white mb-1 group-hover:opacity-80 transition-opacity">
                        {dest.title}
                      </h3>
                      <p className="text-sm text-[#7A7270] dark:text-slate-400 flex items-center gap-1 mb-4">
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

      {/* Why Us Section - Warm Heritage Inspired with Premium Depth */}
      <section id="why-us" className="relative py-20 md:py-32 px-4 md:px-8 bg-gradient-to-br from-[#FFFBF5] via-[#FAF8F3] to-[#F5F1ED] dark:from-[#2C2416]/40 dark:via-[#1A1F3A] dark:to-[#2C2416]/40 overflow-hidden">
        {/* Soft accent blobs with luxury colors */}
        <div className="absolute right-0 top-1/3 w-96 h-96 bg-gradient-to-br from-[#2F5233]/15 to-transparent dark:from-[#2F5233]/10 rounded-full blur-3xl pointer-events-none float-blob-1"></div>

        {/* Tricolor accent gradients with luxury muted colors */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#D4A574]/20 to-transparent rounded-full blur-3xl dark:from-[#D4A574]/10 pulse-soft"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-r from-[#2F5233]/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-r from-[#D4A574]/15 via-transparent to-[#2F5233]/15 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInSection>
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-[#2C2416] dark:text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}>What Makes Us Different</h2>
              <p className="text-lg text-[#5C5550] dark:text-slate-300 drop-shadow-md">Rooted in the tradition of Indian hospitality and guest care</p>
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
                  <h3 className="text-2xl font-bold text-[#2C2416] dark:text-white mb-3 group-hover:text-[#8B3A3A] dark:group-hover:text-[#D4A574] transition-colors drop-shadow-sm">
                    {benefit.title}
                  </h3>
                  <p className="text-[#5C5550] dark:text-slate-300 group-hover:text-[#2C2416] dark:group-hover:text-white transition-colors leading-relaxed drop-shadow-sm">
                    {benefit.desc}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Premium Personal & Warm Aesthetic */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-[#FFFBF5] via-white to-[#FAF8F3] dark:from-[#2C2416]/30 dark:via-[#1A1F3A] dark:to-[#2C2416]/30">
        {/* Soft accent blob with saffron warmth */}
        <div className="absolute left-0 top-1/2 w-96 h-96 bg-gradient-to-br from-[#D4A574]/20 to-transparent dark:from-[#D4A574]/10 rounded-full blur-3xl pointer-events-none float-blob-1"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInSection>
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-[#2C2416] dark:text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}>
                Indian Travelers Love Us
              </h2>
              <p className="text-lg text-[#7A7270] dark:text-slate-400">
                Hear from our guests in their own words
              </p>
            </div>
          </FadeInSection>

          {/* Testimonials with Typewriter Animation */}
          <div className="mb-16">
            <ReviewShowcase />
          </div>

          {/* Review Form */}
          <FadeInSection delay="0.2s">
            <ReviewForm />
          </FadeInSection>
        </div>
      </section>

      {/* Final CTA - Premium Dark Luxury with Heritage Warmth */}
      <section className="py-24 md:py-32 px-4 md:px-8 relative overflow-hidden min-h-[600px] flex items-center justify-center bg-gradient-to-b from-[#2C2416] via-[#1A1F3A] to-[#2C2416] dark:from-[#1A1F3A] dark:via-[#2C2416] dark:to-[#1A1F3A]">
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
            {/* Premium dark overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/50" />
          </div>
        ))}

        {/* Luxury tricolor accent overlay - muted heritage colors */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4A574]/15 via-transparent to-[#2F5233]/15 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <FadeInSection>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg text-white dark:text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900 }}>
              Ready for Your Next Stay?
            </h2>
            <p className="text-lg md:text-xl text-slate-100 mb-12 max-w-2xl mx-auto drop-shadow-md">
              Experience the beauty of India's finest hotels. Your perfect getaway awaits.
            </p>

            <Link to="/hotels">
              <Button
                size="lg"
                className="bg-[#D4A574] hover:bg-[#E0B587] dark:bg-[#8B3A3A] dark:hover:bg-[#A24A4A] text-[#1A1F3A] dark:text-white font-bold text-lg py-6 px-10 rounded-lg hover:scale-110 transition-all duration-300 shadow-xl"
              >
                Explore Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}

// Typewriter Review Showcase Component
function ReviewShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const defaultReviews = [
    {
      quote: 'My family had the most wonderful time in Kalka. The warmth and care from the hotel staff was exceptional. We felt truly welcomed!',
      name: 'Raj Kumar',
      role: 'From Delhi',
      rating: 5,
    },
    {
      quote: 'Never experienced such excellent service on a Shimla trip. Everything was absolutely perfect! Highly recommended for everyone.',
      name: 'Priya Sharma',
      role: 'From Mumbai',
      rating: 5,
    },
    {
      quote: 'I had an issue with my booking but their Hindi support team resolved it instantly. Fantastic customer service!',
      name: 'Amit Patel',
      role: 'From Gujarat',
      rating: 5,
    },
  ];

  const [reviews, setReviews] = useState<any[]>(defaultReviews);
  
  useEffect(() => {
    // Load user-submitted reviews
    const storedReviews = getStoredReviews();
    if (storedReviews.length > 0) {
      const formattedStoredReviews = storedReviews.map((r: any) => ({
        quote: r.review,
        name: r.name,
        role: 'From Our Guest',
        rating: parseInt(r.rating),
      }));
      setReviews([...defaultReviews, ...formattedStoredReviews]);
    }
  }, []);

  const typingSpeed = 30;
  const displayDuration = 4000;

  useEffect(() => {
    const currentQuote = reviews[currentIndex].quote;
    let timeout: NodeJS.Timeout;

    if (displayedText.length < currentQuote.length && isTyping) {
      timeout = setTimeout(() => {
        setDisplayedText(currentQuote.substring(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (displayedText.length === currentQuote.length && isTyping) {
      timeout = setTimeout(() => {
        setIsTyping(false);
      }, displayDuration);
    } else if (!isTyping) {
      timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        setDisplayedText('');
        setIsTyping(true);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isTyping, currentIndex, reviews]);

  return (
    <div className="border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-8 bg-gradient-to-br from-orange-50 dark:from-slate-900 to-white dark:to-slate-950 gradient-shift shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(reviews[currentIndex].rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-orange-400 text-orange-400" />
        ))}
      </div>
      <p className="text-xl text-slate-800 dark:text-slate-200 mb-6 italic leading-relaxed min-h-[100px]">
        "{displayedText}<span className="animate-pulse">|</span>"
      </p>
      <div className="border-t border-orange-200 dark:border-orange-800 pt-4">
        <p className="font-bold text-slate-900 dark:text-white">
          {reviews[currentIndex].name}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">{reviews[currentIndex].role}</p>
      </div>
    </div>
  );
}

// Review Form Component
function ReviewForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('5');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email notification
      await sendReviewEmail({ name, email, review, rating });
      
      // Store review locally
      storeReview({ name, email, review, rating });

      setSubmitted(true);
      setName('');
      setEmail('');
      setReview('');
      setRating('5');

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="border-2 border-[#D4A574]/40 dark:border-[#D4A574]/60 rounded-2xl p-8 bg-white dark:bg-[#2C2416] shadow-lg">
        <h3 className="text-2xl font-bold text-[#2C2416] dark:text-white mb-6">Write a Review</h3>

        {submitted && (
          <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg">
            ✓ Thank you! We've received your review. A confirmation email has been sent to {email}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-3 border border-[#D4A574]/40 dark:border-[#D4A574]/60 dark:bg-[#1A1F3A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A] dark:focus:ring-[#D4A574] text-[#2C2416] dark:text-white placeholder-[#9c8f7f] dark:placeholder-[#e6dfd6]"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 border border-[#D4A574]/40 dark:border-[#D4A574]/60 dark:bg-[#1A1F3A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A] dark:focus:ring-[#D4A574] text-[#2C2416] dark:text-white placeholder-[#9c8f7f] dark:placeholder-[#e6dfd6]"
            />
          </div>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full px-4 py-3 border border-[#D4A574]/40 dark:border-[#D4A574]/60 dark:bg-[#1A1F3A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A] dark:focus:ring-[#D4A574] text-[#2C2416] dark:text-white placeholder-[#9c8f7f] dark:placeholder-[#e6dfd6]"
          >
            <option value="5">★★★★★ Excellent</option>
            <option value="4">★★★★☆ Good</option>
            <option value="3">★★★☆☆ Average</option>
            <option value="2">★★☆☆☆ Fair</option>
            <option value="1">★☆☆☆☆ Poor</option>
          </select>

          <textarea
            placeholder="Share your experience..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-3 border border-[#D4A574]/40 dark:border-[#D4A574]/60 dark:bg-[#1A1F3A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B3A3A] dark:focus:ring-[#D4A574] text-[#2C2416] dark:text-white placeholder-[#9c8f7f] dark:placeholder-[#e6dfd6] resize-none"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#8B3A3A] hover:bg-[#A24A4A] dark:bg-[#D4A574] dark:hover:bg-[#E0B587] text-white dark:text-[#1A1F3A] font-bold rounded-lg py-3 px-6 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Sending...' : 'Send Review'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
