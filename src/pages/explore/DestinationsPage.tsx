import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useEffect, useState } from 'react';

const FadeInSection = ({ children, delay = '0s', direction = 'up' }: { children: React.ReactNode, delay?: string, direction?: 'up' | 'left' | 'right' }) => {
  const [ref, isVisible] = useAnimationOnScreen({ threshold: 0.1 });

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

function useAnimationOnScreen(options: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isVisible] as const;
}

export default function DestinationsPage() {
  const destinations = [
    {
      name: 'Kalka',
      description: 'Experience the charm of Kalka with heritage properties and modern comfort in the foothills of the Himalayas.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
      rating: 4.9,
      properties: 24,
      color: 'from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30',
      borderColor: 'border-orange-300 dark:border-orange-700',
      accentColor: 'text-orange-700 dark:text-orange-400',
    },
    {
      name: 'Shimla',
      description: 'Discover the beauty of Shimla, the "Queen of Hills," with picturesque views and luxury accommodations.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=400&fit=crop',
      rating: 4.8,
      properties: 32,
      color: 'from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30',
      borderColor: 'border-green-300 dark:border-green-700',
      accentColor: 'text-green-700 dark:text-green-400',
    },
    {
      name: 'Manali',
      description: 'Explore adventure and serenity in Manali with premium stays surrounded by majestic mountains.',
      image: 'https://images.unsplash.com/photo-1500228299519-e21cc028cb29?w=500&h=400&fit=crop',
      rating: 4.9,
      properties: 28,
      color: 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30',
      borderColor: 'border-blue-300 dark:border-blue-700',
      accentColor: 'text-blue-700 dark:text-blue-400',
    },
    {
      name: 'Nainital',
      description: 'Relax by the pristine lakes of Nainital with elegant hotels and stunning natural beauty.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
      rating: 4.7,
      properties: 19,
      color: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30',
      borderColor: 'border-purple-300 dark:border-purple-700',
      accentColor: 'text-purple-700 dark:text-purple-400',
    },
    {
      name: 'Mussoorie',
      description: 'Experience the romantic charm of Mussoorie with hillside resorts and panoramic views.',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=400&fit=crop',
      rating: 4.6,
      properties: 21,
      color: 'from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30',
      borderColor: 'border-red-300 dark:border-red-700',
      accentColor: 'text-red-700 dark:text-red-400',
    },
    {
      name: 'Dharamshala',
      description: 'Find peace and tranquility in Dharamshala with boutique hotels nestled in green valleys.',
      image: 'https://images.unsplash.com/photo-1500228299519-e21cc028cb29?w=500&h=400&fit=crop',
      rating: 4.8,
      properties: 16,
      color: 'from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30',
      borderColor: 'border-emerald-300 dark:border-emerald-700',
      accentColor: 'text-emerald-700 dark:text-emerald-400',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <style>{`
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-animate { animation: slideDownFade 0.8s ease-out; }
      `}</style>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 via-white to-green-600 dark:from-orange-950 dark:via-slate-950 dark:to-green-950 text-slate-900 dark:text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-20 w-80 h-80 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-20 w-80 h-80 bg-green-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="hero-animate text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>Explore Destinations</h1>
          <p className="hero-animate text-xl text-slate-700 dark:text-slate-300">Discover India's most beautiful and luxurious getaways</p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-24 px-4 bg-gradient-to-b from-white via-orange-50 to-white dark:from-slate-950 dark:via-orange-950/10 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, idx) => (
              <FadeInSection key={idx} delay={`${idx * 0.1}s`} direction="up">
                <div className="group h-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${dest.borderColor} hover:scale-105 hover:-translate-y-2">
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={dest.image} 
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  </div>
                  <div className={`p-8 bg-gradient-to-br ${dest.color}`}>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{dest.name}</h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-4 line-clamp-2">{dest.description}</p>
                    
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-300 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{dest.rating}</span>
                      </div>
                      <span className={`text-sm font-bold ${dest.accentColor}`}>{dest.properties} stays</span>
                    </div>

                    <Link to="/hotels">
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                        Explore <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
